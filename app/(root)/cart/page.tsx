import CartPage from "@/components/shared/CartPage";
import {
	calculateCartSubtotal,
	fetchUserCart,
	fetchUserCartLength,
} from "@/lib/actions/cart.actions";
import { currentUser } from "@clerk/nextjs";
import React from "react";

type Props = {};

const page = async ({
	searchParams,
}: {
	searchParams: { page: number | any };
}) => {
	const user: any = await currentUser();
	const userId: any = user?.id;
	const pageNo = parseInt(searchParams.page);
	const pageSize = 2;
	const cart: any = await fetchUserCart(userId, pageNo, pageSize);
	const countNumber: number | any = await fetchUserCartLength(user?.id);
	const count = countNumber.products.length;
	console.log(Object(countNumber.products));

	const totalPages = Math.ceil(parseInt(count) / pageSize);
	const maxPages = Math.min(totalPages, 3);
	const subTotal = await calculateCartSubtotal(user?.id);

	return (
		<div>
			<h4 className="text-center text-3xl my-10">
				Review your cart {count.length}
			</h4>
			<CartPage
				cart={cart}
				maxPages={maxPages}
				totalPages={totalPages}
				pageNo={pageNo}
				subTotal={subTotal}
				userId={userId}
			/>
		</div>
	);
};

export default page;
