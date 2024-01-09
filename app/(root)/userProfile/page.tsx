import { UserProfile } from "@clerk/nextjs";
import React from "react";

type Props = {};

const userProfile = (props: Props) => {
	return (
		<div className="flex justify-center mx-auto my-10">
			<UserProfile />
		</div>
	);
};

export default userProfile;
