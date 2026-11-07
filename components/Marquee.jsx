'use client';

import { Fragment, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { stack } from '@/data/site';

const ROW_B = ['Frontend', 'Backend — learning', 'Frontend', 'Backend — learning'];

function Items({ words }) {
  return words.map((w, i) => (
    <Fragment key={i}>
      <span>{w}</span>
      <i>/</i>
    </Fragment>
  ));
}

/**
 * Two rows of stack names that drift in opposite directions.
 * Scrolling speeds them up, and scrolling up reverses them.
 */
export default function Marquee() {
  const rowA = useRef(null);
  const rowB = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rows = [
      { el: rowA.current, x: 0, sign: -1, half: 0 },
      { el: rowB.current, x: 0, sign: 1, half: 0 },
    ];
    const measure = () => rows.forEach((r) => (r.half = r.el.scrollWidth / 2));
    measure();
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);

    let dir = 1;
    let boost = 0;
    const st = ScrollTrigger.create({
      trigger: rowA.current.parentElement,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        dir = self.direction;
        boost = Math.min(Math.abs(self.getVelocity()) / 400, 8);
      },
    });

    const tick = (_t, dt) => {
      boost *= 0.92;
      rows.forEach((r) => {
        if (!r.half) return;
        r.x += r.sign * dir * (0.05 + boost * 0.05) * dt;
        if (r.x <= -r.half) r.x += r.half;
        if (r.x > 0) r.x -= r.half;
        r.el.style.transform = `translate3d(${r.x}px,0,0)`;
      });
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      st.kill();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div className="marquee" aria-label={`Stack: ${stack.join(', ')}`}>
      <div ref={rowA} className="marquee-row" aria-hidden="true">
        <Items words={stack} />
        <Items words={stack} />
      </div>
      <div ref={rowB} className="marquee-row outline" aria-hidden="true">
        <Items words={ROW_B} />
        <Items words={ROW_B} />
      </div>
    </div>
  );
}
