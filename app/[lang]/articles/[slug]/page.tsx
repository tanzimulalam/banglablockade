import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { articles, categoryLabel, formatDate, getArticle, isLang, Lang, languages, ui } from "@/lib/content";

export function generateStaticParams() {
  return languages.flatMap((lang) => articles.map((article) => ({ lang, slug: article.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  const lang: Lang = isLang(params.lang) ? params.lang : "en";
  const article = getArticle(params.slug);

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

export default function ArticlePage({ params }: { params: { lang: string; slug: string } }) {
  const lang: Lang = isLang(params.lang) ? params.lang : "en";
  const article = getArticle(params.slug);
  const isBangla = lang === "bn";

  if (!article) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-[#026C33]">{isBangla ? "প্রতিবেদন পাওয়া যায়নি" : "Article not found"}</h1>
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
      {claimReview && <Script id={`claim-review-${article.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(claimReview) }} />}
      <header className="mb-6 border-b border-slate-200 pb-6">
        <span className="rounded-full bg-[#026C33]/10 px-3 py-1 text-sm font-bold text-[#026C33]">
          {categoryLabel[article.category][lang]}
        </span>
        <h1 className={`mt-4 text-4xl md:text-[44px] leading-tight ${isBangla ? "font-bn font-bold" : "font-en-display font-bold"}`}>
          {article.title[lang]}
        </h1>
        <div className={`mt-4 flex flex-wrap gap-4 text-base text-slate-600 ${isBangla ? "font-bn" : ""}`}>
          <span>{article.author[lang]}</span>
          <span>{formatDate(article.publishedAt, lang)}</span>
        </div>
      </header>

      <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-xl">
        <Image
          src={article.image}
          alt={article.title[lang]}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      <div className={`prose prose-lg max-w-none text-[18px] leading-[1.7] ${isBangla ? "font-bn" : ""}`}>
        {article.content.map((paragraph, index) => (
          <p key={index}>{paragraph[lang]}</p>
        ))}
      </div>

      {isFactCheck && (
        <section className={`mt-8 space-y-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 ${isBangla ? "font-bn" : ""}`}>
          <h2 className={`text-2xl ${isBangla ? "font-bn-heading font-bold" : "font-en-display font-bold"}`}>{isBangla ? "ফ্যাক্ট-চেক সারাংশ" : "Fact-Check Summary"}</h2>
          <p><strong>{isBangla ? "রায়:" : "Verdict:"}</strong> {article.verdict ?? (isBangla ? "পর্যালোচিত" : "Reviewed")}</p>
          <p><strong>{isBangla ? "দাবির উৎস:" : "Claim origin:"}</strong> {article.claimOrigin?.[lang]}</p>
          <div>
            <strong>{isBangla ? "পদ্ধতি:" : "Methodology:"}</strong>
            <ul className="mt-2 list-disc pl-5">
              {article.methodology?.map((item, index) => <li key={index}>{item[lang]}</li>)}
            </ul>
          </div>
          <div>
            <strong>{isBangla ? "প্রমাণ:" : "Evidence:"}</strong>
            <ul className="mt-2 list-disc pl-5">
              {article.evidence?.map((item, index) => <li key={index}>{item[lang]}</li>)}
            </ul>
          </div>
          <p><strong>{isBangla ? "উপসংহার:" : "Conclusion:"}</strong> {article.conclusion?.[lang]}</p>
          <div>
            <strong>{isBangla ? "সূত্র:" : "Sources:"}</strong>
            <ul className="mt-2 space-y-1">
              {article.sources?.map((source) => (
                <li key={source.url}>
                  <Link href={source.url} className="text-[var(--color-secondary-green)] underline" target="_blank" rel="noreferrer">
                    {source.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <div className="mt-10 border-t border-slate-200 pt-6">
        <p className={`mb-4 text-sm font-semibold text-slate-700 ${isBangla ? "font-bn" : ""}`}>{ui.share[lang]}</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            className="min-h-11 rounded-md bg-[#F31B1D] px-4 py-2 text-sm font-bold text-white"
          >
            Facebook
          </Link>
          <Link
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
              article.title[lang]
            )}`}
            target="_blank"
            className="min-h-11 rounded-md bg-[#026C33] px-4 py-2 text-sm font-bold text-white"
          >
            X
          </Link>
          <Link
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            className="min-h-11 rounded-md border border-[#026C33] px-4 py-2 text-sm font-bold text-[#026C33]"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </article>
  );
}
