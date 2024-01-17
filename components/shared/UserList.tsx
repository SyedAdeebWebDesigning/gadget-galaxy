"use client";
import React from "react";
import { Button } from "../ui/button";
import {
	MdAdminPanelSettings,
	MdOutlineAdminPanelSettings,
} from "react-icons/md";
import { makeNonAdmin, makeAdmin } from "@/lib/actions/users.actions";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
	user: any;
	i: number;
};

const UserList = ({ user, i }: Props) => {
	const router = useRouter();
	return (
		<div className="p-4 lg:w-1/2 xl:w-1/3 w-full bg-gradient-to-r shadow-xl group cursor-pointer hover:shadow-2xl transition-all duration-200 from-indigo-200 to-purple-200 m-4 rounded-full flex items-center justify-between space-x-2">
			<div className="flex space-x-2 items-center">
				<div>
					<Image
						src={user.imgUrl}
						alt="user"
						width={50}
						height={50}
						className="rounded-full"
					/>
				</div>
				<div className="transition-all duration-400">
					<h3 className="text-lg">
						{i + 1}. {user.fullName}
					</h3>
					<p className="text-sm text-slate-500">{user?.email}</p>
				</div>
			</div>
			{user.isAdmin === true ? (
				<div
					className="hover:scale-110 transition-all duration-100 active:scale-90 bg-gradient-to-tr from-indigo-500 to-purple-500 bg-clip-text text-transparent text-clip"
					onClick={() => {
						makeNonAdmin(user?.userId);
						toast.success(`User ${user?.fullName} is now a non-admin`, {
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
					}}>
					<Button variant={"link"}>
						<MdAdminPanelSettings className="h-7 w-7 text-purple-500 drop-shadow-xl" />
					</Button>
				</div>
			) : (
				<div
					className="hover:scale-110 transition-all duration-100 active:scale-90"
					onClick={() => {
						makeAdmin(user?.userId);
						toast.success(`User ${user?.fullName} is now an admin`, {
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
					}}>
					<Button variant={"link"}>
						<MdOutlineAdminPanelSettings className="h-7 w-7" />
					</Button>
				</div>
			)}
		</div>
	);
};

export default UserList;
