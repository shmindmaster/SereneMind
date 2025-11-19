# Copilot Instructions – SereneMind

## Repo Role

SereneMind is an **AI-assisted mental health & wellness companion** implemented as a **Next.js app router project** with **static export**.

- Primary goal: demo high-quality mental health UX and AI-assisted content flows for individuals and small practices.
- This repo is **frontend-first**; deeper clinical data, billing, and integrations live in backend/infra not present here.

## Tech Stack (Ground Truth)

- **Framework**: Next.js 13.5 (App Router) with static export (`output: 'export'`).
- **Language**: TypeScript.
- **UI**: shadcn/ui (Radix primitives), Tailwind CSS.
- **Icons / Charts**: lucide-react, Recharts.

The mental health + Azure AI narrative in `README.md` is the **target architecture**; not all backend pieces are implemented inside this repo.

## Local Development

From `SereneMind/`:

```bash
pnpm install
pnpm dev      # next dev
pnpm build    # next build (static export)
pnpm start    # next start (for non-exported modes)
```

The default dev URL is `http://localhost:3000`.

## Static Export & Deployment

`next.config.js` is configured with `output: 'export'`, so the preferred flow is:

```bash
pnpm build   # runs next build + export
```

Then deploy the generated static output (usually in `out/`) to **Azure Static Web Apps**:

- App location: `/`.
- Output location: `out`.
- Custom domain: `serenemind.shtrial.com` via `rg-shared-dns`.

## AI & Azure Integration

The README describes Azure OpenAI, Azure AI Search, and Postgres with pgvector as the **intended architecture**.

When you add or extend AI-backed features in this repo:

- Keep all calls to Azure OpenAI and Azure Search on the **server side** (Next.js `app/api` routes or external backend).
- Use shared resources in `rg-shared-ai`:
  - `shared-openai-eastus2` for chat/assistants.
  - `shared-search-eastus2` for RAG/search.
- Use deployment-agnostic env vars as described in README (`AZURE_OPENAI_ENDPOINT`, `AZURE_SEARCH_ENDPOINT`, etc.).
- Never commit secrets – use Key Vault and GitHub secrets.

If you need full clinical workflows, implement them in a dedicated backend (outside this repo) and expose clean APIs that this app can call.

## Coding Patterns

- Use the **App Router** conventions:
  - `app/page.tsx` and nested routes for sections.
  - Components in `components/*`.
  - Shared utilities in `lib/*`.
- Prefer server components for layout and data-fetching where applicable; use client components for interactive elements.
- Keep Tailwind usage consistent with the existing design system and mental-health-specific guidelines (calm palette, high contrast, no noisy animations).

## UX & Accessibility

Given the mental health domain, UX must be conservative and safe:

- Avoid jolting animations; favor subtle transitions only.
- Maintain high contrast and readable typography.
- Ensure keyboard navigation and screen reader support.
- Avoid dark patterns; make destructive actions explicit and reversible.

## What Copilot Should Not Do

- Do not convert this app to a different framework (no CRA, no pure Vite, no Nest).
- Do not directly call OpenAI public APIs; always use Azure OpenAI.
- Do not invent unimplemented backend features in docs or code; if something is aspirational, keep it clearly marked as roadmap.
- Do not introduce new cloud providers into the core path.
