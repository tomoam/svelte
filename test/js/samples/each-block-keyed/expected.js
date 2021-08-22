/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	destroy_block,
	detach,
	first_child,
	init,
	insert_experimental,
	make_renderer,
	noop,
	replace_blank,
	replace_text,
	safe_not_equal,
	set_data,
	update_keyed_each
} from "svelte/internal";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i];
	return child_ctx;
}

const render = make_renderer(`<div><!></div>`);

// (5:0) {#each things as thing (thing.id)}
function create_each_block(key_1, ctx) {
	let div;
	let t_value = /*thing*/ ctx[1].name + "";
	let t;

	return {
		key: key_1,
		first: null,
		c() {
			div = first_child(render());
			t = replace_text(first_child(div), t_value);
			this.first = div;
		},
		m(target, anchor) {
			insert_experimental(target, div, anchor);
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*things*/ 1 && t_value !== (t_value = /*thing*/ ctx[1].name + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

const render_1 = make_renderer(`<!>`);

function create_fragment(ctx) {
	let each_blocks = [];
	let each_1_lookup = new Map();
	let each_1_anchor;
	let each_value = /*things*/ ctx[0];
	const get_key = ctx => /*thing*/ ctx[1].id;

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
	}

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = replace_blank(first_child(render_1()));
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert_experimental(target, each_1_anchor, anchor);
		},
		p(ctx, [dirty]) {
			if (dirty & /*things*/ 1) {
				each_value = /*things*/ ctx[0];
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, each_1_anchor.parentNode, destroy_block, create_each_block, each_1_anchor, get_each_context);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(each_1_anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d(detaching);
			}
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { things } = $$props;

	$$self.$$set = $$props => {
		if ('things' in $$props) $$invalidate(0, things = $$props.things);
	};

	return [things];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { things: 0 });
	}
}

export default Component;