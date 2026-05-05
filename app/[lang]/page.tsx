import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { categoryLabel, getArticles, isLang, Lang } from "@/lib/content";

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

export default async function HomePage({ params }: { params: { lang: string } }) {
  const lang: Lang = isLang(params.lang) ? params.lang : "en";
  const isBangla = lang === "bn";
  const articles = await getArticles();
  if (articles.length === 0) {
    return (
      <div className="mx-auto w-full content-width px-4 py-16 md:px-6">
        <section className="rounded-xl border border-[var(--color-border)] bg-white p-8 text-center">
          <h1 className={`text-3xl ${isBangla ? "font-bn-heading font-bold" : "font-en-display font-bold"}`}>
            {isBangla ? "কনটেন্ট পাওয়া যায়নি" : "No content available"}
          </h1>
          <p className={`mt-3 text-[var(--color-text-secondary)] ${isBangla ? "font-bn" : ""}`}>
            {isBangla
              ? "ডাটাবেজে প্রকাশিত কনটেন্ট পাওয়া যায়নি। অনুগ্রহ করে Supabase ডেটা যাচাই করুন।"
              : "No published records were found in the database. Please verify Supabase data."}
          </p>
        </section>
      </div>
    );
  }
  const featuredInvestigation = articles.find((article) => article.category === "Digital Investigation") ?? articles[0];
  const latestFactChecks = articles.filter((article) => article.category === "Fact Check").slice(0, 4);
  const latestReports = articles.slice(0, 6);

  return (
    <div className="mx-auto w-full content-width px-4 py-8 md:px-6">
      <section className="grid gap-6 rounded-xl border border-[var(--color-border)] bg-white p-5 md:grid-cols-[1.2fr_0.8fr] md:p-7">
        <div>
          <p className={`text-sm uppercase tracking-wide text-[var(--color-secondary-green)] ${isBangla ? "font-bn" : ""}`}>
            {isBangla ? "ধরন: অনুসন্ধানী সাংবাদিকতা" : "Investigative Media Outlet"}
          </p>
          <h1 className={`mt-3 text-4xl leading-tight md:text-5xl ${isBangla ? "font-bn-heading font-bold" : "font-en-display font-bold"}`}>
            {isBangla ? "সত্য উদঘাটন, বিভ্রান্তি প্রতিরোধ" : "Uncovering the Truth, Combating Disinformation"}
          </h1>
          <p className={`mt-4 text-[var(--color-text-secondary)] ${isBangla ? "font-bn" : ""}`}>
            {isBangla
              ? "ঢাকাভিত্তিক ডিজিটাল অনুসন্ধানী সংবাদমাধ্যম; আমরা প্রমাণ, সূত্র ও পদ্ধতিকে কেন্দ্র করে যাচাইভিত্তিক প্রতিবেদন প্রকাশ করি।"
              : "A Dhaka-based investigative digital newsroom publishing verification-first reporting with transparent sourcing and clear methodology."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/${lang}/articles/misinformation-campaign-targets-national-unity`} className="min-h-11 rounded-md bg-[var(--color-primary-green)] px-4 py-2 text-sm font-semibold text-white">
              {isBangla ? "সর্বশেষ ফ্যাক্ট-চেক" : "Latest Fact-Checks"}
            </Link>
            <Link href={`/${lang}/submit-claim`} className="min-h-11 rounded-md border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-[var(--color-text-primary)]">
              {isBangla ? "দাবি জমা দিন" : "Submit a Claim"}
            </Link>
          </div>
        </div>
        <div className="rounded-lg bg-[var(--color-bg-secondary)] p-4">
          <h2 className={`text-lg ${isBangla ? "font-bn-heading font-semibold" : "font-en-display font-semibold"}`}>{isBangla ? "কেন আমাদের বিশ্বাস করবেন" : "Why Trust Us"}</h2>
          <ul className={`mt-3 space-y-2 text-sm text-[var(--color-text-secondary)] ${isBangla ? "font-bn" : ""}`}>
            <li>- {isBangla ? "প্রত্যেক যাচাইয়ে উন্মুক্ত সূত্র ও প্রমাণের তালিকা" : "Published source trails for every major claim"}</li>
            <li>- {isBangla ? "পদ্ধতি, সীমাবদ্ধতা, আপডেট টাইমস্ট্যাম্প পরিষ্কারভাবে উল্লেখ" : "Method, limitations, and update timestamps visible"}</li>
            <li>- {isBangla ? "বিষয়ভিত্তিক বিশেষজ্ঞ পরামর্শ ও সম্পাদকীয় রিভিউ" : "Expert consultation and editorial review workflow"}</li>
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <h2 className={`mb-5 text-3xl ${isBangla ? "font-bn-heading font-bold" : "font-en-display font-bold"}`}>
          {isBangla ? "সর্বশেষ ফ্যাক্ট-চেক" : "Latest Fact-Checks"}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {latestFactChecks.map((story) => (
            <article key={story.slug} className="rounded-lg border border-[var(--color-border)] bg-white p-4">
              <p className="text-xs font-semibold text-[var(--color-primary-red)]">{story.verdict ?? "Review"}</p>
              <h3 className={`mt-2 text-base font-semibold ${isBangla ? "font-bn" : ""}`}>{story.title[lang]}</h3>
              <p className={`mt-2 text-sm text-[var(--color-text-secondary)] ${isBangla ? "font-bn" : ""}`}>{story.excerpt[lang]}</p>
              <Link href={`/${lang}/articles/${story.slug}`} className="mt-3 inline-block text-sm font-semibold text-[var(--color-secondary-green)]">
                {isBangla ? "সম্পূর্ণ যাচাই" : "View full fact-check"}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-xl border border-[var(--color-border)] bg-white p-5">
        <h2 className={`text-3xl ${isBangla ? "font-bn-heading font-bold" : "font-en-display font-bold"}`}>
          {isBangla ? "ফিচার্ড অনুসন্ধান" : "Featured Investigation"}
        </h2>
        <div className="mt-4 grid gap-5 md:grid-cols-[1fr_1fr]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
            <Image src={featuredInvestigation.image} alt={featuredInvestigation.title[lang]} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          <div>
            <p className="text-sm text-[var(--color-secondary-green)]">{categoryLabel[featuredInvestigation.category][lang]}</p>
            <h3 className={`mt-2 text-2xl ${isBangla ? "font-bn-heading font-bold" : "font-en-display font-bold"}`}>{featuredInvestigation.title[lang]}</h3>
            <p className={`mt-3 text-[var(--color-text-secondary)] ${isBangla ? "font-bn" : ""}`}>{featuredInvestigation.excerpt[lang]}</p>
            <Link href={`/${lang}/articles/${featuredInvestigation.slug}`} className="mt-4 inline-block rounded-md bg-[var(--color-dark-green)] px-4 py-2 text-sm font-semibold text-white">
              {isBangla ? "রিপোর্ট পড়ুন" : "Read the report"}
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <h2 className={`mb-5 text-3xl ${isBangla ? "font-bn-heading font-bold" : "font-en-display font-bold"}`}>
          {isBangla ? "সাম্প্রতিক প্রতিবেদন" : "Latest Reports"}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {latestReports.map((article) => (
            <ArticleCard key={article.slug} article={article} lang={lang} />
          ))}
        </div>
      </section>
    </div>
  );
}
