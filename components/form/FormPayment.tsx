"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { RiVisaLine } from "react-icons/ri";
import { FaCreditCard } from "react-icons/fa6";
import Image from "next/legacy/image";
import { toast } from "react-toastify";
import { addOrders } from "@/lib/actions/orders.actions";
// import { useRouter } from "next/navigation";
import { fetchUserCartLength } from "@/lib/actions/cart.actions";
import { useRouter } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { motion } from "framer-motion";
import { sendEmail } from "@/lib/sendEmail";

type Props = { userById: any; subTotal: any; cartId: { _id: string } };

const FormPayment = ({ userById, subTotal, cartId }: Props) => {
	const [isLoading, setIsLoading] = useState<"default" | "loading" | "loaded">(
		"default"
	);

	const [cvc, setCvc] = useState<string>("");
	const [expiration, setExpiration] = useState<string>("");
	const cvcValue = parseInt(cvc.slice(0, 3));
	const expirationValue = parseInt(expiration?.slice(0, 4));
	const [cardNumber, setCardNumber] = useState("");
	const [cardNetwork, setCardNetwork] = useState("Unknown");
	const [name, setName] = useState("" || userById.fullName);
	const router = useRouter();
	const handleCardNumberChange = (event: any) => {
		const inputCardNumber = event.target.value.replace(/\D/g, "").slice(0, 16); // Remove non-digit characters
		setCardNumber(inputCardNumber);
		checkCardNetwork(inputCardNumber);
	};

	const checkCardNetwork = (number: number | any) => {
		const visaPattern = /^4/;
		const mastercardPattern = /^5[1-5]/;

		if (visaPattern.test(number)) {
			setCardNetwork("Visa");
		} else if (mastercardPattern.test(number)) {
			setCardNetwork("MasterCard");
		} else {
			setCardNetwork("Unknown");
		}
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (!cardNumber || !cvc || !expiration) {
			toast.error("Please fill the required fields");
		} else {
			setIsLoading("loading");

			const orderInfo = {
				orderId: `${userById?.userId}${cartId._id}`,
				userId: userById?.userId,
				email: userById?.email,
				name: name,
				address: userById?.address,
				city: userById?.city,
				state: userById?.state,
				totalAmount: subTotal,
				paymentStatus: "completed",
				orderStatus: "placed",
			};
			setTimeout(() => {
				addOrders(orderInfo);
			}, 1500);
			setTimeout(() => {
				setIsLoading("loaded");
			}, 2000);
			setTimeout(() => {
				router.push(`/order/${userById?.userId}${cartId._id}}`);
			}, 2500);
		}
	};
	const handlePayOnDevilry = (e: any) => {
		e.preventDefault();

		const orderInfo = {
			orderId: `${userById?.userId}${cartId._id}`,
			userId: userById?.userId,
			email: userById?.email,
			name: name,
			address: userById?.address,
			city: userById?.city,
			state: userById?.state,
			totalAmount: subTotal,
			paymentStatus: "pending",
			orderStatus: "placed",
		};
		addOrders(orderInfo);
		setTimeout(() => {
			router.push(`/order/${userById?.userId}${cartId._id}}`);
		}, 1000);
	};
	return (
		<form
			className="space-y-5 p-5 rounded-xl transition-all duration-200"
			action={async (formData) => {
				await sendEmail(formData);
			}}>
			<div className="grid w-full items-center gap-1.5">
				<Label>Email address</Label>
				<Input
					className="border border-slate-300 focus:border-none"
					name="emailName"
					type="email"
					id="email"
					value={userById?.email}
					readOnly
				/>
			</div>
			<div className="grid w-full items-center gap-1.5">
				<Label>Name on card</Label>
				<Input
					className="border border-slate-300 focus:border-none"
					type="text"
					id="fullName"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className="grid w-full items-center gap-1.5">
				<Label>Card number</Label>
				<div className="relative">
					<Input
						className="border border-slate-300 focus:border-none "
						type="text"
						id="cardNumber"
						value={cardNumber}
						required
						onChange={handleCardNumberChange}
					/>
					<div className="absolute right-2 top-[50%] -translate-y-[50%] transition-all duration-200">
						{cardNetwork === "Visa" ? (
							<div>
								<RiVisaLine className="w-6 h-6 text-[#1434CB]" />
							</div>
						) : cardNetwork === "MasterCard" ? (
							<motion.div
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								className="flex items-center">
								<Image
									className="w-6 h-6 flex items-center mt-1"
									width={24}
									height={24}
									src={"/mastercard.webp"}
									alt="mastercard"
									objectFit="contain"
								/>
							</motion.div>
						) : (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.4 }}
								className="flex space-x-3 items-center transition-none duration-200 ease-linear">
								<RiVisaLine className="w-6 h-6 text-[#1434CB] mr-2" />
								<Image
									className="w-6 h-6 flex items-center mt-1 mr-2"
									width={24}
									height={24}
									src={"/mastercard.webp"}
									alt="mastercard"
									objectFit="contain"
								/>
								<FaCreditCard className="w-5 h-5 text-slate-500" />
							</motion.div>
						)}
					</div>
				</div>
			</div>
			<div className="grid w-full items-center gap-1.5">
				<div className="flex space-x-2">
					<div className="w-3/4">
						<Label>Expiration date (MM/YY)</Label>
						<Input
							className="border border-slate-300 focus:border-none"
							type="number"
							id="expiration"
							value={expirationValue}
							onChange={(e) => setExpiration(e.target.value)}
							minLength={4}
							maxLength={4}
							required
						/>
					</div>
					<div className="w-1/4">
						<Label>CVC</Label>
						<Input
							className="border border-slate-300 focus:border-none"
							type="number"
							value={cvcValue}
							onChange={(e) => setCvc(e.target.value)}
							min={100}
							max={999}
							required
						/>
					</div>
				</div>
			</div>
			<div className="grid w-full items-center gap-1.5">
				<Label>Address</Label>
				<Textarea
					rows={1}
					className="border border-slate-300 focus:border-none"
					value={userById.address}
					readOnly
				/>
			</div>

			<div className="grid items-center w-full gap-1.5">
				<div className="flex flex-col lg:flex-row space-y-2 lg:space-x-2 lg:space-y-0 justify-center">
					<div className="w-full">
						<Label>City</Label>
						<Input
							className="border border-slate-300 focus:border-none"
							type="text"
							id="city"
							required
							value={userById?.city}
							readOnly
						/>
					</div>
					<div className="w-full">
						<Label>State</Label>
						<Input
							className="border border-slate-300 focus:border-none"
							type="text"
							id="state"
							required
							value={userById?.state}
							readOnly
						/>
					</div>
					<div className="w-full">
						<Label>Pincode</Label>
						<Input
							className="border border-slate-300 focus:border-none"
							id="zip"
							name="zip"
							type="text"
							maxLength={6}
							minLength={6}
							required
							value={userById?.pinCode}
							readOnly
						/>
					</div>
				</div>
				<Button
					variant={"secondary"}
					className={`w-full relative mt-10 transition-all duration-300 ${
						isLoading === "loading"
							? "bg-gray-600 transition-all duration-300"
							: isLoading === "loaded"
							? "bg-green-600 hover:bg-green-700 transition-all duration-300"
							: " transition-all duration-300"
					}`}
					onClick={handleSubmit}>
					{isLoading === "loading" ? (
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.3 }}
							className="flex items-center justify-center space-x-2 transition-all duration-300">
							<span className="animate-spin">
								<AiOutlineLoading3Quarters className="w-6 h-6" />
							</span>
							<span className="text-xl">Loading</span>
						</motion.p>
					) : isLoading === "loaded" ? (
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.4 }}
							className="flex items-center justify-center space-x-2 transition-all duration-300">
							<span className="">
								<MdDone className="w-6 h-6" />
							</span>
							<span className="text-xl">Order confirmed</span>
						</motion.p>
					) : (
						<p className="transition-all duration-300">Confirm Order</p>
					)}
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
						className={`absolute top-[50%] left-2 -translate-y-[50%] ${
							isLoading === "loading"
								? "bg-gray-600"
								: isLoading === "loaded"
								? "bg-green-400"
								: "default"
						}`}></motion.p>
				</Button>
				<h3 className="text-center my-1">or</h3>
				<Button
					variant={"link"}
					className="w-full"
					onClick={handlePayOnDevilry}>
					Pay on Delivery
				</Button>
			</div>
		</form>
	);
};

export default FormPayment;
