import FooterYear from "./FooterYear";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <a className="brand brand--light" href="/" aria-label="Larch Valultmere home">
              <svg className="brand__mark" viewBox="0 0 64 64" fill="none" aria-hidden="true"><defs><linearGradient id="lgF" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#6ee7b7"/><stop offset="55%" stopColor="#10b981"/><stop offset="100%" stopColor="#059669"/></linearGradient></defs><rect width="64" height="64" rx="16" fill="#0d1318" stroke="rgba(16,185,129,0.3)"/><path d="M19 14 V50 H34 M31 14 L40 50 L49 14" stroke="url(#lgF)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="brand__name">Larch<span className="brand__accent">Valultmere</span></span>
            </a>
            <p className="footer__tagline">Intelligent crypto trading for everyone.</p>
          </div>

          <nav className="footer__col" aria-label="Platform links">
            <h3 className="footer__heading">Platform</h3>
            <ul className="footer__links">
              <li><a href="/">Home</a></li>
              <li><a href="/about-us">About Us</a></li>
              <li><a href="/how-it-works">How It Works</a></li>
              <li><a href="/faq">FAQs</a></li>
              <li><a href="/contact-us">Contact Us</a></li>
            </ul>
          </nav>

          <nav className="footer__col" aria-label="Legal links">
            <h3 className="footer__heading">Legal</h3>
            <ul className="footer__links">
              <li><a href="/terms-of-use">Terms of Use</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/risk-disclosure">Risk Disclosure</a></li>
            </ul>
          </nav>
        </div>

        <div className="footer__disclaimer">
          <p><strong>Risk disclaimer:</strong> Cryptocurrency trading involves significant risk and may not be suitable for everyone. Prices can move sharply in either direction, and you may lose some or all of your funds. Past performance does not guarantee future results, and no automated tool can guarantee returns. Nothing on this website is financial advice, always do your own research and only trade money you can afford to lose.</p>
        </div>

        <div className="footer__bottom">
          <p>&copy; <FooterYear /> <strong>Larch Valultmere</strong>. All rights reserved.</p>
          <p className="footer__legal"><a href="/terms-of-use">Terms of Use</a> &middot; <a href="/privacy-policy">Privacy Policy</a> &middot; <a href="/risk-disclosure">Risk Disclosure</a></p>
        </div>
      </div>
    </footer>
  );
}
