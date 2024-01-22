"use client";
import React from "react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { addProductsToCart } from "@/lib/actions/cart.actions";
import { useRouter } from "next/navigation";

type Props = { userId: string; product: any };

const AddToCart = ({ userId, product }: Props) => {
	const router = useRouter();
	const handleCart = () => {
		try {
			addProductsToCart(userId, [
				{
					productId: product._id,
					name: product.name,
					price: product.price,
					imgUrl: product.imgUrl,
					desc: product.desc,
					qty: 1,
				},
			]);

			router.refresh();
			toast.success("Product added to cart successfully.", {
				position: "top-left",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		} catch (error: any) {
			toast.error("Error adding product to cart:", error.message);
		}
	};
	return (
		<Button
			className="flex ml-auto text-white border-0 py-2 px-6 focus:outline-none rounded w-full sm:w-auto my-4 sm:my-0"
			variant={"default"}
			onClick={handleCart}>
			Add to cart
		</Button>
	);
};

export default AddToCart;
