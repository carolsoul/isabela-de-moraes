import { useRef } from 'react';
import { useReveal } from '../lib/useReveal';
import './Thesis.css';

// Rascunho: descrição e temas escritos a partir do título do TCC — validar com a
// Isabela. Quando o trabalho estiver publicado, preencha `link` (PDF, Drive…).
const THESIS = {
  meta: ['Publicidade e Propaganda', 'Universidade Cruzeiro do Sul', '2026'],
  description:
    'Meu trabalho de conclusão de curso olha para a collab entre adidas e FARM Rio: como duas marcas de universos diferentes, o esporte e a moda brasileira, constroem juntas uma narrativa que conversa com cultura, comportamento e consumo.',
  topics: ['Co-branding', 'Collabs de moda', 'Brasilidade', 'Comportamento de consumo', 'Narrativa de marca'],
  link: '',
};

export default function Thesis() {
  const rootRef = useRef(null);
  useReveal(rootRef);

  return (
    <section className="thesis" id="tcc" ref={rootRef} aria-labelledby="tcc-titulo">
      <div className="thesis-card" data-reveal>
        <div className="thesis-top">
          <span className="thesis-label">Destaque · TCC</span>
          <p className="thesis-meta">{THESIS.meta.join(' · ')}</p>
        </div>

        <h2 className="thesis-title" id="tcc-titulo">
          Adidas <span className="thesis-x">x</span> <span className="thesis-nowrap">Farm Rio</span>
        </h2>

        <div className="thesis-bottom">
          <p className="thesis-description">{THESIS.description}</p>

          <div className="thesis-side">
            <ul className="thesis-topics" aria-label="Temas">
              {THESIS.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>

            {THESIS.link ? (
              <a className="thesis-cta" href={THESIS.link} target="_blank" rel="noopener noreferrer">
                Ler o trabalho <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span className="thesis-cta is-soon">Trabalho completo em breve</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
