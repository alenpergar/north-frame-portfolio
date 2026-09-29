# SECURITY.md — varnostna pravila projekta

Ta pravila so obvezna. Kršitev = bug, ne glede na to, ali "deluje".

## 1. Model zaupanja

- **Browser je sovražen.** Vse, kar pride iz clienta (body, query, cookies razen podpisanega sessiona, hidden fields, cene, ID-ji, vloge), je neverificiran vhod.
- **Tri plasti zaščite:** (1) server preveri auth + vlogo, (2) poizvedba teče z uporabnikovim JWT, (3) RLS v bazi. Če odpove ena, držita drugi dve.
- **Zunanji dogodki** (Stripe, Twilio, cron) so zaupanja vredni šele po preverjenem podpisu/secretu.

## 2. Skrivnosti in environment variables

| Spremenljivka | Izpostavljenost | Pravilo |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | javno | OK v browserju |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` (publishable) | javno | Varno **samo zato, ker je RLS vklopljen na vsaki tabeli**. Brez RLS = javna baza. |
| `SUPABASE_SERVICE_ROLE_KEY` (secret) | **server-only, SECRET** | Obide RLS. Samo v `src/server/admin/*` z `import "server-only"`. Nikoli `NEXT_PUBLIC_`, nikoli v client komponenti, nikoli v logih. |
| `STRIPE_SECRET_KEY` | **SECRET** | samo server; po možnosti restricted key z minimalnimi pravicami |
| `STRIPE_WEBHOOK_SECRET` | **SECRET** | ločen za vsako okolje/endpoint |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | javno | potreben samo, če uporabljamo Stripe.js na clientu (pri hosted Checkout ni nujen) |
| `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN` (ali API key/secret) | **SECRET** | samo server |
| `RESEND_API_KEY` | **SECRET** | samo server |
| `CRON_SECRET` | **SECRET** | naključen ≥32 bajtov |
| `UPSTASH_REDIS_REST_TOKEN` | **SECRET** | samo server |
| `SENTRY_AUTH_TOKEN` | **SECRET** (build) | samo CI/Vercel build |

Pravila:
1. Vse z `NEXT_PUBLIC_` se vgradi v JS bundle in je **javno za vedno**. Nobena skrivnost nikoli nima te predpone.
2. Server-only moduli začnejo z `import "server-only"` → build pade, če jih uvozi client.
3. Env se validira ob zagonu (`src/lib/env.ts`, Zod) — manjkajoča ali napačna vrednost = build/boot fail, ne tiho `undefined`.
4. Ločene vrednosti za development / preview / production. Live Stripe ključi **samo** v Production okolju na Vercelu.
5. Rotacija: ob sumu uhajanja takoj rotiraj ključ pri providerju, nato posodobi Vercel env in redeploy. Git history čiščenje NI nadomestilo za rotacijo.

## 3. Git

- Commitan je samo `.env.example` (prazne vrednosti / placeholderji).
- `.gitignore` mora vsebovati vsaj: `.env`, `.env*.local`, `.env.production`, `.env.development`, `.vercel`, `*.pem`, `supabase/.temp`, `supabase/.branches`, `node_modules`, `.next`, `coverage`, `playwright-report`, `test-results`.
- GitHub: vklopljen **secret scanning + push protection**, Dependabot alerts, branch protection na `main` (PR + zeleni CI, brez force push).
- CI korak: `gitleaks` (ali ekvivalent) na vsakem PR.
- Pre-commit hook (opcijsko): gitleaks protect --staged.
- Nobenih ključev v testih, fixture-ih, README, issue-jih, screenshotih.

## 4. Authentication

- Odločitve na serverju z `supabase.auth.getUser()` (validira JWT pri Supabase). `getSession()` iz cookieja se ne uporablja za avtorizacijo.
- Cookies: HttpOnly, Secure, SameSite=Lax (privzeto `@supabase/ssr`).
- Email verification obvezna pred ustvarjanjem rezervacij.
- Password reset / signup vrneta generičen odgovor (brez razkrivanja, ali račun obstaja).
- Redirect parameter `next`: samo relativne poti (`/^\/(?!\/)/`), sicer `/`.
- OAuth: Supabase Redirect URL allowlist samo z znanimi domenami; PKCE flow.
- Supabase Auth rate limits + CAPTCHA (hCaptcha/Turnstile) na signup/reset, če pride do zlorab.

## 5. Authorization in RLS

- `ALTER TABLE … ENABLE ROW LEVEL SECURITY` je v **isti migraciji** kot `CREATE TABLE`. CI test preveri, da nobena tabela v `public` nima RLS izklopljenega.
- Privzeto brez politike = brez dostopa. Politike so ločene po operaciji (SELECT/INSERT/UPDATE/DELETE) in vlogi (`anon`, `authenticated`).
- `UPDATE` politike imajo tudi `WITH CHECK` (prepreči prestavitev vrstice v tujo organizacijo/uporabnika).
- Vloge se berejo iz `memberships`, nikoli iz `user_metadata` (to lahko uporabnik spreminja sam).
- `security definer` funkcije: `set search_path = ''`, polno kvalificirana imena, minimalna logika, `REVOKE EXECUTE … FROM public` kjer ni potrebno.
- Views: `security_invoker = true`, sicer obidejo RLS.
- Service role se uporablja samo v: Stripe webhook, cron, povabila, izbris računa. Vsaka taka poizvedba eksplicitno filtrira po ID-ju iz preverjenega vira.
- IDOR: vsak `[id]` v URL-ju se naloži z uporabnikovim klientom; ne-najdeno in ne-dovoljeno vrneta **enako** (404).

## 6. Input validation, injection, XSS, CSRF

- **Validacija:** Zod na vsakem server vhodu; omejitve dolžin, formatov (UUID, E.164, ISO datum), enumov; `.strict()` objekti. Client validacija je samo UX.
- **SQL injection:** samo Supabase query builder / RPC s parametri. Brez sestavljanja SQL nizov; v SQL funkcijah brez `EXECUTE format(...)` z uporabniškim vhodom (če nujno: `%L`/`%I`).
- **XSS:** React escapira privzeto; `dangerouslySetInnerHTML` prepovedan (razen sanitiziranega z DOMPurify in code review). Email predloge escapirajo uporabniški vnos. Content-Security-Policy header (nonce za skripte, `frame-ancestors 'none'`), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, HSTS.
- **CSRF:** Server Actions imajo vgrajeno preverjanje Origin; Route Handlerji z mutacijami preverijo `Origin`/`Host` ujemanje in sprejmejo samo `application/json`. Cookies `SameSite=Lax`. Webhooki so izvzeti (zaščiteni s podpisom).
- **Uploadi (če Storage):** privatni bucket, RLS na `storage.objects`, omejitev MIME + velikosti, signed URL z kratkim TTL.

## 7. Rate limiting in API abuse

| Endpoint | Limit (izhodišče) | Ključ |
|---|---|---|
| `/api/availability` | 60/min | IP |
| `createBooking` | 10/uro | user |
| `/api/checkout` | 10/uro | user |
| login/signup/reset | Supabase Auth limits + CAPTCHA | IP/email |
| kontakt/obrazci | 5/uro | IP |
| webhooki | brez (podpis), a z body size limitom | — |

- Pending holdi: max N aktivnih `pending_payment` na uporabnika (preprečuje blokiranje urnika).
- Vercel WAF / Bot protection za prod.

## 8. Webhooki

- Stripe: raw body + `constructEvent` + webhook secret; toleranca timestampa (privzeta) proti replay.
- Idempotenca prek `stripe_events(id PK)`; obdelava v transakciji; pogojni prehodi stanj.
- Znesek/valuta iz eventa se primerja z `payments` zapisom; neujemanje → ne potrdi, alarm.
- Twilio: `X-Twilio-Signature` validacija z natančnim javnim URL-jem.
- Cron: `Authorization: Bearer CRON_SECRET`, primerjava v konstantnem času.
- Endpoint ne vrača notranjih napak klicatelju (samo status koda).

## 9. Plačila

- Znesek, valuta in produkt se vedno določijo na serverju iz baze.
- `success_url` nikoli ne spremeni stanja; stanje spremeni samo webhook (ali server-side `retrieve` preverjanje).
- Brez shranjevanja kartičnih podatkov (Stripe hosted Checkout → SAQ A).
- Idempotency key na vseh Stripe create/refund klicih.
- Refund samo `owner`, beleži se v `audit_log`.

## 10. Občutljivi podatki in GDPR

- Minimalni zbrani podatki: ime, email, telefon (opcijsko), opombe.
- Supabase projekt v EU regiji; DPA z vsemi providerji (Supabase, Vercel, Stripe, Resend, Twilio).
- Izbris računa → anonimizacija `profiles`, ohranitev finančnih zapisov po zakonskem roku, izbris `auth.users`.
- SMS samo z izrecnim `sms_opt_in`.
- Backupi: Supabase PITR na produkciji.

## 11. Logging in error messages

- Uporabniku: generično sporočilo + `requestId` (npr. "Prišlo je do napake. Koda: 7f3a…").
- Log/Sentry: `requestId`, route, user id (UUID), error code, stack. **Nikoli:** gesla, tokeni, cookies, API ključi, celotni webhook payloadi, kartični podatki, polni emaili/telefoni (maskiraj).
- Sentry `beforeSend` scrubbing; `sendDefaultPii: false`.
- Baza napake (Postgres/PostgREST) se nikoli ne pošlje 1:1 clientu.
- `audit_log` za varnostno relevantne akcije (vloge, refundi, preklici, izbrisi).

## 12. Odvisnosti in supply chain

- Nova odvisnost samo z razlogom v PR opisu; preferiraj uradne SDK-je (`@supabase/ssr`, `@supabase/supabase-js`, `stripe`, `twilio`, `resend`, `zod`).
- `package-lock.json` commitan; `npm ci` v CI; Dependabot; `npm audit` v CI (high/critical = fail).

## 13. Security testi pred produkcijo (obvezni)

1. Customer A poskusi prebrati/spremeniti rezervacijo, plačilo, profil, entiteto customer B — prek UI, Server Action, `/api/*` **in** direktno prek Supabase REST z A-jevim JWT. Pričakovano: 404/prazno/403.
2. Staff organizacije X poskusi dostop do organizacije Y.
3. Anon z anon ključem poskusi `select` na vsaki tabeli.
4. Pošlji `POST /api/checkout` z manipuliranim zneskom/tujim `bookingId`.
5. Pošlji webhook brez podpisa, z napačnim podpisom, ponovljen (resend), z drugačnim zneskom.
6. Dva sočasna bookinga istega termina.
7. XSS payload v opombah, imenu → prikazan kot tekst v UI in emailu.
8. `next=//evil.com` in `next=https://evil.com` na login/callback.
9. Grep bundla (`.next/static`) za `service_role`, `sk_live`, `sk_test`, `whsec_`, Twilio token → mora biti prazno.
10. Supabase Security Advisor + Performance Advisor brez kritičnih opozoril.

## 14. Pravila za Claude Code med razvojem

Ne hardcodaj skrivnosti · ne obvozi RLS · service role nikoli v browserju · ne zaupaj clientu za kritične operacije · validiraj na serverju · pred spremembo preberi datoteko · brez novih dependencyjev brez razloga · brez mock podatkov, kjer potrebujemo bazo · varen error uporabniku, detajl v log · funkcija ni "finished" pred testom · ne izmišljuj API-jev — preveri trenutno dokumentacijo Supabase/Stripe/Twilio pred implementacijo.
