"use client";
import Image from "next/legacy/image";
import React from "react";
import { Button } from "@/components/ui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

type Props = {};

const Banner = (props: Props) => {
	const plugin = React.useRef(
		Autoplay({ delay: 4000, stopOnInteraction: false })
	);
	return (
		<section className="text-gray-200 body-font w-full min-h-[94vh] relative">
			<div className="absolute bgImg h-[94vh] top-20 left-[50%] -translate-x-[40%] -z-0 " />
			<div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col lg:flex-row blur-0 w-full">
				<div className="relative md:h-[800px] mt-[100px] flex items-center justify-center">
					<Carousel
						plugins={[plugin.current]}
						orientation="horizontal"
						className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px]
					lg:w-[700px] lg:h-[700px]">
						<CarouselContent>
							<CarouselItem>
								<div
									className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]
					lg:w-[600px] lg:h-[600px] object-contain md:mx-20 filter ">
									<Image src="/banner-1.webp" alt="" layout="fill" />
								</div>
							</CarouselItem>
							<CarouselItem>
								<div
									className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]
					lg:w-[600px] lg:h-[600px] object-contain md:mx-20 filter ">
									<Image src="/banner.png" alt="" layout="fill" />
								</div>
							</CarouselItem>
							<CarouselItem>
								<div
									className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]
					lg:w-[700px] lg:h-[650px] object-contain filter ">
									<Image src="/banner-1-fb.webp" alt="" layout="fill" />
								</div>
							</CarouselItem>
							<CarouselItem>
								<div
									className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]
					lg:w-[600px] lg:h-[600px] object-contain md:mx-20 filter ">
									<Image src="/banner-1-1.webp" alt="" layout="fill" />
								</div>
							</CarouselItem>
							<CarouselItem>
								<div
									className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]
					lg:w-[600px] lg:h-[600px] object-contain md:mx-20 filter ">
									<Image src="/banner-2-HD.png" alt="" layout="fill" />
								</div>
							</CarouselItem>
							<CarouselItem>
								<div
									className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]
					lg:w-[700px] lg:h-[650px] object-contain filter ">
									<Image src="/banner-2-2.webp" alt="" layout="fill" />
								</div>
							</CarouselItem>
						</CarouselContent>
					</Carousel>

					{/* <div className="absolute bg-gradient-to-b from-[#1b1b1b]/0 z-10 to-[#1b1b1b] w-full h-[50%] bottom-0" />
					<div className="absolute bg-gradient-to-l from-transparent z-10 to-[#1b1b1b] w-10 h-[100%] left-0" />
					<div className="absolute bg-gradient-to-r from-transparent z-10 to-[#1b1b1b] w-20  h-[100%] right-0" /> */}
				</div>
				<div className="text-center lg:text-left lg:w-2/3 w-full">
					<Image
						src="/oneplus-logo.webp"
						alt=""
						width={300}
						height={70}
						className="animate-pulse"
					/>
					<p className="mt-4 leading-relaxed text-gray-400 text-2xl">
						Never Settle
					</p>
					<h1 className="title-font lg:text-5xl text-3xl font-medium text-gray-100">
						One Plus Nord CE 3 Lite 5G
					</h1>
					<p className="mb-4 leading-relaxed text-gray-300 text-4xl">
						Starting at ₹19,999
					</p>
					<div className="flex lg:justify-start justify-center space-x-4">
						<Link href={"/mobiles/65a8a42692b38549cce8b1c9"}>
							<Button variant="default">View Product</Button>
						</Link>
						<Link href={"/store?page=1"}>
							<Button variant="default">View Store</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Banner;
