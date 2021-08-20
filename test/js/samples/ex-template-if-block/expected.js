/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	claim_template_element,
	detach,
	first_child,
	init,
	insert_hydration,
	make_renderer,
	noop,
	replace_blank,
	safe_not_equal,
	trim_nodes
} from "svelte/internal";

const render = make_renderer(`<p>foo!</p>`);

// (5:0) {#if foo}
function create_if_block(ctx) {
	let p;
	let cloned;

	return {
		c() {
			p = first_child(render());
			cloned = true;
		},
		l(nodes) {
			if (!cloned) this.c();
			if (nodes.length === 0) return;
			p = claim_template_element(p, nodes);
		},
		m(target, anchor) {
			insert_hydration(target, p, anchor);
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

const render_1 = make_renderer(`<!>`);

function create_fragment(ctx) {
	let if_block_anchor;
	let cloned;
	let if_block = /*foo*/ ctx[0] && create_if_block(ctx);

	return {
		c() {
			if_block_anchor = replace_blank(first_child(render_1()));
			if (if_block) if_block.c();
			cloned = true;
		},
		l(nodes) {
			if (!cloned) this.c();
			if (nodes.length === 0) return;
			if_block_anchor = if_block_anchor;
			if (if_block) if_block.l(trim_nodes(nodes));
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_hydration(target, if_block_anchor, anchor);
		},
		p(ctx, [dirty]) {
			if (/*foo*/ ctx[0]) {
				if (if_block) {
					
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(if_block_anchor);
			if (if_block) if_block.d(detaching);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { foo = true } = $$props;

	$$self.$$set = $$props => {
		if ('foo' in $$props) $$invalidate(0, foo = $$props.foo);
	};

	return [foo];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { foo: 0 });
	}
}

export default Component;