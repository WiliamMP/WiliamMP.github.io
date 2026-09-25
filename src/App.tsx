import { useEffect, type CSSProperties, type PointerEvent } from 'react'
import { ArrowUpRight, EnvelopeSimple, GithubLogo, LinkedinLogo } from '@phosphor-icons/react'
import Background from './Background'
import { links, projects, stack } from './data'

// Revela elementos com a classe .reveal quando entram na tela
function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// Luz que segue o cursor dentro do elemento (via variáveis CSS, sem re-render)
function trackSpotlight(e: PointerEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

// Inclina a foto em 3D conforme a posição do cursor
function tiltPhoto(e: PointerEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  e.currentTarget.style.setProperty('--rx', `${-y * 14}deg`)
  e.currentTarget.style.setProperty('--ry', `${x * 14}deg`)
}

function resetTilt(e: PointerEvent<HTMLElement>) {
  e.currentTarget.style.setProperty('--rx', '0deg')
  e.currentTarget.style.setProperty('--ry', '0deg')
}

function App() {
  useReveal()
  const [featured, ...others] = projects

  return (
    <>
      <Background />
      <div className="scroll-progress" aria-hidden="true" />
      <header className="nav">
        <a href="#top" className="wordmark">
          Wiliam Patricio
        </a>
        <nav>
          <a href="#projetos">Projetos</a>
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-text">
            <h1>
              Sistemas em Delphi.<br /> <span className="accent">Web em React.</span>
            </h1>
            <p className="lead">
              Sou o Wiliam, desenvolvedor na BM Soft. Delphi e SQL no dia a dia, React e TypeScript na web.
            </p>
            <div className="actions">
              <a className="btn primary" href="#projetos">
                Ver projetos
              </a>
              <a className="btn" href="#contato">
                Contato
              </a>
            </div>
          </div>
          <div className="hero-photo" onPointerMove={tiltPhoto} onPointerLeave={resetTilt}>
            <img src="https://github.com/WiliamMP.png?size=640" alt="Foto de Wiliam Patricio" width="640" height="640" />
          </div>
        </section>

        <section id="projetos" className="projects">
          <h2 className="reveal">Projetos</h2>

          <a
            className="featured reveal"
            onPointerMove={trackSpotlight}
            href={`${links.github}/${featured.repo}`}
            target="_blank"
            rel="noreferrer"
          >
            <div>
              <h3>
                {featured.name}
                <ArrowUpRight size={22} weight="bold" className="arrow" />
              </h3>
              <p>{featured.description}</p>
            </div>
            <p className="tags">{featured.tags.join(', ')}</p>
          </a>

          <ul className="project-list">
            {others.map((project, i) => (
              <li key={project.repo} className="reveal" style={{ '--i': i } as CSSProperties}>
                <a href={`${links.github}/${project.repo}`} target="_blank" rel="noreferrer">
                  <div>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                  </div>
                  <span className="tags">{project.tags.join(', ')}</span>
                  <ArrowUpRight size={18} weight="bold" className="arrow" />
                </a>
              </li>
            ))}
          </ul>

          <a className="text-link reveal" href={`${links.github}?tab=repositories`} target="_blank" rel="noreferrer">
            Todos os repositórios no GitHub
            <ArrowUpRight size={16} weight="bold" />
          </a>
        </section>

        <section id="sobre" className="about">
          <div className="about-text reveal">
            <h2>Sobre</h2>
            <p>
              Trabalho na BM Soft construindo e mantendo sistemas desktop em Delphi, com bastante SQL no caminho.
            </p>
            <p>
              Na web, desenvolvo com React e TypeScript e sigo me aprofundando nesse ecossistema. Este site é feito
              com eles.
            </p>
            <p>
              Já passei 3 horas caçando um erro que era um ponto e vírgula. Hoje ele é a primeira coisa que eu
              confiro.
            </p>
          </div>

          <dl className="stack reveal">
            {stack.map(({ group, items }) => (
              <div key={group}>
                <dt>{group}</dt>
                <dd>{items}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="contato" className="contact reveal">
          <h2>Vamos conversar?</h2>
          <a className="email" href={`mailto:${links.email}`}>
            <EnvelopeSimple size={28} />
            {links.email}
          </a>
          <div className="socials">
            <a href={links.linkedin} target="_blank" rel="noreferrer">
              <LinkedinLogo size={20} />
              LinkedIn
            </a>
            <a href={links.github} target="_blank" rel="noreferrer">
              <GithubLogo size={20} />
              GitHub
            </a>
          </div>
        </section>
      </main>

      <footer>© {new Date().getFullYear()} Wiliam Patricio</footer>
    </>
  )
}

export default App
