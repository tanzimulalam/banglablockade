import type { Metadata } from "next";
import { Noticia_Text, Tiro_Bangla } from "next/font/google";
import "./globals.css";

const noticiaText = Noticia_Text({
  variable: "--font-noticia-text",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const tiroBangla = Tiro_Bangla({
  variable: "--font-tiro-bangla",
  weight: ["400"],
  subsets: ["bengali", "latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tanzimulalam.github.io/banglablockade"),
  title: {
    default: "Bangla Blockade | বাংলা Blockade",
    template: "%s | Bangla Blockade",
  },
  description:
    "Bangla Blockade is an independent digital platform amplifying truth, justice, and national identity.",
  openGraph: {
    title: "Bangla Blockade | বাংলা Blockade",
    description:
      "The organized voice of students and people standing against injustice, discrimination, and oppression.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/bangla-blockade-logo.png",
        width: 1200,
        height: 630,
        alt: "Bangla Blockade logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${noticiaText.variable} ${tiroBangla.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
