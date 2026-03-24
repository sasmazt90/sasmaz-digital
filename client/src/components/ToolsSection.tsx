import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePortfolioData } from '@/contexts/PortfolioDataContext';
import HorizontalSlider from './HorizontalSlider';

export default function ToolsSection() {
  const { t, language } = useLanguage();
  const { portfolioData } = usePortfolioData();
  const { toolsData } = portfolioData;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section
      id="tools"
      className="py-24 relative overflow-hidden bg-white dark:bg-gray-900"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white font-['Space_Grotesk']">
            {t('tools.title')}
          </h2>
          <p className="mt-3 text-lg text-gray-500 dark:text-gray-400 font-['Nunito_Sans']">
            {t('tools.subtitle')}
          </p>
          <div className="mt-4 w-16 h-1 bg-blue-600 rounded-full" />
        </div>

        {/* Tools Slider */}
        <HorizontalSlider>
          {toolsData.map((category, i) => {
            const catName = category.category[language as keyof typeof category.category] || category.category.en;
            const isActive = activeCategory === catName;

            return (
              <div
                key={i}
                className={`bg-white dark:bg-gray-800 rounded-2xl p-5 border transition-all duration-300 cursor-pointer flex flex-col h-full ${
                  isActive
                    ? 'border-blue-300 dark:border-blue-500 shadow-lg shadow-blue-100 dark:shadow-blue-900/30'
                    : 'border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600'
                }`}
                onClick={() => setActiveCategory(isActive ? null : catName)}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ backgroundColor: `${category.color}15` }}
                  >
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm font-['Space_Grotesk'] leading-tight">
                    {catName}
                  </h3>
                </div>

                {/* Tools */}
                <div className="flex flex-wrap gap-1.5 flex-1">
                  {category.tools.map((tool, j) => (
                    <span
                      key={j}
                      className="px-2 py-0.5 text-xs font-medium rounded-md transition-colors"
                      style={{
                        backgroundColor: isActive ? `${category.color}15` : '#F3F4F6',
                        color: isActive ? category.color : '#6B7280',
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Tool count */}
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-['Nunito_Sans']">
                    {category.tools.length} {language === 'tr' ? 'araç' : language === 'de' ? 'Tools' : 'tools'}
                  </span>
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                </div>
              </div>
            );
          })}
        </HorizontalSlider>

        {/* Total count */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 dark:text-gray-400 font-['Nunito_Sans']">
            <span className="font-bold text-blue-600 dark:text-blue-400 text-2xl font-['Space_Grotesk']">
              {toolsData.reduce((sum, cat) => sum + cat.tools.length, 0)}+
            </span>
            {' '}
            {language === 'tr' ? 'araç ve platform' : language === 'de' ? 'Tools und Plattformen' : 'tools and platforms'}
          </p>
        </div>
      </div>
    </section>
  );
}
