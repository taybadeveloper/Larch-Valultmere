import { fileURLToPath } from "node:url";

const emptyPolyfills = fileURLToPath(new URL("./lib/empty-polyfills.js", import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Drop Next's built-in legacy polyfills (trimStart, flat, fromEntries, at,
  // hasOwn, ...). They only serve browsers older than our browserslist
  // (chrome >= 100, firefox >= 100, safari >= 15.4), which all support these
  // natively. Saves ~12 KiB of JavaScript that Lighthouse flags as legacy.
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /[\\/]polyfills[\\/]polyfill-module/,
        emptyPolyfills
      )
    );
    return config;
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
