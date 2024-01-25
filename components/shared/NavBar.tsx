import Image from "next/legacy/image";
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
import { fetchUserById } from "@/lib/actions/users.actions";
import ToUser from "../redirects/toUser";
import { fetchUserCartLength } from "@/lib/actions/cart.actions";

const NavBar = async () => {
	const navLinks = [
		{
			title: "Store",
			link: "/store?page=1",
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
			title: "Order",
			link: "/order",
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

	const user: any = await currentUser();
	if (!user) return null;
	const userId: string | any = `${user?.id}`;
	const mongoUser: any = await fetchUserById(userId);
	if (!mongoUser) <ToUser />;

	const cart: any = await fetchUserCartLength(userId);

	const cartLength = cart?.products?.length;

	return (
		<header className="text-gray-100 body-font bg-[#000000]  backdrop-blur-2xl sticky h-20 top-0 bottom-0 w-full z-30">
			<div className="px-10 mx-auto flex py-5 flex-row items-center justify-between">
				<a href="/" className="hidden sm:flex object-cover h-10">
					<Image
						alt="logo"
						width={250}
						height={100}
						src="/logo-2.svg"
						objectFit="contain"
						priority
					/>
				</a>
				<a href="/" className="sm:hidden h-10">
					<Image
						alt="logo"
						width={100}
						height={40}
						src="/ls.svg"
						objectFit="contain"
						priority
					/>
				</a>
				<nav className="-ml-10 hidden 2xl:flex">
					{navLinks.map((navLink) => (
						<a key={navLink.title} href={navLink.link} className="navLinks">
							{navLink.title}
						</a>
					))}
					{mongoUser?.isAdmin && (
						<Link href={"/admin"} className="navLinks">
							Dashboard
						</Link>
					)}
				</nav>
				<nav className="flex items-center justify-center space-x-4">
					<SignedIn>
						<div
							className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full
                         h-10 w-10 flex justify-center items-center hover:animate-pulse cursor-pointer">
							<UserButton />
						</div>
					</SignedIn>
					<SignedOut>
						<SignInButton>
							<div className="flex px-3 rounded-xl cursor-pointer justify-center items-center">
								<Button
									variant={"link"}
									className="text-light-2 max-lg:hidden gap-4 p-4 text-xl">
									<MdLogin className="w-5 h-5" />
									Login
								</Button>
							</div>
						</SignInButton>
					</SignedOut>
					<Link
						href={!cartLength ? "/store" : "/cart?page=1"}
						className={`bg-gradient-to-r from-indigo-500 to-purple-500  px-1 h-11 ${
							!cartLength ? "blur-0 w-11" : "backdrop-blur-sm w-[84px]"
						}
                     rounded-full flex items-center justify-start cursor-pointer hover:animate-pulse relative transition-all duration-200 ease-out`}>
						<IoBagHandleSharp className="w-9 h-9 p-1 rounded-full bg-black text-clip" />

						<div
							className={`absolute bg-white border-4 rounded-full w-9 h-9 p-3 flex transition-all duration-200 items-center justify-center ${
								!cartLength
									? "top-[50%] bottom-[50%] -translate-y-[50%] right-[50%] left-[50%] -translate-x-[50%] bg-white invisible"
									: "top-[50%] right-1 bottom-[50%] -translate-y-[50%] visible "
							}`}>
							<p className="text-black font-semibold">
								{cartLength > 0 && cartLength}
							</p>
						</div>
					</Link>
					<div className="2xl:hidden">
						<DropdownMenu>
							<DropdownMenuTrigger>
								<RiMenu3Fill className="h-8 w-8 mt-2" />
							</DropdownMenuTrigger>
							<DropdownMenuContent className="">
								{navLinks.map((navLink) => (
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
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</nav>
			</div>
		</header>
	);
};

export default NavBar;
