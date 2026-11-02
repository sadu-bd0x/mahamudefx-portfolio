"use client";

import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const parallaxElements = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      document.documentElement.classList.remove("motion-ready");
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute("data-reveal-delay");
          if (delay) {
            window.setTimeout(() => entry.target.classList.add("is-visible"), Number(delay));
          } else {
            entry.target.classList.add("is-visible");
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -48px 0px" });

    elements.forEach((element) => observer.observe(element));
    document.documentElement.classList.add("motion-ready");

    let raf = 0;
    const updateParallax = () => {
      raf = 0;
      for (const element of parallaxElements) {
        const rect = element.getBoundingClientRect();
        const speed = Number(element.dataset.parallax || 0.08);
        const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
        const shift = Math.max(Math.min(centerOffset * -speed, 26), -26);
        element.style.setProperty("--parallax-shift", `${shift.toFixed(2)}px`);
      }
    };

    const requestTick = () => {
      if (!raf) raf = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
      if (raf) window.cancelAnimationFrame(raf);
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
