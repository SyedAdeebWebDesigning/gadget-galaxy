import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	desc: {
		type: String,
	},
	imgUrl: {
		type: String,
	},
	category: {
		type: String,
	},
	// cartId: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: "Cart",
	// },
});

const Product =
	mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
