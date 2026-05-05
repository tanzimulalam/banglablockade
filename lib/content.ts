import { createClient } from "@supabase/supabase-js";

export const languages = ["en", "bn"] as const;
export type Lang = (typeof languages)[number];

export type Category =
  | "Digital Investigation"
  | "Fact Check"
  | "Opinion"
  | "Current Affairs";

export type Verdict = "True" | "False" | "Misleading";

type LocalizedText = Record<Lang, string>;

export type Article = {
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  content: LocalizedText[];
  category: Category;
  author: LocalizedText;
  publishedAt: string;
  image: string;
  claimOrigin?: LocalizedText;
  methodology?: LocalizedText[];
  evidence?: LocalizedText[];
  conclusion?: LocalizedText;
  sources?: { label: string; url: string }[];
  verdict?: Verdict;
};

export type EditablePage = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  body: LocalizedText;
};

export const categoryLabel: Record<Category, LocalizedText> = {
  "Digital Investigation": { en: "Digital Investigation", bn: "ডিজিটাল অনুসন্ধান" },
  "Fact Check": { en: "Fact Check", bn: "ফ্যাক্ট চেক" },
  Opinion: { en: "Opinion", bn: "মতামত" },
  "Current Affairs": { en: "Current Affairs", bn: "সমসাময়িক" },
};

export const ui = {
  nav: {
    home: { en: "Home", bn: "হোম" },
    investigations: { en: "Investigations", bn: "অনুসন্ধান" },
    factChecks: { en: "Fact Checks", bn: "ফ্যাক্ট চেক" },
    opinions: { en: "Opinions", bn: "মতামত" },
    about: { en: "About", bn: "পরিচিতি" },
    contact: { en: "Contact", bn: "যোগাযোগ" },
    submitClaim: { en: "Submit Claim", bn: "দাবি জমা" },
  },
  heroTitle: {
    en: "Fundamental change begins from the people's hands",
    bn: "মৌলিক পরিবর্তন শুরু হয় জনগণের হাত ধরে",
  },
  heroSubtitle: {
    en: "The organized voice of students and people standing against injustice, discrimination, and oppression.",
    bn: "অন্যায়, বৈষম্য ও নিপীড়নের বিরুদ্ধে দাঁড়ানো ছাত্র-জনতার সংগঠিত কণ্ঠস্বর।",
  },
  readNow: { en: "Read Now", bn: "এখন পড়ুন" },
  share: { en: "Share this story", bn: "সংবাদটি শেয়ার করুন" },
  contactHeading: { en: "Send us a tip or inquiry", bn: "তথ্য বা প্রশ্ন পাঠান" },
  submitClaim: { en: "Submit a Claim", bn: "দাবি জমা দিন" },
};

type SupabaseArticle = {
  id: string;
  slug: string;
  category: Category;
  image_url: string | null;
  verdict: Verdict | null;
  claim_origin_en: string | null;
  claim_origin_bn: string | null;
  published_at: string;
  is_published: boolean;
};

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

function emptyLocalized(): LocalizedText {
  return { en: "", bn: "" };
}

function createLocalized(enValue?: string | null, bnValue?: string | null): LocalizedText {
  return { en: enValue ?? "", bn: bnValue ?? "" };
}

export async function getArticles(): Promise<Article[]> {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    const { data: articles, error } = await supabase
      .from("articles")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (error || !articles || articles.length === 0) return [];

    const articleRows = articles as SupabaseArticle[];
    const articleIds = articleRows.map((row) => row.id);

    const [localizationsRes, paragraphsRes, methodologyRes, evidenceRes, sourcesRes] = await Promise.all([
      supabase.from("article_localizations").select("*").in("article_id", articleIds),
      supabase.from("article_paragraphs").select("*").in("article_id", articleIds).order("sort_order", { ascending: true }),
      supabase.from("article_methodology").select("*").in("article_id", articleIds).order("sort_order", { ascending: true }),
      supabase.from("article_evidence").select("*").in("article_id", articleIds).order("sort_order", { ascending: true }),
      supabase.from("article_sources").select("*").in("article_id", articleIds).order("sort_order", { ascending: true }),
    ]);

    const localizations = localizationsRes.data ?? [];
    const paragraphs = paragraphsRes.data ?? [];
    const methodology = methodologyRes.data ?? [];
    const evidence = evidenceRes.data ?? [];
    const sources = sourcesRes.data ?? [];

    return articleRows.map((row) => {
    const locEn = localizations.find((loc) => loc.article_id === row.id && loc.lang === "en");
    const locBn = localizations.find((loc) => loc.article_id === row.id && loc.lang === "bn");
    const bodyEn = paragraphs.filter((item) => item.article_id === row.id && item.lang === "en");
    const bodyBn = paragraphs.filter((item) => item.article_id === row.id && item.lang === "bn");
    const methodologyEn = methodology.filter((item) => item.article_id === row.id && item.lang === "en");
    const methodologyBn = methodology.filter((item) => item.article_id === row.id && item.lang === "bn");
    const evidenceEn = evidence.filter((item) => item.article_id === row.id && item.lang === "en");
    const evidenceBn = evidence.filter((item) => item.article_id === row.id && item.lang === "bn");

    const mergedBody: LocalizedText[] =
      Math.max(bodyEn.length, bodyBn.length) > 0
        ? Array.from({ length: Math.max(bodyEn.length, bodyBn.length) }).map((_, index) =>
            createLocalized(bodyEn[index]?.body, bodyBn[index]?.body)
          )
        : [emptyLocalized()];

    const mergedMethodology: LocalizedText[] | undefined =
      methodologyEn.length || methodologyBn.length
        ? Array.from({ length: Math.max(methodologyEn.length, methodologyBn.length) }).map((_, index) =>
            createLocalized(methodologyEn[index]?.item, methodologyBn[index]?.item)
          )
        : undefined;

    const mergedEvidence: LocalizedText[] | undefined =
      evidenceEn.length || evidenceBn.length
        ? Array.from({ length: Math.max(evidenceEn.length, evidenceBn.length) }).map((_, index) =>
            createLocalized(evidenceEn[index]?.item, evidenceBn[index]?.item)
          )
        : undefined;

    return {
      slug: row.slug,
      category: row.category,
      title: createLocalized(locEn?.title, locBn?.title),
      excerpt: createLocalized(locEn?.excerpt, locBn?.excerpt),
      content: mergedBody,
      author: createLocalized(locEn?.author_name, locBn?.author_name),
      publishedAt: row.published_at,
      image: row.image_url ?? "/brand/logo-mark.png",
      verdict: row.verdict ?? undefined,
      claimOrigin:
        row.claim_origin_en || row.claim_origin_bn
          ? createLocalized(row.claim_origin_en, row.claim_origin_bn)
          : undefined,
      methodology: mergedMethodology,
      evidence: mergedEvidence,
      conclusion:
        locEn?.conclusion || locBn?.conclusion
          ? createLocalized(locEn?.conclusion, locBn?.conclusion)
          : undefined,
      sources: sources
        .filter((item) => item.article_id === row.id)
        .map((item) => ({ label: item.label, url: item.url })),
    };
    });
  } catch (error) {
    console.error("Supabase getArticles failed", error);
    return [];
  }
}

export function isLang(value: string): value is Lang {
  return languages.includes(value as Lang);
}

export function formatDate(dateString: string, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === "bn" ? "bn-BD" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  const articles = await getArticles();
  return articles.find((article) => article.slug === slug);
}

export async function getEditablePage(slug: string): Promise<EditablePage> {
  const supabase = getSupabaseClient();
  if (!supabase) return { slug, title: emptyLocalized(), description: emptyLocalized(), body: emptyLocalized() };

  const { data: page, error: pageError } = await supabase
    .from("pages")
    .select("id, slug, is_published")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (pageError || !page) {
    return { slug, title: emptyLocalized(), description: emptyLocalized(), body: emptyLocalized() };
  }

  const { data: pageLocs, error: locError } = await supabase
    .from("page_localizations")
    .select("*")
    .eq("page_id", page.id);

  if (locError || !pageLocs) {
    return { slug, title: emptyLocalized(), description: emptyLocalized(), body: emptyLocalized() };
  }

  const en = pageLocs.find((item) => item.lang === "en");
  const bn = pageLocs.find((item) => item.lang === "bn");

  return {
    slug,
    title: createLocalized(en?.title, bn?.title),
    description: createLocalized(en?.description, bn?.description),
    body: createLocalized(en?.body, bn?.body),
  };
}
