"use server";
import { connectToDB } from "../mongoose";
import Product from "../models/products.models";

/**
 * Creates a new product in the database.
 *
 * @param {object} product - The product object to be created.
 * @param {string} product.name - The name of the product.
 * @param {string} product.category - The category of the product.
 * @param {number} product.price - The price of the product.
 * @param {string} product.desc - The description of the product.
 * @param {string} product.imgUrl - The URL of the product image.
 * @param {boolean} product.isFeatured - A flag indicating whether the product is featured.
 * @throws {Error} - If there is an error creating the product.
 *
 * @example
 * ?Example usage:
 * try {
 *   await addProduct({
 *     name: 'Product Name',
 *     category: 'Electronics',
 *     price: 299.99,
 *     desc: 'Description of the product.',
 *     imgUrl: 'https://example.com/product.jpg',
 *     isFeatured: true,
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
	isFeatured,
}: {
	name: string;
	category: string;
	price: number;
	desc: string;
	imgUrl: string;
	isFeatured: boolean;
}): Promise<void> {
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
 * @return {Promise<typeof Product>[]} - A Promise resolving to an array of Product objects representing the products.
 * @throws {Error} - If there is an error fetching the products.
 *
 * @example
 * ?Example usage:
 * try {
 *   const products = await fetchProducts(1, 10);
 *   console.log('Fetched products:', products);
 * } catch (error) {
 *   console.error('Error fetching products:', error.message);
 * }
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
 * Fetches a list of products from the database.
 *
 * @return A Promise resolving to an array of Product objects representing the products.
 * @throws {Error} - If there is an error fetching the products.
 *
 * @example
 * ?Example usage:
 * try {
 *   const products = await fetchAllProducts();
 *   console.log('Fetched products:', products);
 * } catch (error) {
 *   console.error('Error fetching products:', error.message);
 * }
 */
export async function fetchAllProducts() {
	try {
		const products = await Product.find();
		return products;
	} catch (error: any) {
		throw new Error(`Failed to fetch products: ${error.message}`);
	}
}

/**
 * Fetches a product from the database by its ID.
 *
 * @param {string} id - The ID of the product to fetch.
 * @return {Promise<typeof Product>} - A Promise resolving to the fetched Product object.
 * @throws {Error} - If there is an error fetching the product.
 *
 * @example
 * ?Example usage:
 * try {
 *   const product = await fetchProductByID('product123');
 *   console.log('Fetched product:', product);
 * } catch (error) {
 *   console.error('Error fetching product:', error.message);
 * }
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
 * Fetches products from the database with the same category, excluding the one with the specified ID.
 *
 * @param {object} params - The parameters for fetching products by category.
 * @param {string} params.category - The category of the products to fetch.
 * @param {string} params.id - The ID of the product to exclude from the results.
 * @return {Promise<typeof Product>[]} - A Promise resolving to an array of Product objects.
 * @throws {Error} - If there is an error fetching the products.
 *
 * @example
 * ?Example usage:
 * try {
 *   const products = await fetchProductByCategory({
 *     category: 'Electronics',
 *     id: 'product123',
 *   });
 *   console.log('Fetched products by category:', products);
 * } catch (error) {
 *   console.error('Error fetching products by category:', error.message);
 * }
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
		throw new Error(`Failed to fetch products by category: ${error.message}`);
	}
}

/**
 * Deletes a product with the given productId.
 *
 * @param {string} productId - The ID of the product to be deleted.
 * @return {Promise<void>} - A Promise that resolves when the product is successfully deleted.
 * @throws {Error} - If there is an error deleting the product.
 *
 * @example
 * ?Example usage:
 * try {
 *   await deleteProduct('product123');
 *   console.log('Product deleted successfully.');
 * } catch (error) {
 *   console.error('Error deleting product:', error.message);
 * }
 */
export async function deleteProduct(productId: string): Promise<void> {
	try {
		await Product.deleteMany({
			_id: productId,
		});
	} catch (error: any) {
		throw new Error(`Failed to delete product: ${error.message}`);
	}
}

/**
 * Fetches featured products from the database.
 *
 * @return {Promise<typeof Product>[]} - A Promise resolving to an array of featured Product objects.
 * @throws {Error} - If there is an error fetching featured products.
 *
 * @example
 * ?Example usage:
 * try {
 *   const featuredProducts = await fetchFeaturedProducts();
 *   console.log('Fetched featured products:', featuredProducts);
 * } catch (error) {
 *   console.error('Error fetching featured products:', error.message);
 * }
 */
export async function fetchFeaturedProducts(): Promise<(typeof Product)[]> {
	try {
		const products = await Product.find({ isFeatured: true });
		return products;
	} catch (error: any) {
		throw new Error(`Failed to fetch featured products: ${error.message}`);
	}
}

/**
 * Counts the number of documents in the products collection.
 *
 * @return {Promise<number>} - A Promise resolving to the count of documents in the products collection.
 * @throws {Error} - If there is an error counting the documents.
 *
 * @example
 * ?Example usage:
 * try {
 *   const count = await countDocument();
 *   console.log('Number of documents:', count);
 * } catch (error) {
 *   console.error('Error counting documents:', error.message);
 * }
 */
export async function countDocument(): Promise<number> {
	try {
		const count = await Product.countDocuments();
		return count;
	} catch (error: any) {
		throw new Error(`Failed to count documents: ${error.message}`);
	}
}
