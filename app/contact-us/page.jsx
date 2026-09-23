import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Larch Vaultmere team, questions, feedback or support. Our human support team is available 24/7.",
};

export default function ContactUsPage() {
  return (
    <>
      {/* ===== Page hero ===== */}
      <PageHero label="Contact Us" title="We&rsquo;re here to help">
        <p className="page-hero__sub">Questions, feedback or need a hand with your account? Send us a message, our human support team is available 24/7.</p>
      </PageHero>

      {/* ===== Contact ===== */}
      <section className="section section--tight">
        <div className="container contact-grid">
          <div className="auth__form-card form-card--accent reveal">
            <h2 className="auth__form-title">Email Us Anytime</h2>
            <p className="auth__form-sub">Fill in the form and we&rsquo;ll get back to you within a few hours.</p>

            <ContactForm />
          </div>

          <div className="reveal">
            <div className="contact-info-card">
              <h2 className="contact-info-card__title">Other ways to reach us</h2>
              <ul className="contact-info">
                <li>
                  <span className="contact-info__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M2.5 7.5L12 14l9.5-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <div>
                    <h3>Email us</h3>
                    <p><a href="mailto:hello@larch-valultmere.com" style={{ color: "var(--gold)", textDecoration: "underline", textUnderlineOffset: "2px" }}>hello@larch-valultmere.com</a></p>
                  </div>
                </li>
                <li>
                  <span className="contact-info__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" /><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <div>
                    <h3>Response time</h3>
                    <p>Most messages are answered within a few hours, 24/7.</p>
                  </div>
                </li>
                <li>
                  <span className="contact-info__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M4 13a8 8 0 0116 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><rect x="3" y="13" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="2" /><rect x="17" y="13" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="2" /></svg>
                  </span>
                  <div>
                    <h3>Support hours</h3>
                    <p>Round the clock, real humans, every day of the year.</p>
                  </div>
                </li>
                <li>
                  <span className="contact-info__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8.38 8.38 0 01-8.5 8.5 8.5 8.5 0 01-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 01-.9-3.8 8.38 8.38 0 018.5-8.5 8.38 8.38 0 018.5 8.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <div>
                    <h3>Quick answers</h3>
                    <p>Check the <a href="/faq" style={{ color: "var(--gold)", textDecoration: "underline", textUnderlineOffset: "2px" }}>FAQ page</a>, most questions are answered there instantly.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
