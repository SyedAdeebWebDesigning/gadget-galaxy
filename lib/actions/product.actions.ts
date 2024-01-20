"use server";
import prisma from "@/prisma/prisma";
import { connectToDB } from "../mongoose";
import Product from "../models/products.models";

/**
 * Creates a new product in the database.
 * @param {object} product - The product object to be created.
 * @param {string} product.name - The name of the product.
 * @param {string} product.category - The category of the product.
 * @param {number} product.price - The price of the product.
 * @param {string} product.desc - The description of the product.
 * @param {string} product.imgUrl - The URL of the product image.
 * @throws {Error} If there is an error creating the product.
 */
export async function addProduct({
	name,
	category,
	price,
	desc,
	imgUrl,
	isFeatured,
}: {
	name: string;
	category: string;
	price: number;
	desc: string;
	imgUrl: string;
	isFeatured: boolean;
}) {
	try {
		await Product.create({
			name,
			category,
			price,
			desc,
			imgUrl,
			isFeatured,
		});
	} catch (error: any) {
		throw new Error(`Failed to create/update product: ${error.message}`);
	}
}

/**
 * Fetches a list of products from the database.
 *
 * @param {number} pageNumber - The page number to fetch.
 * @param {number} pageSize - The number of products to fetch per page.
 * @return {Promise<(typeof Product)[]>} An array of Product objects representing the products.
 * @throws {Error} If there is an error fetching the products.
 */
export async function fetchProducts(
	pageNumber: number,
	pageSize: number
): Promise<(typeof Product)[]> {
	const skipAmount = (pageNumber - 1) * pageSize;
	connectToDB();
	try {
		const products = await Product.find().skip(skipAmount).limit(pageSize);
		return products;
	} catch (error: any) {
		throw new Error(`Failed to fetch products: ${error.message}`);
	}
}

/**
 * Fetch the Product by its ID
 *
 * @param {string} id - The ID of the Product
 * @returns {Promise<(typeof Product)>} A Product object
 */
export async function fetchProductByID(id: string): Promise<typeof Product> {
	try {
		const product = await Product.findById(id);
		return product;
	} catch (error: any) {
		throw new Error(`Failed to fetch product: ${error.message}`);
	}
}
/**
 * Fetch the Product by its ID
 *
 * @param {string} category - The ID of the Product
 * @param {string} id - The ID of the Product
 * @returns {Promise<(typeof Product[])>} An array of Product objects with same category.
 */
export async function fetchProductByCategory({
	category,
	id,
}: {
	category: string;
	id: string;
}): Promise<(typeof Product)[]> {
	try {
		const products = await Product.find({
			category: category,
			_id: { $ne: id }, // Exclude documents with the specified id
		});
		return products;
	} catch (error: any) {
		throw new Error(`Failed to fetch product: ${error.message}`);
	}
}

/**
 * Deletes a product with the given productId.
 *
 * @param {string} productId - The id of the product to be deleted.
 * @return {Promise<void>} - A promise that resolves when the product is successfully deleted.
 */
export async function deleteProduct(productId: string): Promise<void> {
	try {
		await Product.deleteMany({
			id: productId,
		});
	} catch (error: any) {
		throw new Error(`Failed to delete product: ${error.message}`);
	}
}

/**
 * Fetches the featured products.
 *
 * @return {Promise<any>} - Returns a promise that resolves to an array of featured products.
 */
export async function fetchFeaturedProducts(): Promise<any> {
	try {
		const products = await Product.find({ isFeatured: true });
		return products;
	} catch (error: any) {
		throw new Error(`Failed to fetch featured products: ${error.message}`);
	}
}

export async function countDocument() {
	try {
		const count = await Product.countDocuments();
		return count;
	} catch (error: any) {
		throw new Error(`Failed to fetch featured products: ${error.message}`);
	}
}
