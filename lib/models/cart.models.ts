import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
	{
		products: [
			{
				productId: String,
				name: String,
				price: Number,
				imgUrl: String,
				desc: String,
				qty: Number,
			},
		],
		userId: {
			type: String,
		},
	},
	{ timestamps: true }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
export default Cart;
