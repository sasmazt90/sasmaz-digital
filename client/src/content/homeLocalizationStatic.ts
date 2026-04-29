export type SupportedLanguage = "en" | "de" | "tr";

type AwardItem = {
  title: string;
  subtitle: string;
  level: string;
  org: string;
};

export const localizedHeroMetrics: Record<
  SupportedLanguage,
  Array<{ value: string; label: string }>
> = {
  en: [
    { value: "12+", label: "Years Experience" },
    { value: "10+", label: "Team Members Led" },
    { value: "8-Figure", label: "Budget Managed" },
    { value: "3", label: "Markets Led" },
  ],
  de: [
    { value: "12+", label: "Jahre Erfahrung" },
    { value: "10+", label: "Geführte Teammitglieder" },
    { value: "8-stellig", label: "Verantwortetes Budget" },
    { value: "3", label: "Verantwortete Märkte" },
  ],
  tr: [
    { value: "12+", label: "Yıl Deneyim" },
    { value: "10+", label: "Yönetilen Ekip Üyesi" },
    { value: "8 Haneli", label: "Yönetilen Bütçe" },
    { value: "3", label: "Yönetilen Pazar" },
  ],
};

export const localizedAtsTags: Record<SupportedLanguage, string[]> = {
  en: [
    "Digital Transformation",
    "Growth Strategy",
    "Go-to-Market Strategy",
    "Stakeholder Management",
    "Team Leadership",
    "Generative AI Systems Design",
    "Data-Driven Decision Making",
    "Pricing Intelligence",
    "CLV/LTV Modeling",
    "Funnel Diagnostics",
    "Behavioral Analysis",
    "Digital Platform Design",
    "Low-Code Development",
    "Marketing Automation",
    "Omnichannel Strategy",
    "Performance Marketing",
    "CRM Strategy",
    "E-commerce Growth",
    "Power BI",
    "Power Apps",
    "Microsoft Dynamics 365",
  ],
  de: [
    "Digitale Transformation",
    "Wachstumsstrategie",
    "Go-to-Market-Strategie",
    "Stakeholder-Management",
    "Teamführung",
    "Design generativer KI-Systeme",
    "Datengetriebene Entscheidungsfindung",
    "Pricing Intelligence",
    "CLV/LTV-Modellierung",
    "Funnel-Diagnostik",
    "Verhaltensanalyse",
    "Design digitaler Plattformen",
    "Low-Code-Entwicklung",
    "Marketing-Automation",
    "Omnichannel-Strategie",
    "Performance Marketing",
    "CRM-Strategie",
    "E-Commerce-Wachstum",
    "Power BI",
    "Power Apps",
    "Microsoft Dynamics 365",
  ],
  tr: [
    "Dijital Dönüşüm",
    "Büyüme Stratejisi",
    "Pazara Giriş Stratejisi",
    "Paydaş Yönetimi",
    "Ekip Liderliği",
    "Üretken Yapay Zeka Sistem Tasarımı",
    "Veri Odaklı Karar Alma",
    "Fiyatlama Zekası",
    "CLV/LTV Modellemesi",
    "Funnel Diagnostiği",
    "Davranış Analizi",
    "Dijital Platform Tasarımı",
    "Low-Code Geliştirme",
    "Pazarlama Otomasyonu",
    "Omnichannel Stratejisi",
    "Performans Pazarlaması",
    "CRM Stratejisi",
    "E-Ticaret Büyümesi",
    "Power BI",
    "Power Apps",
    "Microsoft Dynamics 365",
  ],
};

export const localizedAwards: Record<SupportedLanguage, AwardItem[]> = {
  en: [
    {
      title: "Felis Awards 2019 - Best Integrated Campaign",
      subtitle: "\"Okumak Ne Guzel Sey\"",
      level: "Winner",
      org: "idefix",
    },
    {
      title: "MIXX Awards Turkiye 2020 - Best Integrated Campaign",
      subtitle: "\"Okumak Ne Guzel Sey\"",
      level: "Bronze",
      org: "idefix",
    },
    {
      title: "Social Media Awards Turkey 2020",
      subtitle: "Silver - Social Media Data Analytics",
      level: "Silver",
      org: "idefix",
    },
  ],
  de: [
    {
      title: "Felis Awards 2019 - Beste integrierte Kampagne",
      subtitle: "\"Okumak Ne Guzel Sey\"",
      level: "Gewinner",
      org: "idefix",
    },
    {
      title: "MIXX Awards Türkei 2020 - Beste integrierte Kampagne",
      subtitle: "\"Okumak Ne Guzel Sey\"",
      level: "Bronze",
      org: "idefix",
    },
    {
      title: "Social Media Awards Türkei 2020",
      subtitle: "Silber - Social Media Data Analytics",
      level: "Silber",
      org: "idefix",
    },
  ],
  tr: [
    {
      title: "Felis Awards 2019 - En İyi Entegre Kampanya",
      subtitle: "\"Okumak Ne Guzel Sey\"",
      level: "Kazanan",
      org: "idefix",
    },
    {
      title: "MIXX Awards Türkiye 2020 - En İyi Entegre Kampanya",
      subtitle: "\"Okumak Ne Guzel Sey\"",
      level: "Bronz",
      org: "idefix",
    },
    {
      title: "Social Media Awards Turkey 2020",
      subtitle: "Gümüş - Sosyal Medya Veri Analitiği",
      level: "Gümüş",
      org: "idefix",
    },
  ],
};
