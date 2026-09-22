import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Risk Disclosure",
  description:
    "An honest explanation of the risks involved in cryptocurrency trading. Please read before using the Larch Vaultmere platform.",
};

export default function RiskDisclosurePage() {
  return (
    <>
      {/* ===== Page hero ===== */}
      <PageHero label="Legal" title="Risk Disclosure">
        <p className="page-hero__sub">An honest explanation of the risks involved in cryptocurrency trading. Please read this carefully before using the platform.</p>
      </PageHero>

      {/* ===== Disclosure ===== */}
      <section className="section">
        <div className="container">
          <div className="prose">
            <p className="prose__updated">Last updated: September 2026</p>

            <section>
              <div className="callout">
                <p><strong>Warning:</strong> Trading cryptocurrencies involves a high level of risk and may not be suitable for everyone. You could lose some or all of the money you deposit. Never trade money you cannot afford to lose.</p>
              </div>
            </section>

            <section>
              <h2>1. Market volatility</h2>
              <p>Cryptocurrency prices are extremely volatile. Values can move sharply in either direction within minutes, and past performance is no indication of future results. A strategy that worked yesterday may lose money tomorrow.</p>
            </section>

            <section>
              <h2>2. No guaranteed returns</h2>
              <p>Larch Vaultmere does not guarantee any level of profit or return. No automated tool, AI system or strategy can eliminate the risk of loss. Be deeply suspicious of any platform that promises otherwise.</p>
            </section>

            <section>
              <h2>3. Technology risks</h2>
              <ul>
                <li><strong>Platform availability</strong> — technical issues, maintenance or outages may delay trades or withdrawals.</li>
                <li><strong>Cybersecurity</strong> — while we use bank-grade security, no system connected to the internet is completely immune to attack.</li>
                <li><strong>Network risks</strong> — blockchain network congestion or failures can affect transaction speed and cost.</li>
              </ul>
            </section>

            <section>
              <h2>4. Regulatory risk</h2>
              <p>Laws and regulations affecting cryptocurrencies vary by country and change frequently. New rules could affect the value of digital assets or your ability to trade them. You are responsible for understanding the rules in your jurisdiction.</p>
            </section>

            <section>
              <h2>5. Liquidity risk</h2>
              <p>Some assets may be difficult to sell quickly without affecting their price, particularly during market stress. You may not always be able to exit a position at the price you want.</p>
            </section>

            <section>
              <h2>6. No financial advice</h2>
              <p>Nothing on this website, in our communications or within the platform is financial, investment, legal or tax advice. All information is provided for educational purposes only. You should do your own research and consider consulting a licensed professional.</p>
            </section>

            <section>
              <h2>7. Your responsibility</h2>
              <p>You are solely responsible for your trading decisions. Only trade with money you can afford to lose, diversify where possible, and never invest based on hype or pressure from anyone — including us.</p>
            </section>

            <section>
              <h2>8. Questions</h2>
              <p>If anything in this disclosure is unclear, please <a href="/contact-us" style={{ color: "var(--gold)", textDecoration: "underline", textUnderlineOffset: "2px" }}>contact us</a> before you trade.</p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
