import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { articles, isLang, Lang, ui } from "@/lib/content";

const groupedSections = [
  { id: "digital-investigations", category: "Digital Investigation" },
  { id: "fact-checks", category: "Fact Check" },
  { id: "opinions", category: "Opinion" },
] as const;

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang: Lang = isLang(params.lang) ? params.lang : "en";
  return {
    title: lang === "bn" ? "হোম" : "Home",
    description:
      lang === "bn"
        ? "সত্য, ন্যায়বিচার ও জাতীয় পরিচয়ের পক্ষে স্বাধীন ডিজিটাল প্ল্যাটফর্ম।"
        : "Independent digital platform for truth, justice, and national identity.",
    openGraph: {
      title: lang === "bn" ? "বাংলা Blockade" : "Bangla Blockade",
      description:
        lang === "bn"
          ? "অন্যায়ের বিরুদ্ধে ছাত্র-জনতার সংগঠিত কণ্ঠস্বর।"
          : "The organized voice of students and people standing against injustice.",
    },
  };
}

export default function HomePage({ params }: { params: { lang: string } }) {
  const lang: Lang = isLang(params.lang) ? params.lang : "en";
  const isBangla = lang === "bn";

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6">
      <section className="rounded-2xl bg-gradient-to-r from-[#026C33] to-[#014423] px-6 py-12 text-white md:px-10">
        <p className={`mb-3 text-sm font-semibold tracking-wide text-[#ffd4d4] ${isBangla ? "font-bn" : ""}`}>
          বাংলা Blockade
        </p>
        <h1 className={`text-4xl md:text-[44px] ${isBangla ? "font-bn font-bold" : "font-impact"}`}>
          {ui.heroTitle[lang]}
        </h1>
        <p className={`mt-4 max-w-3xl text-base md:text-lg ${isBangla ? "font-bn" : ""}`}>{ui.heroSubtitle[lang]}</p>
      </section>

      <section className="mt-10">
        <h2 className={`mb-5 text-3xl text-[#026C33] ${isBangla ? "font-bn font-bold" : "font-impact"}`}>
          {lang === "bn" ? "সাম্প্রতিক প্রতিবেদন" : "Latest Reports"}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.slug} article={article} lang={lang} />
          ))}
        </div>
      </section>

      {groupedSections.map((section) => (
        <section id={section.id} key={section.id} className="mt-14">
          <h2 className={`mb-5 text-3xl text-[#026C33] ${isBangla ? "font-bn font-bold" : "font-impact"}`}>
            {section.category === "Digital Investigation" && (lang === "bn" ? "ডিজিটাল অনুসন্ধান" : "Digital Investigations")}
            {section.category === "Fact Check" && (lang === "bn" ? "ফ্যাক্ট চেক" : "Fact Checks")}
            {section.category === "Opinion" && (lang === "bn" ? "মতামত" : "Opinions")}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {articles
              .filter((article) => article.category === section.category)
              .map((article) => (
                <ArticleCard key={article.slug} article={article} lang={lang} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
