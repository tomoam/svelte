
import Renderer, { RenderOptions } from '../TemplateRenderer';
// import { x } from 'code-red';

export default function(node, renderer: Renderer, _options: RenderOptions) {
	const snippet = node.expression.node;

	// renderer.add_expression(
	// 	node.parent &&
	// 	node.parent.type === 'Element' &&
	// 	node.parent.name === 'style'
	// 		? snippet
	// 		: x`@escape(${snippet})`
	// );

	if (node.parent &&
		node.parent.type === 'Element' &&
		node.parent.name === 'style') {

		renderer.add_expression(snippet);
	} else {
		renderer.add_string("<!>");
	}
}
