import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./theme/theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReceiptGold - Transform Your Receipts Into Digital Gold",
  description: "Never lose a receipt again! ReceiptGold helps you track expenses effortlessly with smart digital receipt management. Coming soon to iOS and Android.",
  keywords: ["receipt management", "expense tracking", "digital receipts", "mobile app", "tax preparation", "business expenses"],
  authors: [{ name: "ReceiptGold Team" }],
  openGraph: {
    title: "ReceiptGold - Coming Soon",
    description: "Transform your receipts into digital gold. The ultimate expense tracking app coming to iOS and Android.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReceiptGold - Coming Soon",
    description: "Never lose a receipt again! Smart expense tracking coming soon.",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#d97706",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
