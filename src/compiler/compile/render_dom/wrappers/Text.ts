import Renderer from '../Renderer';
import Block from '../Block';
import Text from '../../nodes/Text';
import Wrapper from './shared/Wrapper';
import { x } from 'code-red';
import { Identifier } from 'estree';

export default class TextWrapper extends Wrapper {
	node: Text;
	data: string;
	skip: boolean;
	var: Identifier;

	constructor(
		renderer: Renderer,
		block: Block,
		parent: Wrapper,
		node: Text,
		data: string
	) {
		super(renderer, block, parent, node);

		this.skip = this.node.should_skip();
		this.data = data;
		this.var = (this.skip ? null : x`t`) as unknown as Identifier;
	}

	use_space() {
		if (this.renderer.component.component_options.preserveWhitespace) return false;
		if (/[\S\u00A0]/.test(this.data)) return false;

		let node = this.parent && this.parent.node;
		while (node) {
			if (node.type === 'Element' && node.name === 'pre') {
				return false;
			}
			node = node.parent;
		}

		return true;
	}

	set_index_number(root_node: Wrapper) {
		super.set_index_number(root_node);

		if (
			!this.template_name && (
			!this.parent ||
			!this.parent.is_dom_node() ||
			this.prev && !this.prev.is_dom_node()
		)) {
			this.push_to_node_path(true);
		} else {
			this.push_to_node_path(false);
		}
	}

	render(block: Block, parent_node: Identifier, parent_nodes: Identifier) {
		if (this.skip) return;

		const render_statement = this.get_create_statement(parent_node);

		const claim_statement = this.get_claim_statement(block, parent_node, parent_nodes);

		block.add_statement(
			this.var,
			this.get_var(),
			render_statement,
			claim_statement,
			parent_node as Identifier
		);
	}
}
