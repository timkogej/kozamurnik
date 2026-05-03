# Kozamurnik Center mobilnosti — Spletna stran

Uradna spletna stran za **KOZAMURNIK Center mobilnosti d.o.o.** — pnevmatike, vulkanizerstvo in avtovleka v Šentjanžu.

## Tehnološki sklad

- **Framework:** Next.js (App Router), TypeScript
- **Stiliranje:** Tailwind CSS v4
- **Animacije:** Framer Motion
- **Ikone:** lucide-react
- **Obrazci:** react-hook-form + Zod
- **Email:** Resend
- **Gostovanje:** Vercel

## Namestitev in zagon

### Predpogoji

- Node.js 20+
- npm 10+

### Lokalni razvoj

```bash
# Klonirajte repozitorij
git clone <repo-url>
cd kozamurnik

# Namestite odvisnosti
npm install

# Ustvarite .env.local iz predloge
cp .env.local.example .env.local
# Uredite .env.local z vašimi vrednostmi

# Zaženite razvojni strežnik
npm run dev
```

Spletna stran je dostopna na [http://localhost:3000](http://localhost:3000).

### Gradnja za produkcijo

```bash
npm run build
npm start
```

## Okoljske spremenljivke

Ustvarite datoteko `.env.local` na osnovi `.env.local.example`:

| Spremenljivka | Opis | Obvezno |
|---|---|---|
| `RESEND_API_KEY` | API ključ za Resend (pošiljanje emailov) | Za email |
| `CONTACT_EMAIL_TO` | E-naslov prejemnika kontaktnega obrazca | Da |
| `CONTACT_EMAIL_FROM` | E-naslov pošiljatelja (Resend domena) | Za email |

> **Opomba:** Brez `RESEND_API_KEY` kontaktni obrazec deluje v debug načinu — izpis v konzolo, brez dejanskega emaila.

## Struktura projekta

```
kozamurnik/
├── app/                    # Next.js App Router strani
│   ├── page.tsx            # Domača stran
│   ├── o-nas/              # O nas
│   ├── storitve/           # Storitve (hub + podstrani)
│   ├── pnevmatike/         # Pnevmatike (hub + podstrani)
│   ├── avtovleka/          # Avtovleka
│   ├── kontakt/            # Kontakt
│   └── api/contact/        # API za kontaktni obrazec
├── components/             # React komponente
│   ├── ui/                 # UI primitivi (Button, Card, itd.)
│   ├── layout/             # Navigacija, Footer, Banner
│   ├── hero/               # Hero sekcije
│   ├── sections/           # Vsebinske sekcije
│   └── forms/              # Obrazci
├── data/                   # Vsebinski podatki (en. izvor resnice)
├── lib/                    # Pomožne funkcije
└── public/images/          # Slike (zamenjajte z dejanskimi)
```

## Vsebina in podatki

Vsa vsebina je v datotekah v mapi `data/`:

- `data/services.ts` — storitve
- `data/tires.ts` — kategorije pnevmatik
- `data/reviews.ts` — ocene strank (zamenjajte z resničnimi)
- `data/faq.ts` — pogosta vprašanja
- `data/brands.ts` — blagovne znamke
- `data/partners.ts` — zavarovalnice

Sezonski banner se nastavi v `lib/config.ts` → `seasonalBanner`.

## Slike

Glejte `/public/images/IMAGES.md` za seznam vseh slik, ki jih je treba zamenjati z dejanskimi fotografijami.

## Razvoj

```bash
npm run dev      # Razvojni strežnik
npm run build    # Gradnja
npm run start    # Produkcijski strežnik
npm run lint     # Preverjanje kode
```

## Objava na Vercel

1. Uvozite repozitorij v Vercel
2. Nastavite okoljske spremenljivke v Vercel nadzorni plošči
3. Povežite domeno `kozamurnik.si`
4. Vsaka objava na `main` vejo se samodejno objavi

## Kontakt

Za tehnično podporo: [Jedro Systems](https://jedroplus.com)
