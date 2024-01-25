"use server";

// Import necessary dependencies and modules
import Order from "../models/orders.models"; // Assuming Order model is defined in a separate file
import Product from "../models/products.models";
import { clearCart, fetchOrders } from "./cart.actions"; // Import relevant cart actions

export async function addOrders({
	orderId,
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
	orderId: string;
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
		const cartProducts: any = await fetchOrders(userId);

		const cart = cartProducts.map((product: any) => ({
			productId: product.productId,
			name: product.name,
			imgUrl: product.imgUrl,
			price: product.price,
			qty: product.qty,
		}));

		await Order.create({
			orderId,
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
		await clearCart(userId);
	} catch (error: any) {
		throw new Error(`Error adding the order: ${error.message}`);
	}
}

export async function fetchOrderById(orderId: string): Promise<any[]> {
	try {
		const orders: any = await Order.findOne({ orderId: orderId });
		return orders;
	} catch (error: any) {
		throw new Error(`Error fetching orders by IDs: ${error.message}`);
	}
}

export async function fetchOrdersByUserId(userId: string) {
	try {
		const orders = await Order.find({ userId: userId });
		return orders;
	} catch (error: any) {
		console.error("Error:", error.message);
	}
}
