import ToUser from "@/components/redirects/toUser";
import Banner from "@/components/shared/Banner";
import CardBanner from "@/components/shared/CardBanner";
import Exclusive from "@/components/shared/Exclusive";
import { Movies } from "@/components/shared/Movies";
import { fetchUserById } from "@/lib/actions/users.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
	const user: any = await currentUser();
	const mongoUser = await fetchUserById(user?.id);
	if (!mongoUser) {
		return <ToUser />;
	}
	return (
		<div>
			<div className="bg-gradient-to-br from-[#1b1b1b] via-[#1b1b1b] to-[#2b2b2b] -mt-40 md:pt-40">
				<Banner />
			</div>
			<CardBanner />
			<Exclusive />
			<Movies />
		</div>
	);
}
