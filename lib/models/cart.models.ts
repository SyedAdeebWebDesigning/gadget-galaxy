import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
	{
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			default: () => new mongoose.Types.ObjectId(),
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
	},
	{ timestamps: true }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
export default Cart;
