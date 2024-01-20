import DeleteButton from "@/components/admin/DeleteButton";
import FeaturedProducts from "@/components/shared/FeaturedProducts";
import { Button } from "@/components/ui/button";
import {
	fetchProductByID,
	fetchProducts,
	fetchProductByCategory,
} from "@/lib/actions/product.actions";
import Image from "next/legacy/image";
import React from "react";

export default async function Page({ params }: { params: { slug: string } }) {
	const id: string = params.slug;
	const product: any = await fetchProductByID(id);
	const products = await fetchProductByCategory({
		category: product.category,
		id: id,
	});
	return (
		<section className="text-gray-600 body-font my-10">
			<div className=" mx-10 py-24">
				<div className="lg:w-4/5 mx-auto flex flex-col sm:flex-row h-full items-center">
					<div className="relative lg:w-1/2 w-full object-contain h-60 lg:h-[500px] object-center rounded flex items-center ">
						<Image
							src={product.imgUrl}
							alt=""
							layout="fill"
							objectFit="contain"
						/>
					</div>
					<div className="lg:w-1/2 w-full lg:mt-0 flex flex-col h-60 space-y-10">
						<div>
							<h2 className="text-sm title-font text-gray-500 tracking-widest">
								{product.category}
							</h2>
							<h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
								{product.name}
							</h1>
							<p className="leading-relaxed text-xl">{product.desc}</p>
						</div>

						<div className="flex items-center mt-full justify-end top-20 left-0 w-full">
							<span className="title-font font-medium text-2xl text-gray-900">
								₹{new Intl.NumberFormat("en-IN").format(product.price)}
							</span>
							<Button
								className="flex ml-auto text-white border-0 py-2 px-6 focus:outline-none rounded"
								variant={"default"}>
								Add to cart
							</Button>
						</div>
					</div>
				</div>
				<div className="mx-40 my-20 flex flex-col justify-center items-center">
					{products.length > 0 && (
						<div>
							<h3 className="text-center text-3xl">Related Products</h3>
							<FeaturedProducts products={products} />
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
function Autoplay(arg0: { delay: number }): any {
	throw new Error("Function not implemented.");
}
