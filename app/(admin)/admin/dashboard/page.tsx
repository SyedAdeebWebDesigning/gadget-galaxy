import React from "react";
import { currentUser } from "@clerk/nextjs";
import SideBar from "@/components/admin/SideBar";
import Unauthorized from "@/components/admin/Unauthorized";
import { fetchProducts } from "@/lib/actions/product.actions";
import { fetchUserById } from "@/lib/actions/users.actions";
import ProductCarousel from "@/components/admin/ProductCarousel";

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

	const products = await fetchProducts();

	return (
		<main className="grid grid-flow-row cols">
			<SideBar fullName={fullName} userImg={userImg} link="/admin/dashboard" />
			<section className="text-gray-600 body-font">
				<div className="container px-5 py-24 mx-auto">
					<h3 className="text-center text-4xl mb-10">All Products</h3>
					<div className="flex flex-wrap -m-4 items-center justify-center">
						<ProductCarousel products={products} />
					</div>
				</div>
			</section>
		</main>
	);
};

export default getProducts;
