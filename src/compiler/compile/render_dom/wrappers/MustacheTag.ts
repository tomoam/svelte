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
		const is_single = this.is_single_in_fragment();

		const { init } = this.rename_this_method(
			block,
			this.node.should_cache
				? value => x`${is_single ? this.var : this.get_var()}.data = ${value}`
				: value => x`@set_data(${is_single ? this.var : this.get_var()}, ${value})`
		);

		if (is_single) {
			block.add_element(
				this.var,
				x`@text(${init})`,
				parent_nodes && x`@hydrate_text(@text(${init}), ${parent_nodes})`,
				parent_node
			);
		} else {
			const statement = this.get_create_statement(parent_node);
			const render_statement = (!is_text(this.node.prev) && !is_text(this.node.next))
				? statement
				: b`${statement}
					${this.get_var()} = @replace_text(${this.get_var()}, ${init});`;

			block.add_statement(
				this.var,
				this.get_var(),
				render_statement,
				this.get_claim_statement(block, parent_node, parent_nodes),
				this.get_mount_statement(),
				this.get_destroy_statement(),
				parent_node,
				this
			);

			if (!is_text(this.node.prev) && !is_text(this.node.next)) {
				block.chunks.create.push(b`
					${this.get_var()}.data = ${init};	
				`);
			}
		}
	}
}
