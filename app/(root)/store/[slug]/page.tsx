import AddToCart from "@/components/buttons/AddToCart";
import ProductReview from "@/components/form/ProductReview";
import FeaturedProducts from "@/components/shared/FeaturedProducts";
import Star from "@/components/shared/Star";
import { Button } from "@/components/ui/button";
import { addProductsToCart } from "@/lib/actions/cart.actions";
import {
	fetchProductByID,
	fetchProductByCategory,
} from "@/lib/actions/product.actions";
import {
	countDocument,
	getReview,
	getUserReview,
	getAverageLikes,
} from "@/lib/actions/review.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/legacy/image";
import React from "react";
import { toast } from "react-toastify";

export default async function Page({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams: any;
}) {
	const pageNo = parseInt(searchParams.page);
	const id: string = params.slug;
	const user = await currentUser();
	if (!user) return null;
	const product: any = await fetchProductByID(id);
	const products = await fetchProductByCategory({
		category: product.category,
		id: id,
	});
	console.log(user.imageUrl);
	const fullName = `${user?.firstName} ${user?.lastName}`;

	const userReview = await getUserReview({ userId: user.id, productId: id });
	const averageLikes: number | any = await getAverageLikes(id);
	const count: number = await countDocument(id);
	const pageSize = 3;
	const totalPages = Math.ceil(count / pageSize);
	const maxPages = Math.min(totalPages, 2);
	const getReviews = await getReview({
		productId: id,
		pageNumber: pageNo,
		pageSize: pageSize,
	});
	const userId = user?.id;

	return (
		<section className="text-gray-600 body-font my-10">
			<div className=" mx-10 mt-24 space-y-10 flex flex-col">
				<div className="lg:w-4/5 mx-auto flex flex-col sm:flex-row h-full items-center">
					<div className="relative lg:w-1/2 w-full object-contain h-60 lg:h-[500px] object-center rounded flex items-center ">
						<Image
							src={product.imgUrl}
							alt=""
							layout="fill"
							objectFit="contain"
						/>
					</div>
					<div className="lg:w-1/2 w-full lg:mt-0 flex flex-col space-y-10">
						<div>
							<h2 className="text-sm title-font text-gray-500 tracking-widest">
								{product.category}
							</h2>
							<h1 className="text-gray-900 text-3xl title-font font-medium mb-0">
								{product.name}
							</h1>
							<div className="mb-6 mt-3 flex flex-col justify-center items-start">
								<div className="flex space-x-2 items-center">
									<Star stars={averageLikes} />
									<p className="mt-1">
										{averageLikes ? averageLikes : "0.0"} - Rating{" "}
									</p>
								</div>
								<p className="hidden sm:inline">({count} customer reviews)</p>
							</div>
							<p className="leading-relaxed text-xl">{product.desc}</p>
						</div>

						<div className="flex flex-col sm:flex-row items-center mt-full justify-end top-20 left-0 w-full">
							<span className="title-font font-medium text-2xl text-gray-900">
								{new Intl.NumberFormat("en-IN", {
									style: "currency",
									currency: "INR",
								}).format(product.price)}
							</span>
							<AddToCart userId={userId} product={product} />
						</div>
					</div>
				</div>
				<div className="mx-0 mt-20 flex flex-col justify-center items-center">
					{products.length > 0 && (
						<div>
							<h3 className="text-center text-3xl">Related Products</h3>
							<FeaturedProducts products={products} />
						</div>
					)}
				</div>
				<ProductReview
					productId={id}
					userId={user.id}
					fullName={fullName}
					imgUrl={user?.imageUrl}
					userReview={userReview}
					reviews={getReviews}
					maxPages={maxPages}
					pageNo={pageNo}
					pageSize={pageSize}
					totalPages={totalPages}
				/>
			</div>
		</section>
	);
}
