/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	action_destroyer,
	detach,
	init,
	insert,
	make_renderer,
	noop,
	safe_not_equal,
	traverse
} from "svelte/internal";

const render = make_renderer(`<a href="#">Test</a>`);

function create_fragment(ctx) {
	let render_nodes = [];
	let link_action;
	let mounted;
	let dispose;

	return {
		c() {
			traverse(render(), render_nodes);
		},
		m(target, anchor) {
			insert(target, render_nodes[0], anchor); /* a */

			if (!mounted) {
				dispose = action_destroyer(link_action = link.call(null, render_nodes[0]));
				mounted = true;
			}
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(render_nodes[0]); /* a */
			mounted = false;
			dispose();
		}
	};
}

function link(node) {
	function onClick(event) {
		event.preventDefault();
		history.pushState(null, null, event.target.href);
	}

	node.addEventListener('click', onClick);

	return {
		destroy() {
			node.removeEventListener('click', onClick);
		}
	};
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment, safe_not_equal, {});
	}
}

export default Component;