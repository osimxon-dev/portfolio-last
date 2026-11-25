'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { person, projects, requestLink } from '@/data/site';
import { Arrow } from './Icons';

const NAME = 'OSIMXON';

export default function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const chars = gsap.utils.toArray('.hero__name .ch');
        const fades = gsap.utils.toArray('[data-hero-fade]');
        gsap.set(chars, { yPercent: 115 });
        gsap.set(fades, { y: 30, autoAlpha: 0 });

        let played = false;
        const intro = () => {
          if (played) return;
          played = true;
          gsap
            .timeline()
            .to(chars, { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.055 })
            .to(fades, { y: 0, autoAlpha: 1, duration: 1, ease: 'expo.out', stagger: 0.08 }, 0.3);
        };
        if (document.documentElement.classList.contains('is-ready')) intro();
        else window.addEventListener('app:ready', intro, { once: true });
        const fallback = setTimeout(intro, 3500);

        // On scroll the letters drift up at different speeds and the words fade
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
          .to(chars, { y: (i) => -(50 + (i % 3) * 45), ease: 'none' }, 0)
          .to('.hero__mid', { y: -140, autoAlpha: 0, ease: 'none' }, 0)
          .to('.hero__top', { autoAlpha: 0, ease: 'none' }, 0);

        return () => {
          clearTimeout(fallback);
          window.removeEventListener('app:ready', intro);
        };
      });
    },
    { scope: root }
  );

  return (
    <section className="hero" ref={root} aria-labelledby="hero-title">
      <div className="wrap hero__top">
        <p className="mono" data-hero-fade>
          ({person.firstName} {person.lastName}, web developer)
        </p>
        <p className="mono" data-hero-fade>
          {person.age} years old — {person.experienceYears} years building — {projects.length} live sites
        </p>
      </div>

      <div className="wrap hero__mid">
        <p className="hero__lead" data-hero-fade>
          I design and build websites for small businesses. <em>Clean, fast, and made to bring you customers.</em>
        </p>
        <div className="hero__cta" data-hero-fade>
          <a className="btn btn--primary btn--lg" href={requestLink} target="_blank" rel="noopener noreferrer" data-magnetic="0.25">
            Request a website <Arrow />
          </a>
          <a className="hero__scroll" href="#about">
            <span>Scroll</span>
            <i aria-hidden="true" />
          </a>
        </div>
      </div>

      <h1 id="hero-title" className="hero__name" aria-label={`${person.firstName} ${person.lastName}, web developer`}>
        <span className="hero__name-in" aria-hidden="true">
          {NAME.split('').map((c, i) => (
            <span className="ch" key={i}>
              <span className="ch__in">{c}</span>
            </span>
          ))}
          <span className="ch ch--dot">
            <span className="ch__in">.</span>
          </span>
        </span>
      </h1>
    </section>
  );
}
