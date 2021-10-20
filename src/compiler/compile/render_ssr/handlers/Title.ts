import Renderer, { RenderOptions } from '../Renderer';
import Title from '../../nodes/Title';
import remove_whitespace_children from './utils/remove_whitespace_children';
import { x } from 'code-red';
import { is_static_only } from './utils/is_static_only';

export default function(node: Title, renderer: Renderer, options: RenderOptions) {
	if (is_static_only(options)) return;

	renderer.push();

	renderer.add_string('<title>');

	renderer.render(remove_whitespace_children(node.children, node.next, options.preserveComments), options);

	renderer.add_string('</title>');
	const result = renderer.pop();

	renderer.add_expression(x`$$result.title = ${result}, ""`);
}
