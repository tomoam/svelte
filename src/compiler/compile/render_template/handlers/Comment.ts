import Renderer, { RenderOptions } from '../TemplateRenderer';
import Comment from '../../nodes/Comment';

export default function(node: Comment, renderer: Renderer, options: RenderOptions) {
	if (options.preserveComments) {
		renderer.add_string(`<!--${node.data}-->`);
	}
}
