import { useEffect, useState } from 'react'
import { links, projects, stack } from './data'

const roles = ['Desenvolvedor Delphi', 'Dev web com React + TypeScript', 'Caçador de ponto e vírgula']

function useTyping(words: string[]) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]
    const done = !deleting && text === word
    const empty = deleting && text === ''

    const delay = done ? 1800 : empty ? 300 : deleting ? 35 : 70
    const timer = setTimeout(() => {
      if (done) setDeleting(true)
      else if (empty) {
        setDeleting(false)
        setIndex((i) => i + 1)
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)))
    }, delay)

    return () => clearTimeout(timer)
  }, [text, deleting, index, words])

  return text
}

function App() {
  const role = useTyping(roles)
  const year = new Date().getFullYear()

  return (
    <>
      <header className="nav">
        <a href="#top" className="logo">
          WP<span>.</span>
        </a>
        <nav>
          <a href="#sobre">Sobre</a>
          <a href="#stack">Stack</a>
          <a href="#projetos">Projetos</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <img className="avatar" src="https://github.com/WiliamMP.png" alt="Foto de Wiliam Patricio" />
          <p className="eyebrow">Olá, eu sou</p>
          <h1>Wiliam Patricio</h1>
          <p className="role">
            <span>{role}</span>
            <span className="caret" aria-hidden="true" />
          </p>
          <p className="location">📍 Rio do Sul, SC - Brasil</p>
          <div className="actions">
            <a className="btn primary" href="#projetos">
              Ver projetos
            </a>
            <a className="btn" href={links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </section>

        <section id="sobre">
          <h2>
            <span className="num">01.</span> Sobre mim
          </h2>
          <div className="about">
            <p>
              Sou desenvolvedor na <strong>BM Soft</strong>, onde trabalho no dia a dia com <strong>Delphi</strong> e{' '}
              <strong>SQL</strong>, construindo e mantendo sistemas desktop.
            </p>
            <p>
              Também desenvolvo aplicações web com <strong>React + TypeScript</strong> e sigo me aprofundando nesse
              ecossistema. Este site, inclusive, é feito com eles.
            </p>
            <p>
              Fato curioso: já passei 3 horas caçando um erro que no fim era um ponto e vírgula. Desde então confiro
              ele primeiro.
            </p>
          </div>
        </section>

        <section id="stack">
          <h2>
            <span className="num">02.</span> Stack
          </h2>
          <div className="stack">
            {Object.entries(stack).map(([group, items]) => (
              <div key={group} className="stack-group">
                <h3>{group}</h3>
                <ul>
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="projetos">
          <h2>
            <span className="num">03.</span> Projetos
          </h2>
          <div className="projects">
            {projects.map((project) => (
              <a
                key={project.repo}
                className="card"
                href={`${links.github}/${project.repo}`}
                target="_blank"
                rel="noreferrer"
              >
                <div className="card-top">
                  <span className="folder" aria-hidden="true">
                    {'</>'}
                  </span>
                  <span className="arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <ul className="tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </a>
            ))}
          </div>
          <a className="more" href={`${links.github}?tab=repositories`} target="_blank" rel="noreferrer">
            Ver todos os repositórios →
          </a>
        </section>

        <section id="contato" className="contact">
          <h2>
            <span className="num">04.</span> Contato
          </h2>
          <p>Quer conversar sobre um projeto, uma vaga ou só trocar uma ideia? Me chama.</p>
          <div className="actions">
            <a className="btn primary" href={`mailto:${links.email}`}>
              Enviar e-mail
            </a>
            <a className="btn" href={links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="btn" href={links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </section>
      </main>

      <footer>
        © {year} Wiliam Patricio · Feito com React + TypeScript
      </footer>
    </>
  )
}

export default App
