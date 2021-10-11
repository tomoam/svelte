import IfBlock from '../../nodes/IfBlock';
import Renderer, { RenderOptions } from '../Renderer';
import { x } from 'code-red';
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
	const consequent = renderer.pop();

	renderer.push();
	if (node.else) renderer.render(remove_whitespace_children(node.else.children, node.next, options.preserveComments), options);
	const alternate = renderer.pop();

	renderer.add_expression(x`${condition} ? ${consequent} : ${alternate}`);
}
