"use client";

import { useEffect } from "react";

/*
 * Global page effects, ports of the original js/main.js:
 * reveal-on-scroll, count-up stats and the FAQ accordion.
 * Renders nothing; runs observers over the page's DOM exactly like the
 * original script did on every page.
 */
export default function PageEffects() {
  useEffect(() => {
    const $ = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

    /* ---------- Count-up stats ---------- */
    function countUp(el) {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const decimals = (target.toString().split(".")[1] || "").length;
      const duration = 1200;
      const start = performance.now();

      function frame(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        const value = target * eased;
        el.textContent =
          (decimals ? value.toFixed(decimals) : Math.round(value).toString()) + suffix;
        if (t < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            countUp(entry.target);
            countObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    $$("[data-count]").forEach((el) => countObserver.observe(el));

    /* ---------- Reveal on scroll ---------- */
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    $$(".reveal").forEach((el) => revealObserver.observe(el));

    /* ---------- FAQ accordion, one open at a time ---------- */
    const faqHandlers = [];
    $$(".faq__item").forEach((item) => {
      const question = $(".faq__question", item);
      if (!question) return;
      const onClick = () => {
        const isOpen = item.classList.contains("open");
        $$(".faq__item.open").forEach((openItem) => {
          openItem.classList.remove("open");
          $(".faq__question", openItem).setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("open");
          question.setAttribute("aria-expanded", "true");
        }
      };
      question.addEventListener("click", onClick);
      faqHandlers.push([question, onClick]);
    });

    return () => {
      countObserver.disconnect();
      revealObserver.disconnect();
      faqHandlers.forEach(([question, onClick]) => question.removeEventListener("click", onClick));
    };
  }, []);

  return null;
}
