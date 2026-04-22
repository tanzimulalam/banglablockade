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
      <h1 className={`text-4xl md:text-[44px] text-[#026C33] ${isBangla ? "font-bn font-bold" : "font-impact"}`}>
        {isBangla ? "আমাদের মিশন" : "Our Mission"}
      </h1>
      <p className={`mt-5 text-base md:text-lg ${isBangla ? "font-bn" : ""}`}>
        {isBangla
          ? "বাংলা Blockade হলো সত্য, ন্যায়বিচার এবং জাতীয় পরিচয়ের পক্ষে একটি স্বাধীন ডিজিটাল প্ল্যাটফর্ম। আমাদের লক্ষ্য - মর্যাদা, ঐক্য ও ত্যাগের ভিত্তিতে একটি বাংলাদেশ গড়ে তোলা।"
          : "Bangla Blockade is an independent digital platform for truth, justice, and national identity. Our mission is to build a Bangladesh grounded in dignity, unity, and sacrifice."}
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className={`text-2xl text-[#F31B1D] ${isBangla ? "font-bn font-bold" : "font-impact"}`}>
            {isBangla ? "ভিশন" : "Vision"}
          </h2>
          <p className={`mt-3 ${isBangla ? "font-bn" : ""}`}>
            {isBangla
              ? "একটি দায়িত্বশীল, জবাবদিহিমূলক ও অন্তর্ভুক্তিমূলক গণতান্ত্রিক সমাজ।"
              : "A responsible, accountable, and inclusive democratic society."}
          </p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className={`text-2xl text-[#F31B1D] ${isBangla ? "font-bn font-bold" : "font-impact"}`}>
            {isBangla ? "ইতিহাস" : "History"}
          </h2>
          <p className={`mt-3 ${isBangla ? "font-bn" : ""}`}>
            {isBangla
              ? "রাজপথের আন্দোলন থেকে ডিজিটাল প্ল্যাটফর্মে - বাংলা Blockade ন্যায়ের দাবিকে দলিলভিত্তিকভাবে সামনে আনে।"
              : "From street movements to digital platforms, Bangla Blockade documents and amplifies demands for justice."}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-[#026C33] p-6 text-white">
        <h2 className={`text-2xl ${isBangla ? "font-bn font-bold" : "font-impact"}`}>
          {isBangla ? "দল" : "Team"}
        </h2>
        <p className={`mt-3 ${isBangla ? "font-bn" : ""}`}>
          {isBangla
            ? "আমাদের টিমে আছেন অনুসন্ধানী সাংবাদিক, ফ্যাক্ট-চেকার, গবেষক এবং মাঠপর্যায়ের সংগঠক।"
            : "Our team includes investigative journalists, fact-checkers, researchers, and civic organizers."}
        </p>
      </div>
    </section>
  );
}
