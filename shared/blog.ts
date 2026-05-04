export type BlogLanguage = "en" | "de" | "tr";
export type BlogStatus = "draft" | "published";
export type VisualStatus = "placeholder" | "uploaded" | "generated";

export const blogLanguages: BlogLanguage[] = ["en", "de", "tr"];

export const blogCategories = [
  "AI Marketing",
  "E-commerce Growth",
  "Performance Marketing",
  "CRM & Lifecycle",
  "Digital Growth Systems",
  "Workflow Automation",
  "Case Studies",
];

export interface LocalizedSeo {
  title: string;
  metaDescription: string;
  keywords?: string[];
  focusKeyword?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}

export interface BlogVisual {
  id: string;
  fileName: string;
  url?: string;
  videoUrl?: string;
  alt: Record<BlogLanguage, string>;
  caption: Record<BlogLanguage, string>;
  prompt: string;
  placement: string;
  status: VisualStatus;
}

export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface BlogInternalLink {
  label: string;
  url: string;
  language?: BlogLanguage | "all";
  context?: string;
}

export interface BlogPost {
  id: string;
  status: BlogStatus;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  topic: string;
  angle?: string;
  targetKeyword?: string;
  notes?: string;
  categories?: string[];
  slug: Record<BlogLanguage, string> & { canonical: string };
  seo: Record<BlogLanguage, LocalizedSeo>;
  content: Record<BlogLanguage, string>;
  faq: Record<BlogLanguage, BlogFaqItem[]>;
  visuals: BlogVisual[];
  internalLinks: BlogInternalLink[];
  docReadyContent: string;
  validationWarnings?: string[];
}

export interface BlogCollection {
  posts: BlogPost[];
}

export interface BlogGenerationInput {
  topic: string;
  angle?: string;
  targetKeyword?: string;
  notes?: string;
}

export interface BlogValidationResult {
  errors: string[];
  warnings: string[];
}

const prohibitedPhrases = ["same as above", "mirrors english", "same as english", "placeholder"];
const knownMetricFragments = [
  "+35%",
  "+14pp",
  "+36%",
  "+11%",
  "+12pp",
  "+48%",
  "+9pp",
  "+69%",
  "~60%",
  "15-18%",
  "15–18%",
  "-5%",
  "+60%",
  "+25%",
];

export function createBlankBlogPost(input: BlogGenerationInput): BlogPost {
  const now = new Date().toISOString();
  const canonical = uniqueBaseSlug(input.topic || "new-blog-article");
  return {
    id: `blog_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    status: "draft",
    createdAt: now,
    updatedAt: now,
    topic: input.topic || "New Blog Article",
    angle: input.angle || "",
    targetKeyword: input.targetKeyword || "",
    notes: input.notes || "",
    categories: [],
    slug: {
      canonical,
      en: canonical,
      de: canonical,
      tr: canonical,
    },
    seo: emptyLocalizedSeo(input.targetKeyword),
    content: {
      en: "",
      de: "",
      tr: "",
    },
    faq: {
      en: [],
      de: [],
      tr: [],
    },
    visuals: [],
    internalLinks: defaultInternalLinks(),
    docReadyContent: "",
  };
}

export function createFallbackGeneratedPost(input: BlogGenerationInput): BlogPost {
  const post = createBlankBlogPost(input);
  const title = input.topic.trim();
  post.categories = ["Digital Growth Systems"];
  post.seo = {
    en: {
      title: `${title} | SASMAZ Digital Growth Systems`,
      metaDescription: `A practical operator framework for ${title}, including AI workflows, KPIs, governance, and execution cadence.`,
      keywords: compact([input.targetKeyword, "AI marketing", "digital growth systems"]),
      focusKeyword: input.targetKeyword,
    },
    de: {
      title: `${title} | SASMAZ Digital Growth Systeme`,
      metaDescription: `Ein praxisnaher Operator-Framework fuer ${title} mit KI-Workflows, KPIs, Governance und operativer Kadenz.`,
      keywords: compact([input.targetKeyword, "KI Marketing", "digitale Wachstumssysteme"]),
      focusKeyword: input.targetKeyword,
    },
    tr: {
      title: `${title} | SASMAZ Dijital Buyume Sistemleri`,
      metaDescription: `${title} icin AI is akislari, KPI mantigi, yonetisim ve uygulama ritmi iceren operator seviyesinde rehber.`,
      keywords: compact([input.targetKeyword, "AI pazarlama", "dijital buyume sistemleri"]),
      focusKeyword: input.targetKeyword,
    },
  };
  post.content.en = buildFallbackArticle("en", title);
  post.content.de = buildFallbackArticle("de", title);
  post.content.tr = buildFallbackArticle("tr", title);
  post.faq = {
    en: [
      { question: "What should be validated before publishing?", answer: "Validate source context, KPI claims, visual completeness, SEO metadata, and whether each language version is complete enough for a senior operator." },
      { question: "Which KPIs are safe to use?", answer: "Use only verified examples from the SASMAZ context or label numbers as benchmarks instead of presenting them as results." },
    ],
    de: [
      { question: "Was sollte vor der Veroeffentlichung geprueft werden?", answer: "Quellenkontext, KPI-Aussagen, Visuals, SEO-Metadaten und die Vollstaendigkeit jeder Sprachversion muessen geprueft werden." },
      { question: "Welche KPIs sind nutzbar?", answer: "Nur verifizierte SASMAZ-Kontextwerte verwenden oder Zahlen klar als Benchmark statt als Ergebnis kennzeichnen." },
    ],
    tr: [
      { question: "Yayinlamadan once ne kontrol edilmeli?", answer: "Kaynak baglami, KPI iddialari, gorseller, SEO metadatalari ve uc dilde icerik derinligi kontrol edilmeli." },
      { question: "Hangi KPI'lar kullanilabilir?", answer: "Sadece dogrulanmis SASMAZ KPI ornekleri kullanilmali veya sayilar benchmark olarak etiketlenmeli." },
    ],
  };
  post.visuals = ["hero", "framework", "kpi"].map((kind, index) => ({
    id: `visual_${index + 1}`,
    fileName: `${post.slug.canonical}-${kind}.png`,
    alt: {
      en: `${title} ${kind} visual`,
      de: `${title} ${kind} Visual`,
      tr: `${title} ${kind} gorseli`,
    },
    caption: {
      en: `${kind} visual for the ${title} operating model.`,
      de: `${kind} Visual fuer das ${title} Betriebsmodell.`,
      tr: `${title} operasyon modeli icin ${kind} gorseli.`,
    },
    prompt: `Create a custom SASMAZ-style ${kind} visual for an article about ${title}. Use clean data-product aesthetics, diagrams, dashboards, and no stock photography.`,
    placement: index === 0 ? "Hero" : index === 1 ? "Framework section" : "Data / KPI section",
    status: "placeholder",
  }));
  post.docReadyContent = buildDocReadyContent(post);
  post.validationWarnings = validateBlogPost(post).warnings;
  return post;
}

export function buildBlogGenerationPrompt(input: BlogGenerationInput, sourceContext = "") {
  return `You are generating a SASMAZ BLOG article for sasmaz.digital.
Topic: ${input.topic}
Optional angle: ${input.angle || ""}
Target keyword: ${input.targetKeyword || ""}
Additional notes: ${input.notes || ""}

AUTHORITATIVE SASMAZ SOURCE CONTEXT
Use the context below as the primary source of truth for Ibrahim Tolgar Sasmaz's career history, systems built, KPI examples, tools, products, awards, case studies, education, certifications, and operating experience. Do not treat the source links as enough by themselves. Extract, rewrite, deepen, and structure the insights from this context into original content. Do not copy phrases verbatim unless they are product/system names.
${sourceContext || "No extracted source context was provided. Use only the verified positioning and KPI list below, and avoid unsupported claims."}

You must create a complete authority blog article in EN, DE, and TR. Follow these rules strictly:
1. Produce full English, German, and Turkish versions.
2. Do not shorten German or Turkish.
3. Do not write "same as above", "mirrors English", or placeholders.
4. Use operator-level language.
5. Use real systems, frameworks, KPIs, and examples only when contextually relevant.
6. Do not invent fake KPIs.
7. Include 3-5 visuals with file names, alt texts, captions, prompts, and placement.
8. Include SEO metadata for each language.
9. Include FAQ for each language.
10. Include internal link suggestions.
11. Return valid JSON only.

Use and enrich from these mandatory context sources without copying directly: Resume/CV folder https://drive.google.com/drive/folders/1apKuJFhCAfwZwD8Re3zleIKEpZ5EBAWt?usp=sharing, personal website https://www.sasmaz.digital, LinkedIn profile https://www.linkedin.com/in/ibrahim-tolgar.sasmaz, and especially the extracted SASMAZ source context included above. If you cannot verify a KPI from the extracted context, label it as an example/benchmark or omit it.

Known context you may use when relevant: AI-driven marketing operating system builder; Head of Digital at NAOS Deutschland; DACH digital commerce, analytics, AI and e-commerce growth systems; AI localization / creative adaptation systems; TranslAsset AI OCR + LLM + image reconstruction/inpainting; pricing validation and competitor benchmarking; SEO + PDP optimization; CRM lifecycle and LTV/CAC systems; workflow automation and Tasky AI-style internal operating systems; executive dashboards and forecasting. Verified KPI examples: +35% e-commerce sell-out growth, +14pp contribution margin improvement, +36% blended ROAS improvement, +11% AOV, +12pp Buy Box share, +48% first-page visibility, +9pp add-to-cart rate, +69% LTV, ~60% LTV/CAC, 15-18% OPEX optimization, TranslAsset AI -5% OPEX, +60% CTR, +25% CVR. Use only when contextually relevant.

Use this article structure in each language:
0. Context / Hook; 1. Problem; 2. Framework; 3. Real Example; 4. Data / KPI; 5. Actionable Steps; 6. FAQ.

Return JSON matching this TypeScript shape exactly:
{
  "topic": string,
  "angle": string,
  "targetKeyword": string,
  "notes": string,
  "categories": string[],
  "slug": { "canonical": string, "en": string, "de": string, "tr": string },
  "seo": { "en": { "title": string, "metaDescription": string, "keywords": string[], "focusKeyword": string }, "de": {...}, "tr": {...} },
  "content": { "en": sanitizedHtmlString, "de": sanitizedHtmlString, "tr": sanitizedHtmlString },
  "faq": { "en": [{ "question": string, "answer": string }], "de": [...], "tr": [...] },
  "visuals": [{ "id": string, "fileName": string, "alt": { "en": string, "de": string, "tr": string }, "caption": { "en": string, "de": string, "tr": string }, "prompt": string, "placement": string, "status": "placeholder" }],
  "internalLinks": [{ "label": string, "url": string, "language": "all", "context": string }],
  "docReadyContent": string
}`;
}

export function normalizeGeneratedBlogPost(raw: unknown, input: BlogGenerationInput, existingSlugs: string[] = []): BlogPost {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new Error("AI response must be a JSON object.");
  }
  const now = new Date().toISOString();
  const value = raw as Partial<BlogPost>;
  const canonical = uniqueSlug(value.slug?.canonical || input.topic, existingSlugs);
  const post: BlogPost = {
    ...createBlankBlogPost(input),
    ...value,
    id: `blog_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    status: "draft",
    createdAt: now,
    updatedAt: now,
    publishedAt: undefined,
    topic: value.topic || input.topic,
    angle: value.angle || input.angle || "",
    targetKeyword: value.targetKeyword || input.targetKeyword || "",
    notes: value.notes || input.notes || "",
    slug: {
      canonical,
      en: uniqueBaseSlug(value.slug?.en || canonical),
      de: uniqueBaseSlug(value.slug?.de || canonical),
      tr: uniqueBaseSlug(value.slug?.tr || canonical),
    },
    seo: mergeLocalizedSeo(value.seo, input.targetKeyword),
    content: mergeLocalizedContent(value.content),
    faq: mergeFaq(value.faq),
    visuals: Array.isArray(value.visuals) ? value.visuals.map((visual, index) => normalizeVisual(visual, index)) : [],
    internalLinks: Array.isArray(value.internalLinks) ? value.internalLinks : defaultInternalLinks(),
    docReadyContent: value.docReadyContent || "",
    categories: Array.isArray(value.categories) ? value.categories : [],
  };
  if (!post.docReadyContent) post.docReadyContent = buildDocReadyContent(post);
  const validation = validateBlogPost(post);
  if (validation.errors.length) {
    throw new Error(validation.errors.join(" "));
  }
  post.validationWarnings = validation.warnings;
  return post;
}

export function validateBlogPost(post: BlogPost): BlogValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  if (!post.topic?.trim()) errors.push("Topic is required.");
  if (!post.slug?.canonical?.trim()) errors.push("Canonical slug is required.");
  for (const language of blogLanguages) {
    const content = post.content?.[language] || "";
    if (!content.trim()) errors.push(`${language.toUpperCase()} content is required.`);
    if (!post.seo?.[language]?.title?.trim()) errors.push(`${language.toUpperCase()} SEO title is required.`);
    if (!post.seo?.[language]?.metaDescription?.trim()) errors.push(`${language.toUpperCase()} meta description is required.`);
    if (!post.slug?.[language]?.trim()) errors.push(`${language.toUpperCase()} slug is required.`);
    if (!post.faq?.[language]?.length) warnings.push(`${language.toUpperCase()} FAQ is missing.`);
    if (!/<h1[\s>]/i.test(content)) warnings.push(`${language.toUpperCase()} content should include an H1.`);
    if (content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length < 450) {
      warnings.push(`${language.toUpperCase()} content looks short for AdSense-ready authority content.`);
    }
    const lowered = content.toLowerCase();
    if (prohibitedPhrases.some((phrase) => lowered.includes(phrase))) {
      errors.push(`${language.toUpperCase()} content contains prohibited placeholder language.`);
    }
  }
  if ((post.visuals || []).length < 3) warnings.push("Minimum 3 visuals or visual placeholders are recommended.");
  for (const visual of post.visuals || []) {
    if (!visual.fileName || !visual.prompt || !visual.placement) warnings.push(`Visual ${visual.id || visual.fileName} is missing production details.`);
    for (const language of blogLanguages) {
      if (!visual.alt?.[language]) warnings.push(`Visual ${visual.fileName} is missing ${language.toUpperCase()} alt text.`);
      if (!visual.caption?.[language]) warnings.push(`Visual ${visual.fileName} is missing ${language.toUpperCase()} caption.`);
    }
  }
  if (!post.internalLinks?.length) warnings.push("Internal links have not been reviewed.");
  const suspiciousMetrics = (JSON.stringify(post).match(/[+-]?\d+(?:[.,]\d+)?\s?(?:%|pp)/g) || []).filter(
    (metric) => !knownMetricFragments.some((known) => metric.replace(/\s/g, "").includes(known.replace(/\s/g, ""))),
  );
  if (suspiciousMetrics.length) warnings.push("Please verify this KPI before publishing.");
  return { errors, warnings: Array.from(new Set(warnings)) };
}

export function buildDocReadyContent(post: BlogPost) {
  const visualList = post.visuals
    .map((visual) => `- ${visual.fileName}\n  Alt EN: ${visual.alt.en}\n  Caption EN: ${visual.caption.en}\n  Prompt: ${visual.prompt}\n  Placement: ${visual.placement}`)
    .join("\n");
  const links = post.internalLinks.map((link) => `- ${link.label}: ${link.url} (${link.language || "all"}) ${link.context || ""}`).join("\n");
  return `# ${post.topic}

## SEO Metadata
EN: ${post.seo.en.title} | ${post.seo.en.metaDescription}
DE: ${post.seo.de.title} | ${post.seo.de.metaDescription}
TR: ${post.seo.tr.title} | ${post.seo.tr.metaDescription}

## Visuals
${visualList}

## English
${post.content.en}

## German
${post.content.de}

## Turkish
${post.content.tr}

## Internal Links
${links}

## Codex Implementation Prompt
Create or update the blog post page for ${post.topic}. Add EN, DE, and TR versions, place images in /images/blog, use SEO metadata, preserve semantic HTML, add relevant internal links, ensure responsive layout, ensure no broken image paths, and match sasmaz.digital typography, spacing, and visual style.`;
}

export function uniqueSlug(value: string, existingSlugs: string[]) {
  const base = uniqueBaseSlug(value);
  let candidate = base;
  let index = 2;
  while (existingSlugs.includes(candidate)) {
    candidate = `${base}-${index}`;
    index += 1;
  }
  return candidate;
}

export function uniqueBaseSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "blog-post";
}

export function sanitizeHtml(value: string) {
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/\son[a-z]+="[^"]*"/gi, "")
    .replace(/\son[a-z]+='[^']*'/gi, "")
    .replace(/javascript:/gi, "");
}

function emptyLocalizedSeo(focusKeyword?: string): Record<BlogLanguage, LocalizedSeo> {
  return {
    en: { title: "", metaDescription: "", keywords: compact([focusKeyword]), focusKeyword },
    de: { title: "", metaDescription: "", keywords: compact([focusKeyword]), focusKeyword },
    tr: { title: "", metaDescription: "", keywords: compact([focusKeyword]), focusKeyword },
  };
}

function mergeLocalizedSeo(value: Partial<BlogPost>["seo"], focusKeyword?: string) {
  const empty = emptyLocalizedSeo(focusKeyword);
  return {
    en: { ...empty.en, ...(value?.en || {}) },
    de: { ...empty.de, ...(value?.de || {}) },
    tr: { ...empty.tr, ...(value?.tr || {}) },
  };
}

function mergeLocalizedContent(value: Partial<BlogPost>["content"]) {
  return {
    en: sanitizeHtml(value?.en || ""),
    de: sanitizeHtml(value?.de || ""),
    tr: sanitizeHtml(value?.tr || ""),
  };
}

function mergeFaq(value: Partial<BlogPost>["faq"]) {
  return {
    en: Array.isArray(value?.en) ? value.en : [],
    de: Array.isArray(value?.de) ? value.de : [],
    tr: Array.isArray(value?.tr) ? value.tr : [],
  };
}

function normalizeVisual(visual: BlogVisual, index: number): BlogVisual {
  return {
    id: visual.id || `visual_${index + 1}`,
    fileName: uniqueBaseSlug(visual.fileName || `blog-visual-${index + 1}`) + (/\.(png|jpe?g|webp|svg)$/i.test(visual.fileName || "") ? "" : ".png"),
    url: visual.url,
    videoUrl: visual.videoUrl,
    alt: {
      en: visual.alt?.en || "",
      de: visual.alt?.de || "",
      tr: visual.alt?.tr || "",
    },
    caption: {
      en: visual.caption?.en || "",
      de: visual.caption?.de || "",
      tr: visual.caption?.tr || "",
    },
    prompt: visual.prompt || "",
    placement: visual.placement || "",
    status: visual.status || "placeholder",
  };
}

function defaultInternalLinks(): BlogInternalLink[] {
  return [
    { label: "SASMAZ Digital", url: "https://www.sasmaz.digital", language: "all", context: "Main portfolio and case-study context" },
    { label: "AdaptifAI", url: "https://adaptifai.sasmaz.digital", language: "all", context: "AI adaptation and product workflow context" },
    { label: "Wellpaid", url: "https://wellpaid.sasmaz.digital", language: "all", context: "Growth system/tool reference when relevant" },
  ];
}

function buildFallbackArticle(language: BlogLanguage, title: string) {
  const copy = {
    en: ["Context / Hook", "Problem", "Framework", "Real Example", "Data / KPI", "Actionable Steps"],
    de: ["Kontext / Einstieg", "Problem", "Framework", "Praxisbeispiel", "Daten / KPI", "Umsetzungsschritte"],
    tr: ["Baglam / Giris", "Problem", "Framework", "Gercek Ornek", "Veri / KPI", "Uygulanabilir Adimlar"],
  }[language];
  return `<h1>${title}</h1>${copy
    .map(
      (heading) =>
        `<h2>${heading}</h2><p>We implemented this draft as a structured starting point for admin review. The final article should deepen the operator logic with source-verified SASMAZ context, practical decision criteria, KPI governance, visual placements, and language-specific edits before publishing.</p>`,
    )
    .join("")}`;
}

function compact(values: Array<string | undefined>) {
  return values.filter((value): value is string => Boolean(value?.trim()));
}
