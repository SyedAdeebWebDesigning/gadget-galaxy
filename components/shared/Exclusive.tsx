import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

type Props = {};

const Exclusive = (props: Props) => {
	return (
		<div className="relative mt-40">
			<div className="bg-gradient-to-br from-[#1b1b1b] to-[#282828] w-full h-full skew-y-6 absolute top-0 -z-20" />
			<h3 className="text-gray-100 text-center text-4xl font-semibold pt-10 ">
				Exclusive Product
			</h3>
			<section className="text-gray-400 body-font">
				<div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
					<div className="flex flex-col lg:flex-row lg:space-x-40 justify-center items-center">
						<div className="relative h-[300px] w-[300px] lg:w-[500px] lg:h-[500px] animate-pulse xl:w-[500px] xl:h-[600px] my-10">
							<Image src={"/hdj.webp"} alt="" layout="fill" />
						</div>
						<div className="text-white text-center lg:text-left space-y-2">
							<p className="my-1 text-3xl">Get this product</p>
							<h3
								className="text-3xl lg:text-6xl text-center lg:text-left bg-gradient-to-r from-indigo-400
                            to-purple-500 text-clip text-transparent bg-clip-text"
							>
								HDJ-1500-N
							</h3>
							<div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start">
								<p className="my-2 text-xl lg:text-2xl xl:text-3xl">
									Exclusively on
								</p>
								<Image src={"/logo-2.svg"} alt="" width={200} height={100} />
							</div>
							<h3 className="text-2xl">At just ₹5,999</h3>
							<div className="flex space-x-3 justify-center lg:justify-start">
								<Button className="text-white mt-2">View Product</Button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Exclusive;
