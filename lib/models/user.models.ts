import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
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
	isAdmin: {
		type: Boolean,
		default: false,
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
	pinCode: {
		type: String,
	},
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
