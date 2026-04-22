import type { Metadata } from "next";
import { isLang, Lang, ui } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang: Lang = isLang(params.lang) ? params.lang : "en";
  return {
    title: lang === "bn" ? "যোগাযোগ" : "Contact",
    description: lang === "bn" ? "বাংলা Blockade-এর সাথে যোগাযোগ করুন।" : "Get in touch with Bangla Blockade.",
  };
}

export default function ContactPage({ params }: { params: { lang: string } }) {
  const lang: Lang = isLang(params.lang) ? params.lang : "en";
  const isBangla = lang === "bn";

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className={`text-4xl md:text-[44px] text-[#026C33] ${isBangla ? "font-bn font-bold" : "font-impact"}`}>
        {ui.contactHeading[lang]}
      </h1>
      <p className={`mt-4 text-base md:text-lg ${isBangla ? "font-bn" : ""}`}>
        {isBangla
          ? "টিপস, যাচাইয়ের অনুরোধ বা যেকোনো অনুসন্ধানের জন্য আমাদের লিখুন।"
          : "Write to us for tips, verification requests, or partnership inquiries."}
      </p>

      <form className="mt-8 space-y-4 rounded-xl bg-white p-6 shadow-sm">
        <label className="block">
          <span className={`mb-1 block text-sm font-semibold ${isBangla ? "font-bn" : ""}`}>
            {isBangla ? "নাম" : "Name"}
          </span>
          <input className="min-h-11 w-full rounded-md border border-slate-300 px-3 py-2" type="text" />
        </label>
        <label className="block">
          <span className={`mb-1 block text-sm font-semibold ${isBangla ? "font-bn" : ""}`}>
            {isBangla ? "ইমেইল" : "Email"}
          </span>
          <input className="min-h-11 w-full rounded-md border border-slate-300 px-3 py-2" type="email" />
        </label>
        <label className="block">
          <span className={`mb-1 block text-sm font-semibold ${isBangla ? "font-bn" : ""}`}>
            {isBangla ? "বার্তা" : "Message"}
          </span>
          <textarea className="min-h-40 w-full rounded-md border border-slate-300 px-3 py-2" />
        </label>
        <button
          className={`min-h-11 rounded-md bg-[#F31B1D] px-5 py-2 font-bold text-white ${isBangla ? "font-bn" : ""}`}
          type="submit"
        >
          {isBangla ? "পাঠান" : "Submit"}
        </button>
      </form>

      <div className={`mt-6 text-sm text-slate-700 ${isBangla ? "font-bn" : ""}`}>
        <p>info@banglablockade.com</p>
        <p>tips@banglablockade.com</p>
      </div>
    </section>
  );
}
