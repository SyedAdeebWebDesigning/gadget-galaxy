import Image from "next/legacy/image";
import React from "react";

type Props = {};

const About = (props: Props) => (
	<main className="container">
		<h3 className="text-4xl text-center my-10">About Gadget Galaxy</h3>
		<div className="flex justify-center items-center">
			<Image
				src={"/GadgetGalaxy.png"}
				alt=""
				className="rounded-xl"
				width={1000}
				height={700}
				objectFit="contain"
			/>
		</div>
		<div>
			<h3 className="text-xl">
				Welcome to Gadget Galaxy, your one-stop destination for the latest and
				greatest in technology and innovation. At Gadget Galaxy, we curate a
				stellar collection of cutting-edge gadgets, electronics, and accessories
				to elevate your digital lifestyle. <br />
				<br />
				Discover a galaxy of possibilities with our extensive range of mobile
				phones, laptops, tablets, smartwatches, headphones, and more. Whether{" "}
				{"you're"} a tech enthusiast, a professional on the go, or someone who
				appreciates the seamless blend of style and functionality, Gadget Galaxy
				has something for everyone. <br /> <br /> Immerse yourself in a world
				where innovation meets convenience. Our carefully selected products
				showcase the pinnacle of technological advancements, ensuring you stay
				ahead in the fast-paced digital landscape.
			</h3>
			<br />
			<h3 className="font-semibold text-2xl">Why choose Gadget Galaxy?</h3>
			<ul className="list-disc">
				<div className="ml-20">
					<li className="">
						Curated Selection: We handpick the latest gadgets from top brands to
						offer you a curated and diverse product lineup.
					</li>
					<li>
						Quality Assurance: Every product at Gadget Galaxy undergoes rigorous
						quality checks, ensuring you receive only the best in class.
					</li>
					<li>
						Trendsetting Technology: Stay ahead of the curve with our
						trendsetting technology offerings, designed to enhance every aspect
						of your digital experience.
					</li>
				</div>
			</ul>
			<br />
			<h3 className="text-xl">
				<h3 className="text-xl">
					Whether {"you're"} shopping for the latest smartphone, upgrading your
					laptop, or searching for the perfect gift, Gadget Galaxy is your
					trusted partner in the ever-evolving world of technology. Explore the
					galaxy of gadgets and redefine your tech journey with us! <br />
					<br /> At Gadget Galaxy, the future is in your hands. Shop smart, shop
					savvy, and embark on a journey of limitless possibilities with Gadget
					Galaxy - Where Innovation Unleashes!
				</h3>
			</h3>
		</div>
	</main>
);

export default About;
