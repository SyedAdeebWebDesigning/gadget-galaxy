"use server";
import Review from "../models/review.models";
import { connectToDB } from "../mongoose";

/**
 * Adds a new review to the system.
 *
 * @param {Object} params - The parameters for adding a review.
 * @param {string} params.userId - The ID of the user submitting the review.
 * @param {string} params.productId - The ID of the product being reviewed.
 * @param {string} params.imgUrl - The image of the reviewer.
 * @param {string} params.fullName - The full name of the reviewer.
 * @param {number} params.like - The rating or number of likes for the review.
 * @param {string} params.title - The title of the review.
 * @param {string} params.review - The detailed content of the review.
 * @returns {Promise<void>} - A Promise that resolves when the review is successfully added.
 * @throws {Error} - If there is an error during the review creation process.
 *
 * @example
 * ?Example usage:
 * try {
 *   const reviewData = {
 *     userId: 'user123',
 *     productId: 'product456',
 *     like: 4,
 *     title: 'Great Product!',
 *     review: 'I really loved using this product. It exceeded my expectations.',
 *     imgUrl: 'https://example.com/user_avatar.jpg',
 *     fullName: 'John Doe',
 *   };
 *
 *   await addReview(reviewData);
 *   console.log('Review added successfully.');
 * } catch (error) {
 *   console.error('Error adding review:', error.message);
 * }
 */
export async function addReview({
	userId,
	productId,
	like,
	title,
	review,
	imgUrl,
	fullName,
}: {
	userId: string;
	productId: string;
	like: number;
	title: string;
	review: string;
	imgUrl: string;
	fullName: string;
}): Promise<void> {
	connectToDB();
	try {
		await Review.create({
			userId,
			productId,
			like,
			title,
			review,
			imgUrl,
			fullName,
		});
	} catch (error: any) {
		throw new Error(`Error adding the review ${error.message}`);
	}
}

/**
 * Retrieves reviews for a specific product from the database.
 *
 * @param {object} params - The parameters for retrieving reviews.
 * @param {string} params.productId - The ID of the product for which reviews are to be fetched.
 * @param {number} params.pageNumber - The page number of reviews to retrieve.
 * @param {number} params.pageSize - The number of reviews to retrieve per page.
 * @return {Promise<Review[]>} - A Promise resolving to an array of Review objects representing the product reviews.
 * @throws {Error} - If there is an error retrieving the reviews.
 *
 * @example
 * ?Example usage:
 * try {
 *   const reviews = await getReview({
 *     productId: 'product123',
 *     pageNumber: 1,
 *     pageSize: 10,
 *   });
 *   console.log('Fetched reviews:', reviews);
 * } catch (error) {
 *   console.error('Error getting reviews:', error.message);
 * }
 */
export async function getReview({
	productId,
	pageNumber,
	pageSize,
}: {
	productId: string;
	pageNumber: number;
	pageSize: number;
}): Promise<(typeof Review)[]> {
	const skipAmount = (pageNumber - 1) * pageSize;
	try {
		const reviews = await Review.find({ productId: productId })
			.sort({ updatedAt: "desc" })
			.skip(skipAmount)
			.limit(pageSize);
		return reviews;
	} catch (error: any) {
		throw new Error("Error getting reviews: ", error.message);
	}
}
/**
 * Retrieves a user's review for a specific product.
 *
 * @param {Object} params - The parameters for retrieving the review.
 * @param {string} params.productId - The ID of the product.
 * @param {string} params.userId - The ID of the user.
 * @returns {Promise<(typeof Review) | null>} - A promise that resolves to the Review object if found, or null if not found.
 *
 * @example
 * ?Example usage:
 * try {
 *   const review = await getUserReview({
 *     userId: 'user123',            ? Replace with an actual user ID
 *     productId: 'product456',      ? Replace with an actual product ID
 *   });
 *
 *   ?Log the fetched review to the console
 *   if (review) {
 *     console.log('User Review Title:', review.title);
 *     console.log('Review Content:', review.review);
 *     console.log('Rating/Likes:', review.like);
 *     console.log('------------------------');
 *   } else {
 *     console.log('Review not found for the specified user and product.');
 *   }
 * } catch (error) {
 *   ?Handle errors if any occur during the process
 *   console.error('Error getting user review:', error.message);
 * }
 */
export async function getUserReview({
	productId,
	userId,
}: {
	productId: string;
	userId: string;
}): Promise<typeof Review | null> {
	try {
		// Using Review.findOne to retrieve a single review that matches the given productId and userId
		const review = await Review.findOne({
			productId: productId,
			userId: userId,
		});
		return review;
	} catch (error: any) {
		throw new Error("Error getting user review: " + error.message);
	}
}

/**
 * Counts the number of documents in the collection.
 *
 * @returns {Promise<number>} - A promise that resolves to the count of documents in the collection.
 *
 * @example
 * ?Example usage:
 * try {
 *   const documentCount = await countDocument();
 *   console.log('Number of documents in the collection:', documentCount);
 * } catch (error) {
 *   ?Handle errors if any occur during the process
 *   console.error('Error counting documents:', error.message);
 * }
 */
export async function countDocument(productId: string): Promise<number> {
	try {
		// Using the countDocuments method to get the count of documents in the collection
		const documentCount = await Review.countDocuments({ productId: productId });
		return documentCount;
	} catch (error: any) {
		throw new Error("Error counting documents: ", error.message);
	}
}

/**
 * Calculates the average number of likes for reviews of a specific product in the collection.
 *
 * @param {string} productId - The ID of the product for which to calculate the average likes.
 * @returns {Promise<number | null>} - A promise that resolves to the average number of likes for the specified product, or null if no reviews are available.
 *
 * @example
 * ?Example usage:
 * try {
 *   const productId = 'yourProductID'; // Replace with an actual product ID
 *   const averageLikes = await getAverageLikes(productId);
 *   if (averageLikes !== null) {
 *     console.log(`Average Likes for product ${productId}:`, averageLikes);
 *   } else {
 *     console.log(`No reviews available for product ${productId} to calculate average likes.`);
 *   }
 * } catch (error) {
 *   ?Handle errors if any occur during the process
 *   console.error('Error getting average likes:', error.message);
 * }
 */
export async function getAverageLikes(
	productId: string
): Promise<number | null> {
	try {
		// Using aggregation to calculate the average number of likes for a specific product
		const result = await Review.aggregate([
			{
				$match: {
					productId: productId,
				},
			},
			{
				$group: {
					_id: null,
					averageLikes: { $avg: "$like" },
				},
			},
		]);

		// Extracting the averageLikes value from the aggregation result
		const averageLikes = result[0]?.averageLikes || null;

		return averageLikes;
	} catch (error: any) {
		throw new Error("Error getting average likes: ", error.message);
	}
}

/**
 * Edits an existing review in the system.
 *
 * @param {Object} params - The parameters for editing a review.
 * @param {string} params.id - The ID of the review to be edited.
 * @param {string} params.userId - The ID of the user submitting the review.
 * @param {string} params.productId - The ID of the product being reviewed.
 * @param {string} params.imgUrl - The image of the reviewer.
 * @param {string} params.fullName - The full name of the reviewer.
 * @param {number} params.like - The updated rating or number of likes for the review.
 * @param {string} params.title - The updated title of the review.
 * @param {string} params.review - The updated detailed content of the review.
 * @returns {Promise<void>} - A Promise that resolves when the review is successfully edited.
 * @throws {Error} - If there is an error during the review editing process.
 *
 * @example
 * // Example usage:
 * try {
 *   const reviewId = 'yourReviewID'; // Replace with an actual review ID
 *   const updatedReviewData = {
 *     userId: 'user123',             // Replace with an actual user ID
 *     productId: 'product456',       // Replace with an actual product ID
 *     like: 5,                        // Updated rating or number of likes
 *     title: 'Updated Title',         // Updated title of the review
 *     review: 'Updated content...',   // Updated detailed content of the review
 *     imgUrl: 'https://example.com/updated_avatar.jpg',  // Updated image URL
 *     fullName: 'John Updated Doe',   // Updated full name of the reviewer
 *   };
 *
 *   await editReview({
 *     id: reviewId,
 *     ...updatedReviewData,
 *   });
 *
 *   console.log('Review edited successfully.');
 * } catch (error) {
 *   // Handle errors if any occur during the process
 *   console.error('Error editing review:', error.message);
 * }
 */
export async function editReview({
	id,
	userId,
	productId,
	like,
	title,
	review,
	imgUrl,
	fullName,
}: {
	id: string;
	userId: string;
	productId: string;
	like: number;
	title: string;
	review: string;
	imgUrl: string;
	fullName: string;
}): Promise<void> {
	try {
		// Find and update the existing review
		const updatedReview = await Review.findByIdAndUpdate(
			id,
			{
				userId,
				productId,
				like,
				title,
				review,
				imgUrl,
				fullName,
			},
			{ new: true } // Return the updated document
		);

		// Check if the review exists
		if (!updatedReview) {
			throw new Error(`Review not found with ID: ${id}`);
		}
	} catch (error: any) {
		throw new Error("Error editing review: " + error.message);
	}
}
