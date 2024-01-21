"use client";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";

const Stars = ({ stars, h, w }: { stars: number; h?: number; w?: number }) => {
	const ratingStar = Array.from({ length: 5 }, (elem, index) => {
		let number = index + 0.5;
		debugger;
		return (
			<span key={index} className="text-sm space-y-2">
				{stars >= index + 1 ? (
					<FaStar
						className={`${h !== undefined ? `h-[${h}]px` : "h-10 mt-3"} ${
							w ? `w-[${w}]px` : "w-6 my-3"
						} text-yellow-500 `}
					/>
				) : stars >= number ? (
					<FaStarHalfAlt
						className={`${h !== undefined ? `h-[${h}]px` : "h-10 mt-3"} ${
							w ? `w-[${w}]px` : "w-6 my-3"
						} text-yellow-500 `}
					/>
				) : (
					<AiOutlineStar
						className={`${h !== undefined ? `h-[${h}]px` : "h-10 mt-3"} ${
							w ? `w-[${w}]px` : "w-6 my-3"
						} text-yellow-500 `}
					/>
				)}
			</span>
		);
	});

	return (
		<Wrapper>
			<div className="icon-style h-7 text-sm">{ratingStar}</div>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	.icon-style {
		display: flex;
		gap: 0.2rem;
		align-items: center;
		justify-content: flex-start;

		.icon {
			color: orange;
		}
		p {
			margin: 0;
			padding-left: 1.6rem;
		}
	}
`;

export default Stars;
