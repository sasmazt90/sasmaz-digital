import { useLanguage } from '@/contexts/LanguageContext';
import { usePortfolioData } from '@/contexts/PortfolioDataContext';
import { Mail, Linkedin, MapPin, Globe, ExternalLink } from 'lucide-react';

export default function ContactSection() {
  const { t, language } = useLanguage();
  const { portfolioData } = usePortfolioData();
  const { personalInfo } = portfolioData;

  const contactItems = [
    {
      icon: Mail,
      label: t('contact.email'),
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: '#2563EB',
    },
    {
      icon: Linkedin,
      label: t('contact.linkedin'),
      value: 'ibrahim-tolgar-sasmaz',
      href: personalInfo.linkedin,
      color: '#0A66C2',
    },
    {
      icon: MapPin,
      label: t('contact.location'),
      value: 'Munich, Germany',
      href: null,
      color: '#EF4444',
    },
    {
      icon: Globe,
      label: t('contact.website'),
      value: 'sasmaz.digital',
      href: personalInfo.website,
      color: '#10B981',
    },
  ];

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-['Space_Grotesk']">
            {t('contact.title')}
          </h2>
          <p className="mt-3 text-lg text-gray-500 font-['Nunito_Sans']">
            {t('contact.subtitle')}
          </p>
          <div className="mt-4 w-16 h-1 bg-blue-600 rounded-full mx-auto" />
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-4">
            {contactItems.map((item, i) => {
              const Icon = item.icon;
              const content = (
                <div
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 group flex items-center gap-4"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <Icon size={20} style={{ color: item.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5 font-['Space_Grotesk']">
                      {item.label}
                    </p>
                    <p className="font-semibold text-gray-900 text-sm truncate font-['Nunito_Sans'] group-hover:text-blue-600 transition-colors">
                      {item.value}
                    </p>
                  </div>
                  {item.href && (
                    <ExternalLink size={14} className="text-gray-300 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                  )}
                </div>
              );

              return item.href ? (
                <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="block">
                  {content}
                </a>
              ) : (
                <div key={i}>{content}</div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all duration-200 hover:shadow-xl hover:shadow-blue-200 font-['Space_Grotesk'] text-lg"
            >
              <Mail size={20} />
              {t('hero.cta.contact')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
