"use client";
import { deleteProduct } from "@/lib/actions/product.actions";
import React from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

type Props = {};

const DeleteButton = ({ id, name }: string | any) => {
	const router = useRouter();
	return (
		<div>
			<AlertDialog>
				<AlertDialogTrigger>
					<div className="absolute top-3 right-3 cursor-pointer transition-all duration-150 ease-in-out hover:scale-110">
						<MdDelete className="text-red-500 w-8 h-8" />
					</div>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete your
							product: {name} and remove your data from our servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => {
								deleteProduct(id);
								toast.success(`Product ${name} successfully deleted`);
								router.refresh();
							}}
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default DeleteButton;
