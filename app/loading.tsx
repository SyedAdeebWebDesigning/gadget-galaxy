import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

const Loading = (props: Props) => {
	return (
		<section className="text-gray-600 body-font">
			<div className="container px-5 py-24 mx-auto">
				<div className="flex flex-wrap -m-4 animate-pulse">
					<div className="p-4 md:w-1/3">
						<div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
							<Skeleton />
							<div className="p-6">
								<h2 className="tracking-widest text-xs title-font font-medium bg-gray-400 mb-1 h-10 "></h2>
							</div>
						</div>
					</div>
					<div className="p-4 md:w-1/3">
						<div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
							<Skeleton />
							<div className="p-6">
								<h2 className="tracking-widest text-xs title-font font-medium bg-gray-400 mb-1 h-10 "></h2>
							</div>
						</div>
					</div>
					<div className="p-4 md:w-1/3">
						<div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
							<Skeleton />
							<div className="p-6">
								<h2 className="tracking-widest text-xs title-font font-medium bg-gray-400 mb-1 h-10 "></h2>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Loading;
