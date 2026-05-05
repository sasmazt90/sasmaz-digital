import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePortfolioData } from "@/contexts/PortfolioDataContext";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Users,
  DollarSign,
  Calendar,
} from "lucide-react";

const companyLogos: Record<string, string> = {
  "NAOS Deutschland (BIODERMA)":
    "/assets/logos/companies/naos-logo.webp",
  "NAOS TÃ¼rkiye (BIODERMA / Institut Esthederm / Etat Pur)":
    "/assets/logos/companies/naos-logo.webp",
  "NAOS TÃ¼rkiye":
    "/assets/logos/companies/naos-logo.webp",
  "D&R / idefix":
    "/assets/logos/companies/d&r-logo.webp",
  "8digits (SaaS Analytics & CRO Startup)":
    "/assets/logos/companies/8digits-logo.webp",
  "Emarsys (SAP Marketing Cloud)":
    "/assets/logos/companies/emarsys-logo.webp",
  "Lidyana.com":
    "/assets/logos/companies/lidyana-logo.webp",
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
            {t("experience.title")}
          </h2>
          <p className="mt-3 text-lg text-gray-500 font-['Nunito_Sans']">
            {t("experience.subtitle")}
          </p>
          <div className="mt-4 w-16 h-1 bg-blue-600 rounded-full" />
        </div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 hidden w-0.5 bg-gradient-to-b from-blue-600 via-blue-300 to-blue-100 md:block" />

          <div className="space-y-4">
            {experiences.map(exp => {
              const isExpanded = expandedId === exp.id;
              const role =
                exp.role[language as keyof typeof exp.role] || exp.role.en;
              const period =
                exp.period[language as keyof typeof exp.period] ||
                exp.period.en;
              const achievements =
                exp.achievements[language as keyof typeof exp.achievements] ||
                exp.achievements.en;

              return (
                <div key={exp.id} className="relative md:pl-16">
                  <div
                    className="absolute left-4 top-6 hidden h-4 w-4 rounded-full border-2 border-white shadow-md md:block"
                    style={{ backgroundColor: exp.color }}
                  />

                  <div
                    className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                      isExpanded
                        ? "border-blue-200 shadow-lg"
                        : "border-gray-100 shadow-sm hover:shadow-md"
                    }`}
                  >
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                      className="w-full p-6 text-left"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex min-w-0 flex-1 items-start gap-3">
                          {getCompanyLogo(exp.company) && (
                            <img
                              src={getCompanyLogo(exp.company)!}
                              alt={exp.company}
                              className="h-12 w-12 flex-shrink-0 rounded-lg bg-gray-50 object-contain"
                            />
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="mb-1 flex flex-wrap items-center gap-2">
                              <h3 className="text-lg font-bold text-gray-900 font-['Space_Grotesk']">
                                {role}
                              </h3>
                              {exp.current && (
                                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-700 font-['Space_Grotesk']">
                                  {t("experience.current")}
                                </span>
                              )}
                            </div>
                            <p className="font-semibold text-blue-600 font-['Space_Grotesk']">
                              {exp.company}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
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
                          {isExpanded ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </div>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="border-t border-gray-100 px-6 pb-6">
                        {exp.budget && (
                          <div className="mt-4 mb-4 flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm text-gray-600">
                            <DollarSign size={14} className="text-blue-600" />
                            <span className="font-semibold">{exp.budget}</span>
                          </div>
                        )}
                        <h4 className="mt-4 mb-3 text-sm font-bold text-gray-700 font-['Space_Grotesk']">
                          {t("experience.responsibilities")}
                        </h4>
                        <ul className="space-y-2">
                          {achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2.5 text-sm text-gray-600 font-['Nunito_Sans']"
                            >
                              <span className="mt-0.5 font-bold text-blue-600">
                                •
                              </span>
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
