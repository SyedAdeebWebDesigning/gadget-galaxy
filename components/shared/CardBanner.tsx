import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

type Props = {};

const CardBanner = (props: Props) => {
	const cardBanners = [
		{
			title: "Apple Watch Ultra",
			category: "Watches",
			link: "/watches",
			price: "₹79,999",
			picture: "/banner.webp",
			width: 350,
			height: 300,
		},
		{
			title: "iPhone 15",
			category: "Mobiles",
			link: "/mobile",
			price: "₹99,999",
			picture: "/iPhone.webp",
			width: 400,
			height: 300,
		},
		{
			title: "Apple iPad Air 2020",
			category: "Tabs",
			link: "/tabs",
			price: "₹89,999",
			picture: "/ipads.webp",
			width: 330,
			height: 300,
		},
		{
			title: "Apple MacBook Air M2",
			category: "Laptops",
			link: "/laptops",
			price: "₹1,09,999",
			picture: "/laptop.webp",
			width: 500,
			height: 300,
		},
	];
	return (
		<div className="container my-10">
			<h1 className="text-center text-4xl my-10">Featured Products</h1>
			<div className="grid grid-cols-1 xl:grid-cols-2 gap-y-10 place-items-center">
				{cardBanners.map((cardBanner, i) => (
					<div
						key={i}
						className="w-full h-[100%] max-w-xl border border-gray-200 rounded-xl
                shadow-xl shadow-slate-300 dark:bg-gray-800 dark:border-gray-700"
					>
						<Link
							href={cardBanner.link}
							className="flex items-center justify-center rounded-t-xl bg-gradient-to-t from-transparent to-slate-300"
						>
							<Image
								src={cardBanner.picture}
								alt=""
								width={cardBanner.width}
								height={cardBanner.height}
								className="p-10"
							/>
						</Link>
						<div className="px-5 pb-5 mt-10">
							<a href="#">
								<h5 className="text-lg mt-4 font-semibold tracking-tight text-gray-600 dark:text-white">
									{cardBanner.category}
								</h5>
							</a>
							<a href="#">
								<h5 className="text-3xl mb-4 font-semibold tracking-tight text-gray-900 dark:text-white">
									{cardBanner.title}
								</h5>
							</a>
							<div className="flex items-center justify-between">
								<span className="text-2xl font-bold text-gray-900 dark:text-white">
									{cardBanner.price}
								</span>
								<Button variant={"secondary"}>Buy Now</Button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default CardBanner;
