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
import DeleteButton from "./DeleteButton";
import Autoplay from "embla-carousel-autoplay";

type Props = {
	products: any;
};

const ProductCarousel = ({ products }: Props) => {
	const plugin = React.useRef(Autoplay({ delay: 2000 }));
	return (
		<Carousel
			plugins={[plugin.current]}
			orientation="horizontal"
			className="w-[300px]  sm:w-[400px]  md:w-[800px]  lg:w-[900px] h-full
					xl:w-[1200px] ">
			<CarouselContent>
				{products.map((_: any, i: number) => (
					<CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3 ">
						<div className="w-full" key={i}>
							<div className="h-full relative rounded-lg overflow-hidden bg-gradient-to-t from-transparent to-gray-300 p-5">
								<div className="relative w-60 h-60 flex justify-center items-center mx-auto aspect-square">
									<Image
										src={_.imgUrl}
										alt=""
										layout="fill"
										objectFit="contain"
									/>
								</div>
								{_.isFeatured && (
									<div className="absolute top-2 left-3">
										<Badge
											variant="default"
											className="bg-gradient-to-r from-indigo-500 to-purple-500 ">
											Featured
										</Badge>
									</div>
								)}
								<DeleteButton id={_.id} name={_.name} />
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
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="hidden lg:inline" />
			<CarouselNext className="hidden lg:inline" />
		</Carousel>
	);
};

export default ProductCarousel;
