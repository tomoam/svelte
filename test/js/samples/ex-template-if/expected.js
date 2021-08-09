/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	detach,
	empty,
	first_child,
	first_element_child,
	init,
	insert,
	listen,
	make_renderer,
	next_element_sibling,
	next_sibling,
	noop,
	replace_text,
	run_all,
	safe_not_equal,
	set_data,
	set_input_value
} from "svelte/internal";

const render_2 = make_renderer(`<article>abc</article>`);

// (16:1) {:else}
function create_else_block(ctx) {
	let article;

	return {
		c() {
			article = first_child(render_2());
		},
		m(target, anchor) {
			insert(target, article, anchor);
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
	let input;
	let t2;
	let if_block_anchor;
	let mounted;
	let dispose;
	let if_block = /*childChecked*/ ctx[1] && create_if_block_1(ctx);

	return {
		c() {
			span = first_child(render_1());
			input = next_element_sibling(span);
			t2 = next_sibling(input);
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			insert(target, span, anchor);
			insert(target, input, anchor);
			input.checked = /*childChecked*/ ctx[1];
			insert(target, t2, anchor);
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);

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
			if (detaching) detach(input);
			if (detaching) detach(t2);
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
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

	return {
		c() {
			span = first_child(render());
			t0 = replace_text(first_child(span), /*str*/ ctx[2]);
		},
		m(target, anchor) {
			insert(target, span, anchor);
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
			if_block.c();
		},
		m(target, anchor) {
			insert(target, div, anchor);
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