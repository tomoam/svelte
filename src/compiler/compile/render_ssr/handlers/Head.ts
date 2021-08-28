import Renderer, { RenderOptions } from '../Renderer';
import Head from '../../nodes/Head';
import { x } from 'code-red';
import { is_static_only } from './utils/is_static_only';

export default function(node: Head, renderer: Renderer, options: RenderOptions) {
	const head_options = {
		...options,
		head_id: node.id
	};

	if (is_static_only(options)) {
		renderer.render(node.children.filter(n => n.type !== 'Title'), head_options);
		return;
	}

	renderer.push();
	renderer.render(node.children, head_options);
	const result = renderer.pop();

	renderer.add_expression(x`$$result.head += ${result}, ""`);
}
