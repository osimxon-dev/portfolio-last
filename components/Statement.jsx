'use client';

import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import { person, projects } from '@/data/site';

// The statement, word by word. `em` words turn black, `pills` shows the three live sites inline.
const TEXT =
  "I'm Osimxon, a 14-year-old web developer. I design and build websites for *small *businesses: landing pages, business sites and web apps. Clean, fast, and made to turn visitors into *customers. Three of them are live right now";

const words = TEXT.split(' ').map((w) => ({ text: w.replace('*', ''), em: w.startsWith('*') }));

const STATS = [
  { n: person.age, label: 'years old' },
  { n: person.experienceYears, label: 'years building for the web' },
  { n: projects.length, label: 'sites live right now' },
  { n: 40, prefix: '$', label: 'is where a site starts' },
];

export default function Statement() {
  const root = useRef(null);

  useGSAP(
    () => {
      const ws = gsap.utils.toArray('.w');
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        // The blue panel opens out to the full screen as it arrives
        gsap.fromTo(
          root.current,
          { clipPath: 'inset(9% 5% 0% 5% round 48px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top top', scrub: true } }
        );
        // Then it holds while the words light up one by one
        gsap.fromTo(
          ws,
          { opacity: 0.16 },
          { opacity: 1, ease: 'none', stagger: 0.05, scrollTrigger: { trigger: root.current, start: 'top top', end: '+=110%', scrub: true, pin: true } }
        );
      });

      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          ws,
          { opacity: 0.16 },
          { opacity: 1, ease: 'none', stagger: 0.05, scrollTrigger: { trigger: '.state__text', start: 'top 85%', end: 'bottom 50%', scrub: true } }
        );
      });

      // The figures count up once they are on screen
      gsap.utils.toArray('[data-count]').forEach((el) => {
        const end = Number(el.dataset.count);
        ScrollTrigger.create({
          trigger: el,
          start: 'top 92%',
          once: true,
          onEnter: () => {
            const o = { v: 0 };
            gsap.to(o, { v: end, duration: 1.6, ease: 'power3.out', onUpdate: () => (el.textContent = Math.round(o.v)) });
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section className="state" id="about" ref={root} aria-label="About me">
      <div className="wrap">
        <p className="mono state__label">(About)</p>
        <p className="state__text">
          {words.map((w, i) => (
            <span key={i} className={w.em ? 'w w--em' : 'w'}>
              {w.text}{' '}
            </span>
          ))}
          <span className="w state__pills">
            {projects.map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={p.name} src={p.poster} alt="" />
            ))}
          </span>
        </p>

        <dl className="state__stats">
          {STATS.map((s) => (
            <div key={s.label}>
              <dt className="stat__n">
                {s.prefix}
                <span data-count={s.n}>{s.n}</span>
              </dt>
              <dd className="mono">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
