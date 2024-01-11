import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	// Define the properties of the Product model here
	// For example: productName: String, price: Number, etc.
});

const cartSchema = new mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		default: () => new mongoose.Types.ObjectId(),
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Products",
		},
	], // Assuming that each cart can have multiple products
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
export default Cart;
