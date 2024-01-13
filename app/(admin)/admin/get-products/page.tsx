import React from "react";
import { currentUser } from "@clerk/nextjs";
import SideBar from "@/components/admin/SideBar";
import Unauthorized from "@/components/admin/Unauthorized";
import { fetchProducts } from "@/lib/actions/product.actions";
import Image from "next/image";
import DeleteButton from "@/components/admin/DeleteButton";

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

	const products = await fetchProducts();
	// console.log(`products ${products[0]}`);

	return (
		<main className="grid grid-flow-row cols">
			<SideBar fullName={fullName} userImg={userImg} />
			<section className="text-gray-600 body-font">
				<div className="container px-5 py-24 mx-auto">
					<h3 className="text-center text-4xl mb-10">All Products</h3>
					<div className="flex flex-wrap -m-4 items-center justify-center">
						{products.map((_, i) => (
							<div className="p-4 md:w-1/3" key={i}>
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
									<div className="p-6">
										<h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
											{_.category}
										</h2>
										<h1 className="title-font text-lg font-medium text-gray-900 mb-3">
											{_.name}
										</h1>
										<p className="leading-relaxed mb-3 truncate w-full">
											{_.desc}
										</p>
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
