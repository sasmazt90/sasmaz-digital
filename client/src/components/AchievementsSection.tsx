import { useLanguage } from '@/contexts/LanguageContext';
import { usePortfolioData } from '@/contexts/PortfolioDataContext';
import { ExternalLink, Trophy, TrendingUp, Mic, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import VideoModal from './VideoModal';

export default function AchievementsSection() {
  const { t, language } = useLanguage();
  const { portfolioData } = usePortfolioData();
  const { awards, caseStudies, speakingMentoring } = portfolioData;
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

  return (
    <>
      <VideoModal
        isOpen={!!selectedVideoUrl}
        videoUrl={selectedVideoUrl || ''}
        onClose={() => setSelectedVideoUrl(null)}
      />
    <section id="achievements" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white font-['Space_Grotesk']">
            {t('achievements.title')}
          </h2>
          <p className="mt-3 text-lg text-gray-500 dark:text-gray-400 font-['Nunito_Sans']">
            {t('achievements.subtitle')}
          </p>
          <div className="mt-4 w-16 h-1 bg-blue-600 rounded-full" />
        </div>

        {/* Awards */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-100 rounded-xl">
              <Trophy size={20} className="text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white font-['Space_Grotesk']">
              {language === 'tr' ? 'Ödüller' : language === 'de' ? 'Auszeichnungen' : 'Awards'}
            </h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {awards.map((award, i) => (
              <a
                key={i}
                href={award.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg hover:border-yellow-200 dark:hover:border-yellow-600 transition-all duration-300 group block"
              >
                <div className="text-4xl mb-3">{award.icon}</div>
                <div className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold mb-3"
                  style={{ backgroundColor: `${award.color}20`, color: award.color }}>
                  {award.result}
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm font-['Space_Grotesk'] mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {award.title}
                </h4>
                {award.campaign && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic font-['Nunito_Sans']">"{award.campaign}"</p>
                )}
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-3">{award.brand}</p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-600">See Winners List</span>
                  <ArrowRight size={14} className="text-blue-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Case Studies */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-xl">
              <TrendingUp size={20} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white font-['Space_Grotesk']">
              {t('achievements.casestudies')}
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {caseStudies.map((cs, i) => (
              <a
                key={i}
                href={cs.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">{cs.brand}</span>
                    <span className="text-xs text-gray-400 dark:text-gray-600 mx-1.5">×</span>
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">{cs.partner}</span>
                  </div>
                  <ArrowRight size={14} className="text-gray-300 dark:text-gray-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0 mt-0.5" />
                </div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 font-['Space_Grotesk'] leading-snug group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                  {cs.result}
                </p>
                <div className="mt-3 text-xs text-blue-600 dark:text-blue-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  {language === 'tr' ? 'Vaka Çalışmasını Görüntüle' : language === 'de' ? 'Fallstudie ansehen' : 'View Case Study'}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Speaking & Mentoring */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 rounded-xl">
              <Mic size={20} className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white font-['Space_Grotesk']">
              {t('achievements.speaking')}
            </h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {speakingMentoring.map((item, i) => {
              const role = item.role[language as keyof typeof item.role] || item.role.en;
              const topic = item.topic[language as keyof typeof item.topic] || item.topic.en;
              const logoMap: Record<string, string> = {
                'Anadolu University': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663417992656/7RbFAYqZTA5W5SHxRNj5WZ/Anadolu-University_4fbbfd97.jpg',
                'Istanbul Technical University': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663417992656/7RbFAYqZTA5W5SHxRNj5WZ/Istanbul-Technical-University_a2f32e24.jpg',
                '18 Mart University': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663417992656/7RbFAYqZTA5W5SHxRNj5WZ/18-Mart-University_44b5d0e4.jpg',
              };
              const logoUrl = logoMap[item.institution] || '';
              return (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg hover:border-green-200 dark:hover:border-green-600 transition-all duration-300 group block flex flex-col h-full"
                >
                  {/* ROW 1: Logo + Tag + University Name */}
                  <div className="flex items-center gap-3 p-6 pb-4">
                    {/* Logo - Left */}
                    {logoUrl && (
                      <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600">
                        <img src={logoUrl} alt={item.institution} className="max-h-full max-w-full object-contain p-1" />
                      </div>
                    )}
                    {/* Tag + University Name - Right */}
                    <div className="flex-grow flex flex-col">
                      <div className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 w-fit mb-1">
                        {role}
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm font-['Space_Grotesk'] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                        {item.institution}
                      </h4>
                    </div>
                  </div>

                  {/* ROW 2: Description + View Link */}
                  <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-700 flex flex-col flex-grow">
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-['Nunito_Sans'] flex-grow pt-4">{topic}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-blue-500 dark:text-blue-400 font-semibold">
                      <ExternalLink size={11} />
                      {language === 'tr' ? 'Görüntüle' : language === 'de' ? 'Ansehen' : 'View'}
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
