'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { extras, siteTypes, telegramWith } from '@/data/site';
import { Arrow } from './Icons';

/** The price builder: pick a type of site, add options, watch the estimate change. */
export default function Pricing() {
  const [typeId, setTypeId] = useState('business');
  const [units, setUnits] = useState(0);
  const [lang, setLang] = useState(false);
  const [gallery, setGallery] = useState(false);

  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.price__head > *, .opt, .est', {
          y: 60,
          autoAlpha: 0,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: 'top 72%' },
        });
      });
    },
    { scope: root }
  );

  const type = siteTypes.find((t) => t.id === typeId);
  const u = Math.min(units, type.maxUnits);
  const hasGallery = gallery && type.gallery;
  const total = type.base + u * type.unitPrice + (lang ? extras.secondLanguage : 0) + (hasGallery ? extras.gallery : 0);
  const addDays = Math.floor((u + (lang ? 1 : 0) + (hasGallery ? 1 : 0)) / 3);
  const days = [type.days[0] + addDays, type.days[1] + addDays];

  // Count the total up or down to its new value
  const [shown, setShown] = useState(total);
  const shownRef = useRef(total);
  useEffect(() => {
    const from = shownRef.current;
    if (from === total) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      shownRef.current = total;
      setShown(total);
      return;
    }
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / 420);
      const v = Math.round(from + (total - from) * (1 - Math.pow(1 - p, 3)));
      shownRef.current = v;
      setShown(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [total]);

  const unitWord = (n) => (n === 1 ? type.unitName.toLowerCase().replace(/s$/, '') : type.unitName.toLowerCase());
  const parts = [type.name];
  if (u) parts.push(`${u} ${unitWord(u)}`);
  if (lang) parts.push('a second language');
  if (hasGallery) parts.push('a photo gallery');
  const request = telegramWith(`Hi, I'd like to request a website: ${parts.join(', ')}. Estimate: $${total}.`);

  return (
    <section id="prices" className="price" ref={root} aria-labelledby="prices-title">
      <div className="wrap">
        <div className="price__head">
          <p className="mono">(Prices)</p>
          <h2 id="prices-title">
            Pick a site. <em>Watch the price.</em>
          </h2>
        </div>

        <div className="build">
          <fieldset className="opts">
            <legend>Type of site</legend>
            {siteTypes.map((t) => (
              <label className="opt" key={t.id}>
                <input type="radio" name="site-type" value={t.id} checked={typeId === t.id} onChange={() => setTypeId(t.id)} />
                <span className="opt__name">{t.name}</span>
                <span className="opt__price">from ${t.base}</span>
                <span className="opt__line">{t.line}</span>
                <span className="opt__time">
                  {t.days[0]}–{t.days[1]} days
                </span>
              </label>
            ))}
          </fieldset>

          <div className="est" aria-labelledby="est-title">
            <h3 id="est-title">Your estimate</h3>

            <div className="ctl">
              <div>
                {type.unitName}
                <small>+${type.unitPrice} each</small>
              </div>
              <div className="stepper">
                <button type="button" aria-label={`Fewer ${type.unitName.toLowerCase()}`} onClick={() => setUnits(Math.max(0, u - 1))}>
                  −
                </button>
                <output aria-live="polite">{u}</output>
                <button type="button" aria-label={`More ${type.unitName.toLowerCase()}`} onClick={() => setUnits(Math.min(type.maxUnits, u + 1))}>
                  +
                </button>
              </div>
            </div>

            <div className="ctl">
              <div id="lang-label">
                Second language
                <small>+${extras.secondLanguage}, for example Uzbek and Russian</small>
              </div>
              <label className="switch">
                <input type="checkbox" aria-labelledby="lang-label" checked={lang} onChange={(e) => setLang(e.target.checked)} />
                <span />
              </label>
            </div>

            <div className="ctl">
              <div id="gal-label">
                Photo gallery
                <small>{type.gallery ? `+$${extras.gallery}` : 'Not part of a web app'}</small>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  aria-labelledby="gal-label"
                  disabled={!type.gallery}
                  checked={hasGallery}
                  onChange={(e) => setGallery(e.target.checked)}
                />
                <span />
              </label>
            </div>

            <div className="total">
              <output className="total__sum" aria-live="polite">
                ${shown}
              </output>
              <p className="total__days">
                about {days[0]}–{days[1]} days
              </p>
            </div>

            <a className="btn btn--primary btn--lg" href={request} target="_blank" rel="noopener noreferrer" data-magnetic="0.15">
              Request a website <Arrow />
            </a>
            <p className="est__note">An estimate. I confirm the exact price and date in one message.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
