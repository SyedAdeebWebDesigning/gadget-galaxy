import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import {
	SignedIn,
	SignedOut,
	SignOutButton,
	SignInButton,
	SignUpButton,
} from "@clerk/nextjs";
type Props = {};

const Footer = (props: Props) => {
	const footerLinks = [
		{
			category: "Store",
			links: [
				{
					title: "Mobiles",
					links: "/mobiles",
				},
				{
					title: "Tabs",
					links: "/tabs",
				},
				{
					title: "Laptops",
					links: "/laptop",
				},
				{
					title: "Watches",
					links: "/watches",
				},
				{
					title: "Headphones",
					links: "/headphones",
				},
			],
		},
		{
			category: "About",
			links: [
				{
					title: "About Gadget Galaxy",
					links: "/about",
				},
				{
					title: "Portfolio",
					links: "https://s-adeeb.vercel.app/",
				},
			],
		},
		{
			category: "Adeflix",
			links: [
				{
					title: "Visit the site",
					links: "https://adeflix-olive.vercel.app/",
				},
			],
		},
	];

	return (
		<footer className="text-gray-600 body-font">
			<div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
				<div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left flex flex-col justify-start items-start space-y-3">
					<div className="relative h-10 w-60">
						<Image src={"/logo.svg"} alt="" layout="fill" />
					</div>
					<h3 className="text-sm text-gray-600">
						Discover the future at GadgetGalaxy - your go-to for mobiles, tabs,
						laptops, watches, headphones, and exclusive OTT content on Adeflix.
						Elevate your tech game with us!
					</h3>
				</div>
				<div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
					{footerLinks.map((link, i) => (
						<div className="lg:w-1/4 md:w-1/2 w-full px-4" key={i}>
							<h2 className="title-font font-medium text-gray-900 tracking-widest text-lg mb-3">
								{link.category}
							</h2>
							<nav className="list-none mb-10">
								{link.links.map((navLink, i) => (
									<Link
										className="text-gray-500 hover:text-gray-800 transition-all duration-150 ease-in-out"
										key={i}
										href={navLink.links}
									>
										<h3>{navLink.title}</h3>
									</Link>
								))}
							</nav>
						</div>
					))}
					<div className="lg:w-1/4 md:w-1/2 w-full px-4">
						<h2 className="title-font font-medium text-gray-900 tracking-widest text-lg mb-3">
							Manage Account
						</h2>
						<nav className="list-none mb-10">
							<SignedIn>
								<Link
									href={"/orders"}
									className="cursor-pointer text-gray-500 hover:text-gray-900 transition-all duration-150 ease-in-out"
								>
									<h3 className="">View Orders</h3>
								</Link>
								<Link
									href={"/userProfile"}
									className="cursor-pointer text-gray-500 hover:text-gray-900 transition-all duration-150 ease-in-out"
								>
									<h3 className="">Manage your account</h3>
								</Link>
								<li className="cursor-pointer text-gray-500 hover:text-gray-900 transition-all duration-150 ease-in-out">
									<SignOutButton>Logout</SignOutButton>
								</li>
							</SignedIn>
							<SignedOut>
								<li className="cursor-pointer text-gray-500 hover:text-gray-900 transition-all duration-150 ease-in-out">
									<a className="">
										<SignInButton>Sign-In</SignInButton>
									</a>
								</li>
								<li className="cursor-pointer text-gray-500 hover:text-gray-900 transition-all duration-150 ease-in-out">
									<a className="">
										<SignUpButton>Sign-Up</SignUpButton>
									</a>
								</li>
							</SignedOut>
						</nav>
					</div>
				</div>
			</div>
			<div className="bg-gray-200">
				<div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
					<p className="text-gray-500 text-sm text-center sm:text-left">
						© 2024 Gadget Galaxy E-Commerce - All Rights Reserved
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
