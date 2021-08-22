/* generated by Svelte vX.Y.Z */
import {
	SvelteComponent,
	add_render_callback,
	detach,
	first_child,
	init,
	insert_experimental,
	listen,
	make_renderer,
	noop,
	raf,
	run_all,
	safe_not_equal,
	time_ranges_to_array
} from "svelte/internal";

const render = make_renderer(`<audio></audio>`);

function create_fragment(ctx) {
	let audio;
	let audio_updating = false;
	let audio_animationframe;
	let audio_is_paused = true;
	let mounted;
	let dispose;

	function audio_timeupdate_handler() {
		cancelAnimationFrame(audio_animationframe);

		if (!audio.paused) {
			audio_animationframe = raf(audio_timeupdate_handler);
			audio_updating = true;
		}

		/*audio_timeupdate_handler*/ ctx[13].call(audio);
	}

	return {
		c() {
			audio = first_child(render());
			if (/*buffered*/ ctx[0] === void 0) add_render_callback(() => /*audio_progress_handler*/ ctx[11].call(audio));
			if (/*buffered*/ ctx[0] === void 0 || /*seekable*/ ctx[1] === void 0) add_render_callback(() => /*audio_loadedmetadata_handler*/ ctx[12].call(audio));
			if (/*played*/ ctx[2] === void 0 || /*currentTime*/ ctx[3] === void 0 || /*ended*/ ctx[10] === void 0) add_render_callback(audio_timeupdate_handler);
			if (/*duration*/ ctx[4] === void 0) add_render_callback(() => /*audio_durationchange_handler*/ ctx[14].call(audio));
			if (/*seeking*/ ctx[9] === void 0) add_render_callback(() => /*audio_seeking_seeked_handler*/ ctx[18].call(audio));
			if (/*ended*/ ctx[10] === void 0) add_render_callback(() => /*audio_ended_handler*/ ctx[19].call(audio));
		},
		m(target, anchor) {
			insert_experimental(target, audio, anchor);

			if (!isNaN(/*volume*/ ctx[6])) {
				audio.volume = /*volume*/ ctx[6];
			}

			audio.muted = /*muted*/ ctx[7];

			if (!isNaN(/*playbackRate*/ ctx[8])) {
				audio.playbackRate = /*playbackRate*/ ctx[8];
			}

			if (!mounted) {
				dispose = [
					listen(audio, "progress", /*audio_progress_handler*/ ctx[11]),
					listen(audio, "loadedmetadata", /*audio_loadedmetadata_handler*/ ctx[12]),
					listen(audio, "timeupdate", audio_timeupdate_handler),
					listen(audio, "durationchange", /*audio_durationchange_handler*/ ctx[14]),
					listen(audio, "play", /*audio_play_pause_handler*/ ctx[15]),
					listen(audio, "pause", /*audio_play_pause_handler*/ ctx[15]),
					listen(audio, "volumechange", /*audio_volumechange_handler*/ ctx[16]),
					listen(audio, "ratechange", /*audio_ratechange_handler*/ ctx[17]),
					listen(audio, "seeking", /*audio_seeking_seeked_handler*/ ctx[18]),
					listen(audio, "seeked", /*audio_seeking_seeked_handler*/ ctx[18]),
					listen(audio, "ended", /*audio_ended_handler*/ ctx[19])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (!audio_updating && dirty & /*currentTime*/ 8 && !isNaN(/*currentTime*/ ctx[3])) {
				audio.currentTime = /*currentTime*/ ctx[3];
			}

			audio_updating = false;

			if (dirty & /*paused*/ 32 && audio_is_paused !== (audio_is_paused = /*paused*/ ctx[5])) {
				audio[audio_is_paused ? "pause" : "play"]();
			}

			if (dirty & /*volume*/ 64 && !isNaN(/*volume*/ ctx[6])) {
				audio.volume = /*volume*/ ctx[6];
			}

			if (dirty & /*muted*/ 128) {
				audio.muted = /*muted*/ ctx[7];
			}

			if (dirty & /*playbackRate*/ 256 && !isNaN(/*playbackRate*/ ctx[8])) {
				audio.playbackRate = /*playbackRate*/ ctx[8];
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(audio);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { buffered } = $$props;
	let { seekable } = $$props;
	let { played } = $$props;
	let { currentTime } = $$props;
	let { duration } = $$props;
	let { paused } = $$props;
	let { volume } = $$props;
	let { muted } = $$props;
	let { playbackRate } = $$props;
	let { seeking } = $$props;
	let { ended } = $$props;

	function audio_progress_handler() {
		buffered = time_ranges_to_array(this.buffered);
		$$invalidate(0, buffered);
	}

	function audio_loadedmetadata_handler() {
		buffered = time_ranges_to_array(this.buffered);
		seekable = time_ranges_to_array(this.seekable);
		$$invalidate(0, buffered);
		$$invalidate(1, seekable);
	}

	function audio_timeupdate_handler() {
		played = time_ranges_to_array(this.played);
		currentTime = this.currentTime;
		ended = this.ended;
		$$invalidate(2, played);
		$$invalidate(3, currentTime);
		$$invalidate(10, ended);
	}

	function audio_durationchange_handler() {
		duration = this.duration;
		$$invalidate(4, duration);
	}

	function audio_play_pause_handler() {
		paused = this.paused;
		$$invalidate(5, paused);
	}

	function audio_volumechange_handler() {
		volume = this.volume;
		muted = this.muted;
		$$invalidate(6, volume);
		$$invalidate(7, muted);
	}

	function audio_ratechange_handler() {
		playbackRate = this.playbackRate;
		$$invalidate(8, playbackRate);
	}

	function audio_seeking_seeked_handler() {
		seeking = this.seeking;
		$$invalidate(9, seeking);
	}

	function audio_ended_handler() {
		ended = this.ended;
		$$invalidate(10, ended);
	}

	$$self.$$set = $$props => {
		if ('buffered' in $$props) $$invalidate(0, buffered = $$props.buffered);
		if ('seekable' in $$props) $$invalidate(1, seekable = $$props.seekable);
		if ('played' in $$props) $$invalidate(2, played = $$props.played);
		if ('currentTime' in $$props) $$invalidate(3, currentTime = $$props.currentTime);
		if ('duration' in $$props) $$invalidate(4, duration = $$props.duration);
		if ('paused' in $$props) $$invalidate(5, paused = $$props.paused);
		if ('volume' in $$props) $$invalidate(6, volume = $$props.volume);
		if ('muted' in $$props) $$invalidate(7, muted = $$props.muted);
		if ('playbackRate' in $$props) $$invalidate(8, playbackRate = $$props.playbackRate);
		if ('seeking' in $$props) $$invalidate(9, seeking = $$props.seeking);
		if ('ended' in $$props) $$invalidate(10, ended = $$props.ended);
	};

	return [
		buffered,
		seekable,
		played,
		currentTime,
		duration,
		paused,
		volume,
		muted,
		playbackRate,
		seeking,
		ended,
		audio_progress_handler,
		audio_loadedmetadata_handler,
		audio_timeupdate_handler,
		audio_durationchange_handler,
		audio_play_pause_handler,
		audio_volumechange_handler,
		audio_ratechange_handler,
		audio_seeking_seeked_handler,
		audio_ended_handler
	];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			buffered: 0,
			seekable: 1,
			played: 2,
			currentTime: 3,
			duration: 4,
			paused: 5,
			volume: 6,
			muted: 7,
			playbackRate: 8,
			seeking: 9,
			ended: 10
		});
	}
}

export default Component;