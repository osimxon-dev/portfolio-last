'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { siteKinds, telegramWith } from '@/data/site';
import { Arrow } from './Icons';
import MiniSite from './MiniSite';

const DESKTOP_W = 1100; // the sample site's desktop width before scaling
const PHONE_W = 406; // 390 + the phone's 8px frame on each side
const PHONE_H = 780;

const slug = (text) =>
  (text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'your-site') + '.uz';

/**
 * The playground: the visitor picks a kind of business, types its name,
 * and a sample website for it appears in the frame on the right.
 */
export default function Playground() {
  const [kind, setKind] = useState('cafe');
  const [name, setName] = useState(siteKinds[0].sample);
  const [touched, setTouched] = useState(false);
  const [lang, setLang] = useState('en');
  const [device, setDevice] = useState('desktop');
  const [box, setBox] = useState({ w: 0, h: 0 });
  const viewRef = useRef(null);
  const root = useRef(null);

  // The blue panel rises and grows into place as the section arrives
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.panel',
          { y: 120, scale: 0.92 },
          { y: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top 15%', scrub: true } }
        );
        gsap.from('.play__head > *', {
          y: 40,
          autoAlpha: 0,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: 'top 70%' },
        });
      });
    },
    { scope: root }
  );

  // Phones see the phone preview first
  useEffect(() => {
    if (window.innerWidth < 700) setDevice('phone');
  }, []);

  // Measure the preview area, so the sample site can be scaled to fit it
  useEffect(() => {
    const el = viewRef.current;
    const measure = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const site = siteKinds.find((k) => k.id === kind);
  const shownName = name.trim() || site.sample;

  const pickKind = (id) => {
    setKind(id);
    if (!touched) setName(siteKinds.find((k) => k.id === id).sample);
  };

  let frame;
  if (device === 'phone') {
    const k = Math.min((box.h - 32) / PHONE_H, (box.w - 32) / PHONE_W, 1);
    frame = { width: PHONE_W, height: PHONE_H, transform: `scale(${k})`, left: Math.max(0, (box.w - PHONE_W * k) / 2), top: 16 };
  } else {
    const k = box.w / DESKTOP_W || 0.5;
    frame = { width: DESKTOP_W, height: Math.ceil(box.h / k), transform: `scale(${k})`, left: 0, top: 0 };
  }

  const request = telegramWith(
    `Hi, I'd like a website for ${shownName} (${site.word}), in ${lang === 'uz' ? 'Uzbek' : 'English'}, ${
      device === 'phone' ? 'made for phones first' : 'for desktop and phone'
    }.`
  );

  return (
    <section className="play" id="try" ref={root} aria-labelledby="play-title">
      <div className="wrap">
        <div className="play__head">
          <p className="mono">(Try it)</p>
          <h2 id="play-title">
            Type your business. <em>See your website.</em>
          </h2>
        </div>
      </div>
      <div className="wrap play__grid">
        <div className="gen__left">
          <p className="lead">
            Pick what you run and type its name: a website for it appears on the right, in English or Uzbek. Real sites start from <b>$40</b>.
          </p>

          <form className="gen__form" onSubmit={(e) => e.preventDefault()} autoComplete="off">
            <div className="field">
              <label htmlFor="gen-name">Business name</label>
              <input
                id="gen-name"
                type="text"
                maxLength={28}
                spellCheck={false}
                value={name}
                onFocus={(e) => !touched && e.target.select()}
                onChange={(e) => {
                  setTouched(true);
                  setName(e.target.value);
                }}
              />
            </div>
            <fieldset className="chips">
              <legend>What do you run?</legend>
              {siteKinds.map((k) => (
                <label className="chip" key={k.id}>
                  <input type="radio" name="kind" value={k.id} checked={kind === k.id} onChange={() => pickKind(k.id)} />
                  <span>{k.label}</span>
                </label>
              ))}
            </fieldset>
          </form>

          <div className="btn-row">
            <a className="btn btn--primary" href={request} target="_blank" rel="noopener noreferrer">
              Request this website <Arrow />
            </a>
            <a className="btn btn--secondary" href="#prices">
              See prices
            </a>
          </div>
          <p className="note">A preview with sample texts. Your real site gets your own texts, photos and prices.</p>
        </div>

        <div className="gen__right">
          <div className="panel">
            <div className="panel__head">
              <span className="live">
                <i aria-hidden="true" /> Live preview
              </span>
              <span>{site.label}</span>
            </div>

            <div className="frame">
              <div className="frame__bar">
                <span className="dots" aria-hidden="true">
                  <i /> <i /> <i />
                </span>
                <span className="url">{slug(shownName)}</span>
                <div className="seg" role="radiogroup" aria-label="Language of the preview">
                  {[
                    ['en', 'EN'],
                    ['uz', 'UZ'],
                  ].map(([v, l]) => (
                    <label key={v}>
                      <input type="radio" name="gen-lang" value={v} checked={lang === v} onChange={() => setLang(v)} />
                      <span>{l}</span>
                    </label>
                  ))}
                </div>
                <div className="seg" role="radiogroup" aria-label="Screen of the preview">
                  {[
                    ['desktop', 'Desktop'],
                    ['phone', 'Phone'],
                  ].map(([v, l]) => (
                    <label key={v}>
                      <input type="radio" name="gen-device" value={v} checked={device === v} onChange={() => setDevice(v)} />
                      <span>{l}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="view" ref={viewRef} role="img" aria-label={`Sample website for ${shownName}`} data-lenis-prevent>
                <div
                  key={`${kind}-${lang}-${device}`}
                  className={`view__site${device === 'phone' ? ' is-phone' : ''}`}
                  style={{ ...frame, visibility: box.w ? 'visible' : 'hidden' }}
                  aria-hidden="true"
                >
                  <MiniSite kind={kind} name={name} lang={lang} device={device} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
