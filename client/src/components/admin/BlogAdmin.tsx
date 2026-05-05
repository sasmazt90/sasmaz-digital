import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Eye,
  FilePlus2,
  ImagePlus,
  Plus,
  Save,
  Search,
  Send,
  Trash2,
  X,
} from "lucide-react";
import { blogCategories, blogLanguages, buildDocReadyContent, sanitizeHtml, uniqueBaseSlug, validateBlogPost, type BlogLanguage, type BlogPost, type BlogVisual } from "@shared/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import {
  createManualBlogPost,
  deleteBlogPost,
  fetchAiStatus,
  fetchAdminBlogPosts,
  generateBlogVisual,
  generateBlogPost,
  publishBlogPost,
  saveBlogPost,
  uploadBlogVisual,
} from "@/lib/blogApi";

type BlogAdminMode = { type: "list" } | { type: "edit"; postId: string } | { type: "preview"; postId: string };
type StatusFilter = "all" | "draft" | "published";
type AiStatus = Awaited<ReturnType<typeof fetchAiStatus>>;

const languageLabels: Record<BlogLanguage, string> = { en: "EN", de: "DE", tr: "TR" };

export function BlogAdmin({ password }: { password: string }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [mode, setMode] = useState<BlogAdminMode>({ type: "list" });
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [aiStatus, setAiStatus] = useState<AiStatus | null>(null);
  const [generationInput, setGenerationInput] = useState({ topic: "", angle: "", targetKeyword: "", notes: "" });

  const loadPosts = async () => {
    if (!password) return;
    setError(null);
    try {
      const collection = await fetchAdminBlogPosts(password);
      const status = await fetchAiStatus(password);
      setPosts(collection.posts);
      setAiStatus(status);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Failed to load blog posts.");
    }
  };

  useEffect(() => {
    void loadPosts();
  }, [password]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();
    return posts.filter((post) => {
      if (statusFilter !== "all" && post.status !== statusFilter) return false;
      if (!normalizedQuery) return true;
      const haystack = [
        post.topic,
        post.slug.canonical,
        post.slug.en,
        post.slug.de,
        post.slug.tr,
        post.targetKeyword,
        post.seo.en.title,
        post.seo.de.title,
        post.seo.tr.title,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [posts, query, statusFilter]);

  const selectedPost = mode.type !== "list" ? posts.find((post) => post.id === mode.postId) : undefined;

  const handleGenerate = async (manual = false) => {
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      const post = manual
        ? await createManualBlogPost(generationInput, password)
        : await generateBlogPost(generationInput, password);
      setPosts((current) => [post, ...current.filter((item) => item.id !== post.id)]);
      setGenerationInput({ topic: "", angle: "", targetKeyword: "", notes: "" });
      setMode({ type: "edit", postId: post.id });
      setMessage(manual ? "Manual draft created." : "Blog draft generated and saved.");
    } catch (generateError) {
      setError(generateError instanceof Error ? generateError.message : "Failed to create blog draft.");
    } finally {
      setBusy(false);
    }
  };

  const replacePost = (post: BlogPost) => setPosts((current) => current.map((item) => (item.id === post.id ? post : item)));

  if (mode.type === "edit" && selectedPost) {
    return (
      <BlogEditor
        post={selectedPost}
        password={password}
        onBack={() => setMode({ type: "list" })}
        onPreview={() => setMode({ type: "preview", postId: selectedPost.id })}
        onSaved={(post) => {
          replacePost(post);
          setMessage("Draft saved.");
        }}
        onPublished={(post) => {
          replacePost(post);
          setMessage(`Published: /blog/${post.slug.canonical}`);
        }}
        onDeleted={(postId) => {
          setPosts((current) => current.filter((post) => post.id !== postId));
          setMode({ type: "list" });
          setMessage("Blog post permanently deleted.");
        }}
      />
    );
  }

  if (mode.type === "preview" && selectedPost) {
    return <BlogPreview post={selectedPost} onBack={() => setMode({ type: "list" })} onEdit={() => setMode({ type: "edit", postId: selectedPost.id })} />;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <div className="mb-5 flex flex-col gap-2">
          <h2 className="font-['Space_Grotesk'] text-2xl font-bold">New Blog Article</h2>
          <p className="text-sm text-slate-400">Generate a draft from a topic or create a blank manual CMS entry.</p>
        </div>
        {aiStatus ? (
          <div className="mb-5 grid gap-3 rounded-2xl border border-white/10 bg-slate-950/45 p-4 text-sm md:grid-cols-2">
            <DiagnosticPill
              label="Text generation"
              configured={aiStatus.textGeneration.configured}
              model={aiStatus.textGeneration.model}
            />
            <DiagnosticPill
              label="Image generation"
              configured={aiStatus.imageGeneration.configured}
              model={aiStatus.imageGeneration.model}
            />
            {aiStatus.sourceContext ? (
              <DiagnosticPill
                label="SASMAZ source context"
                configured={aiStatus.sourceContext.configured}
                model={`${aiStatus.sourceContext.characterCount.toLocaleString()} chars loaded`}
              />
            ) : null}
            {aiStatus.messages.length ? (
              <div className="md:col-span-2 text-amber-200">{aiStatus.messages.join(" ")}</div>
            ) : null}
          </div>
        ) : null}
        <div className="grid gap-4 lg:grid-cols-2">
          <Field label="Topic">
            <Input value={generationInput.topic} onChange={(event) => setGenerationInput({ ...generationInput, topic: event.target.value })} className="bg-slate-950/70" placeholder="E-commerce Growth Engine Nasil Kurulur?" />
          </Field>
          <Field label="Target keyword">
            <Input value={generationInput.targetKeyword} onChange={(event) => setGenerationInput({ ...generationInput, targetKeyword: event.target.value })} className="bg-slate-950/70" placeholder="AI e-commerce growth system" />
          </Field>
          <Field label="Angle / context">
            <Textarea value={generationInput.angle} onChange={(event) => setGenerationInput({ ...generationInput, angle: event.target.value })} className="min-h-24 bg-slate-950/70" />
          </Field>
          <Field label="Notes">
            <Textarea value={generationInput.notes} onChange={(event) => setGenerationInput({ ...generationInput, notes: event.target.value })} className="min-h-24 bg-slate-950/70" />
          </Field>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button type="button" onClick={() => void handleGenerate(false)} disabled={busy || !generationInput.topic.trim()}>
            <Send size={16} />
            {busy ? "Working..." : "Generate"}
          </Button>
          <Button type="button" variant="outline" onClick={() => void handleGenerate(true)} disabled={busy || !generationInput.topic.trim()}>
            <FilePlus2 size={16} />
            Create Manually
          </Button>
        </div>
        {message ? <p className="mt-3 text-sm text-emerald-300">{message}</p> : null}
        {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="font-['Space_Grotesk'] text-2xl font-bold">Blog Posts</h2>
            <p className="mt-1 text-sm text-slate-400">Drafts stay private. Published posts appear on /blog.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex rounded-2xl border border-white/10 bg-slate-950/50 p-1">
              {(["all", "draft", "published"] as StatusFilter[]).map((filter) => (
                <button key={filter} type="button" onClick={() => setStatusFilter(filter)} className={`rounded-xl px-3 py-2 text-sm font-semibold capitalize ${statusFilter === filter ? "bg-blue-500 text-white" : "text-slate-300 hover:bg-white/10"}`}>
                  {filter}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/50 px-3 py-2">
              <Search size={16} className="text-slate-500" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search topic, slug, keyword" className="w-64 bg-transparent text-sm outline-none placeholder:text-slate-500" />
            </label>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-slate-950/70 text-xs uppercase tracking-[0.16em] text-slate-400">
              <tr>
                <th className="px-4 py-3">Topic</th>
                <th className="px-4 py-3">Canonical Slug</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3">Published</th>
                <th className="px-4 py-3">Languages</th>
                <th className="px-4 py-3">Visuals</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="bg-white/[0.03] align-top">
                  <td className="px-4 py-3 font-semibold text-white">{post.topic}</td>
                  <td className="px-4 py-3 text-slate-300">{post.slug.canonical}</td>
                  <td className="px-4 py-3"><StatusBadge post={post} /></td>
                  <td className="px-4 py-3 text-slate-400">{formatDate(post.createdAt)}</td>
                  <td className="px-4 py-3 text-slate-400">{formatDate(post.updatedAt)}</td>
                  <td className="px-4 py-3 text-slate-400">{post.publishedAt ? formatDate(post.publishedAt) : "-"}</td>
                  <td className="px-4 py-3 text-slate-300">{blogLanguages.filter((language) => post.content[language]?.trim()).map((language) => languageLabels[language]).join(" / ") || "-"}</td>
                  <td className="px-4 py-3 text-slate-300">{post.visuals.filter((visual) => visual.status === "uploaded" || visual.status === "generated").length}/{post.visuals.length}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <IconButton label="Preview" onClick={() => setMode({ type: "preview", postId: post.id })}><Eye size={15} /></IconButton>
                      <IconButton label="Edit" onClick={() => setMode({ type: "edit", postId: post.id })}><Plus size={15} /></IconButton>
                      {post.status === "published" ? <a className="rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-blue-200 hover:bg-white/10" href={`/blog/${post.slug.canonical}`} target="_blank" rel="noreferrer">Live</a> : null}
                    </div>
                  </td>
                </tr>
              ))}
              {!filteredPosts.length ? (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-slate-400">No blog posts yet.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function BlogEditor({
  post,
  password,
  onBack,
  onPreview,
  onSaved,
  onPublished,
  onDeleted,
}: {
  post: BlogPost;
  password: string;
  onBack: () => void;
  onPreview: () => void;
  onSaved: (post: BlogPost) => void;
  onPublished: (post: BlogPost) => void;
  onDeleted: (postId: string) => void;
}) {
  const [draft, setDraft] = useState<BlogPost>(post);
  const [language, setLanguage] = useState<BlogLanguage>("en");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const validation = validateBlogPost(draft);

  const updateDraft = (patch: Partial<BlogPost>) => setDraft((current) => ({ ...current, ...patch }));
  const updateLanguageContent = (value: string) => updateDraft({ content: { ...draft.content, [language]: sanitizeHtml(value) } });

  const handleSave = async () => {
    setBusy(true);
    setError(null);
    try {
      const saved = await saveBlogPost({ ...draft, docReadyContent: buildDocReadyContent(draft) }, password);
      setDraft(saved);
      onSaved(saved);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Failed to save draft.");
    } finally {
      setBusy(false);
    }
  };

  const handlePublish = async () => {
    if (!window.confirm(`Publish "${draft.topic}" to /blog/${draft.slug.canonical}?`)) return;
    setBusy(true);
    setError(null);
    try {
      const saved = await saveBlogPost(draft, password);
      const published = await publishBlogPost(saved.id, password);
      setDraft(published);
      onPublished(published);
    } catch (publishError) {
      setError(publishError instanceof Error ? publishError.message : "Failed to publish.");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Permanently delete "${draft.topic}" and associated files?`)) return;
    setBusy(true);
    try {
      await deleteBlogPost(draft.id, password);
      onDeleted(draft.id);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Failed to delete.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="sticky top-0 z-20 -mx-2 rounded-3xl border border-white/10 bg-slate-950/95 p-4 backdrop-blur">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <button type="button" onClick={onBack} className="text-sm font-semibold text-slate-400 hover:text-white">Back to Blog List</button>
            <h2 className="mt-1 font-['Space_Grotesk'] text-2xl font-bold">{draft.topic}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={handleSave} disabled={busy}><Save size={16} />Save Draft</Button>
            <Button type="button" variant="outline" onClick={onPreview}><Eye size={16} />Preview</Button>
            <Button type="button" onClick={handlePublish} disabled={busy}><Send size={16} />Publish</Button>
            <Button type="button" variant="destructive" onClick={handleDelete} disabled={busy}><Trash2 size={16} />Delete</Button>
          </div>
        </div>
        {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <main className="space-y-5">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="mb-4 flex flex-wrap gap-2">
              {blogLanguages.map((item) => (
                <button key={item} type="button" onClick={() => setLanguage(item)} className={`rounded-2xl px-4 py-2 text-sm font-bold ${language === item ? "bg-blue-500 text-white" : "bg-white/10 text-slate-300 hover:bg-white/15"}`}>
                  {languageLabels[item]}
                </button>
              ))}
            </div>
            <RichTextEditor
              key={language}
              content={draft.content[language]}
              language={language}
              visuals={draft.visuals}
              onChange={updateLanguageContent}
            />
          </section>

          <FaqEditor post={draft} language={language} onChange={updateDraft} />
          <InternalLinksEditor post={draft} onChange={updateDraft} />
          <VisualManager post={draft} language={language} password={password} onChange={setDraft} />
          <ExportBlock post={{ ...draft, docReadyContent: buildDocReadyContent(draft) }} />
        </main>

        <aside className="space-y-5">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-['Space_Grotesk'] text-lg font-bold">SEO & Publishing</h3>
            <div className="mt-4 grid gap-4">
              <Field label="Topic"><Input value={draft.topic} onChange={(event) => updateDraft({ topic: event.target.value })} className="bg-slate-950/70" /></Field>
              <Field label="Canonical slug"><Input value={draft.slug.canonical} onChange={(event) => updateDraft({ slug: { ...draft.slug, canonical: uniqueBaseSlug(event.target.value) } })} className="bg-slate-950/70" /></Field>
              <Field label={`${languageLabels[language]} slug`}><Input value={draft.slug[language]} onChange={(event) => updateDraft({ slug: { ...draft.slug, [language]: uniqueBaseSlug(event.target.value) } })} className="bg-slate-950/70" /></Field>
              <Field label={`${languageLabels[language]} SEO title`}><Input value={draft.seo[language].title} onChange={(event) => updateDraft({ seo: { ...draft.seo, [language]: { ...draft.seo[language], title: event.target.value } } })} className="bg-slate-950/70" /></Field>
              <Field label={`${languageLabels[language]} meta description`}><Textarea value={draft.seo[language].metaDescription} onChange={(event) => updateDraft({ seo: { ...draft.seo, [language]: { ...draft.seo[language], metaDescription: event.target.value } } })} className="min-h-24 bg-slate-950/70" /></Field>
              <Field label={`${languageLabels[language]} focus keyword`}><Input value={draft.seo[language].focusKeyword || ""} onChange={(event) => updateDraft({ seo: { ...draft.seo, [language]: { ...draft.seo[language], focusKeyword: event.target.value } } })} className="bg-slate-950/70" /></Field>
              <Field label="Categories">
                <div className="grid gap-2">
                  {blogCategories.map((category) => (
                    <label key={category} className="flex items-center gap-2 text-sm text-slate-300">
                      <input type="checkbox" checked={draft.categories?.includes(category) || false} onChange={(event) => {
                        const current = draft.categories || [];
                        updateDraft({ categories: event.target.checked ? [...current, category] : current.filter((item) => item !== category) });
                      }} />
                      {category}
                    </label>
                  ))}
                </div>
              </Field>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-['Space_Grotesk'] text-lg font-bold">Publish Readiness</h3>
            <div className="mt-4 grid gap-2 text-sm">
              {readinessItems(draft).map((item) => (
                <div key={item.label} className={item.ok ? "text-emerald-300" : "text-amber-300"}>{item.ok ? "✓" : "!"} {item.label}</div>
              ))}
            </div>
            {validation.errors.length ? <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-400/10 p-3 text-sm text-rose-200">{validation.errors.join(" ")}</div> : null}
            {validation.warnings.length ? <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-3 text-sm text-amber-100">{validation.warnings.slice(0, 8).map((warning) => <div key={warning}>{warning}</div>)}</div> : null}
          </section>
        </aside>
      </div>
    </div>
  );
}

function FaqEditor({ post, language, onChange }: { post: BlogPost; language: BlogLanguage; onChange: (patch: Partial<BlogPost>) => void }) {
  const items = post.faq[language] || [];
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-['Space_Grotesk'] text-lg font-bold">FAQ ({languageLabels[language]})</h3>
        <Button type="button" variant="outline" onClick={() => onChange({ faq: { ...post.faq, [language]: [...items, { question: "", answer: "" }] } })}><Plus size={15} />Add FAQ</Button>
      </div>
      <div className="grid gap-3">
        {items.map((item, index) => (
          <div key={index} className="grid gap-2 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <Input value={item.question} onChange={(event) => onChange({ faq: { ...post.faq, [language]: items.map((faq, faqIndex) => faqIndex === index ? { ...faq, question: event.target.value } : faq) } })} className="bg-slate-950/70" placeholder="Question" />
            <Textarea value={item.answer} onChange={(event) => onChange({ faq: { ...post.faq, [language]: items.map((faq, faqIndex) => faqIndex === index ? { ...faq, answer: event.target.value } : faq) } })} className="bg-slate-950/70" placeholder="Answer" />
            <Button type="button" variant="outline" size="sm" onClick={() => onChange({ faq: { ...post.faq, [language]: items.filter((_, faqIndex) => faqIndex !== index) } })}><X size={14} />Remove</Button>
          </div>
        ))}
      </div>
    </section>
  );
}

function InternalLinksEditor({ post, onChange }: { post: BlogPost; onChange: (patch: Partial<BlogPost>) => void }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-['Space_Grotesk'] text-lg font-bold">Internal Links</h3>
        <Button type="button" variant="outline" onClick={() => onChange({ internalLinks: [...post.internalLinks, { label: "", url: "", language: "all", context: "" }] })}><Plus size={15} />Add link</Button>
      </div>
      <div className="grid gap-3">
        {post.internalLinks.map((link, index) => (
          <div key={index} className="grid gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-4 md:grid-cols-2">
            <Input value={link.label} onChange={(event) => onChange({ internalLinks: updateArray(post.internalLinks, index, { label: event.target.value }) })} className="bg-slate-950/70" placeholder="Label" />
            <Input value={link.url} onChange={(event) => onChange({ internalLinks: updateArray(post.internalLinks, index, { url: event.target.value }) })} className="bg-slate-950/70" placeholder="URL" />
            <Input value={link.context || ""} onChange={(event) => onChange({ internalLinks: updateArray(post.internalLinks, index, { context: event.target.value }) })} className="bg-slate-950/70 md:col-span-2" placeholder="Context" />
            <Button type="button" variant="outline" size="sm" onClick={() => onChange({ internalLinks: post.internalLinks.filter((_, linkIndex) => linkIndex !== index) })}><X size={14} />Remove</Button>
          </div>
        ))}
      </div>
    </section>
  );
}

function VisualManager({ post, language, password, onChange }: { post: BlogPost; language: BlogLanguage; password: string; onChange: (post: BlogPost) => void }) {
  const updateVisual = (index: number, patch: Partial<BlogVisual>) => onChange({ ...post, visuals: updateArray(post.visuals, index, patch) });
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-['Space_Grotesk'] text-lg font-bold">Visual Manager</h3>
        <Button type="button" variant="outline" onClick={() => onChange({ ...post, visuals: [...post.visuals, { id: `visual_${Date.now()}`, visualType: "hero", fileName: `${post.slug.canonical}-visual.png`, alt: { en: "", de: "", tr: "" }, caption: { en: "", de: "", tr: "" }, prompt: "", placement: "", stylePreset: "editorial-lifestyle", status: "placeholder" }] })}><ImagePlus size={15} />Add visual</Button>
      </div>
      <div className="grid gap-4">
        {post.visuals.map((visual, index) => (
          <div key={visual.id} className="grid gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-start">
              <div className="flex h-28 w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/20 md:w-44">
                {visual.url ? <img src={visual.url} alt={visual.alt[language]} className="h-full w-full object-cover" /> : <span className="text-xs text-slate-500">Placeholder</span>}
              </div>
              <div className="grid flex-1 gap-3 md:grid-cols-2">
                <select value={visual.visualType} onChange={(event) => updateVisual(index, { visualType: event.target.value as BlogVisual["visualType"] })} className="rounded-md border border-input bg-slate-950/70 px-3 py-2 text-sm">
                  <option value="hero">hero</option>
                  <option value="thumbnail">thumbnail</option>
                  <option value="framework">framework</option>
                  <option value="kpi">kpi</option>
                  <option value="workflow">workflow</option>
                </select>
                <select value={visual.stylePreset} onChange={(event) => updateVisual(index, { stylePreset: event.target.value as BlogVisual["stylePreset"] })} className="rounded-md border border-input bg-slate-950/70 px-3 py-2 text-sm">
                  <option value="editorial-lifestyle">editorial-lifestyle</option>
                  <option value="clean-framework">clean-framework</option>
                  <option value="kpi-cards">kpi-cards</option>
                  <option value="sticky-note-workflow">sticky-note-workflow</option>
                  <option value="minimal-chart">minimal-chart</option>
                  <option value="strategy-desk">strategy-desk</option>
                </select>
                <Input value={visual.fileName} onChange={(event) => updateVisual(index, { fileName: event.target.value })} className="bg-slate-950/70" placeholder="File name" />
                <Input value={visual.placement} onChange={(event) => updateVisual(index, { placement: event.target.value })} className="bg-slate-950/70" placeholder="Placement" />
                <Input value={visual.alt[language]} onChange={(event) => updateVisual(index, { alt: { ...visual.alt, [language]: event.target.value } })} className="bg-slate-950/70" placeholder={`${languageLabels[language]} alt text`} />
                <Input value={visual.caption[language]} onChange={(event) => updateVisual(index, { caption: { ...visual.caption, [language]: event.target.value } })} className="bg-slate-950/70" placeholder={`${languageLabels[language]} caption`} />
              </div>
            </div>
            <Textarea value={visual.prompt} onChange={(event) => updateVisual(index, { prompt: event.target.value })} className="min-h-20 bg-slate-950/70" placeholder="Production-ready image prompt / visual description" />
            <div className="flex flex-wrap gap-2">
              <label className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold hover:bg-white/15">
                <ImagePlus size={15} />
                Upload / Replace
                <input type="file" className="sr-only" accept=".png,.jpg,.jpeg,.webp,.svg" onChange={async (event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  const next = await uploadBlogVisual(post.id, visual.id, file, password);
                  onChange(next);
                }} />
              </label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={async () => {
                  try {
                    const next = await generateBlogVisual(post.id, visual.id, visual.prompt, password);
                    onChange(next);
                  } catch (generateError) {
                    window.alert(generateError instanceof Error ? generateError.message : "Failed to generate image.");
                  }
                }}
                disabled={!visual.prompt.trim()}
              >
                <ImagePlus size={14} />
                Generate Image
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => onChange({ ...post, visuals: post.visuals.filter((_, visualIndex) => visualIndex !== index) })}><Trash2 size={14} />Remove</Button>
              <Button type="button" variant="outline" size="sm" disabled={index === 0} onClick={() => onChange({ ...post, visuals: moveItem(post.visuals, index, index - 1) })}>Move up</Button>
              <Button type="button" variant="outline" size="sm" disabled={index === post.visuals.length - 1} onClick={() => onChange({ ...post, visuals: moveItem(post.visuals, index, index + 1) })}>Move down</Button>
              <span className="rounded-xl border border-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{visual.status}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BlogPreview({ post, onBack, onEdit }: { post: BlogPost; onBack: () => void; onEdit: () => void }) {
  const [language, setLanguage] = useState<BlogLanguage>("en");
  const hero = post.visuals[0];
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <button type="button" onClick={onBack} className="text-sm font-semibold text-slate-400 hover:text-white">Back to Blog List</button>
          <h2 className="font-['Space_Grotesk'] text-2xl font-bold">Preview</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {blogLanguages.map((item) => <Button key={item} type="button" variant={language === item ? "default" : "outline"} onClick={() => setLanguage(item)}>{languageLabels[item]}</Button>)}
          <Button type="button" variant="outline" onClick={onEdit}>Edit</Button>
        </div>
      </div>
      <article className="mx-auto max-w-4xl rounded-[1.75rem] bg-white p-6 text-[#0f172a] shadow-2xl shadow-black/20">
        <div className="mb-6 rounded-2xl border border-[#dce7f9] bg-[#f8fbff] p-4 text-sm">
          <strong>SEO:</strong> {post.seo[language].title}<br />
          <span className="text-[#5b667b]">{post.seo[language].metaDescription}</span>
        </div>
        {hero ? (
          <figure className="mb-8 overflow-hidden rounded-[1.5rem] border border-[#dce7f9]">
            {hero.url ? <img src={hero.url} alt={hero.alt[language]} className="h-72 w-full object-cover" /> : <div className="flex h-72 items-center justify-center bg-[#eef4ff] text-[#5b667b]">{hero.prompt}</div>}
            <figcaption className="bg-[#f8fbff] px-4 py-3 text-sm text-[#5b667b]">{hero.caption[language]}</figcaption>
          </figure>
        ) : null}
        <div className="prose max-w-none prose-headings:font-['Space_Grotesk']" dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content[language]) }} />
        <FaqBlock post={post} language={language} />
        <InternalLinksBlock post={post} />
      </article>
    </div>
  );
}

function ExportBlock({ post }: { post: BlogPost }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <h3 className="font-['Space_Grotesk'] text-lg font-bold">Export / Copy Document</h3>
      <Textarea readOnly value={buildDocReadyContent(post)} className="mt-4 min-h-64 bg-slate-950/70 font-mono text-xs" />
    </section>
  );
}

function FaqBlock({ post, language }: { post: BlogPost; language: BlogLanguage }) {
  if (!post.faq[language]?.length) return null;
  return <section className="mt-10"><h2>FAQ</h2>{post.faq[language].map((item) => <div key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></div>)}</section>;
}

function InternalLinksBlock({ post }: { post: BlogPost }) {
  if (!post.internalLinks.length) return null;
  return <section className="mt-10"><h2>Internal Links</h2><ul>{post.internalLinks.map((link) => <li key={`${link.label}-${link.url}`}><a href={link.url}>{link.label}</a>{link.context ? ` - ${link.context}` : ""}</li>)}</ul></section>;
}

function StatusBadge({ post }: { post: BlogPost }) {
  const missingVisuals = post.visuals.filter((visual) => visual.status === "placeholder").length > 0;
  return <div className="flex flex-wrap gap-1"><span className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase ${post.status === "published" ? "bg-emerald-400/15 text-emerald-200" : "bg-amber-400/15 text-amber-200"}`}>{post.status}</span>{missingVisuals ? <span className="rounded-full bg-slate-400/15 px-2.5 py-1 text-xs font-bold uppercase text-slate-300">Missing Visuals</span> : null}</div>;
}

function DiagnosticPill({ label, configured, model }: { label: string; configured: boolean; model: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <div>
        <div className="font-semibold text-slate-100">{label}</div>
        <div className="text-xs text-slate-400">{model}</div>
      </div>
      <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${configured ? "bg-emerald-400/15 text-emerald-200" : "bg-amber-400/15 text-amber-200"}`}>
        {configured ? "Configured" : "Missing key"}
      </span>
    </div>
  );
}

function readinessItems(post: BlogPost) {
  return [
    { label: "EN content complete", ok: Boolean(post.content.en.trim()) },
    { label: "DE content complete", ok: Boolean(post.content.de.trim()) },
    { label: "TR content complete", ok: Boolean(post.content.tr.trim()) },
    { label: "SEO title/meta complete", ok: blogLanguages.every((language) => post.seo[language].title && post.seo[language].metaDescription) },
    { label: "Slugs complete", ok: blogLanguages.every((language) => post.slug[language]) && Boolean(post.slug.canonical) },
    { label: "H1 exists", ok: blogLanguages.every((language) => /<h1[\s>]/i.test(post.content[language])) },
    { label: "FAQ exists", ok: blogLanguages.every((language) => post.faq[language]?.length) },
    { label: "Minimum 3 visuals", ok: post.visuals.length >= 3 },
    { label: "Alt text complete", ok: post.visuals.every((visual) => blogLanguages.every((language) => visual.alt[language])) },
    { label: "Internal links reviewed", ok: post.internalLinks.length > 0 },
  ];
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="grid gap-2 text-sm font-semibold text-slate-200"><span>{label}</span>{children}</label>;
}

function IconButton({ label, children, onClick }: { label: string; children: ReactNode; onClick: () => void }) {
  return <button type="button" aria-label={label} title={label} onClick={onClick} className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-slate-200 hover:bg-white/15">{children}</button>;
}

function formatDate(value: string) {
  return value ? new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value)) : "-";
}

function updateArray<T>(items: T[], index: number, patch: Partial<T>) {
  return items.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item));
}

function moveItem<T>(items: T[], from: number, to: number) {
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}
