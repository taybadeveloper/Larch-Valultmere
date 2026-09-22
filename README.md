# Larch Vaultmere — Multi-Page Website

A professional **light-theme** crypto trading website, built in **plain HTML + CSS + JS** (no frameworks, no build step). Fully responsive — desktop, tablet and mobile.

## Pages

| Page                 | File                | Description                                    |
| -------------------- | ------------------- | ---------------------------------------------- |
| Home                 | `index.html`        | Landing page — hero, live ticker, markets table, stats, features, security, FAQ |
| About Us             | `about-us.html`     | Company story, mission and values              |
| How It Works         | `how-it-works.html` | The four-step guide + what you get             |
| FAQ                  | `faq.html`          | Full FAQ with 10 questions                     |
| Contact Us           | `contact-us.html`   | Contact form + support information             |
| Sign Up              | `sign-up.html`      | Registration form (demo)                       |
| Thank You            | `thank-you.html`    | Post-signup confirmation page                  |
| Terms of Use         | `terms-of-use.html` | Legal terms template                           |
| Privacy Policy       | `privacy-policy.html` | Privacy policy template                      |
| Risk Disclosure      | `risk-disclosure.html` | Crypto risk warnings — keep this page!       |

## File structure

```
larch-vaultmere/
├── index.html            ← home page
├── about-us.html
├── how-it-works.html
├── faq.html
├── contact-us.html
├── sign-up.html
├── thank-you.html
├── terms-of-use.html
├── privacy-policy.html
├── risk-disclosure.html
├── css/
│   └── style.css         ← all styling for every page
├── js/
│   └── main.js           ← shared JS for every page
├── assets/
│   └── favicon.svg
└── README.md
```

## How to run locally

Links use clean URLs (`/about-us`, `/sign-up` …), so the site needs a local server:

```
powershell -ExecutionPolicy Bypass -File serve.ps1
```

This starts a dev server at **http://localhost:8000** that mimics Vercel's clean-URL behavior (it also opens the site in your browser). Stop it with Ctrl+C.

> Note: Google Fonts and the CoinGecko API need internet. Offline, the page still works — fonts fall back to system fonts and live data sections show "retrying".

## Live data (no API key needed)

Everything live comes from the [CoinGecko public API](https://www.coingecko.com/en/api):

- **Ticker strip & dashboard preview** — `/simple/price` (prices + 24h change)
- **Live Markets table** — `/coins/markets` (top coins, prices, 7-day sparklines)

All of it refreshes every 60 seconds. To change which coins appear, edit `CONFIG.COINS` in `js/main.js`.

## Forms (demo — connect a backend to go live)

- **Sign-up form** (`sign-up.html`) validates input, then redirects to `thank-you.html?name=Firstname`.
- **Contact form** (`contact-us.html`) validates and shows a success message.

Both handlers live in `js/main.js` with `TODO` markers. Connect them to:
- [Formspree](https://formspree.io/) — one line of code, easiest
- [EmailJS](https://www.emailjs.com/) — no backend needed
- Your own API endpoint

## Where to edit things

| What                                    | Where                                       |
| --------------------------------------- | ------------------------------------------- |
| All text content (every page)           | The relevant `.html` file                   |
| Colors / fonts (whole site)             | `css/style.css` → the `:root` block         |
| Coins in ticker, refresh interval       | `js/main.js` → `CONFIG`                     |
| Number of market table rows             | `js/main.js` → `CONFIG.MARKET_ROWS`         |
| Stats numbers (count-up)                | `data-count` attributes in HTML             |

## Adding real testimonials

This template deliberately has **no fake reviews**. Once you have real users, add a section to `index.html` using the `.bento__card` pattern — or ask for a section to be added.

## Deploying

- **Vercel** (current setup): `vercel.json` enables `cleanUrls`, so pages serve as `/`, `/about-us`, `/contact-us`, `/faq`, `/how-it-works`, `/sign-up`, `/terms-of-use`, `/privacy-policy`, `/risk-disclosure` and `/thank-you`. Old `.html` URLs redirect (308) to the clean URLs automatically. Just push to the connected GitHub repo — Vercel deploys on push.
- **Netlify**: drag-and-drop the project folder — nothing to build (enable "Pretty URLs" in site settings for the clean links).
- **cPanel / shared hosting**: upload all files/folders as-is to `public_html` (clean URLs need `.htaccess` rules — ask for them).
- **GitHub Pages**: push the folder to a repo and enable Pages (note: Pages does not do clean URLs for `.html` files; the root-relative links would need a custom 404 trick).

## Important

The legal pages (`terms-of-use.html`, `privacy-policy.html`, `risk-disclosure.html`) are **templates** — have a lawyer review and adjust them before going live. Keep the risk disclaimer and the honest FAQ ("Do you guarantee profits? → No"). Crypto is a high-risk product, and many jurisdictions require disclaimers on financial websites. Never publish fake prices, fake reviews, or guaranteed-return claims on a live site.
