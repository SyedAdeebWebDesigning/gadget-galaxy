"use client";
import React from "react";
import { Button } from "../ui/button";
import {
	MdAdminPanelSettings,
	MdOutlineAdminPanelSettings,
} from "react-icons/md";
import { makeNonAdmin, makeAdmin } from "@/lib/actions/users.actions";
import { toast } from "react-toastify";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";

type Props = {
	user: any;
	i: number;
};

const UserList = ({ user, i }: Props) => {
	const router = useRouter();
	return (
		<tr
			className={`p-3 space-y-2 ${i % 2 === 0 ? "bg-white" : "bg-gray-200"} ${
				user.isAdmin && "font-semibold"
			}`}>
			<td className="py-3 px-4 overflow-x-scroll">{i + 1}.</td>
			<td className="py-3 px-4 overflow-x-scroll">{user.fullName}</td>
			<td className="py-3 px-4 overflow-x-scroll">{user.userId}</td>
			<td className="py-3 px-4 overflow-x-scroll">{user.email}</td>
			<td className="py-3 px-4 overflow-x-scroll">
				{user.address}, {user.city}
			</td>
			{user.isAdmin === true ? (
				<td
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
				</td>
			) : (
				<td
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
				</td>
			)}
		</tr>
	);
};

export default UserList;
