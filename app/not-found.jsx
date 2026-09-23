import Link from "next/link";

export const metadata = {
  title: "404 | Page Not Found",
  description:
    "The page you're looking for doesn't exist or has been moved.",
};

export default function NotFound() {
  return (
    <>
      {/* ===== 404 ===== */}
      <section className="notfound">
        <div className="container container--narrow">
          <p className="notfound__code" aria-hidden="true">404</p>
          <h1 className="notfound__title">Page not found</h1>
          <p className="notfound__text">
            The page you&rsquo;re looking for doesn&rsquo;t exist or may have
            been moved. Let&rsquo;s get you back on track.
          </p>
          <div className="hero__cta" style={{ justifyContent: "center" }}>
            <Link href="/" className="btn btn--gold btn--lg">Back to Home</Link>
            <Link href="/contact-us" className="btn btn--ghost btn--lg">Contact Support</Link>
          </div>
        </div>
      </section>
    </>
  );
}
