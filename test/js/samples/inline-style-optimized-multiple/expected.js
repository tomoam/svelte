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
			set_style(render_nodes[0], "transform", "translate(" + /*x*/ ctx[1] + "px," + /*y*/ ctx[2] + "px)");
		},
		m(target, anchor) {
			insert(target, render_nodes[0], anchor); /* div */
		},
		p(ctx, [dirty]) {
			if (dirty & /*color*/ 1) {
				set_style(render_nodes[0], "color", /*color*/ ctx[0]);
			}

			if (dirty & /*x, y*/ 6) {
				set_style(render_nodes[0], "transform", "translate(" + /*x*/ ctx[1] + "px," + /*y*/ ctx[2] + "px)");
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
	let { x } = $$props;
	let { y } = $$props;

	$$self.$$set = $$props => {
		if ('color' in $$props) $$invalidate(0, color = $$props.color);
		if ('x' in $$props) $$invalidate(1, x = $$props.x);
		if ('y' in $$props) $$invalidate(2, y = $$props.y);
	};

	return [color, x, y];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { color: 0, x: 1, y: 2 });
	}
}

export default Component;