"use client";
import { deleteProduct } from "@/lib/actions/product.actions";
import React from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";

type Props = {};

const DeleteButton = ({ id, name }: string | any) => {
	const router = useRouter();
	return (
		<div>
			<div
				className="absolute top-3 right-3 cursor-pointer transition-all duration-150 ease-in-out hover:scale-110"
				onClick={() => {
					deleteProduct(id);
					toast.success(`Product ${name} successfully deleted`);
					router.refresh();
				}}
			>
				<MdDelete className="text-red-500 w-8 h-8" />
			</div>
		</div>
	);
};

export default DeleteButton;
