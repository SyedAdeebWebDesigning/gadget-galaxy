import React from "react";
import { currentUser } from "@clerk/nextjs";
import SideBar from "@/components/admin/SideBar";
import Unauthorized from "@/components/admin/Unauthorized";
import { fetchAllProducts, fetchProducts } from "@/lib/actions/product.actions";
import { fetchUserById } from "@/lib/actions/users.actions";
import Chart from "@/components/charts/charts";

type Props = {};

const Dashboard = async (props: Props) => {
	const user: any = await currentUser();
	if (!user) return null;
	const userId: string | any = `${user?.id}`;
	const mongoUser: any = await fetchUserById(userId);
	const fullName = `${user?.firstName} ${user?.lastName}`;
	const userImg = `${user?.imageUrl}`;

	if (!mongoUser?.isAdmin) {
		return <Unauthorized />;
	}

	const products = await fetchAllProducts();

	return (
		<main className="grid grid-flow-row cols ">
			<SideBar fullName={fullName} userImg={userImg} link="/admin/dashboard" />
			<section className="text-gray-600 body-font from-teal-50 to-white bg-gradient-to-tr">
				<div className="container px-5 mx-auto">
					<div className="flex flex-col space-y-2 rounded-2xl justify-center w-full overflow-x-hidden transition-all duration-200 ease-in-out hover:scale-90 scale-90">
						<Chart />
					</div>
				</div>
			</section>
		</main>
	);
};

export default Dashboard;
