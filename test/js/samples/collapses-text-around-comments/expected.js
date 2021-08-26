/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	append_styles,
	detach,
	init,
	insert_experimental,
	make_renderer,
	noop,
	replace_text,
	safe_not_equal,
	set_data
} from "svelte/internal";

function add_css(target) {
	append_styles(target, "svelte-1a7i8ec", "p.svelte-1a7i8ec{color:red}");
}

const render = make_renderer(`<p class="svelte-1a7i8ec"><!></p>`);

function create_fragment(ctx) {
	let p;
	let t;

	return {
		c() {
			p = render().firstChild;
			t = replace_text(p.firstChild, /*foo*/ ctx[0]);
		},
		m(target, anchor) {
			insert_experimental(target, p, anchor);
		},
		p(ctx, [dirty]) {
			if (dirty & /*foo*/ 1) set_data(t, /*foo*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { foo = 42 } = $$props;

	$$self.$$set = $$props => {
		if ('foo' in $$props) $$invalidate(0, foo = $$props.foo);
	};

	return [foo];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { foo: 0 }, add_css);
	}
}

export default Component;