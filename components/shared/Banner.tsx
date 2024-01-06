import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";

type Props = {};

const Banner = (props: Props) => {
	return (
		<section className="text-gray-200 body-font w-full min-h-[100vh]">
			<div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col lg:flex-row">
				<div className="relative md:h-[800px] h-[500px] flex items-center justify-center">
					<div
						className="relative w-[300px] h-[300px] sm:w-[300px] sm:h-[300px] md:w-[500px] md:h-[500px]
					lg:w-[600px] lg:h-[600px] object-contain md:mx-20 filter"
					>
						<Image src="/banner-1.webp" alt="" layout="fill" />
					</div>
					<div className="absolute bg-gradient-to-b from-[#1b1b1b]/0 z-10 to-[#1b1b1b] w-full h-[50%] bottom-0" />
				</div>
				<div className="text-center lg:text-left lg:w-2/3 w-full">
					<p className="mt-4 leading-relaxed text-white text-2xl">
						Never Settle
					</p>
					<h1 className="title-font lg:text-5xl text-3xl font-medium text-gray-300">
						One Plus Nord CE 3 Lite 5G
					</h1>
					<p className="mb-4 leading-relaxed text-white text-4xl">
						Starting at ₹29,999
					</p>
					<div className="flex lg:justify-start justify-center space-x-4">
						<Button variant="default">View Product</Button>
						<Button variant="default">View Store</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Banner;
