"use client";

import { useEffect, useRef, useState } from "react";
import { initPhone, phoneError } from "./phone";
import { submitLead } from "./mailAction";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupForm({ prefix = "signup", errorId = "signup-error" }) {
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const itiRef = useRef(null);

  // intl-tel-input is loaded from a CDN, so it arrives after hydration.
  useEffect(() => {
    const input = document.getElementById(`${prefix}-phone`);
    if (!input) return;
    return initPhone(input, (instance) => {
      itiRef.current = instance;
    });
  }, [prefix]);

  const clearFieldError = (field) => {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: "" } : prev));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Honeypot: if the hidden field was filled, it's a bot - pretend success
    const honeypot = document.getElementById(`${prefix}-company`);
    if (honeypot && honeypot.value) {
      form.reset();
      itiRef.current?.setNumber("");
      return;
    }

    const first = document.getElementById(`${prefix}-first`).value.trim();
    const last = document.getElementById(`${prefix}-last`).value.trim();
    const email = document.getElementById(`${prefix}-email`).value.trim();
    const phoneInput = document.getElementById(`${prefix}-phone`);
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
      // Move focus to the first invalid field.
      const firstInvalid = ["first", "last", "email", "phone"].find((f) => next[f]);
      const el = document.getElementById(`${prefix}-${firstInvalid}`);
      el?.focus();
      return;
    }

    setErrors({});
    setSubmitting(true);

    // Send the lead to the backend; on success move to the thank-you page.
    const result = await submitLead({
      firstName: first,
      lastName: last,
      email,
      phone: phoneValue,
    });
    setSubmitting(false);

    if (!result.ok) {
      setErrors({ form: result.message });
      return;
    }

    window.location.href = `/thank-you?name=${encodeURIComponent(first)}`;
  };

  return (
    <form id={`${prefix}-form`} className="form" noValidate onSubmit={handleSubmit}>
      <div className="form__row">
        <div className="form-field">
          <label className="form-label" htmlFor={`${prefix}-first`}>First name</label>
          <input
            className="form-input"
            type="text"
            id={`${prefix}-first`}
            name="firstName"
            placeholder="e.g. Ali"
            autoComplete="given-name"
            required
            aria-invalid={errors.first ? "true" : undefined}
            aria-describedby={errors.first ? `${prefix}-first-error` : undefined}
            onChange={() => clearFieldError("first")}
          />
          {errors.first && <span className="field-error" id={`${prefix}-first-error`}>{errors.first}</span>}
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor={`${prefix}-last`}>Last name</label>
          <input
            className="form-input"
            type="text"
            id={`${prefix}-last`}
            name="lastName"
            placeholder="e.g. Khan"
            autoComplete="family-name"
            required
            aria-invalid={errors.last ? "true" : undefined}
            aria-describedby={errors.last ? `${prefix}-last-error` : undefined}
            onChange={() => clearFieldError("last")}
          />
          {errors.last && <span className="field-error" id={`${prefix}-last-error`}>{errors.last}</span>}
        </div>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor={`${prefix}-email`}>Email</label>
        <input
          className="form-input"
          type="email"
          id={`${prefix}-email`}
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          aria-invalid={errors.email ? "true" : undefined}
          aria-describedby={errors.email ? `${prefix}-email-error` : undefined}
          onChange={() => clearFieldError("email")}
        />
        {errors.email && <span className="field-error" id={`${prefix}-email-error`}>{errors.email}</span>}
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor={`${prefix}-phone`}>Phone</label>
        <input
          className="form-input"
          type="tel"
          id={`${prefix}-phone`}
          name="phone"
          autoComplete="tel"
          required
          aria-invalid={errors.phone ? "true" : undefined}
          aria-describedby={errors.phone ? `${prefix}-phone-error` : undefined}
          onChange={() => clearFieldError("phone")}
        />
        {errors.phone && <span className="field-error" id={`${prefix}-phone-error`}>{errors.phone}</span>}
      </div>

      {/* Honeypot - hidden from humans, catches spam bots */}
      <div className="form__honey" aria-hidden="true">
        <label htmlFor={`${prefix}-company`}>Leave this field empty</label>
        <input type="text" id={`${prefix}-company`} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <p className={`form-error${errors.form ? " show" : ""}`} id={errorId} role="alert">{errors.form}</p>

      <button className="btn btn--gold btn--lg" type="submit" style={{ width: "100%" }} disabled={submitting}>
        {submitting ? "Creating Account…" : "Create Your Account"}
      </button>
      <p className="form-note">Protected by 2FA and 256-bit SSL encryption</p>
    </form>
  );
}
