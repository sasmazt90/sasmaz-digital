import React, { createContext, useContext, useState } from "react";

export type Language = "en" | "tr" | "de";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.achievements": "Achievements",
    "nav.tools": "Tools",
    "nav.certifications": "Certifications",
    "nav.contact": "Contact",

    "hero.title": "Ibrahim Tolgar Sasmaz",
    "hero.subtitle": "Head of Digital & AI Transformation Leader",
    "hero.description":
      "Seasoned digital and business transformation leader with 12+ years delivering technology-driven growth in regulated healthcare and consumer markets.",
    "hero.cta.contact": "Get in Touch",
    "hero.cta.resume": "Download CV",
    "hero.location": "Munich, Germany",
    "hero.years": "Years Experience",
    "hero.team": "Team Members Led",
    "hero.growth": "E-commerce Growth",
    "hero.margin": "Margin Uplift",
    "hero.badge": "Munich, Germany",
    "hero.floatingRole": "Head of Digital",

    "about.title": "About Me",
    "about.subtitle": "Digital Transformation & AI Strategy Leader",
    "about.description1":
      "I am a seasoned digital and business transformation leader with more than twelve years of experience delivering technology-driven growth in regulated healthcare and consumer markets.",
    "about.description2":
      "My expertise spans digital marketing, omnichannel strategy, CRM and e-commerce, data analytics and AI, low-code development, and regulated digital health solutions.",
    "about.description3":
      "Currently leading DACH digital transformation at NAOS Deutschland (BIODERMA) in Munich, I combine strategic vision with hands-on execution to deliver measurable business impact.",
    "about.languages": "Languages",
    "about.education": "Education",

    "experience.title": "Career Journey",
    "experience.subtitle":
      "A decade-long track record of building and scaling digital capabilities",
    "experience.present": "Present",
    "experience.responsibilities": "Key Responsibilities & Achievements",
    "experience.current": "Current",

    "projects.title": "AI Innovation & Product Portfolio",
    "projects.subtitle":
      "AI-powered applications and digital solutions built to accelerate growth, automation and data-driven decision making from experimental AI prototypes to enterprise-grade solutions.",
    "projects.vibe": "Vibe Coding",
    "projects.powerapps": "Power Apps",
    "projects.powerapps.description":
      "Low-code enterprise applications built with Microsoft Power Apps and Power Automate for streamlined operations and digital transformation.",
    "projects.confidential": "Confidential",
    "projects.view": "View Project",

    "achievements.title": "Industry Impact & Recognition",
    "achievements.subtitle":
      "Award-winning campaigns, measurable growth case studies and contributions to the digital marketing community.",
    "achievements.casestudies": "Selected Case Studies",
    "achievements.speaking": "Speaking & Mentorship",
    "achievements.awards": "Awards",
    "achievements.winners": "See Winners List",
    "achievements.viewCaseStudy": "View Case Study",
    "achievements.view": "View",

    "tools.title": "AI-Driven Marketing Technology Stack",
    "tools.subtitle":
      "The platforms and tools I use to design scalable growth systems across performance marketing, CRM, analytics and business intelligence.",
    "tools.count.single": "tool",
    "tools.count.plural": "tools",
    "tools.total": "tools and platforms",

    "certifications.title": "Executive Education & Certifications",
    "certifications.subtitle":
      "Executive programs in AI, marketing analytics and growth strategy from globally recognized institutions.",
    "certifications.certified": "Certified",
    "certifications.closePreview": "Close certificate preview",

    "contact.title": "Get In Touch",
    "contact.subtitle": "Open to new opportunities and collaborations",
    "contact.email": "Email",
    "contact.linkedin": "LinkedIn",
    "contact.location": "Location",
    "contact.website": "Website",

    "footer.rights": "All rights reserved.",
    "footer.built": "Built with passion for digital excellence.",
    "footer.role": "Head of Digital · AI Transformation Leader",

    "skills.title": "Core Competencies",

    "action.closeVideo": "Close video",
    "action.videoDemo": "Video demo",
    "action.scrollTop": "Scroll to top",
    "action.openLanguageMenu": "Open language menu",
    "action.openNavigationMenu": "Open navigation menu",
    "action.closeNavigationMenu": "Close navigation menu",
    "action.switchToDarkMode": "Switch to dark mode",
    "action.switchToLightMode": "Switch to light mode",

    "lang.en": "English",
    "lang.tr": "Türkçe",
    "lang.de": "Deutsch",
  },
  tr: {
    "nav.home": "Ana Sayfa",
    "nav.about": "Hakkımda",
    "nav.experience": "Deneyim",
    "nav.projects": "Projeler",
    "nav.achievements": "Başarılar",
    "nav.tools": "Araçlar",
    "nav.certifications": "Sertifikalar",
    "nav.contact": "İletişim",

    "hero.title": "İbrahim Tolgar Şaşmaz",
    "hero.subtitle": "Dijital Başkanı & Yapay Zeka Dönüşüm Lideri",
    "hero.description":
      "Düzenlenmiş sağlık ve tüketici pazarlarında teknoloji odaklı büyüme sağlayan 12+ yıllık deneyimli dijital ve iş dönüşümü lideri.",
    "hero.cta.contact": "İletişime Geç",
    "hero.cta.resume": "CV İndir",
    "hero.location": "Münih, Almanya",
    "hero.years": "Yıl Deneyim",
    "hero.team": "Yönetilen Ekip",
    "hero.growth": "E-ticaret Büyümesi",
    "hero.margin": "Marj Artışı",
    "hero.badge": "Münih, Almanya",
    "hero.floatingRole": "Dijital Başkanı",

    "about.title": "Hakkımda",
    "about.subtitle": "Dijital Dönüşüm & Yapay Zeka Strateji Lideri",
    "about.description1":
      "Düzenlenmiş sağlık ve tüketici pazarlarında teknoloji odaklı büyüme sağlayan on iki yılı aşkın deneyime sahip dijital ve iş dönüşümü lideriyim.",
    "about.description2":
      "Uzmanlığım dijital pazarlama, çok kanallı strateji, CRM ve e-ticaret, veri analitiği ve yapay zeka, low-code geliştirme ve regüle dijital sağlık çözümlerini kapsar.",
    "about.description3":
      "Şu anda Münih'te NAOS Deutschland (BIODERMA) bünyesinde DACH dijital dönüşümünü yönetiyor; stratejik vizyonu uygulamalı icra ile birleştirerek ölçülebilir iş etkisi yaratıyorum.",
    "about.languages": "Diller",
    "about.education": "Eğitim",

    "experience.title": "Kariyer Yolculuğu",
    "experience.subtitle":
      "Dijital yetkinlikleri kurma ve ölçekleme konusunda on yıla yayılan güçlü geçmiş",
    "experience.present": "Günümüz",
    "experience.responsibilities": "Temel Sorumluluklar & Başarılar",
    "experience.current": "Güncel",

    "projects.title": "Yapay Zeka İnovasyonu & Ürün Portföyü",
    "projects.subtitle":
      "Büyümeyi, otomasyonu ve veri odaklı karar almayı hızlandırmak için geliştirilen yapay zeka destekli uygulamalar ve dijital çözümler; deneysel prototiplerden kurumsal ölçekli çözümlere uzanır.",
    "projects.vibe": "Vibe Coding",
    "projects.powerapps": "Power Apps",
    "projects.powerapps.description":
      "Microsoft Power Apps ve Power Automate ile geliştirilen, operasyonları sadeleştiren ve dijital dönüşümü hızlandıran low-code kurumsal uygulamalar.",
    "projects.confidential": "Gizli",
    "projects.view": "Projeyi Görüntüle",

    "achievements.title": "Sektör Etkisi & Tanınırlık",
    "achievements.subtitle":
      "Ödül kazanan kampanyalar, ölçülebilir büyüme vaka çalışmaları ve dijital pazarlama topluluğuna katkılar.",
    "achievements.casestudies": "Seçili Vaka Çalışmaları",
    "achievements.speaking": "Konuşmalar & Mentorluk",
    "achievements.awards": "Ödüller",
    "achievements.winners": "Kazananlar Listesini Gör",
    "achievements.viewCaseStudy": "Vaka Çalışmasını Görüntüle",
    "achievements.view": "Görüntüle",

    "tools.title": "Yapay Zeka Odaklı Pazarlama Teknoloji Yığını",
    "tools.subtitle":
      "Performans pazarlaması, CRM, analitik ve iş zekası genelinde ölçeklenebilir büyüme sistemleri tasarlamak için kullandığım platformlar ve araçlar.",
    "tools.count.single": "araç",
    "tools.count.plural": "araç",
    "tools.total": "araç ve platform",

    "certifications.title": "Yönetici Eğitimi & Sertifikalar",
    "certifications.subtitle":
      "Küresel olarak tanınan kurumlardan yapay zeka, pazarlama analitiği ve büyüme stratejisi odaklı yönetici programları.",
    "certifications.certified": "Sertifikalı",
    "certifications.closePreview": "Sertifika önizlemesini kapat",

    "contact.title": "İletişime Geç",
    "contact.subtitle": "Yeni fırsatlara ve işbirliklerine açığım",
    "contact.email": "E-posta",
    "contact.linkedin": "LinkedIn",
    "contact.location": "Konum",
    "contact.website": "Web Sitesi",

    "footer.rights": "Tüm hakları saklıdır.",
    "footer.built": "Dijital mükemmellik tutkusu ile oluşturuldu.",
    "footer.role": "Dijital Başkanı · Yapay Zeka Dönüşüm Lideri",

    "skills.title": "Temel Yetkinlikler",

    "action.closeVideo": "Videoyu kapat",
    "action.videoDemo": "Video demosu",
    "action.scrollTop": "Sayfanın başına dön",
    "action.openLanguageMenu": "Dil menüsünü aç",
    "action.openNavigationMenu": "Gezinme menüsünü aç",
    "action.closeNavigationMenu": "Gezinme menüsünü kapat",
    "action.switchToDarkMode": "Koyu moda geç",
    "action.switchToLightMode": "Açık moda geç",

    "lang.en": "English",
    "lang.tr": "Türkçe",
    "lang.de": "Deutsch",
  },
  de: {
    "nav.home": "Startseite",
    "nav.about": "Über mich",
    "nav.experience": "Erfahrung",
    "nav.projects": "Projekte",
    "nav.achievements": "Erfolge",
    "nav.tools": "Tools",
    "nav.certifications": "Zertifikate",
    "nav.contact": "Kontakt",

    "hero.title": "Ibrahim Tolgar Sasmaz",
    "hero.subtitle": "Head of Digital & KI-Transformationsleiter",
    "hero.description":
      "Erfahrener Digital- und Transformationsexperte mit über 12 Jahren Erfahrung beim Aufbau technologiegetriebenen Wachstums in regulierten Gesundheits- und Verbrauchermärkten.",
    "hero.cta.contact": "Kontakt aufnehmen",
    "hero.cta.resume": "Lebenslauf herunterladen",
    "hero.location": "München, Deutschland",
    "hero.years": "Jahre Erfahrung",
    "hero.team": "Geführte Teammitglieder",
    "hero.growth": "E-Commerce-Wachstum",
    "hero.margin": "Margensteigerung",
    "hero.badge": "München, Deutschland",
    "hero.floatingRole": "Head of Digital",

    "about.title": "Über mich",
    "about.subtitle": "Digitale Transformation & KI-Strategie",
    "about.description1":
      "Ich bin ein erfahrener Digital- und Transformationsexperte mit mehr als zwölf Jahren Erfahrung beim Aufbau technologiegetriebenen Wachstums in regulierten Gesundheits- und Verbrauchermärkten.",
    "about.description2":
      "Meine Expertise umfasst digitales Marketing, Omnichannel-Strategie, CRM und E-Commerce, Datenanalyse und KI, Low-Code-Entwicklung sowie regulierte digitale Gesundheitslösungen.",
    "about.description3":
      "Aktuell leite ich die digitale Transformation für DACH bei NAOS Deutschland (BIODERMA) in München und verbinde strategische Vision mit operativer Umsetzung, um messbare Geschäftswirkung zu erzielen.",
    "about.languages": "Sprachen",
    "about.education": "Ausbildung",

    "experience.title": "Karriereweg",
    "experience.subtitle":
      "Eine über zehn Jahre aufgebaute Erfolgsbilanz beim Aufbau und der Skalierung digitaler Fähigkeiten",
    "experience.present": "Heute",
    "experience.responsibilities": "Wichtigste Verantwortungen & Erfolge",
    "experience.current": "Aktuell",

    "projects.title": "KI-Innovation & Produktportfolio",
    "projects.subtitle":
      "KI-gestützte Anwendungen und digitale Lösungen, entwickelt zur Beschleunigung von Wachstum, Automatisierung und datengetriebener Entscheidungsfindung von experimentellen Prototypen bis zu unternehmensreifen Lösungen.",
    "projects.vibe": "Vibe Coding",
    "projects.powerapps": "Power Apps",
    "projects.powerapps.description":
      "Low-Code-Unternehmensanwendungen mit Microsoft Power Apps und Power Automate für schlankere Abläufe und digitale Transformation.",
    "projects.confidential": "Vertraulich",
    "projects.view": "Projekt ansehen",

    "achievements.title": "Brancheneinfluss & Anerkennung",
    "achievements.subtitle":
      "Preisgekrönte Kampagnen, messbare Wachstumsfallstudien und Beiträge zur Digital-Marketing-Community.",
    "achievements.casestudies": "Ausgewählte Fallstudien",
    "achievements.speaking": "Vorträge & Mentoring",
    "achievements.awards": "Auszeichnungen",
    "achievements.winners": "Gewinnerliste ansehen",
    "achievements.viewCaseStudy": "Fallstudie ansehen",
    "achievements.view": "Ansehen",

    "tools.title": "KI-gestützter Marketing-Technologie-Stack",
    "tools.subtitle":
      "Die Plattformen und Tools, die ich nutze, um skalierbare Wachstumssysteme über Performance Marketing, CRM, Analytics und Business Intelligence hinweg zu gestalten.",
    "tools.count.single": "Tool",
    "tools.count.plural": "Tools",
    "tools.total": "Tools und Plattformen",

    "certifications.title": "Executive-Bildung & Zertifikate",
    "certifications.subtitle":
      "Executive-Programme in KI, Marketing-Analytik und Wachstumsstrategie von weltweit anerkannten Institutionen.",
    "certifications.certified": "Zertifiziert",
    "certifications.closePreview": "Zertifikatsvorschau schließen",

    "contact.title": "Kontakt aufnehmen",
    "contact.subtitle": "Offen für neue Möglichkeiten und Kooperationen",
    "contact.email": "E-Mail",
    "contact.linkedin": "LinkedIn",
    "contact.location": "Standort",
    "contact.website": "Website",

    "footer.rights": "Alle Rechte vorbehalten.",
    "footer.built": "Mit Leidenschaft für digitale Exzellenz entwickelt.",
    "footer.role": "Head of Digital · KI-Transformationsleiter",

    "skills.title": "Kernkompetenzen",

    "action.closeVideo": "Video schließen",
    "action.videoDemo": "Video-Demo",
    "action.scrollTop": "Nach oben scrollen",
    "action.openLanguageMenu": "Sprachmenü öffnen",
    "action.openNavigationMenu": "Navigationsmenü öffnen",
    "action.closeNavigationMenu": "Navigationsmenü schließen",
    "action.switchToDarkMode": "Zum dunklen Modus wechseln",
    "action.switchToLightMode": "Zum hellen Modus wechseln",

    "lang.en": "English",
    "lang.tr": "Türkçe",
    "lang.de": "Deutsch",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
