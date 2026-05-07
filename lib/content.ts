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
};

type SupabaseArticle = {
  id: number;
  slug: string;
  category: string | null;
  image_url: string | null;
  en_title: string | null;
  bn_title: string | null;
  en_excerpt: string | null;
  bn_excerpt: string | null;
  en_article: string | null;
  bn_article: string | null;
  en_author: string | null;
  bn_author: string | null;
  en_claim_origin: string | null;
  bn_claim_origin: string | null;
  en_methodology: string | null;
  bn_methodology: string | null;
  en_evidence: string | null;
  bn_evidence: string | null;
  en_conclusion: string | null;
  bn_conclusion: string | null;
  en_sources: string | null;
  bn_sources: string | null;
  verdict: string | null;
  published_at: string | null;
  is_published: boolean | null;
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
  // EN fallback for BN if BN is missing
  return { en: enValue ?? "", bn: bnValue ?? enValue ?? "" };
}

function splitTextList(enValue?: string | null, bnValue?: string | null): LocalizedText[] | undefined {
  const enList = (enValue ?? "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
  const bnList = (bnValue ?? "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
  const length = Math.max(enList.length, bnList.length);
  if (length === 0) return undefined;
  return Array.from({ length }).map((_, index) => createLocalized(enList[index], bnList[index]));
}

function parseSources(enValue?: string | null, bnValue?: string | null): { label: string; url: string }[] | undefined {
  const raw = enValue || bnValue;
  if (!raw) return undefined;

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed
        .filter((item): item is { label?: unknown; url?: unknown } => typeof item === "object" && item !== null)
        .map((item) => ({
          label: typeof item.label === "string" ? item.label : "Source",
          url: typeof item.url === "string" ? item.url : "#",
        }));
    }
  } catch {
    // Fallback format: one URL per line
    const urls = raw
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
    if (urls.length > 0) {
      return urls.map((url, index) => ({ label: `Source ${index + 1}`, url }));
    }
  }
  return undefined;
}

function normalizeCategory(value?: string | null): Category {
  const valid: Category[] = ["Digital Investigation", "Fact Check", "Opinion", "Current Affairs"];
  if (value && (valid as string[]).includes(value)) {
    return value as Category;
  }
  return "Current Affairs";
}

function normalizeVerdict(value?: string | null): Verdict | undefined {
  if (value === "True" || value === "False" || value === "Misleading") return value;
  return undefined;
}

function bodyToParagraphs(enBody?: string | null, bnBody?: string | null): LocalizedText[] {
  const enParagraphs = (enBody ?? "")
    .split(/\n\s*\n/g)
    .map((item) => item.trim())
    .filter(Boolean);
  const bnParagraphs = (bnBody ?? "")
    .split(/\n\s*\n/g)
    .map((item) => item.trim())
    .filter(Boolean);

  const length = Math.max(enParagraphs.length, bnParagraphs.length, 1);
  return Array.from({ length }).map((_, index) =>
    createLocalized(enParagraphs[index] ?? "", bnParagraphs[index] ?? "")
  );
}

export async function getArticles(): Promise<Article[]> {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Supabase fetch timed out")), 8000)
    );

    const query = supabase
      .from("articles_content")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    const { data: articles, error } = await Promise.race([query, timeout]) as Awaited<typeof query>;

    if (error || !articles || articles.length === 0) return [];
    const articleRows = articles as SupabaseArticle[];
    return articleRows.map((row) => ({
      slug: row.slug,
      category: normalizeCategory(row.category),
      title: createLocalized(row.en_title, row.bn_title),
      excerpt: createLocalized(row.en_excerpt, row.bn_excerpt),
      content: bodyToParagraphs(row.en_article, row.bn_article),
      author: createLocalized(row.en_author, row.bn_author),
      publishedAt: row.published_at ?? new Date().toISOString().slice(0, 10),
      image: row.image_url?.trim() ? row.image_url : "/brand/logo-mark.png",
      verdict: normalizeVerdict(row.verdict),
      claimOrigin:
        row.en_claim_origin || row.bn_claim_origin
          ? createLocalized(row.en_claim_origin, row.bn_claim_origin)
          : undefined,
      methodology: splitTextList(row.en_methodology, row.bn_methodology),
      evidence: splitTextList(row.en_evidence, row.bn_evidence),
      conclusion:
        row.en_conclusion || row.bn_conclusion
          ? createLocalized(row.en_conclusion, row.bn_conclusion)
          : undefined,
      sources: parseSources(row.en_sources, row.bn_sources),
    }));
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

  const { data: pageRow, error: pageError } = await supabase
    .from("articles_content")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (pageError || !pageRow) {
    return { slug, title: emptyLocalized(), description: emptyLocalized(), body: emptyLocalized() };
  }

  const row = pageRow as SupabaseArticle;
  return {
    slug,
    title: createLocalized(row.en_title, row.bn_title),
    description: createLocalized(row.en_excerpt, row.bn_excerpt),
    body: createLocalized(row.en_article, row.bn_article),
  };
}
