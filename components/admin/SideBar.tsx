"use client";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaCartPlus, FaFoursquare, FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaBox } from "react-icons/fa6";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

type Props = {
	fullName: string;
	userImg: string;
	link: string;
};

const SideBar = ({ fullName, userImg, link }: Props) => {
	const [isOpen, setIsOpen] = useState(true);

	const sideBarLinks = [
		{
			title: "Dashboard",
			link: "/admin/dashboard",
			icon: MdDashboard,
		},
		{
			title: "Add Products",
			link: "/admin/add-products",
			icon: FaCartPlus,
		},
		{
			title: "Add Exclusive Products",
			link: "/admin/add-exclusive",
			icon: FaCartPlus,
		},
		{
			title: "Users",
			link: "/admin/users",
			icon: FaUser,
		},
		{
			title: "Orders",
			link: "/admin/orders",
			icon: FaBox,
		},
	];
	return (
		<div>
			<button
				data-drawer-target="default-sidebar"
				data-drawer-toggle="default-sidebar"
				aria-controls="default-sidebar"
				type="button"
				onClick={() => setIsOpen(true)}
				className="inline-flex items-center fixed  p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
				<span className="sr-only">Open sidebar</span>
				<svg
					className="w-6 h-6"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg">
					<path
						clipRule="evenodd"
						fillRule="evenodd"
						d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
				</svg>
			</button>

			<aside
				id="default-sidebar"
				className={`fixed top-20 left-0 z-40 w-[100vw] md:w-[40vw] lg:w-[20vw] h-screen transition-transform  ${
					isOpen ? "-translate-x-0" : "-translate-x-full"
				}`}
				aria-label="Sidebar">
				<div className="h-full px-3 py-4 overflow-y-auto bg-indigo-500/10 shadow-lg shadow-gray-400 dark:bg-gray-800 relative backdrop-blur-md">
					<ul className="font-medium ">
						{sideBarLinks.map((links, i) => (
							<Link key={i} href={links.link} className="">
								<div
									className={`flex space-x-4 my-20 justify-start items-center hover:bg-indigo-200 p-4 rounded-lg transition-all duration-150 ease-in-out w-full  ${
										link === links.link
											? "bg-gradient-to-tr from-indigo-400 to-purple-400 text-white"
											: "text-slate-800"
									}`}>
									<links.icon className="w-7 h-7" />
									<h3>{links.title}</h3>
								</div>
							</Link>
						))}
						<Button
							className="w-[90%] bottom-[6rem] absolute right-[50%] left-[50%] translate-x-[-50%]"
							onClick={() => setIsOpen(false)}
							variant={"default"}>
							<div className="flex space-x-2 justify-center items-center">
								<h3>Close</h3>
								<IoClose className="w-5 h-5" />
							</div>
						</Button>
					</ul>
				</div>
			</aside>
		</div>
	);
};

export default SideBar;
