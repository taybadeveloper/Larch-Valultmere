import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageEffects from "@/components/PageEffects";
import { SITE_URL, SITE_NAME, SUPPORT_EMAIL, DEFAULT_DESCRIPTION } from "@/lib/seo";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Larch Valultmere | Intelligent Crypto Trading Platform",
    template: "%s | Larch Valultmere",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  creator: SITE_NAME,
  publisher: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    // No `url` or `images` here: each page sets its own og:url, and
    // app/opengraph-image.jsx auto-injects og:image on every route.
  },
  twitter: {
    card: "summary_large_image",
    // title/description inherit from title/description; image falls back to og:image.
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1015",
  colorScheme: "dark",
  formatDetection: { telephone: false },
};

// Structured data served on every page. Escaping: dangerouslySetInnerHTML + JSON.stringify
// + < swap keeps the JSON valid (a literal "<" could break out of the script tag).
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  email: SUPPORT_EMAIL,
  contactPoint: {
    "@type": "ContactPoint",
    email: SUPPORT_EMAIL,
    contactType: "customer support",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
