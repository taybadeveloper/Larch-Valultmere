/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // CoinGecko icons are proxied through the Next.js image optimizer,
    // which resizes them and serves them with long cache lifetimes.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com",
      },
    ],
  },
  async redirects() {
    return [
      // Preserve the old Vercel cleanUrls behavior: /x.html -> /x (308 permanent)
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/:path*.html", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
