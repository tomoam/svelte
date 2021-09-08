/* generated by Svelte vX.Y.Z */
import {
	SvelteComponentDev,
	add_location,
	destroy_each,
	detach_dev,
	dispatch_dev,
	first_child,
	init,
	insert_dev,
	make_renderer,
	next_sibling,
	noop,
	replace_text,
	safe_not_equal,
	set_data_dev,
	validate_each_argument,
	validate_slots
} from "svelte/internal";

const file = undefined;

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[2] = list[i];
	return child_ctx;
}

const render = make_renderer(`<span> </span>`);

// (6:0) {#each things as thing}
function create_each_block(ctx) {
	let span;
	let t_value = /*thing*/ ctx[2].name + "";
	let t;

	const block = {
		c: function create() {
			span = first_child(render());
			t = first_child(span);
			t.data = t_value;

			{
				const foo = /*foo*/ ctx[1];
				console.log({ foo });
				debugger;
			}

			add_location(span, file, 6, 1, 82);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*things*/ 1 && t_value !== (t_value = /*thing*/ ctx[2].name + "")) set_data_dev(t, t_value);

			if (dirty & /*foo*/ 2) {
				const foo = /*foo*/ ctx[1];
				console.log({ foo });
				debugger;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(6:0) {#each things as thing}",
		ctx
	});

	return block;
}

const render_1 = make_renderer(`<!> <p>foo: <!></p>`);

function create_fragment(ctx) {
	let each_1_anchor;
	let t0;
	let p;
	let t1;
	let t2;
	let each_value = /*things*/ ctx[0];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = first_child(render_1());
			t0 = next_sibling(each_1_anchor);
			p = next_sibling(t0);
			t1 = first_child(p);
			t2 = replace_text(next_sibling(t1), /*foo*/ ctx[1]);
			add_location(p, file, 10, 0, 131);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert_dev(target, t0, anchor);
			insert_dev(target, p, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*things*/ 1) {
				each_value = /*things*/ ctx[0];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(t0.parentNode, t0);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (dirty & /*foo*/ 2) set_data_dev(t2, /*foo*/ ctx[1]);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Component', slots, []);
	let { things } = $$props;
	let { foo } = $$props;
	const writable_props = ['things', 'foo'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Component> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('things' in $$props) $$invalidate(0, things = $$props.things);
		if ('foo' in $$props) $$invalidate(1, foo = $$props.foo);
	};

	$$self.$capture_state = () => ({ things, foo });

	$$self.$inject_state = $$props => {
		if ('things' in $$props) $$invalidate(0, things = $$props.things);
		if ('foo' in $$props) $$invalidate(1, foo = $$props.foo);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [things, foo];
}

class Component extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { things: 0, foo: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Component",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*things*/ ctx[0] === undefined && !('things' in props)) {
			console.warn("<Component> was created without expected prop 'things'");
		}

		if (/*foo*/ ctx[1] === undefined && !('foo' in props)) {
			console.warn("<Component> was created without expected prop 'foo'");
		}
	}

	get things() {
		throw new Error("<Component>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set things(value) {
		throw new Error("<Component>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get foo() {
		throw new Error("<Component>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set foo(value) {
		throw new Error("<Component>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default Component;