import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import { useReveal } from '../lib/useReveal';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const rootRef = useRef(null);
  useReveal(rootRef);

  // a imagem de cada card "assenta" (zoom out leve) enquanto o card cruza a tela
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray('.project-media img', rootRef.current).forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.15 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="projects" id="trabalhos" ref={rootRef} aria-labelledby="trabalhos-titulo">
      <div className="projects-head" data-reveal>
        <h2 className="projects-title" id="trabalhos-titulo">
          Trabalhos selecionados
        </h2>
        <p className="projects-intro">
          Mais que ideias criativas, são experiências com propósito pensadas para emocionar e engajar, do
          planejamento à execução.
        </p>
      </div>

      <ul className="projects-grid">
        {projects.map((project) => (
          <li key={project.slug} data-reveal>
            <Link className="project-card" to={`/trabalhos/${project.slug}`}>
              <div className="project-media">
                <img
                  src={project.img}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: project.focus }}
                />
                <span className="project-tag">{project.brand}</span>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-category">{project.category}</p>
              <p className="project-summary">{project.summary}</p>
              <span className="project-more">
                Ver projeto <span aria-hidden="true">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
