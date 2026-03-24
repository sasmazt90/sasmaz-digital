import { useLanguage } from '@/contexts/LanguageContext';
import { usePortfolioData } from '@/contexts/PortfolioDataContext';
import { Linkedin, Mail, Globe } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
  const { portfolioData } = usePortfolioData();
  const { personalInfo } = portfolioData;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold font-['Space_Grotesk']">
              ITS
            </div>
            <div>
              <p className="font-bold font-['Space_Grotesk']">{personalInfo.name}</p>
              <p className="text-xs text-gray-400 font-['Nunito_Sans']">Head of Digital · AI Transformation Leader</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2.5 bg-gray-800 rounded-xl hover:bg-blue-600 transition-colors"
            >
              <Mail size={16} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-gray-800 rounded-xl hover:bg-blue-600 transition-colors"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={personalInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-gray-800 rounded-xl hover:bg-blue-600 transition-colors"
            >
              <Globe size={16} />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400 font-['Nunito_Sans']">
              © {year} {personalInfo.name}. {t('footer.rights')}
            </p>
            <p className="text-xs text-gray-500 mt-0.5 font-['Nunito_Sans']">
              {t('footer.built')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
