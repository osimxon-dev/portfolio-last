'use client';

import { useEffect, useRef } from 'react';
import { gsap, useGSAP, reveal } from '@/lib/gsap';
import { projects } from '@/data/site';

const FRAME_WIDTH = 1280; // the live site renders at this width, then is scaled to fit

export default function Projects() {
  const root = useRef(null);

  // Stack the cards: each card shrinks and dims as the next one slides over it
  useGSAP(
    () => {
      reveal(root.current);
      const cards = gsap.utils.toArray('.card');
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const st = { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true };
        gsap.to(card.querySelector('.card-inner'), { scale: 0.92, ease: 'none', scrollTrigger: st });
        gsap.to(card.querySelector('.card-dim'), { opacity: 0.6, ease: 'none', scrollTrigger: st });
      });
    },
    { scope: root }
  );

  // Scale each live iframe so the whole desktop page fits the preview box
  useEffect(() => {
    const boxes = root.current.querySelectorAll('.preview-viewport');
    const ro = new ResizeObserver((entries) => {
      entries.forEach((e) => e.target.style.setProperty('--s', e.contentRect.width / FRAME_WIDTH));
    });
    boxes.forEach((b) => ro.observe(b));
    return () => ro.disconnect();
  }, []);

  return (
    <section ref={root} className="section projects" id="projects">
      <div className="container">
        <div className="projects-head">
          <div>
            <p className="eyebrow" data-rise>(03) Projects</p>
            <h2 className="h2">
              <span className="mask"><span>Live work</span></span>
            </h2>
          </div>
          <p className="projects-note" data-rise>
            Every project here is deployed. The previews are the real sites, running live.
          </p>
        </div>

        <div className="cards">
          {projects.map((p, i) => {
            const host = new URL(p.url).host;
            return (
              <article className="card" style={{ '--i': i }} key={p.name}>
                <div className="card-inner">
                  <div className="card-info">
                    <div>
                      <span className="card-num">
                        0{i + 1} / 0{projects.length}
                      </span>
                      <h3 className="card-title">{p.name}</h3>
                      <p className="card-desc">{p.description}</p>
                    </div>
                    <div className="card-foot">
                      <ul className="tags">
                        {p.tags.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                      <a className="btn" href={p.url} target="_blank" rel="noopener">
                        Visit site <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  </div>

                  <a className="preview" href={p.url} target="_blank" rel="noopener" aria-label={`Open ${p.name}`}>
                    <span className="preview-bar">
                      <i />
                      <i />
                      <i />
                      <span>{host}</span>
                    </span>
                    <span className="preview-viewport">
                      <iframe src={p.url} title={`${p.name} preview`} loading="lazy" tabIndex={-1} style={{ width: FRAME_WIDTH }} />
                      <span className="preview-open">Open site ↗</span>
                    </span>
                  </a>
                  <span className="card-dim" aria-hidden="true" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
