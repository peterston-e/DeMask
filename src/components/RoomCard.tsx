"use client";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export default function RoomCard() {
	return (
		<div className="container max-w-[450px] border rounded ">
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger>Is it accessible?</AccordionTrigger>
					<AccordionContent>Yes. It is.</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>Does it open?</AccordionTrigger>
					<AccordionContent>Yes. It does open.</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger>Will it blend?</AccordionTrigger>
					<AccordionContent>No. I wont blend.</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
