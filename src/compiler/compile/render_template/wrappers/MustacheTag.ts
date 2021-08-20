import Renderer from '../Renderer';
import Block from '../Block';
import Tag from './shared/Tag';
import Wrapper from './shared/Wrapper';
import MustacheTag from '../../nodes/MustacheTag';
import RawMustacheTag from '../../nodes/RawMustacheTag';
import { x } from 'code-red';
import { Identifier } from 'estree';
import { is_head } from './shared/is_head';
// import remove_whitespace_children from '../handlers/utils/remove_whitespace_children';
// import { INode } from '../../nodes/interfaces';

export default class MustacheTagWrapper extends Tag {
	var: Identifier = { type: 'Identifier', name: 't' };
	// block: Block;

	constructor(renderer: Renderer, block: Block, parent: Wrapper, node: MustacheTag | RawMustacheTag) {
		super(renderer, block, parent, node);
		// this.block = block;
	}

	// get_claim_template_statement(template_node: Identifier | string, ssr_node: (ReturnType<typeof x>) | string, parent_nodes: (ReturnType<typeof x>) | Identifier | string, target?: Identifier | string) {
	get_claim_template_statement(template_node: Identifier | string, parent_nodes: (ReturnType<typeof x>) | Identifier | string, target?: Identifier | string) {
		const nodes = parent_nodes || '[]';
		return x`@claim_template_text(${template_node}, ${nodes}, ${target})`;
	}

	render(block: Block, parent_node: Identifier, parent_nodes: Identifier) {
		const { init } = this.rename_this_method(
			block,
			value => x`@set_data(${this.var}, ${value})`
		);

		let node_path;
		if (this.template_index) {
			node_path = x`@first_child(${this.template_index}())`;
		} else if (is_head(parent_node) && this.parent.template_index && (!this.prev || !this.prev.var)) {
			node_path =  x`@first_child(${this.parent.template_index}())`;
		} else if (this.prev) {
			const prev_var = this.prev.is_dom_node ? this.prev.var : this.prev.anchor;
			node_path = x`@next_sibling(${prev_var})`;
		} else {
			node_path = x`@first_child(${parent_node})`;
		}

		const render_statement = x`@replace_text(${node_path}, ${init})`;

		const trim_parent_nodes = parent_node && this.parent.node.children.length === 1 ? x`@trim_nodes(@children(${parent_node}))` : parent_nodes || '#nodes';
		const claim_statement = this.get_claim_template_statement(this.var, trim_parent_nodes, parent_node);

		block.add_element(
			this.var,
			render_statement,
			claim_statement,
			parent_node
		);
	}
}
