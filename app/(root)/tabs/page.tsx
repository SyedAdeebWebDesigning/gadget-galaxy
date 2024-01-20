type Props = {
	searchParams: any;
};

const Tabs = ({ searchParams }: Props) => {
	let pageNo = parseInt(searchParams.page);
	return (
		<main className="container">
			<h3 className="text-4xl text-center my-10">Tabs</h3>
		</main>
	);
};

export default Tabs;
