import React from "react";
import { currentUser } from "@clerk/nextjs";
import SideBar from "@/components/admin/SideBar";
import Unauthorized from "@/components/admin/Unauthorized";
import { fetchUserById, fetchUsers } from "@/lib/actions/users.actions";
import { fetchAllOrders } from "@/lib/actions/orders.actions";
import OrderList from "@/components/shared/OrderList";

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

	const orders = await fetchAllOrders();

	return (
		<main className="grid grid-flow-row cols">
			<SideBar fullName={fullName} userImg={userImg} link="/admin/orders" />
			<section className="text-gray-600 body-font">
				<div className="px-5 py-24 mx-auto container overflow-x-scroll w-[100vw] scrollbar-hide scrollbar-thin scrollbar-thumb-purple-500 ">
					<h3 className="text-center text-4xl mb-10">All Orders</h3>
					<table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
						<thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400 bg-slate-300">
							<tr>
								<th scope="col" className="px-4 py-3">
									S.No
								</th>
								<th scope="col" className="px-4 py-3">
									Name
								</th>
								<th scope="col" className="px-4 py-3">
									Email
								</th>
								<th scope="col" className="px-4 py-3">
									Address
								</th>
								<th scope="col" className="py-3">
									Products name
								</th>
								<th scope="col" className="px-4 py-3">
									Total amount
								</th>
								<th scope="col" className="px-4 py-3">
									Payment Status
								</th>
								<th scope="col" className="px-4 py-3">
									Order Status
								</th>
							</tr>
						</thead>
						<tbody>
							{orders?.map((order: any, i: number) => (
								<OrderList order={order} key={i || order.orderStatus} i={i} />
							))}
						</tbody>
					</table>
				</div>
			</section>
		</main>
	);
};

export default getProducts;
