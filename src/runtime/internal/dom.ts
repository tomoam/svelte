import { has_prop } from './utils';

// Track which nodes are claimed during hydration. Unclaimed nodes can then be removed from the DOM
// at the end of hydration without touching the remaining nodes.
let is_hydrating = false;

export function start_hydrating() {
	is_hydrating = true;
}
export function end_hydrating() {
	is_hydrating = false;
}

type NodeEx = Node & {
	claim_order?: number,
	hydrate_init? : true,
	actual_end_child?: NodeEx,
	childNodes: NodeListOf<NodeEx>,
};

export function append(target: Node, node: Node) {
	target.appendChild(node);
}

export function append_styles(
	target: Node,
	style_sheet_id: string,
	styles: string
) {
	const append_styles_to = get_root_for_style(target);

	if (!append_styles_to.getElementById(style_sheet_id)) {
		const style = element('style');
		style.id = style_sheet_id;
		style.textContent = styles;
		append_stylesheet(append_styles_to, style);
	}
}

export function get_root_for_style(node: Node): ShadowRoot | Document {
	if (!node) return document;

	const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
	if (root && (root as ShadowRoot).host) {
		return root as ShadowRoot;
	}
	return node.ownerDocument;
}

export function append_empty_stylesheet(node: Node) {
	const style_element = element('style') as HTMLStyleElement;
	append_stylesheet(get_root_for_style(node), style_element);
	return style_element;
}

function append_stylesheet(node: ShadowRoot | Document, style: HTMLStyleElement) {
	append((node as Document).head || node, style);
}

export function insert(target: Node, node: Node, anchor?: Node) {
	target.insertBefore(node, anchor || null);
}

export function insert_hydration(target: NodeEx, node: NodeEx, anchor?: NodeEx) {
	if (is_hydrating && !anchor && node.parentNode !== target) {
		target.appendChild(node);
	} else if (node.parentNode !== target || node.nextSibling != anchor) {
		target.insertBefore(node, anchor || null);
	}
}

export function detach(node: Node) {
	node.parentNode.removeChild(node);
}

export function destroy_each(iterations, detaching) {
	for (let i = 0; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].d(detaching);
	}
}

export function element<K extends keyof HTMLElementTagNameMap>(name: K) {
	return document.createElement<K>(name);
}

export function element_is<K extends keyof HTMLElementTagNameMap>(name: K, is: string) {
	return document.createElement<K>(name, { is });
}

export function object_without_properties<T, K extends keyof T>(obj: T, exclude: K[]) {
	const target = {} as Pick<T, Exclude<keyof T, K>>;
	for (const k in obj) {
		if (
			has_prop(obj, k)
			// @ts-ignore
			&& exclude.indexOf(k) === -1
		) {
			// @ts-ignore
			target[k] = obj[k];
		}
	}
	return target;
}

export function svg_element<K extends keyof SVGElementTagNameMap>(name: K): SVGElement {
	return document.createElementNS<K>('http://www.w3.org/2000/svg', name);
}

export function text(data: string) {
	return document.createTextNode(data);
}

export function init_each_block(get_each_context, ctx, each_value, get_key, lookup, each_blocks, create_each_block, length: number = each_blocks.length) {
	for (let i = 0; i < length; i=(i+1)|0) {
		let child_ctx = get_each_context(ctx, each_value, i);
		let key = get_key(child_ctx);
		lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
	}
}

export function traverse(node: ChildNode[], fragment: Node, routes: Array<number> = []) {
	node[0] = fragment.firstChild;
	for (let i = 1 ; i < routes.length ; i=(i+1)|0) {
		node[i] = routes[i] === 0 ? node[i - 1].firstChild : node[routes[i] - 1].nextSibling;
	}
}

export function replace_text(elm: ChildNode, data: string) {
	const textNode = text(data);
	elm.replaceWith(textNode);
	elm = textNode;
}

export function insert_blank_anchor(next_node: ChildNode, parent_node?: ChildNode) {
	const target = parent_node || next_node.parentNode;
	const anchor = empty();
	insert_hydration(target, anchor, next_node);
	return anchor;
}

export function replace_or_appned_node(old_node: ChildNode, new_node: ChildNode, parent_node?: ChildNode) {
	if (!new_node) return old_node;
	if (old_node) {
		old_node.replaceWith(new_node);
	} else if (parent_node) {
		parent_node.appendChild(new_node);
	}
	return new_node;
}

function create_template(html) {
	const template = document.createElement('template');
	template.innerHTML = html;
	return template;
}

export function make_renderer(html) {
	const template = create_template(html);
	return () => template.content.cloneNode(true);
}

export function make_custom_renderer(html) {
	const template = create_template(html);
	return () => document.importNode(template.content, true);
}

export function space() {
	return text(' ');
}

export function empty() {
	return text('');
}

export function listen(node: EventTarget, event: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions | EventListenerOptions) {
	node.addEventListener(event, handler, options);
	return () => node.removeEventListener(event, handler, options);
}

export function prevent_default(fn) {
	return function(event) {
		event.preventDefault();
		// @ts-ignore
		return fn.call(this, event);
	};
}

export function stop_propagation(fn) {
	return function(event) {
		event.stopPropagation();
		// @ts-ignore
		return fn.call(this, event);
	};
}

export function self(fn) {
	return function(event) {
		// @ts-ignore
		if (event.target === this) fn.call(this, event);
	};
}

export function trusted(fn) {
	return function(event) {
		// @ts-ignore
		if (event.isTrusted) fn.call(this, event);
	};
}

export function attr(node: Element, attribute: string, value?: string) {
	if (value == null) node.removeAttribute(attribute);
	else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}

export function set_attributes(node: Element & ElementCSSInlineStyle, attributes: { [x: string]: string }) {
	// @ts-ignore
	const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
	for (const key in attributes) {
		if (attributes[key] == null) {
			node.removeAttribute(key);
		} else if (key === 'style') {
			node.style.cssText = attributes[key];
		} else if (key === '__value') {
			(node as any).value = node[key] = attributes[key];
		} else if (descriptors[key] && descriptors[key].set) {
			node[key] = attributes[key];
		} else {
			attr(node, key, attributes[key]);
		}
	}
}

export function set_svg_attributes(node: Element & ElementCSSInlineStyle, attributes: { [x: string]: string }) {
	for (const key in attributes) {
		attr(node, key, attributes[key]);
	}
}

export function set_custom_element_data(node, prop, value) {
	if (prop in node) {
		node[prop] = typeof node[prop] === 'boolean' && value === '' ? true : value;
	} else {
		attr(node, prop, value);
	}
}

export function xlink_attr(node, attribute, value) {
	node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
}

export function get_binding_group_value(group, __value, checked) {
	const value = new Set();
	for (let i = 0; i < group.length; i += 1) {
		if (group[i].checked) value.add(group[i].__value);
	}
	if (!checked) {
		value.delete(__value);
	}
	return Array.from(value);
}

export function to_number(value) {
	return value === '' ? null : +value;
}

export function time_ranges_to_array(ranges) {
	const array = [];
	for (let i = 0; i < ranges.length; i += 1) {
		array.push({ start: ranges.start(i), end: ranges.end(i) });
	}
	return array;
}

type ChildNodeEx = ChildNode & NodeEx;

type ChildNodeArray = ChildNodeEx[] & {
	claim_info?: {
		/**
		 * The index of the last claimed element
		 */
		last_index: number;
		/**
		 * The total number of elements claimed
		 */
		total_claimed: number;
	}
};

export function children(element: Element) {
	return Array.from(element.childNodes);
}

export function trim_nodes(nodes: ChildNode[]) {
	if (nodes.length > 1) {
		if (is_whitespace(nodes[0])) nodes.shift(); 

		if (is_whitespace(nodes[nodes.length - 1])) nodes.pop();
	}

	return nodes;
}

function is_whitespace(node: ChildNode) {
	return node.nodeType === 3 && !(node as Text).data.replace(/^\s+/, '');
}

function init_claim_info(nodes: ChildNodeArray) {
	if (nodes.claim_info === undefined) {
		nodes.claim_info = {last_index: 0, total_claimed: 0};
	}
}

function claim_node<R extends ChildNodeEx>(ssr_node: ChildNode, nodes: ChildNodeArray, predicate: (node: ChildNodeEx) => node is R, processNode: (node: ChildNodeEx) => ChildNodeEx | undefined, createNode: () => R) {

	const resultNode = (() => {
		if (ssr_node) {
			if (predicate(ssr_node)) {
				return processNode(ssr_node);
			} else if (is_whitespace(ssr_node)) {
				let next_node = ssr_node.nextSibling;
				if (nodes.length > 0) {
					nodes.splice(0, 1);
				}

				if (!next_node) next_node = nodes[0];

				if (next_node && predicate(next_node)) {
					return processNode(next_node);
				}
			}
		}

		// If we can't find any matching node, we create a new one
		return createNode();
	})();

	return resultNode;
}

export function claim_element(template_node: Element, nodes: ChildNodeArray, target?: ChildNode) {
	let ssr_node = nodes.length ? nodes[0] : undefined;

	if (ssr_node && ssr_node.nodeType !== 1) {
		nodes.splice(0, 1);
		ssr_node = (ssr_node as Text).nextElementSibling;
	}

	return claim_node<Element | SVGElement>(
		ssr_node,
		nodes,
		(node: ChildNode): node is Element | SVGElement => node.nodeName === template_node.nodeName,
		(node: Element) => {
			const remove = [];
			for (let j = 0; j < node.attributes.length; j++) {
				const attribute = node.attributes[j];
				const attribute_name = attribute.name;
				const template_attribute = template_node.attributes[attribute_name];
				if (!template_attribute) {
					remove.push(attribute_name);
				} else {
					if (attribute.value !== template_attribute.value) {
						node.setAttribute(attribute_name, template_attribute.value);
					}
					template_node.removeAttribute(attribute_name);
				}
			}
			remove.forEach(v => node.removeAttribute(v));
			for (let j = 0; j < template_node.attributes.length; j++) {
				const attribute = template_node.attributes[j];
				const attribute_name = attribute.name;
				if (!node.attributes[attribute_name]) {
					node.setAttribute(attribute_name, attribute.value);
				}
			}
			if (nodes.length > 0) nodes.splice(0, 1);
			return node;
		},
		() =>  {
			if (target) insert_hydration(target, template_node);
			return template_node;
		}
	);
}

export function claim_text(template_node: Text, nodes: ChildNodeArray, target?: ChildNode) {
	const ssr_node = nodes.length ? nodes[0] : undefined;

	let data;

	return claim_node<Text>(
		ssr_node,
		nodes,
		(node: ChildNode): node is Text => {
			if (node.nodeType !== 3) return false; 
			data = (node as Text).data.replace(/[\t\n\r ]+/g, ' ');
			return data.startsWith(template_node.data);
		},
		(node: Text) => {
			node.data = data;
			if (node.data.length !== template_node.data.length) {
				nodes.splice(1, 0, node.splitText(template_node.data.length));
			}
			if (nodes.length > 0) nodes.splice(0, 1);
			return node;
		},
		() => {
			if (ssr_node && (ssr_node.nodeType === 3 || ssr_node.nodeType === 8)) {
				ssr_node.replaceWith(template_node);
				if (nodes.length > 0) nodes.splice(0, 1);
			} else if (target) {
				insert_hydration(target, template_node);
			}
			return template_node;
		}
	);
}

function find_comment(nodes, text, start) {
	for (let i = start; i < nodes.length; i += 1) {
		const node = nodes[i];
		if (node.nodeType === 8 /* comment node */ && node.textContent.trim() === text) {
			return i;
		}
	}
	return nodes.length;
}

export function claim_html_tag(nodes) {
	// find html opening tag
	const start_index = find_comment(nodes, 'HTML_TAG_START', 0);
	const end_index = find_comment(nodes, 'HTML_TAG_END', start_index);
	if (start_index === end_index) {
		return new HtmlTagHydration();
	}

	init_claim_info(nodes);
	const html_tag_nodes = nodes.splice(start_index, end_index + 1);
	detach(html_tag_nodes[0]);
	detach(html_tag_nodes[html_tag_nodes.length - 1]);
	const claimed_nodes = html_tag_nodes.slice(1, html_tag_nodes.length - 1);
	for (const n of claimed_nodes) {
		n.claim_order = nodes.claim_info.total_claimed;
		nodes.claim_info.total_claimed += 1;
	}
	return new HtmlTagHydration(claimed_nodes);
}

export function set_data(text, data) {
	data = '' + data;
	if (text.wholeText !== data) text.data = data;
}

export function set_input_value(input, value) {
	input.value = value == null ? '' : value;
}

export function set_input_type(input, type) {
	try {
		input.type = type;
	} catch (e) {
		// do nothing
	}
}

export function set_style(node, key, value, important) {
	node.style.setProperty(key, value, important ? 'important' : '');
}

export function select_option(select, value) {
	for (let i = 0; i < select.options.length; i += 1) {
		const option = select.options[i];

		if (option.__value === value) {
			option.selected = true;
			return;
		}
	}

	select.selectedIndex = -1; // no option should be selected
}

export function select_options(select, value) {
	for (let i = 0; i < select.options.length; i += 1) {
		const option = select.options[i];
		option.selected = ~value.indexOf(option.__value);
	}
}

export function select_value(select) {
	const selected_option = select.querySelector(':checked') || select.options[0];
	return selected_option && selected_option.__value;
}

export function select_multiple_value(select) {
	return [].map.call(select.querySelectorAll(':checked'), option => option.__value);
}

// unfortunately this can't be a constant as that wouldn't be tree-shakeable
// so we cache the result instead
let crossorigin: boolean;

export function is_crossorigin() {
	if (crossorigin === undefined) {
		crossorigin = false;

		try {
			if (typeof window !== 'undefined' && window.parent) {
				void window.parent.document;
			}
		} catch (error) {
			crossorigin = true;
		}
	}

	return crossorigin;
}

export function add_resize_listener(node: HTMLElement, fn: () => void) {
	const computed_style = getComputedStyle(node);

	if (computed_style.position === 'static') {
		node.style.position = 'relative';
	}

	const iframe = element('iframe');
	iframe.setAttribute('style',
		'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' +
		'overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;'
	);
	iframe.setAttribute('aria-hidden', 'true');
	iframe.tabIndex = -1;

	const crossorigin = is_crossorigin();

	let unsubscribe: () => void;

	if (crossorigin) {
		iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
		unsubscribe = listen(window, 'message', (event: MessageEvent) => {
			if (event.source === iframe.contentWindow) fn();
		});
	} else {
		iframe.src = 'about:blank';
		iframe.onload = () => {
			unsubscribe = listen(iframe.contentWindow, 'resize', fn);
		};
	}

	append(node, iframe);

	return () => {
		if (crossorigin) {
			unsubscribe();
		} else if (unsubscribe && iframe.contentWindow) {
			unsubscribe();
		}

		detach(iframe);
	};
}

export function toggle_class(element, name, toggle) {
	element.classList[toggle ? 'add' : 'remove'](name);
}

export function custom_event<T=any>(type: string, detail?: T, bubbles: boolean = false) {
	const e: CustomEvent<T> = document.createEvent('CustomEvent');
	e.initCustomEvent(type, bubbles, false, detail);
	return e;
}

export function query_selector_all(selector: string, parent: HTMLElement = document.body) {
	return Array.from(parent.querySelectorAll(selector)) as ChildNodeArray;
}

export class HtmlTag {
	// parent for creating node
	e: HTMLElement;
	// html tag nodes
	n: ChildNode[];
	// target
	t: HTMLElement;
	// anchor
	a: HTMLElement;

	constructor() {
		this.e = this.n = null;
	}

	c(html: string) {
		this.h(html);
	}

	m(html: string, target: HTMLElement, anchor: HTMLElement = null) {
		if (!this.e) {
			this.e = element(target.nodeName as keyof HTMLElementTagNameMap);
			this.t = target;
			this.c(html);
		}

		this.i(anchor);
	}

	h(html: string) {
		this.e.innerHTML = html;
		this.n = Array.from(this.e.childNodes);
	}

	i(anchor) {
		for (let i = 0; i < this.n.length; i += 1) {
			insert(this.t, this.n[i], anchor);
		}
	}

	p(html: string) {
		this.d();
		this.h(html);
		this.i(this.a);
	}

	d() {
		this.n.forEach(detach);
	}
}

export class HtmlTagHydration extends HtmlTag {
	// hydration claimed nodes
	l: ChildNode[] | void;

	constructor(claimed_nodes?: ChildNode[]) {
		super();
		this.e = this.n = null;
		this.l = claimed_nodes;
	}
	c(html: string) {
		if (this.l) {
			this.n = this.l;
		} else {
			super.c(html);
		}
	}
	i(anchor) {
		for (let i = 0; i < this.n.length; i += 1) {
			insert_hydration(this.t, this.n[i], anchor);
		}
	}
}

export function attribute_to_object(attributes: NamedNodeMap) {
	const result = {};
	for (const attribute of attributes) {
		result[attribute.name] = attribute.value;
	}
	return result;
}

export function get_custom_elements_slots(element: HTMLElement) {
	const result = {};
	element.childNodes.forEach((node: Element) => {
		result[node.slot || 'default'] = true;
	});
	return result;
}
