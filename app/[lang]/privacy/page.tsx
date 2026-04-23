import { isLang, Lang } from "@/lib/content";

export default function PrivacyPage({ params }: { params: { lang: string } }) {
  const lang: Lang = isLang(params.lang) ? params.lang : "en";
  const isBangla = lang === "bn";

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className={`text-4xl text-[#026C33] ${isBangla ? "font-bn font-bold" : "font-en-display font-bold"}`}>
        {isBangla ? "গোপনীয়তা নীতি" : "Privacy Policy"}
      </h1>
      <p className={`mt-4 ${isBangla ? "font-bn" : ""}`}>
        {isBangla
          ? "ব্যবহারকারীর তথ্য আমরা দায়িত্বের সাথে সংরক্ষণ করি এবং কেবল প্রয়োজনীয় সেবার জন্য ব্যবহার করি।"
          : "We handle user data responsibly and use it only for essential communication and editorial services."}
      </p>
    </section>
  );
}
