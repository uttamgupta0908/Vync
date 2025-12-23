import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/src/shared/styles/globals.css";

import { ClientLayout } from '@/src/shared/layout';
import QueryProvider from "@/src/shared/lib/QueryProvider";

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
                <QueryProvider>
                    <ClientLayout>{children}</ClientLayout>
                </QueryProvider>
            </body>
        </html>
    );
}
