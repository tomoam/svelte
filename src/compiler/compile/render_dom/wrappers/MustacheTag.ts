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

	set_index_number(root_node: Wrapper) {
		super.set_index_number(root_node);

		this.push_to_node_path(true);
	}

	render(block: Block, parent_node: Identifier, parent_nodes: Identifier) {
		const { init } = this.rename_this_method(
			block,
			value => x`@set_data(${this.get_var()}, ${value})`
		);

		const statement = this.get_create_statement(parent_node);
		const render_statement = (!is_text(this.node.prev) && !is_text(this.node.next))
			? statement
			: b`${statement}
				${this.get_var()} = @replace_text(${this.get_var()}, ${init});`;

		const claim_statement = this.get_claim_statement(block, parent_node, parent_nodes);

		block.add_statement(
			this.var,
			this.get_var(),
			render_statement,
			claim_statement,
			parent_node,
		);

		if (!is_text(this.node.prev) && !is_text(this.node.next)) {
			block.chunks.create.push(b`
				${this.get_var()}.data = ${init};	
			`);
		}
	}
}
