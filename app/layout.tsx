import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://banglablockade.com"),
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
    <html lang="en" className={`${roboto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
