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
			<h3 className="text-center text-3xl mt-10">Orders page</h3>
			<section className="text-gray-600 body-font m">
				<div className="container px-5 py-24 mx-auto">
					<div className="flex flex-wrap -m-4 ">
						{orders.map((order: orderProps) => (
							<div
								className="p-4 md:w-1/3 bg-slate-200 rounded-xl"
								key={order?._id}>
								<div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
									<div className="lg:h-48 md:h-36 w-full object-cover object-center relative">
										<Link href={`/order/${order.orderId}%7D`}>
											<Image
												src={order?.cart[0].imgUrl}
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
											{order.cart[0].name}{" "}
											{order.cart.length > 1 && "+ More Products"}
										</h1>
										<p className="leading-relaxed">{order.address}</p>
										<p className="leading-relaxed">{order.city}</p>
										<p className="leading-relaxed">{order.state}</p>
										<div className="flex items-center flex-wrap">
											<Link
												className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
												href={`/order/${order.orderId}%7D`}>
												View Product
												<svg
													className="w-4 h-4 ml-2"
													viewBox="0 0 24 24"
													stroke="currentColor"
													stroke-width="2"
													fill="none"
													stroke-linecap="round"
													stroke-linejoin="round">
													<path d="M5 12h14"></path>
													<path d="M12 5l7 7-7 7"></path>
												</svg>
											</Link>
											<span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1">
												{new Intl.NumberFormat("en-IN", {
													style: "currency",
													currency: "INR",
												}).format(order.totalAmount)}
											</span>
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
