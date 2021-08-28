
import Renderer, { RenderOptions } from '../Renderer';
import { x } from 'code-red';
import { is_static_only } from './utils/is_static_only';
import { is_text } from './utils/is_text';

export default function(node, renderer: Renderer, _options: RenderOptions) {

	if (is_static_only(_options)) {
		if (is_text(node.prev) || is_text(node.next)) {
			renderer.add_string('<!>');
		} else {
			renderer.add_string(' ');
		}
		return;
	}

	const snippet = node.expression.node;

	renderer.add_expression(
		node.parent &&
		node.parent.type === 'Element' &&
		node.parent.name === 'style'
			? snippet
			: x`@escape(${snippet})`
	);
}
