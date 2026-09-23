/* Maps the visitor's browser language to a country code (fallback for geoIP) */
export function countryFromLanguage() {
  const lang = (navigator.language || "en-US").split("-").pop().toLowerCase();
  return /^[a-z]{2}$/.test(lang) ? lang : "us";
}

/* Number of digits a complete national number has in the selected country,
   i.e. how many digits the user is expected to type. Built from the
   country's example number (e.g. "301 2345678" for Pakistan); countries
   whose national numbers include the national prefix when dialed locally
   (Pakistan: "0301 2345678") get the prefix added. NANP countries (dial
   code 1) type without their trunk prefix, so they stay unchanged. */
function countryDigitCount(instance) {
  try {
    const utils = window.intlTelInput.utils;
    const { iso2, dialCode, nationalPrefix } = instance.getSelectedCountry();
    const example =
      utils.getExampleNumber(iso2, "MOBILE") ||
      utils.getExampleNumber(iso2, "FIXED_LINE") ||
      "";
    const exampleDigits = example.replace(/\D/g, "").length;
    if (!exampleDigits) return null;
    const prefix = nationalPrefix || "";
    const compact = example.replace(/[\s().-]/g, "");
    if (prefix && dialCode !== "1" && !compact.startsWith(prefix)) {
      return exampleDigits + prefix.length;
    }
    return exampleDigits;
  } catch {
    return null;
  }
}

/* National digits currently in the input (dial code excluded) */
function getNationalDigits(input, instance) {
  const digits = (input.value || "").replace(/\D/g, "");
  const dial = String(instance.getSelectedCountry().dialCode || "");
  // In international typing mode the visible value starts with the dial code.
  return digits.startsWith(dial) ? digits.slice(dial.length) : digits;
}

/* Trims the input back to the selected country's digit count while typing,
   so users can't enter more digits than the country allows. */
function enforceDigits(input, instance) {
  const max = countryDigitCount(instance);
  if (!max) return;
  const national = getNationalDigits(input, instance);
  if (national.length > max) {
    const { dialCode } = instance.getSelectedCountry();
    // setNumber with the full international number re-formats for the
    // selected country and follows the dial code if the country differs.
    instance.setNumber(`+${dialCode}${national.slice(0, max)}`);
  }
}

/* Validation message for a phone field, or "" when it's valid.
   Uses utils' per-country length + format rules when available. */
export function phoneError(instance, input) {
  const digits = (input.value || "").replace(/\D/g, "");
  if (!digits) return "Phone number is required";
  if (instance && typeof instance.isValidNumber === "function") {
    if (instance.isValidNumber()) return "";
    const max = countryDigitCount(instance);
    const country = instance.getSelectedCountry().name;
    return max
      ? `Enter the full ${max}-digit number for ${country}`
      : "Enter a valid phone number";
  }
  // utils didn't load - fall back to a basic digit check
  return digits.length >= 7 ? "" : "Enter a valid phone number";
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
      // Keep the input within the selected country's digit count.
      input.addEventListener("input", () => enforceDigits(input, instance));
      input.addEventListener("countrychange", () => enforceDigits(input, instance));
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
