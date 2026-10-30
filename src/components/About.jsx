import { useRef } from 'react';
import { Link } from 'react-router';
import { useReveal } from '../lib/useReveal';
import './About.css';

const PROVOCATIONS = [
  ['O conceito da sua marca?', 'Vira um evento.'],
  ['Reposicionamento de um produto?', 'Campanha digital.'],
  ['Números?', 'Podem contar uma história genial.'],
  ['Gráficos?', 'Base estratégica para tomada de decisão.'],
];

const SKILLS = [
  'Estratégia de comunicação',
  'Storytelling de marca',
  'Produção de eventos',
  'Planejamento criativo',
  'Produção audiovisual',
  'Análise de métricas',
];

export default function About() {
  const rootRef = useRef(null);
  useReveal(rootRef);

  return (
    <section className="about" id="sobre" ref={rootRef} aria-labelledby="sobre-titulo">
      <div className="about-top" data-reveal>
        <span className="section-label">(sobre)</span>
        <p className="about-status">
          <span className="about-status-dot" aria-hidden="true" />
          Aberta a novos projetos e oportunidades
        </p>
      </div>

      <h2 className="about-statement" id="sobre-titulo" data-reveal>
        Transito entre <em>comunicação</em>, <em>experiência</em> e <em>estratégia</em>.
      </h2>

      <div className="about-grid">
        <figure className="about-photo" data-reveal>
          <img src="/about/isabela.webp" alt="Isabela Moraes" width="840" height="1120" loading="lazy" decoding="async" />
          <img
            className="about-stamp"
            src="/about/carimbo-sp.webp"
            alt=""
            width="399"
            height="399"
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="about-body">
          <p className="about-lead" data-reveal>
            Hoje sou analista de comunicação e marketing no Grupo Crisdu e estou na reta final da graduação em
            Publicidade e Propaganda. Foi na prática, em agência e em projetos, que aprendi a transformar ideias em
            soluções criativas e executáveis: de eventos e ativações a campanhas, conteúdo e vídeo.
          </p>

          <ul className="about-provocations" data-reveal>
            {PROVOCATIONS.map(([question, answer]) => (
              <li key={question}>
                <span className="about-question">{question}</span> {answer}
              </li>
            ))}
          </ul>

          <dl className="about-facts" data-reveal>
            <div>
              <dt>Agora</dt>
              <dd>Analista de Comunicação e Marketing · Grupo Crisdu</dd>
            </div>
            <div>
              <dt>Formação</dt>
              <dd>Publicidade e Propaganda · Universidade Cruzeiro do Sul (conclusão em dez/2026)</dd>
            </div>
            <div>
              <dt>TCC</dt>
              <dd>
                <Link to={{ pathname: '/', hash: '#tcc' }}>Adidas x Farm Rio</Link>
              </dd>
            </div>
            <div>
              <dt>Antes</dt>
              <dd>Agência Fuego (planejamento e mídias sociais) · Cirúrgica Nascente</dd>
            </div>
            <div>
              <dt>Idiomas</dt>
              <dd>Português · Inglês C2 (EF SET)</dd>
            </div>
            <div>
              <dt>Base</dt>
              <dd>Guarulhos, SP</dd>
            </div>
          </dl>

          <ul className="about-skills" aria-label="Competências" data-reveal>
            {SKILLS.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>

          <p className="about-closing" data-reveal>
            Em tempos voláteis, acredito na força das conexões, das parcerias e da colaboração entre profissionais
            multidisciplinares. Se fez sentido pra você, vamos trocar ideias.
          </p>
        </div>
      </div>
    </section>
  );
}
