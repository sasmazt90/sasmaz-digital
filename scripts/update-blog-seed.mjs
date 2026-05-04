import fs from "fs";
import path from "path";

const root = process.cwd();
const imageDir = path.join(root, "client", "public", "images", "blog");
fs.mkdirSync(imageDir, { recursive: true });

const now = "2026-05-04T12:00:00.000Z";
const version = 4;

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
  const shortTitle = escapeXml(title.length > 54 ? `${title.slice(0, 51)}...` : title);
  const shortSubtitle = escapeXml(subtitle.length > 92 ? `${subtitle.slice(0, 89)}...` : subtitle);
  const play = video ? `<circle cx="600" cy="338" r="70" fill="#ffffff" opacity="0.95"/><path d="M580 295 L580 381 L650 338 Z" fill="${accent}"/>` : "";
  const common = `<defs><filter id="shadow"><feDropShadow dx="0" dy="18" stdDeviation="20" flood-color="#0f172a" flood-opacity="0.16"/></filter></defs><rect width="1200" height="675" rx="40" fill="#f7f0e8"/><circle cx="1040" cy="120" r="190" fill="${accent}" opacity="0.10"/><circle cx="120" cy="590" r="210" fill="#14b8a6" opacity="0.09"/>`;
  const hero = `${common}<g filter="url(#shadow)"><rect x="88" y="78" width="1024" height="520" rx="34" fill="#fffdf8"/><rect x="126" y="126" width="370" height="270" rx="22" fill="#efe4d7"/><rect x="164" y="170" width="96" height="68" rx="12" fill="#ffffff"/><rect x="282" y="170" width="136" height="68" rx="12" fill="#ffffff"/><rect x="164" y="262" width="254" height="76" rx="12" fill="#ffffff"/><path d="M556 410 C650 342 725 370 798 312 C868 257 935 278 1030 218" fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round"/><rect x="556" y="162" width="458" height="52" rx="26" fill="#eef4ff"/><text x="590" y="196" font-family="Inter, Arial" font-size="22" font-weight="800" fill="${accent}">strategy room operating model</text><text x="126" y="472" font-family="Inter, Arial" font-size="42" font-weight="900" fill="#0f172a">${shortTitle}</text><text x="126" y="518" font-family="Inter, Arial" font-size="22" fill="#5b667b">${shortSubtitle}</text></g>`;
  const framework = `${common}<g filter="url(#shadow)"><rect x="96" y="82" width="1008" height="510" rx="32" fill="#ffffff"/><text x="132" y="152" font-family="Inter, Arial" font-size="40" font-weight="900" fill="#0f172a">${shortTitle}</text><text x="132" y="190" font-family="Inter, Arial" font-size="21" fill="#5b667b">${shortSubtitle}</text>${["Signals","Guardrails","Decision","Action","Learning"].map((label, i) => { const x = 134 + i * 195; return `<rect x="${x}" y="292" width="156" height="116" rx="22" fill="${i === 2 ? accent : "#f8fbff"}" stroke="#dce7f9"/><text x="${x + 22}" y="356" font-family="Inter, Arial" font-size="22" font-weight="800" fill="${i === 2 ? "#ffffff" : "#0f172a"}">${label}</text>${i < 4 ? `<path d="M${x + 164} 350 L${x + 188} 350" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>` : ""}`; }).join("")}<text x="132" y="500" font-family="Inter, Arial" font-size="24" font-weight="800" fill="${accent}">simple decision logic, not a black-box dashboard</text></g>`;
  const kpi = `${common}<g filter="url(#shadow)"><rect x="92" y="78" width="1016" height="520" rx="34" fill="#ffffff"/><text x="132" y="150" font-family="Inter, Arial" font-size="40" font-weight="900" fill="#0f172a">${shortTitle}</text><text x="132" y="188" font-family="Inter, Arial" font-size="21" fill="#5b667b">${shortSubtitle}</text>${["+12pp","ROAS","AOV","Margin"].map((label, i) => { const x = 132 + i * 240; return `<rect x="${x}" y="260" width="200" height="150" rx="24" fill="#f8fbff" stroke="#dce7f9"/><text x="${x + 28}" y="326" font-family="Inter, Arial" font-size="38" font-weight="900" fill="${accent}">${label}</text><rect x="${x + 28}" y="360" width="${96 + i * 18}" height="12" rx="6" fill="${accent}" opacity="0.38"/><rect x="${x + 28}" y="386" width="${126 - i * 10}" height="12" rx="6" fill="#14b8a6" opacity="0.34"/>`; }).join("")}<path d="M145 500 L1050 500" stroke="#e2e8f0" stroke-width="4"/><path d="M145 500 C325 460 445 480 585 420 S850 360 1050 315" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round"/></g>`;
  const workflow = `${common}<g filter="url(#shadow)"><rect x="100" y="76" width="1000" height="520" rx="34" fill="#fffdf8"/><rect x="150" y="136" width="900" height="390" rx="20" fill="#ffffff" stroke="#e7d8c5"/><text x="180" y="190" font-family="Inter, Arial" font-size="40" font-weight="900" fill="#0f172a">${shortTitle}</text><text x="180" y="230" font-family="Inter, Arial" font-size="21" fill="#5b667b">${shortSubtitle}</text>${["brief","model","review","publish"].map((label, i) => `<rect x="${190 + i * 205}" y="${305 + (i % 2) * 34}" width="150" height="108" rx="16" fill="${["#fef3c7","#dbeafe","#dcfce7","#fce7f3"][i]}"/><text x="${220 + i * 205}" y="${365 + (i % 2) * 34}" font-family="Inter, Arial" font-size="24" font-weight="800" fill="#0f172a">${label}</text>`).join("")}</g>${play}`;
  const content = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">${kind === "hero" ? hero : kind === "framework" ? framework : kind === "kpi" ? kpi : workflow}</svg>`;
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
    visual(item, "hero", files.hero, "Hero", "Editorial strategy-room hero visual for the commercial operating context."),
    visual(item, "framework", files.framework, "Framework section", "Clean framework visual showing the decision layers and operating flow."),
    visual(item, "kpi", files.kpi, "Data / KPI section", "Minimal KPI card visual showing the measurable business signals."),
    ...(item.video ? [visual(item, "video", files.video, "Real example video", "Warm workflow-style video thumbnail with play overlay.", item.video)] : []),
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
    prompt: `Create a premium, modern, warm, business-realistic ${id} visual for ${item.title.en}. Use editorial strategy-room, simple framework, minimal KPI card, or whiteboard workflow style as appropriate. Avoid neon, holograms, dark futuristic dashboards, real brand logos, and stock-image clichés.`,
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

function sectionDetail(item, lang, section) {
  const buyBox = item.slug.canonical.includes("buy-box");
  const ctr = item.slug.canonical.includes("ctr");
  const ltv = item.slug.canonical.includes("ltv-cac");
  const perf = item.slug.canonical.includes("performance");
  const seo = item.slug.canonical.includes("seo-pdp");
  const commerce = item.slug.canonical.includes("e-commerce-growth");
  const topic = item.title[lang];
  if (lang === "de") {
    const specific = buyBox
      ? "In der Praxis bedeutet das: Buy Box Ownership darf nicht isoliert gegen Preis gewonnen werden. Preis, Verfuegbarkeit, Seller-Qualitaet, Fulfillment, Content, Promotion-Kalender und Deckungsbeitrag muessen gemeinsam bewertet werden."
      : ctr
        ? "Bei CTR geht es nicht nur um bessere Headlines. Entscheidend ist, ob Asset-Struktur, Lokalisierung, Hook, Format, Produktversprechen und Landing-Kontext zusammenpassen."
        : ltv
          ? "LTV/CAC wird erst operativ nutzbar, wenn CRM, Paid Media und Commercial Planning dieselben Kundenkohorten betrachten."
          : perf
            ? "Performance Marketing wird schwach, wenn Plattformsignale schneller optimieren als das Unternehmen lernen kann."
            : seo
              ? "SEO und PDP duerfen nicht getrennt geplant werden: Sichtbarkeit ohne Conversion ist nur teurer Traffic."
              : "Eine Growth Engine ist nur dann nuetzlich, wenn sie Entscheidungen schneller und besser wiederholbar macht.";
    const map = {
      context: `${specific} Der Artikel ist deshalb als Operating Blueprint aufgebaut: erst Business-Kontext, dann Fehlermuster, dann Systemarchitektur, danach Beispiel, KPI-Interpretation und konkrete Umsetzung.`,
      problem: "Das Kernproblem ist selten ein einzelner Kanal. Es ist fehlende Verbindung zwischen Signalen und Entscheidungen. Teams sehen viele Daten, aber die Regeln fehlen: Welche Abweichung ist relevant? Wer entscheidet? Welche Aktion folgt? Was wird nicht getan, um Marge, Channel-Konflikte oder falsche Lernsignale zu vermeiden?",
      framework: "Die wichtigste Designentscheidung ist die Trennung von Signal und Entscheidung. Ein Signal sagt, was passiert. Eine Decision Rule sagt, was wir tun. Jede Regel braucht Schwellenwert, Owner, Datenquelle, Frequenz, Eskalationslogik und eine klare Gegenmetrik. Ohne Gegenmetrik optimiert das System zu aggressiv.",
      example: `Fuer ${topic} wuerde ich das Setup als woechentlichen Growth Council betreiben: Commercial, Media, Marketplace, CRM und Analytics sehen dieselbe KPI-Map. AI wird dort eingesetzt, wo manuelle Pruefung langsam ist: Asset-Lokalisierung, Preisvalidierung, PDP-Checks, Segmentlogik oder Reporting-Kommentierung.`,
      kpi: "Die KPI-Frage ist nicht nur, ob ein Wert steigt. Wichtig ist, ob der Wert erklaerbar ist. Eine bessere CTR ist schwach, wenn CVR oder Marge fallen. Buy Box Share ist gefaehrlich, wenn er nur durch Verlustpreise entsteht. LTV/CAC ist wertlos, wenn Kohorten falsch definiert sind.",
      steps: "Der Startpunkt ist ein Minimum Viable Operating Model: eine KPI-Map, ein Entscheidungsboard, ein Backlog, eine woechentliche Review und drei Automationskandidaten. Erst danach lohnt sich ein komplexeres AI-System.",
    };
    return map[section];
  }
  if (lang === "tr") {
    const specific = buyBox
      ? "Pratikte bu su demek: Buy Box sadece fiyat kirarak kazanilamaz. Fiyat, stok, seller kalitesi, fulfillment, content, promosyon takvimi ve contribution margin birlikte degerlendirilmelidir."
      : ctr
        ? "CTR sadece daha iyi headline yazmak degildir. Asset yapisi, lokalizasyon, hook, format, product promise ve landing context birlikte calismalidir."
        : ltv
          ? "LTV/CAC ancak CRM, paid media ve commercial planning ayni kohort mantigina baktiginda operasyonel hale gelir."
          : perf
            ? "Performance marketing, platform sinyalleri sirketin ogrenme hizindan daha hizli optimize ettiginde zayiflar."
            : seo
              ? "SEO ve PDP ayri planlanamaz: conversion yaratmayan visibility sadece daha pahali trafiktir."
              : "Growth engine ancak karar kalitesini ve tekrar edilebilirligi artirdiginda degerlidir.";
    const map = {
      context: `${specific} Bu nedenle yazi bir operating blueprint gibi kurgulandi: once business context, sonra kirilma noktasi, sonra sistem mimarisi, gercek ornek, KPI yorumu ve uygulanabilir adimlar.`,
      problem: "Ana problem genellikle tek bir kanal degildir. Problem, sinyal ile karar arasindaki kopukluktur. Ekiplerin elinde cok veri vardir ama karar kurali yoktur: Hangi sapma onemli? Kim karar verir? Hangi aksiyon tetiklenir? Marj, kanal catismasi veya yanlis ogrenme sinyali yaratmamak icin ne yapilmaz?",
      framework: "En onemli tasarim karari sinyal ile karari ayirmaktir. Sinyal ne oldugunu soyler. Decision rule ne yapilacagini soyler. Her kuralin threshold'u, owner'i, data source'u, frekansi, escalation mantigi ve guardrail metrig'i olmalidir.",
      example: `${topic} icin setup'i haftalik Growth Council gibi calistirirdim: Commercial, Media, Marketplace, CRM ve Analytics ayni KPI map'e bakar. AI manuel kontrolun yavas oldugu yerlerde kullanilir: asset localization, pricing validation, PDP check, segment logic veya reporting commentary.`,
      kpi: "KPI sorusu sadece bir degerin artip artmadigi degildir. Degerin neden arttigi okunabilmelidir. CVR veya marj dusuyorsa CTR artisi zayiftir. Buy Box share sadece zararli fiyatla geliyorsa tehlikelidir. Kohort yanlissa LTV/CAC anlamsizdir.",
      steps: "Baslangic noktasi minimum viable operating model'dir: KPI map, karar board'u, backlog, haftalik review ve uc otomasyon adayi. Daha kompleks AI sistemi bundan sonra anlamli olur.",
    };
    return map[section];
  }
  const specific = buyBox
    ? "In practice, this means Buy Box ownership cannot be won through price cutting alone. Price, availability, seller quality, fulfillment, PDP content, promotion calendars and contribution margin have to be evaluated together."
    : ctr
      ? "For CTR, the work is not just writing better headlines. Asset structure, localization, hook, format, product promise and landing context have to work as one system."
      : ltv
        ? "LTV/CAC becomes operational only when CRM, paid media and commercial planning look at the same customer cohorts and the same payback logic."
        : perf
          ? "Performance marketing becomes fragile when platform optimization moves faster than the organization can learn from it."
          : seo
            ? "SEO and PDP planning should not be separated: visibility without conversion is just more expensive traffic."
            : "A growth engine is valuable only when it improves decision quality and makes execution repeatable.";
  const map = {
    context: `${specific} This is why the article is built as an operating blueprint: business context first, then failure modes, system architecture, real example, KPI interpretation and implementation steps.`,
    problem: "The core problem is rarely one channel. It is the missing connection between signals and decisions. Teams see a lot of data, but the rules are unclear: Which variance matters? Who decides? What action follows? What should not be done because it would damage margin, channel discipline or learning quality?",
    framework: "The most important design choice is separating signal from decision. A signal tells the team what is happening. A decision rule tells the team what to do. Every rule needs a threshold, owner, data source, review frequency, escalation logic and a guardrail metric. Without a guardrail, the system optimizes too aggressively.",
    example: `For ${topic}, I would run the setup as a weekly Growth Council. Commercial, media, marketplace, CRM and analytics look at the same KPI map. AI is used where manual review is slow: asset localization, pricing validation, PDP checks, segment logic or reporting commentary.`,
    kpi: "The KPI question is not only whether a number improved. The number has to be explainable. Higher CTR is weak if CVR or margin falls. Buy Box share is dangerous if it comes only from loss-making pricing. LTV/CAC is useless if cohorts are defined incorrectly.",
    steps: "The starting point is a minimum viable operating model: one KPI map, one decision board, one backlog, one weekly review and three automation candidates. More complex AI should come after that operating discipline exists.",
  };
  return map[section];
}

function content(item, lang, visuals) {
  const p = paragraphSet(item, lang);
  const framework = visuals.find((v) => v.id.startsWith("visual_framework_"));
  const kpi = visuals.find((v) => v.id.startsWith("visual_kpi_"));
  const video = visuals.find((v) => v.videoUrl);
  return `<h1>${item.title[lang]}</h1>
<h2>0. Context</h2><p>${p.hook}</p><p>${sectionDetail(item, lang, "context")}</p>
<h2>1. Problem</h2><p>${p.problem}</p><p>${sectionDetail(item, lang, "problem")}</p>
<h2>2. Framework</h2><p>${p.framework}</p><p>${sectionDetail(item, lang, "framework")}</p>${operatorDepth(item, lang)}
${figure(framework, lang)}
<h2>3. Real Example</h2><p>${p.example}</p><p>${sectionDetail(item, lang, "example")}</p>
${video ? videoFigure(video, lang) : ""}
<h2>4. Data / KPI</h2><p>${p.kpi}</p><p>${sectionDetail(item, lang, "kpi")}</p>
${figure(kpi, lang)}
<h2>5. Actionable Steps</h2><p>${sectionDetail(item, lang, "steps")}</p><ol>${p.steps.map((step) => `<li><strong>${step}</strong> ${actionDetail(item, lang, step)}</li>`).join("")}</ol>${implementationChecklist(item, lang)}`;
}

function actionDetail(item, lang) {
  if (lang === "de") return "Dokumentiere Datenquelle, Owner, Entscheidungskriterium und Gegenmetrik, damit das Team nicht nur misst, sondern handelt.";
  if (lang === "tr") return "Data source, owner, karar kriteri ve guardrail metric yazilmali; ekip sadece olcmemeli, aksiyona gecmeli.";
  return "Document the data source, owner, decision criterion and guardrail metric so the team does not only measure, but acts.";
}

function operatorDepth(item, lang) {
  if (lang === "de") {
    return `<h3>Decision Rules</h3><p>Eine Decision Rule sollte als Wenn-Dann-Logik dokumentiert werden. Beispiel: Wenn ein Wettbewerberpreis unter den erlaubten Preisboden faellt, wird nicht automatisch rabattiert. Zuerst werden Seller-Quelle, Bestand, Marge, Promo-Kalender und Channel-Konflikt geprueft. Erst danach entscheidet das Team zwischen Preisaktion, Enforcement, Content-Fix, Media-Pause oder CRM-Aktivierung.</p><h3>Governance Rhythm</h3><p>Der operative Rhythmus ist wichtiger als das Tool. Daily Monitoring erkennt Abweichungen, die woechentliche Growth-Runde entscheidet Prioritaeten, und ein monatlicher Business Review prueft, ob die Regeln noch stimmen. So wird das System nicht zu einem Reporting-Layer, sondern zu einer Entscheidungsmaschine.</p><h3>Trade-offs</h3><p>Jede Optimierung hat Kosten. Mehr Sichtbarkeit kann Marge kosten. Hoehere CTR kann schlechtere Conversion kaschieren. Mehr Automatisierung kann falsche Aktionen schneller skalieren. Deshalb braucht jede Wachstumsentscheidung mindestens eine Gegenmetrik und eine klare Stop-Regel.</p>`;
  }
  if (lang === "tr") {
    return `<h3>Decision Rules</h3><p>Decision rule mutlaka if-then mantigi ile yazilmalidir. Ornek: Rakip fiyat izin verilen fiyat tabaninin altina inerse otomatik indirim yapilmaz. Once seller kaynagi, stok, marj, promosyon takvimi ve kanal catismasi kontrol edilir. Sonra ekip fiyat aksiyonu, enforcement, content fix, media pause veya CRM activation arasinda karar verir.</p><h3>Governance Rhythm</h3><p>Operasyon ritmi tool'dan daha onemlidir. Daily monitoring sapmalari yakalar, haftalik Growth Council oncelikleri belirler, aylik business review ise kurallarin hala gecerli olup olmadigini test eder. Boylece sistem sadece reporting layer olmaz; karar ureten bir mekanizmaya donusur.</p><h3>Trade-offs</h3><p>Her optimizasyonun maliyeti vardir. Daha fazla visibility marji dusurebilir. Daha yuksek CTR dusuk conversion'i gizleyebilir. Daha fazla otomasyon yanlis aksiyonu daha hizli scale edebilir. Bu nedenle her buyume kararinin bir guardrail metrigi ve net stop rule'u olmalidir.</p>`;
  }
  return `<h3>Decision Rules</h3><p>A decision rule should be written as if-then logic. For example, if a competitor price drops below the allowed commercial floor, the system should not automatically discount. First it checks seller source, stock, margin, promotion calendar and channel conflict. Only then does the team choose between price action, enforcement, content fix, media pause or CRM activation.</p><h3>Governance Rhythm</h3><p>The operating rhythm matters more than the tool. Daily monitoring catches variance, the weekly Growth Council decides priorities, and a monthly business review checks whether the rules are still valid. This prevents the system from becoming another reporting layer and turns it into a decision engine.</p><h3>Trade-offs</h3><p>Every optimization has a cost. More visibility can damage margin. Higher CTR can hide weaker conversion. More automation can scale the wrong action faster. That is why every growth decision needs at least one guardrail metric and one clear stop rule.</p>`;
}

function implementationChecklist(item, lang) {
  if (lang === "de") {
    return `<h3>Implementation Checklist</h3><p>Die Umsetzung beginnt mit einem klaren Dateninventar. Welche Daten kommen aus Media-Plattformen, Marketplace-Systemen, PIM, CRM, Analytics, Finance und Retailer-Reports? Danach wird jede Datenquelle einer Entscheidung zugeordnet. Daten ohne Entscheidung werden nicht priorisiert, weil sie das System nur schwerer machen.</p><p>Als zweites wird ein Entscheidungsboard aufgebaut. Dieses Board sollte nicht zwanzig Metriken nebeneinander zeigen, sondern Ursache, Entscheidung und naechste Aktion verbinden. Eine gute Zeile lautet nicht nur "Buy Box Share ist gefallen", sondern "Buy Box Share ist gefallen, weil Seller X unter Preisboden liegt; Owner Commercial; Aktion: Enforcement pruefen; Guardrail: Contribution Margin".</p><p>Als drittes wird AI nur dort eingesetzt, wo das Team bereits eine wiederholbare Regel hat. Wenn die Regel unklar ist, automatisiert AI nur Unsicherheit. Wenn die Regel klar ist, kann AI Monitoring, Klassifikation, Lokalisierung, Priorisierung oder Reporting beschleunigen.</p>`;
  }
  if (lang === "tr") {
    return `<h3>Implementation Checklist</h3><p>Uygulama net bir data inventory ile baslar. Hangi veri media platformlarindan, marketplace sistemlerinden, PIM, CRM, analytics, finance ve retailer raporlarindan geliyor? Sonra her data source bir karara baglanir. Karara baglanmayan data onceliklendirilmez; cunku sistemi sadece agirlastirir.</p><p>Ikinci adim decision board kurmaktir. Bu board yirmi metrigi yan yana gostermemeli; neden, karar ve sonraki aksiyonu baglamalidir. Iyi bir satir sadece "Buy Box Share dustu" demez; "Buy Box Share dustu, cunku Seller X fiyat tabaninin altinda; owner Commercial; aksiyon enforcement kontrolu; guardrail contribution margin" der.</p><p>Ucuncu adim AI'i sadece tekrar edilebilir kural olan yerde kullanmaktir. Kural belirsizse AI sadece belirsizligi otomatiklestirir. Kural netse AI monitoring, classification, localization, prioritization veya reporting'i hizlandirir.</p>`;
  }
  return `<h3>Implementation Checklist</h3><p>Implementation starts with a clear data inventory. Which signals come from media platforms, marketplace systems, PIM, CRM, analytics, finance and retailer reports? Then each data source is mapped to a decision. Data that does not support a decision should not be prioritized because it only makes the system heavier.</p><p>The second step is a decision board. This board should not show twenty metrics next to each other. It should connect cause, decision and next action. A useful row does not say only "Buy Box share dropped." It says "Buy Box share dropped because Seller X is below the commercial floor; owner Commercial; action: check enforcement; guardrail: contribution margin."</p><p>The third step is using AI only where the team already has a repeatable rule. If the rule is unclear, AI only automates uncertainty. If the rule is clear, AI can accelerate monitoring, classification, localization, prioritization or reporting commentary.</p>`;
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
