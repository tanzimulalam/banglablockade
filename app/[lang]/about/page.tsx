import type { Metadata } from "next";
import { getEditablePage } from "@/lib/cms-content";
import { isLang, Lang } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang: Lang = isLang(params.lang) ? params.lang : "en";
  const aboutPage = getEditablePage("about");
  return {
    title: aboutPage.title[lang],
    description: aboutPage.description[lang],
  };
}

export default function AboutPage({ params }: { params: { lang: string } }) {
  const lang: Lang = isLang(params.lang) ? params.lang : "en";
  const isBangla = lang === "bn";
  const aboutPage = getEditablePage("about");

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-10">
      <h1 className={`text-4xl md:text-[44px] text-[var(--color-secondary-green)] ${isBangla ? "font-bn-heading font-bold" : "font-en-display font-bold"}`}>
        {aboutPage.title[lang]}
      </h1>
      <p className={`mt-5 text-base md:text-lg text-[var(--color-text-secondary)] ${isBangla ? "font-bn" : ""}`}>
        {aboutPage.description[lang]}
      </p>

      <div className="mt-8 rounded-xl bg-white p-6 shadow-sm border border-[var(--color-border)]">
        <p className={`${isBangla ? "font-bn" : ""}`}>{aboutPage.body[lang]}</p>
      </div>
    </section>
  );
}
