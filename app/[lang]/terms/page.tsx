import { isLang, Lang } from "@/lib/content";

export default function TermsPage({ params }: { params: { lang: string } }) {
  const lang: Lang = isLang(params.lang) ? params.lang : "en";
  const isBangla = lang === "bn";

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className={`text-4xl text-[#026C33] ${isBangla ? "font-bn font-bold" : "font-en-display font-bold"}`}>
        {isBangla ? "ব্যবহারের শর্ত" : "Terms of Use"}
      </h1>
      <p className={`mt-4 ${isBangla ? "font-bn" : ""}`}>
        {isBangla
          ? "এই প্ল্যাটফর্মের কনটেন্ট কপিরাইট দ্বারা সুরক্ষিত। পুনঃপ্রকাশে সূত্র উল্লেখ বাধ্যতামূলক।"
          : "Content on this platform is protected by copyright. Attribution is required for republication."}
      </p>
    </section>
  );
}
