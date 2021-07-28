/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	detach,
	init,
	insert,
	listen,
	make_renderer,
	noop,
	safe_not_equal,
	set_data,
	set_input_value
} from "svelte/internal";

const render = make_renderer(`<section><div><input /><h1>Hello <!>!</h1><p><!></p></div></section>`);

function create_fragment(ctx) {
	let section;
	let div;
	let input;
	let h1;
	let t0;
	let p;
	let mounted;
	let dispose;

	return {
		c() {
			section = render();
			div = section.firstChild;
			input = div.firstChild;
			h1 = input.nextSibling;
			t0 = h1.firstChild;
			p = h1.nextSibling;
			p.textContent = `${description}`;
		},
		m(target, anchor) {
			insert(target, section, anchor);
			set_input_value(input, /*name*/ ctx[0]);

			if (!mounted) {
				dispose = listen(input, "input", /*input_input_handler*/ ctx[1]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*name*/ 1 && input.value !== /*name*/ ctx[0]) {
				set_input_value(input, /*name*/ ctx[0]);
			}

			if (dirty & /*name*/ 1) set_data(t0, /*name*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(section);
			mounted = false;
			dispose();
		}
	};
}

let description = "see below";

function instance($$self, $$props, $$invalidate) {
	let name = "world";

	function input_input_handler() {
		name = this.value;
		$$invalidate(0, name);
	}

	return [name, input_input_handler];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Component;