import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/src/shared/styles/globals.css";

import { ClientLayout } from '@/src/shared/layout';
import QueryProvider from "@/src/shared/lib/QueryProvider";
import { ThemeProvider } from "@/src/shared/lib/ThemeProvider";

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
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} bg-neutral-400 text-neutral-800`}>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    var storageKey = 'vync-theme';
                                    var theme = localStorage.getItem(storageKey);
                                    var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
                                    if (theme === 'dark' || ((!theme || theme === 'system') && systemTheme)) {
                                        document.documentElement.classList.add('dark');
                                    } else {
                                        document.documentElement.classList.remove('dark');
                                    }
                                } catch (e) {}
                            })();
                        `,
                    }}
                />
                <ThemeProvider defaultTheme="system" storageKey="vync-theme">
                    <QueryProvider>
                        <ClientLayout>{children}</ClientLayout>
                    </QueryProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
