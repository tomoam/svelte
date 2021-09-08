/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	check_outros,
	create_out_transition,
	detach,
	first_child,
	group_outros,
	init,
	insert,
	make_renderer,
	safe_not_equal,
	transition_in,
	transition_out
} from "svelte/internal";

import { fade } from 'svelte/transition';
const render = make_renderer(`<div><p>wheeee</p></div>`);

// (7:0) {#if num < 5}
function create_if_block(ctx) {
	let div;
	let div_outro;
	let current;

	return {
		c() {
			div = first_child(render());
		},
		m(target, anchor) {
			insert(target, div, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			if (div_outro) div_outro.end(1);
			current = true;
		},
		o(local) {
			div_outro = create_out_transition(div, fade, {});
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (detaching && div_outro) div_outro.end();
		}
	};
}

const render_1 = make_renderer(`<!>`);

function create_fragment(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*num*/ ctx[0] < 5 && create_if_block(ctx);

	return {
		c() {
			if_block_anchor = first_child(render_1());
			if (if_block) if_block.c();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (/*num*/ ctx[0] < 5) {
				if (if_block) {
					if (dirty & /*num*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(if_block_anchor);
			if (if_block) if_block.d(detaching);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { num = 1 } = $$props;

	$$self.$$set = $$props => {
		if ('num' in $$props) $$invalidate(0, num = $$props.num);
	};

	return [num];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { num: 0 });
	}
}

export default Component;