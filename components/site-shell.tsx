import Image from "next/image";
import Link from "next/link";
import { Lang, ui } from "@/lib/content";
import logo from "@/public/brand/logo-mark.png";

const links = [
  { key: "home", href: "" },
  { key: "factChecks", href: "articles/misinformation-campaign-targets-national-unity" },
  { key: "investigations", href: "investigations" },
  { key: "about", href: "about" },
  { key: "contact", href: "contact" },
  { key: "submitClaim", href: "submit-claim" },
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
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]/95 text-[var(--color-text-primary)] backdrop-blur">
        <div className="mx-auto flex w-full content-width items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link href={`/${lang}`} className="flex items-center gap-3">
            <Image
              src={logo}
              alt="Bangla Blockade logo"
              width={64}
              height={64}
              className="h-12 w-12 shrink-0 object-contain md:h-14 md:w-14"
              priority
            />
            <span
              className={`text-xl font-bold text-[var(--color-secondary-green)] md:text-2xl ${isBangla ? "font-bn-heading" : "font-en-display"}`}
            >
              বাংলা Blockade
            </span>
          </Link>
          <nav className="hidden items-center gap-5 md:flex">
            {links.map((link) => (
              <Link
                key={link.key}
                href={`/${lang}/${link.href}`}
                className={`text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-secondary-green)] ${isBangla ? "font-bn" : ""}`}
              >
                {link.key === "submitClaim" ? ui.submitClaim[lang] : ui.nav[link.key][lang]}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href={`/en`}
              className={`min-h-11 min-w-11 rounded-md border px-3 py-2 text-sm font-bold ${
                lang === "en"
                  ? "border-[var(--color-secondary-green)] bg-[var(--color-secondary-green)] text-white"
                  : "border-[var(--color-border)] bg-white text-[var(--color-text-secondary)]"
              }`}
            >
              EN
            </Link>
            <Link
              href={`/bn`}
              className={`min-h-11 min-w-11 rounded-md border px-3 py-2 text-sm font-bold ${
                lang === "bn"
                  ? "border-[var(--color-secondary-green)] bg-[var(--color-secondary-green)] text-white"
                  : "border-[var(--color-border)] bg-white text-[var(--color-text-secondary)]"
              }`}
            >
              বাং
            </Link>
          </div>
        </div>
        <nav className="mx-auto flex w-full content-width gap-2 overflow-x-auto px-4 pb-3 md:hidden">
          {links.map((link) => (
            <Link
              key={link.key}
              href={`/${lang}/${link.href}`}
              className={`shrink-0 rounded-full border border-[var(--color-border)] bg-white px-3 py-2 text-xs font-semibold text-[var(--color-text-secondary)] ${
                lang === "bn" ? "font-bn" : ""
              }`}
            >
              {link.key === "submitClaim" ? ui.submitClaim[lang] : ui.nav[link.key][lang]}
            </Link>
          ))}
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="mt-16 border-t border-[var(--color-border)] bg-[var(--color-dark-green)] py-10 text-white">
        <div className="mx-auto flex w-full content-width flex-col gap-3 px-4 md:flex-row md:items-center md:justify-between md:px-6">
          <p className={isBangla ? "font-bn" : ""}>
            © {new Date().getFullYear()} বাংলা Blockade.{" "}
            {lang === "bn" ? "সকল অধিকার সংরক্ষিত।" : "All rights reserved."}
          </p>
          <div className="flex gap-4 text-sm font-semibold">
            <Link href={`/${lang}/contact`} className="hover:text-[var(--color-primary-red)]">
              {lang === "bn" ? "যোগাযোগ" : "Contact Us"}
            </Link>
            <Link href={`/${lang}/privacy`} className="hover:text-[var(--color-primary-red)]">
              {lang === "bn" ? "গোপনীয়তা নীতি" : "Privacy Policy"}
            </Link>
            <Link href={`/${lang}/terms`} className="hover:text-[var(--color-primary-red)]">
              {lang === "bn" ? "ব্যবহারের শর্ত" : "Terms of Use"}
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
