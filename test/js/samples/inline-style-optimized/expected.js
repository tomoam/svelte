/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	detach,
	init,
	insert,
	make_renderer,
	noop,
	safe_not_equal,
	set_style,
	traverse
} from "svelte/internal";

const render = make_renderer(`<div></div>`);

function create_fragment(ctx) {
	let render_nodes = [];

	return {
		c() {
			traverse(render(), render_nodes);
			set_style(render_nodes[0], "color", /*color*/ ctx[0]);
		},
		m(target, anchor) {
			insert(target, render_nodes[0], anchor); /* div */
		},
		p(ctx, [dirty]) {
			if (dirty & /*color*/ 1) {
				set_style(render_nodes[0], "color", /*color*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(render_nodes[0]); /* div */
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { color } = $$props;

	$$self.$$set = $$props => {
		if ('color' in $$props) $$invalidate(0, color = $$props.color);
	};

	return [color];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { color: 0 });
	}
}

export default Component;