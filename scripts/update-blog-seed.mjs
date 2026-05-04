import fs from "fs";
import path from "path";

const root = process.cwd();
const imageDir = path.join(root, "client", "public", "images", "blog");
fs.mkdirSync(imageDir, { recursive: true });

const now = "2026-05-04T12:00:00.000Z";
const version = 3;

const topics = [
  {
    id: "blog_ecommerce_growth_engine_20260504",
    topic: "E-commerce Growth Engine Nasil Kurulur?",
    title: {
      en: "How to Build an E-commerce Growth Engine",
      de: "Wie man eine E-Commerce Growth Engine aufbaut",
      tr: "E-commerce Growth Engine Nasıl Kurulur?",
    },
    slug: {
      canonical: "e-commerce-growth-engine-nasil-kurulur",
      en: "how-to-build-an-ecommerce-growth-engine",
      de: "ecommerce-growth-engine-aufbauen",
      tr: "ecommerce-growth-engine-nasil-kurulur",
    },
    keyword: "e-commerce growth engine",
    categories: ["E-commerce Growth", "Digital Growth Systems", "AI Marketing", "Performance Marketing"],
    metric: "+35% sell-out growth, +14pp contribution margin, +36% blended ROAS",
    system: "DACH e-commerce operating system connecting demand, marketplace execution, PDP quality, pricing, CRM and executive dashboards.",
    video: "https://youtu.be/RGmPXIKsp8k",
  },
  {
    id: "blog_ai_ctr_60_20260504",
    topic: "AI ile CTR %60 Nasil Artirilir?",
    title: {
      en: "How AI Can Increase CTR by 60%",
      de: "Wie KI die CTR um 60% steigern kann",
      tr: "AI ile CTR %60 Nasıl Artırılır?",
    },
    slug: {
      canonical: "ai-ile-ctr-60-nasil-artirilir",
      en: "how-ai-increases-ctr-by-60",
      de: "ki-ctr-60-steigern",
      tr: "ai-ile-ctr-60-nasil-artirilir",
    },
    keyword: "AI CTR optimization",
    categories: ["AI Marketing", "Performance Marketing", "Creative Automation"],
    metric: "+60% CTR and +25% CVR in TranslAsset AI context",
    system: "TranslAsset AI: OCR, LLM localization, creative adaptation and image reconstruction for faster market-ready assets.",
    video: "https://youtu.be/RGmPXIKsp8k",
  },
  {
    id: "blog_ltv_cac_framework_20260504",
    topic: "LTV / CAC Framework (Real System)",
    title: {
      en: "LTV / CAC Framework: A Real Operating System",
      de: "LTV / CAC Framework: Ein echtes Operating System",
      tr: "LTV / CAC Framework: Gerçek Sistem",
    },
    slug: {
      canonical: "ltv-cac-framework-real-system",
      en: "ltv-cac-framework-real-system",
      de: "ltv-cac-framework-operating-system",
      tr: "ltv-cac-framework-real-system",
    },
    keyword: "LTV CAC framework",
    categories: ["CRM & Lifecycle", "Digital Growth Systems", "Performance Marketing"],
    metric: "+69% LTV and ~60% LTV/CAC improvement where lifecycle economics were connected to acquisition rules",
    system: "CRM lifecycle model connecting segmentation, replenishment, onboarding, win-back and allowable CAC.",
  },
  {
    id: "blog_ai_performance_marketing_system_20260504",
    topic: "AI ile Performance Marketing Sistemi",
    title: {
      en: "Building an AI Performance Marketing System",
      de: "Ein KI-Performance-Marketing-System aufbauen",
      tr: "AI ile Performance Marketing Sistemi",
    },
    slug: {
      canonical: "ai-ile-performance-marketing-sistemi",
      en: "ai-performance-marketing-system",
      de: "ki-performance-marketing-system",
      tr: "ai-ile-performance-marketing-sistemi",
    },
    keyword: "AI performance marketing system",
    categories: ["Performance Marketing", "AI Marketing", "Digital Growth Systems"],
    metric: "+36% blended ROAS when media, creative, feed quality and commercial constraints were governed together",
    system: "Performance system connecting creative testing, platform signals, retail media, attribution, margin and executive decision cadence.",
    video: "https://youtu.be/AUyBGBKxwPM?si=A-UlUpqWSPrpykCb",
  },
  {
    id: "blog_amazon_buy_box_strategy_20260504",
    topic: "Amazon Buy Box Kazanma Stratejisi",
    title: {
      en: "Amazon Buy Box Winning Strategy",
      de: "Amazon Buy Box Winning Strategy",
      tr: "Amazon Buy Box Kazanma Stratejisi",
    },
    slug: {
      canonical: "amazon-buy-box-kazanma-stratejisi",
      en: "amazon-buy-box-winning-strategy",
      de: "amazon-buy-box-strategie",
      tr: "amazon-buy-box-kazanma-stratejisi",
    },
    keyword: "Amazon Buy Box strategy",
    categories: ["E-commerce Growth", "Marketplace", "Performance Marketing"],
    metric: "+12pp Buy Box share when pricing, availability, content and retail media actions were connected",
    system: "Marketplace command center combining competitor pricing, stock, retailer conditions, PDP quality and retail media activation.",
  },
  {
    id: "blog_seo_pdp_optimization_framework_20260504",
    topic: "SEO + PDP Optimization Framework",
    title: {
      en: "SEO + PDP Optimization Framework",
      de: "SEO + PDP Optimization Framework",
      tr: "SEO + PDP Optimization Framework",
    },
    slug: {
      canonical: "seo-pdp-optimization-framework",
      en: "seo-pdp-optimization-framework",
      de: "seo-pdp-optimization-framework",
      tr: "seo-pdp-optimization-framework",
    },
    keyword: "SEO PDP optimization",
    categories: ["E-commerce Growth", "SEO", "Digital Growth Systems"],
    metric: "+48% first-page visibility and +9pp add-to-cart rate when search intent and PDP conversion were handled together",
    system: "SEO and PDP backlog model connecting search demand, product naming, claims, content, visual hierarchy and conversion behavior.",
  },
];

function escapeXml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&apos;" })[char]);
}

function svg(fileName, title, subtitle, kind, accent = "#2563eb", video = false) {
  const cards = kind === "framework"
    ? ["Demand", "Decision", "Execution", "Learning"]
    : kind === "kpi"
      ? ["CTR", "CVR", "ROAS", "LTV"]
      : ["Source", "Model", "Workflow", "Output"];
  const play = video ? `<circle cx="600" cy="210" r="58" fill="white" opacity="0.94"/><path d="M585 178 L585 242 L635 210 Z" fill="${accent}"/>` : "";
  const content = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#06131a"/><stop offset="1" stop-color="#eff6ff"/></linearGradient>
    <linearGradient id="line" x1="0" x2="1"><stop stop-color="${accent}"/><stop offset="1" stop-color="#14b8a6"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="20" stdDeviation="22" flood-color="#0f172a" flood-opacity="0.22"/></filter>
  </defs>
  <rect width="1200" height="675" rx="42" fill="url(#bg)"/>
  <circle cx="1030" cy="95" r="170" fill="${accent}" opacity="0.14"/>
  <circle cx="150" cy="560" r="180" fill="#14b8a6" opacity="0.12"/>
  <g filter="url(#shadow)">
    <rect x="82" y="82" width="1036" height="511" rx="34" fill="white" opacity="0.94"/>
    <text x="126" y="154" font-family="Inter, Arial" font-size="42" font-weight="800" fill="#0f172a">${escapeXml(title)}</text>
    <text x="126" y="198" font-family="Inter, Arial" font-size="22" fill="#526179">${escapeXml(subtitle)}</text>
    <path d="M126 410 C250 310 340 360 430 300 S630 250 736 318 S918 402 1070 286" fill="none" stroke="url(#line)" stroke-width="12" stroke-linecap="round"/>
    ${cards.map((card, index) => {
      const x = 126 + index * 246;
      return `<rect x="${x}" y="455" width="202" height="88" rx="20" fill="#f8fbff" stroke="#dce7f9"/><text x="${x + 24}" y="508" font-family="Inter, Arial" font-size="24" font-weight="800" fill="#0f172a">${escapeXml(card)}</text>`;
    }).join("")}
    <rect x="126" y="235" width="260" height="122" rx="24" fill="#0f2530"/><text x="154" y="286" font-family="Inter, Arial" font-size="22" font-weight="800" fill="white">${kind.toUpperCase()}</text><text x="154" y="322" font-family="Inter, Arial" font-size="18" fill="#a9d4ff">SASMAZ operator system</text>
    <rect x="860" y="232" width="210" height="130" rx="24" fill="#eef4ff"/><text x="890" y="283" font-family="Inter, Arial" font-size="44" font-weight="900" fill="${accent}">AI</text><text x="890" y="322" font-family="Inter, Arial" font-size="18" fill="#526179">decision layer</text>
  </g>
  ${play}
</svg>`;
  fs.writeFileSync(path.join(imageDir, fileName), content, "utf8");
}

function visualSet(item, accent) {
  const base = item.slug.canonical;
  const files = {
    hero: `${base}-hero.svg`,
    framework: `${base}-framework.svg`,
    kpi: `${base}-kpi.svg`,
    video: `${base}-video.svg`,
  };
  svg(files.hero, item.title.en, item.metric, "hero", accent);
  svg(files.framework, `${item.title.en} Framework`, item.system, "framework", accent);
  svg(files.kpi, `${item.title.en} KPI Model`, item.metric, "kpi", accent);
  if (item.video) svg(files.video, `${item.title.en} Video`, "Related execution video from the SASMAZ portfolio", "workflow", accent, true);
  return [
    visual(item, "hero", files.hero, "Hero", "Hero visual showing the operating system context."),
    visual(item, "framework", files.framework, "Framework section", "Framework diagram placed after the operating model."),
    visual(item, "kpi", files.kpi, "Data / KPI section", "KPI dashboard visual placed after the data section."),
    ...(item.video ? [visual(item, "video", files.video, "Real example video", "Video thumbnail with play overlay.", item.video)] : []),
  ];
}

function visual(item, id, fileName, placement, caption, videoUrl) {
  return {
    id: `visual_${id}_${item.slug.canonical}`,
    fileName,
    url: `/images/blog/${fileName}`,
    ...(videoUrl ? { videoUrl } : {}),
    alt: {
      en: `${item.title.en} ${id} visual`,
      de: `${item.title.de} ${id} Visual`,
      tr: `${item.title.tr} ${id} görseli`,
    },
    caption: {
      en: caption,
      de: caption,
      tr: caption,
    },
    prompt: `Custom SASMAZ-style ${id} visual for ${item.title.en}. Data product aesthetic, dashboards, diagrams, no stock imagery.`,
    placement,
    status: "generated",
  };
}

function paragraphSet(item, lang) {
  const title = item.title[lang];
  if (lang === "de") {
    return {
      hook: `Dieser Artikel behandelt ${title} aus Operator-Perspektive: nicht als lose Taktik, sondern als System aus Daten, Entscheidungskriterien, Umsetzung und Governance. Der relevante Punkt ist nicht, ob ein Team KI, CRM, Media oder Marketplace nutzt. Entscheidend ist, ob diese Bausteine in einem gemeinsamen Rhythmus arbeiten.`,
      problem: `Das typische Problem entsteht, wenn Teams einzelne KPIs optimieren, ohne die kommerzielle Logik dahinter zu verbinden. Media optimiert ROAS, Content optimiert Sichtbarkeit, Marketplace optimiert Verfügbarkeit, CRM optimiert Retention und Finance schaut auf Marge. Ohne gemeinsame Regeln entstehen gute lokale Entscheidungen, aber ein schwaches Gesamtsystem.`,
      framework: `Das Framework besteht aus vier Ebenen: Signal Layer, Decision Layer, Execution Layer und Learning Layer. Der Signal Layer sammelt Nachfrage, Conversion, Marge, Bestand, Preis, Content-Qualität und Lifecycle-Signale. Der Decision Layer definiert Regeln: wann skalieren, stoppen, lokalisieren, re-priorisieren oder automatisieren. Der Execution Layer übersetzt Regeln in Media, PDP, CRM, Marketplace oder Workflow-Aktionen. Der Learning Layer prüft, welche Entscheidung wiederholbar ist.`,
      example: `In der SASMAZ-Arbeit taucht diese Logik in mehreren Systemen auf: TranslAsset AI für Creative Localization, Pricing Validation für Wettbewerbs- und PIM-Daten, PDP/SEO Frameworks, CRM Lifecycle Modelle, Tasky-AI-ähnliche Workflows und Executive Dashboards. Der Wert entsteht nicht durch ein Tool allein, sondern durch die Verbindung in einem Operating Cadence.`,
      kpi: `Der verifizierte KPI-Kontext ist ${item.metric}. Diese Werte werden nicht als universelles Versprechen verwendet. Sie zeigen, was möglich wird, wenn operative Engpässe, kommerzielle Prioritäten und Entscheidungsregeln verbunden werden.`,
      steps: ["Ein gemeinsames KPI-Tree definieren.", "Eigentümer pro Entscheidungsebene festlegen.", "Backlogs nach kommerziellem Hebel priorisieren.", "KI zuerst an wiederholbaren Engpässen einsetzen.", "Jede Woche Entscheidungen und nicht nur Reports reviewen."],
    };
  }
  if (lang === "tr") {
    return {
      hook: `Bu yazı ${title} konusunu taktik listesi olarak değil, gerçek bir operating system olarak ele alır. Kritik soru şudur: AI, CRM, media, marketplace veya SEO kullanıyor muyuz değil; bu parçalar aynı karar ritmi içinde çalışıyor mu?`,
      problem: `Klasik hata, her ekibin kendi KPI'ını optimize etmesi ama ticari mantığın ortaklaşmamasıdır. Media ROAS'a, content visibility'ye, marketplace stok ve fiyat sinyallerine, CRM retention'a, finance ise marja bakar. Ortak karar kuralları yoksa iyi lokal aksiyonlar zayıf toplam sonuç üretir.`,
      framework: `Framework dört katmandan oluşur: Signal Layer, Decision Layer, Execution Layer ve Learning Layer. Signal Layer talep, conversion, marj, stok, fiyat, content kalitesi ve lifecycle sinyallerini toplar. Decision Layer ne zaman scale, pause, localize, reprice, PDP rebuild veya CRM trigger yapılacağını tanımlar. Execution Layer bu kararları media, PDP, CRM, marketplace veya workflow aksiyonuna çevirir. Learning Layer ise hangi kararın tekrar edilebilir olduğunu ölçer.`,
      example: `SASMAZ deneyiminde bu mantık birden çok sistemde görülür: TranslAsset AI ile creative localization, pricing validation ile competitor benchmarking, SEO/PDP framework'leri, CRM lifecycle sistemleri, Tasky AI benzeri workflow routing ve executive dashboard'lar. Değer tek bir araçtan değil, bu araçların operating cadence içinde birleşmesinden gelir.`,
      kpi: `Bu konu için doğrulanmış KPI bağlamı: ${item.metric}. Bu metrikler evrensel vaat değildir. Operasyonel darboğazlar, ticari öncelikler ve karar kuralları bağlandığında oluşan hareketi gösterir.`,
      steps: ["Tek KPI tree kur.", "Her karar katmanı için owner belirle.", "Backlog'u ticari etkiye göre sırala.", "AI'i önce tekrarlayan darboğazlara uygula.", "Haftalık toplantıda rapor değil karar üret."],
    };
  }
  return {
    hook: `This article treats ${title} as an operating system, not a list of isolated tactics. The useful question is not whether a team uses AI, CRM, media, marketplace or SEO. The useful question is whether these parts work inside one decision rhythm.`,
    problem: `The common failure mode is local optimization without commercial connection. Media optimizes ROAS, content optimizes visibility, marketplace teams watch availability and pricing, CRM optimizes retention, and finance protects margin. Without shared decision rules, good local actions create a weak total system.`,
    framework: `The framework has four layers: Signal Layer, Decision Layer, Execution Layer and Learning Layer. The Signal Layer collects demand, conversion, margin, stock, price, content quality and lifecycle signals. The Decision Layer defines when to scale, pause, localize, reprice, rebuild PDPs or trigger CRM. The Execution Layer turns those rules into media, PDP, CRM, marketplace or workflow actions. The Learning Layer checks which decisions are repeatable.`,
    example: `In SASMAZ work, this logic appears across systems: TranslAsset AI for creative localization, pricing validation for competitor benchmarking, SEO/PDP frameworks, CRM lifecycle systems, Tasky AI-style workflow routing and executive dashboards. The value does not come from one tool. It comes from connecting tools inside an operating cadence.`,
    kpi: `The verified KPI context for this topic is ${item.metric}. These metrics are not used as universal promises. They show what becomes possible when operational bottlenecks, commercial priorities and decision rules are connected.`,
    steps: ["Build one KPI tree.", "Assign owners for each decision layer.", "Prioritize backlog items by commercial upside.", "Apply AI first to repeated bottlenecks.", "Review decisions weekly, not only reports."],
  };
}

function content(item, lang, visuals) {
  const p = paragraphSet(item, lang);
  const framework = visuals.find((v) => v.id.startsWith("visual_framework_"));
  const kpi = visuals.find((v) => v.id.startsWith("visual_kpi_"));
  const video = visuals.find((v) => v.videoUrl);
  return `<h1>${item.title[lang]}</h1>
<h2>0. Context / Hook</h2><p>${p.hook}</p>
<h2>1. Problem</h2><p>${p.problem}</p>
<h2>2. Framework</h2><p>${p.framework}</p>
${figure(framework, lang)}
<h2>3. Real Example</h2><p>${p.example}</p>
${video ? videoFigure(video, lang) : ""}
<h2>4. Data / KPI</h2><p>${p.kpi}</p>
${figure(kpi, lang)}
<h2>5. Actionable Steps</h2><ol>${p.steps.map((step) => `<li><strong>${step}</strong></li>`).join("")}</ol>`;
}

function figure(visual, lang) {
  if (!visual) return "";
  return `<figure data-visual-id="${visual.id}"><img src="${visual.url}" alt="${visual.alt[lang]}"><figcaption><strong>Figure:</strong> ${visual.caption[lang]}</figcaption></figure>`;
}

function videoFigure(visual, lang) {
  return `<figure data-visual-id="${visual.id}" data-video-url="${visual.videoUrl}"><img src="${visual.url}" alt="${visual.alt[lang]}"><figcaption><strong>Video:</strong> ${visual.caption[lang]}</figcaption></figure>`;
}

function faq(item, lang) {
  const q = {
    en: [
      ["Where should the team start?", "Start with the KPI tree and the weekly decision cadence before adding automation."],
      ["Which AI use case creates value first?", "Use AI on repeated bottlenecks: creative adaptation, pricing checks, PDP intelligence, CRM segmentation and reporting."],
    ],
    de: [
      ["Wo sollte das Team starten?", "Mit KPI-Tree und wöchentlicher Entscheidungsroutine, bevor Automatisierung ergänzt wird."],
      ["Welcher KI-Use-Case schafft zuerst Wert?", "KI zuerst auf wiederholbare Engpässe setzen: Creative Adaptation, Pricing Checks, PDP Intelligence, CRM-Segmentierung und Reporting."],
    ],
    tr: [
      ["Ekip nereden başlamalı?", "Otomasyondan önce KPI tree ve haftalık karar ritmi kurulmalı."],
      ["Hangi AI use case önce değer yaratır?", "AI önce tekrarlayan darboğazlarda kullanılmalı: creative adaptation, pricing check, PDP intelligence, CRM segmentation ve reporting."],
    ],
  };
  return q[lang].map(([question, answer]) => ({ question, answer }));
}

function links(item) {
  const all = [
    { label: "SASMAZ Digital", url: "https://www.sasmaz.digital", language: "all", context: "Main portfolio and case-study context" },
    { label: "TranslAsset AI", url: "https://www.sasmaz.digital/#products", language: "all", context: "AI localization and creative adaptation system" },
    { label: "Pricing Validation System", url: "https://www.sasmaz.digital/#products", language: "all", context: "Marketplace pricing and competitor benchmarking context" },
    { label: "Executive Dashboard & Forecasting", url: "https://www.sasmaz.digital/#products", language: "all", context: "Decision cockpit and forecasting context" },
  ];
  if (item.keyword.toLowerCase().includes("ctr") || item.keyword.toLowerCase().includes("performance")) {
    all.push({ label: "AdaptifAI", url: "https://adaptifai.sasmaz.digital", language: "all", context: "Relevant AI adaptation and marketing experimentation reference" });
  }
  return all;
}

const accents = ["#2563eb", "#14b8a6", "#7c3aed", "#0ea5e9", "#f59e0b", "#10b981"];
const posts = topics.map((item, index) => {
  const visuals = visualSet(item, accents[index % accents.length]);
  return {
    id: item.id,
    seededContentVersion: version,
    status: "published",
    createdAt: now,
    updatedAt: now,
    publishedAt: now,
    topic: item.topic,
    angle: item.system,
    targetKeyword: item.keyword,
    notes: "Seeded SASMAZ authority blog post with inline visuals, separate FAQ, verified KPI context and relevant internal links.",
    categories: item.categories,
    slug: item.slug,
    seo: {
      en: { title: item.title.en, metaDescription: `Operator framework for ${item.keyword}: ${item.system}`, keywords: item.categories, focusKeyword: item.keyword },
      de: { title: item.title.de, metaDescription: `Operator-Framework für ${item.keyword}: ${item.system}`, keywords: item.categories, focusKeyword: item.keyword },
      tr: { title: item.title.tr, metaDescription: `${item.keyword} için operator framework: ${item.system}`, keywords: item.categories, focusKeyword: item.keyword },
    },
    content: {
      en: content(item, "en", visuals),
      de: content(item, "de", visuals),
      tr: content(item, "tr", visuals),
    },
    faq: { en: faq(item, "en"), de: faq(item, "de"), tr: faq(item, "tr") },
    visuals,
    internalLinks: links(item),
    docReadyContent: `# ${item.topic}\n\nFull EN/DE/TR article, SEO metadata, inline visual placements, FAQ and Codex-ready implementation notes are stored in this blog post.`,
    validationWarnings: [],
  };
});

fs.writeFileSync(path.join(root, "data", "blog-posts.json"), `${JSON.stringify({ posts, seededInitialBlogPosts: true }, null, 2)}\n`, "utf8");
