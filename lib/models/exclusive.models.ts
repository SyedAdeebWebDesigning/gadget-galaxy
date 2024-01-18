import mongoose from "mongoose";

const exclusiveSchema = new mongoose.Schema({
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
	primaryColor: {
		type: String,
	},
	secondaryColor: {
		type: String,
	},
	imgUrl: {
		type: String,
	},
	category: {
		type: String,
	},
});

const Exclusive =
	mongoose.models.Exclusive || mongoose.model("Exclusive", exclusiveSchema);
export default Exclusive;
