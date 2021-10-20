import Wrapper from './shared/Wrapper';
import Renderer from '../Renderer';
import Block from '../Block';
import Head from '../../nodes/Head';
import FragmentWrapper from './Fragment';
import { x, b } from 'code-red';
import { Identifier } from 'estree';

export default class HeadWrapper extends Wrapper {
	fragment: FragmentWrapper;
	node: Head;

	constructor(
		renderer: Renderer,
		block: Block,
		parent: Wrapper,
		node: Head,
		strip_whitespace: boolean,
		next_sibling: Wrapper
	) {
		super(renderer, block, parent, node);

		this.can_use_innerhtml = false;

		this.fragment = new FragmentWrapper(
			renderer,
			block,
			node.children,
			this,
			strip_whitespace,
			next_sibling
		);
	}

	render(block: Block, _parent_node: Identifier, _parent_nodes: Identifier) {
		let nodes;
		if (this.renderer.options.hydratable && this.fragment.nodes.filter(n => n.node.type !== 'Title').length) {
			nodes = block.get_unique_name('head_nodes');
			block.chunks.claim.push(b`const ${nodes} = @query_selector_all('[data-svelte="${this.node.id}"]', @_document.head);`);
		}

		this.fragment.render(block, x`@_document.head` as unknown as Identifier, nodes);

		if (this.renderer.options.hydratable && this.next) {
			if (block.chunks.hydrate.length > 0) {
				block.chunks.claim.push(b`
					if (!#nodes.length) {
						this.h();
						return;
					}
				`);
			} else {
				block.chunks.claim.push(b`if (!#nodes.length) return;`);
			}
		}
	}
}
