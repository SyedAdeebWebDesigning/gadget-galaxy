import ToUser from "@/components/redirects/toUser";
import Banner from "@/components/shared/Banner";
import CardBanner from "@/components/shared/CardBanner";
import Exclusive from "@/components/shared/Exclusive";
import { Movies } from "@/components/shared/Movies";
import { fetchUserById } from "@/lib/actions/users.actions";
import { currentUser } from "@clerk/nextjs";

import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("@/components/shared/Exclusive"), {
	ssr: false,
});

export default async function Home() {
	const user: any = await currentUser();
	const mongoUser = await fetchUserById(user?.id);
	if (!mongoUser) {
		return <ToUser />;
	}
	return (
		<div className="w-full bg-white">
			<div className="bg-gradient-to-br from-[#1b1b1b] via-[#1b1b1b]  to-[#2b2b2b] -mt-40 md:pt-40 w-full sticky top-0 z-0">
				<Banner />
			</div>
			<div className="sticky top-0 z-10 bg-white rounded-full">
				<div
					className="bg-white z-10 lg:rounded-t-[40px] rounded-t-3xl"
					id="card-banner">
					<CardBanner />
				</div>
				<div className="bg-gradient-to-t from-[#282828] to-[#272727] h-[80vh]  z-20 py-10 bg-white">
					<Exclusive />
				</div>
				<div className="z-30 bg-white">
					<Movies />
				</div>
			</div>
		</div>
	);
}
