"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/legacy/image";
import Link from "next/link";
import Plx from "react-plx";
export function Movies() {
	const plugin = React.useRef(
		Autoplay({ delay: 8000, stopOnInteraction: false })
	);
	const moviesDetails = [
		{
			title: "Berlin",
		},
		{
			title: "Saltburn",
		},
		{
			title: "Oppenheimer",
		},
		{
			title: "Spider-Man: Across the Spider-Verse",
		},
		{
			title: "Doctor Who",
		},
		{
			title: "The Hunger Games: The Ballad of Songbirds & Snakes",
		},
		{
			title: "What If...?",
		},
		{
			title: "Aquaman and the Lost Kingdom",
		},
	];

	const parallaxData = [
		{
			start: 0,
			end: 1000,
			properties: [
				{
					startValue: 0,
					endValue: 10,
					property: "rotate",
				},
				{
					startValue: 1,
					endValue: 0,
					property: "scale",
				},
			],
		},
	];
	return (
		<Link
			href={"https://adeflix-olive.vercel.app/"}
			className="relative z-30 "
			id="adeflix">
			<Carousel
				className="w-full flex items-center justify-center max-w-full"
				plugins={[plugin.current]}>
				<CarouselContent>
					{Array.from({ length: 8 }).map((_, index) => (
						<CarouselItem key={index}>
							<div className="">
								<Card>
									<CardContent className="flex flex-col items-center justify-center pt-10 mx-0">
										<div className="absolute top-10 flex items-center w-full justify-center ">
											<div className="flex flex-col w-full z-10 items-center bg-gradient-to-t  from-transparent to-[#1b1b1b]">
												<h3 className="text-center mt-4 w-full text-xl md:text-5xl py-10 z-10 text-white text-shadow-black">
													Watch Now on
													<br />
													<span className="text-[#DB202C] font-semibold">
														ADEFLIX
													</span>
												</h3>
											</div>
										</div>
										<div className="relative w-[100vw] h-[30vh] md:h-[100vh] flex items-center object-contain">
											<Image
												src={`/movies/movie-${index + 1}.webp`}
												alt=""
												layout="fill"
												objectFit="cover"
											/>
											<div className="absolute text-white bottom-0 left-0 bg-gradient-to-b from-transparent to-[#1b1b1b] w-full">
												<h3 className="text-3xl md:text-6xl py-10 pl-10 text-shadow-black truncate w-full">
													{moviesDetails[index].title}
												</h3>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</Link>
	);
}
