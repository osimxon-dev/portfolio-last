'use client';

import { useRef } from 'react';
import { useGSAP, reveal } from '@/lib/gsap';
import { services, contacts } from '@/data/site';

const telegram = contacts.find((c) => c.label === 'Telegram').href;

export default function Services() {
  const root = useRef(null);

  useGSAP(() => reveal(root.current), { scope: root });

  return (
    <section ref={root} className="section services" id="services">
      <div className="container">
        <p className="eyebrow" data-rise>(04) Services</p>
        <h2 className="h2">
          <span className="mask"><span>What I build,</span></span>
          <span className="mask"><span className="dim">and what it costs.</span></span>
        </h2>

        <div className="svc-grid">
          {services.map((s) => (
            <article className={`svc-card${s.popular ? ' is-popular' : ''}`} data-rise key={s.name}>
              {s.popular && <span className="svc-badge">Most requested</span>}
              <h3>{s.name}</h3>
              <p className="svc-price">
                <span className="svc-from">from</span>
                <span className="svc-amount">${s.price}</span>
              </p>
              <p className="svc-time">{s.time}</p>
              <p className="svc-desc">{s.description}</p>
              <ul className="svc-list">
                {s.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a
                className="svc-cta"
                href={`${telegram}?text=${encodeURIComponent(`Hi! I'd like to order: ${s.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Order on Telegram <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>

        <p className="svc-note" data-rise>
          Prices are a starting point. Tell me what you need and I will reply with the exact price and timeline in one message.
        </p>
      </div>
    </section>
  );
}
