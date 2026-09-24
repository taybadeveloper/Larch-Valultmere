import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How Larch Valultmere collects, uses and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* ===== Page hero ===== */}
      <PageHero label="Legal" title="Privacy Policy">
        <p className="page-hero__sub">How we collect, use and protect your personal information.</p>
      </PageHero>

      {/* ===== Policy ===== */}
      <section className="section">
        <div className="container">
          <div className="prose">
            <p className="prose__updated">Last updated: September 2026</p>

            <section>
              <h2>1. Introduction</h2>
              <p><strong>Larch Valultmere</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) respects your privacy. This policy explains what information we collect when you use our website and platform, why we collect it, and how we keep it safe.</p>
              <p>By using our services, you agree to the practices described in this policy.</p>
            </section>

            <section>
              <h2>2. Information we collect</h2>
              <p>We collect information you provide directly, including:</p>
              <ul>
                <li><strong>Account information</strong>, your name, email address and password when you register.</li>
                <li><strong>Verification information</strong>, documents required to verify your identity where the law requires it.</li>
                <li><strong>Transaction information</strong>, records of deposits, withdrawals and trades made through the platform.</li>
                <li><strong>Communications</strong>, messages you send to our support team.</li>
              </ul>
              <p>We also collect limited technical data automatically, such as browser type, device type and pages visited, to keep the platform secure and working properly.</p>
            </section>

            <section>
              <h2>3. How we use your information</h2>
              <ul>
                <li>To create and manage your account.</li>
                <li>To process deposits, withdrawals and trades.</li>
                <li>To protect against fraud and keep the platform secure.</li>
                <li>To respond to your questions and support requests.</li>
                <li>To meet our legal and regulatory obligations.</li>
                <li>To improve the platform, but never by selling your data.</li>
              </ul>
            </section>

            <section>
              <h2>4. Cookies</h2>
              <p>We use cookies and similar technologies to keep you signed in, remember your preferences and understand how the site is used. You can control cookies through your browser settings; some features may not work correctly if you disable them.</p>
            </section>

            <section>
              <h2>5. Sharing your information</h2>
              <p>We do not sell your personal information. We share it only in these limited cases:</p>
              <ul>
                <li><strong>Service providers</strong>, companies that help us run the platform (payment processors, hosting), bound by contract to protect your data.</li>
                <li><strong>Legal requirements</strong>, where we must comply with the law, regulators or valid legal process.</li>
                <li><strong>Business transfers</strong>, in connection with a merger or acquisition, with notice to you.</li>
              </ul>
            </section>

            <section>
              <h2>6. Security</h2>
              <p>We protect your information with 256-bit encryption, secure infrastructure and strict internal access controls. No method of transmission over the internet is 100% secure, but we work continuously to safeguard your data.</p>
            </section>

            <section>
              <h2>7. Your rights</h2>
              <p>Depending on where you live, you may have the right to access, correct, download or delete your personal information, and to object to certain processing. To exercise any of these rights, contact us at <a href="mailto:hello@larch-valultmere.com" style={{ color: "var(--gold)", textDecoration: "underline", textUnderlineOffset: "2px" }}>hello@larch-valultmere.com</a>.</p>
            </section>

            <section>
              <h2>8. Changes to this policy</h2>
              <p>We may update this policy from time to time. When we do, we&rsquo;ll post the new version on this page and update the date above. Material changes will be announced by email where required.</p>
            </section>

            <section>
              <h2>9. Contact us</h2>
              <p>Questions about this policy? Email us at <a href="mailto:hello@larch-valultmere.com" style={{ color: "var(--gold)", textDecoration: "underline", textUnderlineOffset: "2px" }}>hello@larch-valultmere.com</a> or use our <a href="/contact-us" style={{ color: "var(--gold)", textDecoration: "underline", textUnderlineOffset: "2px" }}>contact form</a>.</p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
