/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	attr,
	children,
	claim_element,
	detach,
	init,
	insert_hydration,
	make_renderer,
	noop,
	safe_not_equal
} from "svelte/internal";

const render = make_renderer(`<svg><img alt="potato"></svg>`);

function create_fragment(ctx) {
	let svg;
	let img;

	return {
		c() {
			svg = render().firstChild;
			img = svg.firstChild;
			this.h();
		},
		l(nodes) {
			this.c();
			if (!nodes.length) return;
			svg = claim_element(svg, nodes);
			var svg_nodes = children(svg);
			img = claim_element(img, svg_nodes, svg);
			this.h();
		},
		h() {
			attr(img, "src", /*url*/ ctx[0]);
		},
		m(target, anchor) {
			insert_hydration(target, svg, anchor);
		},
		p(ctx, [dirty]) {
			if (dirty & /*url*/ 1) {
				attr(img, "src", /*url*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { url } = $$props;

	$$self.$$set = $$props => {
		if ('url' in $$props) $$invalidate(0, url = $$props.url);
	};

	return [url];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { url: 0 });
	}
}

export default Component;