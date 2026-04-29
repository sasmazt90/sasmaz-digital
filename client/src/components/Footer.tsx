import { useLanguage } from "@/contexts/LanguageContext";
import { usePortfolioData } from "@/contexts/PortfolioDataContext";
import { Linkedin, Mail, Globe } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();
  const { portfolioData } = usePortfolioData();
  const { personalInfo } = portfolioData;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold font-['Space_Grotesk']">
              ITS
            </div>
            <div>
              <p className="font-bold font-['Space_Grotesk']">
                {personalInfo.name}
              </p>
              <p className="text-xs text-gray-400 font-['Nunito_Sans']">
                {t("footer.role")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`mailto:${personalInfo.email}`}
              className="rounded-xl bg-gray-800 p-2.5 transition-colors hover:bg-blue-600"
            >
              <Mail size={16} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-gray-800 p-2.5 transition-colors hover:bg-blue-600"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={personalInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-gray-800 p-2.5 transition-colors hover:bg-blue-600"
            >
              <Globe size={16} />
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400 font-['Nunito_Sans']">
              © {year} {personalInfo.name}. {t("footer.rights")}
            </p>
            <p className="mt-0.5 text-xs text-gray-500 font-['Nunito_Sans']">
              {t("footer.built")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
