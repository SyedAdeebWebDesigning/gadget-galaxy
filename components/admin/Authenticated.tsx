"use client";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {};

const Authenticated = (props: Props) => {
	const router = useRouter();
	router.push("/admin/get-products");
	return <div>Authenticated</div>;
};

export default Authenticated;
