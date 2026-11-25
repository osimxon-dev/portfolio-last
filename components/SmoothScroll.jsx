'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';

/**
 * Smooth scrolling (Lenis) driven by GSAP's ticker, so pinned and scrubbed
 * ScrollTriggers move in step with it. Also routes every #anchor link through it.
 */
export default function SmoothScroll() {
  useEffect(() => {
    let lenis = null;
    let tick = null;

    if (!prefersReducedMotion()) {
      lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
      window.__lenis = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      // Hold still until the intro has finished
      if (!document.documentElement.classList.contains('is-ready')) lenis.stop();
    }

    const scrollTo = (target) => {
      if (lenis) lenis.scrollTo(target, { duration: 1.4, force: true });
      else window.scrollTo({ top: typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY });
    };

    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id === '#top') {
        e.preventDefault();
        scrollTo(0);
        return;
      }
      const el = id.length > 1 && document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      // The footer sits fixed under the page: its place is the very bottom
      if (getComputedStyle(el).position === 'fixed') scrollTo(document.documentElement.scrollHeight);
      else scrollTo(el);
    };
    document.addEventListener('click', onClick);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('app:ready', refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('app:ready', refresh);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return null;
}
