import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
  const featured = articles[0];
  const topStories = articles.slice(1, 5);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
        <div className="mb-4 inline-flex items-center rounded-md bg-[#F31B1D]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#c81012]">
          {lang === "bn" ? "শীর্ষ প্রতিবেদন" : "Top Story"}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="overflow-hidden rounded-xl border border-slate-200">
            <div className="relative aspect-[16/9]">
              <Image src={featured.image} alt={featured.title[lang]} fill className="object-cover" sizes="100vw" />
            </div>
            <div className="p-5 md:p-6">
              <h1 className={`text-4xl leading-tight md:text-[44px] ${isBangla ? "font-bn font-bold" : "font-en-display font-bold"}`}>
                {ui.heroTitle[lang]}
              </h1>
              <p className={`mt-3 text-base text-slate-700 md:text-lg ${isBangla ? "font-bn" : ""}`}>{ui.heroSubtitle[lang]}</p>
            </div>
          </article>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 md:p-5">
            <h2 className={`mb-3 text-2xl text-[#026C33] ${isBangla ? "font-bn font-bold" : "font-en-display font-bold"}`}>
              {lang === "bn" ? "সাম্প্রতিক আপডেট" : "Latest Updates"}
            </h2>
            <div className="space-y-4">
              {topStories.map((story) => (
                <article key={story.slug} className="border-b border-slate-200 pb-3 last:border-none last:pb-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#c81012]">{story.category}</p>
                  <Link
                    href={`/${lang}/articles/${story.slug}`}
                    className={`mt-1 block text-base font-semibold leading-snug text-slate-800 hover:text-[#F31B1D] ${
                      isBangla ? "font-bn" : ""
                    }`}
                  >
                    {story.title[lang]}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className={`mb-5 border-l-4 border-[#F31B1D] pl-3 text-3xl text-[#1a1f1b] ${isBangla ? "font-bn font-bold" : "font-en-display font-bold"}`}>
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
          <h2
            className={`mb-5 border-l-4 border-[#F31B1D] pl-3 text-3xl text-[#1a1f1b] ${
              isBangla ? "font-bn font-bold" : "font-en-display font-bold"
            }`}
          >
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
