# Environment variables

`.env.local` (lokalno, **nikoli v Git**) ima enako strukturo kot `.env.example` spodaj, z realnimi
vrednostmi za development (Supabase dev/local, Stripe **test**). Na Vercelu se iste spremenljivke
nastavijo ločeno za Development / Preview / Production.

| Spremenljivka | Zakaj | Client/Server | Secret | Okolja |
|---|---|---|---|---|
| `NEXT_PUBLIC_APP_URL` | absolutni URL-ji (Stripe success/cancel, emaili, OAuth) | client+server | ne | vsa (različne vrednosti) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase API endpoint | client+server | ne | dev/staging/prod projekt |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | publishable ključ; varen samo z RLS | client+server | ne | isto |
| `SUPABASE_SERVICE_ROLE_KEY` | admin operacije (webhook, cron, povabila) — obide RLS | **server** | **DA** | isto |
| `STRIPE_SECRET_KEY` | Checkout, refundi | **server** | **DA** | test v dev/preview, live samo prod |
| `STRIPE_WEBHOOK_SECRET` | preverjanje podpisa webhooka | **server** | **DA** | ločen na endpoint/okolje (lokalno iz `stripe listen`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | samo če rabimo Stripe.js na clientu | client | ne | opcijsko |
| `RESEND_API_KEY` | transakcijski email | **server** | **DA** | |
| `EMAIL_FROM` | pošiljatelj (verificirana domena) | server | ne | |
| `TWILIO_ACCOUNT_SID` | SMS | **server** | **DA** (obravnavaj kot secret) | |
| `TWILIO_AUTH_TOKEN` | SMS + validacija callback podpisa | **server** | **DA** | |
| `TWILIO_FROM_NUMBER` / `TWILIO_MESSAGING_SERVICE_SID` | pošiljatelj | server | ne | |
| `NOTIFICATIONS_DRY_RUN` | `true` v dev/preview → ne pošilja pravih SMS/emailov | server | ne | |
| `CRON_SECRET` | avtentikacija Vercel Cron klicev | **server** | **DA** | |
| `UPSTASH_REDIS_REST_URL` | rate limiting | server | ne | |
| `UPSTASH_REDIS_REST_TOKEN` | rate limiting | **server** | **DA** | |
| `NEXT_PUBLIC_SENTRY_DSN` | error reporting | client+server | ne | |
| `SENTRY_AUTH_TOKEN` | upload source map ob buildu | build | **DA** | samo CI/Vercel |

Google OAuth client ID/secret se **ne** nastavita v aplikaciji — vnesemo ju v Supabase Dashboard → Auth → Providers.

## `.env.example` (predloga, commitana; brez vrednosti)

```dotenv
# ===== APP =====
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ===== DATABASE / SUPABASE =====
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
# SERVER-ONLY SECRET. Bypasses RLS. Never prefix with NEXT_PUBLIC_.
SUPABASE_SERVICE_ROLE_KEY=

# ===== AUTH =====
# Google OAuth is configured in the Supabase dashboard, not here.

# ===== STRIPE =====
# SERVER-ONLY SECRETS. Use test keys (sk_test_) everywhere except Production.
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
# Optional, only if Stripe.js is used client-side.
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# ===== EMAIL (Resend) =====
RESEND_API_KEY=
EMAIL_FROM=

# ===== TWILIO =====
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_MESSAGING_SERVICE_SID=
NOTIFICATIONS_DRY_RUN=true

# ===== OTHER SERVICES =====
CRON_SECRET=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_AUTH_TOKEN=
```

## Vercel URL-ji po okoljih

| | Development | Preview | Production |
|---|---|---|---|
| App URL | `http://localhost:3000` | `https://<branch>-<team>.vercel.app` | `https://app.<domena>` |
| Stripe webhook | `stripe listen --forward-to localhost:3000/api/webhooks/stripe` | staging endpoint na stabilnem staging aliasu | `https://app.<domena>/api/webhooks/stripe` (live mode) |
| Supabase Site URL / Redirect | `http://localhost:3000/**` | `https://*-<team>.vercel.app/**` (staging projekt) | `https://app.<domena>/**` |
| Google OAuth redirect | Supabase callback `https://<project>.supabase.co/auth/v1/callback` (po en na Supabase projekt) | isto (staging) | isto (prod) |
