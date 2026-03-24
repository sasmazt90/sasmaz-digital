import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePortfolioData } from '@/contexts/PortfolioDataContext';
import { ChevronDown, ChevronUp, MapPin, Users, DollarSign, Calendar } from 'lucide-react';

const companyLogos: Record<string, string> = {
  'NAOS Deutschland (BIODERMA)': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663417992656/7RbFAYqZTA5W5SHxRNj5WZ/naos-logo_d5e85a1d.jpg',
  'NAOS Türkiye (BIODERMA / Institut Esthederm / Etat Pur)': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663417992656/7RbFAYqZTA5W5SHxRNj5WZ/naos-logo_d5e85a1d.jpg',
  'NAOS Türkiye': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663417992656/7RbFAYqZTA5W5SHxRNj5WZ/naos-logo_d5e85a1d.jpg',
  'D&R / idefix': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663417992656/7RbFAYqZTA5W5SHxRNj5WZ/d&r-logo_4684eef6.jpg',
  '8digits (SaaS Analytics & CRO Startup)': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663417992656/7RbFAYqZTA5W5SHxRNj5WZ/8digits-logo_03816d0a.jpg',
  'Emarsys (SAP Marketing Cloud)': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663417992656/7RbFAYqZTA5W5SHxRNj5WZ/emarsys-logo_944b641f.jpg',
  'Lidyana.com': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663417992656/7RbFAYqZTA5W5SHxRNj5WZ/lidyana-logo_31bdf4c6.jpg',
};

export default function ExperienceSection() {
  const { t, language } = useLanguage();
  const { portfolioData } = usePortfolioData();
  const { experiences } = portfolioData;
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const getCompanyLogo = (company: string) => {
    return companyLogos[company] || null;
  };

  return (
    <section id="experience" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-['Space_Grotesk']">
            {t('experience.title')}
          </h2>
          <p className="mt-3 text-lg text-gray-500 font-['Nunito_Sans']">
            {t('experience.subtitle')}
          </p>
          <div className="mt-4 w-16 h-1 bg-blue-600 rounded-full" />
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-blue-300 to-blue-100 hidden md:block" />

          <div className="space-y-4">
            {experiences.map((exp, index) => {
              const isExpanded = expandedId === exp.id;
              const role = exp.role[language as keyof typeof exp.role] || exp.role.en;
              const period = exp.period[language as keyof typeof exp.period] || exp.period.en;
              const achievements = exp.achievements[language as keyof typeof exp.achievements] || exp.achievements.en;

              return (
                <div key={exp.id} className="relative md:pl-16">
                  {/* Timeline dot */}
                  <div
                    className="absolute left-4 top-6 w-4 h-4 rounded-full border-2 border-white shadow-md hidden md:block"
                    style={{ backgroundColor: exp.color }}
                  />

                  <div
                    className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isExpanded ? 'border-blue-200 shadow-lg' : 'border-gray-100 shadow-sm hover:shadow-md'
                    }`}
                  >
                    {/* Header */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                      className="w-full text-left p-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          {getCompanyLogo(exp.company) && (
                            <img
                              src={getCompanyLogo(exp.company)!}
                              alt={exp.company}
                              className="w-12 h-12 rounded-lg object-contain bg-gray-50 flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h3 className="text-lg font-bold text-gray-900 font-['Space_Grotesk']">
                                {role}
                              </h3>
                              {exp.current && (
                                <span className="px-2.5 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full font-['Space_Grotesk']">
                                  {language === 'tr' ? 'Güncel' : language === 'de' ? 'Aktuell' : 'Current'}
                                </span>
                              )}
                            </div>
                            <p className="text-blue-600 font-semibold font-['Space_Grotesk']">{exp.company}</p>
                            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar size={13} />
                                {period}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin size={13} />
                                {exp.location}
                              </span>
                              {exp.team && (
                                <span className="flex items-center gap-1">
                                  <Users size={13} />
                                  {exp.team}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-gray-400">
                          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                      </div>
                    </button>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="px-6 pb-6 border-t border-gray-100">
                        {exp.budget && (
                          <div className="flex items-center gap-2 mt-4 mb-4 text-sm text-gray-600 bg-blue-50 rounded-lg px-3 py-2">
                            <DollarSign size={14} className="text-blue-600" />
                            <span className="font-semibold">{exp.budget}</span>
                          </div>
                        )}
                        <h4 className="text-sm font-bold text-gray-700 mb-3 mt-4 font-['Space_Grotesk']">
                          {language === 'tr' ? 'Temel Sorumluluklar & Başarılar' : language === 'de' ? 'Wichtigste Verantwortungen & Erfolge' : 'Key Responsibilities & Achievements'}
                        </h4>
                        <ul className="space-y-2">
                          {achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 font-['Nunito_Sans']">
                              <span className="text-blue-600 font-bold mt-0.5">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
