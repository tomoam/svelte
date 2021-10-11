import KeyBlock from '../../nodes/KeyBlock';
import Renderer, { RenderOptions } from '../Renderer';
import { is_static_only } from './utils/is_static_only';
import remove_whitespace_children from './utils/remove_whitespace_children';

export default function(node: KeyBlock, renderer: Renderer, options: RenderOptions) {
	if (is_static_only(options)) {
		renderer.add_string('<!>');
		return;
	}

	renderer.render(remove_whitespace_children(node.children, node.next, options.preserveComments), options);
}
