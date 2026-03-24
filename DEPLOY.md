# Deploy Guide

## Runtime model

This project is a Vite frontend plus a small Express server.

Production app needs:

- `dist/`
- `data/`
- Node.js 22+
- writable filesystem access for `data/portfolio.json` and `data/site-content.json`

Important:

- `/admin` writes directly into the local `data/` folder.
- Because of that, this app is **not a good fit for fully stateless/serverless hosting**.
- Deploy it on infrastructure where the app has persistent disk storage.

## Environment variables

Use the values in `.env.example` as a starting point.

- `PORT`
- `ADMIN_PASSWORD`

`ADMIN_PASSWORD` is optional, but strongly recommended in production.

## Option 1: Plain Node deploy

1. Install dependencies with `pnpm install --frozen-lockfile`
2. Build with `pnpm build`
3. Start with `pnpm start`

Health check endpoint:

- `GET /healthz`

## Option 2: Docker deploy

Build:

```bash
docker build -t tolgar-sasmaz-portfolio .
```

Run:

```bash
docker run -p 3000:3000 -e ADMIN_PASSWORD=your-password tolgar-sasmaz-portfolio
```

If you want edits from `/admin` to survive container replacement, mount `data/` to persistent storage.

Example:

```bash
docker run -p 3000:3000 -e ADMIN_PASSWORD=your-password -v $(pwd)/data:/app/data tolgar-sasmaz-portfolio
```

## Deploy checklist

- Set a strong `ADMIN_PASSWORD`
- Persist the `data/` folder
- Confirm `/healthz` returns `{ "ok": true }`
- Confirm `/admin` can save edits after deploy

## Railway

This project is a good fit for Railway because Railway supports Docker-based services and persistent volumes.

Recommended Railway setup:

1. Create a new Railway project from this repo.
2. Create one service from the repo root.
3. Railway will detect the root `Dockerfile`.
4. Add a volume and mount it to:

```text
/app/data
```

5. Add environment variables:

```text
PORT=3000
ADMIN_PASSWORD=your-strong-password
```

6. Redeploy the service.
7. After deploy, verify:
   - `/healthz`
   - `/admin`
   - editing content persists after a redeploy

Notes:

- `railway.toml` configures Dockerfile build usage, healthcheck path and restart policy.
- If you skip the volume, `/admin` edits may be lost on redeploy or replacement.
- Railway injects `PORT`, but keeping it explicitly set to `3000` is fine and makes setup easier to reason about.
