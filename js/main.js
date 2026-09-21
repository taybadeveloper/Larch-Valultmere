/* ==========================================================================
   Larch Vaultmere — main.js
   Live data (CoinGecko public API): ticker, markets table, dashboard preview.
   Plus nav, FAQ accordion, count-up stats, reveal animations.
   ========================================================================== */

"use strict";

/* ---------- Config ---------- */
const CONFIG = {
  // Coins shown in the scrolling ticker: CoinGecko id + display symbol
  COINS: [
    { id: "bitcoin", symbol: "BTC" },
    { id: "ethereum", symbol: "ETH" },
    { id: "litecoin", symbol: "LTC" },
    { id: "solana", symbol: "SOL" },
    { id: "ripple", symbol: "XRP" },
    { id: "dogecoin", symbol: "DOGE" },
    { id: "cardano", symbol: "ADA" },
    { id: "binancecoin", symbol: "BNB" },
  ],
  MARKET_ROWS: 8, // rows in the Live Markets table (top coins by market cap)
  REFRESH_MS: 60 * 1000, // 60 seconds
  STORAGE_KEYS: {
    announcement: "larch-vaultmere-announcement-dismissed",
  },
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

/* ---------- Shared helpers ---------- */
function formatPrice(price) {
  const decimals = price >= 1000 ? 0 : price >= 1 ? 2 : 4;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(price);
}

function chgClass(change) {
  return change >= 0 ? "up" : "down";
}

/* Builds a small SVG sparkline from an array of prices */
function sparklineSvg(prices, className, w = 110, h = 34) {
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const points = prices
    .map((p, i) => {
      const x = (i / (prices.length - 1)) * w;
      const y = h - ((p - min) / range) * (h - 6) - 3;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return `<svg class="sparkline ${className}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
    <polyline points="${points}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>`;
}

/* Compact money formatting for large values (volume, etc.) */
function formatCompact(value) {
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
  return `$${value.toFixed(2)}`;
}

/* Y-axis label formatting for the dashboard chart */
function formatAxis(value) {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return value.toFixed(2);
}

/* Draws the hero dashboard's 7-day BTC chart — real data, grid + axis labels */
function drawBtcChart(prices) {
  const chartEl = $("#dash-chart");
  if (!chartEl || !prices || prices.length < 2) return;

  // Downsample to ~48 points for a smooth, fast SVG
  const step = Math.max(1, Math.ceil(prices.length / 48));
  const pts = prices.filter((_, i) => i % step === 0 || i === prices.length - 1);

  const w = 560;
  const h = 220;
  const padL = 54;
  const padR = 16;
  const padT = 12;
  const padB = 26;
  const min = Math.min(...pts);
  const max = Math.max(...pts);
  const range = max - min || 1;
  const x = (i) => padL + (i / (pts.length - 1)) * (w - padL - padR);
  const y = (p) => padT + (1 - (p - min) / range) * (h - padT - padB);
  const up = pts[pts.length - 1] >= pts[0];
  const color = up ? "#12b76a" : "#e5484d";

  const line = pts.map((p, i) => `${x(i).toFixed(1)},${y(p).toFixed(1)}`).join(" ");
  const area = `${padL},${h - padB} ${line} ${w - padR},${h - padB}`;

  // 4 horizontal gridlines with price labels
  const grids = [0, 1, 2, 3]
    .map((i) => {
      const val = max - (range * i) / 3;
      const yy = y(val);
      return `<line x1="${padL}" x2="${w - padR}" y1="${yy}" y2="${yy}" class="dash-chart__grid" />
        <text x="${padL - 8}" y="${yy + 3.5}" class="dash-chart__label" text-anchor="end">${formatAxis(val)}</text>`;
    })
    .join("");

  // Day labels across the bottom
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dayLabels = days
    .map(
      (d, i) =>
        `<text x="${x(Math.round((i * (pts.length - 1)) / 6)).toFixed(1)}" y="${h - 8}" class="dash-chart__label" text-anchor="middle">${d}</text>`
    )
    .join("");

  const lastX = x(pts.length - 1).toFixed(1);
  const lastY = y(pts[pts.length - 1]).toFixed(1);

  chartEl.innerHTML = `
    <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="dashChartArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.20" />
          <stop offset="100%" stop-color="${color}" stop-opacity="0" />
        </linearGradient>
      </defs>
      ${grids}
      ${dayLabels}
      <polygon points="${area}" fill="url(#dashChartArea)" />
      <polyline points="${line}" fill="none" stroke="${color}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round" />
      <circle cx="${lastX}" cy="${lastY}" r="9" fill="${color}" opacity="0.18" />
      <circle cx="${lastX}" cy="${lastY}" r="4.5" fill="${color}" stroke="#fff" stroke-width="2" />
    </svg>`;
}

/* Hero BTC panel — big price, 24h change pill, high/low/volume, 7-day chart */
function fillBtcPanel(coin) {
  const bigPrice = $("#dash-btc-big");
  const bigChg = $("#dash-btc-big-chg");
  if (bigPrice) bigPrice.textContent = formatPrice(coin.current_price);
  if (bigChg) {
    const change = coin.price_change_percentage_24h ?? 0;
    bigChg.textContent = `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`;
    bigChg.className = `dash__market-chg ${chgClass(change)}`;
  }

  const high = $("#dash-btc-high");
  const low = $("#dash-btc-low");
  const vol = $("#dash-btc-vol");
  if (high) high.textContent = formatPrice(coin.high_24h);
  if (low) low.textContent = formatPrice(coin.low_24h);
  if (vol) vol.textContent = formatCompact(coin.total_volume);

  drawBtcChart(coin.sparkline_in_7d?.price);
}

/* ==========================================================================
   1) Scrolling ticker — prices + 24h change (CoinGecko /simple/price)
   ========================================================================== */
const ticker = $("#ticker");

function tickerItemHtml(coin, data) {
  const change = data?.usd_24h_change;
  const changeHtml =
    change == null
      ? ""
      : `<span class="ticker__change ${
          change >= 0 ? "ticker__change--up" : "ticker__change--down"
        }">${change >= 0 ? "▲" : "▼"} ${Math.abs(change).toFixed(1)}%</span>`;
  const priceHtml = data?.usd ? `<span class="ticker__price">${formatPrice(data.usd)}</span>` : "";
  return `
    <span class="ticker__item">
      <span class="ticker__symbol">${coin.symbol}</span>
      ${priceHtml}
      ${changeHtml}
    </span>`;
}

async function loadSimplePrices() {
  // Ticker + dashboard preview only exist on the home page
  if (!ticker) return;

  const ids = CONFIG.COINS.map((c) => c.id).join(",");
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const items = CONFIG.COINS.map((coin) => tickerItemHtml(coin, data[coin.id])).join("");
    // Duplicate the group once so the marquee can loop seamlessly
    ticker.innerHTML = `<div class="ticker__group">${items}</div>`.repeat(2);

    // Also fill the hero dashboard preview with live BTC / ETH / SOL
    fillDashboard(data);
  } catch (err) {
    console.warn("Live prices unavailable, retrying later.", err);
    ticker.innerHTML = `<p class="ticker__loading">Live prices temporarily unavailable — retrying&hellip;</p>`;
  }
}

/* Hero dashboard preview rows */
function fillDashboard(data) {
  [
    { id: "bitcoin", price: "#dash-btc-price", chg: "#dash-btc-chg" },
    { id: "ethereum", price: "#dash-eth-price", chg: "#dash-eth-chg" },
    { id: "solana", price: "#dash-sol-price", chg: "#dash-sol-chg" },
  ].forEach((row) => {
    const coin = data[row.id];
    if (!coin) return;
    const priceEl = $(row.price);
    const chgEl = $(row.chg);
    if (!priceEl || !chgEl) return;
    priceEl.textContent = formatPrice(coin.usd);
    chgEl.textContent = `${coin.usd_24h_change >= 0 ? "+" : ""}${coin.usd_24h_change.toFixed(2)}%`;
    chgEl.className = `dash__coin-chg ${chgClass(coin.usd_24h_change)}`;
  });
}

/* ==========================================================================
   2) Live Markets table — top coins with 7-day sparklines
      (CoinGecko /coins/markets)
   ========================================================================== */
const marketsBody = $("#markets-body");

/* One compact list row for the remaining coins */
function marketListRowHtml(coin) {
  const change = coin.price_change_percentage_24h ?? 0;
  const up = change >= 0;
  const spark = coin.sparkline_in_7d?.price?.length
    ? sparklineSvg(coin.sparkline_in_7d.price, up ? "sparkline--up" : "sparkline--down", 90, 28)
    : "&mdash;";

  return `
    <div class="mrow">
      <span class="mrow__asset">
        <img src="${coin.image}" alt="" loading="lazy" width="24" height="24" />
        <span class="mrow__names">${coin.name}<small>${coin.symbol.toUpperCase()}</small></span>
      </span>
      <span class="mrow__chart">${spark}</span>
      <span class="mrow__price">${formatPrice(coin.current_price)}</span>
      <span class="mrow__chg">
        <span class="pill ${up ? "pill--up" : "pill--down"}">${up ? "+" : ""}${change.toFixed(2)}%</span>
      </span>
    </div>`;
}

/* Featured card for the top (non-stablecoin) markets */
function marketCardHtml(coin) {
  const change = coin.price_change_percentage_24h ?? 0;
  const up = change >= 0;
  const spark = coin.sparkline_in_7d?.price?.length
    ? sparklineSvg(coin.sparkline_in_7d.price, up ? "sparkline--up" : "sparkline--down", 220, 58)
    : "&mdash;";

  return `
    <article class="fcard">
      <div class="fcard__head">
        <img class="fcard__icon" src="${coin.image}" alt="" loading="lazy" width="36" height="36" />
        <span class="fcard__name">${coin.name}<small>${coin.symbol.toUpperCase()}</small></span>
        <span class="pill ${up ? "pill--up" : "pill--down"}">${up ? "+" : ""}${change.toFixed(2)}%</span>
      </div>
      <div class="fcard__price">${formatPrice(coin.current_price)}</div>
      <div class="fcard__chart">${spark}</div>
      <div class="fcard__meta">
        <span>Market Cap <strong>${formatCompact(coin.market_cap)}</strong></span>
        <span>24h Volume <strong>${formatCompact(coin.total_volume)}</strong></span>
      </div>
    </article>`;
}

/* Featured + list layout: top 3 real coins as cards, the rest as rows */
function renderMarkets(data) {
  const STABLE_IDS = ["tether", "usd-coin", "usdc", "dai", "first-digital-usd"];
  const featured = data.filter((c) => !STABLE_IDS.includes(c.id)).slice(0, 3);
  const featuredIds = new Set(featured.map((c) => c.id));
  const rest = data.filter((c) => !featuredIds.has(c.id));

  const cards = featured.map(marketCardHtml).join("");
  const rows = rest.map(marketListRowHtml).join("");

  return `
    <div class="markets__featured">${cards}</div>
    <div class="markets__list">${rows}</div>`;
}

async function loadMarkets() {
  // The markets table only exists on the home page
  if (!marketsBody) return;

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${CONFIG.MARKET_ROWS}&page=1&sparkline=true&price_change_percentage=24h`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    marketsBody.innerHTML = renderMarkets(data);

    // The hero dashboard panel shows Bitcoin — reuse the same API response
    const btc = data.find((coin) => coin.id === "bitcoin");
    if (btc) fillBtcPanel(btc);
  } catch (err) {
    console.warn("Market data: live data unavailable, retrying later.", err);
    marketsBody.innerHTML = `<p class="markets__loading">Live market data temporarily unavailable — retrying&hellip;</p>`;
  }
}

loadSimplePrices();
loadMarkets();
setInterval(loadSimplePrices, CONFIG.REFRESH_MS);
setInterval(loadMarkets, CONFIG.REFRESH_MS);

/* ==========================================================================
   Header — shadow on scroll
   ========================================================================== */
const header = $("#header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ==========================================================================
   Mobile nav toggle
   ========================================================================== */
const navToggle = $("#nav-toggle");
const navLinks = $("#nav-links");

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

// Close the drawer when any link inside it is chosen
$$("a", navLinks).forEach((link) =>
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  })
);

/* ==========================================================================
   Announcement bar — dismiss once, remember in localStorage
   ========================================================================== */
const announcement = $("#announcement");
const announcementClose = $("#announcement-close");

if (announcement && announcementClose) {
  if (localStorage.getItem(CONFIG.STORAGE_KEYS.announcement)) {
    announcement.hidden = true;
  } else {
    announcementClose.addEventListener("click", () => {
      announcement.hidden = true;
      localStorage.setItem(CONFIG.STORAGE_KEYS.announcement, "1");
    });
  }
}

/* ==========================================================================
   FAQ accordion — one open at a time
   ========================================================================== */
$$(".faq__item").forEach((item) => {
  const question = $(".faq__question", item);
  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    $$(".faq__item.open").forEach((openItem) => {
      openItem.classList.remove("open");
      $(".faq__question", openItem).setAttribute("aria-expanded", "false");
    });
    if (!isOpen) {
      item.classList.add("open");
      question.setAttribute("aria-expanded", "true");
    }
  });
});

/* ==========================================================================
   Count-up stats — animates numbers like "60+" and "99.9%" into view
   ========================================================================== */
function countUp(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const decimals = (target.toString().split(".")[1] || "").length;
  const duration = 1200;
  const start = performance.now();

  function frame(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
    const value = target * eased;
    el.textContent =
      (decimals ? value.toFixed(decimals) : Math.round(value).toString()) + suffix;
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

$$("[data-count]").forEach((el) => countObserver.observe(el));

/* ==========================================================================
   Reveal on scroll
   ========================================================================== */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

$$(".reveal").forEach((el) => revealObserver.observe(el));

/* ==========================================================================
   Sign-up form (sign-up.html) — client-side demo
   Validates, then redirects to thank-you.html?name=Firstname
   Connect it to a real backend to create actual accounts.
   ========================================================================== */
const signupForm = $("#signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#signup-name").value.trim();
    const email = $("#signup-email").value.trim();
    const password = $("#signup-password").value;
    const confirm = $("#signup-confirm").value;
    const agreed = $("#signup-terms").checked;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const errorEl = $("#signup-error");

    let message = "";
    if (!name) message = "Please enter your full name.";
    else if (!emailOk) message = "Please enter a valid email address.";
    else if (password.length < 8) message = "Password must be at least 8 characters.";
    else if (password !== confirm) message = "Passwords do not match.";
    else if (!agreed) message = "Please accept the Terms of Use to continue.";

    if (message) {
      errorEl.textContent = message;
      errorEl.classList.add("show");
      return;
    }

    // Demo flow: send the visitor to the thank-you page with their first name.
    // TODO: replace with a real API call that creates the account.
    window.location.href = `thank-you.html?name=${encodeURIComponent(name.split(" ")[0])}`;
  });
}

/* ==========================================================================
   Thank-you page — greet the new user by name
   ========================================================================== */
const thankyouName = $("#thankyou-name");

if (thankyouName) {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");
  thankyouName.textContent = name ? `, ${name}` : "";
}

/* ==========================================================================
   Contact form (contact-us.html) — client-side demo
   Fields mirror the reference design: first/last name, email, phone, consent.
   ========================================================================== */
const contactForm = $("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Honeypot: if the hidden field was filled, it's a bot — pretend success
    const honeypot = $("#contact-company");
    if (honeypot && honeypot.value) {
      contactForm.reset();
      return;
    }

    const first = $("#contact-first").value.trim();
    const last = $("#contact-last").value.trim();
    const email = $("#contact-email").value.trim();
    const phoneDigits = $("#contact-phone").value.replace(/\D/g, "");
    const consented = $("#contact-consent").checked;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const errorEl = $("#contact-error");
    const successEl = $("#contact-success");
    const submitBtn = $("#contact-submit");

    let err = "";
    if (!first) err = "First name is required";
    else if (!last) err = "Last name is required";
    else if (!emailOk) err = "Enter a valid email address";
    else if (phoneDigits.length < 7) err = "Enter a valid phone number";
    else if (!consented) err = "Please accept the Privacy Policy to continue.";

    if (err) {
      errorEl.textContent = err;
      errorEl.classList.add("show");
      successEl.classList.remove("show");
      return;
    }

    // TODO: post { firstName, lastName, email, phone, countryCode } to your
    // backend / email service (e.g. Formspree, EmailJS, or your own API).
    // Until then we simulate a short submission and confirm.
    errorEl.classList.remove("show");
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting…";

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
      successEl.textContent = `Thanks ${first} — your message has been received! (Demo: connect a backend to actually send it.)`;
      successEl.classList.add("show");
      contactForm.reset();
    }, 600);
  });
}

/* ==========================================================================
   Footer year
   ========================================================================== */
$("#footer-year").textContent = new Date().getFullYear();
