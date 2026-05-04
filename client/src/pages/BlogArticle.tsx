import { useEffect, useMemo, useState } from "react";
import { Link, useRoute } from "wouter";
import { PlayCircle, X } from "lucide-react";
import { sanitizeHtml, type BlogLanguage, type BlogPost } from "@shared/blog";
import { blogLanguages } from "@shared/blog";
import { fetchPublicBlogPost } from "@/lib/blogApi";

const languageLabels: Record<BlogLanguage, string> = { en: "EN", de: "DE", tr: "TR" };

export default function BlogArticle() {
  const [, paramsWithLanguage] = useRoute("/blog/:slug/:lang");
  const [, paramsWithoutLanguage] = useRoute("/blog/:slug");
  const params = paramsWithLanguage || paramsWithoutLanguage;
  const slug = params?.slug || "";
  const routeLanguage = blogLanguages.includes((params as { lang?: string } | null)?.lang as BlogLanguage) ? ((params as { lang?: string }).lang as BlogLanguage) : "en";
  const [post, setPost] = useState<BlogPost | null>(null);
  const [language, setLanguage] = useState<BlogLanguage>(routeLanguage);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetchPublicBlogPost(slug)
      .then((nextPost) => setPost(nextPost))
      .catch((loadError) => setError(loadError instanceof Error ? loadError.message : "Blog article not found."));
  }, [slug]);

  useEffect(() => {
    if (!post) return;
    document.title = post.seo[language].title || post.topic;
    const description = document.querySelector('meta[name="description"]') || document.createElement("meta");
    description.setAttribute("name", "description");
    description.setAttribute("content", post.seo[language].metaDescription || "");
    document.head.appendChild(description);
  }, [post, language]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const videoNode = target?.closest<HTMLElement>("[data-video-url]");
      const videoUrl = videoNode?.dataset.videoUrl;
      if (!videoUrl) return;
      event.preventDefault();
      setActiveVideo(videoUrl);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const hero = post?.visuals[0];
  const inlineVisualIds = useMemo(() => {
    if (!post) return new Set<string>();
    const ids = new Set<string>();
    const content = post.content[language] || "";
    const visualIdPattern = /data-visual-id=["']([^"']+)["']/g;
    let match = visualIdPattern.exec(content);
    while (match) {
      ids.add(match[1]);
      match = visualIdPattern.exec(content);
    }
    return ids;
  }, [post, language]);
  const bodyVisuals = useMemo(
    () => post?.visuals.slice(1).filter((visual) => !inlineVisualIds.has(visual.id)) || [],
    [post, inlineVisualIds],
  );
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  if (error) {
    return (
      <main className="min-h-screen bg-[#f8fbff] px-4 py-16 text-[#0f172a]">
        <div className="mx-auto max-w-3xl rounded-3xl border border-[#dce7f9] bg-white p-8 text-center">
          <h1 className="font-['Space_Grotesk'] text-3xl font-bold">Article unavailable</h1>
          <p className="mt-3 text-[#5b667b]">{error}</p>
          <Link href="/blog" className="mt-6 inline-flex rounded-full bg-[#2563eb] px-5 py-3 font-bold text-white">Back to Blog</Link>
        </div>
      </main>
    );
  }

  if (!post) {
    return <main className="min-h-screen bg-[#f8fbff] px-4 py-16 text-center text-[#5b667b]">Loading article...</main>;
  }

  return (
    <main className="min-h-screen bg-[#f8fbff] text-[#0f172a]">
      <article>
        <header className="border-b border-[#dce7f9] bg-white">
          <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link href="/blog" className="font-bold text-[#2563eb]">Back to Blog</Link>
              <div className="flex rounded-2xl border border-[#dce7f9] bg-[#f8fbff] p-1">
                {blogLanguages.map((item) => (
                  <Link key={item} href={`/blog/${post.slug.canonical}/${item}`} onClick={() => setLanguage(item)} className={`rounded-xl px-3 py-2 text-sm font-bold ${language === item ? "bg-[#2563eb] text-white" : "text-[#5b667b]"}`}>
                    {languageLabels[item]}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <div className="mb-4 flex flex-wrap gap-2">
                {(post.categories || []).map((category) => (
                  <span key={category} className="rounded-full bg-[#eef4ff] px-3 py-1 text-xs font-bold text-[#2563eb]">{category}</span>
                ))}
              </div>
              <h1 className="font-['Space_Grotesk'] text-4xl font-bold leading-tight sm:text-6xl">{post.seo[language].title || post.topic}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#5b667b]">{post.seo[language].metaDescription}</p>
              {post.publishedAt ? <p className="mt-4 text-sm font-semibold text-[#7a8699]">{new Intl.DateTimeFormat(language, { dateStyle: "long" }).format(new Date(post.publishedAt))}</p> : null}
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          {hero ? (
            <figure className="mb-10 overflow-hidden rounded-[1.75rem] border border-[#dce7f9] bg-white shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
              {hero.url ? <img src={hero.url} alt={hero.alt[language]} className="h-[26rem] w-full object-cover" /> : <div className="flex min-h-72 items-center justify-center bg-[#eef4ff] px-8 text-center text-[#5b667b]">{hero.prompt}</div>}
              <figcaption className="px-5 py-4 text-sm text-[#5b667b]"><strong>Figure:</strong> {hero.caption[language]}</figcaption>
            </figure>
          ) : null}

          <div className="blog-article-body" dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content[language]) }} />

          {bodyVisuals.length ? (
            <section className="mt-10 grid gap-6">
              {bodyVisuals.map((visual) => (
                <figure key={visual.id} className="overflow-hidden rounded-[1.5rem] border border-[#dce7f9] bg-white">
                  <VisualMedia visual={visual} language={language} onVideo={setActiveVideo} />
                  <figcaption className="px-5 py-4 text-sm text-[#5b667b]"><strong>Figure:</strong> {visual.caption[language]}</figcaption>
                </figure>
              ))}
            </section>
          ) : null}

          {post.faq[language]?.length ? (
            <section className="mt-12 rounded-[1.75rem] border border-[#dce7f9] bg-white p-6">
              <h2 className="font-['Space_Grotesk'] text-3xl font-bold">FAQ</h2>
              <div className="mt-5 grid gap-5">
                {post.faq[language].map((item) => (
                  <div key={item.question}>
                    <h3 className="font-['Space_Grotesk'] text-xl font-bold">{item.question}</h3>
                    <p className="mt-2 leading-7 text-[#5b667b]">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {post.internalLinks.length ? (
            <section className="mt-10 rounded-[1.75rem] border border-[#dce7f9] bg-white p-6">
              <h2 className="font-['Space_Grotesk'] text-2xl font-bold">Related Systems</h2>
              <div className="mt-4 grid gap-3">
                {post.internalLinks.filter((link) => !link.language || link.language === "all" || link.language === language).map((link) => (
                  <a key={`${link.label}-${link.url}`} href={link.url} className="rounded-2xl border border-[#dce7f9] px-4 py-3 font-bold text-[#2563eb] hover:bg-[#f8fbff]">
                    {link.label}
                  </a>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </article>
      {activeVideo ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-4xl overflow-hidden rounded-[1.5rem] bg-black shadow-2xl">
            <div className="flex justify-end bg-slate-950 p-3">
              <button type="button" onClick={() => setActiveVideo(null)} aria-label="Close video" className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
                <X size={18} />
              </button>
            </div>
            <iframe
              src={toVideoEmbed(activeVideo)}
              title="Blog video"
              className="aspect-video w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      ) : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.seo[language].title || post.topic,
        description: post.seo[language].metaDescription,
        datePublished: post.publishedAt,
        author: { "@type": "Person", name: "Ibrahim Tolgar Sasmaz" },
      }) }} />
    </main>
  );
}

function VisualMedia({
  visual,
  language,
  onVideo,
}: {
  visual: BlogPost["visuals"][number];
  language: BlogLanguage;
  onVideo: (url: string) => void;
}) {
  const image = visual.url ? (
    <img src={visual.url} alt={visual.alt[language]} className="h-80 w-full object-cover" />
  ) : (
    <div className="flex min-h-56 items-center justify-center bg-[#eef4ff] px-8 text-center text-sm text-[#5b667b]">{visual.prompt}</div>
  );
  if (!visual.videoUrl) return image;
  return (
    <button type="button" onClick={() => onVideo(visual.videoUrl || "")} className="group relative block w-full text-left" aria-label={`Play video: ${visual.caption[language]}`}>
      {image}
      <span className="absolute inset-0 flex items-center justify-center bg-slate-950/20 transition group-hover:bg-slate-950/34">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/92 text-[#2563eb] shadow-[0_18px_48px_rgba(15,23,42,0.22)]">
          <PlayCircle size={42} />
        </span>
      </span>
    </button>
  );
}

function toVideoEmbed(url: string) {
  const match = url.match(/(?:youtu\.be\/|v=|shorts\/)([^?&/]+)/);
  if (match?.[1]) return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
  return url;
}
