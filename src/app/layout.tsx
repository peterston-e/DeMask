import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "DeMask | Painting & Decorating Price Calculator",
	description:
		"A revolutionary new way to calculate the price of painting and decorating services based on simple room dimensions.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} flex items-start justify-between`}>
				<Sidebar />
				<main className="w-full h-full pl-[300px]">
					<Header />
					{children}
				</main>
			</body>
		</html>
	);
}
