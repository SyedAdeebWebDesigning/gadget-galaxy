import Users from "@/components/form/Users";
import { fetchUserById } from "@/lib/actions/users.actions";
import { currentUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

type Props = {};

const Page = async (props: Props) => {
	const user = await currentUser();
	const userData: string | any = {
		userId: user?.id,
		imgUrl: user?.imageUrl,
		email: user?.emailAddresses[0].emailAddress,
		fullName: user?.firstName + " " + user?.lastName,
	};
	const mongoUser: string | any = await fetchUserById(userData.userId);
	let isPresent = false;
	if (mongoUser) {
		isPresent = true;
	}

	return (
		<main className="">
			<Users userData={userData} mongoUser={mongoUser} isPresent={isPresent}/>
		</main>
	);
};

export default Page;
