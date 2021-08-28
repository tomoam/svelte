import Renderer, { RenderOptions } from '../Renderer';
import Title from '../../nodes/Title';
import { x } from 'code-red';
import { is_static_only } from './utils/is_static_only';

export default function(node: Title, renderer: Renderer, options: RenderOptions) {
	if (is_static_only(options)) return;

	renderer.push();

	renderer.add_string('<title>');

	renderer.render(node.children, options);

	renderer.add_string('</title>');
	const result = renderer.pop();

	renderer.add_expression(x`$$result.title = ${result}, ""`);
}
