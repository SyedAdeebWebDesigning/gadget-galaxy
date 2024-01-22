"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";

type Props = {
	featuredProduct: {
		imgUrl: string;
		isFeatured: boolean;
		_id: string;
		category: string;
		name: string;
		price: number;
	};
};

const Card = ({ featuredProduct }: Props) => {
	const router = useRouter();
	return (
		<div
			className="p-4 cursor-pointer w-full group"
			onClick={() => router.push(`/store/${featuredProduct._id}`)}>
			<div className="h-full relative rounded-lg overflow-hidden bg-gradient-to-t from-transparent to-gray-300 p-5">
				<div
					// href={`/store/${featuredProduct._id}`}
					className="relative lg:w-80 lg:h-80 w-60 h-60 flex justify-center items-center mx-auto aspect-square">
					<Image
						src={featuredProduct.imgUrl}
						alt=""
						layout="fill"
						objectFit="contain"
						className=""
					/>
				</div>
				{featuredProduct.isFeatured && (
					<div className="absolute top-2 left-3"></div>
				)}

				<div className="py-6 relative">
					<h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
						{featuredProduct.category}
					</h2>
					<div className="flex justify-between items-center  w-full">
						<h1 className="title-font text-lg font-medium text-gray-900 mb-3 truncate">
							{featuredProduct.name}
						</h1>
						<Link
							href={`/store/${featuredProduct._id}`}
							className="title-font text-lg font-medium text-gray-500 mb-3">
							<Button variant={"secondary"}>View Product</Button>
						</Link>
					</div>
					<h1 className="title-font xl:absolute text-2xl font-medium text-gray-500 mb-3 xl:opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out top-0 xl:group-hover:top-20">
						{new Intl.NumberFormat("en-IN", {
							style: "currency",
							currency: "INR",
						}).format(featuredProduct.price)}
					</h1>
				</div>
			</div>
		</div>
	);
};

export default Card;
