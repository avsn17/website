import type { Metadata } from "next";
import { Cormorant_Garamond, Work_Sans } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Mystical Gardens — grow your focus",
  description:
    "A gamified focus timer. Start a session, watch your garden grow, guided by Moonlight the Butterfly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-[#14101f]">{children}</body>
    </html>
  );
}

