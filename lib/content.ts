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

export const articles: Article[] = [
  {
    slug: "student-movement-gains-momentum",
    title: {
      en: "Student Movement Gains Momentum Across Bangladesh",
      bn: "বাংলাদেশজুড়ে ছাত্র আন্দোলনের গতি বাড়ছে",
    },
    excerpt: {
      en: "Campus coalitions are now coordinating nationwide actions for policy reform and accountability.",
      bn: "নীতিগত সংস্কার ও জবাবদিহি নিশ্চিত করতে ক্যাম্পাসভিত্তিক জোটগুলো এখন দেশব্যাপী কর্মসূচি সমন্বয় করছে।",
    },
    content: [
      {
        en: "Student alliances in multiple districts have established synchronized protest calendars and digital communication hubs.",
        bn: "বিভিন্ন জেলায় ছাত্রজোটগুলো সমন্বিত কর্মসূচির ক্যালেন্ডার ও ডিজিটাল যোগাযোগকেন্দ্র গড়ে তুলেছে।",
      },
      {
        en: "Organizers say their strategy focuses on disciplined civic resistance, legal awareness, and transparent demands.",
        bn: "আয়োজকদের ভাষ্য, তাদের কৌশল শৃঙ্খলাবদ্ধ নাগরিক প্রতিরোধ, আইনগত সচেতনতা ও স্বচ্ছ দাবির ওপর ভিত্তি করে।",
      },
    ],
    category: "Digital Investigation",
    author: { en: "Editorial Desk", bn: "সম্পাদকীয় ডেস্ক" },
    publishedAt: "2026-04-20",
    image: "/brand/logo-full.png",
  },
  {
    slug: "misinformation-campaign-targets-national-unity",
    title: {
      en: "Misinformation Campaign Targets National Unity",
      bn: "জাতীয় ঐক্যকে লক্ষ্য করে বিভ্রান্তিমূলক প্রচারণা",
    },
    excerpt: {
      en: "A coordinated network of pages reused fabricated visuals to frame false narratives.",
      bn: "সমন্বিত কিছু পেজ মিথ্যা বর্ণনা ছড়াতে বিকৃত ভিজ্যুয়াল পুনর্ব্যবহার করেছে।",
    },
    content: [
      {
        en: "Our review found repeated use of out-of-context images and edited headlines shared in short intervals.",
        bn: "আমাদের পর্যালোচনায় দেখা গেছে, প্রেক্ষাপটহীন ছবি ও সম্পাদিত শিরোনাম অল্প সময়ে বারবার শেয়ার করা হয়েছে।",
      },
      {
        en: "Fact-checking teams verified source archives and geolocation clues to debunk each major claim.",
        bn: "ফ্যাক্ট-চেক টিম সূত্রের আর্কাইভ ও জিওলোকেশন ক্লু যাচাই করে বড় দাবিগুলো খণ্ডন করেছে।",
      },
    ],
    category: "Fact Check",
    author: { en: "Verification Unit", bn: "যাচাই ইউনিট" },
    publishedAt: "2026-04-18",
    image: "/brand/logo-mark.png",
    claimOrigin: {
      en: "Facebook posts and copied image cards shared in local groups",
      bn: "স্থানীয় গ্রুপে শেয়ার হওয়া ফেসবুক পোস্ট ও কপি করা ইমেজ কার্ড",
    },
    methodology: [
      {
        en: "We traced the first upload timestamps and compared versions across archives.",
        bn: "আমরা প্রথম আপলোডের সময়চিহ্ন ট্রেস করে আর্কাইভে সংরক্ষিত ভার্সনের সাথে মিলিয়েছি।",
      },
      {
        en: "Two independent experts reviewed location clues and editing artifacts.",
        bn: "দুইজন স্বাধীন বিশেষজ্ঞ লোকেশন ক্লু ও এডিটিং আর্টিফ্যাক্ট পর্যালোচনা করেছেন।",
      },
    ],
    evidence: [
      {
        en: "Original photo predates the claimed event by 18 months and was captured in another district.",
        bn: "মূল ছবিটি দাবিকৃত ঘটনার ১৮ মাস আগে তোলা এবং অন্য জেলায় ধারণ করা।",
      },
      {
        en: "Headline text was digitally altered; metadata indicates post-production edits.",
        bn: "শিরোনামের টেক্সট ডিজিটালি পরিবর্তিত; মেটাডাটায় পোস্ট-প্রোডাকশন এডিটের প্রমাণ আছে।",
      },
    ],
    conclusion: {
      en: "The campaign relied on manipulated context and edited visuals to spread a false narrative.",
      bn: "মিথ্যা বয়ান ছড়াতে এই প্রচারণায় বিকৃত প্রেক্ষাপট ও সম্পাদিত ভিজ্যুয়াল ব্যবহার করা হয়েছে।",
    },
    sources: [
      { label: "Reverse Image Trace Archive", url: "https://example.com/source-archive" },
      { label: "Expert Interview Notes", url: "https://example.com/expert-notes" },
      { label: "Platform Transparency Report", url: "https://example.com/transparency-report" },
    ],
    verdict: "False",
  },
  {
    slug: "new-dawn-ideology-of-bangla-blockade",
    title: {
      en: "A New Dawn: The Ideology of Bangla Blockade",
      bn: "নতুন ভোর: বাংলা ব্লকেডের আদর্শ",
    },
    excerpt: {
      en: "The movement defines dignity, unity, and sacrifice as its non-negotiable political ethics.",
      bn: "মর্যাদা, ঐক্য ও ত্যাগকে এই আন্দোলন অনড় রাজনৈতিক নৈতিকতা হিসেবে চিহ্নিত করে।",
    },
    content: [
      {
        en: "Bangla Blockade positions itself as a civic movement rooted in constitutional rights and social solidarity.",
        bn: "বাংলা ব্লকেড নিজেকে সংবিধানিক অধিকার ও সামাজিক সংহতিতে ভিত্তিক নাগরিক আন্দোলন হিসেবে স্থাপন করে।",
      },
      {
        en: "Its vision links national identity with inclusive justice and equal access to opportunity.",
        bn: "এর ভিশন জাতীয় পরিচয়কে অন্তর্ভুক্তিমূলক ন্যায়বিচার ও সমান সুযোগের সাথে যুক্ত করে।",
      },
    ],
    category: "Opinion",
    author: { en: "Opinion Board", bn: "মতামত বোর্ড" },
    publishedAt: "2026-04-16",
    image: "/brand/logo-mark.png",
  },
  {
    slug: "streets-to-digital-platforms-evolution-of-protest",
    title: {
      en: "From Streets to Digital Platforms: The Evolution of Protest",
      bn: "রাজপথ থেকে ডিজিটাল প্ল্যাটফর্ম: প্রতিবাদের বিবর্তন",
    },
    excerpt: {
      en: "Youth organizers are combining offline mobilization with encrypted communities and open-source monitoring.",
      bn: "তরুণ সংগঠকেরা অফলাইন জনমোবিলাইজেশনকে এনক্রিপ্টেড কমিউনিটি ও ওপেন-সোর্স মনিটরিংয়ের সাথে যুক্ত করছেন।",
    },
    content: [
      {
        en: "Digital tools have expanded the speed and reach of collective action without replacing physical participation.",
        bn: "ডিজিটাল টুলসমূহ সরাসরি অংশগ্রহণের বিকল্প না হয়ে সম্মিলিত কর্মসূচির গতি ও পরিধি বাড়িয়েছে।",
      },
      {
        en: "Activists stress that secure communication and media literacy remain essential for long-term resilience.",
        bn: "দীর্ঘমেয়াদি স্থিতিশীলতার জন্য নিরাপদ যোগাযোগ ও মিডিয়া লিটারেসি অপরিহার্য বলে কর্মীরা উল্লেখ করেন।",
      },
    ],
    category: "Current Affairs",
    author: { en: "Current Affairs Desk", bn: "সমসাময়িক ডেস্ক" },
    publishedAt: "2026-04-14",
    image: "/brand/logo-mark.png",
  },
  {
    slug: "voices-of-youth-stand-against-injustice",
    title: {
      en: "Voices of the Youth: Why We Stand Against Injustice",
      bn: "তরুণদের কণ্ঠ: কেন আমরা অন্যায়ের বিরুদ্ধে",
    },
    excerpt: {
      en: "A generation-wide call for dignity and fairness is reshaping the civic language of resistance.",
      bn: "মর্যাদা ও ন্যায্যতার দাবি তরুণ প্রজন্মের প্রতিরোধের ভাষাকে নতুনভাবে নির্মাণ করছে।",
    },
    content: [
      {
        en: "Interviews across public universities reveal shared concerns over equity, accountability, and democratic participation.",
        bn: "সরকারি বিশ্ববিদ্যালয়জুড়ে সাক্ষাৎকারে সমতা, জবাবদিহি ও গণতান্ত্রিক অংশগ্রহণ নিয়ে অভিন্ন উদ্বেগ উঠে এসেছে।",
      },
      {
        en: "Participants describe solidarity as both emotional strength and a strategic framework.",
        bn: "অংশগ্রহণকারীরা সংহতিকে আবেগীয় শক্তি এবং কৌশলগত কাঠামো - দুইভাবেই দেখছেন।",
      },
    ],
    category: "Opinion",
    author: { en: "Community Voices", bn: "জনকণ্ঠ" },
    publishedAt: "2026-04-12",
    image: "/brand/logo-mark.png",
  },
  {
    slug: "citizens-recording-truth-during-crisis",
    title: {
      en: "Citizens Recording Truth During Crisis",
      bn: "সংকটে সত্য লিপিবদ্ধ করছেন নাগরিকরা",
    },
    excerpt: {
      en: "Open-source documentation by volunteers is preserving critical timelines and public evidence.",
      bn: "স্বেচ্ছাসেবকদের ওপেন-সোর্স ডকুমেন্টেশন গুরুত্বপূর্ণ টাইমলাইন ও জনস্বার্থের প্রমাণ সংরক্ষণ করছে।",
    },
    content: [
      {
        en: "Field volunteers are cataloging witness videos, statements, and local reports in a verifiable archive.",
        bn: "মাঠপর্যায়ের স্বেচ্ছাসেবকেরা সাক্ষীর ভিডিও, বিবৃতি ও স্থানীয় প্রতিবেদন যাচাইযোগ্য আর্কাইভে সংরক্ষণ করছেন।",
      },
      {
        en: "The initiative aims to prevent historical erasure and support future accountability processes.",
        bn: "ঐতিহাসিক সত্য মুছে যাওয়া ঠেকানো এবং ভবিষ্যৎ জবাবদিহি প্রক্রিয়াকে সহায়তা করাই এই উদ্যোগের লক্ষ্য।",
      },
    ],
    category: "Digital Investigation",
    author: { en: "Research Desk", bn: "গবেষণা ডেস্ক" },
    publishedAt: "2026-04-10",
    image: "/brand/logo-circle.png",
  },
];

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

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
