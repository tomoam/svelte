/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	component_subscribe,
	detach,
	init,
	insert,
	make_renderer,
	noop,
	safe_not_equal,
	subscribe,
	toggle_class,
	traverse
} from "svelte/internal";

import { reactiveStoreVal, unreactiveExport } from './store';
const render = make_renderer(`<div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div>`);
const node_path = () => [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

function create_fragment(ctx) {
	let render_nodes = [];

	return {
		c() {
			traverse(render(), render_nodes, node_path());
			toggle_class(render_nodes[0], "update1", reactiveModuleVar);
			toggle_class(render_nodes[2], "update2", /*reactiveConst*/ ctx[0].x);
			toggle_class(render_nodes[4], "update3", nonReactiveGlobal && /*reactiveConst*/ ctx[0].x);
			toggle_class(render_nodes[6], "update4", /*$reactiveStoreVal*/ ctx[2]);
			toggle_class(render_nodes[8], "update5", /*$reactiveDeclaration*/ ctx[3]);
			toggle_class(render_nodes[10], "static1", nonReactiveModuleVar);
			toggle_class(render_nodes[12], "static2", nonReactiveGlobal);
			toggle_class(render_nodes[14], "static3", nonReactiveModuleVar && nonReactiveGlobal);
			toggle_class(render_nodes[16], "static4", unreactiveExport);
		},
		m(target, anchor) {
			insert(target, render_nodes[0], anchor); /* div0 */
			insert(target, render_nodes[1], anchor); /* t0 */
			insert(target, render_nodes[2], anchor); /* div1 */
			insert(target, render_nodes[3], anchor); /* t1 */
			insert(target, render_nodes[4], anchor); /* div2 */
			insert(target, render_nodes[5], anchor); /* t2 */
			insert(target, render_nodes[6], anchor); /* div3 */
			insert(target, render_nodes[7], anchor); /* t3 */
			insert(target, render_nodes[8], anchor); /* div4 */
			insert(target, render_nodes[9], anchor); /* t4 */
			insert(target, render_nodes[10], anchor); /* div5 */
			insert(target, render_nodes[11], anchor); /* t5 */
			insert(target, render_nodes[12], anchor); /* div6 */
			insert(target, render_nodes[13], anchor); /* t6 */
			insert(target, render_nodes[14], anchor); /* div7 */
			insert(target, render_nodes[15], anchor); /* t7 */
			insert(target, render_nodes[16], anchor); /* div8 */
		},
		p(ctx, [dirty]) {
			if (dirty & /*reactiveModuleVar*/ 0) {
				toggle_class(render_nodes[0], "update1", reactiveModuleVar);
			}

			if (dirty & /*reactiveConst*/ 1) {
				toggle_class(render_nodes[2], "update2", /*reactiveConst*/ ctx[0].x);
			}

			if (dirty & /*nonReactiveGlobal, reactiveConst*/ 1) {
				toggle_class(render_nodes[4], "update3", nonReactiveGlobal && /*reactiveConst*/ ctx[0].x);
			}

			if (dirty & /*$reactiveStoreVal*/ 4) {
				toggle_class(render_nodes[6], "update4", /*$reactiveStoreVal*/ ctx[2]);
			}

			if (dirty & /*$reactiveDeclaration*/ 8) {
				toggle_class(render_nodes[8], "update5", /*$reactiveDeclaration*/ ctx[3]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(render_nodes[0]); /* div0 */
			if (detaching) detach(render_nodes[1]); /* t0 */
			if (detaching) detach(render_nodes[2]); /* div1 */
			if (detaching) detach(render_nodes[3]); /* t1 */
			if (detaching) detach(render_nodes[4]); /* div2 */
			if (detaching) detach(render_nodes[5]); /* t2 */
			if (detaching) detach(render_nodes[6]); /* div3 */
			if (detaching) detach(render_nodes[7]); /* t3 */
			if (detaching) detach(render_nodes[8]); /* div4 */
			if (detaching) detach(render_nodes[9]); /* t4 */
			if (detaching) detach(render_nodes[10]); /* div5 */
			if (detaching) detach(render_nodes[11]); /* t5 */
			if (detaching) detach(render_nodes[12]); /* div6 */
			if (detaching) detach(render_nodes[13]); /* t6 */
			if (detaching) detach(render_nodes[14]); /* div7 */
			if (detaching) detach(render_nodes[15]); /* t7 */
			if (detaching) detach(render_nodes[16]); /* div8 */
		}
	};
}

let nonReactiveModuleVar = Math.random();
let reactiveModuleVar = Math.random();

function instance($$self, $$props, $$invalidate) {
	let reactiveDeclaration;
	let $reactiveStoreVal;

	let $reactiveDeclaration,
		$$unsubscribe_reactiveDeclaration = noop,
		$$subscribe_reactiveDeclaration = () => ($$unsubscribe_reactiveDeclaration(), $$unsubscribe_reactiveDeclaration = subscribe(reactiveDeclaration, $$value => $$invalidate(3, $reactiveDeclaration = $$value)), reactiveDeclaration);

	component_subscribe($$self, reactiveStoreVal, $$value => $$invalidate(2, $reactiveStoreVal = $$value));
	$$self.$$.on_destroy.push(() => $$unsubscribe_reactiveDeclaration());
	nonReactiveGlobal = Math.random();
	const reactiveConst = { x: Math.random() };
	reactiveModuleVar += 1;

	if (Math.random()) {
		reactiveConst.x += 1;
	}

	$: $$subscribe_reactiveDeclaration($$invalidate(1, reactiveDeclaration = reactiveModuleVar * 2));
	return [reactiveConst, reactiveDeclaration, $reactiveStoreVal, $reactiveDeclaration];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Component;