"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { addProduct } from "@/lib/actions/product.actions";
import toast from "react-hot-toast";

type Props = {};

const Products = (props: Props) => {
	const [name, setName] = useState<string>("");
	const [category, setCategory] = useState<string>("");
	const [price, setPrice] = useState<number>(1);
	const [picture, setPicture] = useState<File | null>(null);
	const [description, setDescription] = useState<string>("");
	const [imagePreview, setImagePreview] = useState<string | any>(null);

	const router = useRouter();

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0];
		if (file) {
			setPicture(file);
			// Display image preview
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		} else {
			setPicture(null);
			setImagePreview(null);
		}
	};

	const handleAddProduct = () => {
		// Add logic to handle the product addition, including sending the data to the server
		addProduct({
			name: name,
			category: category,
			desc: description,
			price: price,
			imgUrl: imagePreview,
		});
		setPicture(null);
		setImagePreview(null);
		toast.success(`Product ${name} added successfully.`);
		router.push("/admin/get-products");
	};

	return (
		<div>
			<section className="container lg:w-2/3 xl:w-1/3 sm:w-2/3 w-full">
				<h3 className="text-center text-4xl mb-10">Add Product</h3>
				<div className="space-y-5 bg-gray-200 p-5 rounded-xl">
					<Input
						type="text"
						placeholder="Product Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<div className="space-x-5 flex">
						<Input
							type="number"
							placeholder="Price"
							min={1}
							value={price}
							onChange={(e) => setPrice(parseFloat(e.target.value))}
						/>
						<Input
							type="text"
							placeholder="Category"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
						/>
					</div>
					<Textarea
						placeholder="Product Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<Input id="picture" type="file" onChange={handleFileChange} />
					{imagePreview && (
						<div className="relative h-40 w-40 sm:w-[80%] sm:h-60 flex items-center justify-center mx-auto object-cover">
							<Image
								className="cursor-pointer transition-all duration-150 hover:scale-110"
								alt="img"
								onClick={() => {
									setImagePreview(null);
									setPicture(null);
									router.refresh();
								}}
								src={imagePreview}
								layout="fill"
								objectFit="contain"
							/>
						</div>
					)}
					<Button
						variant={"secondary"}
						onClick={handleAddProduct}
						className="w-full"
					>
						Add Product
					</Button>
				</div>
			</section>
		</div>
	);
};

export default Products;