'use client';

import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from '@/lib/gsap';

const LINKS = [
  ['home', 'Home'],
  ['about', 'About me'],
  ['why', 'Why me'],
  ['projects', 'Projects'],
  ['services', 'Services'],
  ['contact', 'Contact'],
];

export default function Nav() {
  const [active, setActive] = useState('home');
  const [solid, setSolid] = useState(false);
  const pillRef = useRef(null);
  const linkRefs = useRef({});

  // Which section is in the middle of the screen
  useEffect(() => {
    const triggers = LINKS.map(([id]) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => self.isActive && setActive(id),
      })
    );
    triggers.push(
      ScrollTrigger.create({
        trigger: '#home',
        start: 'bottom 90%',
        onEnter: () => setSolid(true),
        onLeaveBack: () => setSolid(false),
      })
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  // Slide the highlighted pill under the active link
  useEffect(() => {
    const place = () => {
      const link = linkRefs.current[active];
      const pill = pillRef.current;
      if (!link || !pill) return;
      pill.style.width = `${link.offsetWidth}px`;
      pill.style.transform = `translateX(${link.offsetLeft}px)`;
      // On narrow screens the menu scrolls sideways: keep the active link in view
      const nav = pill.parentElement;
      if (nav.scrollWidth > nav.clientWidth) {
        nav.scrollTo({ left: link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2, behavior: 'smooth' });
      }
    };
    place();
    // Re-measure whenever link sizes change (font swap, resize, mobile breakpoint)
    const ro = new ResizeObserver(place);
    Object.values(linkRefs.current).forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
  }, [active]);

  return (
    <nav className={`nav${solid ? ' is-solid' : ''}`} aria-label="Main">
      <span ref={pillRef} className="nav-pill" aria-hidden="true" />
      {LINKS.map(([id, label]) => (
        <a
          key={id}
          ref={(el) => (linkRefs.current[id] = el)}
          href={`#${id}`}
          className={`nav-link${active === id ? ' is-active' : ''}`}
          aria-current={active === id ? 'true' : undefined}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
