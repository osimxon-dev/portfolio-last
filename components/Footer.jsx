'use client';

import { useEffect, useRef } from 'react';
import { contacts, person, projects, requestLink } from '@/data/site';
import { Arrow } from './Icons';
import LogoMark from './LogoMark';

/**
 * The last screen. On tall enough screens it sits fixed under the page and
 * is uncovered like a curtain as the last section scrolls away.
 */
export default function Footer() {
  const root = useRef(null);

  useEffect(() => {
    const html = document.documentElement;
    const fit = () => {
      const h = root.current.offsetHeight;
      const reveal = window.innerWidth >= 768 && h <= window.innerHeight;
      html.classList.toggle('has-reveal', reveal);
      html.style.setProperty('--foot-h', `${h}px`);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(root.current);
    window.addEventListener('resize', fit);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', fit);
      html.classList.remove('has-reveal');
    };
  }, []);

  return (
    <footer className="foot" id="contact" ref={root} aria-labelledby="foot-title">
      <div className="wrap foot__in">
        <p className="mono">(Have a project?)</p>
        <div className="foot__top">
          <h2 id="foot-title" className="foot__big">
            Let’s build your website<span className="foot__dot">.</span>
          </h2>
          <a className="foot__circle" href={requestLink} target="_blank" rel="noopener noreferrer" data-magnetic="0.35" data-cursor="Let’s talk">
            <span>
              Write on
              <br />
              Telegram
            </span>
            <Arrow />
          </a>
        </div>

        <div className="foot__cols">
          <div>
            <h3 className="mono">Contact</h3>
            <ul>
              {contacts.map((c) => (
                <li key={c.label}>
                  <a className="link" href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener">
                    {c.label === 'Email' ? c.value : `${c.label} ${c.value}`}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mono">Live sites</h3>
            <ul>
              {projects.map((p) => (
                <li key={p.name}>
                  <a className="link" href={p.url} target="_blank" rel="noopener">
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mono">This page</h3>
            <ul>
              <li><a className="link" href="#work">Work</a></li>
              <li><a className="link" href="#try">Try it</a></li>
              <li><a className="link" href="#prices">Prices</a></li>
              <li><a className="link" href="#process">Process</a></li>
            </ul>
          </div>
          <div className="foot__top-link">
            <a className="link" href="#top">Back to top ↑</a>
          </div>
        </div>

        <div className="foot__bottom mono">
          <span className="foot__brand">
            <LogoMark />© 2026 {person.firstName} {person.lastName}
          </span>
          <span>Product names and logos belong to their owners.</span>
        </div>
      </div>
    </footer>
  );
}
