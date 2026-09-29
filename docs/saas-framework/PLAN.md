# PLAN.md — pogodba projekta

> Status: **PHASE 1 — PLAN** (koda še ni napisana).
> Ta dokument je generičen framework za SaaS/web aplikacije. Referenčni primer skozi celoten
> dokument je **booking aplikacija za storitveno dejavnost** (npr. pasji frizer), vendar so vsi
> deli zasnovani tako, da se "booking" lahko zamenja z "order", "subscription", "project" ipd.
> Vsaka sprememba tega dokumenta = sprememba pogodbe; najprej posodobi PLAN, nato kodo.

---

## 0. Arhitekturne odločitve (povzetek)

| Področje | Odločitev | Zakaj |
|---|---|---|
| Framework | Next.js (App Router) + TypeScript (strict) | En repo za UI + server (Route Handlers, Server Actions), native na Vercelu |
| UI | Tailwind CSS + dostopne komponente (Radix/shadcn po potrebi) | Hitro, konsistentno, brez težkega runtime-a |
| Validacija | Zod — ista shema na clientu (UX) in serverju (resnica) | Server nikoli ne zaupa clientu |
| Database | Supabase Postgres + migracije v repozitoriju (`supabase/migrations`) | Shema je verzionirana, ponovljiva |
| Auth | Supabase Auth (email+geslo, magic link opcijsko, Google OAuth) prek `@supabase/ssr` (cookie session) | Session berljiv na serverju → zaščita route-ov na serverju |
| Avtorizacija | **RLS na vsaki tabeli** + server-side preverjanje vlog | Obramba v globino: tudi direkten klic PostgREST API-ja je zaščiten |
| Plačila | Stripe Checkout (hosted) + webhook kot edini vir resnice | PCI obseg minimalen, ni kartičnih podatkov pri nas |
| Email | Resend (že v uporabi v tem repo) | Transakcijski maili |
| SMS | Twilio (opcijsko, za opomnike) | Po poročilu; za MVP lahko samo email |
| Asinhrono delo | `notifications` outbox tabela + Vercel Cron (ali Supabase pg_cron) | Webhook/zahteva ne čaka na zunanje storitve; retry |
| Rate limiting | Upstash Redis (`@upstash/ratelimit`) ali Vercel WAF | Serverless nima skupnega pomnilnika |
| Monitoring | Sentry (errors) + Vercel logs, strukturirani logi brez PII | Varni errorji uporabniku, detajli v logu |
| Hosting | Vercel (Production / Preview / Development) | Po poročilu |
| Testi | Vitest (unit), pgTAP ali SQL testi za RLS, Playwright (E2E), Stripe CLI (webhooki) | Vsaka plast ima svoj test |

**Kaj iz poročila obdržimo:** plan pred kodo, ločitev frontend/backend/DB, Supabase + RLS,
Stripe Checkout + webhook, server-side SMS, GitHub → Vercel, test mode pred produkcijo, nadgradnje šele
na stabilni osnovi.

**Kaj spremenimo / dodamo:**
1. RLS ni korak 4 — je del **prve** migracije. Nobena tabela ne obstaja brez RLS.
2. Frontend se ne gradi pred bazo s "fake" podatki; najprej shema + auth, nato UI na pravih podatkih.
3. "Ključi v `.env`" → razlikujemo `NEXT_PUBLIC_*` (javno) in server-only; service-role ključ samo v server modulu z `import "server-only"`.
4. Dodamo idempotenco webhookov (`stripe_events`), outbox za obvestila, audit log, preprečevanje dvojnih rezervacij na nivoju baze (exclusion constraint).
5. Ločeni Supabase projekti za dev/preview in production; ločeni Stripe test/live ključi po okoljih.
6. Multi-tenant pripravljenost (`organizations` + `memberships`) — MVP ima eno organizacijo, a shema ne zahteva prepisa, ko jih bo več.

---

## 1. PRODUCT

**Kaj rešuje:** Stranka si sama izbere storitev in prost termin, ga plača (ali plača aro) in dobi
potrditev ter opomnik. Lastnik/osebje ima pregled nad urnikom, rezervacijami, strankami in plačili,
brez telefonskega usklajevanja in brez dvojnih rezervacij.

**Za koga:** majhna storitvena podjetja (1–10 zaposlenih) in njihove stranke.

**Glavni uporabniški flow (customer):**
1. Obišče javno stran → vidi storitve in cene.
2. Izbere storitev → izbere prost termin (server izračuna razpoložljivost).
3. Prijava/registracija (če ni prijavljen).
4. Vnese podatke (npr. ime ljubljenčka, opombe) → server ustvari rezervacijo v stanju `pending_payment` z rokom zadržanja (npr. 15 min).
5. Preusmeritev na Stripe Checkout → plačilo.
6. Stripe webhook → server označi plačilo `succeeded`, rezervacijo `confirmed`, v outbox doda email/SMS.
7. Stranka na `/booking/success` vidi status, ki ga prebere **iz baze** (ne iz URL parametra).
8. Opomnik 24 h pred terminom (cron). Stranka lahko prekliče do X ur pred terminom.

**Glavni poslovni procesi:**
- Upravljanje storitev (ime, trajanje, cena, aktivnost).
- Upravljanje delovnega časa in izjem (dopust, prazniki).
- Izračun razpoložljivosti in zadržanje termina.
- Plačilo, vračilo (refund), neuspelo/opuščeno plačilo → sprostitev termina.
- Obveščanje (potrditev, opomnik, preklic).
- Pregled in upravljanje rezervacij (owner/staff).

**Izven obsega MVP:** Google Calendar sync, loyalty, review requests, CRM, analitika, naročnine. (Glej §12.)

---

## 2. USERS & ROLES

Vloge so vezane na **organizacijo** (`memberships.role`), ne globalno. Customer je vsak prijavljen
uporabnik brez membershipa v tej organizaciji. Globalni `platform_admin` (mi, razvijalci) **ne** obstaja
v aplikaciji — administracijo platforme delamo prek Supabase dashboarda/migracij.

| Vloga | Vidi | Ustvari | Spremeni | Izbriše | Dostop do podatkov |
|---|---|---|---|---|---|
| **guest** (neprijavljen) | javne strani, aktivne storitve, prosta okna (brez imen strank) | račun (signup) | — | — | samo javni podatki (`services` where active, izračunana razpoložljivost prek server funkcije) |
| **customer** | svoj profil, svoje rezervacije, svoja plačila (status, znesek), svoje ljubljenčke/entitete | rezervacijo (samo zase, samo v prostem terminu, prek servera), svoje entitete | svoj profil (ime, telefon — **ne** vloge), preklic lastne rezervacije v dovoljenem oknu | svoj račun (zahteva za izbris → anonimizacija), svoje entitete brez aktivnih rezervacij | samo vrstice, kjer `customer_id = auth.uid()` |
| **staff** | urnik organizacije, rezervacije, dodeljene njemu (ali vse, po nastavitvi), osnovne kontaktne podatke strank teh rezervacij | opombe k rezervaciji, blokado lastnega termina | status rezervacije (`completed`, `no_show`), lastne izjeme urnika | — | vrstice svoje organizacije; **brez** plačilnih detajlov in brez nastavitev |
| **owner** (admin organizacije) | vse v svoji organizaciji: rezervacije, stranke, plačila, audit log, nastavitve | storitve, osebje (povabila), urnik, ročne rezervacije | vse v organizaciji, vloge (razen sebe v ne-owner, če je zadnji owner) | storitve (soft delete), rezervacije (preklic, ne fizični izbris), člane | vse vrstice `organization_id` njegove organizacije; nikoli druge organizacije |

Pravila:
- **Vsaka** pravica iz tabele je uveljavljena z RLS in/ali server preverjanjem. UI skrivanje gumbov je samo UX.
- Vloga se nikoli ne bere iz client state/JWT custom claima, ki ga lahko nastavi client; bere se iz `memberships` v bazi (ali iz custom access token hooka, ki ga nastavi samo baza).
- Denar (vračila, cene) spreminja samo owner in samo prek server akcij.
- Fizični DELETE je izjema; privzeto `status`/`deleted_at` + audit log.

---

## 3. FRONTEND

Konvencija: **Server Components** berejo podatke na serverju z uporabnikovim sessionom (RLS velja).
**Mutacije** gredo prek Server Actions ali Route Handlerjev (`/api/*`), nikoli z direktnim
`supabase.from(...).insert()` iz browserja za kritične operacije (rezervacija, plačilo, vloge).
Direkten branje iz browserja z anon ključem je dovoljeno samo za ne-kritične, RLS-zaščitene podatke (npr. realtime osvežitev lastnih rezervacij).

Vse strani imajo: loading state, empty state, error state (varno sporočilo + request ID), responsive (mobile-first).

### Javne (guest)
| Stran | Namen | Kdo | Podatki | Akcije | Vir podatkov | Kam pošlje |
|---|---|---|---|---|---|---|
| `/` | predstavitev | vsi | storitve, CTA | → booking | server: `services` (active) | — |
| `/services` | seznam storitev | vsi | ime, trajanje, cena | izberi storitev | server: `services` | — |
| `/book/[serviceId]` | izbira termina | vsi (oddaja zahteva login) | prosta okna | izberi termin → nadaljuj | `GET /api/availability` | `createBooking` action |
| `/login`, `/signup` | auth | guest | — | prijava, registracija, Google | Supabase Auth | Supabase Auth |
| `/forgot-password`, `/reset-password` | ponastavitev gesla | guest / recovery session | — | pošlji link, nastavi geslo | Supabase Auth | Supabase Auth |
| `/auth/callback` | OAuth/email code exchange | sistem | — | izmenja code za session | Supabase | redirect na `next` (samo relativne poti!) |
| `/legal/*` | pogoji, zasebnost | vsi | statično | — | — | — |

### Customer (`/account/*`, zahteva login)
| Stran | Namen | Podatki | Akcije | Vir | Kam pošlje |
|---|---|---|---|---|---|
| `/account` | pregled | prihajajoče rezervacije | → podrobnosti | server (RLS) | — |
| `/account/bookings` | seznam | lastne rezervacije + status plačila | preklic | server (RLS) | `cancelBooking` action |
| `/account/bookings/[id]` | podrobnosti | ena rezervacija | preklic, ponovno plačilo (če `pending_payment`) | server (RLS; tuji ID → 404) | `cancelBooking`, `POST /api/checkout` |
| `/account/profile` | profil | ime, telefon, email, SMS soglasje | uredi, izbriši račun | server (RLS) | `updateProfile`, `requestAccountDeletion` |
| `/account/pets` (generično: entitete) | lastne entitete | seznam | CRUD | server (RLS) | actions |
| `/booking/success?session_id=` | po plačilu | status rezervacije **iz baze** | — (polling dokler webhook ne potrdi) | `GET /api/bookings/[id]/status` | — |
| `/booking/cancelled` | opuščen checkout | info | poskusi znova | server | — |

### Staff / Owner (`/dashboard/*`, zahteva membership; preverjeno v layoutu na serverju + RLS)
| Stran | Kdo | Podatki | Akcije |
|---|---|---|---|
| `/dashboard` | staff, owner | današnji/tedenski urnik | odpri rezervacijo |
| `/dashboard/bookings` | staff (dodeljene), owner (vse) | filtriran seznam | spremeni status, ročna rezervacija (owner) |
| `/dashboard/bookings/[id]` | staff, owner | rezervacija, stranka (kontakt), plačilo (samo owner) | completed/no_show, opomba, preklic+refund (owner) |
| `/dashboard/customers` | owner | stranke organizacije | pogled zgodovine |
| `/dashboard/services` | owner | storitve | CRUD, aktiviraj/deaktiviraj |
| `/dashboard/schedule` | staff (lastni), owner (vsi) | delovni čas, izjeme | uredi |
| `/dashboard/team` | owner | člani, povabila | povabi, spremeni vlogo, odstrani |
| `/dashboard/payments` | owner | plačila, vračila | refund |
| `/dashboard/settings` | owner | ime, časovni pas, preklicna politika, valuta | uredi |
| `/dashboard/audit` | owner | audit log | — |

### Skupne komponente
`AppShell`, `ProtectedLayout` (server check), `ServiceCard`, `SlotPicker`, `BookingForm`,
`BookingStatusBadge`, `DataTable`, `EmptyState`, `ErrorState`, `LoadingSkeleton`, `ConfirmDialog`,
`Toast`, `FormField` (Zod napake).

---

## 4. BACKEND

Vsa poslovna logika živi v `src/server/**` (import `server-only`). Route handler / server action
je tanka plast: **auth → validate → authorize → call service → map errors**.

### Standardni cevovod za vsak endpoint
1. **Authentication:** `supabase.auth.getUser()` (preverja token pri Supabase; ne `getSession()` za odločanje).
2. **Validation:** Zod `safeParse` na vhodu (body, params, query). Neznana polja se zavržejo.
3. **Authorization:** preveri vlogo/lastništvo (`requireMembership(orgId, ['owner'])`), nato izvedi poizvedbo z **uporabnikovim** klientom, da RLS dodatno velja.
4. **Business logic:** v service funkciji; cene/zneski **iz baze**, nikoli iz requesta.
5. **Errors:** `AppError(code, httpStatus, safeMessage)`; neznane napake → 500 + `requestId`, detajl v log/Sentry.
6. **Response:** `{ data }` ali `{ error: { code, message, requestId } }`.

### Route Handlers (`app/api/**`)
| Metoda + pot | Auth | Namen |
|---|---|---|
| `GET /api/availability?serviceId&from&to` | public, rate-limited | izračun prostih oken (server funkcija / SQL RPC `get_available_slots`) |
| `POST /api/checkout` | customer | ustvari Stripe Checkout Session za obstoječo `pending_payment` rezervacijo, ki pripada uporabniku |
| `GET /api/bookings/[id]/status` | customer (lastnik) | status za success stran |
| `POST /api/webhooks/stripe` | Stripe podpis | glej §9 |
| `POST /api/webhooks/twilio/status` | Twilio podpis | delivery status SMS (opcijsko) |
| `GET /api/cron/notifications` | `CRON_SECRET` bearer | pošlje čakajoča obvestila iz outboxa |
| `GET /api/cron/expire-holds` | `CRON_SECRET` | sprosti neplačane rezervacije po poteku |
| `GET /api/cron/reminders` | `CRON_SECRET` | ustvari opomnike za jutrišnje termine |
| `GET /api/health` | public | liveness (brez skrivnosti) |

### Server Actions
`createBooking`, `cancelBooking`, `updateProfile`, `requestAccountDeletion`, `upsertService`,
`archiveService`, `updateSchedule`, `inviteMember`, `changeMemberRole`, `removeMember`,
`updateBookingStatus`, `refundPayment`, `updateOrgSettings`.

### Ključna poslovna logika
- **createBooking:** validira `serviceId`, `startsAt` (v prihodnosti, poravnan na slot, znotraj delovnega časa); prebere ceno in trajanje iz `services`; izračuna `ends_at`; vstavi v `bookings` s `status='pending_payment'`, `hold_expires_at=now()+15min`. Prekrivanje prepreči **exclusion constraint** v bazi (race-condition safe) → ob konfliktu `409 SLOT_TAKEN`.
- **Checkout:** znesek = `bookings.price_amount` (kopija cene v trenutku rezervacije). `metadata.booking_id`, `client_reference_id`, `expires_at` usklajen s holdom, Stripe idempotency key `checkout:{booking_id}:{attempt}`.
- **cancelBooking:** samo lastnik ali owner; preveri preklicno okno; če plačano → refund prek Stripe (server) → status `cancelled`, outbox obvestilo.
- **refundPayment:** samo owner; Stripe Refund z idempotency key; stanje posodobi webhook `charge.refunded`/`refund.updated`.

### Zunanji API-ji (samo server)
Stripe (Checkout, Refunds, Webhooks), Resend (email), Twilio (SMS), Supabase Admin API (samo povabila/izbris računa).

---

## 5. DATABASE

Konvencije: `uuid` PK (`gen_random_uuid()`), `timestamptz` povsod, `created_at default now()`,
`updated_at` s triggerjem, zneski v **najmanjši enoti** (`integer` centi) + `currency char(3)`,
statusi kot Postgres `enum` ali `text` + `CHECK`. Vse tabele v `public` imajo RLS **ENABLED**.

### `auth.users` (Supabase, ne upravljamo sami)
Identiteta, email, geslo hash, OAuth identitete.

### `profiles`
| stolpec | tip | opombe |
|---|---|---|
| id | uuid PK, FK → auth.users(id) on delete cascade | 1:1 z uporabnikom |
| full_name | text | optional |
| phone | text | optional, E.164, validiran |
| sms_opt_in | boolean not null default false | soglasje |
| locale | text not null default 'sl' | |
| deleted_at | timestamptz | anonimizacija |
| created_at, updated_at | timestamptz not null | |
Ustvari jo trigger ob `auth.users` insert (security definer, fiksni `search_path`).

### `organizations`
| id uuid PK | name text not null | slug text unique not null | timezone text not null default 'Europe/Ljubljana' | currency char(3) not null default 'EUR' | cancellation_window_hours int not null default 24 | stripe_account_id text null (za kasnejši Connect) | created_at, updated_at |

### `memberships`
| id uuid PK | organization_id uuid FK → organizations not null | user_id uuid FK → auth.users not null | role text CHECK in ('owner','staff') not null | created_at, updated_at | UNIQUE(organization_id, user_id) |

### `services`
| id uuid PK | organization_id FK not null | name text not null | description text | duration_minutes int not null CHECK > 0 | price_amount int not null CHECK >= 0 | currency char(3) not null | is_active boolean not null default true | archived_at timestamptz | created_at, updated_at |

### `staff_schedules` (delovni čas)
| id PK | organization_id FK not null | user_id FK (staff) null = celotna org | weekday smallint 0–6 not null | start_time time not null | end_time time not null CHECK end>start | created_at, updated_at |

### `schedule_exceptions`
| id PK | organization_id FK | user_id FK null | starts_at timestamptz not null | ends_at timestamptz not null | reason text | created_at |

### `customer_entities` (generično; v primeru: ljubljenčki)
| id PK | owner_id FK → profiles not null | name text not null | attributes jsonb not null default '{}' (validiran v Zod) | notes text | created_at, updated_at |

### `bookings`
| stolpec | tip | opombe |
|---|---|---|
| id | uuid PK | |
| organization_id | uuid FK not null | |
| customer_id | uuid FK → profiles not null | |
| service_id | uuid FK → services not null | |
| staff_id | uuid FK → auth.users null | |
| entity_id | uuid FK → customer_entities null | |
| starts_at, ends_at | timestamptz not null | CHECK ends_at > starts_at |
| status | enum `pending_payment, confirmed, cancelled, completed, no_show, expired` | |
| price_amount | int not null | snapshot cene |
| currency | char(3) not null | |
| hold_expires_at | timestamptz | za pending_payment |
| customer_notes | text | max dolžina |
| cancelled_at, cancelled_by | timestamptz, uuid | |
| created_at, updated_at | timestamptz | |
**Exclusion constraint:** `EXCLUDE USING gist (staff_id WITH =, tstzrange(starts_at, ends_at) WITH &&) WHERE (status IN ('pending_payment','confirmed'))` (razširitev `btree_gist`). Indeksi: `(customer_id, starts_at)`, `(organization_id, starts_at)`.

### `payments`
| id PK | booking_id FK not null | organization_id FK not null | customer_id FK not null | stripe_checkout_session_id text unique | stripe_payment_intent_id text unique | amount int not null | currency char(3) not null | status enum `pending, succeeded, failed, cancelled, refunded, partially_refunded` | amount_refunded int not null default 0 | failure_reason text | created_at, updated_at |
Vrstice piše **samo server** (service role) — klienti imajo samo SELECT.

### `stripe_events` (idempotenca webhookov)
| id text PK (= Stripe `event.id`) | type text not null | status text CHECK ('processing','processed','failed') | attempts int default 1 | error text | received_at, processed_at timestamptz |
Brez politik za `anon`/`authenticated` → nedostopna klientom.

### `notifications` (outbox)
| id PK | organization_id FK | recipient_user_id FK null | channel enum `email, sms` | template text not null | payload jsonb not null | to_address text not null | status enum `pending, sending, sent, failed, cancelled` | attempts int default 0 | next_attempt_at timestamptz default now() | provider_message_id text | last_error text | dedupe_key text UNIQUE | scheduled_for timestamptz | created_at, sent_at |
`dedupe_key` npr. `booking_confirmed:{booking_id}` → ponovljen webhook ne pošlje dvojnega maila.

### `invitations`
| id PK | organization_id FK | email citext not null | role text | token_hash text unique not null | expires_at timestamptz not null | accepted_at timestamptz | invited_by uuid FK | created_at |

### `audit_log`
| id bigint identity PK | organization_id FK null | actor_id uuid null (null = sistem/webhook) | action text not null (`booking.cancelled`, `service.updated`, `member.role_changed`, `payment.refunded` …) | entity_type text | entity_id uuid | metadata jsonb (brez občutljivih podatkov) | created_at |
Append-only: brez UPDATE/DELETE politik; insert samo prek serverja ali triggerjev.

**Namerno NI tabel:** `users` (to je `auth.users`), kartični podatki (Stripe), `sessions` (Supabase), loyalty/CRM (kasneje).

### Relacije
`organizations 1—N memberships N—1 users`, `organizations 1—N services`, `profiles 1—N bookings`,
`bookings 1—N payments` (več poskusov plačila), `bookings 1—N notifications` (prek payload/dedupe).

---

## 6. SUPABASE

**Uporabljamo:** Auth, Postgres, RLS, (Storage — samo če bodo slike storitev/ljubljenčkov; privat bucket z RLS na `storage.objects`), pg_cron opcijsko. **Ne uporabljamo** Edge Functions v MVP (logika je v Next.js), Realtime opcijsko za dashboard.

### Klienti
| Klient | Ključ | Kje | Namen |
|---|---|---|---|
| Browser client (`createBrowserClient`) | anon/publishable | client komponente | auth UI, ne-kritična branja; RLS velja |
| Server client (`createServerClient` + cookies) | anon/publishable + uporabnikov JWT | Server Components, Actions, Route Handlers | vse uporabniške operacije; **RLS velja** |
| Admin client | service_role / secret key | **samo** `src/server/admin/*` z `import "server-only"` | webhooki, cron, povabila, izbris računa. Obide RLS → vsaka uporaba ročno omejena po `organization_id`/`id` |
| Middleware | anon | `middleware.ts` | samo osveževanje sessiona + grobi redirect; ni edina zaščita |

### Pomožne SQL funkcije (security definer, `set search_path = ''`, samo branje)
- `is_org_member(org uuid) returns boolean`
- `has_org_role(org uuid, roles text[]) returns boolean`

### RLS (osnovna logika)
| Tabela | SELECT | INSERT | UPDATE | DELETE |
|---|---|---|---|---|
| profiles | `id = auth.uid()`; org member vidi profile strank z rezervacijo v svoji org (prek view/func) | trigger only | `id = auth.uid()` (stolpci omejeni z column GRANT) | ne (server anonimizacija) |
| organizations | member | ne (server) | `has_org_role(id, {owner})` | ne |
| memberships | member iste org | owner (ali server za povabila) | owner | owner, ne zadnji owner (trigger) |
| services | `is_active` za vse (anon); vse za member | owner | owner | ne (archive) |
| staff_schedules / exceptions | member; anon ne (razpoložljivost prek RPC) | owner; staff za lastne | isto | isto |
| customer_entities | `owner_id = auth.uid()`; member org, če je entiteta na njihovi rezervaciji | `owner_id = auth.uid()` | isto | isto |
| bookings | `customer_id = auth.uid()` ALI `has_org_role(org,{owner})` ALI (`staff` AND `staff_id = auth.uid()`) | **ne direktno** — samo prek RPC `create_booking` / server | customer: ne direktno (preklic prek serverja); staff/owner: omejeni stolpci | ne |
| payments | `customer_id = auth.uid()` ALI owner | ne (service role) | ne | ne |
| stripe_events | ne | ne | ne | ne |
| notifications | ne (ali owner read-only) | ne | ne | ne |
| invitations | owner | owner | ne | owner |
| audit_log | owner | ne | ne | ne |

**Test, ki mora vedno padati:** customer A z lastnim JWT pokliče `GET /rest/v1/bookings?id=eq.<B>` → prazno. Update `status` na tuji ali lastni rezervaciji direktno prek PostgREST → zavrnjeno.

Dodatno: `REVOKE` privzetih privilegijev, kjer niso potrebni; column-level GRANT (npr. customer ne more posodobiti `profiles.role` — vloge sploh niso v profiles).

---

## 7. AUTHENTICATION

| Funkcija | Implementacija |
|---|---|
| Signup | email + geslo (min 8, preverjanje leaked passwords v Supabase), **email verification obvezna** pred rezervacijo |
| Login | email+geslo, Google OAuth (PKCE) |
| Logout | `signOut()` na serverju, brisanje cookijev, redirect `/` |
| Password reset | `resetPasswordForEmail` → `/auth/callback?next=/reset-password` → `updateUser({password})`; generičen odgovor ("če račun obstaja …") |
| Email verification | Supabase confirm email ON; custom SMTP (Resend) za produkcijo |
| Google OAuth | Google Cloud OAuth client; redirect URI = Supabase callback; Supabase "Redirect URLs" allowlist: prod domena, `http://localhost:3000/**`, preview pattern |
| Session | `@supabase/ssr` HTTP-only cookies; middleware osvežuje token; server vedno `getUser()` |
| Protected routes | `/account/*` → login; `/dashboard/*` → login + membership (preverjeno v server layoutu, ne samo middleware) |

- **Potek sessiona:** refresh token v middleware; če refresh ne uspe → redirect na `/login?next=<relativna pot>`; server actions vrnejo `401 UNAUTHENTICATED`, UI prikaže "Seja je potekla".
- **Neveljaven/izbrisan uporabnik:** `getUser()` vrne napako → obravnavano kot guest; RLS vrne nič.
- **Unauthenticated user:** vidi javne strani, storitve, razpoložljivost; ne more ustvariti rezervacije, ne vidi nobenih osebnih podatkov.
- **Open redirect:** `next` parameter sprejme samo poti, ki se začnejo z `/` in ne z `//`.

---

## 8. PAYMENTS (Stripe)

- **Model:** Stripe Checkout Session, `mode=payment`, polno plačilo ali ara (konfiguracija org). Valuta EUR (iz `organizations.currency`).
- **Znesek:** vedno `bookings.price_amount` iz baze (server). Client nikoli ne pošlje zneska.

**Flow:**
1. `createBooking` → `bookings.pending_payment` + hold 15 min.
2. `POST /api/checkout {bookingId}` → preveri lastništvo in status → ustvari/obnovi `payments(pending)` → `stripe.checkout.sessions.create({ line_items, metadata:{booking_id,payment_id}, client_reference_id, customer_email, expires_at, success_url:/booking/success?session_id={CHECKOUT_SESSION_ID}, cancel_url:/booking/cancelled?booking=… }, { idempotencyKey })`.
3. Uporabnik plača na Stripe.
4. Webhook `checkout.session.completed` (in `payment_status === 'paid'`) → `payments.succeeded`, `bookings.confirmed`, outbox.
5. Success stran prikaže status iz baze; če webhook še ni prišel → "Potrjujemo plačilo…" + polling.

| Stanje | Kaj se zgodi |
|---|---|
| success | webhook potrdi → confirmed |
| failed | Checkout sam ponuja ponovni poskus; `checkout.session.async_payment_failed` / `payment_intent.payment_failed` → `payments.failed` |
| cancelled (uporabnik zapusti) | `cancel_url` samo informativno; hold poteče → `checkout.session.expired` + cron → `bookings.expired`, termin sproščen |
| refund | owner → server `refunds.create` → webhook `charge.refunded` → `payments.refunded` |
| plačilo po poteku holda | webhook najde `expired` rezervacijo; če je termin še prost → confirm, sicer avtomatski refund + obvestilo |

**Idempotenca:** Stripe `idempotencyKey` na vseh create klicih; `stripe_events` PK za webhooke; unique na `stripe_checkout_session_id`; prehodi stanj s pogojem (`UPDATE … WHERE status='pending_payment'`).

---

## 9. WEBHOOKS

### Stripe → `POST /api/webhooks/stripe`
| Event | Obdelava | DB |
|---|---|---|
| `checkout.session.completed` | če `payment_status='paid'` → potrdi | payments→succeeded, bookings→confirmed, notifications insert (dedupe), audit |
| `checkout.session.async_payment_succeeded` | isto | isto |
| `checkout.session.async_payment_failed` | neuspeh | payments→failed |
| `checkout.session.expired` | opuščen | payments→cancelled, bookings→expired (če še pending) |
| `charge.refunded` | vračilo | payments.amount_refunded, status |
| `charge.dispute.created` | spor | audit + obvestilo ownerju |

**Postopek (obvezen vrstni red):**
1. Preberi **raw body** (`await req.text()`), Node runtime, brez JSON parsinga prej.
2. `stripe.webhooks.constructEvent(raw, sig, STRIPE_WEBHOOK_SECRET)` → neveljavno = `400`, nič se ne zapiše.
3. `INSERT INTO stripe_events(id, type, status='processing') ON CONFLICT DO NOTHING`; če vrstica že obstaja s `processed` → `200` (duplikat). Če `processing` starejši od X min ali `failed` → ponovno obdelaj.
4. Ne zaupaj payloadu slepo za kritične podatke: po potrebi `stripe.checkout.sessions.retrieve(id)`; preveri `amount_total`/`currency` proti `payments`.
5. Posodobitve baze v **eni transakciji** (SQL funkcija `apply_checkout_completed(...)`), s pogojnimi prehodi stanj (race-safe proti cron expire).
6. Označi `stripe_events.processed`; vrni `200` hitro. Pošiljanje maila/SMS je v outboxu, ne v webhooku.
7. Napaka → `stripe_events.failed` + log + `500` → Stripe ponovi (retry do 3 dni); obdelava je idempotentna.

Zaščita: forged → podpis; duplicate → `stripe_events`; race → pogojni UPDATE + exclusion constraint + transakcija; partial failure → transakcija + retry; vrstni red eventov ni zagotovljen → prehodi stanj so monotoni.

### Twilio status callback (opcijsko) → `POST /api/webhooks/twilio/status`
Preverjanje `X-Twilio-Signature` (twilio `validateRequest` s polnim javnim URL-jem), posodobi `notifications` po `provider_message_id`, idempotentno.

### Cron (Vercel Cron → `GET /api/cron/*`)
Ni pravi webhook, a ista pravila: `Authorization: Bearer ${CRON_SECRET}`, idempotentno, `FOR UPDATE SKIP LOCKED` pri jemanju iz outboxa.

---

## 10. NOTIFICATIONS

| Trigger | Kanal | Prejemnik | Sporočilo | Čas |
|---|---|---|---|---|
| booking confirmed (webhook) | email (+SMS če opt-in) | customer | potrditev, datum, storitev, preklicna povezava | takoj (outbox) |
| booking confirmed | email | owner (+ dodeljen staff) | nova rezervacija | takoj |
| reminder | SMS/email | customer | opomnik | 24 h prej (cron) |
| booking cancelled | email | customer + owner | preklic, info o vračilu | takoj |
| payment failed / hold expired | email | customer | termin sproščen, povezava za ponovni poskus | ob dogodku |
| invitation | email | povabljeni | povezava z enkratnim tokenom | takoj |
| auth maili | email | user | Supabase (custom SMTP) | Supabase |

Providerja: **Resend** (email), **Twilio** (SMS, E.164, samo z `sms_opt_in`). Failure: retry z eksponentnim backoffom (`next_attempt_at`), max 5 poskusov → `failed` + vidno ownerju. Vsebina SMS brez občutljivih podatkov. Nikoli sprožen iz frontenda.

---

## 11. DEPLOYMENT, OKOLJA, TESTIRANJE

Podrobnosti: `SECURITY.md` (skrivnosti, env) in `ENV.md` (seznam spremenljivk).

| Okolje | Git | Supabase | Stripe | Twilio | URL |
|---|---|---|---|---|---|
| Development | lokalno | lokalni Supabase CLI (Docker) ali `dev` projekt | test mode + `stripe listen` | test credentials / dry-run | `http://localhost:3000` |
| Preview | vsak PR | `staging` projekt (nikoli prod) | test mode, staging webhook endpoint | dry-run (ne pošilja) | `*.vercel.app` |
| Production | `main` | `prod` projekt | **live** ključi, prod webhook endpoint | live | custom domena, HTTPS |

**Vercel:** build `next build` (+ `typecheck`, `lint` v CI pred tem); env vars po okoljih; Cron v `vercel.json`; webhook URL-ji na stabilni domeni (ne na preview hash URL); HTTPS avtomatsko; HSTS header.

**Pred produkcijo checklist:** live Stripe ključi + nov `whsec_` za prod endpoint; Supabase Site URL + Redirect URLs = prod domena; Google OAuth authorized origins/redirects; custom SMTP; RLS audit (Supabase Security Advisor); env vars pregledani; testna rezervacija z realno kartico + refund.

### Testni plan (vsak mora biti zelen pred "finished")
- **Auth:** signup (+verifikacija), login, logout, reset, Google, potek sessiona, dostop do `/account` in `/dashboard` brez prijave, customer na `/dashboard` → 403/redirect.
- **Database / RLS (SQL testi z JWT različnih vlog):** CRUD po vlogah; customer A ne vidi/ne spremeni B; staff org X ne vidi org Y; anon ne vidi ničesar zasebnega; direktni PostgREST klici.
- **Booking:** dva sočasna `createBooking` za isti termin → točno eden uspe; termin v preteklosti/izven urnika → 422; hold expiry sprosti termin.
- **Payments (Stripe CLI + test kartice):** `4242…` uspeh, `4000 0000 0000 0002` zavrnjena, 3DS `4000 0027 6000 3184`, opuščen checkout, `stripe events resend` (duplikat), napačen podpis → 400, zamujen webhook po expiry.
- **UI (Playwright):** desktop/tablet/mobile viewporti; loading/empty/error; dostopnost (axe).
- **Security:** IDOR (tuji UUID), manipuliran znesek v requestu (ignoriran), neveljavni vhodi (Zod), XSS v opombah, rate limit, open redirect v `next`.

---

## 12. RAZŠIRLJIVOST

- **Feature moduli:** `src/features/<feature>/{components,actions,schemas}` + `src/server/services/<feature>.ts`; nova funkcija = nov modul + migracija + RLS + testi.
- **Domain events:** poslovni dogodki (`booking.confirmed`) pišejo v `audit_log`/outbox; nove integracije (Google Calendar, CRM, review requests) postanejo novi "consumerji" outboxa, brez spreminjanja booking logike.
- **Multi-tenant:** `organization_id` na vseh poslovnih tabelah že od začetka; Stripe Connect kasneje prek `organizations.stripe_account_id`.
- **Feature flags:** stolpec `organizations.features jsonb` ali env flag.
- **Migracije:** samo naprej (`supabase migration new`), nikoli ročni SQL v prod dashboardu.
- **Generiranje tipov:** `supabase gen types typescript` → `src/types/database.ts` v CI, da se shema in koda ne razhajata.

---

## 13. DEVELOPMENT WORKFLOW (faze)

| Faza | Izhod | Definition of Done |
|---|---|---|
| 0 Discovery | odgovori na odprta vprašanja (§14) | potrjeno z naročnikom |
| 1 Plan | ta dokument, SECURITY.md, ENV.md | potrjeno |
| 2 Architecture | skeleton repo, lint/typecheck/CI, supabase init | CI zelen |
| 3 Database | migracije + RLS + seed + RLS testi | testi izolacije zeleni |
| 4 Auth | signup/login/OAuth/reset, zaščitene poti | auth testi zeleni |
| 5 Backend | services, actions, API, validacija, errorji | unit + integracijski testi |
| 6 Frontend | strani iz §3 na pravih podatkih | E2E happy path, responsive |
| 7 Integrations | Stripe, webhooki, outbox, Resend/Twilio, cron | Stripe CLI scenariji zeleni |
| 8 Testing | celoten testni plan | vse zeleno, security testi |
| 9 Deployment | Vercel preview + prod, domena | smoke test na prod |
| 10 Production check | security audit, live plačilo + refund | podpisan checklist |

---

## 14. ODPRTA VPRAŠANJA (za Discovery)

1. Ena organizacija (en salon) ali platforma za več podjetij?
2. Polno plačilo ob rezervaciji, ara ali plačilo na mestu (opcijsko)?
3. Ali stranka lahko rezervira brez računa (guest checkout)? (Priporočilo MVP: ne.)
4. Preklicna politika in vračila (roki, delež)?
5. Je SMS nujen v MVP ali zadošča email?
6. En ali več zaposlenih z ločenimi urniki?
7. Jeziki (sl/en) in časovni pas.
8. GDPR: hramba podatkov, izbris računa, DPA s providerji (Supabase region EU).
9. Kje živi projekt — ta repozitorij je DRYPOINT portfolio; nova aplikacija naj bo v **ločenem repozitoriju**.
