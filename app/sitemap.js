import { SITE_URL } from "@/lib/seo";

export default function sitemap() {
  const lastModified = new Date();
  const routes = [
    { path: "", changeFrequency: "weekly", priority: 1.0 },
    { path: "/sign-up", changeFrequency: "monthly", priority: 0.9 },
    { path: "/how-it-works", changeFrequency: "monthly", priority: 0.8 },
    { path: "/about-us", changeFrequency: "monthly", priority: 0.7 },
    { path: "/faq", changeFrequency: "monthly", priority: 0.6 },
    { path: "/contact-us", changeFrequency: "monthly", priority: 0.6 },
    { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms-of-use", changeFrequency: "yearly", priority: 0.3 },
    { path: "/risk-disclosure", changeFrequency: "yearly", priority: 0.3 },
  ];
  return routes.map(({ path, ...rest }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    ...rest,
  }));
}
