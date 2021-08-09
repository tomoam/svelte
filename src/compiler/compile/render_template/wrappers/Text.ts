import Renderer from '../Renderer';
import Block from '../Block';
import Text from '../../nodes/Text';
import Wrapper from './shared/Wrapper';
import { x } from 'code-red';
import { Identifier } from 'estree';
import IfBlockWrapper from './IfBlock';
import EachBlockWrapper from './EachBlock';
import InlineComponentWrapper from './InlineComponent';

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

	get_claim_template_statement(template_node: Identifier | string, ssr_node: (ReturnType<typeof x>) | string, target?: Identifier | string) {
		if (target) {
			return x`@claim_template_text(${template_node}, ${ssr_node}, [], ${target})`;
		} else {
			return x`@claim_template_text(${template_node}, ${ssr_node}, #nodes)`;
		}
	}

	render(block: Block, parent_node: Identifier, _parent_nodes: Identifier) {
		if (this.skip) return;

		let render_statement;
		let claim_statement;
		if (this.template_index) {
			render_statement = x`@first_child(${this.template_index}())`;
			claim_statement = this.get_claim_template_statement(this.var, "nodes[0]");
		} else {
			if (
				this.prev instanceof IfBlockWrapper ||
				this.prev instanceof EachBlockWrapper ||
				this.prev instanceof InlineComponentWrapper
			) {
				if (this.prev.prev) {
					render_statement = x`@next_sibling(next_sibling(${this.prev.prev.var}))`;
				} else if (this.prev.parent) {
					render_statement = x`@next_sibling(first_child(${this.prev.parent.var}))`;
				} else {
					render_statement = x`@next_sibling(first_child(${this.prev.template_index}()))`;
				}
			} else if (this.prev) {
				render_statement = x`@next_sibling(${this.prev.var})`;
			} else {
				render_statement = x`@first_child(${parent_node})`;
			}

			claim_statement = this.get_claim_template_statement(this.var, render_statement, parent_node);
		}

		block.add_element(
			this.var,
			render_statement,
			claim_statement,
			parent_node as Identifier
		);
	}
}
