'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { person, projects, contacts, email } from '@/data/site';

const MENU = [
  ['#home', 'Home'],
  ['#about', 'About me'],
  ['#why', 'Why me'],
  ['#projects', 'Projects'],
  ['#contact', 'Contact'],
];

export default function Footer() {
  const root = useRef(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      gsap.from('.footer-top > *', {
        y: 40,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.footer-top', start: 'top 90%' },
      });
    },
    { scope: root }
  );

  // Big name rises letter by letter once it enters the screen.
  // IntersectionObserver + CSS transition, so it can't get stuck hidden.
  const wordRef = useRef(null);
  useEffect(() => {
    const el = wordRef.current;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-in');
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in');
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const word = person.firstName.toUpperCase();

  return (
    <footer ref={root} className="footer">
      <div className="footer-top">
        <div className="footer-col footer-lead">
          <p className="footer-title">Have a project in mind? Write to me.</p>
          <div className="footer-mail">
            <a href={`mailto:${email}`}>{email}</a>
            <button type="button" className="copy-btn" onClick={copyEmail} aria-live="polite">
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        <nav className="footer-col" aria-label="Footer">
          <span className="footer-label">Menu</span>
          <ul>
            {MENU.map(([href, label]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-col">
          <span className="footer-label">Contact</span>
          <ul>
            {contacts.map((c) => (
              <li key={c.label}>
                <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener">
                  {c.label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <span className="footer-label">Projects</span>
          <ul>
            {projects.map((p) => (
              <li key={p.name}>
                <a href={p.url} target="_blank" rel="noopener">
                  {p.name} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p ref={wordRef} className="footer-word" aria-hidden="true">
        {word.split('').map((ch, i) => (
          <span className="fw-mask" key={i}>
            <span className="fw-letter" style={{ '--i': i }}>
              {ch}
            </span>
          </span>
        ))}
      </p>

      <div className="footer-bottom">
        <p>
          © 2026 {person.firstName} {person.lastName}
        </p>
        <p className="footer-built">Built with Next.js and GSAP</p>
        <a href="#home" className="to-top">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
