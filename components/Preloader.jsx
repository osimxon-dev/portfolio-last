'use client';

import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import LogoMark from './LogoMark';

/**
 * A short intro: a counter runs to 100, the name slides away, the curtain lifts.
 * Without script the curtain hides itself after a moment (CSS), so nothing stays covered.
 */
export default function Preloader() {
  const root = useRef(null);
  const num = useRef(null);

  useGSAP(
    () => {
      const el = root.current;
      const done = () => {
        el.style.display = 'none';
        document.documentElement.classList.add('is-ready');
        window.dispatchEvent(new Event('app:ready'));
        window.__lenis?.start();
      };
      if (prefersReducedMotion()) {
        done();
        return;
      }
      const counter = { v: 0 };
      gsap
        .timeline({ onComplete: done })
        // the pixels pop in, in random order, then the smooth half sweeps out to the right
        .from('.pre__mark rect', { autoAlpha: 0, scale: 0, transformOrigin: '50% 50%', duration: 0.35, ease: 'back.out(2)', stagger: { each: 0.016, from: 'random' } }, 0)
        .from('.pre__mark .mark__smooth', { scaleX: 0, transformOrigin: '0% 50%', duration: 0.8, ease: 'expo.out' }, 0.55)
        .from('.pre__word span', { yPercent: 110, duration: 0.7, ease: 'expo.out', stagger: 0.04 }, 0)
        .to(
          counter,
          {
            v: 100,
            duration: 1.1,
            ease: 'power2.inOut',
            onUpdate: () => (num.current.textContent = String(Math.round(counter.v)).padStart(3, '0')),
          },
          0
        )
        .to('.pre__word span', { yPercent: -110, duration: 0.5, ease: 'power3.in', stagger: 0.03 }, '+=0.15')
        .to('.pre__mark', { scale: 0.85, autoAlpha: 0, duration: 0.5, ease: 'power3.in' }, '<')
        .to(el, { yPercent: -100, duration: 0.85, ease: 'expo.inOut' }, '-=0.25');
    },
    { scope: root }
  );

  return (
    <div className="pre" ref={root} aria-hidden="true">
      <div className="pre__mark">
        <LogoMark />
      </div>
      <div className="pre__word">
        {'OSIMXON'.split('').map((c, i) => (
          <span key={i}>{c}</span>
        ))}
      </div>
      <div className="pre__num" ref={num}>
        000
      </div>
    </div>
  );
}
