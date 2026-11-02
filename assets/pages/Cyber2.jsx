import { lazy, useState } from 'react'
import Icon from '../components/Icon.jsx'
import PageScene from '../components/PageScene.jsx'
import Gallery from '../components/Gallery.jsx'
import PageNav, { PageTitle as Title } from '../components/PageNav.jsx'
import { routes } from '../urls.js'
import { useReveal } from '../hooks.js'
import { profile, cyber2 as c } from '../data.js'

// Scène 3D de l'en-tête, chargée à part pour que le texte s'affiche tout de suite
const Scene3D = lazy(() => import('../components/scenes/Cyber2Scene.jsx'))

// Cadre « navigateur » autour d'une capture de l'application
function Shot({ image, onClick, label = 'modele · symfony' }) {
  return (
    <button type="button" className="cshot" onClick={onClick} aria-label={`Agrandir : ${image.caption}`}>
      <span className="cshot__bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{label}</span>
      </span>
      <img src={image.src} alt={image.caption} loading="lazy" />
    </button>
  )
}

// Petit sous-titre à l'intérieur d'une section (ex. « Le fichier deploy.yml »)
function SubTitle({ children, kicker }) {
  return (
    <div className="csub reveal">
      <p className="chip-small">{kicker}</p>
      <h3>{children}</h3>
    </div>
  )
}

function Hero() {
  const meta = [
    ['CADRE', c.context],
    ['PÉRIODE', c.period],
    ['ÉQUIPE', c.team],
    ['DÉPÔT', c.repo],
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

      {/* Animation : un git push, et le site de test est à jour */}
      <div className="cterm" aria-hidden="true">
        <div className="cterm__bar">
          <i />
          <i />
          <i />
          <span>machine-de-test</span>
        </div>
        <p>
          <span className="cterm__prompt">$</span> <span className="cterm__type">git push origin main</span>
        </p>
        <p className="cterm__ok">✓ déployé sur la machine de test</p>
        <span className="cterm__cursor" />
      </div>

      <p className="phero__corner" aria-hidden="true">
        symfony + github actions = modèle sécurisé;
      </p>
    </section>
  )
}

// Vidéo de présentation, dans un cadre « téléphone » (format vertical)
function Video() {
  return (
    <section id="video" className="section">
      <Title kicker="// 00 — EN VIDÉO">{c.video.title}</Title>
      <div className="cvideo">
        <div className="cvideo__frame reveal">
          <video src={c.video.src} poster={c.video.poster} controls playsInline preload="metadata">
            Ton navigateur ne peut pas lire cette vidéo.
          </video>
        </div>
        <div className="cvideo__text reveal">
          <p className="body-text">{c.video.text}</p>
          <ul className="cvideo__points">
            {c.video.points.map((p) => (
              <li key={p}>
                <span className="square" /> {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Mission() {
  return (
    <section id="projet" className="section">
      <Title kicker="// 01 — LE PROJET">Le cahier des charges</Title>
      <p className="body-text reveal cintro">
        La mission : créer une application Symfony sécurisée qui gère les accès et les habilitations, et qui serve de
        base à d'autres projets. Six exigences :
      </p>
      <div className="grid-3">
        {c.mission.map((m) => (
          <div key={m.title} className="box cfeature reveal">
            <Icon name={m.icon} size={26} />
            <h3>{m.title}</h3>
            <p>{m.text}</p>
          </div>
        ))}
      </div>

      <SubTitle kicker="LES OUTILS">Les outils utilisés</SubTitle>
      <div className="cstack">
        {c.stack.map((g) => (
          <div key={g.title} className="box cstack__box reveal">
            <p className="mono">{g.title.toUpperCase()}</p>
            <ul className="tags">
              {g.items.map((t) => (
                <li key={t} className={g.key.includes(t) ? 'ckey' : ''}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="cband reveal">
        <p className="mono">COMPOSANTS DE SÉCURITÉ SYMFONY</p>
        <p>{c.securityComponents.join(' · ')}</p>
      </div>
    </section>
  )
}

function Actions() {
  return (
    <section id="actions" className="pdark">
      <div className="section pdark__inner">
        <Title kicker="// 02 — GITHUB ACTIONS">Le déploiement automatique</Title>
        <p className="body-text reveal cintro cintro--dark">
          Chaque push sur <span className="mono">main</span> met à jour la machine de test, sans aucune commande.
        </p>

        {/* Pourquoi automatiser ? */}
        <div className="cbefore reveal">
          <div className="cbefore__col">
            <p className="mono">AVANT</p>
            <h3>À la main, à chaque mise à jour</h3>
            <ol>
              {c.before.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <p className="cbefore__warn">Une étape oubliée = un site cassé.</p>
          </div>
          <span className="cbefore__arrow" aria-hidden="true">
            <Icon name="arrowRight" size={32} />
          </span>
          <div className="cbefore__col cbefore__col--after">
            <p className="mono">APRÈS</p>
            <h3>Un seul geste</h3>
            <p className="cbefore__cmd">$ git push</p>
            <p>GitHub Actions lance tout seul le déploiement sur la machine de test.</p>
            <p className="cbefore__ok">✓ 4 étapes · environ 10 secondes</p>
          </div>
        </div>

        {/* Du push au site à jour */}
        <div className="csub csub--dark reveal">
          <p className="chip-small">ARCHITECTURE</p>
          <h3>Du push au site à jour</h3>
        </div>
        <ol className="cflow reveal">
          {c.flow.map((n, i) => (
            <li key={n.title} className={`cflow__node ${i === c.flow.length - 1 ? 'cflow__node--ok' : ''}`}>
              <Icon name={n.icon} size={24} />
              <h4>{n.title}</h4>
              {n.lines.map((l) => (
                <p key={l} className="mono">
                  {l}
                </p>
              ))}
            </li>
          ))}
        </ol>
        <p className="body-text reveal cnote">
          Le runner est installé sur la machine de test et reste connecté à GitHub en attendant du travail. C'est lui
          qui va vers GitHub, pas l'inverse : la machine de test n'a pas besoin d'être joignable depuis Internet.
        </p>

        {/* Le fichier deploy.yml */}
        <div className="csub csub--dark reveal">
          <p className="chip-small">WORKFLOW</p>
          <h3>Le fichier deploy.yml</h3>
        </div>
        <div className="cyaml reveal">
          <pre className="ccode">
            <span className="ccode__file">.github/workflows/deploy.yml</span>
            {'\n'}
            <b>name:</b> Déploiement sur la machine de test{'\n'}
            <b>on:</b>{'\n'}
            {'  '}<b>push:</b>{'\n'}
            {'    '}<b>branches:</b> [main]{'\n'}
            <b>jobs:</b>{'\n'}
            {'  '}<b>deploy:</b>{'\n'}
            {'    '}<b>runs-on:</b> <em>self-hosted</em>{'\n'}
            {'    '}<b>steps:</b>{'\n'}
            {'      '}- <b>run:</b> git pull origin main{'\n'}
            {'      '}- <b>run:</b> composer install --no-interaction{'\n'}
            {'      '}- <b>run:</b> php bin/console doctrine:migrations:migrate{'\n'}
            {'      '}- <b>run:</b> php bin/console cache:clear
          </pre>
          <div className="crun">
            <p className="crun__head mono">deploy · self-hosted</p>
            {c.workflowRun.map((s) => (
              <p key={s}>
                <b>✓</b> {s}
              </p>
            ))}
            <p className="crun__end">● Success</p>
          </div>
        </div>
        <p className="body-text reveal cnote">
          <span className="mono">runs-on: self-hosted</span> envoie le job à notre runner, qui l'exécute dans le dossier
          du site. Version simplifiée : dans le vrai fichier, chaque étape a un nom et fait d'abord un{' '}
          <span className="mono">cd</span> dans le dossier du projet.
        </p>

        {/* Le runner */}
        <div className="csub csub--dark reveal">
          <p className="chip-small">RUNNER</p>
          <h3>Un runner auto-hébergé</h3>
        </div>
        <div className="grid-3">
          {c.runner.map((r) => (
            <div key={r.title} className="cdcard reveal">
              <Icon name={r.icon} size={24} />
              <h4>{r.title}</h4>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
        <p className="cstatus mono reveal">
          # ./svc.sh status <span>● active (running)</span> · √ Connected to GitHub · Listening for Jobs
        </p>

        {/* Runner ou clés SSH ? */}
        <div className="csub csub--dark reveal">
          <p className="chip-small">COMPARAISON</p>
          <h3>Runner ou clés SSH ?</h3>
        </div>
        <div className="ccompare">
          {c.compare.map((col) => (
            <div key={col.title} className="cdcard reveal">
              <p className="mono ccompare__kicker">{col.title.toUpperCase()}</p>
              <h4>{col.subtitle}</h4>
              <ul className="ccompare__list">
                {col.pros.map((p) => (
                  <li key={p} className="pro">
                    {p}
                  </li>
                ))}
                {col.cons.map((p) => (
                  <li key={p} className="con">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="cstatus mono reveal">
          EN RÉSUMÉ : machine fermée à Internet → runner · machine joignable en SSH → clés SSH
        </p>
      </div>
    </section>
  )
}

function Security({ openGallery }) {
  return (
    <section id="securite" className="section">
      <Title kicker="// 03 — SÉCURITÉ">Tout est sous contrôle</Title>

      {/* Mot de passe robuste */}
      <SubTitle kicker="MOTS DE PASSE">Un mot de passe robuste</SubTitle>
      <div className="csplit">
        <div className="reveal">
          <ul className="cchecks">
            {c.passwordRules.map((r) => (
              <li key={r}>
                <span>
                  <Icon name="check" size={18} />
                </span>
                {r}
              </li>
            ))}
          </ul>
          <p className="mono cblue">#[StrongPassword] : une seule contrainte, réutilisée partout</p>
          <p className="body-text cnote">
            Cette contrainte est utilisée à l'inscription, au changement de mot de passe et dans l'espace admin.
            NotCompromisedPassword interroge le service Have I Been Pwned en n'envoyant que les 5 premiers caractères
            de l'empreinte SHA-1, jamais le mot de passe. Celui-ci est ensuite haché par Symfony (bcrypt ou Argon2),
            jamais stocké en clair.
          </p>
        </div>
        <figure className="reveal">
          <Shot image={c.passwordShot} onClick={() => openGallery(0)} label="modele · inscription" />
          <figcaption>{c.passwordShot.caption}.</figcaption>
        </figure>
      </div>

      {/* Changement de mot de passe */}
      <SubTitle kicker="CHANGEMENT">Changer sans réutiliser</SubTitle>
      <ol className="csteps reveal">
        {c.passwordChange.map((s, i) => (
          <li key={s.title} className="box">
            <span className="mono">{String(i + 1).padStart(2, '0')}</span>
            <h4>{s.title}</h4>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
      <div className="csplit csplit--even">
        <div className="calert reveal">
          <p className="mono">DÉJÀ UTILISÉ ? REFUSÉ</p>
          <p>« Vous avez déjà utilisé ce mot de passe. Choisissez-en un nouveau. »</p>
        </div>
        <div className="box cinfo reveal">
          <p className="mono">TABLE password_history</p>
          <p>Uniquement des empreintes (hash), jamais un mot de passe en clair. Toute la logique est regroupée dans le service PasswordManager.</p>
        </div>
      </div>

      {/* Force brute */}
      <SubTitle kicker="CONNEXION">Contre la force brute</SubTitle>
      <div className="csplit">
        <div className="reveal">
          <div className="cbig">
            <div>
              <strong>5</strong>
              <span>tentatives échouées au maximum</span>
            </div>
            <div>
              <strong>15 min</strong>
              <span>de blocage, par e-mail + IP et par IP seule</span>
            </div>
          </div>
          <p className="body-text cnote">
            Le login throttling de Symfony (composant rate-limiter) est activé dans le pare-feu. Un attaquant ne peut ni
            s'acharner sur un compte, ni tester plein de comptes depuis la même machine. Le formulaire de connexion est
            aussi protégé par un jeton CSRF.
          </p>
        </div>
        <div className="cattempts reveal">
          {[1, 2, 3, 4, 5].map((n) => (
            <p key={n}>
              <b>Tentative {n}</b> — <span>Identifiants invalides.</span>
            </p>
          ))}
          <p className="cattempts__blocked">
            <b>Tentative 6</b> — Trop de tentatives, réessayez dans 15 minutes.
          </p>
          <p className="mono cattempts__conf">login_throttling: {"{ max_attempts: 5, interval: '15 minutes' }"}</p>
        </div>
      </div>

      {/* Administration */}
      <SubTitle kicker="HABILITATIONS">L'espace administrateur</SubTitle>
      <div className="csplit">
        <figure className="reveal">
          <Shot image={c.adminShot} onClick={() => openGallery(1)} label="modele · /admin/utilisateurs" />
          <figcaption>
            Chaque compte avec son rôle, son statut, sa dernière connexion et ses actions.
          </figcaption>
        </figure>
        <ul className="cpoints reveal">
          {c.adminPoints.map((p) => (
            <li key={p.text}>
              <Icon name={p.icon} size={20} />
              {p.text}
            </li>
          ))}
          <li className="cpoints__note">
            Un UserChecker refuse la connexion d'un compte suspendu. Le premier administrateur se crée avec la commande{' '}
            <span className="mono">app:make-admin</span>.
          </li>
        </ul>
      </div>

      {/* Historique des connexions */}
      <SubTitle kicker="TRAÇABILITÉ">L'historique des connexions</SubTitle>
      <div className="csplit">
        <div className="reveal">
          <div className="ctable">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Heure</th>
                  <th>Résultat</th>
                  <th>Adresse IP</th>
                </tr>
              </thead>
              <tbody>
                {c.history.map(([date, time, ok, ip]) => (
                  <tr key={time}>
                    <td>{date}</td>
                    <td>{time}</td>
                    <td className={ok ? 'ok' : 'ko'}>{ok ? 'Réussie' : 'Échouée'}</td>
                    <td>{ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="body-text cnote">
            Fiche d'un compte de test dans l'espace administrateur (tests en local, d'où l'adresse 127.0.0.1). Un échec
            n'est enregistré que si l'e-mail correspond à un compte existant.
          </p>
        </div>
        <dl className="cfacts reveal">
          {c.historyFacts.map(([k, v]) => (
            <div key={k}>
              <dt className="mono">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Validation des saisies */}
      <SubTitle kicker="FORMULAIRES">Des saisies validées</SubTitle>
      <div className="ctable reveal">
        <table>
          <thead>
            <tr>
              <th>Champ</th>
              <th>Contraintes Symfony</th>
            </tr>
          </thead>
          <tbody>
            {c.validation.map(([field, rules]) => (
              <tr key={field}>
                <td>
                  <b>{field}</b>
                </td>
                <td>{rules}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="body-text reveal cnote">
        Règles déclarées sur l'entité <b>User</b> plutôt que dans le formulaire : elles s'appliquent aussi dans
        l'espace administrateur.
      </p>
    </section>
  )
}

function Results() {
  return (
    <section id="bilan" className="section">
      <Title kicker="// 04 — BILAN">Ce que nous avons testé</Title>
      <ul className="ctests">
        {c.tests.map((t) => (
          <li key={t} className="box reveal">
            <span>
              <Icon name="check" size={18} />
            </span>
            {t}
          </li>
        ))}
      </ul>

      <SubTitle kicker="RÉUTILISATION">Une base réutilisable</SubTitle>
      <div className="grid-3">
        {c.reuse.map((r) => (
          <div key={r.title} className="box cfeature reveal">
            <p className="mono cblue">{r.code}</p>
            <h3>{r.title}</h3>
            <p>{r.text}</p>
          </div>
        ))}
      </div>
      <div className="cband reveal">
        <p className="mono">UN NOUVEAU PROJET EN 4 COMMANDES</p>
        <p>{c.newProject.join(' → ')}</p>
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

export default function Cyber2() {
  const [gallery, setGallery] = useState(null)
  useReveal()

  // Les deux captures de la page, agrandies dans la galerie
  const images = [c.passwordShot, c.adminShot]
  const openGallery = (start) => setGallery({ title: c.title, images, start })

  return (
    <>
      <PageNav
        links={[
          ['#video', 'Vidéo'],
          ['#projet', 'Projet'],
          ['#actions', 'GitHub Actions'],
          ['#securite', 'Sécurité'],
          ['#bilan', 'Bilan'],
        ]}
      />
      <main>
        <Hero />
        <Video />
        <Mission />
        <Actions />
        <Security openGallery={openGallery} />
        <Results />
        <Outro />
      </main>
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} {profile.firstName.toUpperCase()} {profile.lastName.toUpperCase()}
        </p>
        <p>CYBER 2 · {c.name.toUpperCase()}</p>
      </footer>
      {gallery && <Gallery {...gallery} onClose={() => setGallery(null)} />}
    </>
  )
}
