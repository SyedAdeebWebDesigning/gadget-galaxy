import { Progress } from "@/components/shared/Progress";
import { fetchOrderById } from "@/lib/actions/orders.actions";
import Image from "next/legacy/image";
import React from "react";

type Props = {
	params: { slug: string };
};

const page = async ({ params }: Props) => {
	const { slug } = params;
	const orderId: string | any = slug.slice(0, slug.length - 3); // For some weird cases the slug also adds '%7D' in the last characters of url
	const order: any = await fetchOrderById(orderId);
	const tax = 10;
	if (!order)
		return (
			<h1 className="text-center my-20 text-3xl">{"Order didn't found"}</h1>
		);

	return (
		<main className="bg-slate-100">
			<section className="text-gray-600 body-font overflow-hidden">
				<div className="container px-5 py-24 mx-auto w-full">
					<h1 className="uppercase text-gray-900 text-3xl title-font font-medium mt-4">
						Order Confirmed
					</h1>
					<h2 className="text-sm title-font text-gray-500 tracking-widest">
						<span className="uppercase">Order ID: </span>
						<span className="cursor-pointer hover:text-indigo-600 text-purple-500 transition-all duration-200 ease-in-out underline">
							{order._id}
						</span>
					</h2>
					<div className="xl:w-full mx-auto flex justify-between">
						<div className="w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
							<div className="flex w-full justify-between flex-col lg:flex-row">
								<div className="space-y-2 w-full overflow-y-scroll h-[220px] scrollbar-hide scrollbar-thin scrollbar-thumb-slate-300 pr-2 scrollbar-track-gray-100">
									{order.cart.map(
										(
											cart: {
												productId: string;
												name: string;
												imgUrl: string;
												qty: number;
												price: number;
											},
											i: number
										) => (
											<div
												className="flex border-t border-gray-200 bg-gray-200 p-4 items-center rounded-lg"
												key={i}>
												<div className="flex items-center">
													<Image
														src={cart.imgUrl}
														width={70}
														height={70}
														alt=""
														objectFit="contain"
													/>
													<div className="flex flex-col">
														<span className="text-gray-500 line-clamp-1">
															{cart.name}
														</span>
														<span className="text-gray-500">
															Qty: {cart.qty}
														</span>
													</div>
												</div>
												<span className="ml-auto text-gray-900">
													{new Intl.NumberFormat("en-IN", {
														style: "currency",
														currency: "INR",
													}).format(cart.price)}
												</span>
											</div>
										)
									)}
								</div>
								<div className="w-full justify-end">
									<div className="flex my-5 items-center justify-between w-full">
										<h3 className="">SubTotal:</h3>
										<span className="title-font font-medium text-2xl text-gray-900">
											<p className="text-sm font-medium">
												{new Intl.NumberFormat("en-IN", {
													style: "currency",
													currency: "INR",
												}).format(order.totalAmount)}
											</p>
										</span>
									</div>
									<hr />
									<div className="flex my-5 items-center justify-between w-full">
										<h3 className="">Tax:</h3>
										<span className="title-font font-medium text-2xl text-gray-900">
											<p className="text-sm">{tax}%</p>
										</span>
									</div>
									<hr />
									<div className="flex my-5 items-center justify-between w-full text-[20px]">
										<h3 className="">Total:</h3>
										<span className="title-font font-medium text-2xl text-gray-900">
											<p className="text-[20px] font-bold ">
												{new Intl.NumberFormat("en-IN", {
													style: "currency",
													currency: "INR",
												}).format(
													Math.ceil(
														order.totalAmount + order.totalAmount * (tax / 100)
													)
												)}
											</p>
										</span>
									</div>
								</div>
							</div>
							<div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row">
								<div className="flex lg:justify-between lg:w-1/2 flex-col lg:flex-row justify-center px-4 space-y-2 lg:space-y-0 text-center lg:text-left items-center lg:items-start">
									<div>
										<h3 className="text-xl font-semibold">Payment</h3>
										<div className="text-sm">
											<h5>Payment status: {order.paymentStatus}</h5>
										</div>
									</div>
									<div className="text-center lg:text-right">
										<h3 className="text-xl font-semibold">Delivery</h3>
										<div className="text-sm">
											<h5>{order.address},</h5>
											<h5>{order.city},</h5>
											<h5>{order.state}</h5>
										</div>
									</div>
								</div>
								<div className="w-full lg:w-1/2 px-10 lg:mx-0">
									<h3 className="mt-4 mb-4 text-center">
										Order status:{" "}
										{order.orderStatus === "placed"
											? "Order placed"
											: order.orderStatus}
									</h3>
									<Progress order={order.orderStatus} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default page;
