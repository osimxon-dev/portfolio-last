import { siteKinds } from '@/data/site';

/**
 * A small sample website for one kind of business, drawn at desktop width (1100px)
 * or phone width (390px). The Generator scales it into its preview frame.
 */
export default function MiniSite({ kind, name, lang, device }) {
  const site = siteKinds.find((k) => k.id === kind) ?? siteKinds[0];
  const t = site[lang] ?? site.en;
  const title = name.trim() || site.sample;
  const initial = title.charAt(0).toUpperCase();

  return (
    <div className={`mini mini--${site.id}${device === 'phone' ? ' is-phone' : ''}`}>
      <div className="m-nav">
        <span className="m-logo">{title}</span>
        <span className="m-links">
          <span>{t.cards[0]}</span>
          <span>{t.cards[1]}</span>
        </span>
        <span className="m-btn">{t.cta}</span>
      </div>

      <div className="m-hero">
        <div className="m-copy">
          <p className="m-title">{title}</p>
          <p className="m-tag">{t.tag}</p>
          <span className="m-btn">{t.cta}</span>
        </div>
        <div className="m-art">
          <span className="m-init">{initial}</span>
          <div className="m-card">
            <small>{t.widget[0]}</small>
            <b>{t.widget[1]}</b>
          </div>
        </div>
      </div>

      <div className="m-cards">
        {t.cards.map((card, i) => (
          <div key={card}>
            <b>{card}</b>
            <p>{t.bodies[i]}</p>
          </div>
        ))}
      </div>

      <div className="m-foot">
        <span>{title}</span>
        <span>{t.tag}</span>
      </div>
    </div>
  );
}
