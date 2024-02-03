import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import {
	SignInButton,
	SignedIn,
	SignedOut,
	SignOutButton,
} from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import { MdLogin } from "react-icons/md";
import { IoBagHandleSharp } from "react-icons/io5";
import { Button } from "../ui/button";
import { fetchUserById } from "@/lib/actions/users.actions";
import ToUser from "../redirects/toUser";
import { fetchUserCartLength } from "@/lib/actions/cart.actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import OpenTrigger from "./OpenTrigger";

const NavBar = async () => {
	const navLinks = [
		{
			title: "Store",
			link: "/store?page=1",
		},
		{
			title: "Mobiles",
			link: "/mobiles?page=1",
		},
		{
			title: "Tabs",
			link: "/tabs?page=1",
		},
		{
			title: "Laptops",
			link: "/laptops?page=1",
		},
		{
			title: "Watches",
			link: "/watches?page=1",
		},
		{
			title: "Headphones",
			link: "/headphones?page=1",
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

	const user = await currentUser();
	if (!user || user === null) return null;
	const userId: string | any = `${user?.id}`;
	const mongoUser: any = await fetchUserById(userId);
	if (!mongoUser) <ToUser />;

	const cart: any = await fetchUserCartLength(userId);

	const cartLength = cart?.products?.length;

	return (
		<header className="text-gray-100 body-font bg-[#000000]  backdrop-blur-2xl sticky h-20 top-0 bottom-0 w-full z-30">
			<div className="px-10 mx-auto flex py-5 flex-row items-center justify-between">
				<Link href="/" className="hidden sm:flex object-cover h-10">
					<Image
						alt="logo"
						width={250}
						height={100}
						src="/logo-2.svg"
						objectFit="contain"
						priority
					/>
				</Link>
				<Link href="/" className="sm:hidden h-10">
					<Image
						alt="logo"
						width={100}
						height={40}
						src="/ls.svg"
						objectFit="contain"
						priority
					/>
				</Link>
				<nav className="-ml-10 hidden 2xl:flex">
					{navLinks.map((navLink) => (
						<Link key={navLink.title} href={navLink.link} className="navLinks">
							{navLink.title}
						</Link>
					))}
					{mongoUser?.isAdmin && (
						<Link href={"/admin"} className="navLinks">
							Dashboard
						</Link>
					)}
				</nav>
				<nav className="relative flex items-center justify-center space-x-4">
					<SignedIn>
						<Sheet>
							<SheetTrigger>
								<Avatar className="cursor-pointer rounded-full focus:outline-none focus:select-none ">
									<AvatarImage
										src={user?.imageUrl}
										alt="@user"
										className="object-cover rounded-full"
									/>
									<AvatarFallback>
										{user.firstName !== null && user?.firstName[0]}
										{user.lastName !== null && user?.lastName[0]}
									</AvatarFallback>
								</Avatar>
							</SheetTrigger>
							<SheetContent className="fixed right-0 top-2 h-40">
								<div className="py-2 px-5">
									<a href={"/onboarding"}>
										<Button variant={"link"}>Manage your account</Button>
									</a>
									<hr />
									<SignOutButton>
										<Button variant={"linkDestructive"}>Logout</Button>
									</SignOutButton>
								</div>
							</SheetContent>
						</Sheet>
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
						<OpenTrigger navLinks={navLinks} mongoUser={mongoUser} />
					</div>
				</nav>
			</div>
		</header>
	);
};

export default NavBar;
