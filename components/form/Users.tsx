"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { addUser, editUser } from "@/lib/actions/users.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Props = {
	userData: {
		userId: string;
		imgUrl: string;
		email: string;
		fullName: string;
	};
	mongoUser: {
		_id: string;
		fullName: string;
		address: string;
		state: string;
		city: string;
		pinCode: string;
		isAdmin: boolean;
	};
	isPresent: boolean;
};

const Users = ({ userData, mongoUser, isPresent }: Props) => {
	const router = useRouter();
	const { userId, imgUrl, email, fullName } = userData;
	const [name, setName] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	const [city, setCity] = useState<string>("");
	const [state, setState] = useState<string>("");
	const [pinCode, setPinCode] = useState<string>("");
	const [isAdmin, setIsAdmin] = useState<boolean>(false);

	const handleContinue = () => {
		try {
			addUser({
				userId: userId,
				imgUrl: imgUrl,
				email: email,
				fullName: fullName,
				isAdmin: isAdmin,
				address: address,
				city: city,
				state: state,
				pinCode: pinCode,
			});
			toast.success(`Details added successfully`, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			router.push("/");
		} catch (error: any) {
			toast.error(`Errors adding details`, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	};
	const handleEdit = () => {
		try {
			editUser(
				{ id: mongoUser._id },
				{
					userId: userId,
					imgUrl: imgUrl,
					email: email,
					fullName: name || fullName,
					isAdmin: isAdmin || mongoUser?.isAdmin,
					address: address || mongoUser?.address,
					city: city || mongoUser?.city,
					state: state || mongoUser?.state,
					pinCode: pinCode || mongoUser.pinCode,
				}
			);
			toast.success(`Details edited successfully`, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			router.push("/");
		} catch (error: any) {
			toast.error(`Errors adding details`, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	};

	return (
		<div className="container lg:w-2/3 xl:w-1/3 sm:w-2/3 w-full lg:h-[59vh] flex flex-col justify-center">
			<h4 className="text-4xl my-10 text-center">
				{isPresent ? <span>Edit</span> : <span>Complete</span>} your details
			</h4>
			<div className="space-y-5 bg-gray-200 p-5 rounded-xl">
				<div className="grid w-full items-center gap-1.5">
					<Label>Name</Label>
					<Input
						type="text"
						id="fullName"
						placeholder={`${
							mongoUser ? mongoUser?.fullName : "Enter your name"
						}`}
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="grid w-full items-center gap-1.5">
					<Label>Email</Label>
					<Input
						type="email"
						id="email"
						placeholder="Email"
						disabled
						value={email}
					/>
				</div>
				<div className="grid w-full items-center gap-1.5">
					<Label>Address</Label>
					<Textarea
						placeholder="Flat No. Place/Landmark Street Name"
						value={address || mongoUser?.address}
						onChange={(e) => setAddress(e.target.value)}
					/>
				</div>
				<div className="grid items-center w-full gap-1.5">
					<div className="flex flex-col lg:flex-row space-y-2 lg:space-x-2 lg:space-y-0 justify-center">
						<div className="w-full">
							<Label>City</Label>
							<Input
								type="text"
								id="city"
								placeholder="City"
								required
								value={city || mongoUser?.city}
								onChange={(e) => setCity(e.target.value)}
							/>
						</div>
						<div className="w-full">
							<Label>State</Label>
							<Input
								type="text"
								id="state"
								placeholder="State"
								required
								value={state || mongoUser?.state}
								onChange={(e) => setState(e.target.value)}
							/>
						</div>
						<div className="w-full">
							<Label>Pincode</Label>
							<Input
								id="zip"
								name="zip"
								type="text"
								maxLength={6}
								minLength={6}
								required
								placeholder="XXXXXX"
								value={pinCode || mongoUser?.pinCode}
								onChange={(e) => setPinCode(e.target.value)}
							/>
						</div>
					</div>
				</div>
				{isPresent ? (
					<div>
						<Button
							variant={"secondary"}
							onClick={handleEdit}
							className="w-full">
							Edit Details
						</Button>
					</div>
				) : (
					<Button
						variant={"secondary"}
						onClick={handleContinue}
						className="w-full">
						Continue
					</Button>
				)}
			</div>
		</div>
	);
};

export default Users;
