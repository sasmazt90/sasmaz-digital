import { Moon, Sun } from "lucide-react";

export type PortfolioLanguage = "en" | "de" | "tr";
export type PortfolioTheme = "light" | "dark";

const navItems = [
  { key: "about", hash: "#about" },
  { key: "journey", hash: "#journey" },
  { key: "impact", hash: "#impact" },
  { key: "products", hash: "#products" },
  { key: "work", hash: "#work" },
  { key: "tools", hash: "#tools" },
  { key: "contact", hash: "#contact" },
  { key: "blog", hash: "" },
] as const;

type NavKey = (typeof navItems)[number]["key"];

export const portfolioNavLabels: Record<
  PortfolioLanguage,
  Record<NavKey, string>
> = {
  en: {
    about: "Summary",
    journey: "Career",
    impact: "Business Results",
    products: "Portfolio",
    work: "Authority",
    tools: "Capabilities & Credentials",
    contact: "Contact",
    blog: "BLOG",
  },
  de: {
    about: "Zusammenfassung",
    journey: "Karriere",
    impact: "Business-Ergebnisse",
    products: "Portfolio",
    work: "Autorität",
    tools: "Fähigkeiten & Nachweise",
    contact: "Kontakt",
    blog: "BLOG",
  },
  tr: {
    about: "Özet",
    journey: "Kariyer",
    impact: "İş Sonuçları",
    products: "Portföy",
    work: "Otorite",
    tools: "Yetkinlikler & Belgeler",
    contact: "İletişim",
    blog: "BLOG",
  },
};

type PortfolioHeaderProps = {
  language: PortfolioLanguage;
  onLanguageChange: (language: PortfolioLanguage) => void;
  theme: PortfolioTheme;
  onThemeToggle: () => void;
  navLabels: Record<NavKey, string>;
  themeToggleDarkLabel: string;
  themeToggleLightLabel: string;
  homePage?: boolean;
};

export default function PortfolioHeader({
  language,
  onLanguageChange,
  theme,
  onThemeToggle,
  navLabels,
  themeToggleDarkLabel,
  themeToggleLightLabel,
  homePage = false,
}: PortfolioHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#d6e0f0] bg-white/88 backdrop-blur-xl dark:border-white/10 dark:bg-[#07141c]/84">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <div className="hidden lg:block" />
        <nav
          aria-label="Primary navigation"
          className="hidden items-center justify-center gap-2 overflow-x-auto text-sm text-[#516079] dark:text-white/68 lg:flex"
        >
          {navItems.map(item => {
            const href =
              item.key === "blog"
                ? "/blog"
                : `${homePage ? "" : "/"}${item.hash}`;
            return (
              <a
                key={item.key}
                href={href}
                className={`min-w-fit rounded-full px-3 py-2 transition hover:bg-[#eff5ff] hover:text-[#0f172a] dark:hover:bg-white/8 dark:hover:text-white ${item.key === "blog" ? "font-extrabold uppercase tracking-[0.18em] text-[#0f172a] dark:text-white" : ""}`}
              >
                {navLabels[item.key]}
              </a>
            );
          })}
        </nav>
        <div className="flex items-center justify-end gap-2">
          <select
            value={language}
            onChange={event =>
              onLanguageChange(event.target.value as PortfolioLanguage)
            }
            aria-label="Language"
            className="rounded-full border border-[#dce7f9] bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#0f172a] outline-none dark:border-white/10 dark:bg-[#10212a] dark:text-white"
          >
            <option value="en">EN</option>
            <option value="de">DE</option>
            <option value="tr">TR</option>
          </select>
          <button
            type="button"
            onClick={onThemeToggle}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#dce7f9] bg-white text-[#0f172a] transition hover:border-[#bfd3f6] dark:border-white/10 dark:bg-white/6 dark:text-white"
            aria-label={
              theme === "light" ? themeToggleDarkLabel : themeToggleLightLabel
            }
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
