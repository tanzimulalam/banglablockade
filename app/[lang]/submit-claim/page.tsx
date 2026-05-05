import type { Metadata } from "next";
import { isLang, Lang } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang: Lang = isLang(params.lang) ? params.lang : "en";
  return {
    title: lang === "bn" ? "দাবি জমা দিন" : "Submit a Claim",
    description: lang === "bn" ? "যাচাইয়ের জন্য সন্দেহজনক দাবি জমা দিন।" : "Submit suspicious claims for verification.",
  };
}

export default function SubmitClaimPage({ params }: { params: { lang: string } }) {
  const lang: Lang = isLang(params.lang) ? params.lang : "en";
  const isBangla = lang === "bn";

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className={`text-4xl md:text-[44px] ${isBangla ? "font-bn-heading font-bold" : "font-en-display font-bold"}`}>
        {isBangla ? "যাচাইয়ের জন্য দাবি জমা দিন" : "Submit a Claim for Verification"}
      </h1>
      <p className={`mt-4 text-[var(--color-text-secondary)] ${isBangla ? "font-bn" : ""}`}>
        {isBangla
          ? "লিংক, স্ক্রিনশট, বা পোস্টের বিস্তারিত দিন। আমরা প্রমাণ যাচাই করে ফলাফল প্রকাশ করব।"
          : "Share links, screenshots, and context. Our verification team reviews the evidence and publishes findings transparently."}
      </p>
      <form className="mt-8 space-y-4 rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
        <label className="block">
          <span className={`mb-1 block text-sm font-semibold ${isBangla ? "font-bn" : ""}`}>{isBangla ? "আপনার নাম" : "Your name"}</span>
          <input className="min-h-11 w-full rounded-md border border-[var(--color-border)] px-3 py-2" type="text" required />
        </label>
        <label className="block">
          <span className={`mb-1 block text-sm font-semibold ${isBangla ? "font-bn" : ""}`}>{isBangla ? "ইমেইল" : "Email"}</span>
          <input className="min-h-11 w-full rounded-md border border-[var(--color-border)] px-3 py-2" type="email" required />
        </label>
        <label className="block">
          <span className={`mb-1 block text-sm font-semibold ${isBangla ? "font-bn" : ""}`}>{isBangla ? "দাবির লিংক" : "Claim URL"}</span>
          <input className="min-h-11 w-full rounded-md border border-[var(--color-border)] px-3 py-2" type="url" />
        </label>
        <label className="block">
          <span className={`mb-1 block text-sm font-semibold ${isBangla ? "font-bn" : ""}`}>{isBangla ? "প্রাসঙ্গিক বিবরণ" : "Context details"}</span>
          <textarea className="min-h-40 w-full rounded-md border border-[var(--color-border)] px-3 py-2" required />
        </label>
        <button className={`min-h-11 rounded-md bg-[var(--color-primary-green)] px-5 py-2 font-bold text-white ${isBangla ? "font-bn" : ""}`} type="submit">
          {isBangla ? "জমা দিন" : "Submit"}
        </button>
      </form>
    </section>
  );
}
