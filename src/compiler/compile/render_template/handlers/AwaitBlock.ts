import Renderer, { RenderOptions } from '../TemplateRenderer';
import AwaitBlock from '../../nodes/AwaitBlock';
import { x } from 'code-red';

export default function(node: AwaitBlock, renderer: Renderer, options: RenderOptions) {
	if (options.generate === 'template') {
		renderer.add_string('<!>');
		return;
	}

	renderer.push();
	renderer.render(node.pending.children, options);
	const pending = renderer.pop();

	renderer.push();
	renderer.render(node.then.children, options);
	const then = renderer.pop();

	renderer.add_expression(x`
		function(__value) {
			if (@is_promise(__value)) return ${pending};
			return (function(${node.then_node ? node.then_node : ''}) { return ${then}; }(__value));
		}(${node.expression.node})
	`);
}
