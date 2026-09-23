import PageHero from "@/components/PageHero";

export const metadata = {
  title: "How It Works",
  description:
    "See how Larch Vaultmere works, create an account, fund your wallet, activate AI strategies and track your progress, all in four simple steps.",
};

export default function HowItWorksPage() {
  return (
    <>
      {/* ===== Page hero ===== */}
      <PageHero label="How It Works" title="From sign-up to first trade in four steps">
        <p className="page-hero__sub">No complicated setup, no trading experience required. Here&rsquo;s exactly how <strong>Larch Vaultmere</strong> works, from creating your account to tracking your first results.</p>
      </PageHero>

      {/* ===== Steps ===== */}
      <section className="section">
        <div className="container">
          <ol className="steps">
            <li className="step reveal">
              <span className="step__num">1</span>
              <span className="step__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" /></svg>
              </span>
              <h3 className="step__title">Create your free account</h3>
              <p className="step__text">Sign up with your email in under two minutes. No credit card required to explore the platform, and your first look around is completely free.</p>
            </li>
            <li className="step reveal">
              <span className="step__num">2</span>
              <span className="step__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <h3 className="step__title">Fund your wallet securely</h3>
              <p className="step__text">Deposit using your preferred payment method and set a budget you&rsquo;re comfortable with. Your funds are protected from day one.</p>
            </li>
            <li className="step reveal">
              <span className="step__num">3</span>
              <span className="step__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 1010 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M12 7v5l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <h3 className="step__title">Activate AI strategies</h3>
              <p className="step__text">Pick a strategy that matches your goals and risk level, or build your own. The engine watches the market and acts on signals 24/7.</p>
            </li>
            <li className="step reveal">
              <span className="step__num">4</span>
              <span className="step__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M3 17l5-5 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M14 8h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <h3 className="step__title">Track &amp; grow</h3>
              <p className="step__text">Follow live performance from your dashboard, adjust your settings anytime, and withdraw funds whenever you like.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* ===== What you get ===== */}
      <section className="section section--tint">
        <div className="container">
          <div className="section__head section__head--center">
            <div>
              <p className="section-label">What You Get</p>
              <h2 className="section__title">Everything included from day one</h2>
            </div>
          </div>

          <div className="bento">
            <article className="bento__card reveal">
              <span className="bento__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M3 17l5-5 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M14 8h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <h3 className="bento__title">Live market data</h3>
              <p>Real prices, trends and 7-day charts for 60+ cryptocurrencies, refreshed every 60 seconds.</p>
            </article>

            <article className="bento__card reveal">
              <span className="bento__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <h3 className="bento__title">AI strategies</h3>
              <p>Automated strategies that act on market signals around the clock, no emotions, no missed opportunities.</p>
            </article>

            <article className="bento__card reveal">
              <span className="bento__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <h3 className="bento__title">Bank-grade security</h3>
              <p>2FA, encryption and cold storage keep your account and funds protected at every step.</p>
            </article>

            <article className="bento__card reveal">
              <span className="bento__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M4 13a8 8 0 0116 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><rect x="3" y="13" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="2" /><rect x="17" y="13" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="2" /></svg>
              </span>
              <h3 className="bento__title">24/7 human support</h3>
              <p>Stuck at 3 AM? Real people are on standby around the clock to help you out.</p>
            </article>

            <article className="bento__card reveal">
              <span className="bento__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" /><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <h3 className="bento__title">Fast withdrawals</h3>
              <p>Request a payout anytime, most withdrawals are processed within 24 hours.</p>
            </article>

            <article className="bento__card reveal">
              <span className="bento__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <h3 className="bento__title">Transparent pricing</h3>
              <p>Simple, published fees on every transaction. No hidden charges, ever.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-panel reveal">
            <p className="section-label">Get Started</p>
            <h2 className="cta-panel__title">Ready to try it yourself?</h2>
            <p className="cta-panel__text">Create your free account in minutes and see how easy smarter trading can be.</p>
            <a className="btn btn--gold btn--lg" href="/sign-up">Create Free Account</a>
            <p className="cta-panel__fine">No credit card required &middot; Withdraw anytime &middot; 2FA secured</p>
          </div>
        </div>
      </section>
    </>
  );
}
