import NavBar from "@/components/shared/NavBar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider, currentUser } from "@clerk/nextjs";
import Footer from "@/components/shared/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Gadget Galaxy",
	description: "Generated by create next app",
	icons: "/logo.png",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const userData = await currentUser();
	return (
		<html lang="en" suppressHydrationWarning className="overflow-x-auto">
			<ClerkProvider>
				<body className={inter.className}>
					<ToastContainer
						position="top-right"
						stacked
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="light"
					/>
					<NavBar />
					{children}
					<Footer />
				</body>
			</ClerkProvider>
		</html>
	);
}
