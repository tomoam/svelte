import Renderer, { RenderOptions } from '../Renderer';
import AwaitBlock from '../../nodes/AwaitBlock';
import { x } from 'code-red';
import { is_static_only } from './utils/is_static_only';
import remove_whitespace_children from './utils/remove_whitespace_children';

export default function(node: AwaitBlock, renderer: Renderer, options: RenderOptions) {
	if (is_static_only(options)) {
		renderer.add_string('<!>');
		return;
	}

	renderer.push();
	renderer.render(remove_whitespace_children(node.pending.children, node.next, options.preserveComments), options);
	const pending = renderer.pop();

	renderer.push();
	renderer.render(remove_whitespace_children(node.then.children, node.next, options.preserveComments), options);
	const then = renderer.pop();

	renderer.add_expression(x`
		function(__value) {
			if (@is_promise(__value)) return ${pending};
			return (function(${node.then_node ? node.then_node : ''}) { return ${then}; }(__value));
		}(${node.expression.node})
	`);

	// renderer.add_string('<!---->');
}
