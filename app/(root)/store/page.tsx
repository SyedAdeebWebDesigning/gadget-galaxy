import StoreProducts from "@/components/shared/StoreProducts";
type Props = {
	searchParams: any;
};

const Store = ({ searchParams }: Props) => {
	let pageNo = parseInt(searchParams.page);
	return (
		<main className="container">
			<h3 className="text-4xl text-center my-10">Store</h3>
			<StoreProducts pageNo={pageNo} />
		</main>
	);
};

export default Store;
