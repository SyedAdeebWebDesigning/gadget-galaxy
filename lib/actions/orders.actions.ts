"use server";
import Order from "../models/orders.models"; // Assuming Order model is defined in a separate file
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
		const orders = await Order.find({ userId: userId }).sort({
			createdAt: "desc",
		});
		return orders;
	} catch (error: any) {
		console.error("Error:", error.message);
	}
}
export async function fetchAllOrders() {
	try {
		const orders = await Order.find().sort({ createdAt: "desc" });
		return orders;
	} catch (error: any) {
		console.error("Error:", error.message);
	}
}

export async function updateOrderStatus(orderId: string, newStatus: string) {
	try {
		// Find the order by ID
		const order = await Order.findById(orderId);

		// Check if the order exists
		if (!order) {
			throw new Error("Order not found");
		}

		// Update the order status
		order.orderStatus = newStatus;

		// Save the updated order
		await order.save();

		// Return the updated order
		return order;
	} catch (error: any) {
		throw new Error(`Error updating order status: ${error.message}`);
	}
}
