"use client";
import { Label } from "../ui/label";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Star from "../form/Star";
import Stars from "../shared/Star";
import { Button } from "../ui/button";
import { addReview, editReview } from "@/lib/actions/review.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/legacy/image";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationLink,
	PaginationEllipsis,
	PaginationNext,
} from "../ui/pagination";
import Link from "next/link";

type Props = {
	productId: string;
	userId: string;
	fullName: string;
	imgUrl: string;
	maxPages: number;
	pageNo: number;
	pageSize: number;
	totalPages: number;
	reviews:
		| {
				userId: string;
				like: number;
				title: string;
				review: string;
		  }
		| any;
	userReview:
		| {
				like: number;
				title: string;
				review: string;
		  }
		| any;
};

const ProductReview = ({
	productId,
	userId,
	userReview,
	reviews,
	fullName,
	imgUrl,
	maxPages,
	pageNo,
	totalPages,
}: Props) => {
	const [like, setLike] = useState<number>(userReview?.like || 1);
	const [title, setTitle] = useState<string>("" || userReview?.title);
	const [review, setReview] = useState<string>("" || userReview?.review);
	const router = useRouter();

	const handleSubmit = () => {
		try {
			addReview({
				userId,
				productId,
				like,
				title,
				review,
				imgUrl,
				fullName,
			});
			toast.success("Successfully added the review");
			router.refresh();
		} catch (error: any) {
			toast.error("Error adding the review", error.message);
		}
	};
	const handleEditReview = () => {
		try {
			editReview({
				id: userReview._id,
				userId,
				productId,
				like,
				title,
				review,
				imgUrl,
				fullName,
			});
			toast.success("Successfully edited the review");
			router.refresh();
		} catch (error: any) {
			toast.error("Error adding the review", error.message);
		}
	};
	return (
		<div className="container rounded-xl lg:w-2/3 xl:w-full sm:w-2/3 w-full flex flex-col justify-center text-gray-700">
			<div className="flex w-full justify-between flex-col xl:flex-row">
				<div className="space-y-5 p-5 rounded-xl w-full">
					<h4 className="text-2xl my-4 text-center">Add a review</h4>
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
				<div className="space-y-5 p-5 rounded-xl w-full relative">
					<div className="grid w-full items-start gap-x-1.5">
						<h4 className="text-2xl my-4 text-center">View reviews</h4>
						{reviews.map((_: any, i: number) => {
							return (
								<div key={i} className="flex flex-col my-2">
									<div className="flex  w-full p-4 rounded-xl justify-start space-x-4 bg-gray-200">
										<div className="relative h-10 object-contain w-10">
											{" "}
											<Image
												src={_.imgUrl}
												layout="fill"
												alt=""
												className="rounded-full"
											/>
										</div>
										<div className="w-2/3">
											<div className="flex flex-col">
												<h3 className="w-full rounded-full font-semibold">
													{_.fullName}
												</h3>
												<Stars stars={_.like} h={10} w={10} />
											</div>
											<h3 className="rounded-full whitespace-pre-wrap">
												{_.title} - {_.review}
											</h3>
										</div>
									</div>
								</div>
							);
						})}
					</div>
					<Pagination className="absolute left-[50%] right-[50%] -translate-x-[50%] bottom-0">
						<PaginationContent className="mx-auto">
							{pageNo > 1 ? (
								<PaginationItem>
									<PaginationPrevious
										href={`/store/${productId}?page=${pageNo - 1}`}
									/>
								</PaginationItem>
							) : (
								<Button disabled variant={"ghost"}>
									<PaginationPrevious
										href={``}
										className="cursor-not-allowed"
									/>
								</Button>
							)}
							<div className="flex space-x-2">
								{Array.from({ length: maxPages }).map(
									(_: any, i: number | any) => (
										<Link
											key={i}
											href={`/store/${productId}?page=${i + 1}`}
											scroll={false}
											className={`${
												i + 1 === pageNo &&
												"bg-gray-800 text-white text-center mx-0 w-10 h-10"
											}  rounded-xl flex items-center justify-center w-10 h-10`}>
											<h4 className="">{i + 1}</h4>
										</Link>
									)
								)}
							</div>
							{pageNo <= maxPages && totalPages > maxPages && (
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
							)}
							{pageNo > maxPages && pageNo <= totalPages && (
								<Link href={`/store/${productId}?page=${pageNo + 1}`}>
									<PaginationItem>
										<PaginationLink
											href={`/store/${productId}?page=${pageNo + 1}`}
											isActive>
											{pageNo}
										</PaginationLink>
									</PaginationItem>
								</Link>
							)}
							<PaginationItem>
								{pageNo < totalPages ? (
									<PaginationNext
										href={`/store/${productId}?page=${pageNo + 1}`}
									/>
								) : (
									<Button disabled variant={"ghost"}>
										<PaginationNext href={``} className="cursor-not-allowed" />
									</Button>
								)}
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</div>
			<div className="relative"></div>
		</div>
	);
};

export default ProductReview;
