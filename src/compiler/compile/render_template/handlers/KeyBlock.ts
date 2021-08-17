import KeyBlock from '../../nodes/KeyBlock';
import Renderer, { RenderOptions } from '../TemplateRenderer';

export default function(_node: KeyBlock, renderer: Renderer, _options: RenderOptions) {
	// renderer.render(node.children, options);
	renderer.add_string('<!>');
}
