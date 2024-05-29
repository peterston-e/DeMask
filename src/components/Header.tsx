"use client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CommandDemo } from "./Command";
import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";
import { read } from "fs";
import { useState } from "react";

export default function Header() {
	const [notifications, setNotifications] = useState<any>([
		{
			text: "This is a notification",
			date: "02-01-2015",
			read: true,
		},
		{
			text: "Check your email",
			date: "02-01-2016",
			read: false,
		},
		{
			text: "Call Mum",
			date: "02-01-2016",
			read: false,
		},
	]);
	return (
		<div className="grid grid-cols-2 gap-4 border-b p-4">
			<CommandDemo />
			<div className="flex items-center justify-end">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button className="relative" variant="outline" size="icon">
							<div
								className={` absolute -top-[5px] -right-[5px] h-3 w-3 rounded-full my-1 ${
									notifications.find((x: any) => x.read === true)
										? "bg-red-500"
										: "bg-neutral-200"
								}`}
							></div>
							<BellIcon className=" h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{notifications.map((item: any, key: number) => (
							<DropdownMenuItem
								key={key}
								className="py-2 px-3 cursor-pointer hover:bg-neutral-50 transition flex items-start gap-2"
							>
								<div
									className={`h-3 w-3 rounded-full my-1 ${
										!item.read ? "bg-red-500" : "bg-neutral-200"
									}`}
								></div>
								<div>
									<p>{item.text}</p>
									<p className="text-xs text-neutral-500">{item.date}</p>
								</div>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
