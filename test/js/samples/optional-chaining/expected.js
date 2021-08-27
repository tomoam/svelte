/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	attr,
	create_component,
	destroy_component,
	detach,
	init,
	insert_experimental,
	make_renderer,
	mount_component,
	replace_text,
	safe_not_equal,
	set_data,
	transition_in,
	transition_out
} from "svelte/internal";

const render = make_renderer(`<!><!> <!><!> <!><!> <div></div> <!>`);

function create_fragment(ctx) {
	let t0_value = /*a*/ ctx[0].normal + "";
	let t0;
	let t1_value = /*b*/ ctx[1]?.optional + "";
	let t1;
	let t2;
	let t3_value = /*c*/ ctx[2]['computed'] + "";
	let t3;
	let t4_value = /*d*/ ctx[3]?.['computed_optional'] + "";
	let t4;
	let t5;
	let t6_value = /*e*/ ctx[4]() + "";
	let t6;
	let t7_value = /*f*/ ctx[5]?.() + "";
	let t7;
	let t8;
	let div;
	let div_a_value;
	let div_b_value;
	let div_c_value;
	let div_d_value;
	let div_e_value;
	let div_f_value;
	let t9;
	let component;
	let component_anchor;
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
			t0 = replace_text(render().firstChild, t0_value);
			t1 = replace_text(t0.nextSibling, t1_value);
			t2 = t1.nextSibling;
			t3 = replace_text(t2.nextSibling, t3_value);
			t4 = replace_text(t3.nextSibling, t4_value);
			t5 = t4.nextSibling;
			t6 = replace_text(t5.nextSibling, t6_value);
			t7 = replace_text(t6.nextSibling, t7_value);
			t8 = t7.nextSibling;
			div = t8.nextSibling;
			t9 = div.nextSibling;
			create_component(component.$$.fragment);
			component_anchor = t9.nextSibling;
			attr(div, "a", div_a_value = /*a*/ ctx[0].normal);
			attr(div, "b", div_b_value = /*b*/ ctx[1]?.optional);
			attr(div, "c", div_c_value = /*c*/ ctx[2]['computed']);
			attr(div, "d", div_d_value = /*d*/ ctx[3]?.['computed_optional']);
			attr(div, "e", div_e_value = /*e*/ ctx[4]());
			attr(div, "f", div_f_value = /*f*/ ctx[5]?.());
		},
		m(target, anchor) {
			insert_experimental(target, t0, anchor);
			insert_experimental(target, t1, anchor);
			insert_experimental(target, t2, anchor);
			insert_experimental(target, t3, anchor);
			insert_experimental(target, t4, anchor);
			insert_experimental(target, t5, anchor);
			insert_experimental(target, t6, anchor);
			insert_experimental(target, t7, anchor);
			insert_experimental(target, t8, anchor);
			insert_experimental(target, div, anchor);
			insert_experimental(target, t9, anchor);
			mount_component(component, target, anchor);
			insert_experimental(target, component_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if ((!current || dirty & /*a*/ 1) && t0_value !== (t0_value = /*a*/ ctx[0].normal + "")) set_data(t0, t0_value);
			if ((!current || dirty & /*b*/ 2) && t1_value !== (t1_value = /*b*/ ctx[1]?.optional + "")) set_data(t1, t1_value);
			if ((!current || dirty & /*c*/ 4) && t3_value !== (t3_value = /*c*/ ctx[2]['computed'] + "")) set_data(t3, t3_value);
			if ((!current || dirty & /*d*/ 8) && t4_value !== (t4_value = /*d*/ ctx[3]?.['computed_optional'] + "")) set_data(t4, t4_value);
			if ((!current || dirty & /*e*/ 16) && t6_value !== (t6_value = /*e*/ ctx[4]() + "")) set_data(t6, t6_value);
			if ((!current || dirty & /*f*/ 32) && t7_value !== (t7_value = /*f*/ ctx[5]?.() + "")) set_data(t7, t7_value);

			if (!current || dirty & /*a*/ 1 && div_a_value !== (div_a_value = /*a*/ ctx[0].normal)) {
				attr(div, "a", div_a_value);
			}

			if (!current || dirty & /*b*/ 2 && div_b_value !== (div_b_value = /*b*/ ctx[1]?.optional)) {
				attr(div, "b", div_b_value);
			}

			if (!current || dirty & /*c*/ 4 && div_c_value !== (div_c_value = /*c*/ ctx[2]['computed'])) {
				attr(div, "c", div_c_value);
			}

			if (!current || dirty & /*d*/ 8 && div_d_value !== (div_d_value = /*d*/ ctx[3]?.['computed_optional'])) {
				attr(div, "d", div_d_value);
			}

			if (!current || dirty & /*e*/ 16 && div_e_value !== (div_e_value = /*e*/ ctx[4]())) {
				attr(div, "e", div_e_value);
			}

			if (!current || dirty & /*f*/ 32 && div_f_value !== (div_f_value = /*f*/ ctx[5]?.())) {
				attr(div, "f", div_f_value);
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
			if (detaching) detach(t0);
			if (detaching) detach(t1);
			if (detaching) detach(t2);
			if (detaching) detach(t3);
			if (detaching) detach(t4);
			if (detaching) detach(t5);
			if (detaching) detach(t6);
			if (detaching) detach(t7);
			if (detaching) detach(t8);
			if (detaching) detach(div);
			if (detaching) detach(t9);
			if (detaching) detach(component_anchor);
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