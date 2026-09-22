import PageHero from "@/components/PageHero";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Larch Vaultmere — our mission to make crypto trading smarter, safer and more accessible for everyone.",
};

export default function AboutUsPage() {
  return (
    <>
      {/* ===== Page hero ===== */}
      <PageHero label="About Us" title="Built for the modern crypto investor">
        <p className="page-hero__sub">We believe intelligent tools should be available to everyone — not just Wall Street. That&rsquo;s why we built Larch Vaultmere: real-time data, AI-powered strategies and bank-grade security, in one simple platform.</p>
      </PageHero>

      {/* ===== Story ===== */}
      <section className="section">
        <div className="container security">
          <div className="security__copy">
            <p className="section-label">Our Story</p>
            <h2 className="section__title">Trading shouldn&rsquo;t be a full-time job</h2>
            <p className="security__lead">Most people don&rsquo;t have time to watch charts around the clock. We built Larch Vaultmere to change that — combining live market data with automated strategies that work while you sleep, so trading fits around your life instead of taking it over.</p>
            <p className="security__lead">Whether you&rsquo;re taking your first step into crypto or you&rsquo;ve been trading for years, our platform meets you where you are — with tools that are powerful when you need them and simple when you don&rsquo;t.</p>
          </div>
          <div className="security__visual reveal">
            <div className="status-card">
              <div className="status-card__head">
                <span className="status-card__title">What we stand for</span>
              </div>
              <ul className="status-card__rows">
                <li><span>Transparency</span><span className="status-ok">No hidden fees</span></li>
                <li><span>Security</span><span className="status-ok">Bank-grade</span></li>
                <li><span>Simplicity</span><span className="status-ok">Built for everyone</span></li>
                <li><span>Support</span><span className="status-ok">24/7 humans</span></li>
              </ul>
              <div className="status-card__shield" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Mission cards ===== */}
      <section className="section section--tint">
        <div className="container">
          <div className="section__head section__head--center">
            <div>
              <p className="section-label">Our Mission</p>
              <h2 className="section__title">Three promises we make to every user</h2>
            </div>
          </div>

          <div className="bento">
            <article className="bento__card reveal">
              <span className="bento__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <h3 className="bento__title">Innovation without complexity</h3>
              <p>Advanced AI under the hood, a clean and simple experience on top. Powerful tools should never feel overwhelming.</p>
            </article>

            <article className="bento__card reveal">
              <span className="bento__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <h3 className="bento__title">Trust through transparency</h3>
              <p>Published fees, honest communication and no fine print. If we wouldn&rsquo;t be proud to explain it, we won&rsquo;t ship it.</p>
            </article>

            <article className="bento__card reveal">
              <span className="bento__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M4 13a8 8 0 0116 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><rect x="3" y="13" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="2" /><rect x="17" y="13" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="2" /></svg>
              </span>
              <h3 className="bento__title">People before profits</h3>
              <p>Real humans answer our support lines 24/7. Your questions deserve answers, not ticket numbers.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ===== Stats band ===== */}
      <section className="stats">
        <div className="container stats__grid">
          <div className="stat">
            <span className="stat__num" data-count="60" data-suffix="+">60+</span>
            <span className="stat__label">Cryptocurrencies supported</span>
          </div>
          <div className="stat">
            <span className="stat__num">24/7</span>
            <span className="stat__label">Market monitoring</span>
          </div>
          <div className="stat">
            <span className="stat__num">$0</span>
            <span className="stat__label">Hidden fees — ever</span>
          </div>
          <div className="stat">
            <span className="stat__num" data-count="99.9" data-suffix="%">99.9%</span>
            <span className="stat__label">Platform uptime</span>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-panel reveal">
            <p className="section-label">Join Us</p>
            <h2 className="cta-panel__title">See what smarter trading feels like</h2>
            <p className="cta-panel__text">Create your free account in minutes and explore live markets, AI strategies and bank-grade security.</p>
            <a className="btn btn--gold btn--lg" href="/sign-up">Create Free Account</a>
            <p className="cta-panel__fine">No credit card required &middot; Withdraw anytime &middot; 2FA secured</p>
          </div>
        </div>
      </section>
    </>
  );
}
