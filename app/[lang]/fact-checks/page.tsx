import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { categoryLabel, formatDate, getArticles, isLang, Lang } from "@/lib/content";

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang: Lang = isLang(params.lang) ? params.lang : "en";
  return {
    title: lang === "bn" ? "ফ্যাক্ট চেক" : "Fact Checks",
    description:
      lang === "bn"
        ? "দাবি যাচাই, প্রমাণ বিশ্লেষণ ও রায়সহ সকল ফ্যাক্ট-চেক প্রতিবেদন।"
        : "All fact-check reports with verified verdicts, evidence analysis, and source transparency.",
  };
}

type Verdict = "True" | "False" | "Misleading";

function VerdictBadge({ verdict, lang }: { verdict: Verdict | undefined; lang: Lang }) {
  const isBn = lang === "bn";

  if (!verdict) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 5v3.5M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {isBn ? "পর্যালোচিত" : "Under Review"}
      </span>
    );
  }

  const config: Record<Verdict, { bg: string; text: string; border: string; label: { en: string; bn: string }; icon: React.ReactNode }> = {
    True: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-300",
      label: { en: "True", bn: "সত্য" },
      icon: (
        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="7" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
          <path d="M5 8.5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    False: {
      bg: "bg-red-50",
      text: "text-[var(--color-primary-red)]",
      border: "border-red-300",
      label: { en: "False", bn: "মিথ্যা" },
      icon: (
        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="7" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
          <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    Misleading: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-300",
      label: { en: "Misleading", bn: "বিভ্রান্তিকর" },
      icon: (
        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M8 2L14.5 13H1.5L8 2z"
            fill="currentColor"
            fillOpacity="0.15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M8 6.5V9M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
  };

  const { bg, text, border, label, icon } = config[verdict];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${bg} ${text} ${border}`}>
      {icon}
      {isBn ? label.bn : label.en}
    </span>
  );
}

export default async function FactChecksPage({ params }: { params: { lang: string } }) {
  const lang: Lang = isLang(params.lang) ? params.lang : "en";
  const isBn = lang === "bn";

  const allArticles = await getArticles();
  const factChecks = allArticles.filter((a) => a.category === "Fact Check");

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-10 md:px-6">
      {/* Page header */}
      <div className="mb-10 border-b border-[var(--color-border)] pb-8">
        <span className="inline-block rounded-full bg-[var(--color-primary-red)]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-primary-red)]">
          {categoryLabel["Fact Check"][lang]}
        </span>
        <h1 className={`mt-3 text-4xl md:text-[44px] leading-tight text-[var(--color-text-primary)] ${isBn ? "font-bn-heading font-bold" : "font-en-display font-bold"}`}>
          {isBn ? "ফ্যাক্ট চেক" : "Fact Checks"}
        </h1>
        <p className={`mt-3 max-w-2xl text-base text-[var(--color-text-secondary)] ${isBn ? "font-bn" : ""}`}>
          {isBn
            ? "প্রতিটি দাবি যাচাই করা হয় প্রমাণ, সূত্র ও পদ্ধতির ভিত্তিতে। রায় পড়ুন — সত্য, মিথ্যা বা বিভ্রান্তিকর।"
            : "Every claim is verified with evidence, sources, and a transparent method. Read the verdict — True, False, or Misleading."}
        </p>
      </div>

      {/* Article list */}
      {factChecks.length === 0 ? (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-6 py-16 text-center">
          <p className={`text-[var(--color-text-secondary)] ${isBn ? "font-bn" : ""}`}>
            {isBn ? "কোনো ফ্যাক্ট-চেক প্রতিবেদন এখনো প্রকাশিত হয়নি।" : "No fact-check reports published yet."}
          </p>
        </div>
      ) : (
        <ol className="space-y-6" role="list">
          {factChecks.map((article) => (
            <li
              key={article.slug}
              className="group rounded-2xl border border-[var(--color-border)] bg-white transition-shadow hover:shadow-md"
            >
              <div className="flex flex-col gap-0 sm:flex-row">
                {/* Thumbnail */}
                <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden rounded-t-2xl sm:aspect-auto sm:w-52 sm:rounded-l-2xl sm:rounded-tr-none">
                  <Image
                    src={article.image}
                    alt={article.title[lang]}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, 208px"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-3 p-5">
                  {/* Verdict + category row */}
                  <div className="flex flex-wrap items-center gap-2">
                    <VerdictBadge verdict={article.verdict as Verdict | undefined} lang={lang} />
                    <span className={`text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)] ${isBn ? "font-bn" : ""}`}>
                      {formatDate(article.publishedAt, lang)}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className={`text-xl font-bold leading-snug text-[var(--color-text-primary)] ${isBn ? "font-bn-heading" : "font-en-display"}`}>
                    {article.title[lang]}
                  </h2>

                  {/* Excerpt */}
                  <p className={`line-clamp-2 text-sm text-[var(--color-text-secondary)] ${isBn ? "font-bn" : ""}`}>
                    {article.excerpt[lang]}
                  </p>

                  {/* Claim origin preview */}
                  {article.claimOrigin?.[lang] && (
                    <p className={`text-xs text-[var(--color-text-secondary)] ${isBn ? "font-bn" : ""}`}>
                      <span className="font-semibold text-[var(--color-text-primary)]">
                        {isBn ? "দাবির উৎস: " : "Claim origin: "}
                      </span>
                      {article.claimOrigin[lang]}
                    </p>
                  )}

                  {/* Read more */}
                  <div className="mt-auto pt-2">
                    <Link
                      href={`/${lang}/articles/${article.slug}`}
                      className={`inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-secondary-green)] px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 ${isBn ? "font-bn" : ""}`}
                    >
                      {isBn ? "পুরো প্রতিবেদন পড়ুন" : "Read full report"}
                      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
