import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'tr' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.achievements': 'Achievements',
    'nav.tools': 'Tools',
    'nav.certifications': 'Certifications',
    'nav.contact': 'Contact',

    // Hero
    'hero.title': 'Ibrahim Tolgar Sasmaz',
    'hero.subtitle': 'Head of Digital & AI Transformation Leader',
    'hero.description': 'Seasoned digital and business transformation leader with 12+ years delivering technology-driven growth in regulated healthcare and consumer markets.',
    'hero.cta.contact': 'Get in Touch',
    'hero.cta.resume': 'Download CV',
    'hero.location': 'Munich, Germany',
    'hero.years': 'Years Experience',
    'hero.team': 'Team Members Led',
    'hero.growth': 'E-commerce Growth',
    'hero.margin': 'Margin Uplift',

    // About
    'about.title': 'About Me',
    'about.subtitle': 'Digital Transformation & AI Strategy Leader',
    'about.description1': 'I am a seasoned digital and business transformation leader with more than twelve years of experience delivering technology-driven growth in regulated healthcare and consumer markets.',
    'about.description2': 'My expertise spans digital marketing, omnichannel strategy, CRM and e-commerce, data analytics and AI, low-code development, and regulated digital health solutions.',
    'about.description3': 'Currently leading DACH digital transformation at NAOS Deutschland (BIODERMA) in Munich, I combine strategic vision with hands-on execution to deliver measurable business impact.',
    'about.languages': 'Languages',
    'about.education': 'Education',

    // Experience
    'experience.title': 'Career Journey',
    'experience.subtitle': 'A decade-long track record of building and scaling digital capabilities',
    'experience.present': 'Present',
    'experience.responsibilities': 'Key Responsibilities & Achievements',

    // Projects
    'projects.title': 'AI Innovation & Product Portfolio',
    'projects.subtitle': 'AI-powered applications and digital solutions built to accelerate growth, automation and data-driven decision making — from experimental AI prototypes to enterprise-grade solutions.',
    'projects.vibe': 'Vibe Coding',
    'projects.powerapps': 'Power Apps',
    'projects.confidential': 'Confidential',
    'projects.view': 'View Project',

    // Achievements
    'achievements.title': 'Industry Impact & Recognition',
    'achievements.subtitle': 'Award-winning campaigns, measurable growth case studies and contributions to the digital marketing community.',
    'achievements.casestudies': 'Selected Case Studies',
    'achievements.speaking': 'Speaking & Mentorship',

    // Tools
    'tools.title': 'AI-Driven Marketing Technology Stack',
    'tools.subtitle': 'The platforms and tools I use to design scalable growth systems across performance marketing, CRM, analytics and business intelligence.',

    // Certifications
    'certifications.title': 'Executive Education & Certifications',
    'certifications.subtitle': 'Executive programs in AI, marketing analytics and growth strategy from globally recognized institutions.',

    // Contact
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Open to new opportunities and collaborations',
    'contact.email': 'Email',
    'contact.linkedin': 'LinkedIn',
    'contact.location': 'Location',
    'contact.website': 'Website',

    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.built': 'Built with passion for digital excellence.',

    // Skills
    'skills.title': 'Core Competencies',

    // Language names
    'lang.en': 'English',
    'lang.tr': 'Türkçe',
    'lang.de': 'Deutsch',
  },
  tr: {
    // Navigation
    'nav.home': 'Ana Sayfa',
    'nav.about': 'Hakkımda',
    'nav.experience': 'Deneyim',
    'nav.projects': 'Projeler',
    'nav.achievements': 'Başarılar',
    'nav.tools': 'Araçlar',
    'nav.certifications': 'Sertifikalar',
    'nav.contact': 'İletişim',

    // Hero
    'hero.title': 'İbrahim Tolgar Şaşmaz',
    'hero.subtitle': 'Dijital Başkanı & Yapay Zeka Dönüşüm Lideri',
    'hero.description': 'Düzenlenmiş sağlık ve tüketici pazarlarında teknoloji odaklı büyüme sağlayan 12+ yıllık deneyimli dijital ve iş dönüşümü lideri.',
    'hero.cta.contact': 'İletişime Geç',
    'hero.cta.resume': 'CV İndir',
    'hero.location': 'Münih, Almanya',
    'hero.years': 'Yıl Deneyim',
    'hero.team': 'Yönetilen Ekip Üyesi',
    'hero.growth': 'E-ticaret Büyümesi',
    'hero.margin': 'Marj Artışı',

    // About
    'about.title': 'Hakkımda',
    'about.subtitle': 'Dijital Dönüşüm & Yapay Zeka Strateji Lideri',
    'about.description1': 'Düzenlenmiş sağlık ve tüketici pazarlarında teknoloji odaklı büyüme sağlayan 12+ yıllık deneyimli dijital ve iş dönüşümü lideriyim.',
    'about.description2': 'Uzmanlığım; dijital pazarlama, çok kanallı strateji, CRM ve e-ticaret, veri analitiği ve yapay zeka, düşük kodlu geliştirme ve düzenlenmiş dijital sağlık çözümlerini kapsamaktadır.',
    'about.description3': 'Şu anda Münih\'te NAOS Deutschland (BIODERMA)\'da DACH dijital dönüşümünü yönetiyorum; stratejik vizyonu uygulamalı yürütmeyle birleştirerek ölçülebilir iş etkisi yaratıyorum.',
    'about.languages': 'Diller',
    'about.education': 'Eğitim',

    // Experience
    'experience.title': 'Kariyer Yolculuğu',
    'experience.subtitle': 'On yıllık dijital yetenekler oluşturma ve ölçeklendirme geçmişi',
    'experience.present': 'Günümüz',
    'experience.responsibilities': 'Temel Sorumluluklar ve Başarılar',

    // Projects
    'projects.title': 'Yapay Zeka İnovasyonu & Ürün Portföyü',
    'projects.subtitle': 'Büyümeyi hızlandırmak, otomasyonu ve veri odaklı karar almayı sağlamak için oluşturulan yapay zeka destekli uygulamalar ve dijital çözümler — deneysel yapay zeka prototiplerinden kurumsal çözümlere kadar.',
    'projects.vibe': 'Vibe Coding',
    'projects.powerapps': 'Power Apps',
    'projects.confidential': 'Gizli',
    'projects.view': 'Projeyi Görüntüle',

    // Achievements
    'achievements.title': 'Sektör Etkisi & Tanınma',
    'achievements.subtitle': 'Ödül kazanan kampanyalar, ölçülebilir büyüme vaka çalışmaları ve dijital pazarlama topluluğuna katkılar.',
    'achievements.casestudies': 'Seçili Vaka Çalışmaları',
    'achievements.speaking': 'Konuşmalar & Mentorluk',

    // Tools
    'tools.title': 'Yapay Zeka Odaklı Pazarlama Teknoloji Yığını',
    'tools.subtitle': 'Performans pazarlaması, CRM, analitik ve iş zekası arasında ölçeklenebilir büyüme sistemleri tasarlamak için kullandığım platformlar ve araçlar.',

    // Certifications
    'certifications.title': 'Yönetici Eğitimi & Sertifikalar',
    'certifications.subtitle': 'Küresel olarak tanınan kurumlardan yapay zeka, pazarlama analitiği ve büyüme stratejisinde yönetici programları.',

    // Contact
    'contact.title': 'İletişime Geç',
    'contact.subtitle': 'Yeni fırsatlara ve işbirliklere açığım',
    'contact.email': 'E-posta',
    'contact.linkedin': 'LinkedIn',
    'contact.location': 'Konum',
    'contact.website': 'Website',

    // Footer
    'footer.rights': 'Tüm hakları saklıdır.',
    'footer.built': 'Dijital mükemmellik tutkusuyla oluşturuldu.',

    // Skills
    'skills.title': 'Temel Yetkinlikler',

    // Language names
    'lang.en': 'English',
    'lang.tr': 'Türkçe',
    'lang.de': 'Deutsch',
  },
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.about': 'Über mich',
    'nav.experience': 'Erfahrung',
    'nav.projects': 'Projekte',
    'nav.achievements': 'Erfolge',
    'nav.tools': 'Tools',
    'nav.certifications': 'Zertifikate',
    'nav.contact': 'Kontakt',

    // Hero
    'hero.title': 'Ibrahim Tolgar Sasmaz',
    'hero.subtitle': 'Head of Digital & KI-Transformationsleiter',
    'hero.description': 'Erfahrener Digital- und Unternehmenstransformationsleiter mit über 12 Jahren Erfahrung in der Lieferung technologiegetriebenen Wachstums in regulierten Gesundheits- und Verbrauchermärkten.',
    'hero.cta.contact': 'Kontakt aufnehmen',
    'hero.cta.resume': 'Lebenslauf herunterladen',
    'hero.location': 'München, Deutschland',
    'hero.years': 'Jahre Erfahrung',
    'hero.team': 'Geführte Teammitglieder',
    'hero.growth': 'E-Commerce-Wachstum',
    'hero.margin': 'Margensteigerung',

    // About
    'about.title': 'Über mich',
    'about.subtitle': 'Digitale Transformation & KI-Strategieführer',
    'about.description1': 'Ich bin ein erfahrener Digital- und Unternehmenstransformationsleiter mit mehr als zwölf Jahren Erfahrung in der Lieferung technologiegetriebenen Wachstums in regulierten Gesundheits- und Verbrauchermärkten.',
    'about.description2': 'Meine Expertise umfasst digitales Marketing, Omnichannel-Strategie, CRM und E-Commerce, Datenanalyse und KI, Low-Code-Entwicklung sowie regulierte digitale Gesundheitslösungen.',
    'about.description3': 'Derzeit leite ich die DACH-Digitaltransformation bei NAOS Deutschland (BIODERMA) in München und kombiniere strategische Vision mit praktischer Umsetzung, um messbare Geschäftswirkung zu erzielen.',
    'about.languages': 'Sprachen',
    'about.education': 'Ausbildung',

    // Experience
    'experience.title': 'Karriereweg',
    'experience.subtitle': 'Ein jahrzehntelanges Erfolgsprotokoll beim Aufbau und der Skalierung digitaler Fähigkeiten',
    'experience.present': 'Heute',
    'experience.responsibilities': 'Hauptverantwortlichkeiten & Leistungen',

    // Projects
    'projects.title': 'KI-Innovation & Produktportfolio',
    'projects.subtitle': 'KI-gestützte Anwendungen und digitale Lösungen, die entwickelt wurden, um Wachstum, Automatisierung und datengesteuerte Entscheidungsfindung zu beschleunigen — von experimentellen KI-Prototypen bis zu unternehmensgerechten Lösungen.',
    'projects.vibe': 'Vibe Coding',
    'projects.powerapps': 'Power Apps',
    'projects.confidential': 'Vertraulich',
    'projects.view': 'Projekt ansehen',

    // Achievements
    'achievements.title': 'Branchenauswirkung & Anerkennung',
    'achievements.subtitle': 'Preisgekrönte Kampagnen, messbare Wachstumsfallstudien und Beiträge zur Digital-Marketing-Community.',
    'achievements.casestudies': 'Ausgewählte Fallstudien',
    'achievements.speaking': 'Vorträge & Mentoring',

    // Tools
    'tools.title': 'KI-gesteuerte Marketing-Technologie-Stack',
    'tools.subtitle': 'Die Plattformen und Tools, die ich verwende, um skalierbare Wachstumssysteme über Performance-Marketing, CRM, Analytics und Business Intelligence hinweg zu entwerfen.',

    // Certifications
    'certifications.title': 'Executive-Bildung & Zertifikate',
    'certifications.subtitle': 'Executive-Programme in KI, Marketing-Analytik und Wachstumsstrategie von weltweit anerkannten Institutionen.',

    // Contact
    'contact.title': 'Kontakt aufnehmen',
    'contact.subtitle': 'Offen für neue Möglichkeiten und Kooperationen',
    'contact.email': 'E-Mail',
    'contact.linkedin': 'LinkedIn',
    'contact.location': 'Standort',
    'contact.website': 'Website',

    // Footer
    'footer.rights': 'Alle Rechte vorbehalten.',
    'footer.built': 'Mit Leidenschaft für digitale Exzellenz entwickelt.',

    // Skills
    'skills.title': 'Kernkompetenzen',

    // Language names
    'lang.en': 'English',
    'lang.tr': 'Türkçe',
    'lang.de': 'Deutsch',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
