import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./providers/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Psycho Allagan | Compagnie Libre FFXIV",
  description: "Site officiel de la compagnie libre Psycho Allagan sur Final Fantasy XIV. Rejoignez notre communauté et participez à nos événements!",
  keywords: ["FFXIV", "Final Fantasy XIV", "Free Company", "Compagnie Libre", "Psycho Allagan", "Jeu", "MMORPG", "Gaming"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ClientLayout>
            {children}
          </ClientLayout>
        </body>
    </html>
  );
}

