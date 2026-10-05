export default function manifest() {
  return {
    name: "Larch Valultmere",
    short_name: "Larch Valultmere",
    description: "Real-time market data and advanced AI trading strategies.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0b1015",
    theme_color: "#0b1015",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
