/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	detach,
	first_child,
	init,
	insert_experimental,
	listen,
	make_renderer,
	next_element_sibling,
	next_sibling,
	noop,
	replace_text,
	safe_not_equal,
	set_data
} from "svelte/internal";

const render = make_renderer(`<button>foo</button> <p>x: <!></p>`);

function create_fragment(ctx) {
	let button;
	let t1;
	let p;
	let t2;
	let t3;
	let mounted;
	let dispose;

	return {
		c() {
			button = first_child(render());
			t1 = next_sibling(button);
			p = next_element_sibling(t1);
			t2 = first_child(p);
			t3 = replace_text(next_sibling(t2), /*x*/ ctx[0]);
		},
		m(target, anchor) {
			insert_experimental(target, button, anchor);
			insert_experimental(target, t1, anchor);
			insert_experimental(target, p, anchor);

			if (!mounted) {
				dispose = listen(button, "click", /*foo*/ ctx[1]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*x*/ 1) set_data(t3, /*x*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(button);
			if (detaching) detach(t1);
			if (detaching) detach(p);
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let x = 0;

	function foo() {
		if (true) $$invalidate(0, x += 1);
	}

	return [x, foo];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Component;