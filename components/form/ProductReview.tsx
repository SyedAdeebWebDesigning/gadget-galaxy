"use client";
import { Label } from "../ui/label";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Star from "../form/Star";
import { Button } from "../ui/button";
import { addReview, editReview } from "@/lib/actions/review.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Props = {
	productId: string;
	userId: string;
	userReview:
		| {
				like: number;
				title: string;
				review: string;
		  }
		| any;
};

const ProductReview = ({ productId, userId, userReview }: Props) => {
	const [like, setLike] = useState<number>(userReview?.like || 1);
	const [title, setTitle] = useState<string>("" || userReview?.title);
	const [review, setReview] = useState<string>("" || userReview?.review);
	const router = useRouter();
	const handleSubmit = () => {
		try {
			addReview({
				productId: productId,
				userId: userId,
				like: like,
				title: title,
				review: review,
			});
			toast.success("Successfully added the review");
		} catch (error: any) {
			toast.error("Error adding the review", error.message);
		}
	};
	const handleEditReview = () => {
		try {
			editReview({
				id: userReview._id,
				productId: productId,
				userId: userId,
				like: like,
				title: title,
				review: review,
			});
			toast.success("Successfully edited the review");
			router.refresh();
		} catch (error: any) {
			toast.error("Error adding the review", error.message);
		}
	};
	return (
		<div className="container rounded-xl lg:w-2/3 xl:w-1/3 sm:w-2/3 w-full flex flex-col justify-center text-gray-700">
			<h4 className="text-4xl my-4 text-center">Add a review</h4>
			<div className="space-y-5 p-5 rounded-xl">
				<div className="grid w-full items-start gap-x-1.5">
					<Label>How would your rate it</Label>
					<div className="flex gap-x-2 items-center">
						<Star stars={like} setLike={setLike} />
					</div>
				</div>
				<div className="grid w-full items-center gap-1.5">
					<Label>Title your review</Label>
					<Input
						type="text"
						id="title"
						className="border-gray-300 border-2 focus:border-transparent"
						placeholder="Whats's most important to know?"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="grid w-full items-center gap-1.5">
					<Label>Write your review</Label>
					<Textarea
						rows={6}
						id="review"
						className="border-gray-300 border-2 focus:border-transparent"
						placeholder="What did you like or dislike? What did you use this product for"
						value={review}
						onChange={(e) => setReview(e.target.value)}
					/>
				</div>
				{userReview ? (
					<Button
						variant={"secondary"}
						className="w-full"
						onClick={handleEditReview}
						disabled={
							userReview.title === title &&
							userReview.review === review &&
							userReview.like === like
						}>
						Edit Review
					</Button>
				) : (
					<Button
						variant={"secondary"}
						className="w-full"
						onClick={handleSubmit}>
						Submit
					</Button>
				)}
			</div>
		</div>
	);
};

export default ProductReview;
