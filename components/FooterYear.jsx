"use client";

import { useEffect, useRef } from "react";

export default function FooterYear() {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.textContent = new Date().getFullYear();
  }, []);

  return <span id="footer-year" ref={ref}></span>;
}
