"use server";
import { connectToDB } from "../mongoose";
import Exclusive from "../models/exclusive.models";

/**
 * Retrieves a list of products from the database.
 *
 * @return {Promise<Exclusive[]>} An array of Exclusive objects representing the products.
 * @throws {Error} If there is an error retrieving the products.
 */
export async function getProducts(): Promise<(typeof Exclusive)[]> {
	try {
		await connectToDB();
		const products = await Exclusive.find();
		return products;
	} catch (error: any) {
		throw new Error(`Failed to fetch product: ${error.message}`);
	}
}

/**
 * Retrieves an exclusive product by its ID.
 *
 * @param {string} id - The ID of the product.
 * @return {Promise<Product | null>} The exclusive product with the specified ID, or null if not found.
 */
export async function getExclusiveProductById(
	id: string
): Promise<typeof Exclusive | null> {
	try {
		await connectToDB();
		const product = await Exclusive.findOne({ id: id });
		return product;
	} catch (error: any) {
		throw new Error(`Failed to fetch product: ${error.message}`);
	}
}

/**
 * Creates a new product in the database.
 * @param {object} product - The product object to be created.
 * @param {string} product.name - The name of the product.
 * @param {string} product.category - The category of the product.
 * @param {number} product.price - The price of the product.
 * @param {string} product.desc - The description of the product.
 * @param {string} product.imgUrl - The URL of the product image.
 * @param {string} product.primaryColor - The primary color of the product.
 * @param {string} product.secondaryColor - The secondary color of the product.
 * @throws {Error} If there is an error creating the product.
 */
export async function addProduct({
	name,
	category,
	price,
	desc,
	imgUrl,
	primaryColor,
	secondaryColor,
}: {
	name: string;
	category: string;
	price: number;
	desc: string;
	imgUrl: string;
	primaryColor: string;
	secondaryColor: string;
}) {
	try {
		await Exclusive.create({
			name,
			category,
			price,
			desc,
			imgUrl,
			primaryColor,
			secondaryColor,
		});
	} catch (error: any) {
		throw new Error(`Failed to create/update product: ${error.message}`);
	}
}
