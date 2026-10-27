# ZGATE Agent Portal

**Status: a UI prototype. It has no backend, no authentication, and no real data. Do not deploy it.**

Eleven dashboard screens for distribution agents — commissions, payouts, network, customers,
performance, training, documents, complaints — rendered from fixed arrays declared in the page files.
There is no API client, no session, and no `middleware.ts`, so every screen is reachable by typing its
URL. The sign-in form is a mock-up: submitting it says so.

It is not built or deployed anywhere. There is no `Dockerfile`, no CI workflow, and no entry in any
`docker-compose.yml`.

## What it used to do, and why that was removed

Two calls, both hardcoded to `http://localhost:3000` — the **staff dashboard**, on a different origin:

| Call | Why it never worked |
|---|---|
| `POST /api/security/login` | Blocked by CORS; the dev host was hardcoded; and the route forwarded to a backend endpoint, `/api/v1/auth/agent-login`, that **does not exist** — the backend has no agent identity, no such mapping and no `Agent` entity. The dashboard route itself has since been deleted: it returned a backend JWT in its response body, which is exactly what that app's BFF exists to prevent. |
| `GET /api/branding` | Blocked by CORS, and re-tried every five seconds, so it logged a failure twenty times a minute and fell back to the defaults each time. The defaults are now simply used. |

## What has to exist before this is an application

1. **An agent identity in the backend.** A domain entity, credentials, and an authentication endpoint.
   Agents are not staff users: they must not resolve to `zgate_core.users` or hold staff authorities.
2. **Agent-facing endpoints for the data these screens show.** Distribution today is served by the staff
   dashboard's own file-backed routes (`web/src/app/api/distribution/[...path]`), authorised against
   *staff* authorities from `/api/users/me/permissions`. An agent cannot be authorised that way, so the
   commission, payout and network reads an agent is allowed to see have to exist in the backend first.
3. **A BFF of its own**, once there is a token to keep from the browser — the pattern the other three
   frontends use: an httpOnly session cookie, a same-origin proxy that attaches the token server-side,
   and an anti-forgery header on every state change. See `web/src/server/bff/backend-proxy.ts`,
   `client-portal/src/server/bff/portal-proxy.ts` and
   `control-center/web/src/server/bff/cc-proxy.ts`.
4. **A route guard.** `middleware.ts` gating every screen behind a session, as the other portals do.

Until (1) and (2) exist there is nothing for (3) to carry, which is why this app has no BFF rather than
a broken one.

## Running it

```bash
yarn install
yarn dev     # http://localhost:3001 (3000 is the staff dashboard)
```

The screens render their demo data with no backend running.
