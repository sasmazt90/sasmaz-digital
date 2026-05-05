from pathlib import Path
import datetime
import html
import json
import re
import shutil

ROOT = Path(__file__).resolve().parents[1]
TEXT = ROOT / "tmp" / "blog-package-text"
PACK = ROOT / "tmp" / "blog-packages"
IMG_OUT = ROOT / "client" / "public" / "images" / "blog"
DATA = ROOT / "data" / "blog-posts.json"
STATIC = ROOT / "client" / "public" / "data" / "blog-posts.json"
NOW = datetime.datetime(2026, 5, 5, 8, 0, 0).isoformat() + ".000Z"


def esc(value: str) -> str:
    return html.escape(value.strip(), quote=True)


def strip_prefix(value: str) -> str:
    return re.sub(r"^(SEO Title|Meta Description|URL Slug|Primary Keyword|Secondary Keywords|H1):\s*", "", value).strip()


def figure_html(slug: str, kind: str, alt: str, caption: str) -> str:
    visual_type = "kpi" if kind == "kpi" else kind
    return (
        f'<figure data-visual-id="visual_{visual_type}_{slug}">'
        f'<img src="/images/blog/{slug}-{kind}.png" alt="{esc(alt)}">'
        f"<figcaption><strong>Figure:</strong> {esc(caption)}</figcaption>"
        "</figure>"
    )


def is_major_heading(line: str) -> bool:
    low = line.lower()
    return bool(re.match(r"^[0-5]\.\s+", line)) or low.startswith(
        (
            "context / hook",
            "context",
            "kontext",
            "problem:",
            "framework:",
            "real life example",
            "real example",
            "data / kpi",
            "actionable steps",
            "soft cta",
        )
    )


def section_for(line: str) -> str | None:
    low = line.lower()
    if low.startswith("0.") or low.startswith("context") or low.startswith("kontext"):
        return "context"
    if "problem" in low:
        return "problem"
    if "framework" in low or "modell" in low or "modeli" in low:
        return "framework"
    if low.startswith("3.") or low.startswith("real") or low.startswith("praxis"):
        return "real"
    if low.startswith("4.") or "data / kpi" in low:
        return "kpi"
    if low.startswith("5.") or low.startswith("actionable"):
        return "steps"
    return None


def is_minor_heading(line: str) -> bool:
    return bool(re.match(r"^(Step|Layer|Ebene|Adim|Adım|Example|System)\s+\d+\b", line)) or line in {
        "Governance and Operating Cadence",
        "The decision formulas behind the system",
        "Die Entscheidungsformeln hinter dem System",
        "Executive layer",
        "Operating layer",
        "Diagnostic layer",
        "Implementation cadence",
        "The operating formula is:",
        "A practical priority score can be expressed as:",
        "Use this scoring model:",
    }


def content_lines(defn: dict, lang: str) -> list[str]:
    start, end = defn["content_ranges"][lang]
    result = []
    for line in defn["lines"][start:end]:
        clean = line.strip()
        if clean == "FAQ":
            break
        if clean.lower().startswith(("internal linking", "visual package", "codex-ready", "suggested folder")):
            break
        result.append(line)
    return result


def faq_items(defn: dict, lang: str) -> list[dict]:
    start, end = defn["faq_ranges"][lang]
    lines = [line.strip() for line in defn["lines"][start:end] if line.strip() and line.strip() != "FAQ"]
    items = []
    for index in range(0, len(lines) - 1, 2):
        question = lines[index]
        answer = lines[index + 1]
        if question.lower().startswith(("internal linking", "soft cta", "visual package", "implementation")):
            break
        items.append({"question": question, "answer": answer})
    return items


def convert_to_html(defn: dict, lang: str) -> str:
    slug = defn["slug"]["canonical"]
    output = []
    section = None
    framework_done = False
    kpi_done = False
    for raw in content_lines(defn, lang):
        line = raw.strip()
        if not line or line.startswith(("H1:", "SEO Metadata", "SEO-Metadaten", "[Visual placement:")):
            continue
        if line.startswith(("Figure:", "Abbildung:", "Görsel:", "Sekil:", "Şekil:")):
            if section == "framework" and not framework_done:
                output.append(figure_html(slug, "framework", defn["alts"]["framework"][lang], defn["captions"]["framework"][lang]))
                framework_done = True
            elif section == "kpi" and not kpi_done:
                output.append(figure_html(slug, "kpi", defn["alts"]["kpi"][lang], defn["captions"]["kpi"][lang]))
                kpi_done = True
            continue
        if is_major_heading(line):
            section = section_for(line) or section
            title = re.sub(r"^[0-5]\.\s*", "", line)
            output.append(f"<h2>{esc(title)}</h2>")
            if section == "framework" and not framework_done and slug in {"crm-performance-integration", "ai-workflow-automation-operating-system"}:
                output.append(figure_html(slug, "framework", defn["alts"]["framework"][lang], defn["captions"]["framework"][lang]))
                framework_done = True
            if section == "kpi" and not kpi_done and slug in {"crm-performance-integration", "ai-workflow-automation-operating-system"}:
                output.append(figure_html(slug, "kpi", defn["alts"]["kpi"][lang], defn["captions"]["kpi"][lang]))
                kpi_done = True
            continue
        if is_minor_heading(line):
            output.append(f"<h3>{esc(line)}</h3>")
            continue
        if re.match(r"^\d+\.\s+", line) and section in {"steps", "framework"}:
            output.append(f"<p><strong>{esc(line)}</strong></p>")
            continue
        output.append(f"<p>{esc(line)}</p>")

    if not framework_done:
        for index, chunk in enumerate(output):
            if chunk.startswith("<h2>") and ("Framework" in chunk or "Modell" in chunk or "model" in chunk.lower()):
                output.insert(index + 2, figure_html(slug, "framework", defn["alts"]["framework"][lang], defn["captions"]["framework"][lang]))
                break
    if not kpi_done:
        for index, chunk in enumerate(output):
            if chunk.startswith("<h2>") and ("KPI" in chunk or "Data" in chunk or "Daten" in chunk):
                output.insert(index + 1, figure_html(slug, "kpi", defn["alts"]["kpi"][lang], defn["captions"]["kpi"][lang]))
                break
    return "\n".join(output)


def make_visuals(defn: dict) -> list[dict]:
    slug = defn["slug"]["canonical"]
    visuals = []
    for kind in ["hero", "thumbnail", "framework", "kpi"]:
        filename = f"{slug}-{kind}.png"
        src = defn["images"][kind]
        if not src.exists():
            raise FileNotFoundError(src)
        shutil.copyfile(src, IMG_OUT / filename)
        visuals.append(
            {
                "id": f"visual_{kind}_{slug}",
                "visualType": kind,
                "fileName": filename,
                "url": f"/images/blog/{filename}",
                "alt": defn["alts"][kind],
                "caption": defn["captions"][kind],
                "prompt": f'Uploaded {kind} visual from {defn["source"]}.',
                "placement": {
                    "hero": "Hero",
                    "thumbnail": "Blog listing thumbnail",
                    "framework": "Framework section",
                    "kpi": "Data / KPI section",
                }[kind],
                "stylePreset": {
                    "hero": "editorial-lifestyle",
                    "thumbnail": "editorial-lifestyle",
                    "framework": "clean-framework",
                    "kpi": "kpi-cards",
                }[kind],
                "status": "uploaded",
            }
        )
    return visuals


def base_links(slug: str) -> list[dict]:
    links = [
        ("Digital Growth Operating System", "/blog/digital-growth-operating-system/en", "Related growth operating model"),
        ("CRM + Performance Integration", "/blog/crm-performance-integration/en", "Related lifecycle and performance system"),
        ("AI Workflow Automation", "/blog/ai-workflow-automation-operating-system/en", "Related automation operating model"),
        ("AI Creative Production System", "/blog/ai-creative-production-system/en", "Related AI creative operations system"),
        ("LTV / CAC Framework", "/blog/ltv-cac-framework-real-system/en", "Related customer economics article"),
        ("SASMAZ Digital", "/", "Portfolio home"),
        ("AdaptifAI", "https://adaptifai.sasmaz.digital", "Relevant AI systems property"),
    ]
    return [
        {"label": label, "url": url, "language": "all", "context": context}
        for label, url, context in links
        if f"/blog/{slug}/" not in url
    ]


def read_lines(name: str) -> list[str]:
    return (TEXT / name).read_text(encoding="utf-8").splitlines()


creative_lines = read_lines("ai_creative_production_system_full_package.txt")
digital_lines = read_lines("digital-growth-operating-system-blog-content.txt")
crm_lines = read_lines("crm-and-performance-integration.txt")
workflow_lines = read_lines("AI_Workflow_Automation.txt")

definitions = [
    {
        "source": "7. AI Creative Production System Blog Package.rar",
        "slug": {"canonical": "ai-creative-production-system", "en": "ai-creative-production-system", "de": "ki-creative-production-system", "tr": "ai-creative-production-sistemi"},
        "topic": "AI Creative Production System",
        "categories": ["AI Marketing", "Performance Marketing", "Digital Growth Systems"],
        "targetKeyword": "AI creative production system",
        "seo": {
            "en": {"title": strip_prefix(creative_lines[7]), "metaDescription": strip_prefix(creative_lines[8]), "keywords": ["AI creative production system", "AI content production", "AI ad creative workflow", "creative operations", "AI localization"], "focusKeyword": "AI creative production system"},
            "de": {"title": strip_prefix(creative_lines[105]), "metaDescription": strip_prefix(creative_lines[106]), "keywords": ["KI Creative Production System", "KI Content Production", "KI Creative Workflow", "Creative Operations"], "focusKeyword": "KI Creative Production System"},
            "tr": {"title": strip_prefix(creative_lines[203]), "metaDescription": strip_prefix(creative_lines[204]), "keywords": ["AI creative production sistemi", "AI content production", "AI creative workflow", "creative operations"], "focusKeyword": "AI creative production sistemi"},
        },
        "content_ranges": {"en": (14, 59), "de": (112, 157), "tr": (210, 255)},
        "faq_ranges": {"en": (59, 72), "de": (157, 170), "tr": (255, 268)},
        "lines": creative_lines,
        "captions": {
            "hero": {"en": "Hero visual for the AI Creative Production System article.", "de": "Hero-Visual fuer den Artikel zum KI Creative Production System.", "tr": "AI Creative Production Sistemi makalesi icin hero gorsel."},
            "thumbnail": {"en": "Hero visual for the AI Creative Production System article.", "de": "Hero-Visual fuer den Artikel zum KI Creative Production System.", "tr": "AI Creative Production Sistemi makalesi icin hero gorsel."},
            "framework": {"en": "Framework diagram showing the six operating steps of the AI Creative Production System.", "de": "Framework-Diagramm mit den sechs operativen Schritten des KI Creative Production System.", "tr": "AI Creative Production Sistemi'nin alti operasyon adimini gosteren framework diyagrami."},
            "kpi": {"en": "KPI visual summarizing operational and commercial results of the system.", "de": "KPI-Visual mit operativen und kommerziellen Ergebnissen des Systems.", "tr": "Sistemin operasyonel ve ticari sonuclarini ozetleyen KPI gorseli."},
        },
        "alts": {
            "hero": {"en": "Editorial-style creative workspace representing an AI creative production system", "de": "Editorial Creative Workspace fuer ein KI Creative Production System", "tr": "AI creative production sistemini temsil eden editorial tarzda yaratici calisma alani"},
            "thumbnail": {"en": "Editorial-style creative workspace representing an AI creative production system", "de": "Editorial Creative Workspace fuer ein KI Creative Production System", "tr": "AI creative production sistemini temsil eden editorial tarzda yaratici calisma alani"},
            "framework": {"en": "Six-step AI Creative Production Framework diagram", "de": "Sechsstufiges KI Creative Production Framework Diagramm", "tr": "AI Creative Production Frameworkun alti adimli diyagrami"},
            "kpi": {"en": "Performance dashboard for the AI Creative Production System", "de": "Performance Dashboard fuer das KI Creative Production System", "tr": "AI Creative Production Sistemi icin performans KPI gorseli"},
        },
        "images": {
            "hero": PACK / "7. AI Creative Production System Blog Package/ai-creative-production-system/images/ai-creative-production-system-hero.png",
            "thumbnail": PACK / "7. AI Creative Production System Blog Package/ai-creative-production-system/images/ai-creative-production-system-hero.png",
            "framework": PACK / "7. AI Creative Production System Blog Package/ai-creative-production-system/images/ai-creative-production-framework.png",
            "kpi": PACK / "7. AI Creative Production System Blog Package/ai-creative-production-system/images/ai-creative-production-kpi-results.png",
        },
    },
    {
        "source": "8. Digital Growth Operating System Blog Package.rar",
        "slug": {"canonical": "digital-growth-operating-system", "en": "digital-growth-operating-system", "de": "digital-growth-operating-system-de", "tr": "digital-growth-operating-system-tr"},
        "topic": "Digital Growth Operating System",
        "categories": ["Digital Growth Systems", "AI Marketing", "E-commerce Growth"],
        "targetKeyword": "Digital Growth Operating System",
        "seo": {
            "en": {"title": "Digital Growth Operating System: How to Scale Profitable Growth with AI, CRM and E-Commerce Execution", "metaDescription": "A practical framework for building a Digital Growth Operating System that connects performance marketing, e-commerce, CRM, AI automation and contribution-margin based decision-making.", "keywords": ["Digital Growth Operating System", "AI growth system", "performance marketing framework", "e-commerce growth"], "focusKeyword": "Digital Growth Operating System"},
            "de": {"title": "Digital Growth Operating System: Profitables Wachstum mit AI, CRM und E-Commerce skalieren", "metaDescription": "Ein praxisnahes Framework fuer ein Digital Growth Operating System, das Performance Marketing, E-Commerce, CRM, AI-Automation und Deckungsbeitrag-orientierte Entscheidungen verbindet.", "keywords": ["Digital Growth Operating System", "AI Growth System", "Performance Marketing Framework"], "focusKeyword": "Digital Growth Operating System"},
            "tr": {"title": "Digital Growth Operating System: AI, CRM ve E-Ticaret ile Karli Buyume Nasil Olceklenir?", "metaDescription": "Performance marketing, e-ticaret, CRM, AI otomasyon ve katki marji odakli karar mekanizmasini birlestiren Digital Growth Operating System frameworku.", "keywords": ["Digital Growth Operating System", "AI growth sistemi", "performance marketing framework"], "focusKeyword": "Digital Growth Operating System"},
        },
        "content_ranges": {"en": (14, 99), "de": (101, 186), "tr": (188, 273)},
        "faq_ranges": {"en": (84, 97), "de": (171, 184), "tr": (258, 271)},
        "lines": digital_lines,
        "captions": {
            "hero": {"en": "A unified growth decision environment where strategy, analytics and execution are connected.", "de": "Eine gemeinsame Growth-Entscheidungsumgebung, in der Strategie, Analytics und Umsetzung verbunden sind.", "tr": "Strateji, analytics ve executionin baglandigi ortak bir growth karar ortami."},
            "thumbnail": {"en": "A unified growth decision environment where strategy, analytics and execution are connected.", "de": "Eine gemeinsame Growth-Entscheidungsumgebung, in der Strategie, Analytics und Umsetzung verbunden sind.", "tr": "Strateji, analytics ve executionin baglandigi ortak bir growth karar ortami."},
            "framework": {"en": "The operating system connects strategy, market insight, acquisition, conversion, retention and analytics into one growth loop.", "de": "Das Operating System verbindet Strategie, Marktintelligenz, Akquisition, Conversion, Retention und Analytics in einem Growth Loop.", "tr": "Operating system strateji, market insight, acquisition, conversion, retention ve analytics katmanlarini tek growth loopta birlestirir."},
            "kpi": {"en": "The KPI layer combines commercial impact, e-commerce performance, customer value, operational efficiency and creative effectiveness.", "de": "Die KPI-Ebene verbindet kommerziellen Impact, E-Commerce Performance, Customer Value, operative Effizienz und Creative Effectiveness.", "tr": "KPI katmani commercial impact, e-commerce performance, customer value, operational efficiency ve creative effectivenessi birlikte gosterir."},
        },
        "alts": {
            "hero": {"en": "Digital Growth Operating System dashboard in a modern workspace", "de": "Digital Growth Operating System Dashboard in einem modernen Workspace", "tr": "Modern bir calisma alaninda Digital Growth Operating System dashboardu"},
            "thumbnail": {"en": "Digital Growth Operating System dashboard in a modern workspace", "de": "Digital Growth Operating System Dashboard in einem modernen Workspace", "tr": "Modern bir calisma alaninda Digital Growth Operating System dashboardu"},
            "framework": {"en": "Six-stage Digital Growth Operating System framework with strategy, audience, acquisition, conversion, retention and analytics layers", "de": "Sechsstufiges Digital Growth Operating System Framework mit Strategie, Audience, Acquisition, Conversion, Retention und Analytics", "tr": "Strategy, audience, acquisition, conversion, retention ve analytics katmanlarini iceren alti asamali Digital Growth Operating System frameworku"},
            "kpi": {"en": "Digital Growth Operating System KPI overview with sell-out, margin, ROAS, AOV, Buy Box, CTR, CVR, LTV and OPEX results", "de": "Digital Growth Operating System KPI-Uebersicht mit Sell-out, Marge, ROAS, AOV, Buy Box, CTR, CVR, LTV und OPEX Ergebnissen", "tr": "Sell-out, margin, ROAS, AOV, Buy Box, CTR, CVR, LTV ve OPEX sonuclarini gosteren Digital Growth Operating System KPI ozeti"},
        },
        "images": {
            "hero": PACK / "8. Digital Growth Operating System Blog Package/digital-growth-operating-system/images/Digital Growth Operating System - HERO.png",
            "thumbnail": PACK / "8. Digital Growth Operating System Blog Package/digital-growth-operating-system/images/Digital Growth Operating System - HERO.png",
            "framework": PACK / "8. Digital Growth Operating System Blog Package/digital-growth-operating-system/images/Digital Growth Operating System - FRAMEWORK.png",
            "kpi": PACK / "8. Digital Growth Operating System Blog Package/digital-growth-operating-system/images/Digital Growth Operating System - KPI.png",
        },
    },
    {
        "source": "9. CRM Performance Entegrasyonu Blog Package.rar",
        "slug": {"canonical": "crm-performance-integration", "en": "crm-performance-integration", "de": "crm-performance-integration", "tr": "crm-performance-entegrasyonu"},
        "topic": "CRM + Performance Integration",
        "categories": ["CRM & Lifecycle", "Performance Marketing", "Digital Growth Systems"],
        "targetKeyword": "CRM performance integration",
        "seo": {
            "en": {"title": "CRM + Performance Integration: Build a Lifecycle Growth System", "metaDescription": "A practical CRM + performance marketing integration framework for turning paid media, lifecycle automation, segmentation and KPI governance into measurable growth.", "keywords": ["CRM performance integration", "lifecycle marketing", "performance marketing", "CLV", "LTV/CAC"], "focusKeyword": "CRM performance integration"},
            "de": {"title": "CRM + Performance Integration: Lifecycle-Wachstum messbar steuern", "metaDescription": "Ein praxisnahes Framework fuer CRM- und Performance-Integration: Segmentierung, Paid Media, Lifecycle Automation und KPI-Governance als ein Growth-System.", "keywords": ["CRM Performance Integration", "Lifecycle Marketing", "Performance Marketing DACH"], "focusKeyword": "CRM Performance Integration"},
            "tr": {"title": "CRM + Performance Entegrasyonu: Olculebilir Buyume Sistemi", "metaDescription": "CRM ve performans pazarlamayi tek sistemde birlestiren framework: segmentasyon, lifecycle otomasyon, paid media aktivasyonu ve KPI governance.", "keywords": ["CRM performans entegrasyonu", "lifecycle marketing", "performans pazarlama"], "focusKeyword": "CRM performans entegrasyonu"},
        },
        "content_ranges": {"en": (36, 140), "de": (141, 245), "tr": (246, 350)},
        "faq_ranges": {"en": (121, 132), "de": (226, 237), "tr": (331, 342)},
        "lines": crm_lines,
        "captions": {
            "hero": {"en": "CRM + performance integration starts when acquisition, lifecycle and revenue dashboards are reviewed as one operating system.", "de": "CRM + Performance Integration beginnt, wenn Acquisition, Lifecycle und Revenue Dashboards als ein Operating System gelesen werden.", "tr": "CRM + performance entegrasyonu acquisition, lifecycle ve revenue dashboardlari tek operating system olarak incelendiginde baslar."},
            "thumbnail": {"en": "CRM + performance integration starts when acquisition, lifecycle and revenue dashboards are reviewed as one operating system.", "de": "CRM + Performance Integration beginnt, wenn Acquisition, Lifecycle und Revenue Dashboards als ein Operating System gelesen werden.", "tr": "CRM + performance entegrasyonu acquisition, lifecycle ve revenue dashboardlari tek operating system olarak incelendiginde baslar."},
            "framework": {"en": "The six-layer operating model connects CRM data, paid media execution and lifecycle measurement.", "de": "Das sechsstufige Operating Model verbindet CRM-Daten, Paid-Media-Execution und Lifecycle Measurement.", "tr": "Alti katmanli operating model CRM datasini, paid media executioni ve lifecycle measurementi baglar."},
            "kpi": {"en": "A CRM + performance KPI board should connect retention, conversion, AOV, CLV, ROAS, CPA and attributed revenue.", "de": "Ein CRM + Performance KPI Board verbindet Retention, Conversion, Warenkorbwert, Customer Value, ROAS, CPA und attributierten Umsatz.", "tr": "CRM + performance KPI board retention, conversion, AOV, CLV, ROAS, CPA ve attributed revenue metriklerini baglamalidir."},
        },
        "alts": {
            "hero": {"en": "Growth operator reviewing CRM and performance dashboards on a laptop", "de": "Growth Operator prueft CRM- und Performance-Dashboards auf einem Laptop", "tr": "Laptop uzerinde CRM ve performance dashboardlarini inceleyen growth operator"},
            "thumbnail": {"en": "Growth operator reviewing CRM and performance dashboards on a laptop", "de": "Growth Operator prueft CRM- und Performance-Dashboards auf einem Laptop", "tr": "Laptop uzerinde CRM ve performance dashboardlarini inceleyen growth operator"},
            "framework": {"en": "CRM and performance integration framework with six operating layers", "de": "CRM und Performance Integration Framework mit sechs Operating Layers", "tr": "Alti operating layer iceren CRM ve performance entegrasyonu frameworku"},
            "kpi": {"en": "CRM and performance integration KPI dashboard with retention, conversion, AOV, CLV, ROAS and CPA results", "de": "CRM und Performance Integration KPI Dashboard mit Retention, Conversion, AOV, CLV, ROAS und CPA Ergebnissen", "tr": "Retention, conversion, AOV, CLV, ROAS ve CPA sonuclarini gosteren CRM ve performance entegrasyonu KPI dashboardu"},
        },
        "images": {
            "hero": PACK / "9. CRM Performance Entegrasyonu Blog Package/crm-and-performance-integration/images/CRM + Performance Entegrasyonu - HERO.png",
            "thumbnail": PACK / "9. CRM Performance Entegrasyonu Blog Package/crm-and-performance-integration/images/CRM + Performance Entegrasyonu - HERO.png",
            "framework": PACK / "9. CRM Performance Entegrasyonu Blog Package/crm-and-performance-integration/images/CRM + Performance Entegrasyonu - FRAMEWORK.png",
            "kpi": PACK / "9. CRM Performance Entegrasyonu Blog Package/crm-and-performance-integration/images/CRM + Performance Entegrasyonu - KPI.png",
        },
    },
    {
        "source": "10. AI ile Workflow Automation.rar",
        "slug": {"canonical": "ai-workflow-automation-operating-system", "en": "ai-workflow-automation-operating-system", "de": "ki-workflow-automatisierung-betriebssystem", "tr": "ai-ile-workflow-automation-operasyon-sistemi"},
        "topic": "AI Workflow Automation",
        "categories": ["Workflow Automation", "AI Marketing", "Digital Growth Systems"],
        "targetKeyword": "AI workflow automation",
        "seo": {
            "en": {"title": "AI Workflow Automation: Turning AI Pilots into Measurable Operating Systems", "metaDescription": "A practical AI workflow automation framework for growth, CRM, e-commerce and commercial teams, based on real execution systems and KPIs from AI localization, pricing intelligence, Power Automate workflows and marketplace automation.", "keywords": ["AI workflow automation", "AI automation framework", "marketing workflow automation", "e-commerce automation"], "focusKeyword": "AI workflow automation"},
            "de": {"title": "KI-Workflow-Automatisierung: Vom AI-Pilot zum messbaren Betriebssystem", "metaDescription": "Ein praxisnahes Framework fuer KI-Workflow-Automatisierung in Marketing, CRM, E-Commerce und Commercial Operations, basierend auf realen Systemen und KPIs aus AI-Lokalisierung, Pricing Intelligence, Power-Automate-Workflows und Marketplace-Automation.", "keywords": ["KI-Workflow-Automatisierung", "AI Workflow Automation", "KI-Automation Framework"], "focusKeyword": "KI-Workflow-Automatisierung"},
            "tr": {"title": "AI ile Workflow Automation: AI Pilotlarini Olculebilir Operasyon Sistemlerine Donusturmek", "metaDescription": "Marketing, CRM, e-commerce ve commercial ekipler icin pratik AI workflow automation frameworku. AI lokalizasyon, pricing intelligence, Power Automate workflowlari ve marketplace automation projelerinden real KPIlarla anlatildi.", "keywords": ["AI ile workflow automation", "AI workflow automation", "is akisi otomasyonu"], "focusKeyword": "AI ile workflow automation"},
        },
        "content_ranges": {"en": (58, 313), "de": (144, 226), "tr": (230, 313)},
        "faq_ranges": {"en": (120, 133), "de": (206, 219), "tr": (292, 305)},
        "lines": workflow_lines,
        "captions": {
            "hero": {"en": "AI workflow automation becomes valuable when process design, AI logic, approvals and measurement operate as one system.", "de": "KI-Workflow-Automatisierung wird wertvoll, wenn Prozessdesign, KI-Logik, Freigaben und Messung als ein System arbeiten.", "tr": "AI workflow automation; process design, AI logic, onaylar ve olcumleme tek sistem olarak calistiginda deger yaratir."},
            "thumbnail": {"en": "AI workflow automation becomes valuable when process design, AI logic, approvals and measurement operate as one system.", "de": "KI-Workflow-Automatisierung wird wertvoll, wenn Prozessdesign, KI-Logik, Freigaben und Messung als ein System arbeiten.", "tr": "AI workflow automation; process design, AI logic, onaylar ve olcumleme tek sistem olarak calistiginda deger yaratir."},
            "framework": {"en": "The six-step AI Workflow Automation Framework used to move from isolated automation ideas to scalable operating systems.", "de": "Das sechsstufige Framework uebersetzt isolierte Automatisierungsideen in skalierbare Operating Systems.", "tr": "Alti adimli AI Workflow Automation Framework, izole automation fikirlerini scalable operating systemlara donusturmek icin kullanilir."},
            "kpi": {"en": "A KPI dashboard turns automation from a technology initiative into a measurable business system.", "de": "Ein KPI Dashboard macht aus Automatisierung keine Technologieinitiative, sondern ein messbares Business System.", "tr": "KPI dashboard automationi teknoloji girisiminden olculebilir business systema donusturur."},
        },
        "alts": {
            "hero": {"en": "AI workflow automation hero visual showing a digital operator working with an automated process on a laptop", "de": "Hero-Visual zur KI-Workflow-Automatisierung mit einer digitalen Operatorin an einem Laptop und automatisiertem Prozess", "tr": "Laptop uzerinde otomatik is akisiyla calisan dijital operatoru gosteren AI workflow automation hero gorseli"},
            "thumbnail": {"en": "AI workflow automation hero visual showing a digital operator working with an automated process on a laptop", "de": "Hero-Visual zur KI-Workflow-Automatisierung mit einer digitalen Operatorin an einem Laptop und automatisiertem Prozess", "tr": "Laptop uzerinde otomatik is akisiyla calisan dijital operatoru gosteren AI workflow automation hero gorseli"},
            "framework": {"en": "Six-step AI workflow automation framework from use-case prioritization to impact measurement and scale", "de": "Sechsstufiges Framework zur KI-Workflow-Automatisierung von Use-Case-Priorisierung bis Wirkungsmessung und Skalierung", "tr": "Use case onceliklendirmeden etki olcumu ve olceklemeye uzanan alti adimli AI workflow automation framework gorseli"},
            "kpi": {"en": "AI workflow automation KPI dashboard showing time saved, process efficiency, automation rate, error reduction, cost savings and productivity uplift", "de": "KPI-Dashboard zur KI-Workflow-Automatisierung mit Zeitersparnis, Prozesseffizienz, Automatisierungsrate, Fehlerreduktion, Kosteneinsparung und Produktivitaetssteigerung", "tr": "Zaman tasarrufu, surec verimliligi, otomasyon orani, hata azalmasi, maliyet tasarrufu ve uretkenlik artisini gosteren AI workflow automation KPI dashboardu"},
        },
        "images": {
            "hero": PACK / "10. AI ile Workflow Automation/ai-workflow-automation/images/10. AI ile Workflow Automation - HERO.png",
            "thumbnail": PACK / "10. AI ile Workflow Automation/ai-workflow-automation/images/10. AI ile Workflow Automation - HERO.png",
            "framework": PACK / "10. AI ile Workflow Automation/ai-workflow-automation/images/AI ile Workflow Automation- FRAMEWORK.png",
            "kpi": PACK / "10. AI ile Workflow Automation/ai-workflow-automation/images/AI ile Workflow Automation- KPI.png",
        },
    },
]


def main() -> None:
    IMG_OUT.mkdir(parents=True, exist_ok=True)
    collection = json.loads(DATA.read_text(encoding="utf-8"))
    existing = {post["slug"]["canonical"]: post for post in collection["posts"]}
    processed = []
    for defn in definitions:
        slug = defn["slug"]["canonical"]
        content = {lang: convert_to_html(defn, lang) for lang in ["en", "de", "tr"]}
        post = {
            "id": existing.get(slug, {}).get("id", f'blog_{slug.replace("-", "_")}_20260505'),
            "seededContentVersion": 1,
            "status": "published",
            "createdAt": existing.get(slug, {}).get("createdAt", NOW),
            "updatedAt": NOW,
            "publishedAt": existing.get(slug, {}).get("publishedAt", NOW),
            "topic": defn["topic"],
            "angle": f'Imported from {defn["source"]}',
            "targetKeyword": defn["targetKeyword"],
            "notes": "Imported from uploaded blog package. Raw implementation prompts and package notes are not public article content.",
            "categories": defn["categories"],
            "slug": defn["slug"],
            "seo": defn["seo"],
            "content": content,
            "faq": {lang: faq_items(defn, lang) for lang in ["en", "de", "tr"]},
            "visuals": make_visuals(defn),
            "internalLinks": base_links(slug),
            "docReadyContent": "\n\n".join(re.sub("<[^<]+?>", "", content[lang]) for lang in ["en", "de", "tr"]),
            "validationWarnings": [],
        }
        if slug in existing:
            collection["posts"][collection["posts"].index(existing[slug])] = post
        else:
            collection["posts"].append(post)
        processed.append(slug)
    DATA.write_text(json.dumps(collection, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    STATIC.parent.mkdir(parents=True, exist_ok=True)
    STATIC.write_text(json.dumps(collection, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("processed", ", ".join(processed))


if __name__ == "__main__":
    main()
