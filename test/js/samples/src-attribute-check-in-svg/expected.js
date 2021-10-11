/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	attr,
	detach,
	init,
	insert_hydration,
	make_renderer,
	noop,
	safe_not_equal,
	traverse,
	traverse_claim
} from "svelte/internal";

const render = make_renderer(`<svg><img alt="potato"></svg>`);
const node_path = () => [0,0];

function create_fragment(ctx) {
	let render_nodes = [];

	return {
		c() {
			traverse(render(), render_nodes, node_path());
			this.h();
		},
		l(nodes) {
			this.c();
			if (!nodes.length) return;
			const claim_func_var = new Map();
			traverse_claim(nodes, render_nodes, node_path(), claim_func_var, 0);
			this.h();
		},
		h() {
			attr(render_nodes[1], "src", /*url*/ ctx[0]);
		},
		m(target, anchor) {
			insert_hydration(target, render_nodes[0], anchor); /* svg */
		},
		p(ctx, [dirty]) {
			if (dirty & /*url*/ 1) {
				attr(render_nodes[1], "src", /*url*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(render_nodes[0]); /* svg */
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { url } = $$props;

	$$self.$$set = $$props => {
		if ('url' in $$props) $$invalidate(0, url = $$props.url);
	};

	return [url];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { url: 0 });
	}
}

export default Component;