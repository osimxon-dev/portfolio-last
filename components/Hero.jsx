'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { person } from '@/data/site';
import HeroSides from './HeroSides';

/**
 * The hero is 400vh tall with a sticky stage inside. Scrolling through it
 * scrubs one timeline: the folder tilts, the front flap swings open toward
 * you, and three sheets slide out and fan apart.
 */
export default function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      const wide = () => window.innerWidth >= 640;

      gsap.set('.folder-front', { z: 14, transformOrigin: '50% 100%' });
      gsap.set('.sheet-1', { z: 4 });
      gsap.set('.sheet-2', { z: 6 });
      gsap.set('.sheet-3', { z: 8 });

      // Entrance
      gsap.from('.folder-tilt', { y: 90, autoAlpha: 0, rotateX: -25, duration: 1.6, ease: 'expo.out', delay: 0.15 });

      // Mouse tilt (desktop only)
      const tiltX = gsap.quickTo('.folder-tilt', 'rotateY', { duration: 0.8, ease: 'power3.out' });
      const tiltY = gsap.quickTo('.folder-tilt', 'rotateX', { duration: 0.8, ease: 'power3.out' });
      const onMove = (e) => {
        if (!window.matchMedia('(pointer: fine)').matches) return;
        tiltX((e.clientX / window.innerWidth - 0.5) * 10);
        tiltY(-(e.clientY / window.innerHeight - 0.5) * 7);
      };
      window.addEventListener('pointermove', onMove);

      // Scroll: open the folder
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Side cards and tags clear out as the folder starts to open
      tl.to('.hero-side.left', { x: -90, autoAlpha: 0, duration: 0.8, ease: 'power2.in' }, 0.1)
        .to('.hero-side.right', { x: 90, autoAlpha: 0, duration: 0.8, ease: 'power2.in' }, 0.1)
        .to('.chips', { autoAlpha: 0, scale: 1.08, duration: 0.7, ease: 'power2.in' }, 0.05);

      tl.to('.scroll-hint', { autoAlpha: 0, y: 16, duration: 0.4 }, 0)
        .to('.hero-glow', { scale: 1.35, opacity: 1, duration: 2.4, ease: 'none' }, 0)
        .to('.folder', { rotateX: 14, yPercent: 6, duration: 1.2, ease: 'none' }, 0)
        .to('.folder-front', { rotateX: -76, duration: 1.8, ease: 'power2.in' }, 0.5)
        .to('.folder-front .shape', { filter: 'brightness(0.45)', duration: 1.8 }, 0.5)
        .to('.front-content', { autoAlpha: 0, duration: 0.9 }, 1.4)
        .to('.sheet-1', { yPercent: -62, xPercent: () => (wide() ? -108 : -94), rotate: -7, duration: 1.8, ease: 'power2.out' }, 1.5)
        .to('.sheet-2', { yPercent: -76, duration: 1.8, ease: 'power2.out' }, 1.65)
        .to('.sheet-3', { yPercent: -62, xPercent: () => (wide() ? 108 : 94), rotate: 7, duration: 1.8, ease: 'power2.out' }, 1.8)
        .to('.signature', { autoAlpha: 0, duration: 0.5 }, 3)
        .to('.sheets-hint', { autoAlpha: 1, y: 0, duration: 0.5 }, 3.2)
        .to({}, { duration: 0.8 });

      return () => window.removeEventListener('pointermove', onMove);
    },
    { scope: root }
  );

  return (
    <section ref={root} className="hero" id="home">
      <div className="hero-stage">
        <div className="hero-glow" aria-hidden="true" />
        <HeroSides />

        <div className="folder-scene">
          <div className="folder-tilt">
            <div className="folder">
              <div className="folder-shadow" aria-hidden="true" />

              {/* Back panel, tab on the right */}
              <div className="folder-back">
                <svg className="shape" viewBox="0 0 500 400" aria-hidden="true">
                  <defs>
                    <linearGradient id="gBack" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#3b3b3b" />
                      <stop offset=".35" stopColor="#232323" />
                      <stop offset="1" stopColor="#141414" />
                    </linearGradient>
                    <linearGradient id="gBackEdge" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#fff" stopOpacity=".75" />
                      <stop offset=".45" stopColor="#fff" stopOpacity=".18" />
                      <stop offset="1" stopColor="#fff" stopOpacity=".05" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#gBack)"
                    stroke="url(#gBackEdge)"
                    strokeWidth="1.6"
                    vectorEffect="non-scaling-stroke"
                    d="M0,52 Q0,36 16,36 L316,36 C334,36 334,0 354,0 L484,0 Q500,0 500,16 L500,384 Q500,400 484,400 L16,400 Q0,400 0,384 Z"
                  />
                </svg>
                <svg className="back-arrow" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 6l12 12M18 9v9H9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="back-mark">OD</span>
              </div>

              {/* Sheets that slide out */}
              <a className="sheet sheet-1" href="#about">
                <span className="sheet-label">01 — About me</span>
                <strong className="sheet-title">
                  {person.firstName} {person.lastName}
                </strong>
                <span className="sheet-text">
                  {person.age} years old. {person.experienceYears} years of building for the web.
                </span>
                <span className="sheet-arrow" aria-hidden="true">↘</span>
              </a>
              <a className="sheet sheet-2" href="#why">
                <span className="sheet-label">02 — Why me</span>
                <strong className="sheet-title">Frontend, fully</strong>
                <span className="sheet-text">HTML, CSS, JavaScript, React, Next.js, Python. Learning Node.js.</span>
                <span className="sheet-arrow" aria-hidden="true">↘</span>
              </a>
              <a className="sheet sheet-3" href="#projects">
                <span className="sheet-label">03 — Projects</span>
                <strong className="sheet-title">3 live sites</strong>
                <span className="sheet-text">DevConnect, Smena, Yonida.</span>
                <span className="sheet-arrow" aria-hidden="true">↘</span>
              </a>

              {/* Front panel, tab in the middle */}
              <div className="folder-front">
                <svg className="shape" viewBox="0 0 500 400" aria-hidden="true">
                  <defs>
                    <linearGradient id="gFront" x1="0" y1="0" x2=".3" y2="1">
                      <stop offset="0" stopColor="#2e2e2e" />
                      <stop offset=".5" stopColor="#1c1c1c" />
                      <stop offset="1" stopColor="#101010" />
                    </linearGradient>
                    <linearGradient id="gFrontEdge" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#fff" stopOpacity=".5" />
                      <stop offset=".5" stopColor="#fff" stopOpacity=".12" />
                      <stop offset="1" stopColor="#fff" stopOpacity=".04" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#gFront)"
                    stroke="url(#gFrontEdge)"
                    strokeWidth="1.4"
                    vectorEffect="non-scaling-stroke"
                    d="M4,112 Q4,96 20,96 L196,96 C214,96 214,64 234,64 L478,64 Q492,64 492,78 L492,388 Q492,400 480,400 L16,400 Q4,400 4,388 Z"
                  />
                </svg>
                <div className="front-content">
                  <p className="roles">
                    {person.roles.map((r, i) => (
                      <span key={r}>
                        {i > 0 && <i>|</i>}
                        {r}
                      </span>
                    ))}
                  </p>
                  <h1 className="title">Portfolio</h1>
                  <span className="year">2026</span>
                </div>
              </div>            </div>
          </div>
        </div>

        <p className="scroll-hint">
          <span>Scroll to open</span>
          <span className="scroll-line" aria-hidden="true" />
        </p>
        <p className="sheets-hint">Pick a sheet, or keep scrolling</p>
        <p className="signature">
          <b>{person.firstName.toUpperCase()}</b> <i>|</i> {person.lastName.toUpperCase()}
        </p>
      </div>
    </section>
  );
}
