/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	attr,
	detach,
	first_child,
	init,
	insert,
	make_renderer,
	next_element_sibling,
	next_sibling,
	noop,
	safe_not_equal
} from "svelte/internal";

const render = make_renderer(`<div data-foo="bar"></div> <div></div>`);

function create_fragment(ctx) {
	let div0;
	let t;
	let div1;

	return {
		c() {
			div0 = first_child(render());
			t = next_sibling(div0);
			div1 = next_element_sibling(t);
			attr(div1, "data-foo", /*bar*/ ctx[0]);
		},
		m(target, anchor) {
			insert(target, div0, anchor);
			insert(target, t, anchor);
			insert(target, div1, anchor);
		},
		p(ctx, [dirty]) {
			if (dirty & /*bar*/ 1) {
				attr(div1, "data-foo", /*bar*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div0);
			if (detaching) detach(t);
			if (detaching) detach(div1);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { bar } = $$props;

	$$self.$$set = $$props => {
		if ('bar' in $$props) $$invalidate(0, bar = $$props.bar);
	};

	return [bar];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { bar: 0 });
	}
}

export default Component;