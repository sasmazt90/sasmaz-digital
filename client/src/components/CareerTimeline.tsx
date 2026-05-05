import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { usePortfolioData } from '@/contexts/PortfolioDataContext';
import { X, MapPin, Users, DollarSign } from 'lucide-react';

export default function CareerTimeline() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const { portfolioData } = usePortfolioData();
  const { experiences } = portfolioData;
  const [hoveredExp, setHoveredExp] = useState<number | null>(null);

  // Sort experiences by date (oldest first - chronological order)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const parseDate = (dateStr: string) => {
      const match = dateStr.match(/(\d{2})\/(\d{4})/);
      if (!match) return 0;
      return parseInt(match[2]) * 100 + parseInt(match[1]);
    };

    const aPeriod = a.period[language as keyof typeof a.period] || a.period.en;
    const bPeriod = b.period[language as keyof typeof b.period] || b.period.en;
    
    const aStart = parseDate(aPeriod.split('–')[0]);
    const bStart = parseDate(bPeriod.split('–')[0]);
    
    return aStart - bStart;
  });

  const getCompanyLogo = (company: string) => {
    const logos: Record<string, string> = {
      'NAOS Deutschland (BIODERMA)': '/assets/logos/companies/naos-logo.webp',
      'NAOS Türkiye (BIODERMA / Institut Esthederm / Etat Pur)': '/assets/logos/companies/naos-logo.webp',
      'NAOS Türkiye': '/assets/logos/companies/naos-logo.webp',
      'D&R / idefix': '/assets/logos/companies/d&r-logo.webp',
      '8digits (SaaS Analytics & CRO Startup)': '/assets/logos/companies/8digits-logo.webp',
      'Emarsys (SAP Marketing Cloud)': '/assets/logos/companies/emarsys-logo.webp',
      'Lidyana.com': '/assets/logos/companies/lidyana-logo.webp',
    };
    return logos[company] || null;
  };

  const getStartDate = (period: string) => {
    const parts = period.split('–');
    if (parts.length === 0) return '';
    return parts[0].trim();
  };

  return (
    <section id="experience" className={`py-12 transition-colors ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className={`text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {t('experience.title')}
          </h2>
          <p className={`mt-3 text-lg font-['Nunito_Sans'] ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            {t('experience.subtitle')}
          </p>
          <div className="mt-4 w-16 h-1 bg-blue-600 rounded-full" />
        </div>

        {/* Timeline Container */}
        <div className={`rounded-2xl p-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'} overflow-x-auto relative`}>
          {/* Horizontal line */}
          <div className="absolute left-8 right-8 h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-200 rounded-full" style={{ top: '140px' }} />

          <div className="min-w-max px-4">
            {/* Timeline Structure */}
            <div className="flex items-start justify-between gap-8 relative z-10">
              {sortedExperiences.map((exp) => {
                const isHovered = hoveredExp === exp.id;
                const role = exp.role[language as keyof typeof exp.role] || exp.role.en;
                const startDate = getStartDate(exp.period[language as keyof typeof exp.period] || exp.period.en);

                return (
                  <div
                    key={exp.id}
                    className="flex-shrink-0 w-24 flex flex-col items-center"
                    onMouseEnter={() => setHoveredExp(exp.id)}
                    onMouseLeave={() => setHoveredExp(null)}
                  >
                    {/* Title - Above Logo - 2 lines max, no ellipsis */}
                    <div className="h-12 flex items-center justify-center mb-2 w-full">
                      <p className={`text-xs font-bold font-['Space_Grotesk'] leading-tight text-center break-words whitespace-normal ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {role}
                      </p>
                    </div>

                    {/* Logo Button */}
                    <button
                      className={`w-16 h-16 rounded-full border-4 transition-all duration-300 flex items-center justify-center flex-shrink-0 relative z-20 ${
                        isHovered
                          ? 'border-blue-600 shadow-lg scale-125'
                          : `border-white shadow-md hover:shadow-lg hover:scale-110 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`
                      }`}
                      style={{ backgroundColor: isHovered ? exp.color : undefined }}
                    >
                      {getCompanyLogo(exp.company) && (
                        <img
                          src={getCompanyLogo(exp.company)!}
                          alt={exp.company}
                          className="w-12 h-12 rounded-full object-contain"
                        />
                      )}
                    </button>

                    {/* Date - Below Logo */}
                    <div className="h-6 flex items-center justify-center mt-2">
                      <p className={`text-xs font-['Nunito_Sans'] ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {startDate}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Hover Detail Popup - Fixed flickering by using pointer-events */}
        {hoveredExp !== null && (
          <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center p-4">
            {sortedExperiences.map((exp) => {
              if (exp.id !== hoveredExp) return null;

              const role = exp.role[language as keyof typeof exp.role] || exp.role.en;
              const period = exp.period[language as keyof typeof exp.period] || exp.period.en;
              const achievements = exp.achievements[language as keyof typeof exp.achievements] || exp.achievements.en;

              return (
                <div
                  key={exp.id}
                  className={`pointer-events-auto rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-2xl border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
                  onMouseEnter={() => setHoveredExp(exp.id)}
                  onMouseLeave={() => setHoveredExp(null)}
                >
                  {/* Header */}
                  <div className={`sticky top-0 bg-gradient-to-r from-blue-50 to-blue-100 p-6 border-b ${theme === 'dark' ? 'from-gray-700 to-gray-600 border-gray-600' : 'border-blue-200'} flex items-start justify-between`}>
                    <div className="flex items-start gap-4 flex-1">
                      {getCompanyLogo(exp.company) && (
                        <img
                          src={getCompanyLogo(exp.company)!}
                          alt={exp.company}
                          className={`w-16 h-16 rounded-lg object-contain p-2 flex-shrink-0 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}
                        />
                      )}
                      <div>
                        <h3 className={`text-2xl font-bold font-['Space_Grotesk'] ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {role}
                        </h3>
                        <p className="text-blue-600 font-semibold mt-1">{exp.company}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-6 space-y-6 ${theme === 'dark' ? 'text-gray-200' : ''}`}>
                    {/* Meta Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}`}>
                          <span className="text-xs font-bold text-blue-600">📅</span>
                        </div>
                        <div>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Period</p>
                          <p className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{period}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}`}>
                          <MapPin size={14} className="text-blue-600" />
                        </div>
                        <div>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Location</p>
                          <p className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{exp.location}</p>
                        </div>
                      </div>
                      {exp.team && (
                        <div className="flex items-center gap-2 text-sm">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}`}>
                            <Users size={14} className="text-blue-600" />
                          </div>
                          <div>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Team</p>
                            <p className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{exp.team}</p>
                          </div>
                        </div>
                      )}
                      {exp.budget && (
                        <div className="flex items-center gap-2 text-sm">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}`}>
                            <DollarSign size={14} className="text-blue-600" />
                          </div>
                          <div>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Budget</p>
                            <p className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{exp.budget}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className={`text-sm font-bold mb-4 font-['Space_Grotesk'] ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                        {language === 'tr'
                          ? 'Temel Sorumluluklar & Başarılar'
                          : language === 'de'
                          ? 'Wichtigste Verantwortungen & Erfolge'
                          : 'Key Responsibilities & Achievements'}
                      </h4>
                      <ul className="space-y-3">
                        {achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-blue-600 font-bold mt-0.5 flex-shrink-0">✓</span>
                            <span className={`text-sm leading-relaxed font-['Nunito_Sans'] ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                              {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
