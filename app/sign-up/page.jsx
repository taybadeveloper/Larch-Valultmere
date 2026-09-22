import SignupForm from "@/components/SignupForm";

export const metadata = {
  title: "Sign Up",
  description:
    "Create your free Larch Vaultmere account in minutes — live market data, AI strategies and bank-grade security.",
};

export default function SignUpPage() {
  return (
    <>
      {/* ===== Sign-up ===== */}
      <section className="section">
        <div className="container auth">
          <div className="auth__form-card form-card--accent reveal">
            <h1 className="auth__form-title">Open Your Larch Vaultmere Account</h1>
            <p className="auth__form-sub">Free to join &middot; takes less than 2 minutes</p>

            <SignupForm prefix="signup" errorId="signup-error" />
          </div>

          <div className="reveal">
            <h2 className="auth__side-title">What you unlock with your free account</h2>
            <p className="auth__side-text">Everything you need to start trading smarter — no credit card required.</p>

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
          </div>
        </div>
      </section>
    </>
  );
}
