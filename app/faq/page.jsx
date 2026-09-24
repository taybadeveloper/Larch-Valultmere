import PageHero from "@/components/PageHero";

export const metadata = {
  title: "FAQ",
  description:
    "Answers to the most common questions about Larch Valultmere, accounts, deposits, withdrawals, fees, security and more.",
};

export default function FaqPage() {
  return (
    <>
      {/* ===== Page hero ===== */}
      <PageHero label="FAQ" title="Frequently asked questions">
        <p className="page-hero__sub">Everything you need to know about accounts, deposits, withdrawals, fees and security. Can&rsquo;t find your answer? <a href="/contact-us" style={{ color: "var(--gold)", textDecoration: "underline", textUnderlineOffset: "3px" }}>Contact us</a>, we reply fast.</p>
      </PageHero>

      {/* ===== FAQ accordion ===== */}
      <section className="section">
        <div className="container container--narrow">
          <div className="faq">
            <div className="faq__item reveal">
              <button className="faq__question" aria-expanded="false">
                What is Larch Valultmere?
                <span className="faq__icon" aria-hidden="true"></span>
              </button>
              <div className="faq__answer"><p><strong>Larch Valultmere</strong> is a crypto trading platform that combines real-time market data with AI-powered strategies, helping you make informed decisions without watching charts all day.</p></div>
            </div>

            <div className="faq__item reveal">
              <button className="faq__question" aria-expanded="false">
                Is Larch Valultmere suitable for beginners?
                <span className="faq__icon" aria-hidden="true"></span>
              </button>
              <div className="faq__answer"><p>Yes. The platform is designed for everyone, clear dashboards, guided setup, and strategies you can activate in one click. You can also start small and learn as you go.</p></div>
            </div>

            <div className="faq__item reveal">
              <button className="faq__question" aria-expanded="false">
                Which cryptocurrencies can I trade?
                <span className="faq__icon" aria-hidden="true"></span>
              </button>
              <div className="faq__answer"><p>We support 60+ coins including Bitcoin, Ethereum, Solana, Litecoin, Ripple and many more. The full list is available in the Markets section of your dashboard.</p></div>
            </div>

            <div className="faq__item reveal">
              <button className="faq__question" aria-expanded="false">
                How do deposits and withdrawals work?
                <span className="faq__icon" aria-hidden="true"></span>
              </button>
              <div className="faq__answer"><p>Deposit with your preferred payment method and funds appear in your wallet after confirmation. Withdrawals can be requested anytime, most are processed within 24 hours.</p></div>
            </div>

            <div className="faq__item reveal">
              <button className="faq__question" aria-expanded="false">
                What payment methods do you accept?
                <span className="faq__icon" aria-hidden="true"></span>
              </button>
              <div className="faq__answer"><p>We support bank transfers and major debit/credit cards. The full list of available methods for your region is shown during the deposit process.</p></div>
            </div>

            <div className="faq__item reveal">
              <button className="faq__question" aria-expanded="false">
                What fees do you charge?
                <span className="faq__icon" aria-hidden="true"></span>
              </button>
              <div className="faq__answer"><p>Our fees are simple and published, no hidden charges. Every fee is shown on the pricing page and on each transaction before you confirm it.</p></div>
            </div>

            <div className="faq__item reveal">
              <button className="faq__question" aria-expanded="false">
                Is my data and money secure?
                <span className="faq__icon" aria-hidden="true"></span>
              </button>
              <div className="faq__answer"><p>Security is our top priority: 256-bit encryption, two-factor authentication, cold storage for the majority of funds, and 24/7 threat monitoring. Learn more on our Security page.</p></div>
            </div>

            <div className="faq__item reveal">
              <button className="faq__question" aria-expanded="false">
                Can I use the platform on my phone?
                <span className="faq__icon" aria-hidden="true"></span>
              </button>
              <div className="faq__answer"><p>Yes. The platform is fully responsive, the whole experience works on desktop, tablet and mobile, right from your browser with nothing to install.</p></div>
            </div>

            <div className="faq__item reveal">
              <button className="faq__question" aria-expanded="false">
                How do I contact support?
                <span className="faq__icon" aria-hidden="true"></span>
              </button>
              <div className="faq__answer"><p>Our human support team is available 24/7. Use the <a href="/contact-us" style={{ color: "var(--gold)", textDecoration: "underline", textUnderlineOffset: "2px" }}>contact form</a> or email support@larch-valultmere.com, most questions are answered within a few hours.</p></div>
            </div>

            <div className="faq__item reveal">
              <button className="faq__question" aria-expanded="false">
                Do you guarantee profits?
                <span className="faq__icon" aria-hidden="true"></span>
              </button>
              <div className="faq__answer"><p>No, and you should be wary of any platform that does. Crypto trading involves real risk, and no tool can guarantee returns. Trade only what you can afford to lose. See our <a href="/risk-disclosure" style={{ color: "var(--gold)", textDecoration: "underline", textUnderlineOffset: "2px" }}>Risk Disclosure</a> for full details.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-panel reveal">
            <p className="section-label">Get Started</p>
            <h2 className="cta-panel__title">Still have questions? We&rsquo;re here to help</h2>
            <p className="cta-panel__text">Our support team answers around the clock, or create your free account and see the platform for yourself.</p>
            <div className="cta-panel__actions">
              <a className="btn btn--gold btn--lg" href="/sign-up">Create Free Account</a>
              <a className="btn btn--ghost btn--lg" href="/contact-us">Contact Support</a>
            </div>
            <p className="cta-panel__fine">No credit card required &middot; Withdraw anytime &middot; 2FA secured</p>
          </div>
        </div>
      </section>
    </>
  );
}
