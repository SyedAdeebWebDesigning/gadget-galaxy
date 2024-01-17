"use server";
import { connectToDB } from "../mongoose";
import Users from "../models/user.models";

/**
 * Fetches users from the database.
 *
 * @return {Promise<(typeof Users)[]>} The array of users.
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
 * @return {Promise<void>} - A promise that resolves when the user is successfully deleted.
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
 * @param {string} params.address - The address of the user.
 * @param {string} params.city - The city of the user.
 * @param {string} params.state - The state of the user.
 * @param {string} params.pinCode - The pin code of the user.
 * @return {Promise<void>} A promise that resolves when the user is added successfully.
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

/**
 * Fetches a user from the database by their ID.
 *
 * @param {string} userId - The ID of the user to fetch.
 * @return {Promise<User | undefined>} The fetched user object.
 */
export async function fetchUserById(
	userId: string
): Promise<typeof Users | undefined> {
	connectToDB();
	try {
		const user = await Users.findOne({ userId: userId });
		return user;
	} catch (error: any) {
		throw new Error(`Failed to fetch users: ${error.message}`);
	}
}

/**
 * Makes a user an admin.
 *
 * @param {string} userId - The ID of the user.
 * @return {Promise<void>} - A promise that resolves when the user is made an admin.
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
 * @return {Promise<void>} - A promise that resolves when the user is made a non-admin.
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
