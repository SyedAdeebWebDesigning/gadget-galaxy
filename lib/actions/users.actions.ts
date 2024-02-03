"use server";
import { connectToDB } from "../mongoose";
import Users from "../models/user.models";

/**
 * Fetches users from the database.
 *
 * @return {Promise<typeof Users>[]} - A Promise resolving to an array of user objects.
 * @throws {Error} - If there is an error while fetching users.
 *
 * @example
 * ?Example usage:
 * try {
 *   const users = await fetchUsers();
 *   console.log('Users:', users);
 * } catch (error) {
 *   console.error('Error fetching users:', error.message);
 * }
 */
export async function fetchUsers(): Promise<(typeof Users)[]> {
	connectToDB();
	try {
		const users = await Users.find();
		return users;
	} catch (error: any) {
		throw new Error(`Failed to fetch users: ${error.message}`);
	}
}

/**
 * Deletes a user from the database.
 *
 * @param {string} userId - The ID of the user to delete.
 * @return {Promise<void>} - A Promise that resolves when the user is successfully deleted.
 * @throws {Error} - If there is an error while deleting the user.
 *
 * @example
 * ?Example usage:
 * try {
 *   await deleteUser('user123');
 *   console.log('User deleted successfully.');
 * } catch (error) {
 *   console.error('Error deleting user:', error.message);
 * }
 */
export async function deleteUser(userId: string): Promise<void> {
	try {
		await Users.deleteMany({
			userId,
		});
	} catch (error: any) {
		throw new Error(`Failed to delete user: ${error.message}`);
	}
}

/**
 * Adds a user to the database.
 *
 * @param {object} params - The parameters for adding a user.
 * @param {string} params.userId - The ID of the user.
 * @param {string} params.imgUrl - The URL of the user's image.
 * @param {string} params.email - The email of the user.
 * @param {string} params.fullName - The full name of the user.
 * @param {boolean} params.isAdmin - A flag indicating whether the user is an admin.
 * @param {string} params.address - The address of the user.
 * @param {string} params.city - The city of the user.
 * @param {string} params.state - The state of the user.
 * @param {string} params.pinCode - The pin code of the user.
 * @return {Promise<void>} - A Promise that resolves when the user is added successfully.
 * @throws {Error} - If there is an error while adding the user.
 *
 * @example
 * ?Example usage:
 * try {
 *   await addUser({
 *     userId: 'user123',
 *     imgUrl: 'https://example.com/user.jpg',
 *     email: 'user@example.com',
 *     fullName: 'John Doe',
 *     isAdmin: false,
 *     address: '123 Main St',
 *     city: 'CityVilla',
 *     state: 'StateVilla',
 *     pinCode: '12345',
 *   });
 *   console.log('User added successfully.');
 * } catch (error) {
 *   console.error('Error adding user:', error.message);
 * }
 */
export async function addUser({
	userId,
	imgUrl,
	email,
	fullName,
	isAdmin,
	address,
	city,
	state,
	pinCode,
}: {
	userId: string;
	imgUrl: string;
	email: string;
	fullName: string;
	isAdmin: boolean;
	address: string;
	city: string;
	state: string;
	pinCode: string;
}): Promise<void> {
	try {
		await Users.create({
			userId,
			imgUrl,
			email,
			fullName,
			isAdmin,
			address,
			city,
			state,
			pinCode,
		});
	} catch (error: any) {
		throw new Error(`Failed to add user: ${error.message}`);
	}
}

export async function editUser(
	{ id }: { id: string },
	{
		userId,
		imgUrl,
		email,
		fullName,
		isAdmin,
		address,
		city,
		state,
		pinCode,
	}: {
		userId: string;
		imgUrl: string;
		email: string;
		fullName: string;
		isAdmin: boolean;
		address: string;
		city: string;
		state: string;
		pinCode: string;
	}
): Promise<void> {
	try {
		await Users.findByIdAndUpdate(id, {
			userId,
			imgUrl,
			email,
			fullName,
			isAdmin,
			address,
			city,
			state,
			pinCode,
		});
	} catch (error: any) {
		throw new Error(`Failed to editing user: ${error.message}`);
	}
}

/**
 * Fetches a user from the database by their ID.
 *
 * @param {string} userId - The ID of the user to fetch.
 * @return {Promise<typeof Users | undefined>} - A Promise resolving to the fetched user object or undefined if not found.
 * @throws {Error} - If there is an error while fetching the user.
 *
 * @example
 * ?Example usage:
 * try {
 *   const user = await fetchUserById('user123');
 *   if (user) {
 *     console.log('Fetched user:', user);
 *   } else {
 *     console.log('User not found.');
 *   }
 * } catch (error) {
 *   console.error('Error fetching user:', error.message);
 * }
 */
export async function fetchUserById(
	userId: string
): Promise<typeof Users | undefined> {
	connectToDB();
	try {
		const user = await Users.findOne({ userId: userId });
		return user;
	} catch (error: any) {
		throw new Error(`Failed to fetch user: ${error.message}`);
	}
}

/**
 * Makes a user an admin.
 *
 * @param {string} userId - The ID of the user.
 * @return {Promise<void>} - A Promise that resolves when the user is successfully made an admin.
 * @throws {Error} - If there is an error while making the user an admin.
 *
 * @example
 * ?Example usage:
 * try {
 *   await makeAdmin('user123');
 *   console.log('User is now an admin.');
 * } catch (error) {
 *   console.error('Error making user admin:', error.message);
 * }
 */
export async function makeAdmin(userId: string): Promise<void> {
	try {
		const user = await Users.findOne({ userId: userId });

		if (!user) {
			throw new Error(`User not found with userId: ${userId}`);
		}

		user.isAdmin = true;
		await user.save();

		console.log(`User with userId ${userId} is now an admin.`);
	} catch (error: any) {
		throw new Error(`Failed to make user admin: ${error.message}`);
	}
}

/**
 * Makes a user a non-admin.
 *
 * @param {string} userId - The ID of the user.
 * @return {Promise<void>} - A Promise that resolves when the user is successfully made a non-admin.
 * @throws {Error} - If there is an error while making the user a non-admin.
 *
 * @example
 * ?Example usage:
 * try {
 *   await makeNonAdmin('user123');
 *   console.log('User is now a non-admin.');
 * } catch (error) {
 *   console.error('Error making user non-admin:', error.message);
 * }
 */
export async function makeNonAdmin(userId: string): Promise<void> {
	try {
		const user = await Users.findOne({ userId: userId });

		if (!user) {
			throw new Error(`User not found with userId: ${userId}`);
		}

		user.isAdmin = false;
		await user.save();

		console.log(`User with userId ${userId} is now a non-admin.`);
	} catch (error: any) {
		throw new Error(`Failed to make user non-admin: ${error.message}`);
	}
}
