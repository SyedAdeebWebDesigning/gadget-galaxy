import SideBar from "@/components/admin/SideBar";
import Unauthorized from "@/components/admin/Unauthorized";
import { fetchUserById } from "@/lib/actions/users.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/legacy/image";
import React from "react";

type Props = {};

const loading = async (props: Props) => {
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
		<div>
			<SideBar fullName={fullName} userImg={userImg} link="/admin/dashboard" />
			<div className="text-center flex justify-center items-center my-10 space-x-4 mt-40">
				<div className="animate-spin rounded-full w-10 h-10">
					<Image src={"/loader.webp"} width={"100"} height={"100"} alt="" />
				</div>
				<h3 className="text-4xl">Please Wait</h3>
			</div>
		</div>
	);
};

export default loading;
