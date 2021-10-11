/* generated by Svelte vX.Y.Z */
import {
	SvelteComponentDev,
	add_location,
	detach_dev,
	dispatch_dev,
	init,
	insert_dev,
	make_renderer,
	noop,
	replace_text,
	safe_not_equal,
	set_data_dev,
	subscribe,
	traverse,
	validate_slots,
	validate_store
} from "svelte/internal";

const file = undefined;
const render = make_renderer(`<p><!> <!> <!> <!> <!> <!></p>`);
const node_path = () => [0,0,2,3,4,5,6,7,8,9,10,11];

function create_fragment(ctx) {
	let render_nodes = [];

	const block = {
		c: function create() {
			traverse(render(), render_nodes, node_path());
			render_nodes[1] = replace_text(render_nodes[1], /*prop*/ ctx[0]);
			render_nodes[3] = replace_text(render_nodes[3], /*realName*/ ctx[1]);
			render_nodes[5] = replace_text(render_nodes[5], /*local*/ ctx[3]);
			render_nodes[7] = replace_text(render_nodes[7], priv);
			render_nodes[9] = replace_text(render_nodes[9], /*$prop*/ ctx[2]);
			render_nodes[11] = replace_text(render_nodes[11], /*shadowedByModule*/ ctx[4]);
			add_location(render_nodes[0], file, 22, 0, 430);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, render_nodes[0], anchor); /* p */
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*prop*/ 1) set_data_dev(render_nodes[1], /*prop*/ ctx[0]);
			if (dirty & /*realName*/ 2) set_data_dev(render_nodes[3], /*realName*/ ctx[1]);
			if (dirty & /*$prop*/ 4) set_data_dev(render_nodes[9], /*$prop*/ ctx[2]);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(render_nodes[0]); /* p */
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

let moduleLiveBinding;
const moduleContantProps = 4;
let moduleLet;
const moduleConst = 2;
let shadowedByModule;
const priv = 'priv';

function instance($$self, $$props, $$invalidate) {
	let computed;

	let $prop,
		$$unsubscribe_prop = noop,
		$$subscribe_prop = () => ($$unsubscribe_prop(), $$unsubscribe_prop = subscribe(prop, $$value => $$invalidate(2, $prop = $$value)), prop);

	$$self.$$.on_destroy.push(() => $$unsubscribe_prop());
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Component', slots, []);
	let { prop } = $$props;
	validate_store(prop, 'prop');
	$$subscribe_prop();
	let { alias: realName } = $$props;
	let local;
	let shadowedByModule;
	const writable_props = ['prop', 'alias'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Component> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('prop' in $$props) $$subscribe_prop($$invalidate(0, prop = $$props.prop));
		if ('alias' in $$props) $$invalidate(1, realName = $$props.alias);
	};

	$$self.$capture_state = () => ({
		moduleLiveBinding,
		moduleContantProps,
		moduleLet,
		moduleConst,
		shadowedByModule,
		prop,
		realName,
		local,
		priv,
		shadowedByModule,
		computed,
		$prop
	});

	$$self.$inject_state = $$props => {
		if ('prop' in $$props) $$subscribe_prop($$invalidate(0, prop = $$props.prop));
		if ('realName' in $$props) $$invalidate(1, realName = $$props.realName);
		if ('local' in $$props) $$invalidate(3, local = $$props.local);
		if ('shadowedByModule' in $$props) $$invalidate(4, shadowedByModule = $$props.shadowedByModule);
		if ('computed' in $$props) computed = $$props.computed;
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$: computed = local * 2;
	return [prop, realName, $prop, local, shadowedByModule];
}

class Component extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { prop: 0, alias: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Component",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*prop*/ ctx[0] === undefined && !('prop' in props)) {
			console.warn("<Component> was created without expected prop 'prop'");
		}

		if (/*realName*/ ctx[1] === undefined && !('alias' in props)) {
			console.warn("<Component> was created without expected prop 'alias'");
		}
	}

	get prop() {
		throw new Error("<Component>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set prop(value) {
		throw new Error("<Component>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get alias() {
		throw new Error("<Component>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set alias(value) {
		throw new Error("<Component>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default Component;
export { moduleLiveBinding, moduleContantProps };