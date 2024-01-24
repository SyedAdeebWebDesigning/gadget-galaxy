import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	productId: { type: String },
	name: { type: String },
	imgUrl: { type: String },
	price: { type: Number },
	qty: { type: Number },
});

const orderSchema = new mongoose.Schema(
	{
		orderId: { type: String },
		userId: { type: String },
		email: { type: String },
		name: { type: String },
		address: { type: String },
		city: { type: String },
		state: { type: String },
		totalAmount: {
			type: Number,
			required: true,
		},
		cart: [productSchema], // Change here to use the productSchema
		paymentStatus: {
			type: String,
			enum: ["pending", "completed"],
			default: "pending",
		},
		orderStatus: {
			type: String,
			enum: ["processing", "shipped", "delivered"],
			default: "processing",
		},
	},
	{ timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
