import Renderer from '../Renderer';
import Block from '../Block';
import Tag from './shared/Tag';
import Wrapper from './shared/Wrapper';
import MustacheTag from '../../nodes/MustacheTag';
import RawMustacheTag from '../../nodes/RawMustacheTag';
import { b, x } from 'code-red';
import { Identifier } from 'estree';
import { is_text } from '../../render_ssr/handlers/utils/is_text';

export default class MustacheTagWrapper extends Tag {
	var: Identifier = { type: 'Identifier', name: 't' };

	constructor(renderer: Renderer, block: Block, parent: Wrapper, node: MustacheTag | RawMustacheTag) {
		super(renderer, block, parent, node);
		this.mark_as_on_traverse_path();
	}

	render(block: Block, parent_node: Identifier, parent_nodes: Identifier) {
		const { init } = this.rename_this_method(
			block,
			value => x`@set_data(${this.var}, ${value})`
		);

		const node_path = this.get_node_path(parent_node);
		const render_statement = (!is_text(this.node.prev) && !is_text(this.node.next)) ? node_path : x`@replace_text(${node_path}, ${init})`;

		const trim_parent_nodes = parent_node && this.parent.node.children.length === 1 ? x`@trim_nodes(@children(${parent_node}))` : parent_nodes || '#nodes';
		const claim_statement = x`@claim_text(${this.var}, ${trim_parent_nodes}, ${parent_node})`;

		block.add_element(
			this.var,
			render_statement,
			claim_statement,
			parent_node
		);

		if (!is_text(this.node.prev) && !is_text(this.node.next)) {
			block.chunks.create.push(b`
				${this.var}.data = ${init};	
			`);
		}
	}
}
