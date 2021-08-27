import { escape_html } from '../../utils/stringify';
import Renderer, { RenderOptions } from '../Renderer';
import Text from '../../nodes/Text';
import Element from '../../nodes/Element';
import { is_static_only } from './utils/is_static_only';

export default function(node: Text, renderer: Renderer, _options: RenderOptions) {
	let text = is_static_only(_options) ? node.data.replace(/[\t\n\r ]+/g, " ") : node.data;
	if (
		!node.parent ||
		node.parent.type !== 'Element' ||
		((node.parent as Element).name !== 'script' && (node.parent as Element).name !== 'style')
	) {
		// unless this Text node is inside a <script> or <style> element, escape &,<,>
		text = escape_html(text);
	}

	renderer.add_string(text);
}
