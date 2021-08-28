import Renderer, { RenderOptions } from '../Renderer';
import RawMustacheTag from '../../nodes/RawMustacheTag';
import { Expression } from 'estree';
import { is_static_only } from './utils/is_static_only';

export default function(node: RawMustacheTag, renderer: Renderer, options: RenderOptions) {
	if (is_static_only(options)) {
		renderer.add_string('<!>');
		return;
	}

	if (options.hydratable) renderer.add_string('<!-- HTML_TAG_START -->');
	renderer.add_expression(node.expression.node as Expression);
	if (options.hydratable) renderer.add_string('<!-- HTML_TAG_END -->');
}
