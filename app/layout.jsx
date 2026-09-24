import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageEffects from "@/components/PageEffects";
import "./globals.css";

export const metadata = {
  title: {
    default: "Larch Valultmere | Intelligent Crypto Trading Platform",
    template: "%s | Larch Valultmere",
  },
  description:
    "Larch Valultmere combines real-time market data with advanced AI strategies to help you trade crypto with confidence, live prices, automated strategies, and bank-grade security.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Fonts: Manrope (headings), Inter (body), JetBrains Mono (numbers).
            Loaded async so they don't block the initial render. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
            rel="stylesheet"
          />
        </noscript>
        {/* intl-tel-input styles are bundled locally (imported in the form
            components), so no CDN stylesheet blocks the render. */}
      </head>
      <body>
        <div id="top" />
        <Header />
        <main>{children}</main>
        <Footer />
        <PageEffects />
        {/* intl-tel-input scripts load only on pages with a phone field */}
      </body>
    </html>
  );
}
