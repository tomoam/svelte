/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	attr,
	detach,
	init,
	insert,
	make_renderer,
	noop,
	safe_not_equal,
	src_url_equal,
	traverse
} from "svelte/internal";

const render = make_renderer(`<div><img alt="Star" width="100" height="100" src="http://mdn.mozillademos.org/files/12676/star.svg"></div>`);
const node_path = () => [,0];

function create_fragment(ctx) {
	let render_nodes = [];
	let img_src_value;

	return {
		c() {
			traverse(render(), render_nodes, node_path());
			if (!src_url_equal(render_nodes[1].src, img_src_value = "http://mdn.mozillademos.org/files/12676/star.svg")) attr(render_nodes[1], "src", img_src_value);
		},
		m(target, anchor) {
			insert(target, render_nodes[0], anchor); /* div */
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(render_nodes[0]); /* div */
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