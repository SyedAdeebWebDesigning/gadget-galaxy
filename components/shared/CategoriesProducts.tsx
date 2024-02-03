import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	countCategoryDocument,
	fetchCategories,
} from "@/lib/actions/product.actions";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
	pageNo: number;
	category: string;
};

const CategoriesProducts = async ({ pageNo, category }: Props) => {
	const pageSize = 6;

	const products: any = await fetchCategories(pageNo, pageSize, category);
	const count: number = await countCategoryDocument(category);
	const totalPages = Math.ceil(count / pageSize);
	const maxPages = Math.min(totalPages, 3);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 place-items-center relative">
			{products.map((product: any, i: number) => {
				return (
					<div className="p-4  w-full group" key={i}>
						<div className="h-full relative rounded-lg overflow-hidden bg-gradient-to-t from-transparent to-gray-300 p-5">
							<div className="relative w-60 h-60 flex justify-center items-center mx-auto aspect-square">
								<Image
									src={product.imgUrl}
									alt=""
									layout="fill"
									objectFit="contain"
								/>
							</div>
							{product.isFeatured && (
								<div className="absolute top-2 left-3"></div>
							)}

							<div className="py-6 relative">
								<h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
									{product.category}
								</h2>
								<div className="flex justify-between items-center  w-full">
									<h1 className="title-font text-lg font-medium text-gray-900 mb-3 truncate">
										{product.name}
									</h1>
									<Link
										href={`/store/${product._id}?page=1`}
										className="title-font text-lg font-medium text-gray-500 mb-3">
										<Button variant={"secondary"}>View Product</Button>
									</Link>
								</div>
								<h1 className="title-font xl:absolute text-2xl font-medium text-gray-500 mb-3 xl:opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out top-0 xl:group-hover:top-20">
									{new Intl.NumberFormat("en-IN", {
										style: "currency",
										currency: "INR",
									}).format(product.price)}
								</h1>
							</div>
						</div>
					</div>
				);
			})}
			<Pagination className="absolute left-[50%] -bottom-10 right-[50%] -translate-x-[50%]">
				<PaginationContent className="mx-auto">
					{pageNo > 1 ? (
						<PaginationItem>
							<PaginationPrevious
								href={`/${category.toLowerCase()}?page=${pageNo - 1}`}
							/>
						</PaginationItem>
					) : (
						<Button disabled variant={"ghost"}>
							<PaginationPrevious href={``} className="cursor-not-allowed" />
						</Button>
					)}
					{Array.from({ length: maxPages }).map((_: any, i: number | any) => (
						<PaginationItem key={i}>
							<PaginationLink
								href={`/${category.toLowerCase()}?page=${i + 1}`}
								isActive={i + 1 === pageNo}>
								{i + 1}
							</PaginationLink>
						</PaginationItem>
					))}
					{pageNo <= maxPages && totalPages > maxPages && (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					)}
					{pageNo > maxPages && pageNo <= totalPages && (
						<>
							<PaginationItem>
								<PaginationLink
									href={`/${category.toLowerCase()}?page=${totalPages}`}
									isActive>
									{pageNo}
								</PaginationLink>
							</PaginationItem>
						</>
					)}
					<PaginationItem>
						{pageNo < totalPages ? (
							<PaginationNext
								href={`/${category.toLowerCase()}?page=${pageNo + 1}`}
							/>
						) : (
							<Button disabled variant={"ghost"}>
								<PaginationNext href={``} className="cursor-not-allowed" />
							</Button>
						)}
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
};

export default CategoriesProducts;
