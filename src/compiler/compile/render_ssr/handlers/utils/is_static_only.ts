import { RenderOptions } from "../../Renderer";

export function is_static_only(options: RenderOptions) {
	return options.generate !== 'ssr';
}
