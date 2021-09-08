/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	detach,
	first_child,
	init,
	insert,
	is_function,
	listen,
	make_renderer,
	next_sibling,
	noop,
	run_all,
	safe_not_equal,
	set_data
} from "svelte/internal";

const render = make_renderer(`<p><button>set handler 1</button> <button>set handler 2</button></p> <p> </p> <button>click</button>`);

function create_fragment(ctx) {
	let p0;
	let button0;
	let t1;
	let button1;
	let t3;
	let p1;
	let t4;
	let t5;
	let button2;
	let mounted;
	let dispose;

	return {
		c() {
			p0 = first_child(render());
			button0 = first_child(p0);
			t1 = next_sibling(button0);
			button1 = next_sibling(t1);
			t3 = next_sibling(p0);
			p1 = next_sibling(t3);
			t4 = first_child(p1);
			t4.data = /*number*/ ctx[1];
			t5 = next_sibling(p1);
			button2 = next_sibling(t5);
		},
		m(target, anchor) {
			insert(target, p0, anchor);
			insert(target, t3, anchor);
			insert(target, p1, anchor);
			insert(target, t5, anchor);
			insert(target, button2, anchor);

			if (!mounted) {
				dispose = [
					listen(button0, "click", /*updateHandler1*/ ctx[2]),
					listen(button1, "click", /*updateHandler2*/ ctx[3]),
					listen(button2, "click", function () {
						if (is_function(/*clickHandler*/ ctx[0])) /*clickHandler*/ ctx[0].apply(this, arguments);
					})
				];

				mounted = true;
			}
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;
			if (dirty & /*number*/ 2) set_data(t4, /*number*/ ctx[1]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(p0);
			if (detaching) detach(t3);
			if (detaching) detach(p1);
			if (detaching) detach(t5);
			if (detaching) detach(button2);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let clickHandler;
	let number = 0;

	function updateHandler1() {
		$$invalidate(0, clickHandler = () => $$invalidate(1, number = 1));
	}

	function updateHandler2() {
		$$invalidate(0, clickHandler = () => $$invalidate(1, number = 2));
	}

	return [clickHandler, number, updateHandler1, updateHandler2];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Component;