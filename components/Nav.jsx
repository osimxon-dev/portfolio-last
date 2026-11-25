'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { contacts, requestLink } from '@/data/site';
import { Arrow } from './Icons';
import Logo from './Logo';

const LINKS = [
  ['work', 'Work'],
  ['try', 'Try it'],
  ['prices', 'Prices'],
  ['process', 'Process'],
  ['contact', 'Contact'],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [theme, setTheme] = useState('dark');
  const menu = useRef(null);
  const menuBtn = useRef(null);
  const first = useRef(true);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  }, []);

  // Slide the bar away while scrolling down, bring it back on the way up
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 160 && y > last);
      setSolid(y > 40);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Open and close the full-screen menu
  useEffect(() => {
    const el = menu.current;
    if (first.current) {
      first.current = false;
      return;
    }
    const fast = prefersReducedMotion();
    if (open) {
      window.__lenis?.stop();
      gsap.set(el, { visibility: 'visible' });
      gsap
        .timeline()
        .fromTo(el, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: fast ? 0 : 0.8, ease: 'expo.inOut' })
        .fromTo('.menu__link', { yPercent: 110 }, { yPercent: 0, duration: fast ? 0 : 0.9, ease: 'expo.out', stagger: 0.06 }, fast ? 0 : 0.35)
        .fromTo('.menu__foot', { autoAlpha: 0 }, { autoAlpha: 1, duration: fast ? 0 : 0.5 }, fast ? 0 : 0.6);
      el.querySelector('a')?.focus();
      const onKey = (e) => e.key === 'Escape' && setOpen(false);
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
    gsap.to(el, {
      clipPath: 'inset(0% 0% 100% 0%)',
      duration: fast ? 0 : 0.7,
      ease: 'expo.inOut',
      onComplete: () => gsap.set(el, { visibility: 'hidden' }),
    });
    window.__lenis?.start();
    menuBtn.current?.focus();
  }, [open]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* private mode: the choice lasts for this visit only */
    }
    setTheme(next);
  };

  return (
    <>
      <header className={`nav${hidden && !open ? ' is-hidden' : ''}${solid && !open ? ' is-solid' : ''}${open ? ' is-open' : ''}`}>
        <div className="wrap nav__in">
          <a className="skip-link" href="#about">
            Skip to content
          </a>
          <Logo />
          <div className="nav__right">
            <button
              type="button"
              className="icon-btn"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to the white theme' : 'Switch to the black theme'}
            >
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="4.5" />
                  <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
                </svg>
              )}
            </button>
            <a className="btn btn--primary nav__cta" href={requestLink} target="_blank" rel="noopener noreferrer">
              Request a website <Arrow />
            </a>
            <button
              ref={menuBtn}
              type="button"
              className="menu-btn"
              aria-expanded={open}
              aria-controls="menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span>{open ? 'Close' : 'Menu'}</span>
              <i aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div className="menu" id="menu" ref={menu} aria-hidden={!open} inert={!open ? true : undefined}>
        <nav className="wrap menu__nav" aria-label="Main">
          {LINKS.map(([id, label], i) => (
            <div className="menu__mask" key={id}>
              <a className="menu__link" href={`#${id}`} onClick={() => setOpen(false)}>
                <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                {label}
              </a>
            </div>
          ))}
        </nav>
        <div className="wrap menu__foot">
          {contacts.map((c) => (
            <a key={c.label} className="link" href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener">
              {c.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
