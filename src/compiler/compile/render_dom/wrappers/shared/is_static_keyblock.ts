import { INode } from '../../../nodes/interfaces';
import KeyBlock from '../../../nodes/KeyBlock';

export function is_static_keyblock(node: INode) : node is KeyBlock {
	return node && node.type === 'KeyBlock' && node.expression.dynamic_dependencies().length === 0;
}
