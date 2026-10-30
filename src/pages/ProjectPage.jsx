import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router';
import { projects } from '../data/projects';
import { useReveal } from '../lib/useReveal';
import NotFoundPage from './NotFoundPage';
import './ProjectPage.css';

const pad = (value) => String(value).padStart(2, '0');

function ProjectCase({ project, index }) {
  const rootRef = useRef(null);
  useReveal(rootRef);

  const next = projects[(index + 1) % projects.length];

  useEffect(() => {
    const previous = document.title;
    document.title = `${project.title} | Isabela Moraes`;
    return () => {
      document.title = previous;
    };
  }, [project.title]);

  const sections = [
    { title: 'O desafio', content: <p>{project.challenge}</p> },
    { title: 'A ideia', content: <p>{project.idea}</p> },
    {
      title: 'Meu papel',
      content: (
        <ul className="case-role">
          {project.role.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ),
    },
    { title: 'Impacto', content: <p>{project.impact}</p> },
  ];

  return (
    <main className="case" ref={rootRef}>
      <header className="case-head">
        <Link className="case-back" to={{ pathname: '/', hash: '#trabalhos' }}>
          <span aria-hidden="true">←</span> Trabalhos selecionados
        </Link>

        <div className="case-kicker" data-reveal>
          <span className="case-tag">{project.brand}</span>
          <span className="case-count">
            {pad(index + 1)} / {pad(projects.length)}
          </span>
        </div>

        <h1 className="case-title" data-reveal>
          {project.title}
        </h1>
        <p className="case-summary" data-reveal>
          {project.summary}
        </p>
      </header>

      <figure className="case-cover" data-reveal>
        <img src={project.img} alt={`${project.title}: ${project.category}`} decoding="async" />
      </figure>

      <dl className="case-meta" data-reveal>
        <div>
          <dt>Cliente</dt>
          <dd>{project.brand}</dd>
        </div>
        <div>
          <dt>Formato</dt>
          <dd>{project.category}</dd>
        </div>
        <div>
          <dt>Onde</dt>
          <dd>{project.agency}</dd>
        </div>
        <div>
          <dt>Entregas</dt>
          <dd>{project.deliverables.join(', ')}</dd>
        </div>
      </dl>

      <div className="case-sections">
        {sections.map((section, i) => (
          <section className="case-section" key={section.title} data-reveal>
            <h2>
              <span className="case-section-index">{pad(i + 1)}</span>
              {section.title}
            </h2>
            <div className="case-section-body">{section.content}</div>
          </section>
        ))}
      </div>

      <nav className="case-next" aria-label="Próximo trabalho" data-reveal>
        <Link to={`/trabalhos/${next.slug}`} className="case-next-link">
          <span className="case-next-label">Próximo trabalho</span>
          <span className="case-next-title">
            {next.title} <span aria-hidden="true">→</span>
          </span>
          <img src={next.thumb} alt="" loading="lazy" decoding="async" />
        </Link>
      </nav>
    </main>
  );
}

export default function ProjectPage() {
  const { slug } = useParams();
  const index = projects.findIndex((project) => project.slug === slug);

  if (index === -1) return <NotFoundPage />;
  return <ProjectCase key={slug} project={projects[index]} index={index} />;
}
