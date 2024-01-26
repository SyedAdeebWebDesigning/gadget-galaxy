import OrderSelect from "@/components/form/OrderSelect";
import { Button } from "@/components/ui/button";
import { fetchOrderById } from "@/lib/actions/orders.actions";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdLocalShipping, MdOutlineDomainVerification } from "react-icons/md";

type Props = {
	params: { slug: string };
};

const OrderPage = async ({ params }: Props) => {
	const { slug } = params;
	const order: any = await fetchOrderById(slug);

	return (
		<main className="w-full bg-slate-100 py-10 h-full items-center flex flex-col justify-center">
			<h3 className="text-xl text-center mb-10">Select the order status</h3>
			<OrderSelect orderStatus={order.orderStatus} orderId={order._id} />
		</main>
	);
};

export default OrderPage;
