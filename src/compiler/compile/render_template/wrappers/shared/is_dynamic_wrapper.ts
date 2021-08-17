import AwaitBlock from "../AwaitBlock";
import EachBlock from "../EachBlock";
import IfBlock from "../IfBlock";
import InlineComponent from "../InlineComponent";
import RawMustacheTag from "../RawMustacheTag";
import Slot from "../Slot";
import SlotTemplate from "../SlotTemplate";
import Wrapper from "./Wrapper";

export default function is_dynamic_wrapper(wrapper: Wrapper) {
	if (wrapper) {
		if (
			wrapper instanceof AwaitBlock || 
			wrapper instanceof IfBlock || 
			wrapper instanceof EachBlock ||
			wrapper instanceof InlineComponent ||
			wrapper instanceof RawMustacheTag ||
			wrapper instanceof Slot ||
			wrapper instanceof SlotTemplate
		) {
			return true;
		}
	}

	return false;
}
