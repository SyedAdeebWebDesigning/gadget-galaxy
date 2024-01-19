"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";
import { addProduct } from "@/lib/actions/exclusive.actions";
import { addProduct as Product } from "@/lib/actions/product.actions";

import { toast } from "react-toastify";
import { Label } from "../ui/label";

type Props = {};

const FormExclusive = (props: Props) => {
	const [name, setName] = useState<string>("");
	const [category, setCategory] = useState<string>("");
	const [price, setPrice] = useState<number>(1);
	const [picture, setPicture] = useState<File | null>(null);
	const [description, setDescription] = useState<string>("");
	const [imagePreview, setImagePreview] = useState<string | any>(null);
	const [primaryColor, setPrimaryColor] = useState("");
	const [secondaryColor, setSecondaryColor] = useState("");
	const [isFeatureable, setIsFeatureable] = useState<boolean | any>(false);
	const [isPreview, setIsPreview] = useState<boolean>(false);
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
		addProduct({
			name: name,
			category: category,
			desc: description,
			price: price,
			imgUrl: imagePreview,
			primaryColor: primaryColor,
			secondaryColor: secondaryColor,
		});
		Product({
			name: name,
			category: category,
			desc: description,
			price: price,
			imgUrl: imagePreview,
			isFeatured: false,
		});
		setPicture(null);
		setImagePreview(null);
		toast(`Product ${name} successfully added`, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
		router.refresh();
	};

	return (
		<div>
			<section className="container lg:w-2/3 xl:w-1/3 sm:w-2/3 w-full my-10">
				<h3 className="text-center text-4xl mb-10">Add Product</h3>
				<div className="space-y-5 bg-gray-200 p-5 rounded-xl">
					<Input
						type="text"
						placeholder="Product Name"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
							if (name || price || imagePreview) {
								setIsPreview(true);
							} else {
								setIsPreview(false);
							}
						}}
					/>
					<div className="space-x-5 flex">
						<Input
							type="number"
							placeholder="Price"
							min={1}
							value={price}
							onChange={(e) => {
								setPrice(parseFloat(e.target.value));
								if (name || price || imagePreview) {
									setIsPreview(true);
								} else {
									setIsPreview(false);
								}
							}}
						/>
						<Input
							type="text"
							placeholder="Category"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
						/>
					</div>
					<div className="space-x-5 flex">
						<Input
							type="text"
							placeholder="Primary Color"
							value={primaryColor}
							onChange={(e) => {
								setPrimaryColor(e.target.value);
								if (name || price || imagePreview) {
									setIsPreview(true);
								} else {
									setIsPreview(false);
								}
							}}
						/>
						<Input
							type="text"
							placeholder="Secondary Color"
							value={secondaryColor}
							onChange={(e) => setSecondaryColor(e.target.value)}
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
						variant={"default"}
						onClick={handleAddProduct}
						className="w-full">
						Add Product
					</Button>
				</div>
			</section>
			{isPreview === true && (
				<div className="relative mt-10">
					<div className="bg-gradient-to-br from-[#1b1b1b] to-[#282828] w-full h-full skew-y-0 absolute top-0 -z-20" />
					<h3 className="text-gray-100 text-center text-4xl font-semibold pt-10 ">
						Exclusive Product
					</h3>
					<section className="text-gray-400 body-font">
						<div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
							<div className="flex flex-col lg:flex-row lg:space-x-40 justify-center items-center">
								<div className="relative h-[300px] w-[300px] lg:w-[500px] lg:h-[500px] animate-pulse xl:w-[500px] xl:h-[500px] my-10 flex items-center justify-center">
									{imagePreview ? (
										<Image src={imagePreview} alt="" layout="fill" />
									) : (
										<div className="flex items-center justify-center">
											<Image
												src={"/Placeholder.webp"}
												alt=""
												width={600}
												height={400}
												className="flex items-center justify-center"
											/>
										</div>
									)}
								</div>
								<div className="text-white text-center lg:text-left space-y-2">
									<p className="my-1 text-3xl">Get this product</p>
									<h3
										className={`text-3xl lg:text-6xl text-center lg:text-left bg-gradient-to-r from-purple-400
                            to-indigo-500 text-clip text-transparent bg-clip-text`}>
										{"" || name}
									</h3>
									<div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start">
										<p className="my-2 text-xl lg:text-2xl xl:text-3xl">
											Exclusively on
										</p>
										<Image
											src={"/logo-2.svg"}
											alt=""
											width={200}
											height={100}
										/>
									</div>
									<h3 className="text-2xl">
										At just{" "}
										{`₹${new Intl.NumberFormat("en-IN").format(price || 0)}`}
									</h3>
									<div className="flex space-x-3 justify-center lg:justify-start ">
										<div className="flex space-x-3 justify-center lg:justify-start from-teal-500" />
										<Button
											className={`text-white mt-2 !bg-gradient-to-r !from-purple-400
                            !to-indigo-500`}
											variant={"ghost"}>
											View Product
										</Button>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			)}
		</div>
	);
};

export default FormExclusive;
