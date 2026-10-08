// Accueil WordPress : en-tête du portfolio + accès au projet Wheello et à la veille,
// mêmes classes et même style que src/App.jsx (le HTML est généré par wordpress/export.mjs).
import Icon from '../src/components/Icon.jsx'
import { profile, heroTags, projects, veille } from '../src/data.js'

function Title({ children }) {
  return (
    <h2 className="title reveal">
      {children}
      <span>.</span>
    </h2>
  )
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__code hero__code--tl" aria-hidden="true">
        <p>// portfolio.jsx</p>
        <p>// formation: BTS SIO</p>
        <p>// statut: recherche de stage</p>
      </div>
      <div className="hero__content">
        <h1 className="hero__name">
          <span>{profile.firstName}</span>
          <span className="hero__name-2">
            {profile.lastName}
            <em>.</em>
          </span>
        </h1>
        <p className="hero__role">&lt;{profile.title} /&gt;</p>
        <ul className="tags hero__tags">
          {heroTags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="hero__icons">
          <a className="icon-btn" href={`mailto:${profile.email}`} aria-label="Envoyer un e-mail">
            <Icon name="mail" />
          </a>
          <a className="icon-btn" href={profile.phoneHref} aria-label="Appeler">
            <Icon name="phone" />
          </a>
          <a className="icon-btn" href={profile.cv} target="_blank" rel="noopener" aria-label="Mon CV">
            <Icon name="file" />
          </a>
        </div>
        <div className="hero__cta">
          <a className="btn btn--dark" href="#acces">
            <Icon name="eye" size={18} /> Wheello & veille
          </a>
          <a className="btn btn--light" href={profile.cv} target="_blank" rel="noopener">
            <Icon name="file" size={18} /> Voir mon CV
          </a>
        </div>
      </div>
      <p className="hero__corner hero__corner--bl">{profile.location.toUpperCase()}</p>
      <div className="hero__corner hero__corner--br" aria-hidden="true">
        <p>const formation = "BTS SIO";</p>
        <p>const stage = "1 à 3 mois";</p>
        <p>const motivation = Infinity;</p>
      </div>
    </section>
  )
}


// Les deux accès principaux : le projet Wheello et la veille technologique
function Access() {
  const p = projects.find((x) => x.page)
  return (
    <section id="acces" className="section">
      <Title>Projet & veille</Title>
      <div className="grid-3 grid-2">
        <article className="box project project--link reveal">
          <span className="project__num" aria-hidden="true">
            01
          </span>
          <div className="project__cover">
            <img src={p.cover} alt={`Aperçu de ${p.title}`} />
          </div>
          <p className="chip-small">{p.category}</p>
          <h3>
            <a href={p.page} className="project__link">
              {p.title}
            </a>
          </h3>
          <p className="project__sub">{p.subtitle}</p>
          <p className="project__text">{p.text}</p>
          <ul className="tags tags--small">
            {p.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p className="project__more" aria-hidden="true">
            Voir le projet <Icon name="arrowRight" size={16} />
          </p>
        </article>
        <article className="box project project--link reveal">
          <span className="project__num" aria-hidden="true">
            02
          </span>
          <div className="project__cover project__cover--veille" aria-hidden="true">
            <p>
              <b>01</b> capteur.mesurer()
            </p>
            <p>
              <b>02</b> ia.detecter()
            </p>
            <p>
              <b>03</b> ia.conseiller()
            </p>
          </div>
          <p className="chip-small">VEILLE TECHNOLOGIQUE</p>
          <h3>
            <a href="./veille.html" className="project__link">
              {veille.title}
            </a>
          </h3>
          <p className="project__sub">Mise à jour : {veille.updated}</p>
          <p className="project__text">{veille.subject}.</p>
          <ul className="tags tags--small">
            <li>IA</li>
            <li>Données de santé</li>
            <li>Objets connectés</li>
            <li>RGPD</li>
          </ul>
          <p className="project__more" aria-hidden="true">
            Voir la veille <Icon name="arrowRight" size={16} />
          </p>
        </article>
      </div>
    </section>
  )
}






export default function HomeLite() {
  return (
    <>
      <header className="pnav">
        <a href="#top" className="nav__logo" aria-label="Haut de page">
          ST<span>.</span>
        </a>
        <nav className="pnav__links">
          <a href="#acces">Projet</a>
          <a href="./veille.html">Veille</a>
        </nav>
        <a href={profile.cv} className="pnav__back" target="_blank" rel="noopener">
          <Icon name="file" size={16} /> <span>CV</span>
        </a>
      </header>
      <main>
        <Hero />
        <Access />
      </main>
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} {profile.firstName.toUpperCase()} {profile.lastName.toUpperCase()}
        </p>
        <p>BTS SIO · DÉVELOPPEMENT WEB & MOBILE</p>
      </footer>
    </>
  )
}
