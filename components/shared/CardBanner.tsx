import Image from "next/legacy/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { fetchFeaturedProducts } from "@/lib/actions/product.actions";
import Card from "./Card";

type Props = {};

const CardBanner = async (props: Props) => {
	const featuredProducts = await fetchFeaturedProducts();
	return (
		<section className="container my-10 z-0 sticky top-0">
			<h1 className="text-center text-4xl py-10">Featured Products</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 place-items-center">
				{featuredProducts.slice(0, 4).map((featuredProduct: any, i: number) => {
					return <Card featuredProduct={featuredProduct} key={i} />;
				})}
			</div>
		</section>
	);
};

export default CardBanner;
