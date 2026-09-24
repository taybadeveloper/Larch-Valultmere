# Larch Valultmere — Next.js Website

A professional **dark emerald** crypto trading website built with **Next.js 15 (App Router, JavaScript)**. Fully responsive — desktop, tablet and mobile. Live market data from the CoinGecko public API, intl-tel-input phone fields with country flags, and clean URLs.

## Pages

| Page            | Route             | Description                                    |
| --------------- | ----------------- | ---------------------------------------------- |
| Home            | `/`               | Landing page — hero, live ticker, markets, stats, features, security, FAQ, sign-up form |
| About Us        | `/about-us`       | Company story, mission and values              |
| How It Works    | `/how-it-works`   | The four-step guide + what you get             |
| FAQ             | `/faq`            | Full FAQ with 10 questions                     |
| Contact Us      | `/contact-us`     | Contact form + support information             |
| Sign Up         | `/sign-up`        | Registration form (demo)                       |
| Thank You       | `/thank-you`      | Post-signup confirmation page                  |
| Terms of Use    | `/terms-of-use`   | Legal terms template                           |
| Privacy Policy  | `/privacy-policy` | Privacy policy template                        |
| Risk Disclosure | `/risk-disclosure` | Crypto risk warnings — keep this page!       |

Old `.html` URLs still redirect (308) to the clean URLs.

## How to run locally

```
npm install
npm run dev
```

Then open http://localhost:3000. For a production-like build: `npm run build` then `npm start`.

> Note: Google Fonts, the CoinGecko API and ipwho.is need internet. Offline, the page still works — fonts fall back to system fonts and live data sections show "retrying".

## Project structure

```
app/
├── layout.jsx           ← root layout: fonts, header, footer, announcement, scripts
├── globals.css          ← all styling (dark emerald theme, CSS variables in :root)
├── icon.svg             ← favicon
├── page.jsx             ← home page
└── <route>/page.jsx     ← one folder per page (about-us, contact-us, faq, ...)
components/
├── Header.jsx           ← nav + mobile drawer + active link (usePathname)
├── Footer.jsx           ← footer + disclaimer
├── AnnouncementBar.jsx  ← dismissible bar (localStorage)
├── LiveData.jsx         ← CoinGecko ticker + markets + BTC dashboard chart
├── PageEffects.jsx      ← reveal-on-scroll, count-up stats, FAQ accordion
├── SignupForm.jsx       ← shared sign-up form (home + sign-up pages)
├── ContactForm.jsx      ← contact form
├── ThankYouName.jsx     ← ?name= greeting on the thank-you page
└── phone.js             ← intl-tel-input init (country auto-detect via IP)
```

## Live data (no API key needed)

Everything live comes from the [CoinGecko public API](https://www.coingecko.com/en/api):

- **Ticker strip & dashboard preview** — `/simple/price` (prices + 24h change)
- **Live Markets table** — `/coins/markets` (top coins, prices, 7-day sparklines)

All of it refreshes every 60 seconds. To change which coins appear, edit `CONFIG.COINS` in `components/LiveData.jsx`.

Phone fields detect the visitor's country from their IP (ipwho.is) and show the matching flag + dial code — `components/phone.js`.

## Forms (demo — connect a backend to go live)

- **Sign-up form** (home + `/sign-up`) validates input, then redirects to `/thank-you?name=Firstname`.
- **Contact form** (`/contact-us`) validates and shows a success message.

Both live in `components/SignupForm.jsx` / `components/ContactForm.jsx`. Connect them to:
- [Formspree](https://formspree.io/) — one line of code, easiest
- [EmailJS](https://www.emailjs.com/) — no backend needed
- Your own API endpoint

## Where to edit things

| What                                    | Where                                       |
| --------------------------------------- | ------------------------------------------- |
| All text content (every page)           | `app/<route>/page.jsx`                      |
| Colors / fonts (whole site)             | `app/globals.css` → the `:root` block       |
| Coins in ticker, refresh interval       | `components/LiveData.jsx` → `CONFIG`        |
| Number of market table rows             | `components/LiveData.jsx` → `CONFIG.MARKET_ROWS` |
| Stats numbers (count-up)                | `data-count` attributes in page JSX         |

## Deploying

**Vercel** (current setup): push to the connected GitHub repo — Vercel auto-detects Next.js, builds with `npm run build` and serves the static output. `next.config.mjs` keeps old `.html` URLs redirecting to the clean URLs. No `vercel.json` needed.

## Important

The legal pages (`terms-of-use`, `privacy-policy`, `risk-disclosure`) are **templates** — have a lawyer review and adjust them before going live. Keep the risk disclaimer and the honest FAQ ("Do you guarantee profits? → No"). Crypto is a high-risk product, and many jurisdictions require disclaimers on financial websites. Never publish fake prices, fake reviews, or guaranteed-return claims on a live site.
