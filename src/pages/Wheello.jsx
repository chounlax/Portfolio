import { useEffect, useState } from 'react'
import Icon from '../components/Icon.jsx'
import Gallery from '../components/Gallery.jsx'
import { profile, wheello as w } from '../data.js'

// Fait apparaître les éléments .reveal quand ils entrent à l'écran
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.12 },
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function Title({ children, kicker }) {
  return (
    <div className="wtitle reveal">
      <p className="wkicker">{kicker}</p>
      <h2 className="title">
        {children}
        <span>.</span>
      </h2>
    </div>
  )
}

// Cadre « navigateur » autour d'une capture du back-office
function BrowserFrame({ image, onClick, label = 'wheello · back-office' }) {
  return (
    <button type="button" className="frame-browser" onClick={onClick} aria-label={`Agrandir : ${image.caption}`}>
      <span className="frame-browser__bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{label}</span>
      </span>
      <img src={image.src} alt={image.caption} loading="lazy" />
    </button>
  )
}

// Cadre « téléphone » autour d'une capture de l'application mobile
function PhoneFrame({ image, onClick }) {
  return (
    <button type="button" className="frame-phone" onClick={onClick} aria-label={`Agrandir : ${image.caption}`}>
      <img src={image.src} alt={image.caption} loading="lazy" />
    </button>
  )
}

function Nav() {
  return (
    <header className="wnav">
      <a href="./" className="nav__logo" aria-label="Accueil du portfolio">
        ST<span>.</span>
      </a>
      <nav className="wnav__links">
        <a href="#besoin">Besoin</a>
        <a href="#systeme">Système</a>
        <a href="#interfaces">Interfaces</a>
        <a href="#contribution">Ma contribution</a>
      </nav>
      <a href="./#projects" className="wnav__back">
        <Icon name="arrowLeft" size={16} /> <span>Projets</span>
      </a>
    </header>
  )
}

function Hero({ openGallery }) {
  const meta = [
    ['CLIENT', w.client],
    ['PÉRIODE', w.period],
    ['CADRE', w.context],
    ['MON RÔLE', w.myRole],
  ]
  return (
    <section className="whero">
      <div className="whero__text">
        <p className="whero__kicker">
          <span className="dot-green" /> PROJET 01 · {w.team.toUpperCase()}
        </p>
        <h1 className="whero__title">
          {w.title.toUpperCase()}
          <em>.</em>
        </h1>
        <p className="whero__tagline">{w.tagline}</p>
        <dl className="whero__meta">
          {meta.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <div className="whero__cta">
          <a className="btn btn--light" href="#systeme">
            Découvrir le système <Icon name="chevronDown" size={18} />
          </a>
        </div>
      </div>

      <div className="whero__visual" aria-label="Aperçu du back-office et de l'application mobile">
        <BrowserFrame image={w.web.images[0]} onClick={() => openGallery(w.web, 0)} />
        <PhoneFrame image={w.mobile.images[0]} onClick={() => openGallery(w.mobile, 0)} />
      </div>

      <p className="whero__corner" aria-hidden="true">
        symfony + flutter + api = wheello;
      </p>
    </section>
  )
}

function Need() {
  const figures = [
    ['2', 'interfaces : web et mobile'],
    ['1', 'API sécurisée par JWT'],
    ['3', "niveaux d'accès"],
  ]
  return (
    <section id="besoin" className="section">
      <Title kicker="// 01 — CONTEXTE">Le besoin</Title>
      <div className="need">
        <div className="need__text">
          {w.need.map((p) => (
            <p key={p} className="body-text reveal">
              {p}
            </p>
          ))}
        </div>
        <div className="need__figures">
          {figures.map(([n, label]) => (
            <div key={label} className="box stat reveal">
              <strong>{n}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Architecture() {
  return (
    <section id="systeme" className="section">
      <Title kicker="// 02 — ARCHITECTURE">Le système</Title>
      <p className="body-text reveal arch__intro">
        Wheello repose sur trois briques. L'application mobile ne parle jamais directement à la base de données : elle
        passe par l'API, qui vérifie le jeton de connexion avant de répondre.
      </p>

      <div className="arch reveal">
        <div className="arch__node arch__node--mine">
          <span className="arch__badge">MA PARTIE</span>
          <Icon name="mobile" size={28} />
          <h3>Application mobile</h3>
          <p className="mono">Flutter · Dart</p>
          <p className="arch__who">Salariés sur le terrain</p>
          <ul className="tags tags--small">
            <li>Tests unitaires</li>
            <li>Golden tests</li>
          </ul>
        </div>

        <div className="arch__wire arch__wire--mine" aria-hidden="true">
          <span className="arch__packet" />
          <span className="arch__label">HTTPS · JSON</span>
          <span className="arch__label">jeton JWT</span>
        </div>

        <div className="arch__server">
          <p className="arch__server-name">// SERVEUR SYMFONY</p>
          <div className="arch__node arch__node--small">
            <Icon name="lock" size={22} />
            <div>
              <h3>API REST</h3>
              <p className="arch__who">Routes protégées par JWT</p>
            </div>
          </div>
          <div className="arch__node arch__node--small">
            <Icon name="globe" size={22} />
            <div>
              <h3>Back-office web</h3>
              <p className="arch__who">Administrateurs</p>
            </div>
          </div>
        </div>

        <div className="arch__wire" aria-hidden="true">
          <span className="arch__packet" />
          <span className="arch__label">Doctrine</span>
        </div>

        <div className="arch__node">
          <Icon name="database" size={28} />
          <h3>Base de données</h3>
          <p className="mono">MySQL</p>
          <p className="arch__who">Véhicules, réservations, utilisateurs…</p>
        </div>
      </div>

      <p className="arch__legend reveal">
        <span className="arch__legend-box" /> En bleu : ce sur quoi j'ai travaillé côté application.
      </p>
    </section>
  )
}

function Showcase({ part, kind, openGallery }) {
  return (
    <article className={`show show--${kind}`}>
      <div className="show__text reveal">
        <p className="chip-small">{part.audience.toUpperCase()}</p>
        <h3>{part.title}</h3>
        <p className="project__sub">{part.stack}</p>
        <p className="body-text">{part.text}</p>
        <ul className="show__points">
          {part.points.map((p) => (
            <li key={p}>
              <span className="square" /> {p}
            </li>
          ))}
        </ul>
      </div>
      <div className={`show__shots show__shots--${kind} reveal`}>
        {part.images.map((img, i) =>
          kind === 'web' ? (
            <BrowserFrame key={img.src} image={img} onClick={() => openGallery(part, i)} />
          ) : (
            <figure key={img.src}>
              <PhoneFrame image={img} onClick={() => openGallery(part, i)} />
              <figcaption>{img.caption}</figcaption>
            </figure>
          ),
        )}
      </div>
    </article>
  )
}

function Interfaces({ openGallery }) {
  return (
    <section id="interfaces" className="section">
      <Title kicker="// 03 — INTERFACES">Deux applications, un système</Title>
      <Showcase part={w.web} kind="web" openGallery={openGallery} />
      <Showcase part={w.mobile} kind="mobile" openGallery={openGallery} />
      <p className="show__hint mono reveal">↳ Clique sur une capture pour l'agrandir.</p>
    </section>
  )
}

function Contribution() {
  return (
    <section id="contribution" className="wdark">
      <div className="section wdark__inner">
        <Title kicker="// 04 — MON TRAVAIL">Ma contribution</Title>
        <div className="contrib">
          {w.contributions.map((c, i) => (
            <article key={c.title} className="contrib__card reveal">
              <span className="contrib__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="contrib__icon">
                <Icon name={c.icon} size={24} />
              </span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <ol className="contrib__steps">
                {c.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section className="section">
      <Title kicker="// 05 — FONCTIONNALITÉS">Ce que fait Wheello</Title>
      <div className="grid-3">
        {w.features.map((f) => (
          <div key={f.title} className="box feature reveal">
            <Icon name={f.icon} size={26} />
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Stack() {
  return (
    <section className="section">
      <Title kicker="// 06 — TECHNOLOGIES">La stack</Title>
      <div className="box wstack reveal">
        {w.stack.map((g) => (
          <div key={g.title} className="wstack__row">
            <p className="mono">{g.title.toUpperCase()}</p>
            <ul className="tags">
              {g.items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function Outro() {
  return (
    <section className="section wout">
      <div className="wout__box reveal">
        <p className="wkicker">// FIN DU PROJET</p>
        <h2>Envie d'en savoir plus sur ce projet ?</h2>
        <div className="wout__cta">
          <a className="btn btn--dark" href="./#contact">
            <Icon name="mail" size={18} /> Me contacter
          </a>
          <a className="btn btn--light" href="./#projects">
            <Icon name="arrowLeft" size={18} /> Tous les projets
          </a>
        </div>
      </div>
    </section>
  )
}

export default function Wheello() {
  const [gallery, setGallery] = useState(null)
  useReveal()

  const openGallery = (part, start) => setGallery({ title: part.title, images: part.images, start })

  return (
    <>
      <Nav />
      <main>
        <Hero openGallery={openGallery} />
        <Need />
        <Architecture />
        <Interfaces openGallery={openGallery} />
        <Contribution />
        <Features />
        <Stack />
        <Outro />
      </main>
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} {profile.firstName.toUpperCase()} {profile.lastName.toUpperCase()}
        </p>
        <p>WHEELLO · STAGE CHEZ {w.client.toUpperCase()}</p>
      </footer>
      {gallery && <Gallery {...gallery} onClose={() => setGallery(null)} />}
    </>
  )
}
