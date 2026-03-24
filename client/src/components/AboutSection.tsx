import { useLanguage } from '@/contexts/LanguageContext';
import { usePortfolioData } from '@/contexts/PortfolioDataContext';
import { GraduationCap, Languages, Briefcase } from 'lucide-react';

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-['Space_Grotesk']">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-lg text-gray-500 font-['Nunito_Sans']">{subtitle}</p>
      )}
      <div className="mt-4 w-16 h-1 bg-blue-600 rounded-full" />
    </div>
  );
}

export default function AboutSection() {
  const { t, language } = useLanguage();
  const { portfolioData } = usePortfolioData();
  const { education, languages, skills } = portfolioData;

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={t('about.title')}
          subtitle={t('about.subtitle')}
        />

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Description */}
          <div className="lg:col-span-2 space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed font-['Nunito_Sans']">
              {t('about.description1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed font-['Nunito_Sans']">
              {t('about.description2')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed font-['Nunito_Sans']">
              {t('about.description3')}
            </p>

            {/* Skills */}
            <div className="pt-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4 font-['Space_Grotesk'] flex items-center gap-2">
                <Briefcase size={18} className="text-blue-600" />
                {t('skills.title')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Education + Languages */}
          <div className="space-y-8">
            {/* Education */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-5 font-['Space_Grotesk'] flex items-center gap-2">
                <GraduationCap size={18} className="text-blue-600" />
                {t('about.education')}
              </h3>
              <div className="space-y-5">
                {education.map((edu, i) => (
                  <div key={i} className="border-l-2 border-blue-200 pl-4">
                    <p className="font-semibold text-gray-900 text-sm font-['Space_Grotesk']">
                      {edu.degree[language as keyof typeof edu.degree] || edu.degree.en}
                    </p>
                    <p className="text-blue-600 text-sm font-semibold mt-0.5">{edu.institution}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{edu.period} · {edu.location}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-5 font-['Space_Grotesk'] flex items-center gap-2">
                <Languages size={18} className="text-blue-600" />
                {t('about.languages')}
              </h3>
              <div className="space-y-4">
                {languages.map((lang, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-semibold text-gray-800 text-sm font-['Space_Grotesk']">
                        {lang.name[language as keyof typeof lang.name] || lang.name.en}
                      </span>
                      <span className="text-xs text-gray-500 font-['Nunito_Sans']">
                        {lang.level[language as keyof typeof lang.level] || lang.level.en}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                        style={{ width: `${lang.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
