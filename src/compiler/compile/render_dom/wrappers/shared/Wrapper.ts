import Renderer from '../../Renderer';
import Block from '../../Block';
import { b, x } from 'code-red';
import { TemplateNode } from '../../../../interfaces';
import { Node, Identifier, TemplateLiteral } from 'estree';
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
	is_on_traverse_path: boolean;

	template_name: string;
	template: TemplateLiteral;

	root_node: Wrapper;

	sequence: number = 0;

	routes_name: string;
	routes: Array<number | Node> = [];

	index_in_nodes: number;

	id: Identifier;

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

		this.can_use_innerhtml = !renderer.options.hydratable;
		this.is_static_content = !renderer.options.hydratable;

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
	}

	set_index_number(root_node: Wrapper) {
		this.root_node = root_node;
		this.index_in_nodes = this.root_node.sequence++;

		this.id = this.var;
		this.var = { type: "Identifier", name: `node[${this.index_in_nodes}]`};
		if (this.prev) {
			this.root_node.routes.push(this.prev.index_in_nodes + 1);
		} else {
			this.root_node.routes.push(0);
		}
	}

	get_create_statement(block: Block, parent_node: Identifier) {
		if (this.template_name) {

			const node_name = block.get_unique_name('node');
			block.chunks.declarations.push(b`
				const ${node_name} = new Array(${this.sequence});
			`);

			const statements = [];
			const node_path = needs_svg_wrapper(this) ? x`${this.template_name}().firstChild` : `${this.template_name}()`;
			statements.push(b`${this.var} = ${node_path}.firstChild;`);

			if (this.sequence > 1) {
				statements.push(b`@traverse(${node_name}, 1, ${this.routes_name});`);
			}

			return statements;
		} else if (is_head(parent_node) && this.parent.template_name && (!this.prev || !this.prev.var)) {
			const statements = [];
			statements.push(b`${this.var} = ${this.parent.template_name}.firstChild`);
			if (this.sequence > 1) {
				statements.push(b`@traverse(node, 1, ${this.parent.routes_name});`);
			}
			return statements;
		} else if (this.prev) {
			// const prev_var = this.prev.is_dom_node() ? this.prev.var : this.prev.anchor;
			// return b`@next_sibling(node, ${`/* ${this.id.name} */ ${this.index_in_fragment}`}, ${this.index_in_fragment - 1 === this.prev.index_in_fragment ? null : this.prev.index_in_fragment});`
			return undefined;
		} else {
			// return b`@first_child(node, ${`/* ${this.id.name} */ ${this.index_in_fragment}`}, ${this.index_in_fragment - 1 === this.parent.index_in_fragment ? null : this.parent.index_in_fragment});`
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
			const prev_var = this.prev.is_dom_node() ? this.prev.var : this.prev.anchor;
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
			block.add_variable(this.anchor);
			block.chunks.create.push(b`${this.anchor} = ${render_statement};`);
		}

		return needs_anchor ? this.anchor : this.next ? this.next.var : { type: 'Identifier', name: 'null' };
	}

	get_initial_anchor_node(parent_node: Identifier): Identifier {
		return !parent_node ? { type: 'Identifier', name: '#anchor' } : !is_head(parent_node) && this.next && this.next.is_dom_node() ? this.next.var : { type: 'Identifier', name: 'null' }; 
	}

	get_update_mount_node(anchor: Identifier): Identifier {
		return ((this.parent && this.parent.is_dom_node())
			? this.parent.var
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
