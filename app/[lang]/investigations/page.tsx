import type { Metadata } from "next";
import Link from "next/link";
import { articles, categoryLabel, isLang, Lang } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang: Lang = isLang(params.lang) ? params.lang : "en";
  return {
    title: lang === "bn" ? "অনুসন্ধান" : "Investigations",
    description: lang === "bn" ? "দীর্ঘমেয়াদি অনুসন্ধানী প্রতিবেদন।" : "Long-form investigative reports.",
  };
}

export default function InvestigationsPage({ params }: { params: { lang: string } }) {
  const lang: Lang = isLang(params.lang) ? params.lang : "en";
  const isBangla = lang === "bn";
  const investigationArticles = articles.filter((article) => article.category === "Digital Investigation");

  return (
    <section className="mx-auto w-full content-width px-4 py-10 md:px-6">
      <h1 className={`text-4xl md:text-[44px] ${isBangla ? "font-bn-heading font-bold" : "font-en-display font-bold"}`}>
        {isBangla ? "অনুসন্ধান" : "Investigations"}
      </h1>
      <p className={`mt-4 text-[var(--color-text-secondary)] ${isBangla ? "font-bn" : ""}`}>
        {isBangla ? "টাইমলাইন, প্রমাণ, ও সূত্রসহ দীর্ঘ আকারের অনুসন্ধানী প্রতিবেদন।" : "Long-form investigations with timeline-driven evidence and source transparency."}
      </p>
      <div className="mt-8 space-y-4">
        {investigationArticles.map((article) => (
          <article key={article.slug} className="rounded-lg border border-[var(--color-border)] bg-white p-5">
            <p className="text-sm text-[var(--color-secondary-green)]">{categoryLabel[article.category][lang]}</p>
            <h2 className={`mt-2 text-2xl ${isBangla ? "font-bn-heading font-semibold" : "font-en-display font-semibold"}`}>{article.title[lang]}</h2>
            <p className={`mt-2 ${isBangla ? "font-bn" : ""}`}>{article.excerpt[lang]}</p>
            <Link href={`/${lang}/articles/${article.slug}`} className="mt-3 inline-block text-sm font-semibold text-[var(--color-secondary-green)]">
              {isBangla ? "পড়ুন" : "Read report"}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
