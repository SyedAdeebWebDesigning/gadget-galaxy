import React from "react";
import { Button } from "../ui/button";
import { addOrders } from "@/lib/actions/orders.actions";
import Link from "next/link";

type Props = {
	cart: any;
	subTotal: any;
};

const Checkout = ({ cart, subTotal }: Props) => {
	const handleOrder = () => {
		alert("Called");
	};
	return (
		<div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-2/3">
			<div className="mb-2 flex justify-between">
				<p className="text-gray-700">Subtotal</p>
				<p className="text-gray-700">
					{new Intl.NumberFormat("en-IN", {
						style: "currency",
						currency: "INR",
					}).format(subTotal)}
				</p>
			</div>
			<div className="flex justify-between">
				<p className="text-gray-700">Shipping</p>
			</div>
			<hr className="my-4" />
			<div className="flex justify-between">
				<p className="text-lg font-bold">Total</p>
				<div className="">
					<p className="mb-1 text-lg font-bold">
						{new Intl.NumberFormat("en-IN", {
							style: "currency",
							currency: "INR",
						}).format(subTotal)}
					</p>
				</div>
			</div>
			<Link href={"/checkout?page=1"}>
				<Button className="mt-6 w-full ">Check out</Button>
			</Link>
		</div>
	);
};

export default Checkout;
