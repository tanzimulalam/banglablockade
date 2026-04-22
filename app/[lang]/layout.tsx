import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { isLang, languages } from "@/lib/content";

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLang(params.lang)) {
    notFound();
  }

  return <SiteShell lang={params.lang}>{children}</SiteShell>;
}
