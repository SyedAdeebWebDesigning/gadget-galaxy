"use server";
import { connectToDB } from "../mongoose";
import Exclusive from "../models/exclusive.models";

/**
 * Retrieves a list of products from the database.
 *
 * @return {Promise<Exclusive[]>} - A Promise resolving to an array of Exclusive objects representing the products.
 * @throws {Error} - If there is an error retrieving the products.
 *
 * @example
 * ?Example usage:
 * try {
 *   const products = await getProducts();
 *   console.log('Fetched products:', products);
 * } catch (error) {
 *   console.error('Error fetching products:', error.message);
 * }
 */
export async function getProducts(): Promise<(typeof Exclusive)[]> {
	try {
		await connectToDB();
		const products = await Exclusive.find();
		return products;
	} catch (error: any) {
		throw new Error(`Failed to fetch products: ${error.message}`);
	}
}

/**
 * Retrieves an exclusive product by its ID.
 *
 * @param {string} id - The ID of the product.
 * @return {Promise<Exclusive | null>} - A Promise resolving to the exclusive product with the specified ID, or null if not found.
 * @throws {Error} - If there is an error fetching the product.
 *
 * @example
 * ?Example usage:
 * try {
 *   const product = await getExclusiveProductById('product123');
 *   if (product) {
 *     console.log('Fetched product:', product);
 *   } else {
 *     console.log('Product not found.');
 *   }
 * } catch (error) {
 *   console.error('Error fetching product:', error.message);
 * }
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
 *
 * @param {object} product - The product object to be created.
 * @param {string} product.name - The name of the product.
 * @param {string} product.category - The category of the product.
 * @param {number} product.price - The price of the product.
 * @param {string} product.desc - The description of the product.
 * @param {string} product.imgUrl - The URL of the product image.
 * @param {string} product.primaryColor - The primary color of the product.
 * @param {string} product.secondaryColor - The secondary color of the product.
 * @throws {Error} - If there is an error creating the product.
 *
 * @example
 * ?Example usage:
 * try {
 *   await addProduct({
 *     name: 'Product Name',
 *     category: 'Exclusive',
 *     price: 499.99,
 *     desc: 'Description of the product.',
 *     imgUrl: 'https://example.com/exclusive-product.jpg',
 *     primaryColor: '#FF5733',
 *     secondaryColor: '#5A5A5A',
 *   });
 *   console.log('Product added successfully.');
 * } catch (error) {
 *   console.error('Error adding product:', error.message);
 * }
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
}): Promise<void> {
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
