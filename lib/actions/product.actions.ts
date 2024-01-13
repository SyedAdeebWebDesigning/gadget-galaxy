"use server";
import prisma from "@/prisma/prisma";

export async function addProduct({
	name,
	category,
	price,
	desc,
	imgUrl,
}: {
	name: string;
	category: string;
	price: number;
	desc: string;
	imgUrl: string;
}) {
	try {
		await prisma.product.create({
			data: {
				name,
				category,
				price,
				desc,
				imgUrl,
			},
		});
	} catch (error: any) {
		throw new Error(`Failed to create/update product: ${error.message}`);
	}
}

export async function fetchProducts() {
	try {
		const products = await prisma.product.findMany();
		return products;
	} catch (error: any) {
		throw new Error(`Failed to fetch products: ${error.message}`);
	}
}

export async function deleteProduct(productId: string) {
	try {
		await prisma.product.delete({
			where: {
				id: productId,
			},
		});
	} catch (error: any) {
		throw new Error(`Failed to delete product: ${error.message}`);
	}
}
