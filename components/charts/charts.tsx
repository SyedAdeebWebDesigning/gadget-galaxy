"use client";

import { Sun, Moon } from "lucide-react";
import React, { useState, useEffect } from "react";

const Chart = () => {
	const [width, setWidth] = useState(300);
	const [toggleTheme, setToggleTheme] = useState(true);

	// Function to handle width change
	const handleWidthChange = (newWidth: number) => {
		setWidth(newWidth);
	};

	useEffect(() => {
		// Function to handle window resize
		const handleResize = () => {
			const newWidth = window.innerWidth;
			handleWidthChange(newWidth);
		};

		// Attach event listener for window resize
		window.addEventListener("resize", handleResize);

		// Initial resize when component mounts
		handleResize();

		// Remove event listener when component unmounts
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const theme = toggleTheme === true ? "light" : "dark";

	const mongoChartURL = `https://charts.mongodb.com/charts-ggalaxy-pzpdt/embed/dashboards?id=65acae22-f981-470f-8440-91b2dbeec580&theme=${theme}&autoRefresh=true&maxDataAge=600&showTitleAndDesc=false&scalingWidth=scale&scalingHeight=scale`;
	return (
		<div
			className={`flex relative justify-center w-full overflow-y-hidden overflow-x-scroll items-center p-10 -mr-2 cursor-pointer ${
				theme === "light" ? "bg-slate-200" : "bg-slate-700"
			}`}>
			<div className="absolute top-3 right-3 cursor-pointer">
				{toggleTheme === true && (
					<Sun
						onClick={() => setToggleTheme(false)}
						className="cursor-pointer bg-slate-200 h-10 w-10 p-2 rounded-full"
					/>
				)}
				{toggleTheme === false && (
					<Moon
						onClick={() => setToggleTheme(true)}
						className="cursor-pointer bg-slate-800 text-gray-200 h-10 w-10 p-2 rounded-full"
					/>
				)}
			</div>
			<iframe
				width={width - 100}
				src={mongoChartURL}
				className="max-w-[1800px] h-[130vh] overflow-y-hidden scrollbar-hide"
			/>
		</div>
	);
};

export default Chart;
