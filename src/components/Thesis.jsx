import AnimatedContent from './reactbits/AnimatedContent';
import Magnet from './reactbits/Magnet';
import ShinyText from './reactbits/ShinyText';
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
  return (
    <section className="thesis" id="tcc" aria-labelledby="tcc-titulo">
      <AnimatedContent className="thesis-card" distance={80} scale={0.96} duration={1.1}>
        <span className="thesis-label">
          <ShinyText text="Destaque · TCC" color="#0a0a0a" shineColor="#f2f2f2" speed={2.5} delay={1.5} />
        </span>

        <h2 className="thesis-title" id="tcc-titulo">
          Adidas <span className="thesis-x">x</span> <span className="thesis-nowrap">Farm Rio</span>
        </h2>

        <div className="thesis-bottom">
          <div>
            <p className="thesis-description">{THESIS.description}</p>
            <p className="thesis-meta">{THESIS.meta.join(' · ')}</p>
          </div>

          <div className="thesis-side">
            <ul className="thesis-topics" aria-label="Temas">
              {THESIS.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>

            {THESIS.link ? (
              <Magnet padding={60} magnetStrength={3}>
                <a className="thesis-cta" href={THESIS.link} target="_blank" rel="noopener noreferrer">
                  Ler o trabalho <span aria-hidden="true">↗</span>
                </a>
              </Magnet>
            ) : (
              <span className="thesis-cta is-soon">Trabalho completo em breve</span>
            )}
          </div>
        </div>
      </AnimatedContent>
    </section>
  );
}
