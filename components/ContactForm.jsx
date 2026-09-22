"use client";

import { useEffect, useRef, useState } from "react";
import { initPhone } from "./phone";

export default function ContactForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const itiRef = useRef(null);
  const timerRef = useRef(null);

  // intl-tel-input is loaded from a CDN, so it arrives after hydration.
  useEffect(() => {
    const input = document.getElementById("contact-phone");
    if (!input) return;
    return initPhone(input, (instance) => {
      itiRef.current = instance;
    });
  }, []);

  // Drop the demo submission timer if the component unmounts mid-flight.
  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Honeypot: if the hidden field was filled, it's a bot - pretend success
    const honeypot = document.getElementById("contact-company");
    if (honeypot && honeypot.value) {
      form.reset();
      itiRef.current?.setNumber("");
      return;
    }

    const first = document.getElementById("contact-first").value.trim();
    const last = document.getElementById("contact-last").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const phoneInput = document.getElementById("contact-phone");
    const phoneValue = itiRef.current?.getNumber() || phoneInput.value;
    const phoneDigits = phoneValue.replace(/\D/g, "");

    let message = "";
    if (!first) message = "First name is required";
    else if (!last) message = "Last name is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) message = "Enter a valid email address";
    else if (phoneDigits.length < 7) message = "Enter a valid phone number";

    if (message) {
      setError(message);
      setSuccess("");
      return;
    }

    setError("");
    setSubmitting(true);

    // TODO: post { firstName, lastName, email, phone, countryCode } to your
    // backend / email service (e.g. Formspree, EmailJS, or your own API).
    // Until then we simulate a short submission and confirm.
    timerRef.current = setTimeout(() => {
      setSubmitting(false);
      setSuccess(`Thanks ${first} — your message has been received! (Demo: connect a backend to actually send it.)`);
      form.reset();
      itiRef.current?.setNumber("");
    }, 600);
  };

  return (
    <form id="contact-form" className="form" noValidate onSubmit={handleSubmit}>
      <div className="form__row">
        <div className="form-field">
          <label className="form-label" htmlFor="contact-first">First name</label>
          <input className="form-input" type="text" id="contact-first" name="firstName" placeholder="e.g. Ali" autoComplete="given-name" required />
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="contact-last">Last name</label>
          <input className="form-input" type="text" id="contact-last" name="lastName" placeholder="e.g. Khan" autoComplete="family-name" required />
        </div>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="contact-email">Email</label>
        <input className="form-input" type="email" id="contact-email" name="email" placeholder="you@example.com" autoComplete="email" required />
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="contact-phone">Phone</label>
        <input className="form-input" type="tel" id="contact-phone" name="phone" placeholder="300 1234567" autoComplete="tel" required />
      </div>

      {/* Honeypot - hidden from humans, catches spam bots */}
      <div className="form__honey" aria-hidden="true">
        <label htmlFor="contact-company">Leave this field empty</label>
        <input type="text" id="contact-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <p className={`form-error${error ? " show" : ""}`} id="contact-error" role="alert">{error}</p>

      <button className="btn btn--gold btn--lg" type="submit" id="contact-submit" style={{ width: "100%" }} disabled={submitting}>
        {submitting ? "Submitting…" : "Send Message"}
      </button>
      <p className={`form-success${success ? " show" : ""}`} id="contact-success" role="status">{success}</p>
      <p className="form-note">Protected by 2FA and 256-bit SSL encryption</p>
    </form>
  );
}
