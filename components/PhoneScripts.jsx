import Script from "next/script";

/* intl-tel-input scripts are only needed on pages with a phone field
   (sign-up, contact). lazyOnload fetches and parses them when the browser
   is idle, keeping the heavy utils bundle off the load-time main thread. */
export default function PhoneScripts() {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/intl-tel-input@29.5.1/dist/js/data.min.js" strategy="lazyOnload" />
      <Script src="https://cdn.jsdelivr.net/npm/intl-tel-input@29.5.1/dist/js/intlTelInputWithUtils.min.js" strategy="lazyOnload" />
    </>
  );
}
