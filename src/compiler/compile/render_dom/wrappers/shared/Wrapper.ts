import Renderer from '../../Renderer';
import Block from '../../Block';
import { b, x } from 'code-red';
import { TemplateNode } from '../../../../interfaces';
import { Identifier, TemplateLiteral, ExpressionStatement, CallExpression } from 'estree';
import { is_head } from './is_head';
import { needs_svg_wrapper } from './needs_svg_wrapper';

export default class Wrapper {
	renderer: Renderer;
	parent: Wrapper;
	node: TemplateNode;

	prev: Wrapper | null;
	next: Wrapper | null;

	var: Identifier;
	can_use_innerhtml: boolean;
	is_static_content: boolean;
	is_on_traverse_path: boolean = false;

	root_node: Wrapper;

	template_name: string;
	template: TemplateLiteral;

	render_nodes: Wrapper[] = [];
	render_nodes_var: Identifier;

	index_in_render_nodes: number;
	index_in_render_nodes_sequence: number = 0;

	node_path: Array<number | string> = [];
	node_path_var_name: string;

	claim_func_map_var: Identifier;

	insert_indexes: number[] = [];
	detach_indexes: number[] = [];

	constructor(
		renderer: Renderer,
		block: Block,
		parent: Wrapper,
		node: TemplateNode
	) {
		this.node = node;

		// make these non-enumerable so that they can be logged sensibly
		// (TODO in dev only?)
		Object.defineProperties(this, {
			renderer: {
				value: renderer
			},
			parent: {
				value: parent
			}
		});

		this.can_use_innerhtml = true;
		this.is_static_content = true;

		this.is_on_traverse_path =
			!parent || is_head(parent.var) || !parent.is_dom_node();

		block.wrappers.push(this);
	}

	cannot_use_innerhtml() {
		this.can_use_innerhtml = false;
		if (this.parent) this.parent.cannot_use_innerhtml();
	}

	not_static_content() {
		this.is_static_content = false;
		if (this.parent) this.parent.not_static_content();
	}

	mark_as_on_traverse_path() {
		this.is_on_traverse_path = true;

		if (this.parent && !this.parent.is_on_traverse_path) this.parent.mark_as_on_traverse_path();
		if (this.prev && !this.prev.is_on_traverse_path) this.prev.mark_as_on_traverse_path();
	}

	set_index_number(root_node: Wrapper) {
		if (!this.is_on_traverse_path) return;

		this.root_node = root_node;
		this.index_in_render_nodes = this.root_node
			.index_in_render_nodes_sequence++;

		this.root_node.render_nodes.push(this);
	}

	push_to_node_path(use_in_fragment: boolean = false) {
		if (this.prev && this.prev.index_in_render_nodes !== undefined) {
			const base = this.index_in_render_nodes - this.prev.index_in_render_nodes === 1
				? 1
				: this.prev.index_in_render_nodes + 2;
			const path = use_in_fragment ? base : (base * -1);
			this.root_node.node_path.push(path);
		} else {
			const path = use_in_fragment ? 0 : '';
			this.root_node.node_path.push(path);
		}
	}

	get_render_nodes_var() {
		return this.root_node.render_nodes_var;
	}

	get_var() {
		return x`${this.root_node.render_nodes_var}[${this.index_in_render_nodes}]`;
	}

	get_claim_func_map_var(block: Block, if_create: boolean = true) {
		if (!this.root_node.claim_func_map_var && if_create) {
			this.root_node.claim_func_map_var =
				block.get_unique_name('claim_func_var');
		}
		return this.root_node.claim_func_map_var;
	}

	is_end_node() {
		return (
			this.index_in_render_nodes ===
			this.root_node.index_in_render_nodes_sequence - 1
		);
	}

	get_create_statement(parent_node: Identifier) {
		if (this.template_name) {
			const statements = [];
			const node_path = needs_svg_wrapper(this)
				? x`${this.template_name}().firstChild`
				: `${this.template_name}()`;
			statements.push(
				b`@traverse(${node_path}, ${this.render_nodes_var}, ${
					this.index_in_render_nodes_sequence > 1
						? `${this.node_path_var_name}()`
						: null
				});`
			);
			return statements;
		} else if (
			is_head(parent_node) &&
			this.parent.template_name &&
			(!this.prev || !this.prev.var)
		) {
			const statements = [];
			statements.push(
				b`@traverse(${this.parent.template_name}(), ${
					this.parent.render_nodes_var
				}, ${
					this.parent.index_in_render_nodes_sequence > 1
						? `${this.parent.node_path_var_name}()`
						: null
				});`
			);
			return statements;
		} else {
			return undefined;
		}
	}

	get_claim_statement(block: Block, parent_node: Identifier, parent_nodes) {
		if (this.is_end_node()) {
			const statements = [];
			if (is_head(parent_node) && this.parent.template_name) {
				statements.push(b`
					@traverse_claim(${parent_nodes}, ${this.get_render_nodes_var()}, ${this.root_node.index_in_render_nodes_sequence > 1 ? `${this.root_node.node_path_var_name}()` : '[0]'}, ${this.get_claim_func_map_var(block, false) || 'undefined'}, @_document.head);
				`);
			} else {
				statements.push(b`
					@traverse_claim(#nodes, ${this.get_render_nodes_var()}, ${this.root_node.index_in_render_nodes_sequence > 1 ? `${this.root_node.node_path_var_name}()` : '[0]'}, ${this.get_claim_func_map_var(block, false)});
				`);
			}
			return statements;
		} else {
			return undefined;
		}
	}

	get_mount_statement() {
		if (this.template_name && !((!this.parent || !this.parent.is_dom_node()) && !this.prev && !this.next)) {
			const root = this.root_node;
			const indexes = {
				type: 'ChainExpression',
				get expression() {
					return x`[${root.insert_indexes.toString()}]`;
				}
			} as any;

			const statement = b`@insert_all(#target, ${this.render_nodes_var}, ${indexes}, #anchor);`;
			((statement[0] as ExpressionStatement).expression as CallExpression).callee.loc = {
				start: this.renderer.locate(this.node.start),
				end: this.renderer.locate(this.node.end)
			};

			const statements = [];
			statements.push(statement);

			return statements;
		} else {
			return undefined;
		}
	}

	get_destroy_statement() {
		if (this.template_name && !((!this.parent || !this.parent.is_dom_node()) && !this.prev && !this.next)) {
			const root = this.root_node;
			const indexes = {
				type: 'ChainExpression',
				get expression() {
					return x`[${root.detach_indexes.toString()}]`;
				}
			} as any;

			const statements = [];
			statements.push(
				b`@detach_all(detaching, ${this.render_nodes_var}, ${indexes});`
			);

			return statements;
		} else {
			return undefined;
		}
	}

	get_or_create_anchor(
		block: Block,
		parent_node: Identifier,
		parent_nodes: Identifier
	) {
		// TODO use this in EachBlock and IfBlock — tricky because
		// children need to be created first
		const needs_anchor = this.next
			? !this.next.is_dom_node()
			: !parent_node || !this.parent.is_dom_node();
		const anchor = needs_anchor
			? block.get_unique_name(`${this.var.name}_anchor`)
			: (this.next && this.next.var) || { type: 'Identifier', name: 'null' };

		if (needs_anchor) {
			block.add_element(
				anchor,
				x`@empty()`,
				parent_nodes && x`@empty()`,
				parent_node as Identifier
			);
		}

		return anchor;
	}

	get_update_mount_node(anchor: Identifier): Identifier {
		return (
			this.parent && this.parent.is_dom_node()
				? this.parent.get_var()
				: x`${anchor}.parentNode`
		) as Identifier;
	}

	is_dom_node() {
		return (
			this.node.type === 'Element' ||
			this.node.type === 'Text' ||
			this.node.type === 'MustacheTag'
		);
	}

	is_single_in_fragment() {
		if (this.parent && this.parent.is_dom_node()) {
			return false;
		}

		return this.is_only_child_on_same_level();
	}

	is_only_child_in_svelte_element() {
		if (this.parent && this.parent.node.name === 'svelte:element' && this.is_only_child_on_same_level()) {
			return true;
		} else {
			return false;
		}
	}

	is_only_child_on_same_level() {
		if (this.has_prev_except_debug() || this.has_next_except_debug()) {
			return false;
		}

		return true;
	}

	has_prev_except_debug() {
		if (!this.prev) {
			return false;
		}

		if (this.prev.node.type === 'DebugTag') {
			return this.prev.has_prev_except_debug();
		} else {
			return true;
		}
	}

	has_next_except_debug() {
		if (!this.next) {
			return false;
		}

		if (this.next.node.type === 'DebugTag') {
			return this.next.has_next_except_debug();
		} else {
			return true;
		}
	}

	render(_block: Block, _parent_node: Identifier, _parent_nodes: Identifier) {
		throw Error('Wrapper class is not renderable');
	}
}
