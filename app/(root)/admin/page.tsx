import React from "react";
import { currentUser } from "@clerk/nextjs";

type Props = {};

const Admin = async (props: Props) => {
	let isAdmin: boolean = true;
	const user = await currentUser();
	if (!user) return null;
	const userId: string | any = `${user?.id}`;
	if (userId !== "user_2ajlzuzJWEBUKx2TBZOBfIVy95J") {
		isAdmin = false;
	}

	return <div>{isAdmin ? "True" : "False"}</div>;
};

export default Admin;
