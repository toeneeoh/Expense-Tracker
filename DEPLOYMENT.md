# Zero-cost deployment

The public demo uses Cloudflare Workers Static Assets for the Expo web export and a free Render web service for Flask. The backend database is intentionally disposable: if Render sleeps or redeploys, the browser automatically receives a new fictional session.

## 1. Publish the repository

Commit the portfolio baseline and push it to GitHub. Keep `main` as the production-demo branch; use `develop` and feature branches for unfinished product work.

## 2. Deploy the API on Render

1. Create a Render account and choose **New → Blueprint**.
2. Connect `toeneeoh/Expense-Tracker` and select the repository-root `render.yaml`.
3. Set `FRONTEND_ORIGINS` temporarily to `http://localhost:8081`; update it after Cloudflare assigns the production URL.
4. Deploy and copy the resulting URL, such as `https://budget-buddy-api.onrender.com`.
5. Verify `https://YOUR-RENDER-URL/api/health` returns `{"status":"ok"...}`.

Do not add `OPENAI_API_KEY` to the free public demo. Deterministic insights remain available without cost or quota risk.

## 3. Deploy the frontend on Cloudflare Workers Static Assets

1. In Cloudflare, choose **Workers & Pages → Create → Import a repository**.
2. Select the GitHub repository and configure Workers Builds:
   - Production branch: `main`
   - Root directory: leave blank (repository root)
   - Build command: `npm ci && npm run build:web`
   - Deploy command: `npm run deploy:web`
   - Non-production branch deploy command: `npm run preview:web`
   - API token: create a new token named `budget-buddy-builds`
   - Build variables: `EXPO_PUBLIC_API_URL=https://YOUR-RENDER-URL` and `NODE_VERSION=22`
3. Deploy and copy the assigned `https://YOUR-PROJECT.workers.dev` URL.
4. In Render, change `FRONTEND_ORIGINS` to that exact Workers URL and redeploy.

Cloudflare automatically creates a `*.workers.dev` production URL and preview versions for non-production branches. Preview deployments remain read-only unless their origin is explicitly added to Render; this keeps production CORS narrow.

## 4. Smoke test

- Open the Workers URL in a private browser window.
- Confirm the overview appears immediately even while Render wakes.
- Wait for “Interactive demo connected.”
- Add and delete an expense, change the savings goal, refresh insights, and reset the demo.
- Toggle dark mode, refresh the page, and confirm the preference persists.
- Leave the service idle, revisit it later, and confirm the read-only snapshot appears during the cold start.

## Product-development workflow

- `main`: portfolio deployment; merge only green, reviewable releases.
- `develop`: product integration and optional Cloudflare preview.
- `feature/*`: focused product changes merged through pull requests.
- Tag stable demo releases, beginning with `portfolio-v2.0.0`.
