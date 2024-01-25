import FormPayment from "@/components/form/FormPayment";
import ToStore from "@/components/redirects/toStore";
import { Button } from "@/components/ui/button";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationLink,
	PaginationEllipsis,
	PaginationNext,
} from "@/components/ui/pagination";
import {
	calculateCartSubtotal,
	fetchCartId,
	fetchUserCart,
	fetchUserCartLength,
} from "@/lib/actions/cart.actions";
import { fetchUserById } from "@/lib/actions/users.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/legacy/image";
import React from "react";

export default async function PreviewPage({
	searchParams,
}: {
	searchParams: { page: number | any };
}) {
	const user: any = await currentUser();
	const userId: any = user?.id;
	const pageNo = parseInt(searchParams.page);
	const pageSize = 4;
	const cart: any = await fetchUserCart(userId, pageNo, pageSize);
	if (!cart) return <ToStore />;
	const countNumber: number | any = await fetchUserCartLength(user?.id);
	const count = countNumber.products.length;
	const totalPages = Math.ceil(parseInt(count) / pageSize);
	const maxPages = Math.min(totalPages, 3);
	const subTotal = await calculateCartSubtotal(user?.id);
	const userById: any = await fetchUserById(userId);
	const fullCart: any = await fetchCartId(user?.id);
	const cartId: any = JSON.parse(JSON.stringify(fullCart));
	if (!cartId) return null;
	return (
		<section className="flex w-full header-none md:w-[700px] lg:w-[800px] xl:w-[1200px] justify-center items-center flex-col lg:flex-row space-x-0 space-y-3 lg:space-y-0 lg:space-x-3 mx-auto">
			<div className="bg-slate-200/80 rounded-xl h-full w-full px-10 pb-20 pt-4 space-y-10">
				<h3 className="text-2xl underline font-semibold">Order Summary</h3>
				<div>
					<p className="text-xl text-gray-500">Pay</p>
					<h3 className="text-2xl">
						{new Intl.NumberFormat("en-IN", {
							style: "currency",
							currency: "INR",
						}).format(subTotal)}
					</h3>
				</div>

				<div className="space-y-5 text-sm p-2">
					{cart?.paginatedCart?.map((cart: any, i: number) => (
						<div key={cart._id} className="p-2 flex justify-start space-x-2">
							<div className="relative h-20 w-20">
								<Image
									src={cart?.imgUrl}
									layout="fill"
									alt=""
									objectFit="contain"
								/>
							</div>
							<div className="flex flex-col justify-center w-full">
								<div className="flex justify-between items-center">
									<h3 className="text-xl line-clamp-1">{cart.name}</h3>
									<p className="text-gray-600">
										{new Intl.NumberFormat("en-IN", {
											style: "currency",
											currency: "INR",
										}).format(cart.price * cart.qty)}
									</p>
								</div>
								<div>
									<p className="text-gray-500">Qty {cart.qty}</p>
								</div>
							</div>
						</div>
					))}
					<div className="relative">
						<Pagination className="absolute left-[50%] -bottom-10 right-[50%] -translate-x-[50%]">
							<PaginationContent className="mx-auto">
								{pageNo > 1 ? (
									<PaginationItem>
										<PaginationPrevious
											href={`/checkout/?page=${pageNo - 1}`}
										/>
									</PaginationItem>
								) : (
									<Button disabled variant={"ghost"}>
										<PaginationPrevious
											href={``}
											className="cursor-not-allowed"
										/>
									</Button>
								)}
								{Array.from({ length: maxPages }).map(
									(_: any, i: number | any) => (
										<PaginationItem key={i}>
											<PaginationLink
												href={`/checkout/?page=${i + 1}`}
												isActive={i + 1 === pageNo}>
												{i + 1}
											</PaginationLink>
										</PaginationItem>
									)
								)}
								{pageNo <= maxPages && totalPages > maxPages && (
									<PaginationItem>
										<PaginationEllipsis />
									</PaginationItem>
								)}
								{pageNo > maxPages && pageNo <= totalPages && (
									<>
										<PaginationItem>
											<PaginationLink
												href={`/checkout/?page=${totalPages}`}
												isActive>
												{pageNo}
											</PaginationLink>
										</PaginationItem>
									</>
								)}
								<PaginationItem>
									{pageNo < totalPages ? (
										<PaginationNext href={`/checkout/?page=${pageNo + 1}`} />
									) : (
										<Button disabled variant={"ghost"}>
											<PaginationNext
												href={``}
												className="cursor-not-allowed"
											/>
										</Button>
									)}
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</div>
				</div>
			</div>
			<div className="bg-slate-100 h-full w-full px-10 py-20 space-y-10">
				<FormPayment userById={userById} subTotal={subTotal} cartId={cartId} />
			</div>
		</section>
	);
}
