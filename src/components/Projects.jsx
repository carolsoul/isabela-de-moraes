import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(rootRef);

      q('.project-card').forEach((card) => {
        gsap.from(card, {
          autoAlpha: 0,
          y: 60,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        });

        gsap.fromTo(
          card.querySelector('img'),
          { scale: 1.15 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="projects" id="projetos" ref={rootRef} aria-labelledby="projetos-titulo">
      <div className="projects-head">
        <h2 className="projects-title" id="projetos-titulo">
          projetos
        </h2>
        <p className="projects-intro">
          Mais que ideias criativas, são experiências com propósito pensadas para emocionar e engajar, do
          planejamento à execução.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <div className="project-media">
              <img
                src={project.img}
                alt={`${project.title}: ${project.subtitle}`}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: project.focus }}
              />
              <span className="project-tag">{project.brand}</span>
            </div>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-category">{project.subtitle}</p>
            <p className="project-description">{project.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
