import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { jaJP } from "@clerk/localizations";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Life Support | 健康解析・ライフプランニング",
  description: "AIによるプレミアムな健康解析とライフプランニング・コーチング",
};

import { Providers } from "@/components/Providers";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={jaJP}>
      <html className={inter.variable}>
        <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Providers>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {children}
            </div>
            <Footer />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
