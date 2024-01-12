import React from "react";
import { currentUser } from "@clerk/nextjs";
import Unauthorized from "@/components/admin/Unauthorized";
import SideBar from "@/components/admin/SideBar";
import Authenticated from "@/components/admin/Authenticated";

type Props = {};

const Admin = async (props: Props) => {
	let isAdmin: boolean = true;
	const user = await currentUser();
	if (!user) return null;
	const userId: string | any = `${user?.id}`;
	if (userId !== "user_2ajlzuzJWEBUKx2TBZOBfIVy95J") {
		isAdmin = false;
	}

	return <div>{isAdmin ? <Authenticated /> : <Unauthorized />}</div>;
};

export default Admin;
