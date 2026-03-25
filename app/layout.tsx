import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // title: "FoodHub - Votre resto préféré, à portée de main",
  title: "FoodHub Tunisie",
  description: "Découvrez les meilleurs restaurants tunisiens près de chez vous",
  icons: {
    icon: "/foodhub-logo.png",
    shortcut: "/foodhub-logo.png",
    apple: "/foodhub-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      // lang="en"
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* <body className="min-h-full flex flex-col">{children}</body> */}
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
