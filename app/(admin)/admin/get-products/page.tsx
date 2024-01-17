import React from "react";
import { currentUser } from "@clerk/nextjs";
import SideBar from "@/components/admin/SideBar";
import Unauthorized from "@/components/admin/Unauthorized";
import { fetchProducts } from "@/lib/actions/product.actions";
import Image from "next/image";
import DeleteButton from "@/components/admin/DeleteButton";
import { fetchUserById } from "@/lib/actions/users.actions";

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
			<SideBar
				fullName={fullName}
				userImg={userImg}
				link="/admin/get-products"
			/>
			<section className="text-gray-600 body-font">
				<div className="container px-5 py-24 mx-auto">
					<h3 className="text-center text-4xl mb-10">All Products</h3>
					<div className="flex flex-wrap -m-4 items-center justify-center">
						{products.map((_: any, i: number) => (
							<div className="p-4 md:w-1/3 w-full" key={i}>
								<div className="h-full relative rounded-lg overflow-hidden bg-gradient-to-t from-transparent to-gray-300 p-5">
									<div className="relative w-60 h-60 flex justify-center items-center mx-auto aspect-square">
										<Image
											src={_.imgUrl}
											alt=""
											layout="fill"
											objectFit="contain"
										/>
									</div>
									<DeleteButton id={_.id} name={_.name} />
									<div className="py-6">
										<h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
											{_.category}
										</h2>
										<div className="flex justify-between  w-full">
											<h1 className="title-font text-lg font-medium text-gray-900 mb-3 truncate">
												{_.name}
											</h1>
											<h1 className="title-font text-lg font-medium text-gray-500 mb-3">
												₹{new Intl.NumberFormat("en-IN").format(_.price)}
											</h1>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</main>
	);
};

export default getProducts;
