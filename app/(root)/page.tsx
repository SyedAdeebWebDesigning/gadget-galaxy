import Banner from "@/components/shared/Banner";
import CardBanner from "@/components/shared/CardBanner";

export default function Home() {
	return (
		<div>
			<div className="bg-[#1b1b1b] -mt-40 md:pt-40">
				<Banner />
			</div>
			<CardBanner />
		</div>
	);
}
