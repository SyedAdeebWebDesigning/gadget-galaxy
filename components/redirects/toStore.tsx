"use client";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {};

const ToStore = (props: Props) => {
	const router = useRouter();
	router.push("/store");
	return <div></div>;
};

export default ToStore;
