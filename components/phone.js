/* Maps the visitor's browser language to a country code (fallback for geoIP) */
export function countryFromLanguage() {
  const lang = (navigator.language || "en-US").split("-").pop().toLowerCase();
  return /^[a-z]{2}$/.test(lang) ? lang : "us";
}

/* Initializes intl-tel-input on an input. Polls for the CDN script (it loads
   after hydration) and returns a cleanup function. Falls back to a plain
   input if the CDN never loads. */
export function initPhone(input, onReady) {
  let instance = null;
  let tries = 0;
  let done = false;
  const attempt = () => {
    if (done) return;
    if (window.intlTelInput && input) {
      instance = window.intlTelInput(input, {
        initialCountryLookup: () =>
          fetch("https://ipwho.is/")
            .then((res) => res.json())
            .then((data) =>
              data && data.success && data.country_code
                ? data.country_code.toLowerCase()
                : countryFromLanguage()
            )
            .catch(() => countryFromLanguage()),
        preferredCountries: ["us", "gb", "au", "pk", "ae", "sa"],
        autoPlaceholder: "aggressive",
      });
      done = true;
      onReady(instance);
    } else if (++tries > 100) {
      done = true;
      onReady(null);
    }
  };
  attempt();
  const id = setInterval(attempt, 200);
  return () => {
    done = true;
    clearInterval(id);
    if (instance) instance.destroy();
  };
}
