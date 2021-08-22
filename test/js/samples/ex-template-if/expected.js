/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	children,
	claim_element_experimental,
	claim_text_experimental,
	detach,
	first_child,
	first_element_child,
	init,
	insert_experimental_hydration,
	listen,
	make_renderer,
	next_element_sibling,
	next_sibling,
	noop,
	replace_blank,
	replace_text,
	run_all,
	safe_not_equal,
	set_data,
	set_input_value,
	trim_nodes
} from "svelte/internal";

const render_2 = make_renderer(`<article>abc</article>`);

// (16:1) {:else}
function create_else_block(ctx) {
	let article;

	return {
		c() {
			article = first_child(render_2());
		},
		l(nodes) {
			this.c();
			if (!nodes.length) return;
			article = claim_element_experimental(article, nodes);
		},
		m(target, anchor) {
			insert_experimental_hydration(target, article, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(article);
		}
	};
}

const render_1 = make_renderer(`<span>Visible!</span> <input type="checkbox"> <!>`);

// (10:1) {#if checked}
function create_if_block(ctx) {
	let span;
	let t1;
	let input;
	let t2;
	let if_block_anchor;
	let mounted;
	let dispose;
	let if_block = /*childChecked*/ ctx[1] && create_if_block_1(ctx);

	return {
		c() {
			span = first_child(render_1());
			t1 = next_sibling(span);
			input = next_element_sibling(t1);
			t2 = next_sibling(input);
			if_block_anchor = replace_blank(next_sibling(t2));
			if (if_block) if_block.c();
		},
		l(nodes) {
			this.c();
			if (!nodes.length) return;
			span = claim_element_experimental(span, nodes);
			t1 = claim_text_experimental(t1, nodes);
			input = claim_element_experimental(input, nodes);
			t2 = claim_text_experimental(t2, nodes);
			if_block_anchor = if_block_anchor;
			if (if_block) if_block.l(trim_nodes(nodes));
		},
		m(target, anchor) {
			insert_experimental_hydration(target, span, anchor);
			insert_experimental_hydration(target, t1, anchor);
			insert_experimental_hydration(target, input, anchor);
			input.checked = /*childChecked*/ ctx[1];
			insert_experimental_hydration(target, t2, anchor);
			if (if_block) if_block.m(target, anchor);
			insert_experimental_hydration(target, if_block_anchor, anchor);

			if (!mounted) {
				dispose = listen(input, "change", /*input_change_handler*/ ctx[5]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*childChecked*/ 2) {
				input.checked = /*childChecked*/ ctx[1];
			}

			if (/*childChecked*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_1(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d(detaching) {
			if (detaching) detach(span);
			if (detaching) detach(t1);
			if (detaching) detach(input);
			if (detaching) detach(t2);
			if (detaching) detach(if_block_anchor);
			if (if_block) if_block.d(detaching);
			mounted = false;
			dispose();
		}
	};
}

const render = make_renderer(`<span><!> Visible!</span>`);

// (13:2) {#if childChecked}
function create_if_block_1(ctx) {
	let span;
	let t0;
	let t1;

	return {
		c() {
			span = first_child(render());
			t0 = replace_text(first_child(span), /*str*/ ctx[2]);
			t1 = next_sibling(t0);
		},
		l(nodes) {
			this.c();
			if (!nodes.length) return;
			span = claim_element_experimental(span, nodes);
			var span_nodes = children(span);
			t0 = claim_text_experimental(t0, span_nodes, span);
			t1 = claim_text_experimental(t1, span_nodes, span);
		},
		m(target, anchor) {
			insert_experimental_hydration(target, span, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*str*/ 4) set_data(t0, /*str*/ ctx[2]);
		},
		d(detaching) {
			if (detaching) detach(span);
		}
	};
}

const render_3 = make_renderer(`<div><input type="text"> <input type="checkbox"> <!></div>`);

function create_fragment(ctx) {
	let div;
	let input0;
	let input1;
	let t1;
	let if_block_anchor;
	let mounted;
	let dispose;

	function select_block_type(ctx, dirty) {
		if (/*checked*/ ctx[0]) return create_if_block;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx, -1);
	let if_block = current_block_type(ctx);

	return {
		c() {
			div = first_child(render_3());
			input0 = first_element_child(div);
			input1 = next_element_sibling(input0);
			t1 = next_sibling(input1);
			if_block_anchor = replace_blank(next_sibling(t1));
			if_block.c();
		},
		l(nodes) {
			this.c();
			if (!nodes.length) return;
			div = claim_element_experimental(div, nodes);
			var div_nodes = children(div);
			input0 = claim_element_experimental(input0, div_nodes, div);
			input1 = claim_element_experimental(input1, div_nodes, div);
			t1 = claim_text_experimental(t1, div_nodes, div);
			if_block.l(trim_nodes(div_nodes));
		},
		m(target, anchor) {
			insert_experimental_hydration(target, div, anchor);
			set_input_value(input0, /*str*/ ctx[2]);
			input1.checked = /*checked*/ ctx[0];
			if_block.m(div, null);

			if (!mounted) {
				dispose = [
					listen(input0, "input", /*input0_input_handler*/ ctx[3]),
					listen(input1, "change", /*input1_change_handler*/ ctx[4])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*str*/ 4 && input0.value !== /*str*/ ctx[2]) {
				set_input_value(input0, /*str*/ ctx[2]);
			}

			if (dirty & /*checked*/ 1) {
				input1.checked = /*checked*/ ctx[0];
			}

			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div, null);
				}
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let checked = false;
	let childChecked = false;
	let str = 'Child';

	function input0_input_handler() {
		str = this.value;
		$$invalidate(2, str);
	}

	function input1_change_handler() {
		checked = this.checked;
		$$invalidate(0, checked);
	}

	function input_change_handler() {
		childChecked = this.checked;
		$$invalidate(1, childChecked);
	}

	return [
		checked,
		childChecked,
		str,
		input0_input_handler,
		input1_change_handler,
		input_change_handler
	];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Component;