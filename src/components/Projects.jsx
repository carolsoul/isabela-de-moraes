import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import Annotation from './Annotation';
import AnimatedContent from './reactbits/AnimatedContent';
import SplitText from './reactbits/SplitText';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const rootRef = useRef(null);

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
      <div className="projects-head">
        <h2 className="projects-title" id="trabalhos-titulo">
          <SplitText tag="span" text="Trabalhos selecionados" splitType="chars" delay={25} textAlign="left" />
        </h2>
        <AnimatedContent distance={30} delay={0.2}>
          <p className="projects-intro">
            Mais que ideias criativas, são experiências com <Annotation>propósito</Annotation> pensadas para
            emocionar e engajar, do planejamento à execução.
            <Annotation type="arrow" start="top 85%" end="top 45%" />
          </p>
        </AnimatedContent>
      </div>

      <ul className="projects-grid">
        {projects.map((project) => (
          <li key={project.slug}>
            <AnimatedContent distance={70} duration={1}>
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
            </AnimatedContent>
          </li>
        ))}
      </ul>
    </section>
  );
}
