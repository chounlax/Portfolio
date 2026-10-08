import Icon from './Icon.jsx'
import { routes } from '../urls.js'

// Barre de navigation des pages secondaires : logo, ancres de la page, retour à l'accueil
export default function PageNav({ links, back = { href: `${routes.home}#projects`, label: 'Projets' } }) {
  return (
    <header className="pnav">
      <a href={routes.home} className="nav__logo" aria-label="Accueil du portfolio">
        ST<span>.</span>
      </a>
      <nav className="pnav__links">
        {links.map(([href, label]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <a href={back.href} className="pnav__back">
        <Icon name="arrowLeft" size={16} /> <span>{back.label}</span>
      </a>
    </header>
  )
}

// Titre de section avec sa petite étiquette « // 01 — ... »
export function PageTitle({ children, kicker }) {
  return (
    <div className="ptitle reveal">
      <p className="pkicker">{kicker}</p>
      <h2 className="title">
        {children}
        <span>.</span>
      </h2>
    </div>
  )
}
