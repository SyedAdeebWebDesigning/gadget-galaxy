import React from "react";
import { currentUser } from "@clerk/nextjs";
import Unauthorized from "@/components/admin/Unauthorized";
import SideBar from "@/components/admin/SideBar";
import Authenticated from "@/components/admin/Authenticated";
import { fetchUserById } from "@/lib/actions/users.actions";

type Props = {};

const Admin = async (props: Props) => {
	const user: any = await currentUser();
	if (!user) return null;
	const userId: string | any = `${user?.id}`;
	const mongoUser: any = await fetchUserById(userId);

	return <div>{mongoUser?.isAdmin ? <Authenticated /> : <Unauthorized />}</div>;
};

export default Admin;
