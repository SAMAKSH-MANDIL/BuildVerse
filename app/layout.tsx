import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from 'react-hot-toast';
import { BackgroundTask } from "svix/dist/api/backgroundTask";

const GA_MEASUREMENT_ID = "G-PEQ9ZRXBBZ";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const anton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "BuildVerse Hackathon - LNCT Bhopal",
  description:
    "National Level 30-Hour Deep Tech Hackathon by KLIC-AIIC in collaboration with LNCT Group Hackathon Club and HighKernel at LNCT Campus, Bhopal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable}`}>
      <head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body>
        <ClerkProvider>
          <Toaster position="top-right" />
          <ClientWrapper>{children}</ClientWrapper>
        </ClerkProvider>
      </body>
    </html>
  );
}
