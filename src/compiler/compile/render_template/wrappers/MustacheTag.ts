import Renderer from '../Renderer';
import Block from '../Block';
import Tag from './shared/Tag';
import Wrapper from './shared/Wrapper';
import MustacheTag from '../../nodes/MustacheTag';
import RawMustacheTag from '../../nodes/RawMustacheTag';
import { x } from 'code-red';
import { Identifier } from 'estree';
// import remove_whitespace_children from '../handlers/utils/remove_whitespace_children';
// import { INode } from '../../nodes/interfaces';

export default class MustacheTagWrapper extends Tag {
	var: Identifier = { type: 'Identifier', name: 't' };
	// block: Block;

	constructor(renderer: Renderer, block: Block, parent: Wrapper, node: MustacheTag | RawMustacheTag) {
		super(renderer, block, parent, node);
		// this.block = block;
	}

	get_claim_template_statement(template_node: Identifier | string, ssr_node: (ReturnType<typeof x>) | string, parent_nodes: (ReturnType<typeof x>) | Identifier | string, target?: Identifier | string) {
		const nodes = parent_nodes || '[]';
		return x`@claim_template_text(${template_node}, ${ssr_node}, ${nodes}, ${target})`;
	}

	render(block: Block, parent_node: Identifier, parent_nodes: Identifier) {
		const { init } = this.rename_this_method(
			block,
			value => x`@set_data(${this.var}, ${value})`
		);

		let node_path;
		if (this.template_index) {
			node_path = x`@first_child(${this.template_index}())`;
		// } else {
		// 	const children = remove_whitespace_children(
		// 		this.parent.node.children as INode[],
		// 		this.parent.node.next);
		// 	if (!this.prev) {
		// 		const index = children.indexOf(this.node);
		// 		node_path = x`@first_child(${parent_node})`;
		// 		for (let i = 0 ; i < index ; i += 1) {
		// 			node_path = x`@next_sibling(${node_path})`;
		// 		}
		// 	} else {
		// 		const prev_index = children.indexOf(this.prev.node as INode)
		// 		const index = children.indexOf(this.node);
		// 		node_path = `${this.prev.var.name}`;
		// 		for (let i = prev_index ; i < index ; i += 1) {
		// 			node_path = x`@next_sibling(${node_path})`;
		// 		}
		// 	}
		} else if (parent_node && !this.prev) {
			node_path = x`@first_child(${parent_node})`;
		} else if (this.prev) {
			node_path = x`@next_sibling(${this.prev.var})`;
		}

		const render_statement = x`@replace_text(${node_path}, ${init})`;

		const trim_parent_nodes = this.parent && this.parent.node.children.length === 1 ? x`@trim_nodes(@children(${parent_node}))` : parent_nodes;
		const claim_statement = this.get_claim_template_statement(this.var, node_path, trim_parent_nodes, parent_node);

		block.add_element(
			this.var,
			render_statement,
			claim_statement,
			parent_node
		);
	}
}
