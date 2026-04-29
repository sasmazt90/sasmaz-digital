import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.resolve(__dirname, "..", "data", "portfolio.json");
const siteContentPath = path.resolve(__dirname, "..", "data", "site-content.json");
const adminPassword = process.env.ADMIN_PASSWORD ?? "7@yEwapu";

const readPortfolio = () => JSON.parse(fs.readFileSync(dataPath, "utf8"));
const writePortfolio = (payload: unknown) => {
  fs.mkdirSync(path.dirname(dataPath), { recursive: true });
  fs.writeFileSync(dataPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
};

const readSiteContent = () => JSON.parse(fs.readFileSync(siteContentPath, "utf8"));
const writeSiteContent = (payload: unknown) => {
  fs.mkdirSync(path.dirname(siteContentPath), { recursive: true });
  fs.writeFileSync(siteContentPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
};

const app = express();

const requireAdmin = (req: any, res: any, next: any) => {
  if (!adminPassword) {
    next();
    return;
  }

  if (req.header("x-admin-password") !== adminPassword) {
    res.status(401).json({ error: "Unauthorized. Provide a valid admin password." });
    return;
  }

  next();
};

app.use(express.json({ limit: "5mb" }));

app.get("/healthz", (_req: any, res: any) => {
  res.json({ ok: true });
});

app.post("/api/admin/auth", (req: any, res: any) => {
  const providedPassword =
    typeof req.body?.password === "string" ? req.body.password : req.header("x-admin-password");

  if (providedPassword !== adminPassword) {
    res.status(401).json({ error: "Unauthorized. Provide a valid admin password." });
    return;
  }

  res.json({ ok: true });
});

app.get("/api/portfolio", (_req: any, res: any) => {
  try {
    res.json(readPortfolio());
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to read portfolio data.",
    });
  }
});

app.put("/api/portfolio", requireAdmin, (req: any, res: any) => {
  try {
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      res.status(400).json({ error: "Portfolio payload must be a JSON object." });
      return;
    }

    writePortfolio(req.body);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to save portfolio data.",
    });
  }
});

app.get("/api/site-content", (_req: any, res: any) => {
  try {
    res.json(readSiteContent());
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to read site content.",
    });
  }
});

app.put("/api/site-content", requireAdmin, (req: any, res: any) => {
  try {
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      res.status(400).json({ error: "Site content payload must be a JSON object." });
      return;
    }

    writeSiteContent(req.body);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to save site content.",
    });
  }
});

export default app;
