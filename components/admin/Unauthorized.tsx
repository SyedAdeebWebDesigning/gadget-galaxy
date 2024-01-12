import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

type Props = {};

const Unauthorized = (props: Props) => {
	return (
		<div className="flex items-center justify-center flex-col h-[59vh] bg-gray-200">
			<div className="text-5xl text-center">
				<h2 className="text-8xl my-2 animate-bounce transition-all  ease-in-out">
					403
				</h2>
				<h2 className="animate-bounce">You are not Authorized</h2>
			</div>
			<Link href="/" className="mt-10">
				<Button variant={"secondary"}>Return Home</Button>
			</Link>
		</div>
	);
};

export default Unauthorized;
