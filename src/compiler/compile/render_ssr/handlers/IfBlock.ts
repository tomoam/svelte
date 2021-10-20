import IfBlock from '../../nodes/IfBlock';
import Renderer, { RenderOptions } from '../Renderer';
import { x } from 'code-red';
import { get_const_tags } from './shared/get_const_tags';
import { Node } from 'estree';
import { is_static_only } from './utils/is_static_only';
import remove_whitespace_children from './utils/remove_whitespace_children';

export default function(node: IfBlock, renderer: Renderer, options: RenderOptions) {
	if (is_static_only(options)) {
		renderer.add_string('<!>');
		return;
	}

	const condition = node.expression.node;

	renderer.push();
	renderer.render(remove_whitespace_children(node.children, node.next, options.preserveComments), options);
	let consequent: Node = renderer.pop();
	if (node.const_tags.length > 0) consequent = x`(() => { ${get_const_tags(node.const_tags)}; return ${consequent} })()`;

	renderer.push();
	if (node.else) renderer.render(remove_whitespace_children(node.else.children, node.next, options.preserveComments), options);
	let alternate: Node = renderer.pop();
	if (node.else && node.else.const_tags.length > 0) alternate = x`(() => { ${get_const_tags(node.else.const_tags)}; return ${alternate} })()`;

	renderer.add_expression(x`${condition} ? ${consequent} : ${alternate}`);
}
