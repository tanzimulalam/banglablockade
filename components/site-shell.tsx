import Image from "next/image";
import Link from "next/link";
import { Lang, ui } from "@/lib/content";

const links = [
  { key: "home", href: "" },
  { key: "investigations", href: "#digital-investigations" },
  { key: "factChecks", href: "#fact-checks" },
  { key: "opinions", href: "#opinions" },
  { key: "about", href: "about" },
  { key: "contact", href: "contact" },
] as const;

export function SiteShell({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Lang;
}) {
  const isBangla = lang === "bn";

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 text-slate-900 shadow-sm backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link href={`/${lang}`} className="flex items-center gap-3">
            <Image
              src="/bangla-blockade-logo.png"
              alt="Bangla Blockade logo"
              width={64}
              height={64}
              className="h-12 w-12 object-contain md:h-14 md:w-14"
              priority
            />
            <span className={`text-xl font-bold text-[#026C33] md:text-2xl ${isBangla ? "font-bn" : "font-impact"}`}>
              বাংলা Blockade
            </span>
          </Link>
          <nav className="hidden items-center gap-5 md:flex">
            {links.map((link) => (
              <Link
                key={link.key}
                href={link.href.startsWith("#") ? `/${lang}/${link.href}` : `/${lang}/${link.href}`}
                className={`text-sm font-semibold text-slate-700 transition hover:text-[#F31B1D] ${isBangla ? "font-bn" : ""}`}
              >
                {ui.nav[link.key][lang]}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href={`/en`}
              className={`min-h-11 min-w-11 rounded-md border px-3 py-2 text-sm font-bold ${
                lang === "en" ? "border-[#F31B1D] bg-[#F31B1D] text-white" : "border-slate-300 bg-white text-slate-700"
              }`}
            >
              EN
            </Link>
            <Link
              href={`/bn`}
              className={`min-h-11 min-w-11 rounded-md border px-3 py-2 text-sm font-bold ${
                lang === "bn" ? "border-[#F31B1D] bg-[#F31B1D] text-white" : "border-slate-300 bg-white text-slate-700"
              }`}
            >
              বাং
            </Link>
          </div>
        </div>
        <nav className="mx-auto flex w-full max-w-6xl gap-2 overflow-x-auto px-4 pb-3 md:hidden">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href.startsWith("#") ? `/${lang}/${link.href}` : `/${lang}/${link.href}`}
              className={`shrink-0 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 ${
                lang === "bn" ? "font-bn" : ""
              }`}
            >
              {ui.nav[link.key][lang]}
            </Link>
          ))}
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="mt-16 border-t border-slate-200 bg-[#025329] py-10 text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 md:flex-row md:items-center md:justify-between md:px-6">
          <p className={isBangla ? "font-bn" : ""}>
            © {new Date().getFullYear()} বাংলা Blockade.{" "}
            {lang === "bn" ? "সকল অধিকার সংরক্ষিত।" : "All rights reserved."}
          </p>
          <div className="flex gap-4 text-sm font-semibold">
            <Link href={`/${lang}/contact`} className="hover:text-[#F31B1D]">
              {lang === "bn" ? "যোগাযোগ" : "Contact Us"}
            </Link>
            <Link href={`/${lang}/privacy`} className="hover:text-[#F31B1D]">
              {lang === "bn" ? "গোপনীয়তা নীতি" : "Privacy Policy"}
            </Link>
            <Link href={`/${lang}/terms`} className="hover:text-[#F31B1D]">
              {lang === "bn" ? "ব্যবহারের শর্ত" : "Terms of Use"}
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
