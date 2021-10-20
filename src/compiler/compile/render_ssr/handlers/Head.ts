import Renderer, { RenderOptions } from '../Renderer';
import Head from '../../nodes/Head';
import { x } from 'code-red';
import { is_static_only } from './utils/is_static_only';
import remove_whitespace_children from './utils/remove_whitespace_children';

export default function(node: Head, renderer: Renderer, options: RenderOptions) {
	const head_options = {
		...options,
		head_id: node.id
	};

	if (is_static_only(options)) {
		renderer.render(remove_whitespace_children(node.children.filter(n => n.type !== 'Title'), node.next, options.preserveComments), head_options);
		return;
	}

	renderer.push();
	renderer.render(remove_whitespace_children(node.children, node.next, options.preserveComments), head_options);
	const result = renderer.pop();

	renderer.add_expression(x`$$result.head += ${result}, ""`);
}
