import Banner from "@/components/shared/Banner";
import CardBanner from "@/components/shared/CardBanner";
import Exclusive from "@/components/shared/Exclusive";

export default function Home() {
	return (
		<div>
			<div className="bg-gradient-to-br from-[#1b1b1b] via-[#1b1b1b] to-[#2b2b2b] -mt-40 md:pt-40">
				<Banner />
			</div>
			<CardBanner />
			<Exclusive />
		</div>
	);
}
