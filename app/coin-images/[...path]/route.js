const UPSTREAM = "https://coin-images.coingecko.com";

/* Proxies CoinGecko's coin-icon CDN through our own domain so browsers get
 * proper cache headers (CoinGecko sends none, which Lighthouse flags as
 * "Use efficient cache lifetimes"). The upstream CDN rejects requests
 * without a browser User-Agent and Referer, so we send both; responses are
 * cached with force-cache and re-served immutable for a year, since coin
 * icons are versioned by URL and never change. */
export async function GET(_request, { params }) {
  const { path } = await params;

  // Reject anything that could escape the upstream images directory
  if (!path || path.length === 0 || path.some((seg) => !seg || seg === "." || seg === "..")) {
    return new Response(null, { status: 400 });
  }

  try {
    const res = await fetch(`${UPSTREAM}/${path.join("/")}`, {
      cache: "force-cache",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        Referer: "https://larch-valultmere.com/",
        Accept: "image/avif,image/webp,image/png,image/svg+xml,image/*;q=0.8,*/*;q=0.5",
      },
    });
    if (!res.ok) return new Response(null, { status: res.status });

    const headers = new Headers();
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
    // Vercel CDN caches function responses on this header (saves function invocations)
    headers.set("CDN-Cache-Control", "public, max-age=31536000, immutable");
    headers.set("Content-Type", res.headers.get("content-type") ?? "image/png");
    return new Response(res.body, { headers });
  } catch {
    return new Response(null, { status: 502 });
  }
}
