import CategoriesProducts from "@/components/shared/CategoriesProducts";
type Props = {
	searchParams: any;
};

const Store = ({ searchParams }: Props) => {
	let pageNo = parseInt(searchParams.page);
	return (
		<main className="container">
			<h3 className="text-4xl text-center my-10">Headphones</h3>
			<CategoriesProducts pageNo={pageNo} category={"Headphones"} />
		</main>
	);
};

export default Store;
