import Image from "next/image";
import Link from "next/link";
import { Article, categoryLabel, formatDate, Lang, ui } from "@/lib/content";

export function ArticleCard({ article, lang }: { article: Article; lang: Lang }) {
  const isBangla = lang === "bn";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-[16/9]">
        <Image
          src={article.image}
          alt={article.title[lang]}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="w-fit rounded-full bg-[#f31b1d]/10 px-3 py-1 text-xs font-bold text-[#c81012]">
          {categoryLabel[article.category][lang]}
        </span>
        <h3 className={`text-2xl leading-tight text-slate-900 ${isBangla ? "font-bn font-bold" : "font-en-display font-bold"}`}>
          {article.title[lang]}
        </h3>
        <p className={`text-base text-slate-700 ${isBangla ? "font-bn" : ""}`}>{article.excerpt[lang]}</p>
        <p className="mt-auto text-sm text-slate-500">{formatDate(article.publishedAt, lang)}</p>
        <Link
          href={`/${lang}/articles/${article.slug}`}
          className={`inline-flex min-h-11 items-center justify-center rounded-md border border-[#F31B1D] bg-[#F31B1D] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#cf1315] ${
            isBangla ? "font-bn" : ""
          }`}
        >
          {ui.readNow[lang]}
        </Link>
      </div>
    </article>
  );
}
