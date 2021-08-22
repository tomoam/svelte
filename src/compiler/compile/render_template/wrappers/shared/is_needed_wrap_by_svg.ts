import { namespaces } from "../../../../utils/namespaces";
import Wrapper from "./Wrapper";

export function is_needed_wrap_by_svg(node: Wrapper) {
	return node.node.type === 'Element' && node.node.namespace === namespaces.svg && node.node.name !== 'svg';
}
