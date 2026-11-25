'use client';

import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import { steps } from '@/data/site';

/** How a project goes: the heading holds on the left while the line on the right fills as you scroll. */
export default function Process() {
  const root = useRef(null);

  useGSAP(
    () => {
      root.current.classList.add('how--js');
      gsap.fromTo(
        '.how__line i',
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.how__steps', start: 'top 60%', end: 'bottom 60%', scrub: true } }
      );
      gsap.utils.toArray('.hstep').forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 62%',
          end: 'bottom 62%',
          onEnter: () => step.classList.add('is-on'),
          onLeaveBack: () => step.classList.remove('is-on'),
        });
      });
    },
    { scope: root }
  );

  return (
    <section className="how" id="process" ref={root} aria-labelledby="how-title">
      <div className="wrap how__grid">
        <div className="how__left">
          <p className="mono">(Process)</p>
          <h2 id="how-title">
            From one message <em>to a live site.</em>
          </h2>
          <p className="how__lead">Four steps, and you see a working version before anything goes live.</p>
        </div>

        <div className="how__steps">
          <span className="how__line" aria-hidden="true">
            <i />
          </span>
          <ol>
          {steps.map((s, i) => (
            <li className="hstep" key={s.title}>
              <span className="hstep__dot" aria-hidden="true" />
              <span className="mono">Step {String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
