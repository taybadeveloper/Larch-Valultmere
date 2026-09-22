import Script from "next/script";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageEffects from "@/components/PageEffects";
import "./globals.css";

export const metadata = {
  title: {
    default: "Larch Vaultmere — Intelligent Crypto Trading Platform",
    template: "%s — Larch Vaultmere",
  },
  description:
    "Larch Vaultmere combines real-time market data with advanced AI strategies to help you trade crypto with confidence — live prices, automated strategies, and bank-grade security.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Fonts: Manrope (headings), Inter (body), JetBrains Mono (numbers) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* intl-tel-input: country flags + dial codes for phone fields */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/intl-tel-input@29.5.1/dist/css/intlTelInput.min.css"
        />
      </head>
      <body>
        <div id="top" />
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <PageEffects />
        {/* intl-tel-input: country data + plugin (flags & dial codes) */}
        <Script src="https://cdn.jsdelivr.net/npm/intl-tel-input@29.5.1/dist/js/data.min.js" strategy="afterInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/intl-tel-input@29.5.1/dist/js/intlTelInput.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
