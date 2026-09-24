"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQs" },
  { href: "/about-us", label: "About Us" },
  { href: "/contact-us", label: "Contact Us" },
];

export default function Header() {
  const pathname = usePathname();
  const headerRef = useRef(null);
  const toggleRef = useRef(null);
  const linksRef = useRef(null);

  /* Header shadow on scroll */
  useEffect(() => {
    const header = headerRef.current;
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Mobile nav toggle */
  useEffect(() => {
    const toggle = toggleRef.current;
    const links = linksRef.current;
    if (!toggle || !links) return;

    const onToggle = () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };

    // Close the drawer when any link inside it is chosen
    const onLinkClick = () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", onToggle);
    links.querySelectorAll("a").forEach((link) => link.addEventListener("click", onLinkClick));
    return () => {
      toggle.removeEventListener("click", onToggle);
      links.querySelectorAll("a").forEach((link) => link.removeEventListener("click", onLinkClick));
    };
  }, []);

  const brandHref = pathname === "/" ? "#top" : "/";

  return (
    <header className="header" id="header" ref={headerRef}>
      <div className="container header__inner">
        <a className="brand" href={brandHref} aria-label="Larch Valultmere home">
          <svg className="brand__mark" viewBox="0 0 64 64" fill="none" aria-hidden="true"><defs><linearGradient id="lgH" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#6ee7b7"/><stop offset="55%" stopColor="#10b981"/><stop offset="100%" stopColor="#059669"/></linearGradient></defs><rect width="64" height="64" rx="16" fill="#10161e" stroke="rgba(16,185,129,0.35)"/><path d="M19 14 V50 H34 M31 14 L40 50 L49 14" stroke="url(#lgH)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className="brand__name">Larch<span className="brand__accent">Valultmere</span></span>
        </a>

        <nav className="nav" aria-label="Main navigation">
          <ul className="nav__links" id="nav-links" ref={linksRef}>
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  className={`nav__link${pathname === href ? " active" : ""}`}
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="nav__drawer-cta"><a className="btn btn--primary" href="/sign-up">Get Started</a></li>
          </ul>
        </nav>

        <div className="nav__actions">
          <a className="btn btn--primary" href="/sign-up">Get Started</a>
          <button className="nav__toggle" id="nav-toggle" ref={toggleRef} aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
