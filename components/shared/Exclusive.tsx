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
		<div>
			<Link href={"/headphones"} className="relative mt-10" key={product._id}>
				<div className="bg-gradient-to-br from-[#1b1b1b] to-[#282828] w-full h-full skew-y-0 absolute top-0 -z-20" />
				<h3 className="text-gray-100 text-center text-4xl font-semibold pt-10 ">
					Exclusive Product
				</h3>
				<section className="text-gray-400 body-font">
					<div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
						<div className="flex flex-col lg:flex-row lg:space-x-40 justify-center items-center">
							<div className="relative h-[300px] w-[300px] lg:w-[500px] lg:h-[500px] animate-pulse xl:w-[500px] xl:h-[500px] my-10">
								<Image src={product?.imgUrl} alt="" layout="fill" />
							</div>
							<div className="text-white text-center lg:text-left space-y-2">
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
									<Image src={"/logo-2.svg"} alt="" width={200} height={100} />
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
