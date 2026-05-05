import type { Metadata } from "next";
import { Antonio, Inter, Noto_Sans_Bengali, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const antonio = Antonio({
  variable: "--font-antonio",
  subsets: ["latin"],
});

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-noto-sans-bengali",
  subsets: ["bengali", "latin"],
});

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-noto-serif-bengali",
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
    <html
      lang="en"
      className={`${inter.variable} ${antonio.variable} ${notoSansBengali.variable} ${notoSerifBengali.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
