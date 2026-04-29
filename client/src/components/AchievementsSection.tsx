import { useLanguage } from "@/contexts/LanguageContext";
import { usePortfolioData } from "@/contexts/PortfolioDataContext";
import {
  ExternalLink,
  Trophy,
  TrendingUp,
  Mic,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import VideoModal from "./VideoModal";

export default function AchievementsSection() {
  const { t, language } = useLanguage();
  const { portfolioData } = usePortfolioData();
  const { awards, caseStudies, speakingMentoring } = portfolioData;
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

  return (
    <>
      <VideoModal
        isOpen={!!selectedVideoUrl}
        videoUrl={selectedVideoUrl || ""}
        onClose={() => setSelectedVideoUrl(null)}
      />
      <section id="achievements" className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white font-['Space_Grotesk']">
              {t("achievements.title")}
            </h2>
            <p className="mt-3 text-lg text-gray-500 dark:text-gray-400 font-['Nunito_Sans']">
              {t("achievements.subtitle")}
            </p>
            <div className="mt-4 h-1 w-16 rounded-full bg-blue-600" />
          </div>

          <div className="mb-16">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-yellow-100 p-2">
                <Trophy size={20} className="text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white font-['Space_Grotesk']">
                {t("achievements.awards")}
              </h3>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {awards.map((award, i) => (
                <a
                  key={i}
                  href={award.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-yellow-200 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-yellow-600"
                >
                  <div className="mb-3 text-4xl">{award.icon}</div>
                  <div
                    className="mb-3 inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold"
                    style={{
                      backgroundColor: `${award.color}20`,
                      color: award.color,
                    }}
                  >
                    {award.result}
                  </div>
                  <h4 className="mb-1 text-sm font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 font-['Space_Grotesk']">
                    {award.title}
                  </h4>
                  {award.campaign && (
                    <p className="text-xs italic text-gray-500 dark:text-gray-400 font-['Nunito_Sans']">
                      "{award.campaign}"
                    </p>
                  )}
                  <p className="mt-3 text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {award.brand}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-xs font-semibold text-gray-600">
                      {t("achievements.winners")}
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-blue-600 transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-2">
                <TrendingUp size={20} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white font-['Space_Grotesk']">
                {t("achievements.casestudies")}
              </h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((cs, i) => (
                <a
                  key={i}
                  href={cs.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group cursor-pointer rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600 dark:hover:bg-blue-900/20"
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                        {cs.brand}
                      </span>
                      <span className="mx-1.5 text-xs text-gray-400 dark:text-gray-600">
                        ×
                      </span>
                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                        {cs.partner}
                      </span>
                    </div>
                    <ArrowRight
                      size={14}
                      className="mt-0.5 flex-shrink-0 text-gray-300 transition-colors group-hover:text-blue-600 dark:text-gray-600 dark:group-hover:text-blue-400"
                    />
                  </div>
                  <p className="text-sm font-semibold leading-snug text-gray-800 transition-colors group-hover:text-blue-700 dark:text-gray-200 dark:group-hover:text-blue-400 font-['Space_Grotesk']">
                    {cs.result}
                  </p>
                  <div className="mt-3 text-xs font-semibold text-blue-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-blue-400">
                    {t("achievements.viewCaseStudy")}
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-2">
                <Mic size={20} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white font-['Space_Grotesk']">
                {t("achievements.speaking")}
              </h3>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {speakingMentoring.map((item, i) => {
                const role =
                  item.role[language as keyof typeof item.role] || item.role.en;
                const topic =
                  item.topic[language as keyof typeof item.topic] ||
                  item.topic.en;
                const logoMap: Record<string, string> = {
                  "Anadolu University":
                    "https://d2xsxph8kpxj0f.cloudfront.net/310519663417992656/7RbFAYqZTA5W5SHxRNj5WZ/Anadolu-University_4fbbfd97.jpg",
                  "Istanbul Technical University":
                    "https://d2xsxph8kpxj0f.cloudfront.net/310519663417992656/7RbFAYqZTA5W5SHxRNj5WZ/Istanbul-Technical-University_a2f32e24.jpg",
                  "18 Mart University":
                    "https://d2xsxph8kpxj0f.cloudfront.net/310519663417992656/7RbFAYqZTA5W5SHxRNj5WZ/18-Mart-University_44b5d0e4.jpg",
                };
                const logoUrl = logoMap[item.institution] || "";

                return (
                  <a
                    key={i}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-green-200 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-green-600"
                  >
                    <div className="flex items-center gap-3 p-6 pb-4">
                      {logoUrl && (
                        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
                          <img
                            src={logoUrl}
                            alt={item.institution}
                            className="max-h-full max-w-full object-contain p-1"
                          />
                        </div>
                      )}
                      <div className="flex flex-grow flex-col">
                        <div className="mb-1 inline-flex w-fit rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          {role}
                        </div>
                        <h4 className="text-sm font-bold leading-tight text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 font-['Space_Grotesk']">
                          {item.institution}
                        </h4>
                      </div>
                    </div>

                    <div className="flex flex-grow flex-col border-t border-gray-100 px-6 pb-6 dark:border-gray-700">
                      <p className="flex-grow pt-4 text-xs leading-relaxed text-gray-500 dark:text-gray-400 font-['Nunito_Sans']">
                        {topic}
                      </p>
                      <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-blue-500 dark:text-blue-400">
                        <ExternalLink size={11} />
                        {t("achievements.view")}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
