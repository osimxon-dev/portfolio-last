'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * A dot and a ring that follow the pointer (mouse only). The ring grows over links,
 * and over anything with data-cursor="Label" it fills orange and shows the label.
 * Elements with data-magnetic lean toward the pointer.
 */
export default function Cursor() {
  const root = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const el = root.current;
    const dot = el.querySelector('.cursor__dot');
    const ring = el.querySelector('.cursor__ring');
    document.documentElement.classList.add('has-cursor');

    const dx = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
    const dy = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });
    const rx = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' });
    const ry = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' });

    const move = (e) => {
      el.classList.add('is-on');
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    const over = (e) => {
      const t = e.target;
      if (t.closest('iframe')) {
        el.classList.remove('is-on');
        return;
      }
      const tagged = t.closest('[data-cursor]');
      if (tagged) {
        label.current.textContent = tagged.dataset.cursor;
        el.classList.add('has-label');
        el.classList.remove('is-link');
        return;
      }
      el.classList.remove('has-label');
      el.classList.toggle('is-link', !!t.closest('a, button, label, input, [role="tab"]'));
    };
    const leave = () => el.classList.remove('is-on');
    const down = () => el.classList.add('is-down');
    const up = () => el.classList.remove('is-down');

    window.addEventListener('pointermove', move);
    document.addEventListener('pointerover', over);
    document.documentElement.addEventListener('pointerleave', leave);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);

    // Magnetic buttons
    const magnets = [...document.querySelectorAll('[data-magnetic]')].map((m) => {
      const mx = gsap.quickTo(m, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      const my = gsap.quickTo(m, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      const pull = Number(m.dataset.magnetic) || 0.3;
      const onMove = (e) => {
        const r = m.getBoundingClientRect();
        mx((e.clientX - r.left - r.width / 2) * pull);
        my((e.clientY - r.top - r.height / 2) * pull);
      };
      const onLeave = () => {
        mx(0);
        my(0);
      };
      m.addEventListener('pointermove', onMove);
      m.addEventListener('pointerleave', onLeave);
      return () => {
        m.removeEventListener('pointermove', onMove);
        m.removeEventListener('pointerleave', onLeave);
      };
    });

    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      magnets.forEach((off) => off());
    };
  }, []);

  return (
    <div className="cursor" ref={root} aria-hidden="true">
      <div className="cursor__ring">
        <span ref={label} />
      </div>
      <div className="cursor__dot" />
    </div>
  );
}
