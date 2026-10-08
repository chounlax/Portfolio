import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import PageNav, { PageTitle as Title } from '../components/PageNav.jsx'
import { routes } from '../urls.js'
import { useReveal } from '../hooks.js'
import { profile, veille as v } from '../data.js'

const FILTERS = [
  ['TOUS', 'Tout'],
  ['DÉTECTER', 'Détecter'],
  ['CONSEILLER', 'Conseiller'],
  ['LOI', 'Loi'],
  ['MARCHÉ', 'Marché'],
]

// Petit écran façon terminal : les trois étapes de l'évolution, en code
function HeroConsole() {
  return (
    <div className="vconsole" aria-hidden="true">
      <div className="vconsole__bar">
        <i />
        <i />
        <i />
        <span>montre.log</span>
      </div>
      <svg className="vconsole__pulse" viewBox="0 0 320 70" preserveAspectRatio="none">
        <polyline points="0,40 60,40 75,40 85,15 95,62 105,30 115,40 175,40 190,40 200,12 210,64 220,28 230,40 320,40" />
      </svg>
      <div className="vconsole__lines">
        <p>
          <b>01</b> capteur.mesurer() <span>→ 62 bpm · 7 h 12 de sommeil</span>
        </p>
        <p>
          <b>02</b> ia.detecter() <span className="warn">→ signe à surveiller</span>
        </p>
        <p>
          <b>03</b> ia.conseiller() <span className="ok">→ « séance légère aujourd'hui »</span>
        </p>
      </div>
    </div>
  )
}

function Hero() {
  const meta = [
    ['PÉRIODE ÉTUDIÉE', v.period],
    ['MISE À JOUR', v.updated],
    ['FAITS SUIVIS', `${v.timeline.length} actualités`],
    ['SOURCES', `${Object.keys(v.sources).length} références`],
  ]
  return (
    <section className="phero">
      <div>
        <p className="phero__kicker">
          <span className="dot-green" /> VEILLE TECHNOLOGIQUE · BTS SIO
        </p>
        <h1 className="phero__title vhero__title">
          {v.title.toUpperCase()}
          <em>.</em>
        </h1>
        <p className="phero__tagline">{v.subject}.</p>
        <dl className="phero__meta">
          {meta.map(([k, val]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{val}</dd>
            </div>
          ))}
        </dl>
        <div className="phero__cta">
          <a className="btn btn--light" href="#chronologie">
            Voir la chronologie <Icon name="chevronDown" size={18} />
          </a>
        </div>
      </div>
      <HeroConsole />
      <p className="phero__corner" aria-hidden="true">
        mesurer → détecter → conseiller
      </p>
    </section>
  )
}

function Question() {
  return (
    <section id="sujet" className="section">
      <Title kicker="// 01 — LE SUJET">Problématique</Title>
      <blockquote className="vquestion reveal">
        <span aria-hidden="true">?</span>
        <p>{v.question}</p>
      </blockquote>
      <p className="pkicker vsub reveal">// MA MÉTHODE DE VEILLE</p>
      <div className="grid-3">
        {v.method.map((m) => (
          <div key={m.title} className="box vcard reveal">
            <Icon name={m.icon} size={24} />
            <h3>{m.title}</h3>
            <p>{m.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Notions() {
  return (
    <section className="section">
      <Title kicker="// 02 — VOCABULAIRE">Les notions clés</Title>
      <dl className="vnotions">
        {v.notions.map((n, i) => (
          <div key={n.term} className="vnotions__item reveal">
            <dt>
              <span className="mono">{String(i + 1).padStart(2, '0')}</span> {n.term}
            </dt>
            <dd>{n.text}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function Phases() {
  return (
    <section className="section">
      <Title kicker="// 03 — L'ÉVOLUTION">Trois étapes</Title>
      <ol className="vphases">
        {v.phases.map((p) => (
          <li key={p.title} className="vphases__item reveal">
            <p className="vphases__label">{p.label}</p>
            <h3>{p.title}</h3>
            <p className="project__sub">{p.years}</p>
            <p className="vphases__text">{p.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Timeline() {
  const [filter, setFilter] = useState('TOUS')
  const items = v.timeline.filter((t) => filter === 'TOUS' || t.tag === filter)

  return (
    <section id="chronologie" className="section">
      <Title kicker="// 04 — L'ACTUALITÉ">Chronologie</Title>
      <div className="vfilters reveal" role="group" aria-label="Filtrer la chronologie">
        {FILTERS.map(([key, label]) => (
          <button key={key} type="button" aria-pressed={filter === key} onClick={() => setFilter(key)}>
            {label}
            <span>{key === 'TOUS' ? v.timeline.length : v.timeline.filter((t) => t.tag === key).length}</span>
          </button>
        ))}
      </div>
      <ol className="vtimeline">
        {items.map((t) => {
          const src = v.sources[t.source]
          return (
            <li key={t.date + t.title} className="vtimeline__item">
              <p className="vtimeline__date mono">{t.date}</p>
              <div className="vtimeline__body">
                <p className={`vtag vtag--${t.tag.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()}`}>
                  {t.tag}
                </p>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
                {src && (
                  <a className="vtimeline__src" href={src.url} target="_blank" rel="noopener">
                    Source : {src.site} <Icon name="arrowRight" size={14} />
                  </a>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

function Laws() {
  return (
    <section id="cadre" className="pdark">
      <div className="section">
        <Title kicker="// 05 — EN EUROPE">Le cadre légal</Title>
        <div className="vlaws">
          {v.laws.map((l) => (
            <article key={l.name} className="vlaws__card reveal">
              <h3>{l.name}</h3>
              <p className="vlaws__status mono">{l.status}</p>
              <p>{l.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Balance() {
  return (
    <section className="section">
      <Title kicker="// 06 — LE BILAN">Avantages & limites</Title>
      <div className="vbalance">
        <div className="box vbalance__col reveal">
          <p className="vbalance__head vbalance__head--pro">
            <Icon name="check" size={18} /> CE QUE L'IA APPORTE
          </p>
          <ul>
            {v.pros.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div className="box vbalance__col reveal">
          <p className="vbalance__head vbalance__head--con">
            <Icon name="alert" size={18} /> CE QUI POSE QUESTION
          </p>
          <ul>
            {v.cons.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Analysis() {
  return (
    <section id="analyse" className="section">
      <Title kicker="// 07 — MON AVIS">Mon analyse</Title>
      <div className="vanalysis reveal">
        {v.analysis.map((p, i) => (
          <p key={p}>
            <span className="mono">{String(i + 1).padStart(2, '0')}</span>
            {p}
          </p>
        ))}
      </div>
    </section>
  )
}

function Sources() {
  return (
    <section id="sources" className="section">
      <Title kicker="// 08 — RÉFÉRENCES">Sources</Title>
      <ol className="vsources reveal">
        {Object.entries(v.sources).map(([key, s]) => (
          <li key={key}>
            <a href={s.url} target="_blank" rel="noopener">
              <span className="vsources__site mono">
                {s.site} · {s.date}
              </span>
              <span className="vsources__label">{s.label}</span>
              <Icon name="arrowRight" size={16} />
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default function Veille() {
  useReveal()
  return (
    <>
      <PageNav
        back={{ href: routes.home, label: 'Accueil' }}
        links={[
          ['#sujet', 'Sujet'],
          ['#chronologie', 'Chronologie'],
          ['#cadre', 'Cadre légal'],
          ['#analyse', 'Analyse'],
          ['#sources', 'Sources'],
        ]}
      />
      <main>
        <Hero />
        <Question />
        <Notions />
        <Phases />
        <Timeline />
        <Laws />
        <Balance />
        <Analysis />
        <Sources />
        <section className="section pout">
          <div className="pout__box reveal">
            <p className="pkicker">// FIN DE LA VEILLE</p>
            <h2>Une actualité à partager sur le sujet ?</h2>
            <div className="pout__cta">
              <a className="btn btn--dark" href={`${routes.home}#contact`}>
                <Icon name="mail" size={18} /> Me contacter
              </a>
              <a className="btn btn--light" href={routes.home}>
                <Icon name="arrowLeft" size={18} /> Retour à l'accueil
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} {profile.firstName.toUpperCase()} {profile.lastName.toUpperCase()}
        </p>
        <p>VEILLE TECHNOLOGIQUE · MISE À JOUR {v.updated.toUpperCase()}</p>
      </footer>
    </>
  )
}
