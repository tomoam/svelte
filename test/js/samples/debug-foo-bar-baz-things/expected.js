/* generated by Svelte vX.Y.Z */
import {
	SvelteComponentDev,
	add_location,
	destroy_each,
	detach_dev,
	dispatch_dev,
	init,
	insert_dev,
	make_renderer,
	noop,
	replace_text,
	safe_not_equal,
	set_data_dev,
	traverse,
	validate_each_argument,
	validate_slots
} from "svelte/internal";

const file = undefined;

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[4] = list[i];
	return child_ctx;
}

const render = make_renderer(`<span> </span>`);
const node_path = () => [0,0,0];

// (8:0) {#each things as thing}
function create_each_block(ctx) {
	let render_nodes = [];
	let t_value = /*thing*/ ctx[4].name + "";

	const block = {
		c: function create() {
			traverse(render(), render_nodes, node_path());
			render_nodes[1].data = t_value;

			{
				const foo = /*foo*/ ctx[1];
				const bar = /*bar*/ ctx[2];
				const baz = /*baz*/ ctx[3];
				const thing = /*thing*/ ctx[4];
				console.log({ foo, bar, baz, thing });
				debugger;
			}

			add_location(render_nodes[0], file, 8, 1, 116);
		},
		m: function mount(target, anchor) {
			insert_dev(target, render_nodes[0], anchor); /* span */
		},
		p: function update(ctx, dirty) {
			if (dirty & /*things*/ 1 && t_value !== (t_value = /*thing*/ ctx[4].name + "")) set_data_dev(render_nodes[1], t_value);

			if (dirty & /*foo, bar, baz, things*/ 15) {
				const foo = /*foo*/ ctx[1];
				const bar = /*bar*/ ctx[2];
				const baz = /*baz*/ ctx[3];
				const thing = /*thing*/ ctx[4];
				console.log({ foo, bar, baz, thing });
				debugger;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(render_nodes[0]); /* span */
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(8:0) {#each things as thing}",
		ctx
	});

	return block;
}

const render_1 = make_renderer(`<!> <p>foo: <!></p>`);
const node_path_1 = () => [0,1,2,0,4];

function create_fragment(ctx) {
	let render_nodes = [];
	let each_value = /*things*/ ctx[0];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			traverse(render_1(), render_nodes, node_path_1());

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			render_nodes[4] = replace_text(render_nodes[4], /*foo*/ ctx[1]);
			add_location(render_nodes[2], file, 12, 0, 182);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, render_nodes[0], anchor); /* each_1 */

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, render_nodes[0]);
			}

			insert_dev(target, render_nodes[1], anchor); /* t0 */
			insert_dev(target, render_nodes[2], anchor); /* p */
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
						each_blocks[i].m(render_nodes[0].parentNode, render_nodes[0]);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (dirty & /*foo*/ 2) set_data_dev(render_nodes[4], /*foo*/ ctx[1]);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(render_nodes[0]); /* each_1 */
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(render_nodes[1]); /* t0 */
			if (detaching) detach_dev(render_nodes[2]); /* p */
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
	let { bar } = $$props;
	let { baz } = $$props;
	const writable_props = ['things', 'foo', 'bar', 'baz'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Component> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('things' in $$props) $$invalidate(0, things = $$props.things);
		if ('foo' in $$props) $$invalidate(1, foo = $$props.foo);
		if ('bar' in $$props) $$invalidate(2, bar = $$props.bar);
		if ('baz' in $$props) $$invalidate(3, baz = $$props.baz);
	};

	$$self.$capture_state = () => ({ things, foo, bar, baz });

	$$self.$inject_state = $$props => {
		if ('things' in $$props) $$invalidate(0, things = $$props.things);
		if ('foo' in $$props) $$invalidate(1, foo = $$props.foo);
		if ('bar' in $$props) $$invalidate(2, bar = $$props.bar);
		if ('baz' in $$props) $$invalidate(3, baz = $$props.baz);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [things, foo, bar, baz];
}

class Component extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { things: 0, foo: 1, bar: 2, baz: 3 });

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

		if (/*bar*/ ctx[2] === undefined && !('bar' in props)) {
			console.warn("<Component> was created without expected prop 'bar'");
		}

		if (/*baz*/ ctx[3] === undefined && !('baz' in props)) {
			console.warn("<Component> was created without expected prop 'baz'");
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

	get bar() {
		throw new Error("<Component>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set bar(value) {
		throw new Error("<Component>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get baz() {
		throw new Error("<Component>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set baz(value) {
		throw new Error("<Component>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default Component;