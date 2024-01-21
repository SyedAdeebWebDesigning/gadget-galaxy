import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
			unique: true,
		},
		productId: {
			type: String,
			required: true,
		},
		like: {
			type: Number,
			default: 1,
		},
		title: {
			type: String,
			default: "",
		},
		review: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true }
);

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);
export default Review;
