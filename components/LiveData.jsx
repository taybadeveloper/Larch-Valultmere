"use client";

import { useEffect } from "react";

/*
 * Live data (CoinGecko public API) — port of the original js/main.js:
 * scrolling ticker, live markets table and the hero BTC dashboard panel.
 * Renders nothing; fills placeholder elements in the home page markup.
 */

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
};

const $ = (selector, scope = document) => scope.querySelector(selector);

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

export default function LiveData() {
  useEffect(() => {
    const ticker = $("#ticker");
    const marketsBody = $("#markets-body");

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
    const tickerTimer = setInterval(loadSimplePrices, CONFIG.REFRESH_MS);
    const marketsTimer = setInterval(loadMarkets, CONFIG.REFRESH_MS);

    return () => {
      clearInterval(tickerTimer);
      clearInterval(marketsTimer);
    };
  }, []);

  return null;
}
