'use client';

import { useRef } from 'react';
import { gsap, useGSAP, reveal } from '@/lib/gsap';
import { contacts } from '@/data/site';

export default function Contact() {
  const root = useRef(null);

  useGSAP(
    () => {
      reveal(root.current);
      gsap.fromTo(
        '.contact-title',
        { scale: 0.8, opacity: 0.25 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top 20%', scrub: true },
        }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="section contact" id="contact">
      <div className="container">
        <p className="eyebrow" data-rise>(05) Contact</p>
        <h2 className="contact-title">
          Let&apos;s build
          <br />
          <span className="dim">something.</span>
        </h2>

        {contacts.length > 0 && (
          <ul className="contact-list">
            {contacts.map((c) => (
              <li key={c.label} data-rise>
                <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener">
                  <span className="contact-label">{c.label}</span>
                  <span className="contact-value">{c.value}</span>
                  <span className="contact-arrow" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
