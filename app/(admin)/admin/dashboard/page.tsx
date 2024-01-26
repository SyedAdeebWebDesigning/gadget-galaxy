import React from "react";
import { currentUser } from "@clerk/nextjs";
import SideBar from "@/components/admin/SideBar";
import Unauthorized from "@/components/admin/Unauthorized";
import { fetchAllProducts, fetchProducts } from "@/lib/actions/product.actions";
import { fetchUserById } from "@/lib/actions/users.actions";
import ProductCarousel from "@/components/admin/ProductCarousel";
import Chart from "@/components/charts/charts";
import OrderChart from "@/components/charts/orders";

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
		<main className="grid grid-flow-row cols">
			<SideBar fullName={fullName} userImg={userImg} link="/admin/dashboard" />
			<section className="text-gray-600 body-font">
				<div className="container px-5 py-24 mx-auto">
					<h3 className="text-center text-4xl mb-10">Dashboard</h3>
					<div className="flex flex-col bg-gradient-to-tr from-red-100 to-green-100 space-y-2 rounded-2xl hover:from-green-100 hover:to-red-100 justify-center w-full overflow-x-hidden transition-all duration-200 ease-in-out hover:scale-95">
						<OrderChart />
					</div>
					<div className="flex flex-col bg-gradient-to-tr mt-2 from-pink-200 to-teal-100 space-y-2 rounded-2xl hover:from-teal-200 hover:to-pink-100 justify-center w-full overflow-x-hidden transition-all duration-200 ease-in-out hover:scale-95">
						<Chart />
					</div>
				</div>
			</section>
		</main>
	);
};

export default Dashboard;
