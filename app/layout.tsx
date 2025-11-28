import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import RightSidebar from "@/components/RightSidebar";
import BottomNav from "@/components/BottomNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Vync",
    description: "Social media dashboard",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-white text-gray-900`}>
                <div className="flex justify-center min-h-screen pb-14 sm:pb-0">
                    <div className="flex w-full max-w-[1265px]">
                        <Sidebar />
                        <main className="flex-1 sm:ml-[275px] min-h-screen flex border-x border-gray-100">
                            {children}
                        </main>
                        <RightSidebar />
                    </div>
                    <BottomNav />
                </div>
            </body>
        </html>
    );
}
