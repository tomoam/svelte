/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	attr,
	claim_element_experimental,
	claim_text_experimental,
	detach,
	first_child,
	init,
	insert_experimental_hydration,
	make_renderer,
	next_element_sibling,
	next_sibling,
	noop,
	safe_not_equal,
	src_url_equal
} from "svelte/internal";

const render = make_renderer(`<img alt="potato"> <img alt="potato">`);

function create_fragment(ctx) {
	let img0;
	let img0_src_value;
	let t;
	let img1;
	let img1_src_value;

	return {
		c() {
			img0 = first_child(render());
			t = next_sibling(img0);
			img1 = next_element_sibling(t);
			this.h();
		},
		l(nodes) {
			this.c();
			if (!nodes.length) return;
			img0 = claim_element_experimental(img0, nodes);
			t = claim_text_experimental(t, nodes);
			img1 = claim_element_experimental(img1, nodes);
			this.h();
		},
		h() {
			if (!src_url_equal(img0.src, img0_src_value = /*url*/ ctx[0])) attr(img0, "src", img0_src_value);
			if (!src_url_equal(img1.src, img1_src_value = "" + (/*slug*/ ctx[1] + ".jpg"))) attr(img1, "src", img1_src_value);
		},
		m(target, anchor) {
			insert_experimental_hydration(target, img0, anchor);
			insert_experimental_hydration(target, t, anchor);
			insert_experimental_hydration(target, img1, anchor);
		},
		p(ctx, [dirty]) {
			if (dirty & /*url*/ 1 && !src_url_equal(img0.src, img0_src_value = /*url*/ ctx[0])) {
				attr(img0, "src", img0_src_value);
			}

			if (dirty & /*slug*/ 2 && !src_url_equal(img1.src, img1_src_value = "" + (/*slug*/ ctx[1] + ".jpg"))) {
				attr(img1, "src", img1_src_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(img0);
			if (detaching) detach(t);
			if (detaching) detach(img1);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { url } = $$props;
	let { slug } = $$props;

	$$self.$$set = $$props => {
		if ('url' in $$props) $$invalidate(0, url = $$props.url);
		if ('slug' in $$props) $$invalidate(1, slug = $$props.slug);
	};

	return [url, slug];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { url: 0, slug: 1 });
	}
}

export default Component;