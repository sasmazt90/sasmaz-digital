import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  usePortfolioData,
  type PortfolioData,
} from "@/contexts/PortfolioDataContext";
import { ExternalLink, Lock, Play } from "lucide-react";
import VideoModal from "./VideoModal";
import HorizontalSlider from "./HorizontalSlider";

export default function ProjectsSection() {
  const { t, language } = useLanguage();
  const { portfolioData } = usePortfolioData();
  const { projects } = portfolioData;
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

  const vibeProjects = projects.filter(p => p.category === "vibe");
  const powerAppsProjects = projects.filter(p => p.category === "powerapps");
  type Project = PortfolioData["projects"][number];

  const VibeProjectCard = ({ project }: { project: Project }) => {
    const description =
      project.description[language as keyof typeof project.description] ||
      project.description.en;
    const hasImage = "image" in project && project.image;
    const hasVideo = "videoUrl" in project && project.videoUrl;
    const hasButtons = "ctaButtons" in project && project.ctaButtons;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-600 transition-all duration-300 overflow-hidden group h-full flex flex-col">
        {/* ROW 1: TOP CONTENT - Image (left) + Title/Description (right) */}
        <div className="flex gap-4 p-5 border-b border-gray-100 dark:border-gray-700 flex-grow items-start">
          {/* LEFT: Image Column - Height matches text block */}
          {hasImage && (
            <div
              className="flex-shrink-0 bg-gradient-to-br from-gray-50 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200 dark:border-gray-600"
              style={{ width: "140px", height: "100%", minHeight: "140px" }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          {/* RIGHT: Text Column - Title, Icon, Description */}
          <div className="flex-grow flex flex-col justify-start">
            {/* Title + Icon Row */}
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-bold text-gray-900 dark:text-white font-['Space_Grotesk'] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug text-sm flex-grow">
                {project.title}
              </h3>
              {project.confidential ? (
                <div className="flex-shrink-0 p-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <Lock
                    size={14}
                    className="text-gray-400 dark:text-gray-500"
                  />
                </div>
              ) : project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 p-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                >
                  <ExternalLink
                    size={14}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </a>
              ) : null}
            </div>

            {/* Full Description - NO truncation */}
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-['Nunito_Sans']">
              {description}
            </p>
          </div>
        </div>

        {/* ROW 2: TAG AREA - Fixed height 48px */}
        <div className="h-12 px-5 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center">
          <div className="flex flex-wrap gap-1.5 items-center">
            {"tags" in project &&
              project.tags.map(tag => (
                <span
                  key={tag.name}
                  className={`px-2 py-0.5 text-xs font-semibold rounded-full whitespace-nowrap ${tag.color}`}
                >
                  {tag.name}
                </span>
              ))}
            {project.confidential && (
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {t("projects.confidential")}
              </span>
            )}
          </div>
        </div>

        {/* ROW 3: CTA AREA - Fixed height 56px */}
        <div className="h-14 px-5 py-3 flex items-center gap-2">
          {hasButtons && (
            <div className="flex gap-2 w-full">
              {project.ctaButtons.map((btn, idx) => {
                const btnLabel =
                  btn.label[language as keyof typeof btn.label] || btn.label.en;
                if (btn.type === "video") {
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedVideoUrl(project.videoUrl)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                    >
                      <Play size={13} />
                      {btnLabel}
                    </button>
                  );
                } else {
                  return (
                    <a
                      key={idx}
                      href={btn.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                    >
                      {btnLabel}
                    </a>
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  const PowerAppsProjectCard = ({ project }: { project: Project }) => {
    const description =
      project.description[language as keyof typeof project.description] ||
      project.description.en;
    const hasImage = "image" in project && project.image;
    const hasVideo = "videoUrl" in project && project.videoUrl;
    const hasButtons = "ctaButtons" in project && project.ctaButtons;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-600 transition-all duration-300 overflow-hidden group h-full flex flex-col">
        {/* Image */}
        {hasImage && (
          <div className="relative w-full h-56 bg-gradient-to-br from-gray-50 dark:from-gray-700 to-gray-100 dark:to-gray-800 overflow-hidden flex items-center justify-center">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="p-6 flex flex-col flex-grow">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="font-bold text-gray-900 dark:text-white font-['Space_Grotesk'] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
              {project.title}
            </h3>
            {project.confidential ? (
              <div className="flex-shrink-0 p-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <Lock size={14} className="text-gray-400 dark:text-gray-500" />
              </div>
            ) : project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 p-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
              >
                <ExternalLink
                  size={14}
                  className="text-blue-600 dark:text-blue-400"
                />
              </a>
            ) : null}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 font-['Nunito_Sans'] flex-grow">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {"tags" in project &&
              project.tags.map(tag => (
                <span
                  key={tag.name}
                  className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${tag.color}`}
                >
                  {tag.name}
                </span>
              ))}
            {project.confidential && (
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                {t("projects.confidential")}
              </span>
            )}
          </div>

          {/* CTA Buttons */}
          {hasButtons && (
            <div className="flex gap-2 flex-wrap">
              {project.ctaButtons.map((btn, idx) => {
                const btnLabel =
                  btn.label[language as keyof typeof btn.label] || btn.label.en;
                if (btn.type === "video") {
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedVideoUrl(project.videoUrl)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
                    >
                      <Play size={14} />
                      {btnLabel}
                    </button>
                  );
                } else {
                  return (
                    <a
                      key={idx}
                      href={btn.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-sm font-semibold rounded-lg transition-colors"
                    >
                      {btnLabel}
                    </a>
                  );
                }
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {!project.confidential && project.url && !hasButtons && (
          <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink size={13} />
              {t("projects.view")}
            </a>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="projects" className="py-24 bg-white dark:bg-gray-900">
      <VideoModal
        isOpen={!!selectedVideoUrl}
        videoUrl={selectedVideoUrl || ""}
        onClose={() => setSelectedVideoUrl(null)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white font-['Space_Grotesk']">
            {t("projects.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-2xl">
            {t("projects.subtitle")}
          </p>
          <div className="mt-4 w-16 h-1 bg-blue-600 rounded-full" />
        </div>

        {/* Vibe Coding Section */}
        <div className="mb-20">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-['Space_Grotesk']">
              {t("projects.vibe")}
            </h3>
          </div>

          <HorizontalSlider>
            {vibeProjects.map(project => (
              <VibeProjectCard key={project.title} project={project} />
            ))}
          </HorizontalSlider>
        </div>

        {/* Power Apps Section */}
        {powerAppsProjects.length > 0 && (
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-['Space_Grotesk']">
                {t("projects.powerapps")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-3">
                {t("projects.powerapps.description")}
              </p>
            </div>

            <HorizontalSlider>
              {powerAppsProjects.map(project => (
                <PowerAppsProjectCard key={project.title} project={project} />
              ))}
            </HorizontalSlider>
          </div>
        )}
      </div>
    </section>
  );
}
