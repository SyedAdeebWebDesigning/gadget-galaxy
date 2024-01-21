"use client";
import React from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../ui/carousel";
import Image from "next/legacy/image";
import { Badge } from "../ui/badge";
import DeleteButton from "../admin/DeleteButton";
import Autoplay from "embla-carousel-autoplay";
import { fetchProducts } from "@/lib/actions/product.actions";
import Link from "next/link";

type Props = {
	products: any;
};

const FeaturedProducts = ({ products }: Props) => {
	return (
		<Carousel
			orientation="horizontal"
			className="w-[300px]  md:w-[600px]  lg:w-[800px] h-full
					xl:w-[1000px] my-10">
			<CarouselContent>
				{products.map((_: any, i: number) => (
					<CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3 ">
						<Link href={`/store/${_._id}`} className="w-full" key={i}>
							<div className="h-full relative rounded-lg overflow-hidden bg-gradient-to-t from-transparent to-gray-300 p-5">
								<div className="relative w-60 h-60 flex justify-center items-center mx-auto aspect-square">
									<Image
										src={_.imgUrl}
										alt=""
										layout="fill"
										objectFit="contain"
									/>
								</div>
								<div className="py-6">
									<h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
										{_.category}
									</h2>
									<div className="flex justify-between  w-full">
										<h1 className="title-font text-lg font-medium text-gray-900 mb-3 truncate">
											{_.name}
										</h1>
										<h1 className="title-font text-lg font-medium text-gray-500 mb-3">
											₹{new Intl.NumberFormat("en-IN").format(_.price)}
										</h1>
									</div>
								</div>
							</div>
						</Link>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="hidden lg:inline" />
			<CarouselNext className="hidden lg:inline" />
		</Carousel>
	);
};

export default FeaturedProducts;
