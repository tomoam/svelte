/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	assign,
	attr,
	compute_rest_props,
	create_component,
	destroy_component,
	detach_all,
	exclude_internal_props,
	init,
	insert_all,
	make_renderer,
	mount_component,
	safe_not_equal,
	transition_in,
	transition_out,
	traverse
} from "svelte/internal";

import Component from "./Component.svelte";
const render = make_renderer(`<div></div> <!>`);
const node_path = () => [,1,1];

function create_fragment(ctx) {
	let render_nodes = [];
	let div_class_value;
	let div_style_value;
	let div_other_value;
	let component;
	let current;

	component = new Component({
			props: {
				class: "\n\t\tbutton\n\t\tbutton--size--" + /*size*/ ctx[0] + "\n\t\tbutton--theme--" + /*theme*/ ctx[1] + "\n  \t" + (/*$$restProps*/ ctx[2].class || ''),
				style: "\n\t\tcolor: green;\n\t\tbackground: white;\n\t\tfont-size: " + /*size*/ ctx[0] + ";\n  \ttransform: " + /*$$restProps*/ ctx[2].scale + "  " + /*$$restProps*/ ctx[2].rotate + ";\n\t\t" + /*$$restProps*/ ctx[2].styles,
				other: "\n\t\tbutton\n\t\tbutton--size--" + /*size*/ ctx[0] + "\n\t\tbutton--theme--" + /*theme*/ ctx[1] + "\n  \t" + (/*$$restProps*/ ctx[2].class || '')
			}
		});

	return {
		c() {
			traverse(render(), render_nodes, node_path());
			create_component(component.$$.fragment);
			attr(render_nodes[0], "class", div_class_value = "button button--size--" + /*size*/ ctx[0] + " button--theme--" + /*theme*/ ctx[1] + " " + (/*$$restProps*/ ctx[2].class || ''));
			attr(render_nodes[0], "style", div_style_value = "color: green; background: white; font-size: " + /*size*/ ctx[0] + "; transform: " + /*$$restProps*/ ctx[2].scale + " " + /*$$restProps*/ ctx[2].rotate + "; " + /*$$restProps*/ ctx[2].styles);
			attr(render_nodes[0], "other", div_other_value = "\n\t\tbutton\n\t\tbutton--size--" + /*size*/ ctx[0] + "\n\t\tbutton--theme--" + /*theme*/ ctx[1] + "\n  \t" + (/*$$restProps*/ ctx[2].class || ''));
		},
		m(target, anchor) {
			insert_all(target, render_nodes, [0,1,2], anchor);
			mount_component(component, target, render_nodes[2]);
			current = true;
		},
		p(ctx, [dirty]) {
			if (!current || dirty & /*size, theme, $$restProps*/ 7 && div_class_value !== (div_class_value = "button button--size--" + /*size*/ ctx[0] + " button--theme--" + /*theme*/ ctx[1] + " " + (/*$$restProps*/ ctx[2].class || ''))) {
				attr(render_nodes[0], "class", div_class_value);
			}

			if (!current || dirty & /*size, $$restProps*/ 5 && div_style_value !== (div_style_value = "color: green; background: white; font-size: " + /*size*/ ctx[0] + "; transform: " + /*$$restProps*/ ctx[2].scale + " " + /*$$restProps*/ ctx[2].rotate + "; " + /*$$restProps*/ ctx[2].styles)) {
				attr(render_nodes[0], "style", div_style_value);
			}

			if (!current || dirty & /*size, theme, $$restProps*/ 7 && div_other_value !== (div_other_value = "\n\t\tbutton\n\t\tbutton--size--" + /*size*/ ctx[0] + "\n\t\tbutton--theme--" + /*theme*/ ctx[1] + "\n  \t" + (/*$$restProps*/ ctx[2].class || ''))) {
				attr(render_nodes[0], "other", div_other_value);
			}

			const component_changes = {};
			if (dirty & /*size, theme, $$restProps*/ 7) component_changes.class = "\n\t\tbutton\n\t\tbutton--size--" + /*size*/ ctx[0] + "\n\t\tbutton--theme--" + /*theme*/ ctx[1] + "\n  \t" + (/*$$restProps*/ ctx[2].class || '');
			if (dirty & /*size, $$restProps*/ 5) component_changes.style = "\n\t\tcolor: green;\n\t\tbackground: white;\n\t\tfont-size: " + /*size*/ ctx[0] + ";\n  \ttransform: " + /*$$restProps*/ ctx[2].scale + "  " + /*$$restProps*/ ctx[2].rotate + ";\n\t\t" + /*$$restProps*/ ctx[2].styles;
			if (dirty & /*size, theme, $$restProps*/ 7) component_changes.other = "\n\t\tbutton\n\t\tbutton--size--" + /*size*/ ctx[0] + "\n\t\tbutton--theme--" + /*theme*/ ctx[1] + "\n  \t" + (/*$$restProps*/ ctx[2].class || '');
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
			detach_all(detaching, render_nodes, [0,1,2]);
			destroy_component(component, detaching);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	const omit_props_names = ["size","theme"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { size } = $$props;
	let { theme } = $$props;

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
		if ('theme' in $$new_props) $$invalidate(1, theme = $$new_props.theme);
	};

	return [size, theme, $$restProps];
}

class Component_1 extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { size: 0, theme: 1 });
	}
}

export default Component_1;