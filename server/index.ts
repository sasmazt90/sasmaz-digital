import express, { type NextFunction, type Request, type Response } from "express";
import { createServer } from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);
  const dataPath = path.resolve(__dirname, "..", "data", "portfolio.json");
  const siteContentPath = path.resolve(__dirname, "..", "data", "site-content.json");
  const adminPassword = process.env.ADMIN_PASSWORD ?? "7@yEwapu";

  const productionStaticPath = path.resolve(__dirname, "public");
  const developmentStaticPath = path.resolve(__dirname, "..", "dist", "public");
  const staticPath = fs.existsSync(productionStaticPath) ? productionStaticPath : developmentStaticPath;

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

  const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
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
  app.use(express.static(staticPath));

  app.get("/healthz", (_req, res) => {
    res.json({ ok: true });
  });

  app.post("/api/admin/auth", (req, res) => {
    const providedPassword =
      typeof req.body?.password === "string" ? req.body.password : req.header("x-admin-password");

    if (providedPassword !== adminPassword) {
      res.status(401).json({ error: "Unauthorized. Provide a valid admin password." });
      return;
    }

    res.json({ ok: true });
  });

  app.get("/api/portfolio", (_req, res) => {
    try {
      res.json(readPortfolio());
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Failed to read portfolio data.",
      });
    }
  });

  app.put("/api/portfolio", requireAdmin, (req, res) => {
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

  app.get("/api/site-content", (_req, res) => {
    try {
      res.json(readSiteContent());
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Failed to read site content.",
      });
    }
  });

  app.put("/api/site-content", requireAdmin, (req, res) => {
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

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
