"use client";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import React from "react";
import { RiMenu3Fill } from "react-icons/ri";
import Link from "next/link";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";

type Props = {
	navLinks:
		| {
				map(arg0: (navLink: any) => React.JSX.Element): React.ReactNode;
				title: string;
				link: string;
		  }
		| any;
	mongoUser: { isAdmin: boolean } | any;
};

const OpenTrigger = ({ navLinks, mongoUser }: Props) => {
	return (
		<div>
			<Sheet>
				<SheetTrigger>
					<RiMenu3Fill className="h-8 w-8 mt-2" />
				</SheetTrigger>
				<SheetContent className="fixed top-0">
					{navLinks.map((navLink: { title: string; link: string }) => (
						<a key={navLink.title} href={navLink.link}>
							<DropdownMenuLabel className="cursor-pointer">
								{navLink.title}
							</DropdownMenuLabel>
						</a>
					))}
					{mongoUser?.isAdmin && (
						<a href={"/admin"} className="">
							<DropdownMenuLabel className="cursor-pointer">
								Dashboard
							</DropdownMenuLabel>
						</a>
					)}
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default OpenTrigger;
