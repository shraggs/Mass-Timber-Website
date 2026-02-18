import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { BackToTop } from "@/components/ui/BackToTop";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "IW Mass Timber | Ironworker Precision in Mass Timber Construction",
    template: "%s | IW Mass Timber",
  },
  description:
    "The leading network of Ironworker contractors, suppliers, and projects for mass timber construction across North America.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.variable} ${inter.variable} antialiased grain-overlay`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ChatWidget />
        <BackToTop />
      </body>
    </html>
  );
}
