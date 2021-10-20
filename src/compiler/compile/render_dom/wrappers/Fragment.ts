import Wrapper from './shared/Wrapper';
import AwaitBlock from './AwaitBlock';
import Body from './Body';
import Comment from './Comment';
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
import TemplateRenderer from '../../render_ssr/Renderer';
import { is_static_keyblock } from './shared/is_static_keyblock';
import { needs_svg_wrapper } from './shared/needs_svg_wrapper';
import { set_index_number_to_fragment } from './shared/set_index_number';

const wrappers = {
	AwaitBlock,
	Body,
	Comment,
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
		const head_wrappers: Head[] = [];
		let body_wrapper;
		const debugtag_wrappers: Array<{ wrapper: DebugTag, anchor: Wrapper }> = [];

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

					if (should_trim && !child.keep_space()) {
						data = trim_end(data);
						child.data = data;
						if (!data) continue;
					}
				}

				// glue text nodes (which could e.g. be separated by comments) together
				if (!renderer.options.preserveComments && last_child && last_child.node.type === 'Text') {
					(last_child as Text).data = data + (last_child as Text).data;
					child.data = '';
					continue;
				}

				const wrapper = new Text(renderer, block, parent, child, data);
				if (wrapper.skip) continue;

				this.nodes.unshift(wrapper);

				link(last_child, last_child = wrapper);
			} else {

				const Wrapper = wrappers[child.type];
				if (!Wrapper) continue;

				if (!renderer.options.preserveComments && child.type === 'Comment') {
					continue;
				}

				if (is_static_keyblock(child)) {
					nodes.splice(i, 1, ...child.children);
					i = i + child.children.length;
					continue;
				}

				if (!renderer.options.hydratable && child.type === 'Element' && child.name === 'noscript') {
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

			if (first && first.node.type === 'Text' && !first.node.keep_space()) {
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

		if (this.nodes.length > 0 && (!parent || !parent.node || (parent.node.type !== 'Element' && parent.node.type !== 'Head'))) {
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
			});
		}

		const filter = (node: Wrapper) => {
			if (check_traverse_path(node, parent)) {
				return true;
			}
			return false;
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

		if (!parent && this.nodes.length) {
			set_index_number_to_fragment(this.nodes[0], this.nodes, renderer, block);
		}

		if (body_wrapper) {
			this.nodes.unshift(body_wrapper);
			link(last_child, last_child = body_wrapper);
		}

		head_wrappers.forEach((head_node) => {
			const frag_nodes = head_node.fragment.nodes.filter(n => n.node.type !== 'Title');

			set_index_number_to_fragment(head_node, frag_nodes, renderer, block);

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
	node.template_name = renderer.component.get_unique_name('render').name;
	node.node_path_var_name = renderer.component.get_unique_name('node_path').name;
	const svg_wrap = nodes.some(n => needs_svg_wrapper(n));
	node.template = to_template_literal(
			nodes.map(n => n.node as INode),
			renderer.component.name,
			renderer.component.locate,
			renderer.options,
			svg_wrap
		);
}

function to_template_literal(nodes: INode[], name, locate, options, svg_wrap?: boolean) {

	const templateRenderer = new TemplateRenderer({ name });

	if (svg_wrap) {
		templateRenderer.add_string('<svg>');
	}

	// create $$render function
	templateRenderer.render((nodes), Object.assign({ locate }, options));
	
	if (svg_wrap) {
		templateRenderer.add_string('</svg>');
	}

	// TODO put this inside the Renderer class
	const templateLiteral = templateRenderer.pop();

	return templateLiteral;
}

function check_traverse_path(node: Wrapper, parent: Wrapper) {

	if (!parent || (node.prev && (!node.prev.is_dom_node() || node.prev.node.type === 'MustacheTag')) || !node.is_static_content || node.is_on_traverse_path) {
		if (!node.is_on_traverse_path || (node.prev && !node.prev.is_on_traverse_path)) {
			node.mark_as_on_traverse_path();
		}
		return true;
	}

	if (node.next) {
		return check_traverse_path(node.next, parent);
	}

	return false;
}
