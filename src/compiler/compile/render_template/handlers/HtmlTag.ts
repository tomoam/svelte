import Renderer, { RenderOptions } from '../TemplateRenderer';
import RawMustacheTag from '../../nodes/RawMustacheTag';
// import { Expression } from 'estree';

export default function(_node: RawMustacheTag, renderer: Renderer, _options: RenderOptions) {
	// if (options.hydratable) renderer.add_string('<!-- HTML_TAG_START -->');
	// renderer.add_expression(node.expression.node as Expression);
	renderer.add_string('<!>');
	// if (options.hydratable) renderer.add_string('<!-- HTML_TAG_END -->');
}
