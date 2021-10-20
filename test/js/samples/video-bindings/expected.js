/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	add_render_callback,
	add_resize_listener,
	detach,
	init,
	insert,
	listen,
	make_renderer,
	noop,
	raf,
	run_all,
	safe_not_equal,
	traverse
} from "svelte/internal";

const render = make_renderer(`<video></video>`);

function create_fragment(ctx) {
	let render_nodes = [];
	let video_updating = false;
	let video_animationframe;
	let video_resize_listener;
	let mounted;
	let dispose;

	function video_timeupdate_handler() {
		cancelAnimationFrame(video_animationframe);

		if (!render_nodes[0].paused) {
			video_animationframe = raf(video_timeupdate_handler);
			video_updating = true;
		}

		/*video_timeupdate_handler*/ ctx[4].call(render_nodes[0]);
	}

	return {
		c() {
			traverse(render(), render_nodes);
			if (/*videoHeight*/ ctx[1] === void 0 || /*videoWidth*/ ctx[2] === void 0) add_render_callback(() => /*video_resize_handler*/ ctx[5].call(render_nodes[0]));
			add_render_callback(() => /*video_elementresize_handler*/ ctx[6].call(render_nodes[0]));
		},
		m(target, anchor) {
			insert(target, render_nodes[0], anchor); /* video */
			video_resize_listener = add_resize_listener(render_nodes[0], /*video_elementresize_handler*/ ctx[6].bind(render_nodes[0]));

			if (!mounted) {
				dispose = [
					listen(render_nodes[0], "timeupdate", video_timeupdate_handler),
					listen(render_nodes[0], "resize", /*video_resize_handler*/ ctx[5])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (!video_updating && dirty & /*currentTime*/ 1 && !isNaN(/*currentTime*/ ctx[0])) {
				render_nodes[0].currentTime = /*currentTime*/ ctx[0];
			}

			video_updating = false;
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(render_nodes[0]); /* video */
			video_resize_listener();
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { currentTime } = $$props;
	let { videoHeight } = $$props;
	let { videoWidth } = $$props;
	let { offsetWidth } = $$props;

	function video_timeupdate_handler() {
		currentTime = this.currentTime;
		$$invalidate(0, currentTime);
	}

	function video_resize_handler() {
		videoHeight = this.videoHeight;
		videoWidth = this.videoWidth;
		$$invalidate(1, videoHeight);
		$$invalidate(2, videoWidth);
	}

	function video_elementresize_handler() {
		offsetWidth = this.offsetWidth;
		$$invalidate(3, offsetWidth);
	}

	$$self.$$set = $$props => {
		if ('currentTime' in $$props) $$invalidate(0, currentTime = $$props.currentTime);
		if ('videoHeight' in $$props) $$invalidate(1, videoHeight = $$props.videoHeight);
		if ('videoWidth' in $$props) $$invalidate(2, videoWidth = $$props.videoWidth);
		if ('offsetWidth' in $$props) $$invalidate(3, offsetWidth = $$props.offsetWidth);
	};

	return [
		currentTime,
		videoHeight,
		videoWidth,
		offsetWidth,
		video_timeupdate_handler,
		video_resize_handler,
		video_elementresize_handler
	];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			currentTime: 0,
			videoHeight: 1,
			videoWidth: 2,
			offsetWidth: 3
		});
	}
}

export default Component;