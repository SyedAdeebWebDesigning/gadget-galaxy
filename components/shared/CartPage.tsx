import React from "react";
import { Button } from "../ui/button";
import Image from "next/legacy/image";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationLink,
	PaginationEllipsis,
	PaginationNext,
} from "../ui/pagination";
import CartActions from "./CartActions";
import Link from "next/link";
import Checkout from "../buttons/Checkout";

type Props = {
	cart: any;
	pageNo: number;
	maxPages: number;
	totalPages: number;
	subTotal: number;
	userId: string;
};

const CartPage = ({
	cart,
	pageNo,
	maxPages,
	totalPages,
	subTotal,
	userId,
}: Props) => {
	const tax = subTotal >= 100000 ? 1000 : 0;
	return (
		<div className="bg-gray-100 md:h-[50vh]">
			<div className="mx-auto max-w-5xl justify-center p-6 md:flex md:space-x-6 xl:px-0">
				<div className="flex flex-col w-full">
					{cart?.paginatedCart.length === 0 && (
						<div className="flex flex-col text-center justify-center items-center space-y-3">
							<h3>No Items in the cart</h3>
							<Link
								href={"/store?page=1"}
								className="w-1/2 flex text-white bg-slate-800 py-2 rounded-xl">
								<p className="text-center w-full">Add products</p>
							</Link>
						</div>
					)}
					{cart?.paginatedCart?.map((_: any, i: number) => (
						<div className="rounded-lg md:w-full" key={i}>
							<div className="justify-between mb-6 rounded-lg bg-white py-6 shadow-md sm:flex sm:justify-start">
								<div className="relative sm:h-[120px] sm:w-[220px] w-[280px] h-[220px] mx-auto">
									<Image
										src={_.imgUrl}
										alt="product-image"
										layout="fill"
										className="w-full rounded-lg sm:w-40"
										objectFit="contain"
									/>
								</div>
								<div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
									<div className="mt-5 sm:mt-0">
										<h2 className="text-lg font-bold text-gray-900">
											{_.name}
										</h2>
										<p className="line-clamp-3">{_.desc}</p>
									</div>
									<div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
										<div className="flex flex-col space-y-2 justify-center items-center">
											<CartActions
												qty={_.qty}
												userId={userId}
												productId={_.productId}
											/>
											<div className="flex items-center space-x-4 px-4">
												<p className="text-sm font-semibold">
													{new Intl.NumberFormat("en-IN", {
														style: "currency",
														currency: "INR",
													}).format(_.price * _.qty)}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				<Checkout cart={cart} subTotal={subTotal} />
			</div>
			<div className="relative">
				<Pagination className="absolute left-[50%] -bottom-10 right-[50%] -translate-x-[50%]">
					<PaginationContent className="mx-auto">
						{pageNo > 1 ? (
							<PaginationItem>
								<PaginationPrevious href={`/cart/?page=${pageNo - 1}`} />
							</PaginationItem>
						) : (
							<Button disabled variant={"ghost"}>
								<PaginationPrevious href={``} className="cursor-not-allowed" />
							</Button>
						)}
						{Array.from({ length: maxPages }).map((_: any, i: number | any) => (
							<PaginationItem key={i}>
								<PaginationLink
									href={`/cart/?page=${i + 1}`}
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
									<PaginationLink href={`/cart/?page=${totalPages}`} isActive>
										{pageNo}
									</PaginationLink>
								</PaginationItem>
							</>
						)}
						<PaginationItem>
							{pageNo < totalPages ? (
								<PaginationNext href={`/cart/?page=${pageNo + 1}`} />
							) : (
								<Button disabled variant={"ghost"}>
									<PaginationNext href={``} className="cursor-not-allowed" />
								</Button>
							)}
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	);
};

export default CartPage;
