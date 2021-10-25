import { namespaces } from './../../../utils/namespaces';
import { b, x } from 'code-red';
import Renderer from '../Renderer';
import Block from '../Block';
import Tag from './shared/Tag';
import Wrapper from './shared/Wrapper';
import Element from '../../nodes/Element';
import MustacheTag from '../../nodes/MustacheTag';
import RawMustacheTag from '../../nodes/RawMustacheTag';
import { is_head } from './shared/is_head';
import { Identifier } from 'estree';

export default class RawMustacheTagWrapper extends Tag {
	var: Identifier = { type: 'Identifier', name: 'raw' };

	constructor(
		renderer: Renderer,
		block: Block,
		parent: Wrapper,
		node: MustacheTag | RawMustacheTag
	) {
		super(renderer, block, parent, node);
		this.cannot_use_innerhtml();
		this.not_static_content();
	}

	set_index_number(root_node: Wrapper) {
		super.set_index_number(root_node);

		this.push_to_node_path(true);
	}

	render(block: Block, parent_node: Identifier, parent_nodes: Identifier) {
		const in_head = is_head(parent_node);

		const can_use_innerhtml = !in_head && parent_node && !this.prev && !this.next;

		if (can_use_innerhtml) {
			const insert = content => b`${parent_node}.innerHTML = ${content};`[0];

			const { init } = this.rename_this_method(
				block,
				content => insert(content)
			);

			block.chunks.mount.push(insert(init));
		} else {
			const html_tag = block.get_unique_name('html_tag');

			block.add_variable(html_tag);

			const { init } = this.rename_this_method(
				block,
				content => x`${html_tag}.p(${content})`
			);

			const parent_element = this.node.find_nearest(/^Element/) as Element;
			const is_svg = parent_element && parent_element.namespace === namespaces.svg;
			block.chunks.create.push(b`${html_tag} = new @HtmlTag(${is_svg ? 'true' : 'false'});`);

			if (this.renderer.options.hydratable) {
				if (!parent_node && !this.prev && !this.next) {
					block.chunks.claim.push(b`${html_tag} = @claim_html_tag(${parent_nodes}, ${is_svg ? 'true' : 'false'});`);
				} else {
					block.chunks.claim.push(b`
						${this.get_claim_func_map_var(block)}.set(${this.index_in_render_nodes}, (n) => ${html_tag} = @claim_html_tag(n, ${is_svg ? 'true' : 'false'}));
					`);

					const claim_statement = this.get_claim_statement(block, parent_node, parent_nodes);
					if (claim_statement) {
						block.chunks.claim.push(claim_statement);
					}
				}
			}

			block.add_statement(
				this.var,
				this.get_var(),
				this.get_create_statement(parent_node),
				undefined,
				this.get_mount_statement(),
				this.get_destroy_statement(),
				parent_node,
				this
			);

			block.chunks.mount.push(b`${html_tag}.m(${init}, ${parent_node || '#target'}, ${this.get_var()});`);

			block.chunks.hydrate.push(b`${html_tag}.a = ${this.get_var()};`);

			if (!parent_node || in_head) {
				block.chunks.destroy.push(b`if (detaching) ${html_tag}.d();`);
			}
		}
	}
}
