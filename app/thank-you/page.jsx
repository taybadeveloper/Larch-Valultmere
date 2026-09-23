import ThankYouName from "@/components/ThankYouName";

export const metadata = {
  title: "Thank You",
  description:
    "Your Larch Vaultmere sign-up was received. Here's what happens next.",
};

export default function ThankYouPage() {
  return (
    <>
      {/* ===== Thank-you ===== */}
      <section className="thankyou">
        <div className="container container--narrow">
          <div className="thankyou__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>

          <h1 className="thankyou__title">You&rsquo;re on the list<ThankYouName />! 🎉</h1>
          <p className="thankyou__text">Thanks for joining <strong>Larch Vaultmere</strong>. Your account request has been received, here&rsquo;s what happens next on your journey to smarter trading.</p>

          <div className="thankyou__steps">
            <div className="thankyou__step">
              <span className="thankyou__step-num">1</span>
              <h3>Check your email</h3>
              <p>We&rsquo;ve sent you a confirmation link. Click it to verify your email address and activate your account.</p>
            </div>
            <div className="thankyou__step">
              <span className="thankyou__step-num">2</span>
              <h3>Fund your wallet</h3>
              <p>Deposit using your preferred payment method and set a budget you&rsquo;re comfortable with.</p>
            </div>
            <div className="thankyou__step">
              <span className="thankyou__step-num">3</span>
              <h3>Activate AI strategies</h3>
              <p>Pick a strategy that matches your goals and risk level, the engine handles the rest, 24/7.</p>
            </div>
          </div>

          <div className="hero__cta" style={{ justifyContent: "center" }}>
            <a className="btn btn--gold btn--lg" href="/">Back to Home</a>
            <a className="btn btn--ghost btn--lg" href="/contact-us">Contact Support</a>
          </div>
        </div>
      </section>
    </>
  );
}
