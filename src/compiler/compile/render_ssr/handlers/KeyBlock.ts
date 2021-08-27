import KeyBlock from '../../nodes/KeyBlock';
import Renderer, { RenderOptions } from '../Renderer';
import { is_static_only } from './utils/is_static_only';

export default function(node: KeyBlock, renderer: Renderer, options: RenderOptions) {
	if (is_static_only(options)) {
		renderer.add_string('<!>');
		return
	}

	renderer.render(node.children, options);
}
