import Icon from '../components/Icon.jsx'
import PageNav, { PageTitle as Title } from '../components/PageNav.jsx'
import { routes } from '../urls.js'
import { useReveal } from '../hooks.js'
import { profile, projects } from '../data.js'

// Les textes de cette page viennent de Symfony (translations/entreprise.fr.yaml ou .en.yaml),
// dans la langue de l'adresse : /entreprise (français) ou /en/entreprise (anglais).
// Voir PortfolioController::entreprise() et templates/portfolio/entreprise.html.twig.
const page = document.getElementById('root').dataset
const t = JSON.parse(page.texts)
const lang = page.lang

// Lien « Demander un devis » : ouvre la messagerie avec un objet et un début de message
const quoteHref = `mailto:${profile.email}?subject=${encodeURIComponent(t.quote.subject)}&body=${encodeURIComponent(t.quote.body)}`

// Bouton pour passer d'une langue à l'autre
function LangSwitch() {
  return (
    <nav className="elang" aria-label="Langue / Language">
      <a href={page.urlFr} className={lang === 'fr' ? 'is-active' : ''} hrefLang="fr" lang="fr">
        FR
      </a>
      <a href={page.urlEn} className={lang === 'en' ? 'is-active' : ''} hrefLang="en" lang="en">
        EN
      </a>
    </nav>
  )
}

function Hero() {
  const meta = [
    [t.hero.status_label, t.hero.status],
    [t.hero.zone_label, t.hero.zone],
    [t.hero.pricing_label, t.hero.pricing],
    [t.hero.contact_label, profile.email],
  ]
  return (
    <section className="phero">
      <div className="phero__text">
        <div className="ehero__top">
          <p className="phero__kicker">
            <span className="dot-green" /> {t.hero.kicker}
          </p>
          <LangSwitch />
        </div>
        <h1 className="phero__title">
          {t.hero.title}
          <em>.</em>
        </h1>
        <p className="phero__tagline">{t.hero.tagline}</p>
        <dl className="phero__meta">
          {meta.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <div className="phero__cta">
          <a className="btn btn--light" href={quoteHref}>
            <Icon name="mail" size={18} /> {t.hero.cta}
          </a>
        </div>
      </div>

      {/* Petit terminal décoratif, dans l'esprit du portfolio */}
      <div className="eterm" aria-hidden="true">
        <p className="eterm__bar">
          <i />
          <i />
          <i />
          <span>sean@services ~</span>
        </p>
        <pre className="eterm__body">
          <span className="eterm__cmd">$ sean --services</span>
          {t.services.items.map((s) => (
            <span key={s.title}>
              {'  '}
              <b>✓</b> {s.title.toLowerCase()}
            </span>
          ))}
          <span className="eterm__cmd">$ sean --{lang === 'en' ? 'quote' : 'devis'}</span>
          <span>
            {'  '}
            <b>→</b> {t.hero.terminal_quote}
          </span>
          <span className="eterm__cursor">$ _</span>
        </pre>
      </div>

      <p className="phero__corner" aria-hidden="true">
        {t.hero.corner}
      </p>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="section">
      <Title kicker={t.services.kicker}>{t.services.title}</Title>
      <div className="eservices">
        {t.services.items.map((s, i) => (
          <article key={s.title} className="box eservice reveal">
            <span className="eservice__num">{String(i + 1).padStart(2, '0')}</span>
            <Icon name={s.icon} size={28} />
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <p className="eservice__for mono">
              <span>{t.services.for_label}</span> {s.for}
            </p>
            <ul className="tags tags--small">
              {s.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

function Method() {
  return (
    <div className="pdark">
      <section id="methode" className="section">
        <Title kicker={t.method.kicker}>{t.method.title}</Title>
        <div className="contrib esteps">
          {t.method.steps.map((s, i) => (
            <article key={s.title} className="contrib__card reveal">
              <span className="contrib__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="contrib__icon">
                <Icon name={s.icon} size={24} />
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

function Reference() {
  const wheello = projects[0]
  return (
    <section id="realisation" className="section">
      <Title kicker={t.reference.kicker}>{t.reference.title}</Title>
      <article className="box eref reveal">
        <img src={wheello.cover} alt={wheello.title} loading="lazy" />
        <div className="eref__text">
          <p className="mono eref__cat">{t.reference.category}</p>
          <h3>
            {wheello.title}
            <span>.</span>
          </h3>
          <p>{t.reference.text}</p>
          <ul className="tags tags--small">
            {wheello.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <a className="btn btn--dark" href={routes.wheello}>
            {t.reference.cta} <Icon name="arrowRight" size={18} />
          </a>
        </div>
      </article>
    </section>
  )
}

function Outro() {
  return (
    <section id="contact" className="section pout">
      <div className="pout__box reveal">
        <p className="pkicker">{t.contact.kicker}</p>
        <h2>{t.contact.title}</h2>
        <div className="pout__cta">
          <a className="btn btn--dark" href={quoteHref}>
            <Icon name="mail" size={18} /> {t.contact.quote}
          </a>
          <a className="btn btn--light" href={routes.home}>
            <Icon name="arrowLeft" size={18} /> {t.contact.portfolio}
          </a>
        </div>
      </div>
    </section>
  )
}

function Legal() {
  const l = t.legal
  const rows = [
    [l.publisher_label, l.publisher],
    [l.siret_label, l.siret],
    [l.address_label, l.address],
    [l.contact_label, profile.email],
    [l.vat_label, l.vat],
    [l.host_label, l.host],
  ]
  return (
    <section id="mentions" className="section elegal">
      <p className="pkicker">{l.kicker}</p>
      <dl>
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt className="mono">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default function Entreprise() {
  useReveal()

  return (
    <>
      <PageNav
        links={[
          ['#services', t.nav.services],
          ['#methode', t.nav.method],
          ['#realisation', t.nav.reference],
          ['#contact', t.nav.contact],
        ]}
        back={{ href: routes.home, label: t.nav.back }}
      />
      <main>
        <Hero />
        <Services />
        <Method />
        <Reference />
        <Outro />
        <Legal />
      </main>
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} {profile.firstName.toUpperCase()} {profile.lastName.toUpperCase()}
        </p>
        <p>{t.footer}</p>
      </footer>
    </>
  )
}
