import { b } from 'code-red';
import { namespaces } from '../../../../utils/namespaces';
import Block from '../../Block';
import Renderer from '../../Renderer';
import Wrapper from './Wrapper';

export function set_index_number_to_fragment(root_node: Wrapper, nodes: Wrapper[], renderer: Renderer, block: Block) {
	if (nodes.length) {
		nodes.forEach((child) => {
			child.set_index_number(root_node);
		});

		if (!renderer.options.namespace || renderer.options.namespace === namespaces.svg) {
			root_node.render_nodes_var = block.get_unique_name('render_nodes');
			block.chunks.declarations.push(b`
				let ${root_node.render_nodes_var} = [];
			`);
		}
	}
}
