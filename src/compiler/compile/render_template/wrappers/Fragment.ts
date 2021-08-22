import Wrapper from './shared/Wrapper';
import AwaitBlock from './AwaitBlock';
import Body from './Body';
import DebugTag from './DebugTag';
import EachBlock from './EachBlock';
import Element from './Element/index';
import Head from './Head';
import IfBlock from './IfBlock';
import KeyBlock from './KeyBlock';
import InlineComponent from './InlineComponent/index';
import MustacheTag from './MustacheTag';
import RawMustacheTag from './RawMustacheTag';
import Slot from './Slot';
import SlotTemplate from './SlotTemplate';
import Text from './Text';
import Title from './Title';
import Window from './Window';
import { INode } from '../../nodes/interfaces';
import Renderer from '../Renderer';
import Block from '../Block';
import { trim_start, trim_end } from '../../../utils/trim';
import { link } from '../../../utils/link';
import { Identifier } from 'estree';
import TemplateRenderer from '../TemplateRenderer';
import { is_static_keyblock } from './shared/is_static_keyblock';
import { is_needed_wrap_by_svg } from './shared/is_needed_wrap_by_svg';

const wrappers = {
	AwaitBlock,
	Body,
	Comment: null,
	DebugTag,
	EachBlock,
	Element,
	Head,
	IfBlock,
	InlineComponent,
	KeyBlock,
	MustacheTag,
	Options: null,
	RawMustacheTag,
	Slot,
	SlotTemplate,
	Text,
	Title,
	Window
};

function trimmable_at(child: INode, next_sibling: Wrapper): boolean {
	// Whitespace is trimmable if one of the following is true:
	// The child and its sibling share a common nearest each block (not at an each block boundary)
	// The next sibling's previous node is an each block
	return (next_sibling.node.find_nearest(/EachBlock/) === child.find_nearest(/EachBlock/)) || next_sibling.node.prev.type === 'EachBlock';
}

export default class FragmentWrapper {
	nodes: Wrapper[];

	constructor(
		renderer: Renderer,
		block: Block,
		nodes: INode[],
		parent: Wrapper,
		strip_whitespace: boolean,
		next_sibling: Wrapper
	) {
		this.nodes = [];

		let last_child: Wrapper;
		let window_wrapper;
		let head_wrappers: Head[] = [];
		let body_wrapper;
		let debugtag_wrappers: { wrapper: DebugTag, anchor: Wrapper }[] = [];

		let i = nodes.length;
		while (i--) {
			const child = nodes[i];

			if (!child.type) {
				throw new Error('missing type');
			}

			if (!(child.type in wrappers)) {
				throw new Error(`TODO implement ${child.type}`);
			}

			// special case — this is an easy way to remove whitespace surrounding
			// <svelte:window/>. lil hacky but it works
			if (child.type === 'Window') {
				window_wrapper = new Window(renderer, block, parent, child);
				continue;
			}

			if (child.type === 'Head') {
				const head_wrapper = new Head(renderer, block, parent, child, strip_whitespace, last_child || next_sibling);
				head_wrappers.push(head_wrapper);
				continue;
			}

			if (child.type === 'Body') {
				body_wrapper = new Body(renderer, block, parent, child);
				continue;
			}

			if (child.type === 'Text') {
				let { data } = child;

				// We want to remove trailing whitespace inside an element/component/block,
				// *unless* there is no whitespace between this node and its next sibling
				if (this.nodes.length === 0) {
					const should_trim = (
						next_sibling ? (next_sibling.node.type === 'Text' && /^\s/.test(next_sibling.node.data) && trimmable_at(child, next_sibling)) : !child.has_ancestor('EachBlock')
					);

					if (should_trim) {
						data = trim_end(data);
						child.data = data;
						if (!data) continue;
					}
				}

				// glue text nodes (which could e.g. be separated by comments) together
				if (!renderer.options.preserveComments && last_child && last_child.node.type === 'Text') {
					(last_child as Text).data = data + (last_child as Text).data;
					child.data = "";
					continue;
				}

				const wrapper = new Text(renderer, block, parent, child, data);
				if (wrapper.skip) continue;

				this.nodes.unshift(wrapper);

				link(last_child, last_child = wrapper);
			} else {
				const Wrapper = wrappers[child.type];
				if (!Wrapper) continue;

				if (is_static_keyblock(child)) {
					nodes.splice(i, 1, ...child.children);
					i = i + child.children.length;
					continue;
				}

				if (child.type === 'Element' && child.name === 'noscript') {
					continue;
				}

				const wrapper = new Wrapper(renderer, block, parent, child, strip_whitespace, last_child || next_sibling);

				if (child.type === 'DebugTag') {
					debugtag_wrappers.push({wrapper, anchor: last_child});
					continue;
				}

				this.nodes.unshift(wrapper);

				link(last_child, last_child = wrapper);
			}
		}

		if (strip_whitespace) {
			const first = this.nodes[0] as Text;

			if (first && first.node.type === 'Text') {
				first.data = trim_start(first.data);
				first.node.data = first.data;
				if (!first.data) {
					first.var = null;
					this.nodes.shift();

					if (this.nodes[0]) {
						this.nodes[0].prev = null;
					}
				}
			}
		}

		if (this.nodes.length > 0 && !(parent instanceof Element) && !(parent instanceof Head)) {
			create_template(this.nodes[0], this.nodes, renderer);
		}

		if (debugtag_wrappers.length) {
			debugtag_wrappers.forEach(dw => {
				const { wrapper, anchor } = dw;
				if (!anchor) {
					this.nodes.push(wrapper);
					return;
				}

				const anchor_index = this.nodes.indexOf(anchor);
				if (anchor_index) {
					this.nodes.splice(anchor_index, 0, wrapper);
				} else {
					this.nodes.unshift(wrapper);
				}
			})
		}

		const filter = (node: Wrapper) => {
			if (node instanceof Text) {
				if (!node.parent ||
					!node.parent.is_dom_node() ||
					(node.next && !node.next.is_dom_node()) ||
					(node.prev && !node.prev.is_dom_node()) ||
					node.next instanceof MustacheTag ||
					(node.prev instanceof MustacheTag && renderer.options.hydratable)
				) {
					return true;
				}
				return false;
			}
			return true;
		};

		this.nodes.filter((n) => !filter(n)).forEach((node) => {
			if (node.prev) {
				link(node.next, node.prev);
			} else if (node.next) {
				node.next.prev = null;
				node.next = null;
			}
		});

		this.nodes = this.nodes.filter(filter);

		if (body_wrapper) {
			this.nodes.unshift(body_wrapper);
			link(last_child, last_child = body_wrapper);
		}

		head_wrappers.forEach((head_node) => {
			const frag_nodes = head_node.fragment.nodes.filter(n => !(n instanceof Title));
			if (frag_nodes.length) create_template(head_node, frag_nodes, renderer);
			this.nodes.unshift(head_node);
			link(last_child, last_child = head_node);
		});

		if (window_wrapper) {
			this.nodes.unshift(window_wrapper);
			link(last_child, window_wrapper);
		}
	}

	render(block: Block, parent_node: Identifier, parent_nodes: Identifier) {
		for (let i = 0; i < this.nodes.length; i += 1) {
			this.nodes[i].render(block, parent_node, parent_nodes);
		}
	}
}

function create_template(node: Wrapper, nodes: Wrapper[], renderer: Renderer) {
	node.template_index = renderer.component.get_unique_name('render').name;
	// console.log("FragmentWrapper crete_template node.node.type", node.node.type);
	// console.log("FragmentWrapper crete_template node.template_index", node.template_index);
	const wrap_by_svg = nodes.some(n => is_needed_wrap_by_svg(n))
	node.template = to_template_literal(
			nodes.map(n => n.node as INode),
			renderer.component.name,
			renderer.component.locate,
			renderer.options,
			wrap_by_svg,
		);
}

function to_template_literal(nodes: INode[], name, locate, options, wrap_by_svg?: boolean) {

	const templateRenderer = new TemplateRenderer({
		name: name 
	});

	if (wrap_by_svg) {
		templateRenderer.add_string('<svg>');
	}

	// create $$render function
	templateRenderer.render((nodes), Object.assign({
		locate: locate
	}, options));
	
	if(wrap_by_svg) {
		templateRenderer.add_string('</svg>');
	}

	// TODO put this inside the Renderer class
	const templateLiteral = templateRenderer.pop();

	return templateLiteral;
}
