import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ClientLayout from "@/components/layout/ClientLayout";

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
            <body className={`${inter.className} bg-neutral-400 text-neutral-800`}>
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
