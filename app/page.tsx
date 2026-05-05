import { SiteShell } from "@/components/site-shell";
import HomePage from "./[lang]/page";
import type { Lang } from "@/lib/content";

export default function RootPage() {
  // Static export safety: render the English homepage immediately instead of relying on runtime redirect.
  const lang: Lang = "en";
  return (
    <SiteShell lang={lang}>
      <HomePage params={{ lang }} />
    </SiteShell>
  );
}
