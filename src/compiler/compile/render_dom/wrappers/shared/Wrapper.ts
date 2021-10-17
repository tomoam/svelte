import Renderer from '../../Renderer';
import Block from '../../Block';
import { b, x } from 'code-red';
import { TemplateNode } from '../../../../interfaces';
import { Identifier, TemplateLiteral } from 'estree';
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

	template_name: string;
	template: TemplateLiteral;

	root_node: Wrapper;
	render_nodes_var: Identifier;
	render_nodes: Wrapper[] = [];

	index_in_render_nodes_sequence: number = 0;
	index_in_render_nodes: number;

	node_path_var_name: string;
	node_path: Array<number | string> = [];

	claim_func_map_var: Identifier;

	anchor: Identifier;

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

		this.is_on_traverse_path = !parent || is_head(parent.var) || !parent.is_dom_node();

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
		if (!this.is_on_traverse_path) {
			return;
		}

		this.root_node = root_node;
		this.index_in_render_nodes = this.root_node.index_in_render_nodes_sequence++;

		this.root_node.render_nodes.push(this);
	}

	push_to_node_path(use_in_fragment: boolean = false) {
		if (this.prev && this.prev.index_in_render_nodes !== undefined) {
			const base = this.index_in_render_nodes - this.prev.index_in_render_nodes === 1
				? 1
				: this.prev.index_in_render_nodes + 2;
			const path = use_in_fragment ? (base * -1) : base;
			this.root_node.node_path.push(path);
		} else {
			const path = use_in_fragment ? 0 : "";
			this.root_node.node_path.push(path);
		}
	}

	get_render_nodes_var() {
		return this.root_node.render_nodes_var;
	}

	get_var() {
		return x`${this.root_node.render_nodes_var}[${this.index_in_render_nodes}]`;
	}

	get_claim_func_map_var(block: Block) {
		if (!this.root_node.claim_func_map_var) {
			this.root_node.claim_func_map_var = block.get_unique_name('claim_func_var');
		}
		return this.root_node.claim_func_map_var;
	}

	is_end_node() {
		return this.index_in_render_nodes === (this.root_node.index_in_render_nodes_sequence - 1);
	}

	get_create_statement(parent_node: Identifier) {
		if (this.template_name) {
			const statements = [];
			const node_path = needs_svg_wrapper(this) ? x`${this.template_name}().firstChild` : `${this.template_name}()`;
			statements.push(b`@traverse(${node_path}, ${this.render_nodes_var}, ${this.index_in_render_nodes_sequence > 1 ? `${this.node_path_var_name}()` : null});`);
			return statements;
		} else if (is_head(parent_node) && this.parent.template_name && (!this.prev || !this.prev.var)) {
			const statements = [];
			statements.push(b`@traverse(${this.parent.template_name}(), ${this.parent.render_nodes_var}, ${this.parent.index_in_render_nodes_sequence > 1 ? `${this.parent.node_path_var_name}()` : null});`);
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
					@traverse_claim(${parent_nodes}, ${this.get_render_nodes_var()}, ${this.root_node.node_path_var_name}(), ${this.get_claim_func_map_var(block)}, 0, @_document.head);
				`);
			} else {
				statements.push(b`
					@traverse_claim(#nodes, ${this.get_render_nodes_var()}, ${this.root_node.node_path_var_name}(), ${this.get_claim_func_map_var(block)}, 0);
				`);
			}
			return statements;
		} else {
			return undefined;
		}
	}

	get_node_path(parent_node: Identifier) {
		if (this.template_name) {
			const node_path = needs_svg_wrapper(this) ? x`${this.template_name}().firstChild` : `${this.template_name}()`;
			return x`${node_path}.firstChild`;
		} else if (is_head(parent_node) && this.parent.template_name && (!this.prev || !this.prev.var)) {
			return  x`${this.parent.template_name}().firstChild`;
		} else if (this.prev) {
			const prev_var = this.prev.is_dom_node() ? this.prev.get_var() : this.prev.anchor;
			return x`${prev_var}.nextSibling`;
		} else {
			return x`${parent_node}.firstChild`;
		}
	}

	get_or_create_anchor(block: Block, parent_node: Identifier, parent_nodes: Identifier, anchor_name?: string): Identifier {
		// TODO use this in EachBlock and IfBlock — tricky because
		// children need to be created first
		const needs_anchor = is_head(parent_node) || (this.next ? !this.next.is_dom_node() : !parent_node || !this.parent.is_dom_node());
		this.anchor = block.get_unique_name(anchor_name || `${this.var.name}_anchor`);
		const render_statement = this.get_node_path(parent_node);

		if (needs_anchor) {
			block.add_element(
				this.anchor,
				render_statement,
				parent_node && !is_head(parent_node) ? x`@insert_blank_anchor(${parent_nodes || '#nodes'}[0], ${parent_node})` : this.anchor,
				parent_node as Identifier
			);
		} else {
			// block.add_variable(this.anchor);
			// block.chunks.create.push(b`${this.anchor} = ${render_statement};`);
		}

		return needs_anchor ? this.anchor : this.next ? this.next.get_var() as Identifier : { type: 'Identifier', name: 'null' };
	}

	get_initial_anchor_node(parent_node: Identifier): Identifier {
		return !parent_node ? { type: 'Identifier', name: '#anchor' } : !is_head(parent_node) && this.next && this.next.is_dom_node() ? this.next.get_var() as Identifier : { type: 'Identifier', name: 'null' }; 
	}

	get_update_mount_node(anchor: Identifier): Identifier {
		return ((this.parent && this.parent.is_dom_node())
			? this.parent.get_var()
			: x`${anchor}.parentNode`) as Identifier;
	}

	is_dom_node() {
		return (
			this.node.type === 'Element' ||
			this.node.type === 'Text' ||
			this.node.type === 'MustacheTag'
		);
	}

	render(_block: Block, _parent_node: Identifier, _parent_nodes: Identifier) {
		throw Error('Wrapper class is not renderable');
	}
}
