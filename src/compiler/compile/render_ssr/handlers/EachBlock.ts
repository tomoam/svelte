import Renderer, { RenderOptions } from '../Renderer';
import EachBlock from '../../nodes/EachBlock';
import { x } from 'code-red';
import { get_const_tags } from './shared/get_const_tags';
import { Node } from 'estree';
import { is_static_only } from './utils/is_static_only';
import remove_whitespace_children from './utils/remove_whitespace_children';

export default function(node: EachBlock, renderer: Renderer, options: RenderOptions) {
	if (is_static_only(options)) {
		renderer.add_string('<!>');
		return;
	}

	const args = [node.context_node];
	if (node.index) args.push({ type: 'Identifier', name: node.index });

	renderer.push();
	renderer.render(remove_whitespace_children(node.children, node.next, options.preserveComments), options);
	const result = renderer.pop();

	const consequent = x`@each(${node.expression.node}, (${args}) => { ${get_const_tags(node.const_tags)}; return ${result} })`;

	if (node.else) {
		renderer.push();
		renderer.render(remove_whitespace_children(node.else.children, node.next, options.preserveComments), options);
		let alternate: Node = renderer.pop();
		if (node.else.const_tags.length > 0) alternate = x`(() => { ${get_const_tags(node.else.const_tags)}; return ${alternate} })()`;

		renderer.add_expression(x`${node.expression.node}.length ? ${consequent} : ${alternate}`);
	} else {
		renderer.add_expression(consequent);
	}
}
