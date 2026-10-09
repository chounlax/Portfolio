import { Component, Suspense, lazy, useEffect, useRef, useState } from 'react'
import Icon from './components/Icon.jsx'
import Loader from './components/Loader.jsx'
import Terminal from './components/Terminal.jsx'
import { useReveal } from './hooks.js'
import {
  profile,
  heroTags,
  stats,
  principles,
  skillGroups,
  experiences,
  projects,
  diplomas,
  interests,
  marquee,
} from './data.js'
import { routes } from './urls.js'

// La scène 3D est chargée à part pour que le texte s'affiche tout de suite
const HeroScene = lazy(() => import('./components/HeroScene.jsx'))

const links = [
  ['#about', 'À propos'],
  ['#education', 'Formation'],
  ['#experience', 'Expériences'],
  ['#projects', 'Projets'],
  ['#skills', 'Compétences'],
  ['#contact', 'Contact'],
  [routes.veille, 'Veille'],
]

// ---------- Outils ----------

// Vérifie une seule fois que le navigateur sait afficher de la 3D (WebGL)
let webgl
function webglAvailable() {
  if (webgl === undefined) {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
      webgl = !!gl
      gl?.getExtension('WEBGL_lose_context')?.loseContext()
    } catch {
      webgl = false
    }
  }
  return webgl
}

// Si la scène 3D plante (fichier bloqué, carte graphique non compatible...),
// on la retire simplement au lieu de laisser toute la page devenir blanche
class SceneBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    console.warn('Scène 3D désactivée :', error)
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

// L'intro n'est montrée qu'une fois par visite (pas à chaque rechargement)
function introAlreadySeen() {
  try {
    return sessionStorage.getItem('intro-vue') === '1'
  } catch {
    return false
  }
}

// Pendant le défilement, on suspend les effets de survol : sinon chaque carte
// qui passe sous le curseur lance une animation et la page saccade
function useScrollingClass() {
  useEffect(() => {
    const root = document.documentElement
    let timer
    const onScroll = () => {
      if (!timer) root.classList.add('is-scrolling')
      clearTimeout(timer)
      timer = setTimeout(() => {
        root.classList.remove('is-scrolling')
        timer = undefined
      }, 150)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
}

// Appelle onChange(progression 0 → 1) au plus une fois par image pendant le défilement.
// Pas d'état React ici : sinon tout le site serait recalculé à chaque mouvement de molette.
function useScroll(onChange) {
  const callback = useRef(onChange)
  callback.current = onChange
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      callback.current(max > 0 ? window.scrollY / max : 0)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
}

function Title({ children }) {
  return (
    <h2 className="title reveal">
      {children}
      <span>.</span>
    </h2>
  )
}

// ---------- Sections ----------

function Navbar() {
  const [open, setOpen] = useState(false)
  // ne change qu'au franchissement du seuil, donc très peu de mises à jour
  const [solid, setSolid] = useState(false)
  useScroll(() => setSolid(window.scrollY > 40))
  return (
    <header className={`nav ${solid ? 'nav--solid' : ''}`}>
      <a href="#top" className="nav__logo" aria-label="Haut de page">
        ST<span>.</span>
      </a>
      <button className="nav__burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        <Icon name={open ? 'close' : 'menu'} />
      </button>
      <nav className={`nav__links ${open ? 'open' : ''}`}>
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  )
}

function Hero() {
  const today = new Date().toISOString().slice(0, 10)
  const section = useRef()
  const [onScreen, setOnScreen] = useState(true)
  const [scrolling, setScrolling] = useState(false)

  // La 3D ne tourne que lorsque l'en-tête est visible...
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting))
    io.observe(section.current)
    return () => io.disconnect()
  }, [])

  // ...et elle se met en pause pendant le défilement (2 mises à jour par geste seulement)
  useEffect(() => {
    let timer
    const onScroll = () => {
      if (!timer) setScrolling(true)
      clearTimeout(timer)
      timer = setTimeout(() => {
        setScrolling(false)
        timer = undefined
      }, 150)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section id="top" className="hero" ref={section}>
      {webglAvailable() && (
        <div className="hero__canvas" aria-hidden="true">
          <SceneBoundary>
            <Suspense fallback={null}>
              <HeroScene active={onScreen && !scrolling} />
            </Suspense>
          </SceneBoundary>
        </div>
      )}

      <div className="hero__code hero__code--tl" aria-hidden="true">
        <p>// portfolio.jsx</p>
        <p>// formation: BTS SIO</p>
        <p>// statut: recherche de stage</p>
        <p>// last_build: {today}</p>
      </div>
      <div className="hero__code hero__code--tr" aria-hidden="true">
        {['001', '002', '003', '004', '005', '006'].map((n) => (
          <p key={n}>{n}</p>
        ))}
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
          <a className="icon-btn" href="#contact" aria-label="Localisation">
            <Icon name="pin" />
          </a>
          <a className="icon-btn" href={profile.cv} target="_blank" rel="noopener" aria-label="Mon CV">
            <Icon name="file" />
          </a>
        </div>
        <div className="hero__cta">
          <a className="btn btn--dark" href={profile.cv} target="_blank" rel="noopener">
            <Icon name="eye" size={18} /> Voir mon CV
          </a>
          <a className="btn btn--light" href={profile.cv} download="CV-Sean-Thompson.pdf">
            <Icon name="download" size={18} /> Télécharger
          </a>
        </div>
      </div>

      <p className="hero__corner hero__corner--bl">{profile.location.toUpperCase()}</p>
      <div className="hero__corner hero__corner--br" aria-hidden="true">
        <p>const formation = "BTS SIO";</p>
        <p>const stage = "6 semaines";</p>
        <p>const motivation = Infinity;</p>
      </div>
      <a href="#about" className="hero__down" aria-label="Défiler vers le bas">
        <Icon name="chevronDown" />
      </a>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section">
      <Title>À propos</Title>
      <div className="about">
        <aside className="about__side reveal">
          <figure className="about__photo">
            <img src={profile.photo} alt={`Portrait de ${profile.firstName} ${profile.lastName}`} />
            <figcaption>
              <span className="dot-green" /> DISPONIBLE
            </figcaption>
          </figure>
          <dl className="about__info">
            <div>
              <dt>NOM :</dt>
              <dd>
                {profile.firstName.toUpperCase()} {profile.lastName.toUpperCase()}
              </dd>
            </div>
            <div>
              <dt>RÔLE :</dt>
              <dd>{profile.role.toUpperCase()}</dd>
            </div>
            <div>
              <dt>
                <Icon name="pin" size={14} /> LOC :
              </dt>
              <dd>{profile.location.toUpperCase()}</dd>
            </div>
            <div>
              <dt>LOISIRS :</dt>
              <dd>{interests.join(' · ').toUpperCase()}</dd>
            </div>
          </dl>
        </aside>

        <div className="about__main">
          {profile.summary.map((p) => (
            <p key={p} className="body-text reveal">
              {p}
            </p>
          ))}
          <div className="stats">
            {stats.map((s) => (
              <div key={s.label} className="box stat reveal">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="box principles reveal">
            <p className="principles__head">// MA FAÇON DE TRAVAILLER</p>
            <div className="principles__grid">
              {principles.map((p) => (
                <div key={p.title}>
                  <h3>
                    <span className="square" /> {p.title.toUpperCase()}
                  </h3>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>
          </div>
          <a className="btn btn--light reveal" href={profile.cv} target="_blank" rel="noopener">
            <Icon name="file" size={18} /> Consulter mon CV complet
          </a>
        </div>
      </div>
    </section>
  )
}

function Education() {
  return (
    <section id="education" className="section">
      <Title>Formation</Title>
      <div className="education">
        {diplomas.map((d) => (
          <article key={d.title} className="edu reveal">
            <h3>{d.title}</h3>
            <p className="edu__meta">
              {d.school} <span className="sep">•</span> <span className="mono">{d.date}</span>
            </p>
            {d.points.length > 0 && (
              <ul>
                {d.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="section">
      <Title>Expériences</Title>
      <ol className="timeline">
        {experiences.map((e) => (
          <li key={e.title} className="timeline__item reveal">
            <div className="timeline__left">
              <p className="mono">[{e.date}]</p>
              <h3>{e.company}</h3>
            </div>
            <div className="timeline__right">
              <h3>{e.title}</h3>
              <ul>
                {e.tasks.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="section">
      <Title>Projets</Title>
      <div className="grid-3">
        {projects.map((p, i) => (
          <article key={p.title} className={`box project reveal ${p.page ? 'project--link' : ''}`}>
            <span className="project__num" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            {p.cover && (
              <div className="project__cover">
                <img src={p.cover} alt={`Aperçu de ${p.title}`} loading="lazy" />
              </div>
            )}
            <p className="chip-small">{p.category}</p>
            <h3>
              {p.page ? (
                // le lien couvre toute la carte (voir .project--link dans le CSS)
                <a href={p.page} className="project__link">
                  {p.title}
                </a>
              ) : (
                p.title
              )}
            </h3>
            <p className="project__sub">{p.subtitle}</p>
            <p className="project__text">{p.text}</p>
            <ul className="tags tags--small">
              {p.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            {p.page && (
              <p className="project__more" aria-hidden="true">
                Voir le projet <Icon name="arrowRight" size={16} />
              </p>
            )}
          </article>
        ))}
        <div className="placeholder reveal">
          <Icon name="cube" size={30} />
          <p>// PROCHAIN PROJET EN COURS...</p>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="section">
      <Title>Compétences</Title>
      <div className="grid-3">
        {skillGroups.map((g) => (
          <article key={g.title} className="box skill reveal">
            <h3>
              <span className="skill__icon">
                <Icon name={g.icon} />
              </span>
              {g.title.toUpperCase()}
            </h3>
            <ul className="tags">
              {g.items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </article>
        ))}
        <div className="placeholder reveal">
          <Icon name="cube" size={30} />
          <p>// TOUJOURS EN APPRENTISSAGE...</p>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* presse-papiers indisponible : l'adresse reste affichée */
    }
  }

  // Le formulaire prépare un e-mail dans la messagerie du visiteur
  const send = (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const subject = `Contact depuis le portfolio — ${form.get('name')}`
    const body = `${message}\n\n${form.get('name')} (${form.get('email')})`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section id="contact" className="section">
      <Title>Me contacter</Title>
      <div className="contact">
        <div className="contact__info reveal">
          <p className="body-text">
            Je recherche un stage de 6 semaines du 4 janvier au 13 février. Une question, une proposition ou simplement envie d'échanger ?
            Écrivez-moi, je vous répondrai rapidement.
          </p>
          <div className="info-card">
            <span className="info-card__icon">
              <Icon name="mail" />
            </span>
            <div>
              <p className="info-card__label">E-MAIL</p>
              <a className="mono" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </div>
            <button className="info-card__copy" onClick={copy} aria-label="Copier l'adresse e-mail">
              <Icon name={copied ? 'check' : 'copy'} size={18} />
            </button>
          </div>
          <div className="info-card">
            <span className="info-card__icon">
              <Icon name="phone" />
            </span>
            <div>
              <p className="info-card__label">TÉLÉPHONE</p>
              <a className="mono" href={profile.phoneHref}>
                {profile.phone}
              </a>
            </div>
          </div>
          <div className="info-card">
            <span className="info-card__icon">
              <Icon name="globe" />
            </span>
            <div>
              <p className="info-card__label">STATUT ACTUEL</p>
              <p className="mono">{profile.status}</p>
            </div>
          </div>
        </div>

        <form className="contact__form reveal" onSubmit={send}>
          <label>
            <span className="sr-only">Votre nom</span>
            <input name="name" placeholder="VOTRE NOM" required autoComplete="name" />
          </label>
          <label>
            <span className="sr-only">Votre e-mail</span>
            <input name="email" type="email" placeholder="VOTRE E-MAIL" required autoComplete="email" />
          </label>
          <label>
            <span className="sr-only">Message</span>
            <textarea
              name="message"
              placeholder="MESSAGE"
              rows="5"
              maxLength={1000}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <p className="contact__count mono">{message.length} / 1000</p>
          <button className="btn btn--dark btn--full" type="submit">
            Envoyer le message <Icon name="send" size={18} />
          </button>
          {sent && (
            <p className="contact__note mono">
              Votre messagerie s'est ouverte avec le message prêt à partir. Sinon, écrivez directement à{' '}
              {profile.email}.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

function Marquee() {
  const items = [...marquee, ...marquee]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((t, i) => (
          <span key={i}>
            {t} <b>/</b>
          </span>
        ))}
      </div>
    </div>
  )
}

function Finale() {
  const cards = [
    { icon: 'mail', label: 'E-MAIL', href: `mailto:${profile.email}` },
    { icon: 'phone', label: 'TÉLÉPHONE', href: profile.phoneHref },
    { icon: 'file', label: 'MON CV', href: profile.cv, external: true },
    { icon: 'arrowUp', label: 'HAUT DE PAGE', href: '#top' },
  ]
  return (
    <section className="finale">
      <p className="finale__ghost" aria-hidden="true">
        MERCI
      </p>
      <h2 className="finale__title reveal">
        CONSTRUISONS QUELQUE CHOSE <mark>D'UTILE</mark> ENSEMBLE.
      </h2>
      <div className="finale__cards">
        {cards.map((c) => (
          <a
            key={c.label}
            className="finale__card reveal"
            href={c.href}
            {...(c.external ? { target: '_blank', rel: 'noopener' } : {})}
          >
            <Icon name={c.icon} size={26} />
            <span>{c.label}</span>
          </a>
        ))}
      </div>
      <div className="finale__status reveal">
        <p className="pill">
          <span className="dot-green" /> {profile.availability.toUpperCase()}
        </p>
        <p className="mono">ÉTUDIANT EN BTS SIO · DÉVELOPPEMENT WEB & MOBILE</p>
      </div>
    </section>
  )
}

const RING = 2 * Math.PI * 20 // périmètre de l'anneau de progression

function ScrollTop() {
  const [show, setShow] = useState(false)
  const ring = useRef()
  // L'anneau est mis à jour directement, sans repasser par React
  useScroll((progress) => {
    setShow(progress > 0.05)
    ring.current?.setAttribute('stroke-dashoffset', RING * (1 - progress))
  })
  return (
    <a href="#top" className={`fab fab--top ${show ? 'show' : ''}`} aria-label="Revenir en haut de la page">
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="20" className="fab__track" />
        <circle ref={ring} cx="24" cy="24" r="20" className="fab__ring" strokeDasharray={RING} strokeDashoffset={RING} />
      </svg>
      <Icon name="arrowUp" size={18} />
    </a>
  )
}

export default function App() {
  const [intro, setIntro] = useState(() => !introAlreadySeen())
  useReveal()
  useScrollingClass()

  // Pas de défilement pendant l'intro
  useEffect(() => {
    document.documentElement.style.overflow = intro ? 'hidden' : ''
  }, [intro])

  const enter = () => {
    try {
      sessionStorage.setItem('intro-vue', '1')
    } catch {
      /* stockage indisponible : l'intro réapparaîtra au prochain chargement */
    }
    setIntro(false)
  }

  return (
    <>
      {intro && <Loader onEnter={enter} />}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Marquee />
      <Finale />
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} {profile.firstName.toUpperCase()} {profile.lastName.toUpperCase()}
        </p>
        <p>CONÇU & DÉVELOPPÉ PAR SEAN · REACT & THREE.JS</p>
      </footer>
      <ScrollTop />
      <Terminal />
    </>
  )
}
