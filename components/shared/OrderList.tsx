import Link from "next/link";
import React from "react";

type Props = {
	order: any;
	i: number;
};

const OrderList = ({ order, i }: Props) => {
	return (
		<tr
			className={`${
				i % 2 === 0 ? "bg-white" : "bg-gray-200"
			} border-b dark:bg-gray-800 dark:border-gray-700`}>
			<th
				scope="row"
				className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
				{i + 1}
			</th>
			<th
				scope="row"
				className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
				{order.name}
			</th>
			<td className="px-6 py-4">{order.email}</td>
			<td className="px-6 py-4">
				{order.address}, {order.city}, {order.state}
			</td>
			<td className="">
				{order.cart.map((product: any, i: number) => (
					<span key={i}>
						{product.name}, <br />
					</span>
				))}
			</td>
			<td className="px-6 py-4">
				{new Intl.NumberFormat("en-IN", {
					style: "currency",
					currency: "INR",
				}).format(order.totalAmount)}
			</td>
			<td
				className={`px-6 py-4 ${
					order.paymentStatus === "completed" ? "text-teal-500" : "text-red-400"
				} font-semibold`}>
				{order.paymentStatus}
			</td>
			<td
				className={`px-6 py-4 font-semibold ${
					order.orderStatus === "processing"
						? "text-indigo-300"
						: order.orderStatus === "shipped"
						? "text-orange-500"
						: order.orderStatus === "delivered"
						? "text-teal-600"
						: ""
				}`}>
				<Link href={`/admin/orders/${order.orderId}`}>{order.orderStatus}</Link>
			</td>
		</tr>
	);
};

export default OrderList;
