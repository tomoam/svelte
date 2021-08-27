/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	detach,
	init,
	insert_experimental,
	make_renderer,
	noop,
	replace_text,
	safe_not_equal,
	set_data
} from "svelte/internal";

const render = make_renderer(`<div><p>Hello world</p> <p>Hello <!></p> <p>Hello <!></p></div> <div><p>Hello <!></p></div>`);

function create_fragment(ctx) {
	let div0;
	let p0;
	let t1;
	let p1;
	let t2;
	let t3;
	let t4;
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
			div0 = render().firstChild;
			p0 = div0.firstChild;
			t1 = p0.nextSibling;
			p1 = t1.nextSibling;
			t2 = p1.firstChild;
			t3 = replace_text(t2.nextSibling, world1);
			t4 = p1.nextSibling;
			p2 = t4.nextSibling;
			t5 = p2.firstChild;
			t6 = replace_text(t5.nextSibling, world2);
			t7 = div0.nextSibling;
			div1 = t7.nextSibling;
			p3 = div1.firstChild;
			t8 = p3.firstChild;
			t9 = replace_text(t8.nextSibling, /*world3*/ ctx[0]);
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