'use client';

import { useRef } from 'react';
import { gsap, Draggable, useGSAP } from '@/lib/gsap';
import { person, projects, stack } from '@/data/site';

// Where each stack tag sits: x/y on desktop, mx/my on phones (percent of the screen)
const CHIP_SPOTS = [
  { x: 21, y: 19, mx: 8, my: 14 },
  { x: 8, y: 76, mx: 52, my: 12 },
  { x: 25, y: 86, mx: 26, my: 21 },
  { x: 71, y: 15, mx: 64, my: 22 },
  { x: 84, y: 78, mx: 8, my: 30 },
  { x: 66, y: 88, mx: 46, my: 31 },
  { x: 88, y: 24, mx: 70, my: 34 },
];

/**
 * Everything around the folder on the home screen:
 * a profile card (left), live project links (right), and stack tags you can
 * drag and throw. The hero timeline fades all of this out as the folder opens.
 */
export default function HeroSides() {
  const root = useRef(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Draggable, throwable tags
      const chips = gsap.utils.toArray('.chip');
      Draggable.create(chips, {
        type: 'x,y',
        bounds: root.current.closest('.hero-stage'),
        inertia: true,
        edgeResistance: 0.75,
        zIndexBoost: true,
        onPress() {
          gsap.to(this.target.firstChild, { scale: 1.08, duration: 0.25 });
          this.target.classList.add('is-grabbed');
        },
        onRelease() {
          gsap.to(this.target.firstChild, { scale: 1, duration: 0.4, ease: 'back.out(3)' });
          this.target.classList.remove('is-grabbed');
        },
      });

      // Gentle idle float on the inner element, so it never fights the drag
      if (!reduce) {
        chips.forEach((chip, i) => {
          gsap.to(chip.querySelector('.chip-float'), {
            y: i % 2 ? 7 : -7,
            rotate: i % 2 ? 2 : -2,
            duration: 2.4 + (i % 3) * 0.5,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: i * 0.2,
          });
        });
      }

      // Side cards lean toward the cursor
      const cleanups = gsap.utils.toArray('.side-card').map((card) => {
        const rx = gsap.quickTo(card, 'rotateX', { duration: 0.5, ease: 'power3.out' });
        const ry = gsap.quickTo(card, 'rotateY', { duration: 0.5, ease: 'power3.out' });
        gsap.set(card, { transformPerspective: 700 });
        const move = (e) => {
          const r = card.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 14);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 14);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        card.addEventListener('pointermove', move);
        card.addEventListener('pointerleave', leave);
        return () => {
          card.removeEventListener('pointermove', move);
          card.removeEventListener('pointerleave', leave);
        };
      });

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: root }
  );

  return (
    <div ref={root} className="hero-sides">
      <aside className="hero-side left" aria-label="Profile">
        <div className="side-card">
          <span className="side-label">Profile</span>
          <strong className="side-name">
            {person.firstName} {person.lastName}
          </strong>
          <span className="side-role">Web Developer</span>
          <dl className="mini-stats">
            <div><dt>Age</dt><dd>{person.age}</dd></div>
            <div><dt>Years</dt><dd>{person.experienceYears}+</dd></div>
            <div><dt>Projects</dt><dd>3+</dd></div>
          </dl>
          <p className="side-now">
            <span className="dot" aria-hidden="true" />
            Learning now: Node.js
          </p>
        </div>
      </aside>

      <aside className="hero-side right" aria-label="Live projects">
        <div className="side-card">
          <span className="side-label">Live projects</span>
          <ul className="side-projects">
            {projects.map((p, i) => (
              <li key={p.name}>
                <a href={p.url} target="_blank" rel="noopener">
                  <span className="sp-num">0{i + 1}</span>
                  <span className="sp-text">
                    <span className="sp-name">{p.name}</span>
                    <span className="sp-host">{new URL(p.url).host}</span>
                  </span>
                  <span className="sp-arrow" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="chips" aria-label={`Stack: ${stack.join(', ')}`}>
        {stack.map((name, i) => {
          const s = CHIP_SPOTS[i % CHIP_SPOTS.length];
          return (
            <div
              key={name}
              className="chip"
              style={{ '--x': `${s.x}%`, '--y': `${s.y}%`, '--mx': `${s.mx}%`, '--my': `${s.my}%`, '--d': `${0.9 + i * 0.07}s` }}
              aria-hidden="true"
            >
              <span className="chip-float">
                <span className="chip-dot" />
                {name}
              </span>
            </div>
          );
        })}
        <p className="chips-hint">Drag the tags around</p>
      </div>
    </div>
  );
}
