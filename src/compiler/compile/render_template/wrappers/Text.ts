import Renderer from '../Renderer';
import Block from '../Block';
import Text from '../../nodes/Text';
import Wrapper from './shared/Wrapper';
import { x } from 'code-red';
import { Identifier } from 'estree';
import { get_node_path } from './shared/get_node_path';

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

	get_claim_statement(template_node: Identifier | string, parent_nodes: (ReturnType<typeof x>) | Identifier | string, target?: Identifier | string) {
		const nodes = parent_nodes || '[]';
		return x`@claim_text_experimental(${template_node}, ${nodes}, ${target})`;
	}

	render(block: Block, parent_node: Identifier, parent_nodes: Identifier) {
		if (this.skip) return;

		const render_statement = get_node_path(this, parent_node);
		const trim_parent_nodes = parent_node && this.parent.node.children.length === 1 ? x`@trim_nodes(@children(${parent_node}))` : parent_nodes || "#nodes";
		const claim_statement = this.get_claim_statement(this.var, trim_parent_nodes, parent_node);
	
		block.add_element(
			this.var,
			render_statement,
			claim_statement,
			parent_node as Identifier
		);
	}
}
