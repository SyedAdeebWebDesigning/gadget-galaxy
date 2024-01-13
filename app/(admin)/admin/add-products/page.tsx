import React from "react";
import { currentUser } from "@clerk/nextjs";
import SideBar from "@/components/admin/SideBar";
import Unauthorized from "@/components/admin/Unauthorized";
import Products from "@/components/form/Products";

type Props = {};

const getProducts = async (props: Props) => {
	let isAdmin: boolean = true;
	const user = await currentUser();
	if (!user) return null;
	const userId: string | any = `${user?.id}`;
	if (userId !== "user_2ajlzuzJWEBUKx2TBZOBfIVy95J") {
		isAdmin = false;
	}
	const fullName = `${user?.firstName} ${user?.lastName}`;
	const userImg = `${user?.imageUrl}`;

	if (!isAdmin) {
		return <Unauthorized />;
	}
	return (
		<main className="grid grid-flow-row cols">
			<SideBar fullName={fullName} userImg={userImg} />
			<Products />
		</main>
	);
};

export default getProducts;
