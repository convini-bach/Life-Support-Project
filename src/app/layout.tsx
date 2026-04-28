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
        <head>
          {/* Google tag (gtag.js) */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-EXEME65E1P"></script>
          <script dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-EXEME65E1P');
            `
          }} />
          <script
            async
            src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
            crossOrigin="anonymous"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.googletag = window.googletag || {cmd: []};
                window.addEventListener('load', () => {
                  if (window.googletag && window.googletag.apiReady) {
                    document.dispatchEvent(new CustomEvent('gpt-ready'));
                  }
                });
              `
            }}
          />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9373474554936490"
            crossOrigin="anonymous"
          />
        </head>
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
