import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound({ params }: any) {
	return (
		<div className="flex items-center justify-center flex-col h-[59vh] bg-gray-200">
			<div className="text-5xl text-center">
				<h2 className="text-8xl my-2">404</h2>
				<h2>Whoops, Page Not Found</h2>
			</div>
			<Link href="/" className="mt-10">
				<Button variant={"secondary"}>Return Home</Button>
			</Link>
		</div>
	);
}
