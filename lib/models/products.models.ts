const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		default: () => new mongoose.Types.ObjectId(),
	},
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
	cartId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Cart",
	},
});

const Products =
	mongoose.models.Products || mongoose.model("Products", productSchema);
export default Products;
