import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "./theme/theme";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
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
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
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
        className={`${inter.variable} ${jakarta.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
