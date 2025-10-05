import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import "./styles/menu.css"
import "./styles/info.css"

const pressStart2P = Press_Start_2P({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-press-start-2p",
});

export const metadata: Metadata = {
  title: "Swipe & Go",
  description: "Travel app",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={pressStart2P.variable}>
                {children}
            </body>
        </html>
    );
}
