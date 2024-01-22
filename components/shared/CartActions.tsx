"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
	increaseProductQuantity,
	removeProductQty,
} from "@/lib/actions/cart.actions";
import { useRouter } from "next/navigation";

type Props = {
	qty: number;
	userId: string;
	productId: string;
};

const CartActions = ({ qty, userId, productId }: Props) => {
	const [cartQty, setCartQty] = useState(qty);
	const router = useRouter();
	const handleAdd = () => {
		increaseProductQuantity({
			userId: userId,
			productId: productId,
			quantity: 1,
		});
		router.refresh();
	};
	const handleRemove = () => {
		removeProductQty({ userId: userId, productId: productId, quantity: 1 });
		router.refresh();
	};
	return (
		<div className="flex items-center border-gray-100">
			<Button
				className="cursor-pointer  bg-gray-100 py-1 px-3.5 duration-100 w-10"
				onClick={handleRemove}>
				{" "}
				-{" "}
			</Button>
			<input
				className="h-8 w-8 bg-white text-center text-xs outline-none"
				type="number"
				value={qty}
				min="1"
			/>
			<Button
				className="cursor-pointer bg-gray-100 py-1 px-3 duration-100 w-10"
				onClick={handleAdd}>
				{" "}
				+{" "}
			</Button>
		</div>
	);
};

export default CartActions;
