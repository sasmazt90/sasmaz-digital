import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Globe,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Moon,
  Play,
  Sparkles,
  Sun,
  Trophy,
  X,
} from "lucide-react";
import { usePortfolioData } from "@/contexts/PortfolioDataContext";
import { useSiteContent } from "@/contexts/SiteContentContext";

type Language = "en" | "de" | "tr";
type ThemeMode = "light" | "dark";
type MediaModal =
  | { type: "youtube"; url: string; title: string }
  | { type: "video"; url: string; title: string }
  | null;

type TimelineItem = {
  year: string;
  company: string;
  brand: string;
  role: string;
  location: string;
  logo: string;
  focus: string;
  meta: string[];
  bullets: string[];
};

type CarouselCard = {
  key: string;
  content: ReactNode;
};

const navItems = [
  { key: "about", href: "#about" },
  { key: "journey", href: "#journey" },
  { key: "impact", href: "#impact" },
  { key: "products", href: "#products" },
  { key: "work", href: "#work" },
  { key: "tools", href: "#tools" },
  { key: "credentials", href: "#credentials" },
  { key: "contact", href: "#contact" },
] as const;

const toYoutubeEmbed = (url: string) => {
  const match = url.match(/(?:youtu\.be\/|v=)([^?&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

const heroPhotos = [
  "/assets/profile/profile-picture.jpeg",
  "/assets/photos/naos-annual-meeting-2023.png",
  "/assets/photos/naos-annual-meeting-2022.png",
  "/assets/photos/naos-annual-meeting-2021.png",
];

const translations = {
  en: {
    nav: {
      about: "About",
      journey: "Journey",
      impact: "Impact",
      products: "Products",
      work: "Work",
      tools: "Tools",
      credentials: "Credentials",
      contact: "Contact",
    },
    badge: "Head of Digital & AI Transformation Leader",
    title: "Head of Digital & CRM | E-Commerce & Growth | AI, Analytics & Transformation",
    summary:
      "Senior digital and business transformation leader with 12+ years of experience delivering technology-driven growth, commercial rigor and scalable operating models across regulated healthcare, retail and consumer markets.",
    cta: "Get in Touch",
    heroLabel: "Head of Digital",
    aboutEyebrow: "About",
    aboutTitle: "A leadership profile built on measurable commercial outcomes.",
    aboutBody1:
      "Combines growth strategy, CRM, analytics, marketplace execution and AI-enabled operations into one integrated management discipline.",
    aboutBody2:
      "Brings together strategic clarity and hands-on execution, with a track record of scaling teams, simplifying complexity and building performance systems executives can trust.",
    journeyEyebrow: "Career Journey",
    journeyTitle: "A decade-long record of building digital capability and commercial impact.",
    impactEyebrow: "Measurable Impact",
    impactTitle: "Concrete business outcomes delivered across markets and growth stages.",
    impactSubtitle: "Key performance improvements (%)",
    competencyTitle: "Competency profile",
    productsEyebrow: "Vibe Coding & AI Products",
    productsTitle: "Applications personally built with AI, low-code and no-code execution.",
    workEyebrow: "Selected Work",
    workTitle: "Representative case studies and digital video production work.",
    videoTitle: "Digital Video Production",
    videoSubtitle: "Selected video production work developed across brand communication, campaign activation and commercial storytelling.",
    toolsEyebrow: "AI-Driven Marketing Technology Stack",
    toolsTitle: "Platforms and tools used to design scalable growth systems across CRM, analytics, performance and business intelligence.",
    credentialsEyebrow: "Credentials",
    credentialsTitle: "Education, speaking engagements and certifications supporting the work.",
    stageEyebrow: "Leadership Moments",
    stageTitle: "Selected moments from annual meetings, business storytelling and executive presentations.",
    contactEyebrow: "Contact",
    contactTitle: "Open to strategic digital, e-commerce and AI transformation conversations.",
    contactBody:
      "Available for leadership opportunities, advisory discussions and executive conversations around growth, CRM, analytics and AI-enabled transformation.",
    measurableLabels: ["OPEX Reduction", "Acquisition Growth", "LTV Increase", "Sell-out Growth", "Margin Uplift", "Conversion Rate"],
    competencies: [
      { label: "AI / GenAI", value: 92 },
      { label: "Performance Marketing", value: 90 },
      { label: "CRM & Automation", value: 88 },
      { label: "Data Analytics", value: 91 },
      { label: "Team Leadership", value: 86 },
      { label: "Strategy", value: 94 },
    ],
    languagesTitle: "Languages",
    speakingTitle: "Speaking & Mentorship",
    educationTitle: "Education",
    certificationsTitle: "Certifications",
    openLive: "Open Product",
    watchWalkthrough: "Watch Demo",
    openCase: "View Case Study",
    watchVideo: "Watch",
    footer: "Digital growth, AI systems and transformation leadership.",
  },
  de: {
    nav: {
      about: "Überblick",
      journey: "Werdegang",
      impact: "Impact",
      products: "Produkte",
      work: "Cases",
      tools: "Tools",
      credentials: "Profile",
      contact: "Kontakt",
    },
    badge: "Head of Digital & AI Transformation Leader",
    title: "Head of Digital & CRM | E-Commerce & Growth | AI, Analytics & Transformation",
    summary:
      "Führungskraft für digitale Transformation mit über 12 Jahren Erfahrung in technologiegetriebenem Wachstum, operativer Exzellenz und skalierbaren Modellen in regulierten Healthcare-, Retail- und Consumer-Umfeldern.",
    cta: "Kontakt aufnehmen",
    heroLabel: "Head of Digital",
    aboutEyebrow: "Überblick",
    aboutTitle: "Ein Führungsprofil mit klarem Fokus auf messbare Geschäftsergebnisse.",
    aboutBody1:
      "Verbindet Wachstumsstrategie, CRM, Analytics, Marketplace Execution und KI-gestützte Operations zu einer integrierten Management-Disziplin.",
    aboutBody2:
      "Vereint strategische Klarheit mit operativer Umsetzung und verfügt über eine belastbare Erfolgsbilanz beim Aufbau von Teams, Performance-Systemen und skalierbaren digitalen Strukturen.",
    journeyEyebrow: "Karriereweg",
    journeyTitle: "Ein Jahrzehnt Aufbau digitaler Fähigkeiten und kommerzieller Wirkung.",
    impactEyebrow: "Messbarer Impact",
    impactTitle: "Konkrete Geschäftsergebnisse über verschiedene Märkte und Wachstumsphasen hinweg.",
    impactSubtitle: "Wesentliche Leistungsverbesserungen (%)",
    competencyTitle: "Kompetenzprofil",
    productsEyebrow: "Vibe Coding & KI-Produkte",
    productsTitle: "Persönlich entwickelte Anwendungen mit KI, Low-Code und No-Code.",
    workEyebrow: "Ausgewählte Arbeiten",
    workTitle: "Relevante Case Studies und Arbeiten im Bereich Digital Video Production.",
    videoTitle: "Digital Video Production",
    videoSubtitle: "Ausgewählte Videoarbeiten aus Markenkommunikation, Kampagnenaktivierung und kommerziellem Storytelling.",
    toolsEyebrow: "AI-Driven Marketing Technology Stack",
    toolsTitle: "Plattformen und Tools für skalierbare Growth-Systeme in CRM, Analytics, Performance und BI.",
    credentialsEyebrow: "Profil",
    credentialsTitle: "Ausbildung, Speaking und Zertifizierungen als Fundament der Arbeit.",
    stageEyebrow: "Leadership Moments",
    stageTitle: "Ausgewählte Momente aus Annual Meetings, Business Storytelling und Executive Presentations.",
    contactEyebrow: "Kontakt",
    contactTitle: "Offen für strategische Gespräche zu Digital, E-Commerce und KI-Transformation.",
    contactBody:
      "Verfügbar für Führungsrollen, Advisory-Mandate und strategische Gespräche rund um Growth, CRM, Analytics und AI-enabled Transformation.",
    measurableLabels: ["OPEX-Reduktion", "Akquisitionswachstum", "LTV-Steigerung", "Sell-out-Wachstum", "Margenplus", "Conversion Rate"],
    competencies: [
      { label: "AI / GenAI", value: 92 },
      { label: "Performance Marketing", value: 90 },
      { label: "CRM & Automation", value: 88 },
      { label: "Data Analytics", value: 91 },
      { label: "Team Leadership", value: 86 },
      { label: "Strategie", value: 94 },
    ],
    languagesTitle: "Sprachen",
    speakingTitle: "Speaking & Mentorship",
    educationTitle: "Ausbildung",
    certificationsTitle: "Zertifizierungen",
    openLive: "Produkt öffnen",
    watchWalkthrough: "Demo ansehen",
    openCase: "Case Study öffnen",
    watchVideo: "Ansehen",
    footer: "Digital Growth, AI Systems und Transformation Leadership.",
  },
  tr: {
    nav: {
      about: "Hakkımda",
      journey: "Kariyer",
      impact: "Etki",
      products: "Ürünler",
      work: "Projeler",
      tools: "Tool'lar",
      credentials: "Profil",
      contact: "İletişim",
    },
    badge: "Head of Digital & AI Transformation Leader",
    title: "Head of Digital & CRM | E-Commerce & Growth | AI, Analytics & Transformation",
    summary:
      "Regüle sağlık, perakende ve tüketici odaklı sektörlerde teknoloji destekli büyüme, ticari disiplin ve ölçeklenebilir operasyon modelleri geliştiren 12+ yıllık deneyime sahip dijital dönüşüm lideri.",
    cta: "İletişime Geç",
    heroLabel: "Head of Digital",
    aboutEyebrow: "Hakkımda",
    aboutTitle: "Ölçülebilir ticari sonuçlara odaklanan bir liderlik profili.",
    aboutBody1:
      "Büyüme stratejisi, CRM, analitik, marketplace yönetimi ve yapay zeka destekli operasyonları tek bir entegre yönetim disiplini altında birleştirir.",
    aboutBody2:
      "Stratejik bakış açısını uygulama gücüyle bir araya getirir; ekip ölçekleme, karmaşıklığı sadeleştirme ve güvenilir performans sistemleri kurma konusunda güçlü bir geçmişe sahiptir.",
    journeyEyebrow: "Kariyer Yolculuğu",
    journeyTitle: "Dijital yetkinlik ve ticari etki inşa edilen on yıllık bir kariyer yolculuğu.",
    impactEyebrow: "Ölçülebilir Etki",
    impactTitle: "Farklı pazarlar ve büyüme aşamalarında üretilen somut iş sonuçları.",
    impactSubtitle: "Temel performans gelişimleri (%)",
    competencyTitle: "Yetkinlik profili",
    productsEyebrow: "Vibe Coding & AI Ürünleri",
    productsTitle: "AI, low-code ve no-code ile bizzat geliştirilen uygulamalar.",
    workEyebrow: "Seçili İşler",
    workTitle: "Öne çıkan case study'ler ve dijital video prodüksiyon çalışmaları.",
    videoTitle: "Dijital Video Prodüksiyon",
    videoSubtitle: "Marka iletişimi, kampanya aktivasyonu ve ticari hikaye anlatımı odağında geliştirilen seçili video prodüksiyon işleri.",
    toolsEyebrow: "AI-Driven Marketing Technology Stack",
    toolsTitle: "CRM, analitik, performans ve iş zekası ekseninde ölçeklenebilir büyüme sistemleri için kullandığım platformlar ve araçlar.",
    credentialsEyebrow: "Profil",
    credentialsTitle: "Eğitim, konuşmalar ve sertifikalarla desteklenen profesyonel arka plan.",
    stageEyebrow: "Leadership Moments",
    stageTitle: "Yıllık toplantılar, iş hikayeciliği ve yönetici sunumlarından seçili anlar.",
    contactEyebrow: "İletişim",
    contactTitle: "Dijital, e-ticaret ve AI dönüşümü odağında stratejik görüşmelere açığım.",
    contactBody:
      "Liderlik rolleri, danışmanlık fırsatları ve growth, CRM, analitik ile AI destekli dönüşüm başlıklarında üst düzey görüşmeler için ulaşabilirsiniz.",
    measurableLabels: ["OPEX Azalışı", "Kullanıcı Kazanımı", "LTV Artışı", "Sell-out Büyümesi", "Marj Artışı", "Dönüşüm Oranı"],
    competencies: [
      { label: "AI / GenAI", value: 92 },
      { label: "Performance Marketing", value: 90 },
      { label: "CRM & Automation", value: 88 },
      { label: "Data Analytics", value: 91 },
      { label: "Team Leadership", value: 86 },
      { label: "Strategy", value: 94 },
    ],
    languagesTitle: "Diller",
    speakingTitle: "Konuşmalar & Mentorluk",
    educationTitle: "Eğitim",
    certificationsTitle: "Sertifikalar",
    openLive: "Ürünü Aç",
    watchWalkthrough: "Demoyu İzle",
    openCase: "Case Study Aç",
    watchVideo: "İzle",
    footer: "Digital growth, AI systems and transformation leadership.",
  },
} as const;

const measurableImpactValues = [18, 35, 69, 40, 14, 25];

const languageLevels = {
  en: [
    { name: "Turkish", level: "Native", width: "100%" },
    { name: "English", level: "Expert (C2)", width: "96%" },
    { name: "German", level: "Elementary (A2)", width: "30%" },
  ],
  de: [
    { name: "Türkisch", level: "Muttersprache", width: "100%" },
    { name: "Englisch", level: "Experte (C2)", width: "96%" },
    { name: "Deutsch", level: "Grundlagen (A2)", width: "30%" },
  ],
  tr: [
    { name: "Türkçe", level: "Ana dil", width: "100%" },
    { name: "İngilizce", level: "İleri (C2)", width: "96%" },
    { name: "Almanca", level: "Temel (A2)", width: "30%" },
  ],
} as const;

const compactTimelineDates = ["03/2014", "01/2015", "05/2016", "05/2017", "01/2020", "03/2021", "04/2022", "04/2024"];

export default function Home() {
  const { portfolioData } = usePortfolioData();
  const { siteContent } = useSiteContent();
  const { personalInfo } = portfolioData;
  const {
    aiProducts,
    capabilityPillars,
    careerTimeline,
    caseStudies,
    certifications,
    education,
    highlightMetrics,
    speaking,
    storyHighlights,
    toolClusters,
    videoPortfolio,
  } = siteContent;

  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [activeExperience, setActiveExperience] = useState(careerTimeline.length - 1);
  const [mediaModal, setMediaModal] = useState<MediaModal>(null);
  const [heroPhotoIndex, setHeroPhotoIndex] = useState(0);
  const t = translations[language];
  const activeCareer = careerTimeline[activeExperience] as TimelineItem;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroPhotoIndex((current) => (current + 1) % heroPhotos.length);
    }, 3800);
    return () => window.clearInterval(timer);
  }, []);

  const productCards = useMemo<CarouselCard[]>(
    () =>
      aiProducts.map((product) => ({
        key: product.title,
        content: (
          <article className="portfolio-panel-light dark:!border-white/10 dark:!bg-[#102230] dark:shadow-none flex h-full min-h-[450px] flex-col">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#2563eb] dark:text-[#8cc8ff]">{product.category}</p>
                <h3 className="mt-3 font-['Space_Grotesk'] text-2xl font-bold text-[#0f172a] dark:text-white">{product.title}</h3>
              </div>
              {product.confidential ? <span className="rounded-full border border-amber-300/40 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">Confidential</span> : null}
            </div>
            {product.image ? (
              <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-[#e4ecf8] bg-black/5 dark:border-white/10 dark:bg-black/20">
                <img src={product.image} alt={product.title} className="aspect-[16/10] w-full object-cover" />
              </div>
            ) : (
              <div className="mt-5 rounded-[1.5rem] border border-dashed border-[#d8e6ff] bg-[#f8fbff] px-5 py-12 text-sm text-[#64748b] dark:border-white/12 dark:bg-white/4 dark:text-white/65">
                Private enterprise project. Public visuals intentionally withheld.
              </div>
            )}
            <p className="mt-5 text-sm leading-7 text-[#526073] dark:text-white/76">{product.summary}</p>
            <p className="mt-3 text-sm leading-7 text-[#6b778c] dark:text-white/58">{product.outcome}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-[#dce7f9] bg-[#f7faff] px-3 py-1 text-xs font-semibold text-[#43506a] dark:border-white/10 dark:bg-white/6 dark:text-white/74">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-auto flex flex-wrap gap-3 pt-6">
              {product.video ? (
                <button
                  type="button"
                  onClick={() => setMediaModal({ type: "video", url: product.video!, title: product.title })}
                  className="inline-flex items-center gap-2 rounded-full bg-[#0f172a] px-4 py-2.5 text-sm font-bold text-white dark:bg-[#2563eb]"
                >
                  <Play size={15} />
                  {t.watchWalkthrough}
                </button>
              ) : null}
              {product.url && !product.confidential ? (
                <a href={product.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#dce7f9] bg-white px-4 py-2.5 text-sm font-bold text-[#0f172a] dark:border-white/10 dark:bg-white/6 dark:text-white">
                  {t.openLive}
                </a>
              ) : null}
            </div>
          </article>
        ),
      })),
    [aiProducts, t.openLive, t.watchWalkthrough],
  );

  const videoCards = useMemo<CarouselCard[]>(
    () =>
      videoPortfolio.map((video) => ({
        key: video.title,
        content: (
          <button
            type="button"
            onClick={() => setMediaModal({ type: "youtube", url: video.url, title: video.title })}
            className="group h-full overflow-hidden rounded-[1.75rem] border border-[#dce7f9] bg-white text-left transition hover:border-[#cadcf6] hover:shadow-[0_18px_36px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[#102230] dark:hover:border-white/20 dark:hover:shadow-none"
          >
            <div className="relative aspect-video overflow-hidden">
              <iframe src={toYoutubeEmbed(video.url)} title={video.title} className="pointer-events-none h-full w-full scale-[1.01]" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f172a]">
                  <Play size={18} />
                </span>
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-white/90">{t.watchVideo}</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#0f172a] dark:text-white">{video.title}</h3>
            </div>
          </button>
        ),
      })),
    [videoPortfolio, t.watchVideo],
  );

  const toolCards = useMemo<CarouselCard[]>(
    () =>
      toolClusters.map((cluster) => ({
        key: cluster.title,
        content: (
          <div className="h-full rounded-[1.75rem] border border-[#dce7f9] bg-white p-6 shadow-[0_16px_34px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-[#102230] dark:shadow-none">
            <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#0f172a] dark:text-white">{cluster.title}</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {cluster.tools.map((tool) => (
                <span key={tool} className="rounded-full border border-[#dce7f9] bg-[#f8fbff] px-3 py-1.5 text-xs font-semibold text-[#4a576d] dark:border-white/10 dark:bg-white/6 dark:text-white/74">
                  {tool}
                </span>
              ))}
            </div>
            <div className="mt-6 border-t border-[#e7eef8] pt-4 text-sm text-[#7a8699] dark:border-white/10 dark:text-white/56">{cluster.tools.length} tools</div>
          </div>
        ),
      })),
    [toolClusters],
  );

  const certificationCards = useMemo<CarouselCard[]>(
    () =>
      certifications.map((item) => ({
        key: item.title,
        content: (
          <div className="h-full overflow-hidden rounded-[1.75rem] border border-[#dce7f9] bg-white shadow-[0_16px_34px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-[#102230] dark:shadow-none">
            <img src={item.image} alt={item.title} className="aspect-[4/2.2] w-full object-cover" />
            <div className="space-y-3 p-5">
              <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#0f172a] dark:text-white">{item.title}</h3>
              <p className="text-base text-[#5b667b] dark:text-[#8cc8ff]">{item.issuer}</p>
              <p className="text-sm text-[#7a8699] dark:text-white/56">{item.date}</p>
            </div>
          </div>
        ),
      })),
    [certifications],
  );

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-[#0f172a] transition-colors dark:bg-[#06131a] dark:text-white">
      <header className="sticky top-0 z-40 border-b border-[#d6e0f0] bg-white/88 backdrop-blur-xl dark:border-white/10 dark:bg-[#07141c]/84">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="min-w-fit font-['Space_Grotesk'] text-sm font-bold uppercase tracking-[0.28em] text-[#2563eb] dark:text-[#8cc8ff]">
            Tolgar Sasmaz
          </a>
          <nav className="hidden flex-1 items-center justify-center gap-2 overflow-x-auto text-sm text-[#516079] dark:text-white/68 lg:flex">
            {navItems.map((item) => (
              <a key={item.key} href={item.href} className="min-w-fit rounded-full px-3 py-2 transition hover:bg-[#eff5ff] hover:text-[#0f172a] dark:hover:bg-white/8 dark:hover:text-white">
                {t.nav[item.key]}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-full border border-[#dce7f9] bg-white p-1 dark:border-white/10 dark:bg-white/6">
              {(["en", "de", "tr"] as Language[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLanguage(item)}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] transition ${
                    language === item ? "bg-[#2563eb] text-white dark:bg-[#8cc8ff] dark:text-[#051119]" : "text-[#64748b] dark:text-white/66"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#dce7f9] bg-white text-[#0f172a] transition hover:border-[#bfd3f6] dark:border-white/10 dark:bg-white/6 dark:text-white"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f5f8fc_52%,#edf4ff_100%)] dark:bg-[linear-gradient(180deg,#07141c_0%,#0b1f29_54%,#07141c_100%)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(37,99,235,0.08),transparent_28%),radial-gradient(circle_at_88%_30%,rgba(59,130,246,0.12),transparent_24%)] dark:bg-[radial-gradient(circle_at_16%_22%,rgba(76,162,255,0.16),transparent_26%),radial-gradient(circle_at_86%_28%,rgba(77,201,255,0.10),transparent_22%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-14 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-20">
            <div className="flex flex-col justify-center space-y-8">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d8e6ff] bg-[#eef4ff] px-4 py-2 text-sm font-semibold text-[#2563eb] dark:border-[#163243] dark:bg-[#0f2530] dark:text-[#8cc8ff]">
                <Sparkles size={16} />
                {t.badge}
              </div>
              <div className="space-y-5">
                <h1 className="max-w-4xl font-['Space_Grotesk'] text-5xl font-bold leading-[0.95] text-[#0f172a] dark:text-white sm:text-6xl lg:text-[5.6rem]">
                  Ibrahim Tolgar
                  <br />
                  Sasmaz
                </h1>
                <p className="text-xl font-semibold leading-tight text-[#2563eb] dark:text-[#8cc8ff] sm:text-2xl">{t.title}</p>
                <p className="max-w-2xl text-lg leading-8 text-[#5b667b] dark:text-white/72 sm:text-[1.28rem] sm:leading-[1.85]">{t.summary}</p>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-base text-[#64748b] dark:text-white/64">
                <a href={`mailto:${personalInfo.email}`} className="inline-flex items-center gap-2 transition hover:text-[#2563eb] dark:hover:text-[#8cc8ff]">
                  <Mail size={18} />
                  {personalInfo.email}
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-[#2563eb] dark:hover:text-[#8cc8ff]">
                  <ExternalLink size={18} />
                  LinkedIn
                </a>
                <span className="inline-flex items-center gap-2">
                  <MapPin size={18} />
                  Munich, Germany
                </span>
              </div>
              <div>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-2 rounded-[1.2rem] bg-[#2563eb] px-7 py-4 text-lg font-bold text-white shadow-[0_18px_40px_rgba(37,99,235,0.22)] transition hover:-translate-y-0.5 hover:bg-[#1d4ed8]"
                >
                  <Mail size={20} />
                  {t.cta}
                </a>
              </div>
            </div>

            <div className="relative flex flex-col items-center gap-6 lg:items-end">
              <div className="w-full max-w-[430px] rounded-[2rem] border border-[#dce7f9] bg-white p-2 shadow-[0_28px_80px_rgba(15,23,42,0.10)] dark:border-white/10 dark:bg-[#102230] dark:shadow-none">
                <div className="relative overflow-hidden rounded-[1.6rem]">
                  {heroPhotos.map((photo, index) => (
                    <img
                      key={photo}
                      src={photo}
                      alt={personalInfo.name}
                      className={`absolute inset-0 aspect-[4/4.8] w-full object-cover object-top transition-opacity duration-700 ${index === heroPhotoIndex ? "opacity-100" : "opacity-0"}`}
                    />
                  ))}
                  <div className="relative aspect-[4/4.8] w-full" />
                  <div className="absolute bottom-4 right-4 rounded-[1rem] bg-[#2563eb] px-6 py-3 text-lg font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,0.35)]">
                    {t.heroLabel}
                  </div>
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {heroPhotos.map((photo, index) => (
                      <button
                        key={photo}
                        type="button"
                        onClick={() => setHeroPhotoIndex(index)}
                        className={`h-2.5 rounded-full transition ${index === heroPhotoIndex ? "w-8 bg-white" : "w-2.5 bg-white/55"}`}
                        aria-label={`Hero photo ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid w-full max-w-[540px] gap-4 sm:grid-cols-2">
                {highlightMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-[1.8rem] border border-[#dce7f9] bg-white px-6 py-5 text-center shadow-[0_18px_40px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[#102230] dark:shadow-none">
                    <AnimatedMetric value={metric.value} colorClass="text-[#2563eb] dark:text-[#8cc8ff]" />
                    <div className="mt-2 text-lg leading-7 text-[#64748b] dark:text-white/62">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={t.aboutEyebrow} title={t.aboutTitle} dark={theme === "dark"} />
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-[#dce7f9] bg-white p-8 shadow-[0_20px_55px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-[#102230] dark:shadow-none">
              <div className="grid gap-6 text-base leading-8 text-[#556273] dark:text-white/74 sm:text-lg">
                <p>{t.aboutBody1}</p>
                <p>{t.aboutBody2}</p>
                <div className="grid gap-3 pt-2">
                  {[...storyHighlights, ...capabilityPillars.map((pillar) => pillar.description)].slice(0, 4).map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-[#e4ecf8] bg-[#f8fbff] p-4 dark:border-white/10 dark:bg-white/4">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#2563eb] dark:bg-[#8cc8ff]" />
                      <p className="text-sm leading-7 text-[#415166] dark:text-white/78">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <Panel title={t.educationTitle} icon={<GraduationCap size={18} className="text-[#2563eb] dark:text-[#8cc8ff]" />} dark={theme === "dark"}>
                {education.map((item) => (
                  <div key={item.degree} className="flex gap-4 rounded-2xl border border-[#e4ecf8] bg-[#f8fbff] p-4 dark:border-white/10 dark:bg-white/4">
                    {item.logo ? (
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2 dark:bg-white/92">
                        <img src={item.logo} alt={item.school} className="max-h-full max-w-full object-contain" />
                      </div>
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef4ff] font-['Space_Grotesk'] text-lg font-bold text-[#2563eb] dark:bg-[#163243] dark:text-[#8cc8ff]">IU</div>
                    )}
                    <div>
                      <h4 className="font-['Space_Grotesk'] text-lg font-bold text-[#0f172a] dark:text-white">{item.degree}</h4>
                      <p className="text-sm text-[#2563eb] dark:text-[#8cc8ff]">{item.school}</p>
                      <p className="mt-1 text-sm text-[#64748b] dark:text-white/56">{item.period} | {item.location}</p>
                    </div>
                  </div>
                ))}
              </Panel>
              <Panel title={t.languagesTitle} icon={<Languages size={18} className="text-[#2563eb] dark:text-[#8cc8ff]" />} dark={theme === "dark"}>
                <div className="grid gap-4">
                  {languageLevels[language].map((item) => (
                    <div key={item.name}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-semibold text-[#0f172a] dark:text-white">{item.name}</span>
                        <span className="text-[#64748b] dark:text-white/58">{item.level}</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-[#e7edf7] dark:bg-white/10">
                        <div className="h-2.5 rounded-full bg-[#2563eb] dark:bg-[#8cc8ff]" style={{ width: item.width }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </div>
        </section>

        <section id="journey" className="bg-[#edf3fb] py-20 dark:bg-[#081920]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow={t.journeyEyebrow} title={t.journeyTitle} dark={theme === "dark"} />
            <div className="rounded-[2rem] border border-[#d8e3f2] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-[#0d2330] dark:shadow-none sm:p-8">
              <div className="hide-scrollbar relative overflow-x-auto pb-6">
                <div className="min-w-[1080px] px-5 pt-3">
                  <div className="absolute left-10 right-10 top-[10.4rem] h-1 rounded-full bg-[#cfe0ff] dark:bg-[#1a4d6a]" />
                  <div className="relative grid grid-cols-8 gap-6">
                    {careerTimeline.map((item, index) => {
                      const isActive = index === activeExperience;
                      return (
                        <button
                          key={`${item.year}-${item.company}`}
                          type="button"
                          onMouseEnter={() => setActiveExperience(index)}
                          onFocus={() => setActiveExperience(index)}
                          onClick={() => setActiveExperience(index)}
                          className="group flex flex-col items-center text-center"
                        >
                          <div className={`min-h-[96px] text-base font-bold leading-tight transition ${isActive ? "text-[#0f172a] dark:text-white" : "text-[#4b5b72] dark:text-white/62"}`}>{item.role}</div>
                          <div className={`relative z-10 mt-4 flex h-[92px] w-[92px] items-center justify-center rounded-full border-8 bg-white shadow-[0_16px_30px_rgba(15,23,42,0.12)] transition dark:bg-white ${isActive ? "border-[#dce9ff] ring-4 ring-[#edf4ff]" : "border-[#eef3fa] group-hover:border-[#dce9ff]"}`}>
                            <img src={item.logo} alt={item.company} className="max-h-[56px] max-w-[56px] object-contain" />
                          </div>
                          <div className={`mt-5 text-lg font-semibold transition ${isActive ? "text-[#0f172a] dark:text-white" : "text-[#66768e] dark:text-white/58"}`}>{compactTimelineDates[index] ?? item.year}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-6 rounded-[1.9rem] border border-[#d7e5f7] bg-[linear-gradient(180deg,#0d2d3a_0%,#123847_100%)] p-6 text-white shadow-[0_24px_60px_rgba(7,18,31,0.24)] lg:grid-cols-[0.84fr_1.16fr]">
                <div className="space-y-5">
                  <div className="inline-flex rounded-full border border-[#5daee9]/30 bg-[#173f50] px-4 py-2 text-sm font-bold uppercase tracking-[0.22em] text-[#c7ebff]">{activeCareer.year}</div>
                  <div className="space-y-2">
                    <h3 className="font-['Space_Grotesk'] text-4xl font-bold leading-tight text-white">{activeCareer.role}</h3>
                    <p className="text-2xl text-[#8fd1ff]">{activeCareer.company}</p>
                    <p className="text-lg text-white/72">{activeCareer.brand}</p>
                  </div>
                  <p className="text-base leading-8 text-white/80">{activeCareer.focus}</p>
                  <div className="grid gap-3 pt-2">
                    {activeCareer.meta.map((item) => (
                      <div key={item} className="rounded-[1.2rem] border border-white/10 bg-white/6 px-4 py-3 text-sm text-white/80">{item}</div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4">
                  {activeCareer.bullets.map((bullet) => (
                    <div key={bullet} className="flex gap-4 rounded-[1.4rem] border border-white/10 bg-white/5 p-5">
                      <span className="mt-2 h-3 w-3 rounded-full bg-[#73c6ff]" />
                      <p className="text-base leading-8 text-white/86">{bullet}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="impact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={t.impactEyebrow} title={t.impactTitle} dark={theme === "dark"} />
          <div className="grid gap-6 lg:grid-cols-2">
            <Panel title={t.impactSubtitle} icon={<Sparkles size={18} className="text-[#2563eb] dark:text-[#8cc8ff]" />} dark={theme === "dark"}>
              <div className="grid gap-4">
                {t.measurableLabels.map((label, index) => (
                  <div key={label}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-semibold text-[#0f172a] dark:text-white">{label}</span>
                      <span className="text-[#64748b] dark:text-white/58">{measurableImpactValues[index]}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-[#e8eef8] dark:bg-white/10">
                      <div className="h-3 rounded-full bg-[linear-gradient(90deg,#2563eb,#60a5fa)] dark:bg-[linear-gradient(90deg,#60a5fa,#8cc8ff)]" style={{ width: `${Math.min(measurableImpactValues[index], 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel title={t.competencyTitle} icon={<BriefcaseBusiness size={18} className="text-[#2563eb] dark:text-[#8cc8ff]" />} dark={theme === "dark"}>
              <div className="grid gap-4 sm:grid-cols-2">
                {t.competencies.map((item) => (
                  <div key={item.label} className="rounded-[1.25rem] border border-[#e4ecf8] bg-[#f8fbff] p-4 dark:border-white/10 dark:bg-white/4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-semibold text-[#0f172a] dark:text-white">{item.label}</span>
                      <span className="text-sm text-[#2563eb] dark:text-[#8cc8ff]">{item.value}/100</span>
                    </div>
                    <div className="mt-3 h-2.5 rounded-full bg-[#e6edf7] dark:bg-white/10">
                      <div className="h-2.5 rounded-full bg-[#2563eb] dark:bg-[#8cc8ff]" style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </section>

        <section id="products" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={t.productsEyebrow} title={t.productsTitle} dark={theme === "dark"} />
          <Carousel cards={productCards} />
        </section>

        <section id="work" className="border-y border-[#dce6f5] bg-white py-20 dark:border-white/10 dark:bg-[#081920]">
          <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
            <div>
              <SectionHeading eyebrow={t.workEyebrow} title={t.workTitle} dark={theme === "dark"} />
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {caseStudies.map((study) => (
                  <a key={study.brand} href={study.url} target="_blank" rel="noreferrer" className="rounded-[1.75rem] border border-[#dce7f9] bg-[#fbfdff] p-6 transition hover:-translate-y-1 hover:border-[#c9daf6] hover:shadow-[0_16px_30px_rgba(15,23,42,0.07)] dark:border-white/10 dark:bg-[#102230] dark:hover:border-white/20 dark:hover:shadow-none">
                    <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#2563eb] dark:text-[#8cc8ff]">Case study</div>
                    <h3 className="mt-4 font-['Space_Grotesk'] text-xl font-bold text-[#0f172a] dark:text-white">{study.brand}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#556273] dark:text-white/72">{study.result}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#2563eb] dark:text-[#8cc8ff]">
                      {t.openCase}
                      <ExternalLink size={14} />
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <SectionHeading eyebrow={t.videoTitle} title={t.videoSubtitle} dark={theme === "dark"} />
              <Carousel cards={videoCards} />
            </div>
          </div>
        </section>

        <section id="tools" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={t.toolsEyebrow} title={t.toolsTitle} dark={theme === "dark"} />
          <Carousel cards={toolCards} />
        </section>

        <section id="credentials" className="border-y border-[#dce6f5] bg-white py-20 dark:border-white/10 dark:bg-[#081920]">
          <div className="mx-auto max-w-7xl space-y-14 px-4 sm:px-6 lg:px-8">
            <div>
              <SectionHeading eyebrow={t.credentialsEyebrow} title={t.credentialsTitle} dark={theme === "dark"} />
              <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                <Panel title={t.speakingTitle} icon={<BriefcaseBusiness size={18} className="text-[#2563eb] dark:text-[#8cc8ff]" />} dark={theme === "dark"}>
                  {speaking.map((item) => (
                    <a key={`${item.title}-${item.org}`} href={item.url} target="_blank" rel="noreferrer" className="flex gap-4 rounded-2xl border border-[#e4ecf8] bg-[#f8fbff] p-4 transition hover:border-[#cfdef7] hover:bg-white dark:border-white/10 dark:bg-white/4 dark:hover:border-white/16 dark:hover:bg-white/5">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2 dark:bg-white/92">
                        <img src={item.logo} alt={item.org} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#2563eb] dark:text-[#8cc8ff]">{item.title}</div>
                        <h4 className="mt-2 font-['Space_Grotesk'] text-lg font-bold text-[#0f172a] dark:text-white">{item.org}</h4>
                        <p className="mt-2 text-sm leading-7 text-[#556273] dark:text-white/72">{item.detail}</p>
                      </div>
                    </a>
                  ))}
                </Panel>
                <div>
                  <SectionHeading eyebrow={t.certificationsTitle} title="" dark={theme === "dark"} />
                  <Carousel cards={certificationCards} />
                </div>
              </div>
            </div>

          </div>
        </section>

        <section id="contact" className="border-t border-[#dce6f5] bg-[#edf3fb] dark:border-white/10 dark:bg-[#07141c]">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
            <div className="space-y-5">
              <div className="inline-flex rounded-full border border-[#d8e6ff] bg-[#eef4ff] px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-[#2563eb] dark:border-[#163243] dark:bg-[#0f2530] dark:text-[#8cc8ff]">{t.contactEyebrow}</div>
              <h2 className="max-w-3xl font-['Space_Grotesk'] text-4xl font-bold text-[#0f172a] dark:text-white sm:text-5xl">{t.contactTitle}</h2>
              <p className="max-w-2xl text-lg leading-8 text-[#556273] dark:text-white/72">{t.contactBody}</p>
            </div>
            <div className="grid gap-4">
              <ContactCard icon={<Mail size={18} />} label="Email" value={personalInfo.email} href={`mailto:${personalInfo.email}`} dark={theme === "dark"} />
              <ContactCard icon={<MapPin size={18} />} label="Location" value="Munich, Germany" dark={theme === "dark"} />
              <ContactCard icon={<Globe size={18} />} label="Website" value="sasmaz.digital" href="https://www.sasmaz.digital" dark={theme === "dark"} />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#dce6f5] bg-white px-4 py-6 text-sm text-[#64748b] dark:border-white/10 dark:bg-[#07141c] dark:text-white/48 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>{personalInfo.name} | {t.footer}</p>
          <p>www.sasmaz.digital</p>
        </div>
      </footer>

      {mediaModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#02080b]/88 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#041118] shadow-2xl shadow-black/40">
            <button type="button" onClick={() => setMediaModal(null)} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-black/35 text-white">
              <X size={18} />
            </button>
            <div className="border-b border-white/8 px-6 py-5 pr-16">
              <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-white">{mediaModal.title}</h3>
            </div>
            <div className="aspect-video w-full bg-black">
              {mediaModal.type === "youtube" ? (
                <iframe src={toYoutubeEmbed(mediaModal.url)} title={mediaModal.title} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              ) : (
                <video src={mediaModal.url} controls autoPlay className="h-full w-full" />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SectionHeading({ eyebrow, title, dark }: { eyebrow: string; title: string; dark: boolean }) {
  return (
    <div className="mb-10 space-y-3">
      {eyebrow ? <p className={`text-xs font-bold uppercase tracking-[0.3em] ${dark ? "text-[#8cc8ff]" : "text-[#2563eb]"}`}>{eyebrow}</p> : null}
      {title ? <h2 className={`max-w-5xl font-['Space_Grotesk'] text-3xl font-bold sm:text-4xl lg:text-5xl ${dark ? "text-white" : "text-[#0f172a]"}`}>{title}</h2> : null}
    </div>
  );
}

function Panel({ title, icon, children, dark }: { title: string; icon: ReactNode; children: ReactNode; dark: boolean }) {
  return (
    <div className={`rounded-[1.75rem] border p-6 ${dark ? "border-white/10 bg-[#102230]" : "border-[#dce7f9] bg-white shadow-[0_16px_34px_rgba(15,23,42,0.05)]"}`}>
      <div className="mb-5 flex items-center gap-3">
        {icon}
        <h3 className={`font-['Space_Grotesk'] text-xl font-bold ${dark ? "text-white" : "text-[#0f172a]"}`}>{title}</h3>
      </div>
      <div className="grid gap-4">{children}</div>
    </div>
  );
}

function ContactCard({ icon, label, value, href, dark }: { icon: ReactNode; label: string; value: string; href?: string; dark: boolean }) {
  const content = (
    <div className={`flex min-w-[280px] items-center gap-4 rounded-[1.5rem] border p-5 ${dark ? "border-white/10 bg-[#102230]" : "border-[#dce7f9] bg-white shadow-[0_12px_28px_rgba(15,23,42,0.05)]"}`}>
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${dark ? "bg-[#0f2530] text-[#8cc8ff]" : "bg-[#eef4ff] text-[#2563eb]"}`}>{icon}</div>
      <div>
        <div className={`text-xs font-bold uppercase tracking-[0.22em] ${dark ? "text-white/40" : "text-[#7a8699]"}`}>{label}</div>
        <div className={`mt-1 text-sm font-semibold ${dark ? "text-white" : "text-[#0f172a]"}`}>{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} target="_blank" rel="noreferrer">{content}</a> : content;
}

function AnimatedMetric({ value, colorClass }: { value: string; colorClass: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.45 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const renderedValue = useAnimatedMetricValue(value, visible);
  return <div ref={ref} className={`font-['Space_Grotesk'] text-4xl font-bold tracking-tight sm:text-5xl ${colorClass}`}>{renderedValue}</div>;
}

function useAnimatedMetricValue(value: string, active: boolean) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!active) {
      setDisplay(preserveAffixes(value, 0));
      return;
    }
    const { numeric, decimals, prefix, suffix } = splitMetricValue(value);
    if (numeric === null) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    let start: number | null = null;
    const duration = 1200;

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(`${prefix}${formatMetricNumber(numeric * eased, decimals)}${suffix}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, value]);

  return display;
}

function splitMetricValue(value: string) {
  const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) return { prefix: "", numeric: null, suffix: value, decimals: 0 };
  const [, prefix, numericPart, suffix] = match;
  return {
    prefix,
    numeric: Number(numericPart),
    suffix,
    decimals: numericPart.includes(".") ? numericPart.split(".")[1]!.length : 0,
  };
}

function formatMetricNumber(value: number, decimals: number) {
  const rounded = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
  return rounded.replace(/\.0+$/, "");
}

function preserveAffixes(value: string, numeric: number) {
  const parts = splitMetricValue(value);
  if (parts.numeric === null) return value;
  return `${parts.prefix}${formatMetricNumber(numeric, parts.decimals)}${parts.suffix}`;
}

function Carousel({ cards }: { cards: CarouselCard[] }) {
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1280) {
        setPerView(3);
      } else if (window.innerWidth >= 768) {
        setPerView(2);
      } else {
        setPerView(1);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, cards.length - perView);
  const goPrev = () => setIndex((current) => Math.max(0, current - 1));
  const goNext = () => setIndex((current) => Math.min(maxIndex, current + 1));

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  return (
    <div className="space-y-5">
      <div className="flex justify-end gap-3">
        <CarouselArrow direction="left" onClick={goPrev} disabled={index === 0} />
        <CarouselArrow direction="right" onClick={goNext} disabled={index >= maxIndex} />
      </div>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * (100 / perView)}%)` }}
        >
          {cards.map((card) => (
            <div key={card.key} className="w-full shrink-0 px-2" style={{ flexBasis: `${100 / perView}%` }}>
              <div className="h-full">{card.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CarouselArrow({ direction, onClick, disabled }: { direction: "left" | "right"; onClick: () => void; disabled: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2563eb] text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)] transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-35"
    >
      {direction === "left" ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
    </button>
  );
}
