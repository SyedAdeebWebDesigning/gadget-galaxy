"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Props = {};

const Authenticated = (props: Props) => {
	const router = useRouter();
	router.push("/admin/get-products");
	return (
		<div className="text-center flex justify-center items-center min-h-[60vh] space-x-4">
			<div className="animate-spin rounded-full w-10 h-10">
				<Image src={"/loader.webp"} width={"100"} height={"100"} alt="" />
			</div>
			<h3 className="text-4xl">Please Wait</h3>
		</div>
	);
};

export default Authenticated;
