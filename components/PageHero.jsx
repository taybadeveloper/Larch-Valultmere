export default function PageHero({ label, title, children }) {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="section-label">{label}</p>
        <h1 className="page-hero__title">{title}</h1>
        {children}
      </div>
    </section>
  );
}
