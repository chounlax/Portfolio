import Icon from '../components/Icon.jsx'
import PageNav, { PageTitle as Title } from '../components/PageNav.jsx'
import { routes } from '../urls.js'
import { useReveal } from '../hooks.js'
import { profile, projects, entreprise as e } from '../data.js'

// Lien « Demander un devis » : ouvre la messagerie avec un objet et un début de message
const quoteHref = `mailto:${profile.email}?subject=${encodeURIComponent('Demande de devis')}&body=${encodeURIComponent(
  "Bonjour Sean,\n\nJe souhaiterais un devis pour :\n- Type de projet : \n- Description : \n- Délai souhaité : \n\nMerci,\n",
)}`

function Hero() {
  const meta = [
    ['STATUT', e.status],
    ['ZONE', e.zone],
    ['TARIFS', e.pricing],
    ['CONTACT', profile.email],
  ]
  return (
    <section className="phero">
      <div className="phero__text">
        <p className="phero__kicker">
          <span className="dot-green" /> DISPONIBLE POUR DE NOUVEAUX PROJETS
        </p>
        <h1 className="phero__title">
          DÉVELOPPEUR INDÉPENDANT
          <em>.</em>
        </h1>
        <p className="phero__tagline">{e.tagline}</p>
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
            <Icon name="mail" size={18} /> Demander un devis
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
          {e.services.map((s) => (
            <span key={s.title}>
              {'  '}
              <b>✓</b> {s.title.toLowerCase()}
            </span>
          ))}
          <span className="eterm__cmd">$ sean --devis</span>
          <span>
            {'  '}
            <b>→</b> {e.pricing.toLowerCase()}, réponse par e-mail
          </span>
          <span className="eterm__cursor">$ _</span>
        </pre>
      </div>

      <p className="phero__corner" aria-hidden="true">
        idée + échange + code = projet en ligne;
      </p>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="section">
      <Title kicker="// 01 — CE QUE JE PROPOSE">Mes services</Title>
      <div className="eservices">
        {e.services.map((s, i) => (
          <article key={s.title} className="box eservice reveal">
            <span className="eservice__num">{String(i + 1).padStart(2, '0')}</span>
            <Icon name={s.icon} size={28} />
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <p className="eservice__for mono">
              <span>IDÉAL POUR</span> {s.for}
            </p>
            <ul className="tags tags--small">
              {s.tags.map((t) => (
                <li key={t}>{t}</li>
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
        <Title kicker="// 02 — DÉROULEMENT">Comment ça se passe</Title>
        <div className="contrib esteps">
          {e.steps.map((s, i) => (
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
      <Title kicker="// 03 — UNE RÉALISATION">Exemple de projet</Title>
      <article className="box eref reveal">
        <img src={wheello.cover} alt={`Aperçu de ${wheello.title}`} loading="lazy" />
        <div className="eref__text">
          <p className="mono eref__cat">{wheello.category}</p>
          <h3>
            {wheello.title}
            <span>.</span>
          </h3>
          <p>{wheello.text}</p>
          <ul className="tags tags--small">
            {wheello.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <a className="btn btn--dark" href={routes.wheello}>
            Voir le projet <Icon name="arrowRight" size={18} />
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
        <p className="pkicker">// 04 — CONTACT</p>
        <h2>Un projet en tête ? Parlons-en.</h2>
        <div className="pout__cta">
          <a className="btn btn--dark" href={quoteHref}>
            <Icon name="mail" size={18} /> Demander un devis
          </a>
          <a className="btn btn--light" href={routes.home}>
            <Icon name="arrowLeft" size={18} /> Voir mon portfolio
          </a>
        </div>
      </div>
    </section>
  )
}

function Legal() {
  const l = e.legal
  const rows = [
    ['Éditeur', `${l.name} — ${l.form}`],
    ['SIRET', l.siret],
    ['Adresse', l.address],
    ['Contact', profile.email],
    ['TVA', l.vat],
    ['Hébergeur', l.host],
  ]
  return (
    <section id="mentions" className="section elegal">
      <p className="pkicker">// MENTIONS LÉGALES</p>
      <dl>
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt className="mono">{k.toUpperCase()}</dt>
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
          ['#services', 'Services'],
          ['#methode', 'Déroulement'],
          ['#realisation', 'Réalisation'],
          ['#contact', 'Contact'],
        ]}
        back={{ href: routes.home, label: 'Portfolio' }}
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
        <p>DÉVELOPPEUR WEB & MOBILE · AUTO-ENTREPRENEUR</p>
      </footer>
    </>
  )
}
