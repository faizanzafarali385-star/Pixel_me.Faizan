import { useEffect, useRef } from 'react';

/**
 * useScrollReveal
 *
 * Attaches an IntersectionObserver to every element with [data-scroll]
 * inside the given root (defaults to document). When an element enters
 * the viewport it gets [data-visible="true"], triggering CSS transitions
 * defined in index.css.
 *
 * Call once at the App level so it watches the whole page.
 */
export const useScrollReveal = (threshold = 0.12) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-visible', 'true');
            // keep observing so glow/float can restart if user scrolls away & back
          }
        });
      },
      { threshold }
    );

    const attach = () => {
      document.querySelectorAll('[data-scroll]').forEach((el) => {
        observerRef.current?.observe(el);
      });
    };

    // initial attach
    attach();

    // re-attach on DOM mutations (e.g. tab switches that add new elements)
    const mutationObs = new MutationObserver(attach);
    mutationObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      observerRef.current?.disconnect();
      mutationObs.disconnect();
    };
  }, [threshold]);
};
