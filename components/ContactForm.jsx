"use client";

import { useEffect, useRef, useState } from "react";
import { initPhone, phoneError } from "./phone";
import { submitLead } from "./mailAction";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const itiRef = useRef(null);

  // intl-tel-input is loaded from a CDN, so it arrives after hydration.
  useEffect(() => {
    const input = document.getElementById("contact-phone");
    if (!input) return;
    return initPhone(input, (instance) => {
      itiRef.current = instance;
    });
  }, []);

  const clearFieldError = (field) => {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: "" } : prev));
  };

  const handleSubmit = async (e) => {
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

    const next = {};
    if (!first) next.first = "First name is required";
    if (!last) next.last = "Last name is required";
    if (!email) next.email = "Email is required";
    else if (!EMAIL_RE.test(email)) next.email = "Enter a valid email address";
    const phoneMessage = phoneError(itiRef.current, phoneInput);
    if (phoneMessage) next.phone = phoneMessage;

    if (Object.keys(next).length) {
      setErrors(next);
      setSuccess("");
      // Move focus to the first invalid field.
      const firstInvalid = ["first", "last", "email", "phone"].find((f) => next[f]);
      const el = document.getElementById(`contact-${firstInvalid}`);
      el?.focus();
      return;
    }

    setErrors({});
    setSubmitting(true);

    // Send the lead to the backend mail endpoint.
    const result = await submitLead({
      firstName: first,
      lastName: last,
      email,
      phone: phoneValue,
    });
    setSubmitting(false);

    if (!result.ok) {
      setSuccess("");
      setErrors({ form: result.message });
      return;
    }

    setSuccess(`Thanks ${first} — your message has been received! We'll get back to you soon.`);
    form.reset();
    itiRef.current?.setNumber("");
  };

  return (
    <form id="contact-form" className="form" noValidate onSubmit={handleSubmit}>
      <div className="form__row">
        <div className="form-field">
          <label className="form-label" htmlFor="contact-first">First name</label>
          <input
            className="form-input"
            type="text"
            id="contact-first"
            name="firstName"
            placeholder="e.g. Ali"
            autoComplete="given-name"
            required
            aria-invalid={errors.first ? "true" : undefined}
            aria-describedby={errors.first ? "contact-first-error" : undefined}
            onChange={() => clearFieldError("first")}
          />
          {errors.first && <span className="field-error" id="contact-first-error">{errors.first}</span>}
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="contact-last">Last name</label>
          <input
            className="form-input"
            type="text"
            id="contact-last"
            name="lastName"
            placeholder="e.g. Khan"
            autoComplete="family-name"
            required
            aria-invalid={errors.last ? "true" : undefined}
            aria-describedby={errors.last ? "contact-last-error" : undefined}
            onChange={() => clearFieldError("last")}
          />
          {errors.last && <span className="field-error" id="contact-last-error">{errors.last}</span>}
        </div>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="contact-email">Email</label>
        <input
          className="form-input"
          type="email"
          id="contact-email"
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          aria-invalid={errors.email ? "true" : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          onChange={() => clearFieldError("email")}
        />
        {errors.email && <span className="field-error" id="contact-email-error">{errors.email}</span>}
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="contact-phone">Phone</label>
        <input
          className="form-input"
          type="tel"
          id="contact-phone"
          name="phone"
          autoComplete="tel"
          required
          aria-invalid={errors.phone ? "true" : undefined}
          aria-describedby={errors.phone ? "contact-phone-error" : undefined}
          onChange={() => clearFieldError("phone")}
        />
        {errors.phone && <span className="field-error" id="contact-phone-error">{errors.phone}</span>}
      </div>

      {/* Honeypot - hidden from humans, catches spam bots */}
      <div className="form__honey" aria-hidden="true">
        <label htmlFor="contact-company">Leave this field empty</label>
        <input type="text" id="contact-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <p className={`form-error${errors.form ? " show" : ""}`} id="contact-error" role="alert">{errors.form}</p>

      <button className="btn btn--gold btn--lg" type="submit" id="contact-submit" style={{ width: "100%" }} disabled={submitting}>
        {submitting ? "Submitting…" : "Send Message"}
      </button>
      <p className={`form-success${success ? " show" : ""}`} id="contact-success" role="status">{success}</p>
      <p className="form-note">Protected by 2FA and 256-bit SSL encryption</p>
    </form>
  );
}
