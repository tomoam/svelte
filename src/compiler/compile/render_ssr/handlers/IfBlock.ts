import IfBlock from '../../nodes/IfBlock';
import Renderer, { RenderOptions } from '../Renderer';
import { x } from 'code-red';
import { is_static_only } from './utils/is_static_only';

export default function(node: IfBlock, renderer: Renderer, options: RenderOptions) {
	if (is_static_only(options)) {
		renderer.add_string('<!>');
		return;
	}

	const condition = node.expression.node;

	renderer.push();
	renderer.render(node.children, options);
	const consequent = renderer.pop();

	renderer.push();
	if (node.else) renderer.render(node.else.children, options);
	const alternate = renderer.pop();

	renderer.add_expression(x`${condition} ? ${consequent} : ${alternate}`);
}
