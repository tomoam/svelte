/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	attr,
	create_component,
	destroy_component,
	detach_all,
	init,
	insert_all,
	make_renderer,
	mount_component,
	replace_text,
	safe_not_equal,
	transition_in,
	transition_out,
	traverse
} from "svelte/internal";

const render = make_renderer(`<!><!> <!><!> <!><!> <div></div> <!>`);
const node_path = () => [0,1,1,1,1,1,1,1,1,1,1,1];

function create_fragment(ctx) {
	let render_nodes = [];
	let t0_value = /*a*/ ctx[0].normal + "";
	let t1_value = /*b*/ ctx[1]?.optional + "";
	let t3_value = /*c*/ ctx[2]['computed'] + "";
	let t4_value = /*d*/ ctx[3]?.['computed_optional'] + "";
	let t6_value = /*e*/ ctx[4]() + "";
	let t7_value = /*f*/ ctx[5]?.() + "";
	let div_a_value;
	let div_b_value;
	let div_c_value;
	let div_d_value;
	let div_e_value;
	let div_f_value;
	let component;
	let current;

	component = new /*Component*/ ctx[6]({
			props: {
				a: /*a*/ ctx[0].normal,
				b: /*b*/ ctx[1]?.optional,
				c: /*c*/ ctx[2]['computed'],
				d: /*d*/ ctx[3]?.['computed_optional'],
				e: /*e*/ ctx[4](),
				f: /*f*/ ctx[5]?.()
			}
		});

	return {
		c() {
			traverse(render(), render_nodes, node_path());
			render_nodes[0] = replace_text(render_nodes[0], t0_value);
			render_nodes[1] = replace_text(render_nodes[1], t1_value);
			render_nodes[3] = replace_text(render_nodes[3], t3_value);
			render_nodes[4] = replace_text(render_nodes[4], t4_value);
			render_nodes[6] = replace_text(render_nodes[6], t6_value);
			render_nodes[7] = replace_text(render_nodes[7], t7_value);
			create_component(component);
			attr(render_nodes[9], "a", div_a_value = /*a*/ ctx[0].normal);
			attr(render_nodes[9], "b", div_b_value = /*b*/ ctx[1]?.optional);
			attr(render_nodes[9], "c", div_c_value = /*c*/ ctx[2]['computed']);
			attr(render_nodes[9], "d", div_d_value = /*d*/ ctx[3]?.['computed_optional']);
			attr(render_nodes[9], "e", div_e_value = /*e*/ ctx[4]());
			attr(render_nodes[9], "f", div_f_value = /*f*/ ctx[5]?.());
		},
		m(target, anchor) {
			insert_all(target, render_nodes, [0,1,2,3,4,5,6,7,8,9,10,11], anchor);
			mount_component(component, target, render_nodes[11]);
			current = true;
		},
		p(ctx, [dirty]) {
			if ((!current || dirty & /*a*/ 1) && t0_value !== (t0_value = /*a*/ ctx[0].normal + "")) render_nodes[0].data = t0_value;
			if ((!current || dirty & /*b*/ 2) && t1_value !== (t1_value = /*b*/ ctx[1]?.optional + "")) render_nodes[1].data = t1_value;
			if ((!current || dirty & /*c*/ 4) && t3_value !== (t3_value = /*c*/ ctx[2]['computed'] + "")) render_nodes[3].data = t3_value;
			if ((!current || dirty & /*d*/ 8) && t4_value !== (t4_value = /*d*/ ctx[3]?.['computed_optional'] + "")) render_nodes[4].data = t4_value;
			if ((!current || dirty & /*e*/ 16) && t6_value !== (t6_value = /*e*/ ctx[4]() + "")) render_nodes[6].data = t6_value;
			if ((!current || dirty & /*f*/ 32) && t7_value !== (t7_value = /*f*/ ctx[5]?.() + "")) render_nodes[7].data = t7_value;

			if (!current || dirty & /*a*/ 1 && div_a_value !== (div_a_value = /*a*/ ctx[0].normal)) {
				attr(render_nodes[9], "a", div_a_value);
			}

			if (!current || dirty & /*b*/ 2 && div_b_value !== (div_b_value = /*b*/ ctx[1]?.optional)) {
				attr(render_nodes[9], "b", div_b_value);
			}

			if (!current || dirty & /*c*/ 4 && div_c_value !== (div_c_value = /*c*/ ctx[2]['computed'])) {
				attr(render_nodes[9], "c", div_c_value);
			}

			if (!current || dirty & /*d*/ 8 && div_d_value !== (div_d_value = /*d*/ ctx[3]?.['computed_optional'])) {
				attr(render_nodes[9], "d", div_d_value);
			}

			if (!current || dirty & /*e*/ 16 && div_e_value !== (div_e_value = /*e*/ ctx[4]())) {
				attr(render_nodes[9], "e", div_e_value);
			}

			if (!current || dirty & /*f*/ 32 && div_f_value !== (div_f_value = /*f*/ ctx[5]?.())) {
				attr(render_nodes[9], "f", div_f_value);
			}

			const component_changes = {};
			if (dirty & /*a*/ 1) component_changes.a = /*a*/ ctx[0].normal;
			if (dirty & /*b*/ 2) component_changes.b = /*b*/ ctx[1]?.optional;
			if (dirty & /*c*/ 4) component_changes.c = /*c*/ ctx[2]['computed'];
			if (dirty & /*d*/ 8) component_changes.d = /*d*/ ctx[3]?.['computed_optional'];
			if (dirty & /*e*/ 16) component_changes.e = /*e*/ ctx[4]();
			if (dirty & /*f*/ 32) component_changes.f = /*f*/ ctx[5]?.();
			component.$set(component_changes);
		},
		i(local) {
			if (current) return;
			transition_in(component.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(component.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			detach_all(detaching, render_nodes, [0,1,2,3,4,5,6,7,8,9,10,11]);
			destroy_component(component, detaching);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { a } = $$props;
	let { b } = $$props;
	let { c } = $$props;
	let { d } = $$props;
	let { e } = $$props;
	let { f } = $$props;
	let Component;

	$$self.$$set = $$props => {
		if ('a' in $$props) $$invalidate(0, a = $$props.a);
		if ('b' in $$props) $$invalidate(1, b = $$props.b);
		if ('c' in $$props) $$invalidate(2, c = $$props.c);
		if ('d' in $$props) $$invalidate(3, d = $$props.d);
		if ('e' in $$props) $$invalidate(4, e = $$props.e);
		if ('f' in $$props) $$invalidate(5, f = $$props.f);
	};

	return [a, b, c, d, e, f, Component];
}

class Component_1 extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5 });
	}
}

export default Component_1;