import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { categoryLabel, formatDate, getArticle, getArticles, isLang, Lang, ui } from "@/lib/content";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const articles = await getArticles();
    if (articles.length === 0) {
      return [{ slug: "placeholder" }];
    }
    return articles.map((article) => ({ slug: article.slug }));
  } catch (error) {
    console.error("generateStaticParams failed for article slugs", error);
    return [{ slug: "placeholder" }];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  const lang: Lang = isLang(params.lang) ? params.lang : "en";
  const article = await getArticle(params.slug);
  return {
    title: article ? article.title[lang] : "Article",
    description: article ? article.excerpt[lang] : "Bangla Blockade article",
    openGraph: {
      title: article ? article.title[lang] : "Bangla Blockade",
      description: article ? article.excerpt[lang] : "Bangla Blockade article",
      images: article ? [article.image] : ["/brand/logo-full.png"],
    },
  };
}

export default async function ArticlePage({ params }: { params: { lang: string; slug: string } }) {
  const lang: Lang = isLang(params.lang) ? params.lang : "en";
  const article = await getArticle(params.slug);
  const isBn = lang === "bn";

  if (!article) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-[var(--color-secondary-green)]">
          {isBn ? "প্রতিবেদন পাওয়া যায়নি" : "Article not found"}
        </h1>
      </div>
    );
  }

  const shareUrl = `https://banglablockade.com/${lang}/articles/${article.slug}`;
  const isFactCheck = article.category === "Fact Check";

  const claimReview = isFactCheck
    ? {
        "@context": "https://schema.org",
        "@type": "ClaimReview",
        url: shareUrl,
        claimReviewed: article.title[lang],
        reviewRating: {
          "@type": "Rating",
          ratingValue: article.verdict === "True" ? "1" : "0",
          bestRating: "1",
          worstRating: "0",
          alternateName: article.verdict ?? "Reviewed",
        },
        itemReviewed: {
          "@type": "Claim",
          author: { "@type": "Organization", name: "Bangla Blockade" },
        },
        author: { "@type": "Organization", name: "Bangla Blockade" },
        datePublished: article.publishedAt,
      }
    : null;

  return (
    <article className="mx-auto w-full max-w-4xl px-4 py-8">
      {claimReview && (
        <Script
          id={`claim-review-${article.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(claimReview) }}
        />
      )}

      {/* Article header */}
      <header className="mb-6 border-b border-[var(--color-border)] pb-6">
        <span className="rounded-full bg-[var(--color-secondary-green)]/10 px-3 py-1 text-sm font-bold text-[var(--color-secondary-green)]">
          {categoryLabel[article.category][lang]}
        </span>
        <h1
          className={`mt-4 text-4xl leading-tight md:text-[44px] ${isBn ? "font-bn-heading font-bold" : "font-en-display font-bold"} text-[var(--color-text-primary)]`}
        >
          {article.title[lang]}
        </h1>
        <div className={`mt-4 flex flex-wrap items-center gap-4 text-base text-[var(--color-text-secondary)] ${isBn ? "font-bn" : ""}`}>
          <span>{article.author[lang]}</span>
          <span>{formatDate(article.publishedAt, lang)}</span>
          {/* Verdict inline badge in header for fact-checks */}
          {isFactCheck && article.verdict && (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-bold ${
                article.verdict === "True"
                  ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                  : article.verdict === "False"
                  ? "border-red-300 bg-red-50 text-[var(--color-primary-red)]"
                  : "border-amber-300 bg-amber-50 text-amber-700"
              }`}
            >
              {article.verdict === "True" && (
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="7" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 8.5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {article.verdict === "False" && (
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="7" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
              {article.verdict === "Misleading" && (
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M8 2L14.5 13H1.5L8 2z"
                    fill="currentColor"
                    fillOpacity="0.2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path d="M8 6.5V9M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
              {isBn
                ? article.verdict === "True"
                  ? "সত্য"
                  : article.verdict === "False"
                  ? "মিথ্যা"
                  : "বিভ্রান্তিকর"
                : article.verdict}
            </span>
          )}
        </div>
      </header>

      {/* Hero image */}
      <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-xl">
        <Image
          src={article.image}
          alt={article.title[lang]}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 896px) 100vw, 896px"
        />
      </div>

      {/* Body */}
      <div className={`prose prose-lg max-w-none text-[18px] leading-[1.75] text-[var(--color-text-primary)] ${isBn ? "font-bn" : ""}`}>
        {article.content.map((paragraph, index) => (
          <p key={index}>{paragraph[lang]}</p>
        ))}
      </div>

      {/* ─── Fact-Check Summary ─────────────────────────────────────────── */}
      {isFactCheck && (
        <section
          className={`mt-10 overflow-hidden rounded-2xl border-2 border-[var(--color-border)] bg-[var(--color-bg-secondary)] ${isBn ? "font-bn" : ""}`}
          aria-label={isBn ? "ফ্যাক্ট-চেক সারাংশ" : "Fact-Check Summary"}
        >
          {/* Section header */}
          <div className="flex flex-wrap items-center gap-3 border-b border-[var(--color-border)] bg-white px-6 py-4">
            <h2
              className={`text-xl text-[var(--color-text-primary)] ${isBn ? "font-bn-heading font-bold" : "font-en-display font-bold"}`}
            >
              {isBn ? "ফ্যাক্ট-চেক সারাংশ" : "Fact-Check Summary"}
            </h2>
            {article.verdict && (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-bold ${
                  article.verdict === "True"
                    ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                    : article.verdict === "False"
                    ? "border-red-300 bg-red-50 text-[var(--color-primary-red)]"
                    : "border-amber-300 bg-amber-50 text-amber-700"
                }`}
              >
                {article.verdict === "True" && (
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="7" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M5 8.5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {article.verdict === "False" && (
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="7" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
                {article.verdict === "Misleading" && (
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M8 2L14.5 13H1.5L8 2z"
                      fill="currentColor"
                      fillOpacity="0.2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path d="M8 6.5V9M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
                {isBn
                  ? article.verdict === "True"
                    ? "সত্য"
                    : article.verdict === "False"
                    ? "মিথ্যা"
                    : "বিভ্রান্তিকর"
                  : article.verdict}
              </span>
            )}
          </div>

          <div className="divide-y divide-[var(--color-border)] px-6">
            {/* Claim origin */}
            {article.claimOrigin?.[lang] && (
              <div className="py-4">
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                  {isBn ? "দাবির উৎস" : "Claim Origin"}
                </p>
                <p className="text-base text-[var(--color-text-primary)]">{article.claimOrigin[lang]}</p>
              </div>
            )}

            {/* Methodology */}
            {article.methodology && article.methodology.length > 0 && (
              <div className="py-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                  {isBn ? "পদ্ধতি" : "Methodology"}
                </p>
                <ul className="space-y-2">
                  {article.methodology.map((item, index) => (
                    <li key={index} className="flex gap-2 text-sm leading-relaxed text-[var(--color-text-primary)]">
                      <span
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--color-secondary-green)]"
                        aria-hidden="true"
                      />
                      {item[lang]}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Evidence */}
            {article.evidence && article.evidence.length > 0 && (
              <div className="py-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                  {isBn ? "প্রমাণ" : "Evidence"}
                </p>
                <ul className="space-y-2">
                  {article.evidence.map((item, index) => (
                    <li key={index} className="flex gap-2 text-sm leading-relaxed text-[var(--color-text-primary)]">
                      <span
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--color-primary-red)]"
                        aria-hidden="true"
                      />
                      {item[lang]}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Conclusion */}
            {article.conclusion?.[lang] && (
              <div className="py-4">
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                  {isBn ? "উপসংহার" : "Conclusion"}
                </p>
                <p className="text-base font-medium text-[var(--color-text-primary)]">{article.conclusion[lang]}</p>
              </div>
            )}

            {/* Sources */}
            {article.sources && article.sources.length > 0 && (
              <div className="py-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                  {isBn ? "সূত্র" : "Sources"}
                </p>
                <ul className="space-y-2">
                  {article.sources.map((source) => (
                    <li key={source.url}>
                      <Link
                        href={source.url}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-secondary-green)] underline underline-offset-2 hover:opacity-80"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path
                            d="M6 4H3a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1v-3M10 2h4m0 0v4m0-4L7 9"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {source.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Share buttons */}
      <div className="mt-10 border-t border-[var(--color-border)] pt-6">
        <p className={`mb-4 text-sm font-semibold text-[var(--color-text-secondary)] ${isBn ? "font-bn" : ""}`}>
          {ui.share[lang]}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            className="min-h-11 rounded-md bg-[var(--color-primary-red)] px-4 py-2 text-sm font-bold text-white hover:opacity-90"
          >
            Facebook
          </Link>
          <Link
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title[lang])}`}
            target="_blank"
            className="min-h-11 rounded-md bg-[var(--color-secondary-green)] px-4 py-2 text-sm font-bold text-white hover:opacity-90"
          >
            X / Twitter
          </Link>
          <Link
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            className="min-h-11 rounded-md border border-[var(--color-secondary-green)] px-4 py-2 text-sm font-bold text-[var(--color-secondary-green)] hover:bg-[var(--color-bg-secondary)]"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </article>
  );
}
