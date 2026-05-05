from __future__ import annotations

import datetime
import html
import json
import re
import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PACKAGE = Path(r"C:\Users\PC\Downloads\11. How to Adapt Stakeholders to Digital Transformation Blog Package\paydas_dijital_donusum_adaptasyon_package")
ARTICLE = PACKAGE / "blog" / "paydaslari-dijital-donusum-surecine-nasil-adapte-edebilirsiniz"
IMG_OUT = ROOT / "client" / "public" / "images" / "blog"
DATA = ROOT / "data" / "blog-posts.json"
STATIC = ROOT / "client" / "public" / "data" / "blog-posts.json"
SITE_CONTENT = ROOT / "data" / "site-content.json"
NOW = datetime.datetime(2026, 5, 5, 18, 45, 0).isoformat() + ".000Z"

LANG_FILES = {
    "en": ARTICLE / "index.en.md",
    "de": ARTICLE / "index.de.md",
    "tr": ARTICLE / "index.tr.md",
}

SLUG = "how-to-adapt-stakeholders-to-digital-transformation"
SLUGS = {
    "canonical": SLUG,
    "en": SLUG,
    "de": "stakeholder-digitale-transformation-adaption",
    "tr": "paydaslari-dijital-donusum-surecine-nasil-adapte-edebilirsiniz",
}

VISUALS = {
    "stakeholder-adaptation-hero.png": {
        "id": f"visual_hero_{SLUG}",
        "visualType": "hero",
        "target": f"{SLUG}-hero.png",
        "source": PACKAGE / "images" / "How to Adapt Stakeholders to Digital Transformation - HERO.png",
        "placement": "Hero",
        "stylePreset": "editorial-lifestyle",
        "alt": {
            "en": "Editorial business workspace for stakeholder adoption in digital transformation",
            "de": "Editorial Business Workspace fuer Stakeholder-Adoption in der digitalen Transformation",
            "tr": "Dijital donusumde paydas adaptasyonu icin editorial business calisma ortami",
        },
        "caption": {
            "en": "Stakeholder adoption becomes practical when value, workflow and governance are designed as one operating rhythm.",
            "de": "Stakeholder-Adoption wird praktisch, wenn Wert, Workflow und Governance als ein gemeinsamer Betriebsrhythmus gestaltet werden.",
            "tr": "Paydas adaptasyonu; deger, is akisi ve yonetisim tek bir operasyon ritmi olarak tasarlandiginda pratik hale gelir.",
        },
    },
    "digital-transformation-adoption-framework.png": {
        "id": f"visual_framework_{SLUG}",
        "visualType": "framework",
        "target": f"{SLUG}-framework.png",
        "source": PACKAGE / "images" / "digital-transformation-adoption-framework.png",
        "placement": "Framework section",
        "stylePreset": "clean-framework",
        "alt": {
            "en": "Seven-layer stakeholder adoption framework covering value map, role journey, decision rights, enablement, data trust, feedback and reinforcement",
            "de": "Siebenstufiges Stakeholder-Adoptionsmodell mit Value Map, Rollenreise, Entscheidungsrechten, Enablement, Datentrust, Feedback und Verankerung",
            "tr": "Deger haritasi, rol yolculugu, karar haklari, enablement, veri guveni, geri bildirim ve pekistirme katmanlarindan olusan yedi katmanli paydas adaptasyon modeli",
        },
        "caption": {
            "en": "The Stakeholder Adoption Framework converts technology rollout into repeatable business behavior.",
            "de": "Das Stakeholder-Adoptionsmodell uebersetzt Technologie-Rollouts in wiederholbares Geschaeftsverhalten.",
            "tr": "Paydas Adaptasyon Modeli, teknoloji yayilimini tekrar edilebilir is davranisina donusturur.",
        },
    },
    "ai-transformation-workflow-architecture.png": {
        "id": f"visual_workflow_architecture_{SLUG}",
        "visualType": "workflow",
        "target": f"{SLUG}-workflow-architecture.png",
        "source": PACKAGE / "images" / "ai-transformation-workflow-architecture.png",
        "placement": "Real example section",
        "stylePreset": "sticky-note-workflow",
        "alt": {
            "en": "Workflow architecture for AI and digital transformation adoption connecting data sources, decision intelligence, workflow automation and stakeholder experience",
            "de": "Workflow-Architektur fuer AI- und digitale Transformation mit Datenquellen, Entscheidungsintelligenz, Automatisierung und Stakeholder Experience",
            "tr": "Veri kaynaklari, karar zekasi, is akisi otomasyonu ve paydas deneyimini baglayan yapay zeka ve dijital donusum is akisi mimarisi",
        },
        "caption": {
            "en": "Adoption becomes observable when data sources, decisions, workflows and feedback loops are connected.",
            "de": "Adoption wird sichtbar, wenn Datenquellen, Entscheidungen, Workflows und Feedback-Loops verbunden sind.",
            "tr": "Veri kaynaklari, kararlar, is akislari ve geri bildirim donguleri baglandiginda adaptasyon gorunur hale gelir.",
        },
    },
    "stakeholder-adoption-kpi-scorecard.png": {
        "id": f"visual_kpi_{SLUG}",
        "visualType": "kpi",
        "target": f"{SLUG}-kpi.png",
        "source": PACKAGE / "images" / "stakeholder-adoption-kpi-scorecard.png",
        "placement": "Data / KPI section",
        "stylePreset": "kpi-cards",
        "alt": {
            "en": "Digital transformation adoption scorecard connecting adoption KPIs with verified business impact metrics",
            "de": "Scorecard fuer digitale Transformation mit Adoptions-KPIs und validierten Business-Metriken",
            "tr": "Adaptasyon KPI'lari ile dogrulanmis is etkisi metriklerini baglayan dijital donusum skor karti",
        },
        "caption": {
            "en": "A useful adoption dashboard separates usage, decision quality and business impact instead of reporting only tool logins.",
            "de": "Ein gutes Adoptions-Dashboard trennt Nutzung, Entscheidungsqualitaet und Business Impact, statt nur Tool-Logins zu zaehlen.",
            "tr": "Iyi bir adaptasyon paneli yalnizca arac girislerini degil kullanimi, karar kalitesini ve is etkisini ayri ayri olcer.",
        },
    },
    "90-day-adoption-operating-model.png": {
        "id": f"visual_workflow_90day_{SLUG}",
        "visualType": "workflow",
        "target": f"{SLUG}-90-day-operating-model.png",
        "source": PACKAGE / "images" / "90-day-adoption-operating-model.png",
        "placement": "Actionable steps section",
        "stylePreset": "sticky-note-workflow",
        "alt": {
            "en": "Ninety day stakeholder adoption operating model with phases for mapping value, piloting one decision flow and scaling governance",
            "de": "90-Tage-Betriebsmodell fuer Stakeholder-Adoption mit Value Mapping, Pilotierung eines Entscheidungsflows und Skalierung der Governance",
            "tr": "Deger haritalama, tek karar akisinin pilotlanmasi ve yonetisimin olceklenmesi fazlarini gosteren 90 gunluk paydas adaptasyon modeli",
        },
        "caption": {
            "en": "A 90-day cadence keeps adoption concrete: map value, pilot one decision flow, then scale governance.",
            "de": "Ein 90-Tage-Rhythmus macht Adoption konkret: Wert und Reibung mappen, einen Entscheidungsflow pilotieren, Governance skalieren.",
            "tr": "90 gunluk ritim adaptasyonu somutlastirir: degeri haritala, tek karar akisini pilotla, yonetisimi olcekle.",
        },
    },
}


def esc(value: str) -> str:
    return html.escape(value.strip(), quote=True)


def inline_markdown(value: str) -> str:
    value = esc(value)
    return re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", value)


def parse_meta(lines: list[str]) -> dict[str, str]:
    meta = {}
    for line in lines:
      if not line.startswith("- "):
          continue
      key, sep, value = line[2:].partition(":")
      if sep:
          meta[key.strip().lower()] = value.strip()
    return meta


def figure_html(file_name: str, lang: str) -> str:
    visual = VISUALS[file_name]
    return (
        f'<figure data-visual-id="{visual["id"]}">'
        f'<img src="/images/blog/{visual["target"]}" alt="{esc(visual["alt"][lang])}">'
        f'<figcaption>{esc(visual["caption"][lang])}</figcaption>'
        "</figure>"
    )


def convert_table(rows: list[str]) -> str:
    parsed = [[inline_markdown(cell.strip()) for cell in row.strip("|").split("|")] for row in rows]
    header = parsed[0]
    body = parsed[2:]
    head_html = "".join(f"<th>{cell}</th>" for cell in header)
    body_html = "".join("<tr>" + "".join(f"<td>{cell}</td>" for cell in row) + "</tr>" for row in body)
    return f"<table><thead><tr>{head_html}</tr></thead><tbody>{body_html}</tbody></table>"


def convert_body(lines: list[str], lang: str) -> str:
    output: list[str] = []
    list_items: list[str] = []
    table_rows: list[str] = []

    def flush_list() -> None:
        nonlocal list_items
        if list_items:
            output.append("<ul>" + "".join(f"<li>{item}</li>" for item in list_items) + "</ul>")
            list_items = []

    def flush_table() -> None:
        nonlocal table_rows
        if table_rows:
            output.append(convert_table(table_rows))
            table_rows = []

    skip_next_caption = False
    skipped_hero = False
    for raw in lines:
        line = raw.strip()
        if not line:
            flush_list()
            flush_table()
            continue
        if line.startswith("<img "):
            flush_list()
            flush_table()
            match = re.search(r"/([^/]+\.png)", line)
            file_name = match.group(1) if match else ""
            if file_name == "stakeholder-adaptation-hero.png" and not skipped_hero:
                skipped_hero = True
                skip_next_caption = True
                continue
            if file_name in VISUALS:
                output.append(figure_html(file_name, lang))
                skip_next_caption = True
                continue
        if skip_next_caption and line.startswith("<p><strong>Figure:</strong>"):
            skip_next_caption = False
            continue
        skip_next_caption = False
        if line.startswith("|"):
            table_rows.append(line)
            continue
        flush_table()
        if line.startswith("## "):
            flush_list()
            output.append(f"<h2>{inline_markdown(line[3:])}</h2>")
        elif line.startswith("### "):
            flush_list()
            output.append(f"<h3>{inline_markdown(line[4:])}</h3>")
        elif line.startswith("- "):
            list_items.append(inline_markdown(line[2:]))
        elif line.startswith("# "):
            continue
        else:
            flush_list()
            output.append(f"<p>{inline_markdown(line)}</p>")
    flush_list()
    flush_table()
    return "\n".join(output)


def split_public_sections(text: str) -> tuple[list[str], list[dict[str, str]]]:
    lines = text.splitlines()
    body_start = next(i for i, line in enumerate(lines) if line.startswith("<img ") or line.startswith("## Executive") or line.startswith("## Y"))
    stop = next((i for i, line in enumerate(lines) if line == "## FAQ"), len(lines))
    faq_stop = next((i for i, line in enumerate(lines[stop + 1 :], start=stop + 1) if line.startswith("## Internal") or line.startswith("## Sources")), len(lines))
    faq_lines = lines[stop + 1 : faq_stop]
    faq: list[dict[str, str]] = []
    current_q = ""
    current_a: list[str] = []
    for line in faq_lines:
        clean = line.strip()
        if not clean:
            continue
        if clean.startswith("### "):
            if current_q:
                faq.append({"question": current_q, "answer": " ".join(current_a).strip()})
            current_q = clean[4:].strip()
            current_a = []
        else:
            current_a.append(re.sub(r"\*\*(.+?)\*\*", r"\1", clean))
    if current_q:
        faq.append({"question": current_q, "answer": " ".join(current_a).strip()})
    return lines[body_start:stop], faq


def read_language(lang: str) -> tuple[dict[str, str], str, list[dict[str, str]]]:
    text = LANG_FILES[lang].read_text(encoding="utf-8")
    lines = text.splitlines()
    meta = parse_meta(lines[:20])
    body_lines, faq = split_public_sections(text)
    return meta, convert_body(body_lines, lang), faq


def copy_visuals() -> list[dict]:
    IMG_OUT.mkdir(parents=True, exist_ok=True)
    visuals = []
    for visual in VISUALS.values():
        shutil.copyfile(visual["source"], IMG_OUT / visual["target"])
        visuals.append(
            {
                "id": visual["id"],
                "visualType": visual["visualType"],
                "fileName": visual["target"],
                "url": f'/images/blog/{visual["target"]}',
                "alt": visual["alt"],
                "caption": visual["caption"],
                "prompt": "Uploaded visual from stakeholder digital transformation package.",
                "placement": visual["placement"],
                "stylePreset": visual["stylePreset"],
                "status": "uploaded",
            }
        )
    thumb = {**visuals[0], "id": f"visual_thumbnail_{SLUG}", "visualType": "thumbnail", "fileName": f"{SLUG}-thumbnail.png", "url": f"/images/blog/{SLUG}-thumbnail.png", "placement": "Blog listing thumbnail"}
    shutil.copyfile(VISUALS["stakeholder-adaptation-hero.png"]["source"], IMG_OUT / thumb["fileName"])
    return [visuals[0], thumb, *visuals[1:]]


def update_blog_data() -> None:
    meta = {}
    content = {}
    faq = {}
    for lang in ["en", "de", "tr"]:
        meta[lang], content[lang], faq[lang] = read_language(lang)
    seo = {
        "en": {
            "title": meta["en"].get("seo title", "How to Adapt Stakeholders to Digital Transformation"),
            "metaDescription": meta["en"].get("meta description", ""),
            "keywords": [item.strip() for item in meta["en"].get("secondary keywords", "").split(",") if item.strip()],
            "focusKeyword": meta["en"].get("primary keyword", "stakeholder adoption digital transformation"),
        },
        "de": {
            "title": meta["de"].get("seo title", "Stakeholder in der digitalen Transformation erfolgreich mitnehmen"),
            "metaDescription": meta["de"].get("meta description", ""),
            "keywords": [item.strip() for item in meta["de"].get("sekundaere keywords", "").split(",") if item.strip()],
            "focusKeyword": meta["de"].get("primaeres keyword", "Stakeholder digitale Transformation"),
        },
        "tr": {
            "title": meta["tr"].get("seo title", "Paydaslari Dijital Donusum Surecine Nasil Adapte Edebilirsiniz?"),
            "metaDescription": meta["tr"].get("meta description", ""),
            "keywords": [item.strip() for item in meta["tr"].get("ikincil anahtar kelimeler", "").split(",") if item.strip()],
            "focusKeyword": meta["tr"].get("anahtar kelime", "dijital donusum paydas adaptasyonu"),
        },
    }
    collection = json.loads(DATA.read_text(encoding="utf-8"))
    existing = {post["slug"]["canonical"]: post for post in collection["posts"]}
    post = {
        "id": existing.get(SLUG, {}).get("id", "blog_stakeholder_digital_transformation_20260505"),
        "seededContentVersion": 1,
        "status": "published",
        "createdAt": existing.get(SLUG, {}).get("createdAt", NOW),
        "updatedAt": NOW,
        "publishedAt": existing.get(SLUG, {}).get("publishedAt", NOW),
        "topic": "How to Adapt Stakeholders to Digital Transformation",
        "angle": "Imported from stakeholder digital transformation blog package.",
        "targetKeyword": seo["en"]["focusKeyword"],
        "notes": "Imported from uploaded blog package. Raw implementation notes and source notes are not public article content.",
        "categories": ["Digital Growth Systems", "Workflow Automation", "AI Marketing"],
        "slug": SLUGS,
        "seo": seo,
        "content": content,
        "faq": faq,
        "visuals": copy_visuals(),
        "internalLinks": [
            {"label": "AI Workflow Automation", "url": "/blog/ai-workflow-automation-operating-system/en", "language": "all", "context": "Related operating model"},
            {"label": "Digital Growth Operating System", "url": "/blog/digital-growth-operating-system/en", "language": "all", "context": "Related growth system"},
            {"label": "CRM + Performance Integration", "url": "/blog/crm-performance-integration/en", "language": "all", "context": "Related stakeholder and lifecycle system"},
            {"label": "AdaptifAI", "url": "https://adaptifai.sasmaz.digital", "language": "all", "context": "AI workflow and assistant positioning"},
        ],
        "docReadyContent": "\n\n".join(re.sub("<[^<]+?>", "", content[lang]) for lang in ["en", "de", "tr"]),
        "validationWarnings": [],
    }
    if SLUG in existing:
        collection["posts"][collection["posts"].index(existing[SLUG])] = post
    else:
        collection["posts"].insert(0, post)

    # Prefer uploaded raster visuals for older package imports where SVG placeholders were still referenced.
    for item in collection["posts"]:
        slug = item["slug"]["canonical"]
        for visual in item.get("visuals", []):
            kind = "kpi" if visual.get("visualType") == "kpi" else visual.get("visualType")
            if kind in {"hero", "thumbnail", "framework", "kpi"}:
                candidate = IMG_OUT / f"{slug}-{kind}.png"
                if candidate.exists():
                    visual["fileName"] = candidate.name
                    visual["url"] = f"/images/blog/{candidate.name}"
                    visual["status"] = "uploaded"
            if not isinstance(visual.get("caption"), dict):
                visual["caption"] = {"en": "", "de": "", "tr": ""}
            for lang in ["en", "de", "tr"]:
                visual["caption"].setdefault(lang, "")
        for lang in ["en", "de", "tr"]:
            item["content"][lang] = re.sub(r"<strong>Figure:</strong>\s*", "", item["content"][lang])

    DATA.write_text(json.dumps(collection, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    STATIC.parent.mkdir(parents=True, exist_ok=True)
    STATIC.write_text(json.dumps(collection, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def update_site_content() -> None:
    data = json.loads(SITE_CONTENT.read_text(encoding="utf-8"))
    products = data.get("aiProducts", [])
    if any(product.get("title") == "Recycle Lens" for product in products):
        return
    insert_after = next((index for index, product in enumerate(products) if product.get("title") == "AI Verdict"), 2)
    products.insert(
        insert_after + 1,
        {
            "title": "Recycle Lens",
            "category": "AI-Powered Recycling Assistant",
            "image": "/assets/apps/images/recycle-lens.png",
            "imageFit": "cover",
            "imagePosition": "center center",
            "video": "https://youtube.com/shorts/_Fm3j-4yzkA?feature=share",
            "videoType": "youtube",
            "url": "https://apps.apple.com/us/app/recycle-lens/id6765975426",
            "summary": "AI-powered mobile application that identifies waste items from photos and determines the correct disposal category based on material and condition.",
            "outcome": "Delivers location-aware recycling guidance, surfaces official municipality sources when available, and helps users find nearby drop-off points via map-based navigation. Designed to reduce sorting errors by combining computer vision, rule-based decisioning, and real-world recycling system constraints.",
            "tags": ["Computer Vision", "Mobile App", "Sustainability", "Location Intelligence", "Decision Engine", "Rule-based AI", "Image Recognition"],
            "confidential": False,
        },
    )
    SITE_CONTENT.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    update_blog_data()
    update_site_content()
    print(f"processed {SLUG}")


if __name__ == "__main__":
    main()
