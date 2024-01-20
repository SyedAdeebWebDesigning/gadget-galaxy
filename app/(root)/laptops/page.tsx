type Props = {
	searchParams: any;
};

const Laptops = ({ searchParams }: Props) => {
	let pageNo = parseInt(searchParams.page);
	return (
		<main className="container">
			<h3 className="text-4xl text-center my-10">Laptops</h3>
		</main>
	);
};

export default Laptops;
