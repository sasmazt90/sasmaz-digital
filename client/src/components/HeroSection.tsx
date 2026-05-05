import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePortfolioData } from "@/contexts/PortfolioDataContext";
import { MapPin, Mail, Linkedin, ExternalLink, Download } from "lucide-react";

function AnimatedCounter({
  target,
  suffix,
  duration = 2000,
}: {
  target: number;
  suffix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function HeroSection() {
  const { t, language } = useLanguage();
  const { portfolioData } = usePortfolioData();
  const { personalInfo, heroMetrics } = portfolioData;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: `url(/assets/backgrounds/background-light-theme.webp)`,
        backgroundSize: "cover",
        backgroundPosition: "center right",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-semibold text-blue-700 font-['Space_Grotesk']">
                {t("hero.badge")}
              </span>
            </div>

            {/* Name */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight font-['Space_Grotesk']">
                {language === "tr" ? personalInfo.nameTr : personalInfo.name}
              </h1>
              <p className="mt-3 text-xl sm:text-2xl font-semibold text-blue-600 font-['Space_Grotesk']">
                {t("hero.subtitle")}
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl font-['Nunito_Sans']">
              {t("hero.description")}
            </p>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
              >
                <Mail size={14} />
                <span>{personalInfo.email}</span>
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
              >
                <Linkedin size={14} />
                <span>{t("contact.linkedin")}</span>
              </a>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} />
                <span>{t("hero.location")}</span>
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 hover:shadow-lg hover:shadow-blue-200 font-['Space_Grotesk'] flex items-center gap-2"
              >
                <Mail size={16} />
                {t("hero.cta.contact")}
              </button>
            </div>
          </div>

          {/* Right: Photo + Metrics */}
          <div className="flex flex-col items-center gap-8">
            {/* Profile Photo */}
            <div className="relative">
              <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-4 ring-blue-100">
                <img
                  src={personalInfo.profilePhoto}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded-xl shadow-lg">
                <p className="text-xs font-semibold font-['Space_Grotesk']">
                  {t("hero.floatingRole")}
                </p>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              {heroMetrics.map((metric, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="text-3xl font-bold text-blue-600 font-['JetBrains_Mono'] leading-none">
                    <AnimatedCounter
                      target={metric.value}
                      suffix={metric.suffix}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1 font-['Nunito_Sans'] font-semibold">
                    {metric.label[language as keyof typeof metric.label] ||
                      metric.label.en}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-gray-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
