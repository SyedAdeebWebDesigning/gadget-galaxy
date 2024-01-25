"use client";

import { motion } from "framer-motion";
import { FaTruck } from "react-icons/fa";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";

interface Props {
	order: any;
}

export const Progress = ({ order }: Props) => {
	const bar =
		order === "placed"
			? "10%"
			: order === "processing"
			? "40%"
			: order === "shipped"
			? "70%"
			: "100%";
	return (
		<div className="w-full mx-2  bg-gray-300 h-4 rounded-full">
			<motion.div
				initial={{ width: "0%" }}
				animate={{ width: bar }}
				whileTap={{ width: "100%", scaleX: 1, scaleY: 1 }}
				transition={{ duration: 2.7, easings: ["easeInOut"] }}
				className={` transition-all duration-200 ease-linear bg-gradient-to-r from-indigo-500 to-purple-500  h-4 rounded-full relative z-20`}>
				<HoverCard>
					<HoverCardTrigger>
						<FaTruck className="absolute -right-4  w-10 top-[50%] bottom-[50%] z-30 h-10 -translate-y-[50%] text-indigo-800 cursor-pointer border-white border-l-4 rounded-[12px]" />
					</HoverCardTrigger>
					<HoverCardContent className="absolute top-10 translate-x-[70%] -z-10">
						Hold me :)
					</HoverCardContent>
				</HoverCard>
			</motion.div>
		</div>
	);
};
