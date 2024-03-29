"use client";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";

const Star = ({ stars, setLike }: { stars: number; setLike: any }) => {
	const ratingStar = Array.from({ length: 5 }, (elem, index) => {
		let number = index + 0.5;
		return (
			<div
				className="text-sm cursor-pointer h-full"
				onClick={() => setLike(index + 1)}
				key={index}>
				{stars >= index + 1 ? (
					<FaStar className=" h-10 w-6 text-yellow-500" />
				) : stars >= number ? (
					<FaStarHalfAlt className=" h-10 w-6 text-yellow-500" />
				) : (
					<AiOutlineStar className=" h-10 w-6 text-yellow-500" />
				)}
			</div>
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

export default Star;
