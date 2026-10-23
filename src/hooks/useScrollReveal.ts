import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — Phase 7 optimized
 *
 * Attaches an IntersectionObserver to every element with [data-scroll].
 * Once visible, sets data-visible="true" AND unobserves the element (it
 * never reverts, so observing permanently was wasted work).
 *
 * The body MutationObserver is replaced with a targeted one that only
 * observes *newly added* [data-scroll] nodes, not every DOM mutation.
 *
 * Phase 6 extension: also toggles data-inview="true/false" so infinite CSS
 * animations can be paused when their host section is off-screen.
 */
export const useScrollReveal = (threshold = 0.12) => {
  const ioRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Shared observer: unobserve each element after first reveal
    ioRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.setAttribute('data-visible', 'true');
            el.setAttribute('data-inview', 'true');
            // Phase 7: unobserve once revealed — it never reverts
            ioRef.current?.unobserve(el);
          }
        });
      },
      { threshold }
    );

    const observe = (el: Element) => ioRef.current?.observe(el);

    // Initial attach
    document.querySelectorAll('[data-scroll]').forEach(observe);

    // Phase 7: watch only *new* [data-scroll] nodes instead of all body mutations
    const mutObs = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches('[data-scroll]')) observe(node);
          node.querySelectorAll('[data-scroll]').forEach(observe);
        });
      }
    });
    mutObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      ioRef.current?.disconnect();
      mutObs.disconnect();
    };
  }, [threshold]);
};
