import { escape_html } from '../../utils/stringify';
import Renderer, { RenderOptions } from '../TemplateRenderer';
import Text from '../../nodes/Text';
import Element from '../../nodes/Element';

export default function(node: Text, renderer: Renderer, _options: RenderOptions) {
	// let text = node.data;
	let text = data_of(node);
	if (
		!node.parent ||
		node.parent.type !== 'Element' ||
		((node.parent as Element).name !== 'script' && (node.parent as Element).name !== 'style')
	) {
		// unless this Text node is inside a <script> or <style> element, escape &,<,>
		text = escape_html(text);
	}

	renderer.add_string(text);
}

/**
 * 最初と最後にホワイトスペースを含まず、すべてのホワイトスペースを単一スペースに正規化する
 * ようにした data
 * (通常 data はテキストノードが持つプロパティのことで、ノードのテキストを
 * 表します)
 *
 * @param txt  data が返されるべきテキストノード
 * @return     当該テキストノードの内容が与えるホワイトスペースを纏めた文字列
 */
export function data_of(node: Text) {
	var data = node.data;
	// ECMA-262 第3版 の String および RegExp の機能を使用
	data = data.replace(/[\t\n\r ]+/g, " ");
	// if (data.charAt(0) == " ") {
	// 	data = data.substring(1, data.length);
	// }
	// if (data.charAt(data.length - 1) == " " && !node.next) {
	// 	data = data.substring(0, data.length - 1);
	// }
	return data;
}
