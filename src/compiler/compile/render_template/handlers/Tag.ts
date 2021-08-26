
import MustacheTag from '../../nodes/MustacheTag';
import { is_text } from '../shared/is_text';
import Renderer, { RenderOptions } from '../TemplateRenderer';
// import { x } from 'code-red';

export default function(node: MustacheTag, renderer: Renderer, _options: RenderOptions) {
	// const snippet = node.expression.node;

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

		// renderer.add_expression(snippet);
	} else {
		if (is_text(node.prev) || is_text(node.next)) {
			renderer.add_string("<!>");
		} else {
			renderer.add_string(" ");
		}
	}
}
