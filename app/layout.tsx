import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "THE KAGE — Premium Anime Streetwear",
  description:
    "Premium anime-inspired streetwear drops. Oversized tees, acid-wash finishes, and limited edition collections. Free delivery all over India.",
  keywords: ["anime streetwear", "oversized tees", "acid wash", "THE KAGE", "anime clothing India"],
  openGraph: {
    title: "THE KAGE — Premium Anime Streetwear",
    description: "Oversized tees, acid-wash finishes, and limited drops designed for the culture.",
    siteName: "THE KAGE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-sans">
        <Providers>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
