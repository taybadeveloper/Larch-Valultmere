import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Terms of Use",
  description:
    "The terms and conditions that govern your use of the Larch Vaultmere platform.",
};

export default function TermsOfUsePage() {
  return (
    <>
      {/* ===== Page hero ===== */}
      <PageHero label="Legal" title="Terms of Use">
        <p className="page-hero__sub">The terms and conditions that govern your use of the <strong>Larch Vaultmere</strong> platform.</p>
      </PageHero>

      {/* ===== Terms ===== */}
      <section className="section">
        <div className="container">
          <div className="prose">
            <p className="prose__updated">Last updated: September 2026</p>

            <section>
              <h2>1. Acceptance of these terms</h2>
              <p>By accessing or using the <strong>Larch Vaultmere</strong> website and platform (&ldquo;the Service&rdquo;), you agree to be bound by these Terms of Use. If you do not agree, please do not use the Service.</p>
            </section>

            <section>
              <h2>2. Eligibility</h2>
              <p>You must be at least 18 years old and legally able to enter into a contract to use the Service. You are responsible for ensuring that using the Service is legal in your jurisdiction.</p>
            </section>

            <section>
              <h2>3. Your account</h2>
              <ul>
                <li>You must provide accurate information when registering and keep it up to date.</li>
                <li>You are responsible for keeping your login credentials and 2FA devices secure.</li>
                <li>You must notify us immediately if you suspect unauthorized access to your account.</li>
                <li>You may not use the Service for any unlawful purpose, including money laundering or fraud.</li>
              </ul>
            </section>

            <section>
              <h2>4. Use of the platform</h2>
              <p>The Service provides market data, trading tools and automated strategies. You are solely responsible for your trading decisions and for any trades you make.</p>
              <div className="callout">
                <p><strong>Important:</strong> Crypto trading involves significant risk. You may lose some or all of your funds. Please read our <a href="/risk-disclosure" style={{ color: "var(--gold)", textDecoration: "underline", textUnderlineOffset: "2px" }}>Risk Disclosure</a> before trading.</p>
              </div>
            </section>

            <section>
              <h2>5. Fees</h2>
              <p>Fees for using the Service are published on the platform and shown before you confirm each transaction. We may update fees from time to time with reasonable notice.</p>
            </section>

            <section>
              <h2>6. Intellectual property</h2>
              <p>All content on this website, including text, graphics, logos, and software, is the property of <strong>Larch Vaultmere</strong> or its licensors and is protected by intellectual property laws. You may not copy, modify or redistribute it without written permission.</p>
            </section>

            <section>
              <h2>7. No financial advice</h2>
              <p>Nothing on this website or platform is financial, investment or legal advice. Any information provided is for educational purposes only. You should do your own research and, where appropriate, consult a licensed financial advisor.</p>
            </section>

            <section>
              <h2>8. Limitation of liability</h2>
              <p>To the maximum extent permitted by law, <strong>Larch Vaultmere</strong> shall not be liable for any indirect, incidental or consequential losses arising from your use of the Service, including losses from market movements, technical issues, or your own trading decisions.</p>
            </section>

            <section>
              <h2>9. Changes to these terms</h2>
              <p>We may update these terms from time to time. Continued use of the Service after changes are posted means you accept the revised terms.</p>
            </section>

            <section>
              <h2>10. Contact</h2>
              <p>Questions about these terms? Email us at <a href="mailto:hello@larch-vaultmere.com" style={{ color: "var(--gold)", textDecoration: "underline", textUnderlineOffset: "2px" }}>hello@larch-vaultmere.com</a> or use our <a href="/contact-us" style={{ color: "var(--gold)", textDecoration: "underline", textUnderlineOffset: "2px" }}>contact form</a>.</p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
