"use client";
import React, { useState, useEffect } from "react";

const OrderChart = () => {
	const [width, setWidth] = useState(300);

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

	const mongoChartURL = `https://charts.mongodb.com/charts-ggalaxy-pzpdt/embed/charts?id=65acae22-f981-48d1-80a3-91b2dbeec596&maxDataAge=1800&autoRefresh=true`;
	return (
		<div className="flex justify-center w-full overflow-x-hidden">
			<iframe
				width={width - 100}
				height="480"
				src={mongoChartURL}
				className="max-w-[1000px]"
			/>
		</div>
	);
};

export default OrderChart;
