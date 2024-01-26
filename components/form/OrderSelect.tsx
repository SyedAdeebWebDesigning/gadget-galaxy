/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { MdLocalShipping, MdOutlineDomainVerification } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { updateOrderStatus } from "@/lib/actions/orders.actions";
import { useRouter } from "next/navigation";

type Props = {
	orderStatus: string;
	orderId: string;
};

const OrderSelect = ({ orderStatus, orderId }: Props) => {
	const router = useRouter();

	const setStatusToProcessing = async () => {
		try {
			await updateOrderStatus(orderId, "processing");
		} catch (error) {}
		router.push(`/admin/orders/`);
	};

	const setStatusToShipped = async () => {
		try {
			await updateOrderStatus(orderId, "shipped");
		} catch (error) {}
		router.push(`/admin/orders/`);
	};

	const setStatusToDelivered = async () => {
		try {
			await updateOrderStatus(orderId, "delivered");
		} catch (error) {}
		router.push(`/admin/orders/`);
	};

	return (
		<div className="flex flex-col justify-center">
			<div className="grid container grid-cols-1 sm:grid-cols-1 place-items-center lg:grid-cols-3 mb-32">
				<Button
					onClick={setStatusToProcessing}
					disabled={orderStatus === "processing"}
					className="card bg-gradient-to-tr hover:from-orange-300 shadow-2xl hover:to-orange-600 lg:mr-4 lg:my-0 mt-4 from-orange-600 to-orange-300 cursor-pointer hover:scale-110 transition-all duration-100 ease-in-out w-40 h-20 rounded-xl flex items-center justify-center text-white space-x-4">
					<MdOutlineDomainVerification className="text-2xl mr-3" />
					Processing
				</Button>
				<Button
					onClick={setStatusToShipped}
					disabled={orderStatus === "shipped"}
					className="card bg-gradient-to-tr hover:from-purple-300 shadow-2xl hover:to-purple-600 lg:mx-4 lg:my-0 my-4 from-purple-600 to-purple-300 cursor-pointer hover:scale-110 transition-all duration-100 w-40 h-20 rounded-xl flex items-center justify-center text-white space-x-4">
					<MdLocalShipping className="text-2xl mr-3" />
					Shipped
				</Button>
				<Button
					onClick={setStatusToDelivered}
					disabled={orderStatus === "delivered"}
					className="card bg-gradient-to-tr hover:from-teal-300 shadow-2xl hover:to-teal-600 lg:ml-4 lg:my-0 mb-4 from-teal-600 to-teal-400 cursor-pointer hover:scale-110 transition-all duration-100 ease-in-out w-40 h-20 rounded-xl flex items-center justify-center text-white space-x-2">
					<FaLocationDot className="text-2xl mr-3" />
					Delivered
				</Button>
			</div>
		</div>
	);
};

export default OrderSelect;
