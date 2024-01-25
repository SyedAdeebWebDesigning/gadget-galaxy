"use server";
import Cart from "../models/cart.models";

/**
 * Adds products to the user's cart or creates a new cart if it doesn't exist.
 *
 * @param {string} userId - The ID of the user.
 * @param {Array} products - An array of products to add to the cart, each with a quantity.
 * @returns {Promise<void>} - A Promise that resolves when the products are added to the cart.
 * @throws {Error} - If there is an error during the process.
 *
 * @example
 * ?Example usage:
 * try {
 *   const userId = 'user123'; // Replace with an actual user ID
 *   const productsToAdd = [
 *     {
 *       productId: 'product1',
 *       name: 'Product 1',
 *       price: 29.99,
 *       imgUrl: 'product1.jpg',
 *       desc: 'Description of Product 1',
 *       qty: 2, // Replace with the desired quantity
 *     },
 *     ?Add more products as needed
 *   ];
 *   await addProductsToCart(userId, productsToAdd);
 *   console.log('Products added to the cart successfully.');
 * } catch (error) {
 *   console.error('Error adding products to the cart:', error.message);
 * }
 */
export async function addProductsToCart(
	userId: string,
	products: [
		{
			productId: string;
			name: string;
			price: number;
			imgUrl: string;
			desc: string;
			qty: number;
		}
	]
): Promise<void> {
	try {
		// Check if the user's cart already exists
		let cart: any = await Cart.findOne({ userId });

		// If the cart doesn't exist, create a new one
		if (!cart) {
			cart = new Cart({ userId, products: [] });
		}

		// Iterate through each product and add to the cart
		for (const product of products) {
			// Check if the product with the same productId already exists in the cart
			const existingProductIndex = cart.products.findIndex(
				(p: any) => p.productId === product.productId
			);

			if (existingProductIndex !== -1) {
				// If the product exists, update the quantity
				cart.products[existingProductIndex].qty += product.qty;
			} else {
				// If the product doesn't exist, add it to the cart
				cart.products.push(product);
			}
		}

		// Save the updated cart
		await cart.save();
	} catch (error: any) {
		throw new Error("Error adding products to the cart: " + error.message);
	}
}

/**
 * Fetches a paginated user cart based on the provided user ID, page number, and page size.
 *
 * @param {string} userId - The ID of the user for whom to fetch the cart.
 * @param {number} pageNumber - The page number of the cart to retrieve.
 * @param {number} pageSize - The number of items per page in the cart.
 * @returns {Promise<(typeof Cart)[]>} - A Promise that resolves to a paginated array of cart items.
 *
 * @example
 * ?Example usage:
 * try {
 *   const userId = 'user123'; // Replace with an actual user ID
 *   const pageNumber = 1;
 *   const pageSize = 10;
 *   const paginatedCart = await fetchUserCart(userId, pageNumber, pageSize);
 *
 *   ?Log the fetched paginated cart to the console
 *   console.log('Paginated Cart:', paginatedCart);
 * } catch (error) {
 *   ?Handle errors if any occur during the process
 *   console.log('Error fetching user cart:', error.message);
 * }
 */
export async function fetchUserCart(
	userId: string,
	pageNumber: number,
	pageSize: number
): Promise<(typeof Cart)[] | undefined> {
	try {
		const cart = await Cart.findOne({ userId: userId });

		if (!cart) {
			throw new Error("Cart not found for the specified user.");
		}

		// Access the 'products' property and calculate the starting index for the slice
		const startIndex = (pageNumber - 1) * pageSize;

		// Get a slice of the 'products' array based on pagination
		const paginatedCart: any = cart?.products
			.slice(startIndex, startIndex + pageSize)
			.map((product: any) => product.toObject()); // Convert Mongoose document to plain JavaScript object
		const finalCart: any = { paginatedCart, cart };
		return finalCart;
	} catch (error: any) {
		console.log("Error fetching the cart: " + error.message);
	}
}

/**
 * Fetches the total number of items in the user's cart based on the provided user ID.
 *
 * @param {string} userId - The ID of the user for whom to fetch the cart length.
 * @returns {Promise<number>} - A Promise that resolves to the total number of items in the user's cart.
 * @throws {Error} - If there is an error during the cart length fetching process.
 *
 * @example
 * ?Example usage:
 * try {
 *   const userId = 'user123'; // Replace with an actual user ID
 *   const cartLength = await fetchUserCartLength(userId);
 *
 *   ?Log the fetched cart length to the console
 *   console.log('Cart Length:', cartLength);
 * } catch (error) {
 *   ?Handle errors if any occur during the process
 *   console.error('Error fetching cart length:', error.message);
 * }
 */
export async function fetchUserCartLength(
	userId: string
): Promise<(typeof Cart)[]> {
	try {
		const cart = await Cart.findOne({ userId: userId });
		return cart;
	} catch (error: any) {
		throw new Error("Error fetching cart length: " + error.message);
	}
}

/**
 * Calculates the subtotal of items in the user's cart based on the provided user ID.
 *
 * @param {string} userId - The ID of the user for whom to calculate the cart subtotal.
 * @returns {Promise<number>} - A Promise that resolves to the subtotal of items in the user's cart.
 * @throws {Error} - If there is an error during the subtotal calculation process.
 *
 * @example
 * ?Example usage:
 * try {
 *   const userId = 'user123'; // Replace with an actual user ID
 *   const subtotal = await calculateCartSubtotal(userId);
 *
 *   ?Log the calculated subtotal to the console
 *   console.log('Cart Subtotal:', subtotal);
 * } catch (error) {
 *   ?Handle errors if any occur during the process
 *   console.error('Error calculating cart subtotal:', error.message);
 * }
 */
export async function calculateCartSubtotal(userId: string): Promise<number> {
	try {
		const userCart = await Cart.findOne({ userId: userId });

		if (!userCart || !userCart.products || userCart.products.length === 0) {
			// If the cart or products array is undefined or empty, return 0 as the subtotal
			return 0;
		}

		// Calculate the subtotal by summing the prices of all items in the cart
		const subtotal = userCart.products.reduce(
			(total: number | any, product: number | any) =>
				total + (product.price * product.qty || 0),
			0
		);

		return subtotal;
	} catch (error: any) {
		throw new Error("Error calculating cart subtotal: " + error.message);
	}
}
/**
 * Increases the quantity of a specific product in the user's cart.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} productId - The ID of the product to increase the quantity.
 * @param {number} quantity - The quantity to increase by.
 * @returns {Promise<void>} - A Promise that resolves when the quantity is successfully increased.
 * @throws {Error} - If there is an error during the process.
 *
 * @example
 * // Example usage:
 * try {
 *   const userId = 'user123'; // Replace with an actual user ID
 *   const productId = 'product456'; // Replace with an actual product ID
 *   const quantity = 1; // The quantity to increase by
 *
 *   await increaseProductQuantity(userId, productId, quantity);
 *   console.log('Product quantity increased successfully.');
 * } catch (error) {
 *   console.error('Error increasing product quantity:', error.message);
 * }
 */
export async function increaseProductQuantity({
	userId,
	productId,
	quantity,
}: {
	userId: string;
	productId: string;
	quantity: number;
}): Promise<void> {
	try {
		const userCart = await Cart.findOne({ userId: userId });

		if (!userCart) {
			throw new Error("Cart not found for the specified user.");
		}

		// Find the product in the cart by productId
		const productIndex = userCart.products.findIndex(
			(product: any) => product.productId === productId
		);

		if (productIndex === -1) {
			throw new Error(`Product with ID ${productId} not found in the cart.`);
		}

		// Update the quantity of the product
		userCart.products[productIndex].qty += quantity;

		// Save the updated cart
		await userCart.save();
	} catch (error: any) {
		throw new Error("Error increasing product quantity: " + error.message);
	}
}

/**
 * Decreases the quantity of a specific product in the user's cart.
 * If the quantity reaches zero, removes the product from the cart.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} productId - The ID of the product to decrease the quantity.
 * @param {number} quantity - The quantity to decrease by.
 * @returns {Promise<void>} - A Promise that resolves when the quantity is successfully decreased.
 * @throws {Error} - If there is an error during the process.
 *
 * @example
 * ?Example usage:
 * try {
 *   const userId = 'user123'; // Replace with an actual user ID
 *   const productId = 'product456'; // Replace with an actual product ID
 *   const quantity = 1; // The quantity to decrease by
 *
 *   await removeProductQty(userId, productId, quantity);
 *   console.log('Product quantity removed successfully.');
 * } catch (error) {
 *   console.error('Error removing product quantity:', error.message);
 * }
 */
export async function removeProductQty({
	userId,
	productId,
	quantity,
}: {
	userId: string;
	productId: string;
	quantity: number;
}): Promise<void> {
	try {
		const userCart = await Cart.findOne({ userId: userId });

		if (!userCart) {
			throw new Error("Cart not found for the specified user.");
		}

		// Find the product in the cart by productId
		const productIndex = userCart.products.findIndex(
			(product: any) => product.productId === productId
		);

		if (productIndex === -1) {
			throw new Error(`Product with ID ${productId} not found in the cart.`);
		}

		// Decrease the quantity of the product
		userCart.products[productIndex].qty -= quantity;

		// If the quantity reaches zero, remove the product from the cart
		if (userCart.products[productIndex].qty <= 0) {
			userCart.products.splice(productIndex, 1);
		}

		// Save the updated cart
		await userCart.save();
	} catch (error: any) {
		throw new Error("Error removing product quantity: " + error.message);
	}
}

/**
 * Clears the user's cart by setting the products array to an empty array.
 *
 * @param {string} userId - The ID of the user whose cart needs to be cleared.
 * @returns {Promise<void>} - A Promise that resolves when the cart is successfully cleared.
 * @throws {Error} - If there is an error during the cart clearing process.
 *
 * @example
 * ?Example usage:
 * const userId = 'user123'; // Replace with the actual user ID
 * try {
 *   await clearCart(userId);
 *   console.log('Cart cleared successfully.');
 * } catch (error) {
 *   console.error('Error clearing cart:', error.message);
 * }
 */
export async function clearCart(userId: any): Promise<void> {
	try {
		// Find the user's cart
		await Cart.findOneAndDelete({ userId });
	} catch (error: any) {
		throw new Error(`Error clearing cart: ${error.message}`);
	}
}

/**
 * Fetches the orders for a specific user.
 *
 * @param {string} userId - The ID of the user for whom to fetch orders.
 * @returns {Promise<Array<{
 *   productId: string;
 *   name: string;
 *   imgUrl: string;
 *   price: number;
 *   quantity: number;
 * }>>} - A Promise that resolves with an array of ordered products, or an empty array if no orders are found.
 * @throws {Error} - If there is an error during the fetch process.
 *
 * @example
 * ?Example usage:
 * try {
 *   const orders = await fetchOrders('user123');
 *   console.log('User orders:', orders);
 * } catch (error) {
 *   console.error('Error fetching orders:', error.message);
 * }
 */

/**
 * Fetches the orders from the user's cart based on the provided userId.
 *
 * @param {string} userId - The unique identifier of the user.
 * @returns {Promise<Array<{
 *   productId: string;
 *   name: string;
 *   imgUrl: string;
 *   price: number;
 *   quantity: number;
 * }>>} - A promise that resolves to an array of order items with specific properties.
 * @throws {Error} - If there is an error during the fetching process.
 * @example
 * try {
 *   const userId = "user_123";
 *   const userOrders = await fetchOrders(userId);
 *
 *   if (userOrders.length > 0) {
 *     console.log("User orders:", userOrders);
 *     ?Process the user's orders, e.g., display them on a webpage
 *   } else {
 *     console.log("No orders found for the user.");
 *     ?Handle the case where the user has no orders
 *   }
 * } catch (error) {
 *   console.error("Error:", error.message);
 *   ?Handle the error, e.g., display an error message to the user
 * }
 */
export async function fetchOrders(userId: string): Promise<
	Array<{
		productId: string;
		name: string;
		imgUrl: string;
		price: number;
		quantity: number;
	}>
> {
	try {
		const cart = await Cart.findOne({ userId: userId });
		if (cart) {
			return cart.products; // Assuming 'products' is the property in the cart object
		} else {
			return []; // Return an empty array if the cart is not found
		}
	} catch (error: any) {
		throw new Error("Error fetching orders: " + error.message);
	}
}

/**
 * Fetches the cart ID for a given user ID.
 *
 * @param {string} userId - The unique identifier for the user.
 * @returns {Promise<Array<null>>} - A promise that resolves to an array containing the cart object.
 *   Returns an empty array if no cart is found.
 *
 * @throws {Error} - Throws an error if there's an issue fetching the cart ID.
 *
 * @example
 * try {
 *   const userId = "user_123";
 *   const userCart = await fetchCartId(userId);
 *
 *   if (userCart.length > 0) {
 *     console.log("User cart ID:", userCart[0]._id);
 *     ?Process the user's cart ID, e.g., use it to retrieve the cart details
 *   } else {
 *     console.log("No cart found for the user.");
 *     ?Handle the case where the user has no cart
 *   }
 * } catch (error) {
 *   console.error("Error:", error.message);
 *   ?Handle the error, e.g., display an error message to the user
 * }
 */
export async function fetchCartId(userId: string): Promise<Array<null>> {
	try {
		const cart = await Cart.findOne({ userId: userId });

		return cart; // Assuming 'products' is the property in the cart object
	} catch (error: any) {
		throw new Error("Error fetching orders: " + error.message);
	}
}
