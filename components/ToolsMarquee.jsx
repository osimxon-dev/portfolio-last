'use client';

import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';
import { tools } from '@/data/site';

function Row({ items }) {
  // The set is repeated so the loop never shows a gap
  return (
    <div className="marquee__row">
      {[0, 1].map((copy) => (
        <div className="marquee__set" key={copy} aria-hidden={copy === 1 || undefined}>
          {items.map((t) => (
            <span className="tool" key={t.name + copy}>
              <span className={t.mono ? 'tool__icon tool__icon--mono' : 'tool__icon'}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.icon} alt="" />
              </span>
              {t.name}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Two rows of the tools I build with. They drift in opposite directions and speed up with the scroll. */
export default function ToolsMarquee() {
  const root = useRef(null);
  const half = Math.ceil(tools.length / 2);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const rows = gsap.utils.toArray('.marquee__row');
      const loops = rows.map((row, i) =>
        gsap.fromTo(row, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 38, ease: 'none', repeat: -1 })
      );
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 6);
          loops.forEach((l) => {
            gsap.killTweensOf(l);
            gsap.timeline().to(l, { timeScale: boost, duration: 0.15 }).to(l, { timeScale: 1, duration: 1.4, ease: 'power2.out' }, '+=0.1');
          });
        },
      });
    },
    { scope: root }
  );

  return (
    <section className="tools-band" ref={root} aria-label="Tools I build with">
      <p className="wrap mono tools-band__label">(Tools I build with)</p>
      <div className="marquee">
        <Row items={tools.slice(0, half)} />
        <Row items={tools.slice(half).concat(tools.slice(0, 2))} />
      </div>
    </section>
  );
}
