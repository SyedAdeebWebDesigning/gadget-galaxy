import Image from "next/legacy/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { fetchFeaturedProducts } from "@/lib/actions/product.actions";

type Props = {};

const CardBanner = async (props: Props) => {
	const featuredProducts = await fetchFeaturedProducts();
	return (
		<section className="container my-10 z-0 sticky top-0">
			<h1 className="text-center text-4xl py-10">Featured Products</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 place-items-center">
				{featuredProducts.slice(0, 4).map((featuredProduct: any, i: number) => {
					return (
						<div className="p-4  w-full group" key={i}>
							<div className="h-full relative rounded-lg overflow-hidden bg-gradient-to-t from-transparent to-gray-300 p-5">
								<div className="relative lg:w-80 lg:h-80 w-60 h-60 flex justify-center items-center mx-auto aspect-square">
									<Image
										src={featuredProduct.imgUrl}
										alt=""
										layout="fill"
										objectFit="contain"
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
											href={`/${featuredProduct.category.toLowerCase()}/${
												featuredProduct._id
											}`}
											className="title-font text-lg font-medium text-gray-500 mb-3">
											<Button variant={"secondary"}>View Product</Button>
										</Link>
									</div>
									<h1 className="title-font xl:absolute text-2xl font-medium text-gray-500 mb-3 xl:opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out top-0 xl:group-hover:top-20">
										₹
										{new Intl.NumberFormat("en-IN").format(
											featuredProduct.price
										)}
									</h1>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default CardBanner;
