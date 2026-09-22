"use client";

import { useEffect, useRef } from "react";

export default function ThankYouName() {
  const ref = useRef(null);
  useEffect(() => {
    const name = new URLSearchParams(window.location.search).get("name");
    ref.current.textContent = name ? `, ${name}` : "";
  }, []);
  return <span id="thankyou-name" ref={ref}></span>;
}
