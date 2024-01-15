"use client";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {};

const ToUser = (props: Props) => {
	const router = useRouter();
	router.push("/onboarding");
	return <div></div>;
};

export default ToUser;
