import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePortfolioData } from "@/contexts/PortfolioDataContext";
import HorizontalSlider from "./HorizontalSlider";

export default function ToolsSection() {
  const { t, language } = useLanguage();
  const { portfolioData } = usePortfolioData();
  const { toolsData } = portfolioData;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section
      id="tools"
      className="relative overflow-hidden bg-white py-24 dark:bg-gray-900"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white font-['Space_Grotesk']">
            {t("tools.title")}
          </h2>
          <p className="mt-3 text-lg text-gray-500 dark:text-gray-400 font-['Nunito_Sans']">
            {t("tools.subtitle")}
          </p>
          <div className="mt-4 h-1 w-16 rounded-full bg-blue-600" />
        </div>

        <HorizontalSlider>
          {toolsData.map((category, i) => {
            const catName =
              category.category[language as keyof typeof category.category] ||
              category.category.en;
            const isActive = activeCategory === catName;

            return (
              <div
                key={i}
                className={`flex h-full cursor-pointer flex-col rounded-2xl border bg-white p-5 transition-all duration-300 dark:bg-gray-800 ${
                  isActive
                    ? "border-blue-300 shadow-lg shadow-blue-100 dark:border-blue-500 dark:shadow-blue-900/30"
                    : "border-gray-100 shadow-sm hover:border-gray-200 hover:shadow-md dark:border-gray-700 dark:hover:border-gray-600"
                }`}
                onClick={() => setActiveCategory(isActive ? null : catName)}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-xl"
                    style={{ backgroundColor: `${category.color}15` }}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-sm font-bold leading-tight text-gray-900 dark:text-white font-['Space_Grotesk']">
                    {catName}
                  </h3>
                </div>

                <div className="flex flex-1 flex-wrap gap-1.5">
                  {category.tools.map((tool, j) => (
                    <span
                      key={j}
                      className="rounded-md px-2 py-0.5 text-xs font-medium transition-colors"
                      style={{
                        backgroundColor: isActive
                          ? `${category.color}15`
                          : "#F3F4F6",
                        color: isActive ? category.color : "#6B7280",
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-700">
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-['Nunito_Sans']">
                    {category.tools.length}{" "}
                    {category.tools.length === 1
                      ? t("tools.count.single")
                      : t("tools.count.plural")}
                  </span>
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                </div>
              </div>
            );
          })}
        </HorizontalSlider>

        <div className="mt-10 text-center">
          <p className="text-gray-500 dark:text-gray-400 font-['Nunito_Sans']">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 font-['Space_Grotesk']">
              {toolsData.reduce((sum, cat) => sum + cat.tools.length, 0)}+
            </span>{" "}
            {t("tools.total")}
          </p>
        </div>
      </div>
    </section>
  );
}
