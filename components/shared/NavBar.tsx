import Image from "next/image";
import Link from "next/link";
import React from "react";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import { MdLogin } from "react-icons/md";
import { RiMenu3Fill } from "react-icons/ri";
import { IoBagHandleSharp } from "react-icons/io5";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

const NavBar = async () => {
	const navLinks = [
		{
			title: "Store",
			link: "/store",
		},
		{
			title: "Mobiles",
			link: "/mobiles",
		},
		{
			title: "Tabs",
			link: "/tabs",
		},
		{
			title: "Laptops",
			link: "/laptops",
		},
		{
			title: "Watches",
			link: "/watches",
		},
		{
			title: "Headphones",
			link: "/headphones",
		},
		{
			title: "Adeflix",
			link: "/#adeflix",
		},
		{
			title: "About",
			link: "/about",
		},
	];

	let isAdmin: boolean = true;
	const user = await currentUser();
	const userId: string | any = `${user?.id}`;
	if (userId !== "user_2ajlzuzJWEBUKx2TBZOBfIVy95J") {
		isAdmin = false;
	}

	return (
		<header className="text-gray-100 body-font bg-[#1b1b1b]/90 backdrop-blur-xl sticky top-0 bottom-0 w-full z-50">
			<div className="px-10 mx-auto flex py-5 flex-row items-center justify-between">
				<Link href="/" className="hidden sm:flex">
					<Image
						alt="logo"
						width={250}
						height={100}
						src="/logo-2.svg"
						priority
					/>
				</Link>
				<Link href="/" className="sm:hidden object-cover">
					<Image
						alt="logo"
						width={250}
						height={250}
						src="/logoSmall.svg"
						priority
					/>
				</Link>
				<nav className="-ml-10 hidden xl:flex">
					{navLinks.map((navLink) => (
						<Link key={navLink.title} href={navLink.link} className="navLinks">
							{navLink.title}
						</Link>
					))}
					{isAdmin && (
						<Link href={"/admin"} className="navLinks">
							Dashboard
						</Link>
					)}
				</nav>
				<nav className="flex items-center justify-center space-x-4">
					<SignedIn>
						<div
							className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full
                         h-10 w-10 flex justify-center items-center hover:animate-pulse cursor-pointer"
						>
							<UserButton />
						</div>
					</SignedIn>
					<SignedOut>
						<SignInButton>
							<div className="flex px-3 rounded-xl cursor-pointer justify-center items-center">
								<Button
									variant={"link"}
									className="text-light-2 max-lg:hidden gap-4 p-4 text-xl"
								>
									<MdLogin className="w-5 h-5" />
									Login
								</Button>
							</div>
						</SignInButton>
					</SignedOut>
					<div
						className=" bg-gradient-to-r from-indigo-500 to-purple-500 w-11 h-11
                     rounded-full flex items-center justify-center cursor-pointer hover:animate-pulse"
					>
						<IoBagHandleSharp className="w-9 h-9 p-1 rounded-full bg-black text-clip" />
					</div>
					<div className="xl:hidden">
						<DropdownMenu>
							<DropdownMenuTrigger>
								<RiMenu3Fill className="h-8 w-8 mt-2" />
							</DropdownMenuTrigger>
							<DropdownMenuContent className="">
								{navLinks.map((navLink) => (
									<Link key={navLink.title} href={navLink.link}>
										<DropdownMenuLabel className="cursor-pointer">
											{navLink.title}
										</DropdownMenuLabel>
									</Link>
								))}
								{isAdmin && (
									<Link href={"/admin"} className="">
										<DropdownMenuLabel className="cursor-pointer">
											Dashboard
										</DropdownMenuLabel>
									</Link>
								)}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</nav>
			</div>
		</header>
	);
};

export default NavBar;
