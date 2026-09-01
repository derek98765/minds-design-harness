import { useEffect, useRef } from "react";

/**
 * Adds scroll-triggered reveal animations via IntersectionObserver.
 *
 * Mark children with data-reveal (optionally data-delay="150" etc.).
 * Returns a ref to attach to the section container.
 *
 * Variant classes (add to data-reveal element):
 *   fade-up        — default: fade + slide up 14px
 *   fade-up-scale  — fade + slide + slight scale
 *   fade-up-soft   — gentler, 8px lift
 */
export function useScrollReveal({ threshold = 0.12 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const elements = container.querySelectorAll("[data-reveal]");
    if (!elements.length) return;

    // Wrap in reveal-ready so CSS rules set the initial hidden state
    container.classList.add("reveal-ready");

    elements.forEach((el) => {
      const variant = el.dataset.reveal || "fade-up";
      el.classList.add(variant);
      el.style.willChange = "opacity, transform";
      const delay = el.dataset.delay ? `${el.dataset.delay}ms` : "0ms";
      el.style.animationDelay = delay;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.classList.add("is-visible");
          observer.unobserve(el);
        });
      },
      { threshold }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
