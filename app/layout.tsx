import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from './contexts/ThemeContext'
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap"
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sampayan Portfolio Management Solutions",
  description: "Effective Management of Large Projects",
  openGraph: {
    title: "Sampayan Portfolio Management Solutions",
    description: "Effective Management of Large Projects",
    type: "website",
    locale: "en_US",
    siteName: "GesSain",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sampayan Portfolio Management Solutions",
    description: "Effective Management of Large Projects",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
