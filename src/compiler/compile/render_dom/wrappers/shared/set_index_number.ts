import { b } from 'code-red';
import { namespaces } from '../../../../utils/namespaces';
import Block from '../../Block';
import Renderer from '../../Renderer';
import Wrapper from './Wrapper';

export function set_index_number_to_fragment(nodes: Wrapper[], renderer: Renderer, block: Block, root_node?) {
	const frag_nodes = nodes.filter(v => v.node.type !== 'DebugTag');

	if (frag_nodes.length) {
		const root = root_node || frag_nodes[0];
		frag_nodes.forEach((child) => {
			child.set_index_number(root);
		});

		if (!renderer.options.namespace || renderer.options.namespace === namespaces.svg) {

			if (is_no_need_render_nodes(root)) {
				root.template_name = null;
				root.template = null;
			} else {
				root.render_nodes_var = block.get_unique_name('render_nodes');
				block.chunks.declarations.push(b`
					let ${root.render_nodes_var} = [];
				`);
			}
		}
	}
}

export function is_no_need_render_nodes(root_node: Wrapper) {
	const no_need_if_single = ['MustacheTag', 'InlineComponent', 'IfBlock', 'EachBlock', 'Slot', 'Title'];
	if (root_node.is_single_in_fragment() && no_need_if_single.includes(root_node.node.type)) {
		return true;
	} else {
		return false;
	}
}
