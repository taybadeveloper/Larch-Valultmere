"use client";

import { useEffect, useRef, useState } from "react";
import { initPhone } from "./phone";

export default function SignupForm({ prefix = "signup", errorId = "signup-error" }) {
  const [error, setError] = useState("");
  const itiRef = useRef(null);

  // intl-tel-input is loaded from a CDN, so it arrives after hydration.
  useEffect(() => {
    const input = document.getElementById(`${prefix}-phone`);
    if (!input) return;
    return initPhone(input, (instance) => {
      itiRef.current = instance;
    });
  }, [prefix]);

  const handleSubmit = (e) => {
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
    const phoneDigits = phoneValue.replace(/\D/g, "");

    let message = "";
    if (!first) message = "First name is required";
    else if (!last) message = "Last name is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) message = "Enter a valid email address";
    else if (phoneDigits.length < 7) message = "Enter a valid phone number";

    if (message) {
      setError(message);
      return;
    }

    setError("");

    // Demo flow: send the visitor to the thank-you page with their first name.
    // TODO: replace with a real API call that creates the account.
    window.location.href = `/thank-you?name=${encodeURIComponent(first)}`;
  };

  return (
    <form id={`${prefix}-form`} className="form" noValidate onSubmit={handleSubmit}>
      <div className="form__row">
        <div className="form-field">
          <label className="form-label" htmlFor={`${prefix}-first`}>First name</label>
          <input className="form-input" type="text" id={`${prefix}-first`} name="firstName" placeholder="e.g. Ali" autoComplete="given-name" required />
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor={`${prefix}-last`}>Last name</label>
          <input className="form-input" type="text" id={`${prefix}-last`} name="lastName" placeholder="e.g. Khan" autoComplete="family-name" required />
        </div>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor={`${prefix}-email`}>Email</label>
        <input className="form-input" type="email" id={`${prefix}-email`} name="email" placeholder="you@example.com" autoComplete="email" required />
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor={`${prefix}-phone`}>Phone</label>
        <input className="form-input" type="tel" id={`${prefix}-phone`} name="phone" placeholder="300 1234567" autoComplete="tel" required />
      </div>

      {/* Honeypot - hidden from humans, catches spam bots */}
      <div className="form__honey" aria-hidden="true">
        <label htmlFor={`${prefix}-company`}>Leave this field empty</label>
        <input type="text" id={`${prefix}-company`} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <p className={`form-error${error ? " show" : ""}`} id={errorId} role="alert">{error}</p>

      <button className="btn btn--gold btn--lg" type="submit" style={{ width: "100%" }}>Create Your Account</button>
      <p className="form-note">Protected by 2FA and 256-bit SSL encryption</p>
    </form>
  );
}
