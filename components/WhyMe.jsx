'use client';

import { useRef } from 'react';
import { gsap, useGSAP, reveal } from '@/lib/gsap';
import { person } from '@/data/site';
import Marquee from './Marquee';

const STATS = [
  { value: person.age, suffix: '', label: 'years old' },
  { value: person.experienceYears, suffix: '+', label: 'years of experience' },
  { value: 3, suffix: '+', label: 'projects online' },
];

const REASONS = [
  {
    title: 'Frontend, end to end',
    text: 'Layout and styling in HTML and CSS, logic in JavaScript, full apps in React and Next.js.',
  },
  {
    title: 'Finished, not just started',
    text: 'DevConnect, Smena and Yonida are deployed and open to anyone. Open any of them below.',
  },
  {
    title: 'Growing toward full-stack',
    text: 'Learning the backend with Node.js now, so I can build the whole product, not half of it.',
  },
];

export default function WhyMe() {
  const root = useRef(null);

  useGSAP(
    () => {
      reveal(root.current);

      // Count the numbers up when they enter the screen
      root.current.querySelectorAll('[data-count]').forEach((el) => {
        const end = Number(el.dataset.count);
        const counter = { v: 0 };
        el.textContent = '0';
        gsap.to(counter, {
          v: end,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => (el.textContent = Math.round(counter.v)),
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="section why" id="why">
      <div className="container">
        <p className="eyebrow" data-rise>(02) Why me</p>
        <h2 className="h2">
          <span className="mask"><span>Young, and</span></span>
          <span className="mask"><span className="dim">already shipping.</span></span>
        </h2>

        <div className="stats">
          {STATS.map((s) => (
            <div className="stat" data-rise key={s.label}>
              <span className="stat-num">
                <span data-count={s.value}>{s.value}</span>
                {s.suffix}
              </span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <ol className="reasons">
          {REASONS.map((r, i) => (
            <li className="reason" data-rise key={r.title}>
              <span className="reason-num">0{i + 1}</span>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </li>
          ))}
        </ol>
      </div>

      <Marquee />
    </section>
  );
}
