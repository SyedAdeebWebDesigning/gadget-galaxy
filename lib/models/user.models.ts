import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		default: () => new mongoose.Types.ObjectId(),
	},
	email: {
		type: String,
		required: true,
	},
	imgUrl: {
		type: String,
	},
	fullName: {
		type: String,
	},
	address: {
		type: String,
	},
	city: {
		type: String,
	},
	state: {
		type: String,
	},
	pincode: {
		type: Number,
	},
	cart: [
		{ type: mongoose.Schema.Types.ObjectId, ref: "Cart", required: false },
	], // Assuming that the user can have multiple items in the cart
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
