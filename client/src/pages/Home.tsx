import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  ExternalLink,
  Globe,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Play,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";
import { usePortfolioData } from "@/contexts/PortfolioDataContext";
import { useSiteContent } from "@/contexts/SiteContentContext";

type MediaModal =
  | { type: "youtube"; url: string; title: string }
  | { type: "video"; url: string; title: string }
  | null;

const navItems = ["About", "Journey", "Products", "Work", "Tools", "Credentials", "Contact"];

const sectionId = (label: string) => label.toLowerCase().replace(/\s+/g, "-");
const toYoutubeEmbed = (url: string) => {
  const match = url.match(/(?:youtu\.be\/|v=)([^?&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

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
    photoMoments,
    speaking,
    storyHighlights,
    toolClusters,
    videoPortfolio,
  } = siteContent;
  const [activeExperience, setActiveExperience] = useState(0);
  const [mediaModal, setMediaModal] = useState<MediaModal>(null);
  const activeCareer = careerTimeline[activeExperience];
  const navigation = useMemo(() => navItems, []);

  return (
    <div className="min-h-screen bg-[#06131a] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#06131a]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="min-w-fit font-['Space_Grotesk'] text-sm font-bold uppercase tracking-[0.28em] text-[#9dd8ff]">
            Tolgar Sasmaz
          </a>
          <nav className="flex flex-1 items-center justify-end gap-2 overflow-x-auto text-sm text-white/70">
            {navigation.map((item) => (
              <a key={item} href={`#${sectionId(item)}`} className="min-w-fit rounded-full px-3 py-2 transition hover:bg-white/8 hover:text-white">
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(49,143,255,0.24),_transparent_30%),radial-gradient(circle_at_80%_20%,_rgba(0,196,140,0.18),_transparent_22%),linear-gradient(180deg,_#06131a_0%,_#091f29_55%,_#06131a_100%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-24">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#9dd8ff]/20 bg-[#9dd8ff]/10 px-4 py-2 text-sm font-semibold text-[#c9ebff]">
                <Sparkles size={16} />
                Head of Digital | AI, growth and transformation
              </div>
              <div className="space-y-5">
                <p className="font-['Space_Grotesk'] text-sm uppercase tracking-[0.3em] text-white/45">Munich-based digital leader</p>
                <h1 className="max-w-4xl font-['Space_Grotesk'] text-5xl font-bold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
                  Building growth engines where <span className="portfolio-gradient-text">AI, commerce and performance</span> move together.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
                  {personalInfo.name} is a senior digital leader with 12+ years across FMCG, SaaS and retail, known for turning analytics, CRM, media and automation into measurable commercial outcomes.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={`mailto:${personalInfo.email}`} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#06131a] transition hover:scale-[1.02]">
                  <Mail size={16} />
                  Start a conversation
                </a>
                <a href="/assets/resume/ibrahim-tolgar-sasmaz-resume-2026.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                  Download resume
                  <ArrowRight size={16} />
                </a>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {highlightMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5 backdrop-blur-sm">
                    <div className="font-['Space_Grotesk'] text-3xl font-bold text-white">{metric.value}</div>
                    <div className="mt-2 text-sm leading-6 text-white/65">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex flex-col gap-6">
              <div className="portfolio-glow absolute -left-8 top-14 h-28 w-28 rounded-full" />
              <div className="rounded-[2rem] border border-white/10 bg-white/6 p-4 shadow-2xl shadow-black/25 backdrop-blur-xl">
                <img src="/assets/profile/profile-picture.jpeg" alt={personalInfo.name} className="aspect-[4/5] w-full rounded-[1.5rem] object-cover object-top" />
              </div>
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                <InfoChip icon={<MapPin size={16} />} label="Based in" value="Munich, Germany" />
                <InfoChip icon={<Globe size={16} />} label="Web" value="sasmaz.digital" href={personalInfo.website} />
                <InfoChip icon={<ExternalLink size={16} />} label="LinkedIn" value="ibrahim-tolgar-sasmaz" href={personalInfo.linkedin} />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="About" title="A portfolio built around transformation, not just campaigns." />
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[2rem] border border-white/10 bg-[#0b222c] p-8">
              <div className="grid gap-5 text-base leading-8 text-white/72 sm:text-lg">
                <p>Tolgar brings together paid acquisition, CRM, AI systems, pricing intelligence, marketplace execution and executive reporting into one operating discipline.</p>
                <p>The recent chapter has focused on regulated healthcare and consumer brands, where scalable growth must coexist with governance, content accuracy, budget rigor and stakeholder alignment.</p>
                <div className="grid gap-3 pt-3">
                  {storyHighlights.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/4 p-4">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#86d3ff]" />
                      <p className="text-sm leading-7 text-white/80">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              {capabilityPillars.map((pillar) => (
                <div key={pillar.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                  <div className="mb-3 inline-flex rounded-full border border-[#86d3ff]/20 bg-[#86d3ff]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-[#c9ebff]">{pillar.title}</div>
                  <p className="text-sm leading-7 text-white/72">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="journey" className="border-y border-white/8 bg-[#081920] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Career Journey" title="An interactive timeline with much richer role detail." />
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 sm:p-7">
              <div className="grid gap-4 lg:grid-cols-7">
                {careerTimeline.map((item, index) => {
                  const isActive = index === activeExperience;
                  return (
                    <button
                      key={`${item.year}-${item.company}`}
                      type="button"
                      onMouseEnter={() => setActiveExperience(index)}
                      onFocus={() => setActiveExperience(index)}
                      onClick={() => setActiveExperience(index)}
                      className={`flex min-w-[180px] flex-col items-start gap-4 rounded-[1.5rem] border px-4 py-5 text-left transition ${isActive ? "border-[#86d3ff]/40 bg-[#0e2b37]" : "border-white/8 bg-white/4 hover:border-white/18 hover:bg-white/6"}`}
                    >
                      <span className="text-xs font-bold uppercase tracking-[0.26em] text-white/45">{item.year}</span>
                      <div className="flex items-center gap-3">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2">
                          <img src={item.logo} alt={item.company} className="max-h-full max-w-full object-contain" />
                        </div>
                        <div>
                          <div className="font-['Space_Grotesk'] text-base font-bold text-white">{item.company}</div>
                          <div className="text-xs uppercase tracking-[0.18em] text-[#9dd8ff]">{item.role}</div>
                        </div>
                      </div>
                      <div className="text-sm leading-6 text-white/60">{item.brand}</div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 grid gap-6 rounded-[1.75rem] border border-white/10 bg-[#0c2530] p-6 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="space-y-4">
                  <div className="inline-flex rounded-full border border-[#86d3ff]/20 bg-[#86d3ff]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-[#c9ebff]">{activeCareer.year}</div>
                  <h3 className="font-['Space_Grotesk'] text-3xl font-bold text-white">{activeCareer.role}</h3>
                  <p className="text-lg text-[#9dd8ff]">{activeCareer.company}</p>
                  <p className="text-sm leading-7 text-white/72">{activeCareer.focus}</p>
                  <div className="grid gap-3 pt-2">
                    {activeCareer.meta.map((item) => (
                      <div key={item} className="rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-white/70">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  {activeCareer.bullets.map((bullet) => (
                    <div key={bullet} className="flex gap-3 rounded-2xl border border-white/8 bg-white/3 p-4">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#86d3ff]" />
                      <p className="text-sm leading-7 text-white/78">{bullet}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="AI Product Portfolio" title="Applications personally built with AI, no-code and low-code platforms." />
          <div className="portfolio-horizontal-grid">
            {aiProducts.map((product) => (
              <article key={product.title} className="portfolio-panel flex min-h-[430px] flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9dd8ff]">{product.category}</p>
                    <h3 className="mt-3 font-['Space_Grotesk'] text-2xl font-bold text-white">{product.title}</h3>
                  </div>
                  {product.confidential ? <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs font-bold text-amber-100">Confidential</span> : null}
                </div>
                {product.image ? (
                  <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-white/8 bg-black/20">
                    <img src={product.image} alt={product.title} className="aspect-[16/10] w-full object-cover" />
                  </div>
                ) : (
                  <div className="mt-5 rounded-[1.5rem] border border-dashed border-white/12 bg-white/4 px-5 py-12 text-sm text-white/55">Private enterprise project. Public visuals intentionally withheld.</div>
                )}
                <p className="mt-5 text-sm leading-7 text-white/72">{product.summary}</p>
                <p className="mt-3 text-sm leading-7 text-white/58">{product.outcome}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-semibold text-white/76">{tag}</span>
                  ))}
                </div>
                <div className="mt-auto flex flex-wrap gap-3 pt-6">
                  {product.video ? (
                    <button type="button" onClick={() => setMediaModal({ type: "video", url: product.video!, title: product.title })} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-[#06131a]">
                      <Play size={15} />
                      Watch walkthrough
                    </button>
                  ) : null}
                  {product.url && !product.confidential ? (
                    <a href={product.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/4 px-4 py-2.5 text-sm font-bold text-white">
                      Open live product
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="border-y border-white/8 bg-[#081920] py-20">
          <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
            <div>
              <SectionHeading eyebrow="Selected Work" title="Campaign proof points, brand work and video production." />
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {caseStudies.map((study) => (
                  <a key={study.brand} href={study.url} target="_blank" rel="noreferrer" className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/7">
                    <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#9dd8ff]">Case study</div>
                    <h3 className="mt-4 font-['Space_Grotesk'] text-xl font-bold text-white">{study.brand}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/70">{study.result}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white">
                      Open source
                      <ExternalLink size={14} />
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <SectionHeading eyebrow="Digital Video Production" title="A production portfolio designed to be explored like a streaming shelf." />
              <div className="portfolio-horizontal-grid">
                {videoPortfolio.map((video) => (
                  <button key={video.title} type="button" onClick={() => setMediaModal({ type: "youtube", url: video.url, title: video.title })} className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 text-left transition hover:border-white/20 hover:bg-white/7">
                    <div className="relative aspect-video overflow-hidden">
                      <iframe src={toYoutubeEmbed(video.url)} title={video.title} className="pointer-events-none h-full w-full scale-[1.01]" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                      <div className="absolute bottom-4 left-4 flex items-center gap-3">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#06131a]">
                          <Play size={18} />
                        </span>
                        <span className="text-sm font-bold uppercase tracking-[0.2em] text-white/85">Watch</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">{video.title}</h3>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="tools" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Tool Ecosystem" title="The stack I use to connect strategy, execution and decision support." />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {toolClusters.map((cluster) => (
              <div key={cluster.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white">{cluster.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {cluster.tools.map((tool) => (
                    <span key={tool} className="rounded-full border border-white/10 bg-[#0c2530] px-3 py-1.5 text-xs font-semibold text-white/76">{tool}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="credentials" className="border-y border-white/8 bg-[#081920] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Credentials" title="Education, speaking, mentorship and certifications that support the work." />
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-6">
                <Panel title="Education" icon={<GraduationCap size={18} className="text-[#9dd8ff]" />}>
                  {education.map((item) => (
                    <div key={item.degree} className="flex gap-4 rounded-2xl border border-white/8 bg-white/4 p-4">
                      {item.logo ? (
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2">
                          <img src={item.logo} alt={item.school} className="max-h-full max-w-full object-contain" />
                        </div>
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/8 font-['Space_Grotesk'] text-lg font-bold text-[#9dd8ff]">
                          IU
                        </div>
                      )}
                      <div>
                        <h4 className="font-['Space_Grotesk'] text-lg font-bold text-white">{item.degree}</h4>
                        <p className="text-sm text-[#9dd8ff]">{item.school}</p>
                        <p className="mt-1 text-sm text-white/60">{item.period} | {item.location}</p>
                      </div>
                    </div>
                  ))}
                </Panel>
                <Panel title="Languages" icon={<Languages size={18} className="text-[#9dd8ff]" />}>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <LanguageCard name="Turkish" level="Native" />
                    <LanguageCard name="English" level="C2" />
                    <LanguageCard name="German" level="A2" />
                  </div>
                </Panel>
              </div>
              <div className="space-y-6">
                <Panel title="Speaking & mentorship" icon={<BriefcaseBusiness size={18} className="text-[#9dd8ff]" />}>
                  {speaking.map((item) => (
                    <a key={`${item.title}-${item.org}`} href={item.url} target="_blank" rel="noreferrer" className="flex gap-4 rounded-2xl border border-white/8 bg-white/4 p-4 transition hover:border-white/18 hover:bg-white/6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2">
                        <img src={item.logo} alt={item.org} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#9dd8ff]">{item.title}</div>
                        <h4 className="mt-2 font-['Space_Grotesk'] text-lg font-bold text-white">{item.org}</h4>
                        <p className="mt-2 text-sm leading-7 text-white/68">{item.detail}</p>
                      </div>
                    </a>
                  ))}
                </Panel>
                <Panel title="Certifications" icon={<Trophy size={18} className="text-[#9dd8ff]" />}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {certifications.map((item) => (
                      <div key={item.title} className="overflow-hidden rounded-2xl border border-white/8 bg-[#0b222c]">
                        <img src={item.image} alt={item.title} className="aspect-[4/3] w-full object-cover" />
                        <div className="p-4">
                          <h4 className="font-['Space_Grotesk'] text-base font-bold text-white">{item.title}</h4>
                          <p className="mt-1 text-sm text-[#9dd8ff]">{item.issuer}</p>
                          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/45">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Panel>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="On Stage" title="Moments from annual meetings, leadership sessions and business storytelling." />
          <div className="grid gap-4 lg:grid-cols-3">
            {photoMoments.map((item) => (
              <figure key={item.title} className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5">
                <img src={item.image} alt={item.title} className="aspect-[4/4.2] w-full object-cover" />
                <figcaption className="border-t border-white/8 px-5 py-4 text-sm text-white/72">{item.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="contact" className="border-t border-white/8 bg-[#081920]">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
            <div className="space-y-5">
              <div className="inline-flex rounded-full border border-[#86d3ff]/20 bg-[#86d3ff]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-[#c9ebff]">Contact</div>
              <h2 className="max-w-3xl font-['Space_Grotesk'] text-4xl font-bold text-white sm:text-5xl">Open to ambitious digital, AI and growth conversations.</h2>
              <p className="max-w-2xl text-lg leading-8 text-white/70">If you are building a digital growth organization, scaling AI-enabled workflows or looking for a commercially sharp transformation leader, let's talk.</p>
            </div>
            <div className="grid gap-4">
              <ContactCard icon={<Mail size={18} />} label="Email" value={personalInfo.email} href={`mailto:${personalInfo.email}`} />
              <ContactCard icon={<MapPin size={18} />} label="Location" value="Munich, Germany" />
              <ContactCard icon={<Globe size={18} />} label="Website" value="sasmaz.digital" href={personalInfo.website} />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/8 bg-[#06131a] px-4 py-6 text-sm text-white/45 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>{personalInfo.name} | Digital growth, AI systems and transformation leadership.</p>
          <p>Designed for desktop and mobile with a more editorial, modern portfolio structure.</p>
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

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10 space-y-3">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9dd8ff]">{eyebrow}</p>
      <h2 className="max-w-4xl font-['Space_Grotesk'] text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{title}</h2>
    </div>
  );
}

function Panel({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
      <div className="mb-5 flex items-center gap-3">
        {icon}
        <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white">{title}</h3>
      </div>
      <div className="grid gap-4">{children}</div>
    </div>
  );
}

function InfoChip({ icon, label, value, href }: { icon: ReactNode; label: string; value: string; href?: string }) {
  const inner = (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
      <div className="mb-2 flex items-center gap-2 text-[#9dd8ff]">{icon}</div>
      <div className="text-xs font-bold uppercase tracking-[0.22em] text-white/40">{label}</div>
      <div className="mt-1 text-sm font-semibold text-white">{value}</div>
    </div>
  );
  return href ? <a href={href} target="_blank" rel="noreferrer" className="transition hover:-translate-y-1">{inner}</a> : inner;
}

function ContactCard({ icon, label, value, href }: { icon: ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex min-w-[280px] items-center gap-4 rounded-[1.5rem] border border-white/10 bg-white/6 p-5">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#9dd8ff]">{icon}</div>
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.22em] text-white/40">{label}</div>
        <div className="mt-1 text-sm font-semibold text-white">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} target="_blank" rel="noreferrer">{content}</a> : content;
}

function LanguageCard({ name, level }: { name: string; level: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
      <div className="font-['Space_Grotesk'] text-lg font-bold text-white">{name}</div>
      <div className="mt-1 text-sm text-white/62">{level}</div>
    </div>
  );
}
