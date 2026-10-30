import { useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { projects } from '../data/projects';
import AnimatedContent from '../components/reactbits/AnimatedContent';
import SplitText from '../components/reactbits/SplitText';
import NotFoundPage from './NotFoundPage';
import './ProjectPage.css';

const pad = (value) => String(value).padStart(2, '0');

function ProjectCase({ project, index }) {
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
    <main className="case">
      <header className="case-head">
        <Link className="case-back" to={{ pathname: '/', hash: '#trabalhos' }}>
          <span aria-hidden="true">←</span> Trabalhos selecionados
        </Link>

        <AnimatedContent className="case-kicker" distance={20} trigger="mount">
          <span className="case-tag">{project.brand}</span>
          <span className="case-count">
            {pad(index + 1)} / {pad(projects.length)}
          </span>
        </AnimatedContent>

        <h1 className="case-title">
          <SplitText tag="span" text={project.title} splitType="words" delay={60} textAlign="left" />
        </h1>
        <AnimatedContent distance={30} delay={0.3} trigger="mount">
          <p className="case-summary">{project.summary}</p>
        </AnimatedContent>
      </header>

      <AnimatedContent distance={60} scale={0.97} delay={0.35} duration={1.1} trigger="mount">
        <figure className="case-cover">
          <img src={project.img} alt={`${project.title}: ${project.category}`} decoding="async" />
        </figure>
      </AnimatedContent>

      <AnimatedContent distance={40}>
        <dl className="case-meta">
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
      </AnimatedContent>

      <div className="case-sections">
        {sections.map((section, i) => (
          <AnimatedContent key={section.title} distance={50}>
            <section className="case-section">
              <h2>
                <span className="case-section-index">{pad(i + 1)}</span>
                {section.title}
              </h2>
              <div className="case-section-body">{section.content}</div>
            </section>
          </AnimatedContent>
        ))}
      </div>

      <AnimatedContent distance={50}>
        <nav className="case-next" aria-label="Próximo trabalho">
          <Link to={`/trabalhos/${next.slug}`} className="case-next-link">
            <span className="case-next-label">Próximo trabalho</span>
            <span className="case-next-title">
              {next.title} <span aria-hidden="true">→</span>
            </span>
            <img src={next.thumb} alt="" loading="lazy" decoding="async" />
          </Link>
        </nav>
      </AnimatedContent>
    </main>
  );
}

export default function ProjectPage() {
  const { slug } = useParams();
  const index = projects.findIndex((project) => project.slug === slug);

  if (index === -1) return <NotFoundPage />;
  return <ProjectCase key={slug} project={projects[index]} index={index} />;
}
