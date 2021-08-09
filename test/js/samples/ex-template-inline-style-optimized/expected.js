/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	detach,
	first_child,
	init,
	insert,
	make_renderer,
	noop,
	safe_not_equal,
	set_style
} from "svelte/internal";

const render = make_renderer(`<div></div>`);

function create_fragment(ctx) {
	let div;

	return {
		c() {
			div = first_child(render());
			set_style(div, "color", /*color*/ ctx[0]);
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		p(ctx, [dirty]) {
			if (dirty & /*color*/ 1) {
				set_style(div, "color", /*color*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
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