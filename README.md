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
binnacrest-ai/
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

## How to run

Open `index.html` in any browser (double-click it). All pages link to each other — no server needed.

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

- **cPanel / shared hosting**: upload all files/folders as-is to `public_html`.
- **Netlify / Vercel**: drag-and-drop the project folder — nothing to build.
- **GitHub Pages**: push the folder to a repo and enable Pages.

## Important

The legal pages (`terms-of-use.html`, `privacy-policy.html`, `risk-disclosure.html`) are **templates** — have a lawyer review and adjust them before going live. Keep the risk disclaimer and the honest FAQ ("Do you guarantee profits? → No"). Crypto is a high-risk product, and many jurisdictions require disclaimers on financial websites. Never publish fake prices, fake reviews, or guaranteed-return claims on a live site.
