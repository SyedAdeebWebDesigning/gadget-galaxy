import React from "react";
import { currentUser } from "@clerk/nextjs";
import SideBar from "@/components/admin/SideBar";
import Unauthorized from "@/components/admin/Unauthorized";
import Products from "@/components/form/Products";
import { fetchUserById } from "@/lib/actions/users.actions";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FormExclusive from "@/components/form/FormExclusive";

type Props = {};

const getProducts = async (props: Props) => {
	const user: any = await currentUser();
	if (!user) return null;
	const userId: string | any = `${user?.id}`;
	const mongoUser: any = await fetchUserById(userId);
	const fullName = `${user?.firstName} ${user?.lastName}`;
	const userImg = `${user?.imageUrl}`;

	if (!mongoUser?.isAdmin) {
		return <Unauthorized />;
	}
	return (
		<main className="grid grid-flow-row cols">
			<SideBar
				fullName={fullName}
				userImg={userImg}
				link="/admin/add-exclusive"
			/>
			<FormExclusive />
		</main>
	);
};

export default getProducts;
