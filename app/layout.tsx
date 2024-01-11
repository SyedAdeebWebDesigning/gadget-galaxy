import NavBar from "@/components/shared/NavBar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
import Footer from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Gadget Galaxy",
	description: "Generated by create next app",
	icons: "/logo.png",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<ClerkProvider>
				<body className={inter.className}>
					<NavBar />
					{children}
					<Footer />
				</body>
			</ClerkProvider>
		</html>
	);
}