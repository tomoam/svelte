import Wrapper from './shared/Wrapper';
import Renderer from '../Renderer';
import Block from '../Block';
import AwaitBlock from '../../nodes/AwaitBlock';
import create_debugging_comment from './shared/create_debugging_comment';
import { b, x } from 'code-red';
import FragmentWrapper from './Fragment';
import PendingBlock from '../../nodes/PendingBlock';
import ThenBlock from '../../nodes/ThenBlock';
import CatchBlock from '../../nodes/CatchBlock';
import { Context } from '../../nodes/shared/Context';
import { Identifier, Literal, Node } from 'estree';
import { add_const_tags, add_const_tags_context } from './shared/add_const_tags';
import { set_index_number_to_fragment } from './shared/set_index_number';
import { is_head } from './shared/is_head';

type Status = 'pending' | 'then' | 'catch';

class AwaitBlockBranch extends Wrapper {
	parent: AwaitBlockWrapper;
	node: PendingBlock | ThenBlock | CatchBlock;
	block: Block;
	fragment: FragmentWrapper;
	is_dynamic: boolean;

	var = null;
	status: Status;

	value: string;
	value_index: Literal;
	value_contexts: Context[];
	is_destructured: boolean;

	constructor(
		status: Status,
		renderer: Renderer,
		block: Block,
		parent: AwaitBlockWrapper,
		node: PendingBlock | ThenBlock | CatchBlock,
		strip_whitespace: boolean,
		next_sibling: Wrapper
	) {
		super(renderer, block, parent, node);
		this.status = status;

		this.block = block.child({
			comment: create_debugging_comment(node, this.renderer.component),
			name: this.renderer.component.get_unique_name(`create_${status}_block`),
			type: status
		});

		this.add_context(parent.node[status + '_node'], parent.node[status + '_contexts']);

		this.fragment = new FragmentWrapper(
			renderer,
			this.block,
			this.node.children,
			parent,
			strip_whitespace,
			next_sibling
		);

		this.is_dynamic = this.block.dependencies.size > 0;
	}

	set_index_number(_root_node: Wrapper) {
		set_index_number_to_fragment(this.fragment.nodes, this.renderer, this.block);
	}

	add_context(node: Node | null, contexts: Context[]) {
		if (!node) return;

		if (node.type === 'Identifier') {
			this.value = node.name;
			this.renderer.add_to_context(this.value, true);
		} else {
			contexts.forEach(context => {
				this.renderer.add_to_context(context.key.name, true);
			});
			this.value = this.block.parent.get_unique_name('value').name;
			this.value_contexts = contexts;
			this.renderer.add_to_context(this.value, true);
			this.is_destructured = true;
		}
		this.value_index = this.renderer.context_lookup.get(this.value).index;

		if (this.has_consts(this.node)) {
			add_const_tags_context(this.renderer, this.node.const_tags);
		}
	}

	has_consts(node: PendingBlock | ThenBlock | CatchBlock): node is ThenBlock | CatchBlock {
		return node instanceof ThenBlock || node instanceof CatchBlock;
	}

	render(block: Block, parent_node: Identifier, parent_nodes: Identifier) {
		this.fragment.render(block, parent_node, parent_nodes);

		if (this.is_destructured || (this.has_consts(this.node) && this.node.const_tags.length > 0)) {
			this.render_get_context();
		}
	}

	render_get_context() {
		const props = this.is_destructured ? this.value_contexts.map(prop => b`#ctx[${this.block.renderer.context_lookup.get(prop.key.name).index}] = ${prop.default_modifier(prop.modifier(x`#ctx[${this.value_index}]`), name => this.renderer.reference(name))};`) : null;

		const const_tags_props = this.has_consts(this.node) ? add_const_tags(this.block, this.node.const_tags, '#ctx') : null;

		const get_context = this.block.renderer.component.get_unique_name(`get_${this.status}_context`);
		this.block.renderer.blocks.push(b`
			function ${get_context}(#ctx) {
				${props}
				${const_tags_props}
			}
		`);
		this.block.chunks.declarations.push(b`${get_context}(#ctx)`);
		if (this.block.has_update_method) {
			this.block.chunks.update.unshift(b`${get_context}(#ctx)`);
		}
	}
}

export default class AwaitBlockWrapper extends Wrapper {
	node: AwaitBlock;

	pending: AwaitBlockBranch;
	then: AwaitBlockBranch;
	catch: AwaitBlockBranch;

	var: Identifier = { type: 'Identifier', name: 'await_block' };

	constructor(
		renderer: Renderer,
		block: Block,
		parent: Wrapper,
		node: AwaitBlock,
		strip_whitespace: boolean,
		next_sibling: Wrapper
	) {
		super(renderer, block, parent, node);

		this.cannot_use_innerhtml();
		this.not_static_content();

		block.add_dependencies(this.node.expression.dependencies);

		let is_dynamic = false;
		let has_intros = false;
		let has_outros = false;

		['pending', 'then', 'catch'].forEach((status: Status) => {
			const child = this.node[status];

			const branch = new AwaitBlockBranch(
				status,
				renderer,
				block,
				this,
				child,
				strip_whitespace,
				next_sibling
			);

			renderer.blocks.push(branch.block);

			if (branch.is_dynamic) {
				is_dynamic = true;
				// TODO should blocks update their own parents?
				block.add_dependencies(branch.block.dependencies);
			}

			if (branch.block.has_intros) has_intros = true;
			if (branch.block.has_outros) has_outros = true;

			this[status] = branch;
		});

		['pending', 'then', 'catch'].forEach(status => {
			this[status].block.has_update_method = is_dynamic;
			this[status].block.has_intro_method = has_intros;
			this[status].block.has_outro_method = has_outros;
		});

		if (has_outros) {
			block.add_outro();
		}
	}

	set_index_number(root_node: Wrapper) {
		super.set_index_number(root_node);

		this.push_to_node_path(true);

		[this.pending, this.then, this.catch].forEach(branch => {
			branch.set_index_number(root_node);
		});
	}

	render(
		block: Block,
		parent_node: Identifier,
		parent_nodes: Identifier
	) {
		const anchor = this.get_var() as Identifier;
		const update_mount_node = this.get_update_mount_node(anchor);

		const snippet = this.node.expression.manipulate(block);

		const info = block.get_unique_name('info');
		const promise = block.get_unique_name('promise');

		block.add_variable(promise);

		block.maintain_context = true;

		const info_props: any = x`{
			ctx: #ctx,
			current: null,
			token: null,
			hasCatch: ${this.catch.node.start !== null ? 'true' : 'false'},
			pending: ${this.pending.block.name},
			then: ${this.then.block.name},
			catch: ${this.catch.block.name},
			value: ${this.then.value_index},
			error: ${this.catch.value_index},
			blocks: ${this.pending.block.has_outro_method && x`[,,,]`}
		}`;

		block.chunks.init.push(b`
			let ${info} = ${info_props};
		`);

		block.chunks.init.push(b`
			@handle_promise(${promise} = ${snippet}, ${info});
		`);

		block.add_statement(
			this.var,
			this.get_var(),
			this.get_create_statement(parent_node),
			undefined,
			this.get_mount_statement(),
			this.get_destroy_statement(),
			parent_node,
			this
		);

		block.chunks.create.push(b`
			${info}.block.c();
		`);

		if (parent_nodes && this.renderer.options.hydratable) {
			if (!parent_node && !this.prev && !this.next) {
				block.chunks.claim.push(b`
					${info}.block.l(${parent_nodes});
				`);
			} else {
				block.chunks.claim.push(b`
					${this.get_claim_func_map_var(block)}.set(${this.index_in_render_nodes}, (n) => ${info}.block.l(n));
				`);

				const claim_statement = this.get_claim_statement(block, parent_node, parent_nodes);
				if (claim_statement) {
					block.chunks.claim.push(claim_statement);
				}
			}
		}

		const initial_mount_node = parent_node || '#target';

		const has_transitions = this.pending.block.has_intro_method || this.pending.block.has_outro_method;

		if (parent_node) {
			const anchor_node = !is_head(parent_node) && this.next && this.next.is_dom_node()
					? this.next.get_var() as Identifier
					: { type: 'Identifier', name: 'null' };

			block.chunks.mount.push(b`
				${info}.block.m(${initial_mount_node}, ${info}.anchor = ${anchor_node});
				${info}.mount = () => ${update_mount_node};
				${info}.anchor = ${anchor};
			`);
		} else {
			block.chunks.mount.push(b`
				${info}.block.m(${initial_mount_node}, ${info}.anchor = ${anchor});
				${info}.mount = () => ${update_mount_node};
			`);
		} 

		if (has_transitions) {
			block.chunks.intro.push(b`@transition_in(${info}.block);`);
		}

		const dependencies = this.node.expression.dynamic_dependencies();

		const update_await_block_branch = b`@update_await_block_branch(${info}, #ctx, #dirty)`;

		if (dependencies.length > 0) {
			const condition = x`
				${block.renderer.dirty(dependencies)} &&
				${promise} !== (${promise} = ${snippet}) &&
				@handle_promise(${promise}, ${info})`;

			block.chunks.update.push(
				b`${info}.ctx = #ctx;`
			);

			if (this.pending.block.has_update_method) {
				block.chunks.update.push(b`
					if (${condition}) {

					} else {
						${update_await_block_branch}
					}
				`);
			} else {
				block.chunks.update.push(b`
					${condition}
				`);
			}
		} else {
			if (this.pending.block.has_update_method) {
				block.chunks.update.push(b`
					${update_await_block_branch}
				`);
			}
		}

		if (this.pending.block.has_outro_method) {
			block.chunks.outro.push(b`
				for (let #i = 0; #i < 3; #i += 1) {
					const block = ${info}.blocks[#i];
					@transition_out(block);
				}
			`);
		}

		block.chunks.destroy.push(b`
			${info}.block.d(${parent_node ? null : 'detaching'});
			${info}.token = null;
			${info} = null;
		`);

		[this.pending, this.then, this.catch].forEach(branch => {
			branch.render(branch.block, null, x`#nodes` as Identifier);
		});
	}
}
