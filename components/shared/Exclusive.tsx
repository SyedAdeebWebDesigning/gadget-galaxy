import Image from "next/legacy/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { getProducts } from "@/lib/actions/exclusive.actions";

type Props = {};

const Exclusive = async (props: Props) => {
	const products: any = await getProducts();
	const product = products[products.length - 1];
	if (!product) return null;

	return (
		<div className=" z-20 flex flex-col items-center">
			<Link href={"/headphones"} className="relative" key={product._id}>
				<h3 className="text-gray-100 text-center text-4xl font-semibold pt-10 ">
					Exclusive Product
				</h3>
				<section className="text-gray-400 body-font">
					<div className="container mx-auto flex px-5 xl:py-24 items-center justify-center flex-col">
						<div className="flex flex-col lg:flex-row lg:space-x-40 justify-center items-center overflow-y-scroll">
							<div className="relative h-[300px] w-[300px] lg:w-[500px] lg:h-[500px] animate-pulse xl:w-[700px] xl:h-[600px] xl:my-10">
								<Image
									src={product?.imgUrl}
									alt=""
									layout="fill"
									objectFit="contain"
								/>
							</div>
							<div className=" text-center lg:text-left space-y-2">
								<p className="my-1 text-3xl">Get this product</p>
								<h3
									className="text-3xl lg:text-6xl text-center lg:text-left bg-gradient-to-r from-indigo-400
                            to-purple-500 text-clip text-transparent bg-clip-text">
									{product?.name}
								</h3>
								<div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start">
									<p className="my-2 text-xl lg:text-2xl xl:text-3xl">
										Exclusively on
									</p>
									<picture>
										<img src={"/logo-2.svg"} alt="" width={200} height={100} />
									</picture>
								</div>
								<h3 className="text-2xl">
									At just{" "}
									{`₹${new Intl.NumberFormat("en-IN").format(
										product?.price || 0
									)}`}
								</h3>
								<div className="flex space-x-3 justify-center lg:justify-start">
									<Button className="text-white mt-2">View Product</Button>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Link>
		</div>
	);
};

export default Exclusive;
