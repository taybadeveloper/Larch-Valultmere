import Script from "next/script";

/* intl-tel-input scripts are only needed on pages with a phone field
   (sign-up, contact). Loading them per-page keeps the heavy utils bundle
   off every other page's critical path. */
export default function PhoneScripts() {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/intl-tel-input@29.5.1/dist/js/data.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/intl-tel-input@29.5.1/dist/js/intlTelInputWithUtils.min.js" strategy="afterInteractive" />
    </>
  );
}
