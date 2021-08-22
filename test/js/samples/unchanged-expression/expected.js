/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	detach,
	first_child,
	first_element_child,
	init,
	insert_experimental,
	make_renderer,
	next_element_sibling,
	next_sibling,
	noop,
	replace_text,
	safe_not_equal,
	set_data
} from "svelte/internal";

const render = make_renderer(`<div><p>Hello world</p> <p>Hello <!></p> <p>Hello <!></p></div> <div><p>Hello <!></p></div>`);

function create_fragment(ctx) {
	let div0;
	let p0;
	let p1;
	let t2;
	let t3;
	let p2;
	let t5;
	let t6;
	let t7;
	let div1;
	let p3;
	let t8;
	let t9;

	return {
		c() {
			div0 = first_child(render());
			p0 = first_element_child(div0);
			p1 = next_element_sibling(p0);
			t2 = first_child(p1);
			t3 = replace_text(next_sibling(t2), world1);
			p2 = next_element_sibling(p1);
			t5 = first_child(p2);
			t6 = replace_text(next_sibling(t5), world2);
			t7 = next_sibling(div0);
			div1 = next_element_sibling(t7);
			p3 = first_element_child(div1);
			t8 = first_child(p3);
			t9 = replace_text(next_sibling(t8), /*world3*/ ctx[0]);
		},
		m(target, anchor) {
			insert_experimental(target, div0, anchor);
			insert_experimental(target, t7, anchor);
			insert_experimental(target, div1, anchor);
		},
		p(ctx, [dirty]) {
			if (dirty & /*world3*/ 1) set_data(t9, /*world3*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div0);
			if (detaching) detach(t7);
			if (detaching) detach(div1);
		}
	};
}

let world1 = 'world';
let world2 = 'world';

function instance($$self, $$props, $$invalidate) {
	const world3 = 'world';

	function foo() {
		$$invalidate(0, world3 = 'svelte');
	}

	return [world3];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Component;