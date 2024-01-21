import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
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
		createdAt: {
			type: String,
		},
		imgUrl: {
			type: String,
		},
		category: {
			type: String,
		},
		isFeatured: {
			type: Boolean,
		},
	},
	{ timestamps: true }
);

const Product =
	mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
