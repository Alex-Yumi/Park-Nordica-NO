import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { StripeProvider } from "@/context/StripeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tier- und Abenteuerland Namsskogan",
  description: "Tier- und Abenteuerland Namsskogan - Ihr Abenteuerpark in Norwegen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
            <StripeProvider>
          {children}
            </StripeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
