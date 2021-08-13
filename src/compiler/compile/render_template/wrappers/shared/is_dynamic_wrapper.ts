import EachBlock from "../EachBlock";
import IfBlock from "../IfBlock";
import InlineComponent from "../InlineComponent";
import Slot from "../Slot";
import SlotTemplate from "../SlotTemplate";
import Wrapper from "./Wrapper";

export default function is_dynamic_wrapper(wrapper: Wrapper) {
	if (wrapper) {
		if (
			wrapper instanceof IfBlock || 
			wrapper instanceof EachBlock ||
			wrapper instanceof InlineComponent ||
			wrapper instanceof Slot ||
			wrapper instanceof SlotTemplate
		) {
			return true;
		}
	}

	return false;
}
