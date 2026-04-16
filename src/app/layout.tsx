import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Life Support | 健康解析・ライフプランニング",
  description: "AIによるプレミアムな健康解析とライフプランニング・コーチング",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="ja" className={inter.variable}>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
