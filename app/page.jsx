import LiveData from "@/components/LiveData";
import SignupForm from "@/components/SignupForm";

export default function HomePage() {
  return (
    <>
      <LiveData />

      {/* ===== Hero ===== */}
      <section className="hero">
        <div className="hero__blob hero__blob--one" aria-hidden="true"></div>
        <div className="hero__blob hero__blob--two" aria-hidden="true"></div>

        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="hero__badge">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              AI-Powered Crypto Trading
            </p>
            <h1 className="hero__title">Trade smarter.<br />Invest with <em>confidence</em>.</h1>
            <p className="hero__sub">
              Larch Vaultmere combines real-time market data with advanced AI strategies to help you
              spot opportunities and manage risk, whether you&rsquo;re a beginner or a seasoned trader.
            </p>

            <div className="hero__cta">
              <a className="btn btn--gold btn--lg" href="/sign-up">Start Trading</a>
              <a className="btn btn--ghost btn--lg" href="#markets">View Live Markets</a>
            </div>

            <ul className="hero__points" aria-label="Platform highlights">
              <li><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg> No hidden fees</li>
              <li><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg> Withdraw anytime</li>
              <li><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg> 2FA secured</li>
            </ul>
          </div>

          {/* Dashboard preview (CSS-drawn; prices & chart filled by LiveData from live API) */}
          <div className="hero__visual reveal">
            <div className="dash">
              <div className="dash__bar">
                <span className="dash__dots" aria-hidden="true"><i></i><i></i><i></i></span>
                <span className="dash__title">Larch Vaultmere, Live Markets</span>
                <span className="dash__live"><i aria-hidden="true"></i> LIVE</span>
              </div>
              <div className="dash__body">
                <div className="dash__market">
                  <div className="dash__market-head">
                    <span className="dash__market-name">Bitcoin <small>BTC/USD</small></span>
                    <span className="dash__market-price" id="dash-btc-big"></span>
                    <span className="dash__market-chg" id="dash-btc-big-chg"></span>
                  </div>
                  <div className="dash__chart" id="dash-chart">
                    <p className="ticker__loading">Loading 7-day chart&hellip;</p>
                  </div>
                  <ul className="dash__stats">
                    <li><span>24h High</span><strong id="dash-btc-high"></strong></li>
                    <li><span>24h Low</span><strong id="dash-btc-low"></strong></li>
                    <li><span>24h Volume</span><strong id="dash-btc-vol"></strong></li>
                  </ul>
                </div>

                <ul className="dash__coins">
                  <li className="dash__coin" data-coin="bitcoin">
                    <i className="coin-dot coin-dot--btc" aria-hidden="true"></i>
                    <span className="dash__coin-sym">BTC</span>
                    <span className="dash__coin-price" id="dash-btc-price"></span>
                    <span className="dash__coin-chg" id="dash-btc-chg"></span>
                  </li>
                  <li className="dash__coin" data-coin="ethereum">
                    <i className="coin-dot coin-dot--eth" aria-hidden="true"></i>
                    <span className="dash__coin-sym">ETH</span>
                    <span className="dash__coin-price" id="dash-eth-price"></span>
                    <span className="dash__coin-chg" id="dash-eth-chg"></span>
                  </li>
                  <li className="dash__coin" data-coin="solana">
                    <i className="coin-dot coin-dot--sol" aria-hidden="true"></i>
                    <span className="dash__coin-sym">SOL</span>
                    <span className="dash__coin-price" id="dash-sol-price"></span>
                    <span className="dash__coin-chg" id="dash-sol-chg"></span>
                  </li>
                </ul>
                <p className="dash__foot">Prices &amp; chart are live, refreshed every 60 seconds</p>
              </div>
            </div>

            {/* Floating accent cards */}
            <div className="float-card float-card--signal" aria-hidden="true">
              <span className="float-card__icon">
                <svg viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <div>
                <strong>AI Signal</strong>
                <small>Bullish momentum detected</small>
              </div>
            </div>

            <div className="float-card float-card--secure" aria-hidden="true">
              <span className="float-card__icon">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <div>
                <strong>2FA Secured</strong>
                <small>Account protected</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Live ticker strip ===== */}
      <div className="ticker-strip">
        <div className="container ticker-wrap" aria-label="Live cryptocurrency prices">
          <span className="ticker-strip__tag">LIVE</span>
          <div className="ticker" id="ticker">
            <p className="ticker__loading">Loading live prices&hellip;</p>
          </div>
        </div>
      </div>

      {/* ===== Stats ===== */}
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
            <span className="stat__label">Hidden fees, ever</span>
          </div>
          <div className="stat">
            <span className="stat__num" data-count="99.9" data-suffix="%">99.9%</span>
            <span className="stat__label">Platform uptime</span>
          </div>
        </div>
      </section>

      {/* ===== Live markets ===== */}
      <section className="section" id="markets">
        <div className="container">
          <div className="section__head">
            <div>
              <p className="section-label">Live Markets</p>
              <h2 className="section__title">Track prices across 60+ cryptocurrencies</h2>
            </div>
            <p className="section__aside">Real market data from the CoinGecko public API, updated every 60 seconds.</p>
          </div>

          <div className="markets" id="markets-body" aria-label="Live cryptocurrency prices">
            <p className="markets__loading">Loading live market data&hellip;</p>
          </div>
          <p className="markets__source">Data by CoinGecko public API &middot; prices may be delayed</p>
        </div>
      </section>

      {/* ===== How it works ===== */}
      <section className="section section--tint" id="how-it-works">
        <div className="container">
          <div className="section__head section__head--center">
            <div>
              <p className="section-label">How It Works</p>
              <h2 className="section__title">From sign-up to first trade in four steps</h2>
            </div>
          </div>

          <ol className="steps">
            <li className="step reveal">
              <span className="step__num">1</span>
              <span className="step__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" /></svg>
              </span>
              <h3 className="step__title">Create your free account</h3>
              <p className="step__text">Sign up with your email in minutes. No credit card required to explore the platform.</p>
            </li>
            <li className="step reveal">
              <span className="step__num">2</span>
              <span className="step__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <h3 className="step__title">Fund your wallet securely</h3>
              <p className="step__text">Deposit with your preferred payment method and set a budget you&rsquo;re comfortable with.</p>
            </li>
            <li className="step reveal">
              <span className="step__num">3</span>
              <span className="step__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 1010 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M12 7v5l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <h3 className="step__title">Activate AI strategies</h3>
              <p className="step__text">Choose a strategy that matches your goals and risk level, the engine handles the rest.</p>
            </li>
            <li className="step reveal">
              <span className="step__num">4</span>
              <span className="step__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M3 17l5-5 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M14 8h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <h3 className="step__title">Track &amp; grow</h3>
              <p className="step__text">Monitor performance in real time from your dashboard and withdraw whenever you like.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* ===== Features (bento grid) ===== */}
      <section className="section" id="features">
        <div className="container">
          <div className="section__head">
            <div>
              <p className="section-label">Features</p>
              <h2 className="section__title">Everything a modern trader needs</h2>
            </div>
            <a className="btn btn--ghost features__btn" href="/sign-up">Get Started &rarr;</a>
          </div>

          <div className="bento">
            <article className="bento__card reveal">
              <span className="bento__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M3 17l5-5 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M14 8h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <h3 className="bento__title">Real-time market insights</h3>
              <p>Live prices, trends and 7-day sparklines for 60+ coins, refreshed every 60 seconds.</p>
            </article>

            <article className="bento__card reveal">
              <span className="bento__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <h3 className="bento__title">AI-powered strategies</h3>
              <p className="bento__text">Automated strategies that watch the market 24/7 and act on signals, without the emotions.</p>
            </article>

            <article className="bento__card reveal">
              <span className="bento__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <h3 className="bento__title">Bank-grade security</h3>
              <p className="bento__text">2FA, encryption and cold storage keep your account and funds protected around the clock.</p>
            </article>

            <article className="bento__card reveal">
              <span className="bento__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" /><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <h3 className="bento__title">Fast withdrawals</h3>
              <p className="bento__text">Request a payout anytime, most withdrawals are processed within 24 hours.</p>
            </article>

            <article className="bento__card reveal">
              <span className="bento__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M4 13a8 8 0 0116 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><rect x="3" y="13" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="2" /><rect x="17" y="13" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="2" /></svg>
              </span>
              <h3 className="bento__title">24/7 human support</h3>
              <p className="bento__text">Real people on standby around the clock, whenever you need a hand, we&rsquo;re there.</p>
            </article>

            <article className="bento__card reveal">
              <span className="bento__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <h3 className="bento__title">Transparent pricing</h3>
              <p className="bento__text">Simple, published fees on every transaction. No hidden charges, ever.</p>
            </article>
          </div>

          {/* Shown on mobile/tablet only - the same CTA, below the cards */}
          <div className="features__action">
            <a className="btn btn--ghost" href="/sign-up">Get Started &rarr;</a>
          </div>
        </div>
      </section>

      {/* ===== Security ===== */}
      <section className="section section--tint" id="security">
        <div className="container security">
          <div className="security__copy">
            <p className="section-label">Security First</p>
            <h2 className="section__title">Your security is our top priority</h2>
            <p className="security__lead">We protect your account at every layer, from login to storage, using the same standards trusted by leading financial institutions.</p>

            <ul className="security__list">
              <li className="reveal">
                <span className="security__check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                <div>
                  <h3>256-bit encryption</h3>
                  <p>All data in transit and at rest is encrypted to industry standards.</p>
                </div>
              </li>
              <li className="reveal">
                <span className="security__check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                <div>
                  <h3>Two-factor authentication</h3>
                  <p>An extra verification layer on every login and withdrawal.</p>
                </div>
              </li>
              <li className="reveal">
                <span className="security__check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                <div>
                  <h3>Cold storage for funds</h3>
                  <p>The majority of assets are held offline, away from online threats.</p>
                </div>
              </li>
              <li className="reveal">
                <span className="security__check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                <div>
                  <h3>24/7 threat monitoring</h3>
                  <p>Automated systems watch for suspicious activity day and night.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="security__visual reveal">
            <div className="status-card">
              <div className="status-card__head">
                <span className="status-card__title">System Status</span>
                <span className="status-card__live"><i aria-hidden="true"></i> LIVE</span>
              </div>
              <ul className="status-card__rows">
                <li><span>All systems operational</span><span className="status-ok"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span></li>
                <li><span>Two-factor authentication</span><span className="status-ok">Enabled</span></li>
                <li><span>Funds in cold storage</span><span className="status-ok">Secured</span></li>
                <li><span>Last security audit</span><span className="status-muted">This quarter</span></li>
              </ul>
              <div className="status-card__shield" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section" id="faq">
        <div className="container container--narrow">
          <div className="section__head section__head--center">
            <div>
              <p className="section-label">FAQ</p>
              <h2 className="section__title">Frequently asked questions</h2>
            </div>
          </div>

          <div className="faq">
            <div className="faq__item reveal">
              <button className="faq__question" aria-expanded="false">
                What is Larch Vaultmere?
                <span className="faq__icon" aria-hidden="true"></span>
              </button>
              <div className="faq__answer"><p>Larch Vaultmere is a crypto trading platform that combines real-time market data with AI-powered strategies, helping you make informed decisions without watching charts all day.</p></div>
            </div>

            <div className="faq__item reveal">
              <button className="faq__question" aria-expanded="false">
                Is Larch Vaultmere suitable for beginners?
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
              <div className="faq__answer"><p>Security is our top priority: 256-bit encryption, two-factor authentication, cold storage for the majority of funds, and 24/7 threat monitoring.</p></div>
            </div>

            <div className="faq__item reveal">
              <button className="faq__question" aria-expanded="false">
                Do you guarantee profits?
                <span className="faq__icon" aria-hidden="true"></span>
              </button>
              <div className="faq__answer"><p>No, and you should be wary of any platform that does. Crypto trading involves real risk, and no tool can guarantee returns. Trade only what you can afford to lose.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Get Started / Sign-up ===== */}
      <section className="cta-section" id="get-started">
        <div className="container signup-grid">
          <div className="reveal">
            <p className="section-label">Get Started</p>
            <h2 className="auth__side-title">Ready to take your trading to the next level?</h2>
            <p className="auth__side-text">Create your free account in minutes and explore live markets, AI strategies and bank-grade security, no credit card required.</p>

            <ul className="auth__benefits">
              <li className="auth__benefit">
                <span className="auth__benefit-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M3 17l5-5 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M14 8h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <div>
                  <h3>Live market data</h3>
                  <p>Real prices, trends and 7-day charts for 60+ coins, refreshed every 60 seconds.</p>
                </div>
              </li>
              <li className="auth__benefit">
                <span className="auth__benefit-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <div>
                  <h3>AI-powered strategies</h3>
                  <p>Automated strategies that watch the market 24/7 and act on signals.</p>
                </div>
              </li>
              <li className="auth__benefit">
                <span className="auth__benefit-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <div>
                  <h3>Bank-grade security</h3>
                  <p>2FA, encryption and cold storage keep your funds protected.</p>
                </div>
              </li>
              <li className="auth__benefit">
                <span className="auth__benefit-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M4 13a8 8 0 0116 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><rect x="3" y="13" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="2" /><rect x="17" y="13" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="2" /></svg>
                </span>
                <div>
                  <h3>24/7 human support</h3>
                  <p>Real people on standby around the clock whenever you need help.</p>
                </div>
              </li>
            </ul>

            <ul className="signup-trust" aria-label="Platform guarantees">
              <li className="signup-trust__chip"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg> No hidden fees</li>
              <li className="signup-trust__chip"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg> Withdraw anytime</li>
              <li className="signup-trust__chip"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg> 2FA secured</li>
            </ul>
          </div>

          <div className="auth__form-card form-card--accent reveal">
            <h2 className="auth__form-title">Open Your Larch Vaultmere Account</h2>
            <p className="auth__form-sub">Free to join &middot; takes less than 2 minutes</p>

            <SignupForm prefix="home" errorId="home-signup-error" />
          </div>
        </div>
      </section>
    </>
  );
}
