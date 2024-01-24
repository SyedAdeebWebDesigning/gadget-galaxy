import { fetchOrderById } from "@/lib/actions/orders.actions";
import React from "react";

type Props = {
	params: { slug: string };
};

const page = async ({ params }: Props) => {
	const { slug } = params;
	const orderId: string | any = slug.slice(0, slug.length - 3); // For some weird cases the slug also adds '%7D' in the last characters of url
	const order: any = await fetchOrderById(orderId);

	return <div></div>;
};

export default page;
