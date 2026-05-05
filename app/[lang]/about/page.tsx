import type { Metadata } from "next";
import { isLang, Lang } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang: Lang = isLang(params.lang) ? params.lang : "en";
  return {
    title: lang === "bn" ? "পরিচিতি" : "About",
    description:
      lang === "bn"
        ? "বাংলা Blockade-এর মিশন, ভিশন ও ইতিহাস।"
        : "Mission, vision, and history of Bangla Blockade.",
  };
}

export default function AboutPage({ params }: { params: { lang: string } }) {
  const lang: Lang = isLang(params.lang) ? params.lang : "en";
  const isBangla = lang === "bn";

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-10">
      <h1 className={`text-4xl md:text-[44px] text-[var(--color-secondary-green)] ${isBangla ? "font-bn-heading font-bold" : "font-en-display font-bold"}`}>
        {isBangla ? "আমাদের সম্পর্কে" : "About Us"}
      </h1>
      <p className={`mt-5 text-base md:text-lg text-[var(--color-text-secondary)] ${isBangla ? "font-bn" : ""}`}>
        {isBangla
          ? "বাংলা Blockade একটি অনুসন্ধানী সংবাদমাধ্যম। আমাদের কাজ হলো যাচাইযোগ্য দলিল, তথ্যসূত্র এবং প্রেক্ষাপটসহ জনস্বার্থের দাবি মূল্যায়ন করা।"
          : "Bangla Blockade is an investigative media outlet focused on verifying public claims with transparent evidence, sources, and context."}
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow-sm border border-[var(--color-border)]">
          <h2 className={`text-2xl text-[var(--color-dark-green)] ${isBangla ? "font-bn-heading font-bold" : "font-en-display font-bold"}`}>
            {isBangla ? "মিশন" : "Mission"}
          </h2>
          <p className={`mt-3 ${isBangla ? "font-bn" : ""}`}>
            {isBangla
              ? "প্রতিটি প্রতিবেদনে উৎসের পথ, যাচাইয়ের ধাপ এবং আপডেটের সময়চিহ্ন প্রকাশ করা।"
              : "Publish source trails, verification steps, and update timestamps in every major report."}
          </p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm border border-[var(--color-border)]">
          <h2 className={`text-2xl text-[var(--color-dark-green)] ${isBangla ? "font-bn-heading font-bold" : "font-en-display font-bold"}`}>
            {isBangla ? "পদ্ধতি" : "Methodology"}
          </h2>
          <p className={`mt-3 ${isBangla ? "font-bn" : ""}`}>
            {isBangla
              ? "ডিজিটাল ফরেনসিক, নথি যাচাই, বিশেষজ্ঞ মতামত এবং মাঠপর্যায়ের সাক্ষ্য মিলিয়ে সিদ্ধান্তে পৌঁছাই।"
              : "We combine digital forensics, document checks, expert review, and field reporting before publishing a verdict."}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-[var(--color-dark-green)] p-6 text-white">
        <h2 className={`text-2xl ${isBangla ? "font-bn-heading font-bold" : "font-en-display font-bold"}`}>
          {isBangla ? "ফান্ডিং স্বচ্ছতা" : "Funding Transparency"}
        </h2>
        <p className={`mt-3 ${isBangla ? "font-bn" : ""}`}>
          {isBangla
            ? "আমরা আমাদের অংশীদারিত্ব, অনুদান এবং বিজ্ঞাপন নীতির সারাংশ নিয়মিত হালনাগাদ করে প্রকাশ করি।"
            : "We publish regular summaries of partnerships, grants, and advertising policy to maintain editorial independence."}
        </p>
      </div>
    </section>
  );
}
