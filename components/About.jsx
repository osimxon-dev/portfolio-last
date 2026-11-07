'use client';

import { useRef } from 'react';
import { gsap, useGSAP, reveal } from '@/lib/gsap';
import { person } from '@/data/site';

const TEXT = `I'm ${person.firstName} ${person.lastName}, a ${person.age}-year-old web developer. For the last two years I've been building for the web: I take the frontend from the first line of HTML to a finished React or Next.js app, and right now I'm learning the backend with Node.js. I also know Python.`;

export default function About() {
  const root = useRef(null);

  useGSAP(
    () => {
      reveal(root.current);
      // Words light up one by one as you scroll through the paragraph
      gsap.fromTo(
        '.reveal-text .w',
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: '.reveal-text', start: 'top 80%', end: 'bottom 45%', scrub: true },
        }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="section about" id="about">
      <div className="container">
        <p className="eyebrow" data-rise>(01) About me</p>
        <p className="reveal-text">
          {TEXT.split(' ').map((w, i) => (
            <span className="w" key={i}>
              {w}{' '}
            </span>
          ))}
        </p>

        <dl className="facts">
          <div className="fact" data-rise><dt>Age</dt><dd>{person.age}</dd></div>
          <div className="fact" data-rise><dt>Experience</dt><dd>{person.experienceYears} years</dd></div>
          <div className="fact" data-rise><dt>Projects</dt><dd>3+ live</dd></div>
          <div className="fact" data-rise><dt>Learning now</dt><dd>Backend, Node.js</dd></div>
        </dl>
      </div>
    </section>
  );
}
