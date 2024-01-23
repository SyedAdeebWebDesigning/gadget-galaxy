"use server";

// Import necessary dependencies and modules
import Order from "../models/orders.models"; // Assuming Order model is defined in a separate file
import { clearCart, fetchOrders, fetchUserCartLength } from "./cart.actions"; // Import relevant cart actions

export async function addOrders({
	userId,
	email,
	name,
	address,
	city,
	state,
	totalAmount,
	paymentStatus,
	orderStatus,
}: {
	userId: string;
	email: string;
	name: string;
	address: string;
	city: string;
	state: string;
	paymentStatus: string;
	orderStatus: string;
	totalAmount: number;
}): Promise<void> {
	try {
		// Fetch products from the user's cart
		const cartProducts: any = await fetchOrders(userId);
		console.log("Cart", cartProducts);

		const cart = cartProducts.map((product: any) => ({
			productId: product.productId,
			name: product.name,
			imgUrl: product.imgUrl,
			price: product.price,
			qty: product.qty,
		}));

		await Order.create({
			userId,
			email,
			cart,
			name,
			address,
			city,
			state,
			totalAmount,
			paymentStatus,
			orderStatus,
		});

		// Save the order to the database

		// Clear the user's cart after placing the order
		// await clearCart(userId);
	} catch (error: any) {
		throw new Error(`Error adding the order: ${error.message}`);
	}
}
