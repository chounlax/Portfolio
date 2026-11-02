import { lazy } from 'react'
import Icon from '../components/Icon.jsx'
import PageScene from '../components/PageScene.jsx'
import PageNav, { PageTitle as Title } from '../components/PageNav.jsx'
import { routes } from '../urls.js'
import { useReveal } from '../hooks.js'
import { profile, cyber1 as c } from '../data.js'

// Scène 3D de l'en-tête, chargée à part pour que le texte s'affiche tout de suite
const Scene3D = lazy(() => import('../components/scenes/Cyber1Scene.jsx'))

// Petit sous-titre à l'intérieur d'une section
function SubTitle({ children, kicker, dark = false }) {
  return (
    <div className={`csub reveal ${dark ? 'csub--dark' : ''}`}>
      <p className="chip-small">{kicker}</p>
      <h3>{children}</h3>
    </div>
  )
}

function Hero() {
  const meta = [
    ['CADRE', c.context],
    ['PLANIFICATION', c.schedule],
    ['OUTILS', c.tools],
    ['FIABILITÉ', c.tests],
  ]
  // lignes du terminal animé : les 4 étapes d'une sauvegarde
  const log = [
    ['export', 'MariaDB → dump.sql'],
    ['chiffrement', 'GPG → dump.sql.gpg'],
    ['intégrité', 'empreinte SHA-256 calculée'],
    ['transfert', 'SFTP → serveur B'],
  ]
  return (
    <section className="phero">
      <PageScene Scene={Scene3D} />
      <div>
        <p className="phero__kicker">
          <span className="dot-green" /> PROJET · CYBERSÉCURITÉ
        </p>
        <h1 className="phero__title">
          {c.title.toUpperCase()}
          <em>.</em>
        </h1>
        <p className="phero__tagline">
          <strong>{c.name}.</strong> {c.tagline}
        </p>
        <dl className="phero__meta">
          {meta.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <div className="phero__cta">
          <a className="btn btn--light" href="#projet">
            Découvrir le projet <Icon name="chevronDown" size={18} />
          </a>
        </div>
      </div>

      {/* Animation : les étapes de la sauvegarde s'affichent l'une après l'autre */}
      <div className="cterm clog" aria-hidden="true">
        <div className="cterm__bar">
          <i />
          <i />
          <i />
          <span>serveur-a · 02:00</span>
        </div>
        <p>
          <span className="cterm__prompt">$</span> sauvegarde --auto
        </p>
        {log.map(([step, text], i) => (
          <p key={step} className="clog__line" style={{ animationDelay: `${0.6 + i * 0.7}s` }}>
            <b>✓</b> {step.padEnd(12, ' ')} <span>{text}</span>
          </p>
        ))}
        <p className="clog__line clog__done" style={{ animationDelay: '3.4s' }}>
          ● serveur B : .ready reçu
        </p>
      </div>

      <p className="phero__corner" aria-hidden="true">
        export + gpg + sha256 + sftp = sauvegarde;
      </p>
    </section>
  )
}

function Goals() {
  return (
    <section id="projet" className="section">
      <Title kicker="// 01 — LE PROJET">Les objectifs</Title>
      <p className="body-text reveal cintro">
        Garantir que les données d'une base MariaDB soient exportées, rendues illisibles sans clé, transférées
        automatiquement à distance, et qu'on puisse vérifier à tout moment si elles ont été altérées.
      </p>
      <div className="grid-3">
        {c.goals.map((g) => (
          <div key={g.title} className="box cfeature reveal">
            <Icon name={g.icon} size={26} />
            <h3>{g.title}</h3>
            <p>{g.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Workflow() {
  return (
    <section id="workflow" className="pdark">
      <div className="section pdark__inner">
        <Title kicker="// 02 — LE WORKFLOW">Comment se déroule une sauvegarde</Title>
        <p className="body-text reveal cintro cintro--dark">
          Tout se passe sur le serveur A, en 4 étapes. Le fichier SQL en clair n'existe que le temps du chiffrement.
        </p>
        <ol className="cflow reveal">
          {c.workflow.map((n, i) => (
            <li key={n.title} className={`cflow__node ${i === c.workflow.length - 1 ? 'cflow__node--ok' : ''}`}>
              <Icon name={n.icon} size={24} />
              <h4>
                {i + 1}. {n.title}
              </h4>
              {n.lines.map((l) => (
                <p key={l} className="mono">
                  {l}
                </p>
              ))}
            </li>
          ))}
        </ol>

        <SubTitle kicker="SERVEUR B" dark>
          Ce que reçoit le serveur B
        </SubTitle>
        <div className="grid-3">
          {c.received.map(([file, text]) => (
            <div key={file} className="cdcard reveal">
              <p className="cfile mono">{file}</p>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <p className="body-text reveal cnote">
          Le fichier <span className="mono">.ready</span> est envoyé en dernier : sa présence prouve que le transfert
          est allé jusqu'au bout.
        </p>
      </div>
    </section>
  )
}

function Architecture() {
  return (
    <section id="architecture" className="section">
      <Title kicker="// 03 — ARCHITECTURE">Séparation des droits</Title>
      <div className="cservers reveal">
        {c.servers.map((s, i) => (
          <div key={s.name} className={`box cserver ${i === 0 ? 'cserver--active' : ''}`}>
            <p className="mono">{s.role}</p>
            <h3>{s.name}</h3>
            <ul>
              {s.points.map((p) => (
                <li key={p}>
                  <span className="square" /> {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <span className="cservers__link mono" aria-hidden="true">
          SFTP →
        </span>
      </div>
      <div className="box cinfo cinfo--wide reveal">
        <p className="mono">COMPTE TECHNIQUE apbackup</p>
        <p>Le programme tourne sous un compte dédié aux sauvegardes, avec des droits limités, jamais en root.</p>
      </div>

      <SubTitle kicker="VERIFY">Détecter une altération</SubTitle>
      <ol className="csteps reveal">
        {c.verify.map((s, i) => (
          <li key={s.title} className="box">
            <span className="mono">{String(i + 1).padStart(2, '0')}</span>
            <h4>{s.title}</h4>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
      <p className="body-text reveal cnote">
        Si un seul octet de la sauvegarde change sur le serveur B, son empreinte SHA-256 ne correspond plus à la
        référence : l'altération est détectée.
      </p>
    </section>
  )
}

function Automation() {
  return (
    <section id="automatisation" className="section">
      <Title kicker="// 04 — AUTOMATISATION">Automatisation et tests</Title>
      <div className="csplit">
        <div className="reveal">
          <div className="cband cband--top">
            <p className="mono">PLANIFICATION CRON</p>
            <p className="ccron">0 2 * * *</p>
          </div>
          <p className="body-text cnote">
            Le CRON, le planificateur standard de Linux, lance la sauvegarde automatiquement tous les jours à 02h00.
          </p>
          <div className="cbig cbig--one">
            <div>
              <strong>12</strong>
              <span>tests logiques validés par le programme pour s'assurer de sa stabilité</span>
            </div>
          </div>
        </div>
        <div className="reveal">
          <p className="chip-small">DOCTOR</p>
          <h3 className="cdoctor__title">Tout est prêt avant de lancer</h3>
          <ul className="cchecks">
            {c.doctor.map((d) => (
              <li key={d}>
                <span>
                  <Icon name="check" size={18} />
                </span>
                {d}
              </li>
            ))}
          </ul>
          <p className="body-text cnote">
            La fonction Doctor vérifie l'environnement avant chaque exécution : on évite ainsi les plantages
            silencieux.
          </p>
        </div>
      </div>
    </section>
  )
}

function Control() {
  return (
    <section id="bilan" className="section">
      <Title kicker="// 05 — PILOTAGE">Interface de contrôle et bilan</Title>
      <div className="csplit">
        <div className="reveal">
          <pre className="ccode ccode--light">
            <span className="ccode__file">interface terminal · Python</span>
            {'\n'}
            {c.menu.map((m, i) => (
              <span key={m}>
                <b>{i + 1}.</b> {m}
                {'\n'}
              </span>
            ))}
            <em>&gt;</em> choix : _
          </pre>
          <p className="body-text cnote">
            Toute l'administration se fait depuis cette interface : lancer une sauvegarde, la vérifier, la restaurer
            ou consulter l'historique. (Aperçu simplifié du menu.)
          </p>
        </div>
        <div className="reveal">
          <p className="chip-small">CONFIGURATION</p>
          <dl className="cfacts cpaths">
            {c.paths.map(([k, v]) => (
              <div key={k}>
                <dt className="mono">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="body-text cnote">
            Aucun chemin n'est codé en dur : le projet est portable d'un serveur à l'autre.
          </p>
        </div>
      </div>

      <SubTitle kicker="BILAN">Un système fiable</SubTitle>
      <div className="cresults">
        {c.results.map((r) => (
          <div key={r} className="box cresult reveal">
            <Icon name="check" size={22} />
            <span>{r}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function Outro() {
  return (
    <section className="section pout">
      <div className="pout__box reveal">
        <p className="pkicker">// FIN DU PROJET</p>
        <h2>Envie d'en savoir plus sur ce projet ?</h2>
        <div className="pout__cta">
          <a className="btn btn--dark" href={`${routes.home}#contact`}>
            <Icon name="mail" size={18} /> Me contacter
          </a>
          <a className="btn btn--light" href={`${routes.home}#projects`}>
            <Icon name="arrowLeft" size={18} /> Tous les projets
          </a>
        </div>
      </div>
    </section>
  )
}

export default function Cyber1() {
  useReveal()

  return (
    <>
      <PageNav
        links={[
          ['#projet', 'Objectifs'],
          ['#workflow', 'Workflow'],
          ['#architecture', 'Architecture'],
          ['#automatisation', 'Automatisation'],
          ['#bilan', 'Bilan'],
        ]}
      />
      <main>
        <Hero />
        <Goals />
        <Workflow />
        <Architecture />
        <Automation />
        <Control />
        <Outro />
      </main>
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} {profile.firstName.toUpperCase()} {profile.lastName.toUpperCase()}
        </p>
        <p>CYBER 1 · {c.name.toUpperCase()}</p>
      </footer>
    </>
  )
}
