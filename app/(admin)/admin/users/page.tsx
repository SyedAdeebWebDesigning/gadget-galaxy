import React from "react";
import { currentUser } from "@clerk/nextjs";
import SideBar from "@/components/admin/SideBar";
import Unauthorized from "@/components/admin/Unauthorized";
import { fetchUserById, fetchUsers } from "@/lib/actions/users.actions";
import UserList from "@/components/shared/UserList";

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

	const users = await fetchUsers();
	return (
		<main className="grid grid-flow-row cols">
			<SideBar fullName={fullName} userImg={userImg} link="/admin/users" />
			<section className="text-gray-600 body-font">
				<div className="container px-5 py-24 mx-auto">
					<h3 className="text-center text-4xl mb-10">All Users</h3>
					<div className="flex flex-col m-4 items-center justify-center">
						{users.map((user: any, i: number) => (
							<UserList user={user} key={i} i={i}/>
						))}
					</div>
				</div>
			</section>
		</main>
	);
};

export default getProducts;
