import { namespaces } from "../../../../utils/namespaces";
import Wrapper from "./Wrapper";

export function needs_svg_wrapper(node: Wrapper) {
	return node.node.type === 'Element' && node.node.namespace === namespaces.svg && node.node.name !== 'svg';
}
