import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { categoryLabel, formatDate, getArticle, isLang, Lang, ui } from "@/lib/content";

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
      images: article ? [article.image] : ["/bangla-blockade-logo.png"],
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

  return (
    <article className="mx-auto w-full max-w-4xl px-4 py-8">
      <header className="mb-6 border-b border-slate-200 pb-6">
        <span className="rounded-full bg-[#026C33]/10 px-3 py-1 text-sm font-bold text-[#026C33]">
          {categoryLabel[article.category][lang]}
        </span>
        <h1 className={`mt-4 text-4xl md:text-[44px] leading-tight ${isBangla ? "font-bn font-bold" : "font-impact"}`}>
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
