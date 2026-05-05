import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const PAGES_DIR = path.join(process.cwd(), "content", "pages");

type Lang = "en" | "bn";

type LocalizedText = Record<Lang, string>;

export type CmsArticle = {
  slug: string;
  category: "Digital Investigation" | "Fact Check" | "Opinion" | "Current Affairs";
  title: LocalizedText;
  excerpt: LocalizedText;
  content: LocalizedText[];
  author: LocalizedText;
  publishedAt: string;
  image: string;
  verdict?: "True" | "False" | "Misleading";
  claimOrigin?: LocalizedText;
  methodology?: LocalizedText[];
  evidence?: LocalizedText[];
  conclusion?: LocalizedText;
  sources?: { label: string; url: string }[];
};

export type CmsEditablePage = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  body: LocalizedText;
};

const fallbackPages: Record<string, CmsEditablePage> = {
  about: {
    slug: "about",
    title: { en: "About Us", bn: "আমাদের সম্পর্কে" },
    description: {
      en: "Bangla Blockade is an investigative media outlet.",
      bn: "বাংলা Blockade একটি অনুসন্ধানী সংবাদমাধ্যম।",
    },
    body: {
      en: "Bangla Blockade is an investigative media outlet focused on transparent, evidence-first reporting.",
      bn: "বাংলা Blockade স্বচ্ছ, প্রমাণভিত্তিক অনুসন্ধানী সাংবাদিকতায় প্রতিশ্রুতিবদ্ধ।",
    },
  },
  contact: {
    slug: "contact",
    title: { en: "Contact", bn: "যোগাযোগ" },
    description: {
      en: "Write to us for tips and verification requests.",
      bn: "টিপস ও যাচাইয়ের অনুরোধে আমাদের লিখুন।",
    },
    body: {
      en: "Use the contact form to submit inquiries, partnership requests, and verified leads.",
      bn: "যোগাযোগ ফর্ম ব্যবহার করে প্রশ্ন, পার্টনারশিপ অনুরোধ ও যাচাইকৃত তথ্য পাঠান।",
    },
  },
};

function readDirSafe(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  return fs.readdirSync(dirPath);
}

function parseLocalizedField(value: unknown): LocalizedText {
  if (!value || typeof value !== "object") {
    return { en: "", bn: "" };
  }
  const record = value as Record<string, unknown>;
  return {
    en: typeof record.en === "string" ? record.en : "",
    bn: typeof record.bn === "string" ? record.bn : "",
  };
}

export function getCmsArticles(fallbackArticles: CmsArticle[]): CmsArticle[] {
  const files = readDirSafe(POSTS_DIR).filter((name) => name.endsWith(".md"));
  if (files.length === 0) {
    return fallbackArticles;
  }

  const articles = files
    .map((fileName) => {
      const source = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
      const { data } = matter(source);
      const slug = typeof data.slug === "string" ? data.slug : fileName.replace(/\.md$/, "");

      const sources = Array.isArray(data.sources)
        ? data.sources
            .filter((entry): entry is { label?: unknown; url?: unknown } => typeof entry === "object" && entry !== null)
            .map((entry) => ({
              label: typeof entry.label === "string" ? entry.label : "Source",
              url: typeof entry.url === "string" ? entry.url : "#",
            }))
        : [];

      const article: CmsArticle = {
        slug,
        category: (data.category as CmsArticle["category"]) ?? "Current Affairs",
        title: parseLocalizedField(data.title),
        excerpt: parseLocalizedField(data.excerpt),
        content: Array.isArray(data.content)
          ? data.content.map((item) => parseLocalizedField(item))
          : [{ en: "", bn: "" }],
        author: parseLocalizedField(data.author),
        publishedAt: typeof data.publishedAt === "string" ? data.publishedAt : new Date().toISOString(),
        image: typeof data.image === "string" ? data.image : "/brand/logo-mark.png",
        verdict: data.verdict as CmsArticle["verdict"],
        claimOrigin: data.claimOrigin ? parseLocalizedField(data.claimOrigin) : undefined,
        methodology: Array.isArray(data.methodology) ? data.methodology.map((item) => parseLocalizedField(item)) : undefined,
        evidence: Array.isArray(data.evidence) ? data.evidence.map((item) => parseLocalizedField(item)) : undefined,
        conclusion: data.conclusion ? parseLocalizedField(data.conclusion) : undefined,
        sources,
      };

      return article;
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return articles;
}

export function getEditablePage(pageSlug: string): CmsEditablePage {
  const pagePath = path.join(PAGES_DIR, `${pageSlug}.md`);
  if (!fs.existsSync(pagePath)) {
    return fallbackPages[pageSlug] ?? fallbackPages.about;
  }

  const source = fs.readFileSync(pagePath, "utf8");
  const { data } = matter(source);
  return {
    slug: pageSlug,
    title: parseLocalizedField(data.title),
    description: parseLocalizedField(data.description),
    body: parseLocalizedField(data.body),
  };
}
