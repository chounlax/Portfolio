import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { profile, skillGroups, experiences, diplomas, projects } from '../data.js'

// Réponses du terminal : chaque commande renvoie une liste de lignes
const commands = {
  aide: () => [
    'Commandes disponibles :',
    '  apropos      qui suis-je ?',
    '  formation    mes diplômes',
    '  experience   mes stages',
    '  projets      mes projets',
    '  competences  mes outils',
    '  contact      me joindre',
    '  cv           ouvrir mon CV',
    '  clear        effacer l’écran',
  ],
  apropos: () => [`${profile.firstName} ${profile.lastName} — ${profile.title}`, profile.role, profile.availability],
  formation: () => diplomas.map((d) => `[${d.date}] ${d.title}`),
  experience: () => experiences.map((e) => `[${e.date}] ${e.title} — ${e.company}`),
  projets: () => projects.map((p, i) => `${String(i + 1).padStart(2, '0')}. ${p.title} — ${p.subtitle}`),
  competences: () => skillGroups.map((g) => `${g.title.padEnd(18)} ${g.items.join(', ')}`),
  contact: () => [`e-mail    ${profile.email}`, `lieu      ${profile.location}`],
  cv: () => {
    window.open(profile.cv, '_blank', 'noopener')
    return ['Ouverture du CV dans un nouvel onglet…']
  },
}
const aliases = { help: 'aide', about: 'apropos', skills: 'competences', 'compétences': 'competences', 'expérience': 'experience', ls: 'aide' }

const welcome = [`Bienvenue sur le terminal de ${profile.firstName}.`, 'Tape « aide » pour voir les commandes.']

export default function Terminal() {
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState(welcome.map((text) => ({ text })))
  const [value, setValue] = useState('')
  const input = useRef()
  const body = useRef()

  useEffect(() => {
    if (open) input.current?.focus()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    body.current?.scrollTo(0, body.current.scrollHeight)
  }, [lines])

  const run = (e) => {
    e.preventDefault()
    const raw = value.trim().toLowerCase()
    setValue('')
    if (!raw) return
    if (raw === 'clear') return setLines([])
    if (raw === 'exit') return setOpen(false)
    const cmd = commands[aliases[raw] || raw]
    const output = cmd ? cmd() : [`commande introuvable : ${raw}. Tape « aide ».`]
    setLines((l) => [...l, { text: raw, prompt: true }, ...output.map((text) => ({ text }))])
  }

  return (
    <>
      <button
        className="fab fab--terminal"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Fermer le terminal' : 'Ouvrir le terminal'}
        aria-expanded={open}
      >
        <Icon name={open ? 'close' : 'terminal'} />
      </button>
      {open && (
        <div className="terminal" role="dialog" aria-label="Terminal">
          <div className="terminal__bar">
            <span>sean@portfolio:~</span>
            <button onClick={() => setOpen(false)} aria-label="Fermer">
              <Icon name="close" size={16} />
            </button>
          </div>
          <div className="terminal__body" ref={body} onClick={() => input.current?.focus()}>
            {lines.map((l, i) => (
              <p key={i} className={l.prompt ? 'terminal__cmd' : ''}>
                {l.prompt && <span>$ </span>}
                {l.text}
              </p>
            ))}
            <form onSubmit={run} className="terminal__form">
              <span>$</span>
              <input
                ref={input}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                aria-label="Commande"
                autoComplete="off"
                spellCheck="false"
              />
            </form>
          </div>
        </div>
      )}
    </>
  )
}
