import { fetchOrdersByUserId } from "@/lib/actions/orders.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/legacy/image";
import React, { useRef } from "react";
import Link from "next/link";

type Props = {};
interface orderProps {
	map(arg0: (order: orderProps) => React.JSX.Element): React.ReactNode;
	_id: string;
	orderId: string;
	userId: string;
	email: string;
	name: string;
	address: string;
	city: string;
	state: string;
	paymentStatus: string;
	orderStatus: string;
	totalAmount: number;
	cart: [
		{
			productId: string;
			name: string;
			imgUrl: string;
			qty: number;
			price: number;
		}
	];
}
const OrderPage = async (props: Props) => {
	const user: any = await currentUser();
	const orders: orderProps | any = await fetchOrdersByUserId(user?.id);
	return (
		<main>
			<h3 className="text-center text-3xl mt-10">Your Orders</h3>
			<section className="text-gray-600 body-font">
				<div className="container px-5 py-24 mx-auto">
					<div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
						{orders.map((order: orderProps) => (
							<div className=" bg-slate-200 rounded-xl m-2" key={order?._id}>
								<div className="h-full border-2 border-gray-200 p-4 border-opacity-60 rounded-lg overflow-hidden">
									<div className="lg:h-48 md:h-36 w-full h-36 object-cover object-center relative">
										<Link href={`/order/${order?.orderId}%7D`} className="m-2">
											<Image
												src={order?.cart[0]?.imgUrl}
												alt=""
												className="hover:scale-95 transition-all duration-200 ease-in-out"
												layout="fill"
												objectFit="contain"
											/>
										</Link>
									</div>
									<div className="p-6">
										<h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
											Order Id: {order._id}
										</h2>
										<h1 className="title-font text-lg font-medium text-gray-900 mb-3 line-clamp-1">
											{order.cart[0]?.name}{" "}
											{order.cart.length > 1 && "+ More Products"}
										</h1>
										<p className="leading-relaxed">{order.address}</p>
										<p className="leading-relaxed">{order.city}</p>
										<p className="leading-relaxed">{order.state}</p>
										<div className="flex items-center text-sm line-clamp-1">
											<div className="text-gray-600 font-semibold items-start md:mb-2 lg:mb-0 flex flex-col text-left justify-between w-full">
												Order Status:{" "}
												<p className="text-gray-600">Payment Status</p>
											</div>
											<div
												className={`${
													order.orderStatus === "processing"
														? "text-indigo-300"
														: order.orderStatus === "shipped"
														? "text-orange-500"
														: order.orderStatus === "delivered"
														? "text-teal-600"
														: ""
												} items-start md:mb-2 lg:mb-0 flex flex-col text-left`}>
												{order.orderStatus}{" "}
												<p
													className={`${
														order.paymentStatus !== "completed"
															? "text-red-500"
															: "text-teal-600"
													} font-semibold`}>
													{order.paymentStatus}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</main>
	);
};

export default OrderPage;
