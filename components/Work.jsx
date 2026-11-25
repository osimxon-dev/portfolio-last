'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import { projects, requestLink } from '@/data/site';
import { Arrow } from './Icons';

/** The live site, full size, inside the page. Escape or a click outside closes it. */
function LiveModal({ project, onClose }) {
  const root = useRef(null);
  const closeBtn = useRef(null);

  useEffect(() => {
    window.__lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    gsap.fromTo(root.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(root.current.querySelector('.modal__box'), { y: 48, scale: 0.97 }, { y: 0, scale: 1, duration: 0.7, ease: 'expo.out' });
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      window.__lenis?.start();
    };
  }, [onClose]);

  return (
    <div
      className="modal"
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name}, live website`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal__box">
        <div className="modal__bar">
          <span className="dots" aria-hidden="true">
            <i /> <i /> <i />
          </span>
          <span className="url">{new URL(project.url).host}</span>
          <a className="link" href={project.url} target="_blank" rel="noopener">
            Open in a new tab <Arrow />
          </a>
          <button ref={closeBtn} type="button" className="icon-btn" onClick={onClose} aria-label="Close the live site">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <iframe src={project.url} title={`${project.name}, live website`} />
      </div>
    </div>
  );
}

/**
 * Selected work. On a desktop the section holds still and the projects slide
 * sideways as you scroll; on smaller screens they stack.
 */
export default function Work() {
  const root = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);
  const [current, setCurrent] = useState(0);
  const [live, setLive] = useState(null);
  const closeLive = useCallback(() => setLive(null), []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        root.current.classList.add('work--h');
        const distance = () => track.current.scrollWidth - window.innerWidth;

        const slide = gsap.to(track.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => '+=' + distance(),
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => bar.current && (bar.current.style.transform = `scaleX(${self.progress})`),
          },
        });

        gsap.utils.toArray('.proj').forEach((proj, i) => {
          // The screenshot drifts inside its frame while the row slides
          gsap.fromTo(
            proj.querySelector('.proj__shot img'),
            { xPercent: -7 },
            { xPercent: 7, ease: 'none', scrollTrigger: { trigger: proj, containerAnimation: slide, start: 'left right', end: 'right left', scrub: true } }
          );
          ScrollTrigger.create({
            trigger: proj,
            containerAnimation: slide,
            start: 'left 60%',
            end: 'right 60%',
            onToggle: (self) => self.isActive && setCurrent(i),
          });
        });

        return () => root.current?.classList.remove('work--h');
      });
    },
    { scope: root }
  );

  return (
    <section className="work" id="work" ref={root} aria-labelledby="work-title">
      <div className="work__pin">
        <div className="wrap work__head">
          <h2 id="work-title">
            Selected work <sup>({String(projects.length).padStart(2, '0')})</sup>
          </h2>
          <p className="mono work__count" aria-hidden="true">
            {String(current + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </p>
        </div>

        <div className="work__track" ref={track}>
          <div className="work__intro">
            <p>Three live sites I designed and built. Scroll on, and click any of them to use the real thing right here.</p>
          </div>

          {projects.map((p, i) => (
            <article className="proj" key={p.name}>
              <button type="button" className="proj__media" data-cursor="Try it live" onClick={() => setLive(p)} aria-label={`Open ${p.name} live, inside this page`}>
                <span className="proj__bar" aria-hidden="true">
                  <span className="dots">
                    <i /> <i /> <i />
                  </span>
                  <span className="url">{new URL(p.url).host}</span>
                </span>
                <span className="proj__shot">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.poster} alt={`${p.name} home page`} loading="lazy" />
                </span>
              </button>
              <div className="proj__info">
                <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="proj__name">{p.name}</h3>
                <p className="proj__line">{p.line}</p>
                <ul className="tags">
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className="proj__btns">
                  <button type="button" className="btn btn--secondary" onClick={() => setLive(p)}>
                    Try it live
                  </button>
                  <a className="link" href={p.url} target="_blank" rel="noopener">
                    Open site <Arrow />
                  </a>
                </div>
              </div>
            </article>
          ))}

          <div className="work__end">
            <p className="work__end-big">Yours could be next.</p>
            <a className="btn btn--primary btn--lg" href={requestLink} target="_blank" rel="noopener noreferrer">
              Request a website <Arrow />
            </a>
          </div>
        </div>

        <div className="wrap work__progress" aria-hidden="true">
          <i ref={bar} />
        </div>
      </div>

      {live && createPortal(<LiveModal project={live} onClose={closeLive} />, document.body)}
    </section>
  );
}
