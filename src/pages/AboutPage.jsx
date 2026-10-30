import { useEffect } from 'react';
import { Link } from 'react-router';
import AnimatedContent from '../components/reactbits/AnimatedContent';
import Magnet from '../components/reactbits/Magnet';
import SplitText from '../components/reactbits/SplitText';
import TiltedCard from '../components/reactbits/TiltedCard';
import { contact } from '../data/contact';
import './AboutPage.css';

const PROVOCATIONS = [
  ['O conceito da sua marca?', 'Vira um evento.'],
  ['Reposicionamento de um produto?', 'Campanha digital.'],
  ['Números?', 'Podem contar uma história genial.'],
  ['Gráficos?', 'Base estratégica para tomada de decisão.'],
];

const FACTS = [
  ['Agora', 'Analista de Comunicação e Marketing · Grupo Crisdu'],
  ['Formação', 'Publicidade e Propaganda · Universidade Cruzeiro do Sul (conclusão em dez/2026)'],
  ['Antes', 'Agência Fuego (planejamento e mídias sociais) · Cirúrgica Nascente'],
  ['Idiomas', 'Português · Inglês C2 (EF SET)'],
  ['Base', contact.location],
];

const SKILLS = [
  'Estratégia de comunicação',
  'Storytelling de marca',
  'Produção de eventos',
  'Planejamento criativo',
  'Produção audiovisual',
  'Análise de métricas',
];

export default function AboutPage() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Sobre | Isabela Moraes';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <main className="about-page">
      <section className="about-page-hero">
        <div className="about-page-intro">
          <h1 className="about-page-name">
            <SplitText tag="span" text="Isabela Moraes" splitType="chars" delay={35} textAlign="left" />
          </h1>
          <AnimatedContent distance={30} delay={0.3} duration={1}>
            <p className="about-page-role">Analista de comunicação e marketing · Publicitária · Videomaker</p>
          </AnimatedContent>
          <h2 className="about-page-statement">
            <SplitText
              tag="span"
              text="Transito entre comunicação, experiência e estratégia."
              splitType="words"
              effect="blur"
              delay={60}
              duration={1.1}
              textAlign="left"
            />
          </h2>
        </div>

        <AnimatedContent className="about-page-photo" distance={60} scale={0.96} duration={1.1}>
          <TiltedCard
            imageSrc="/about/isabela-perfil.webp"
            altText="Isabela Moraes"
            containerWidth="100%"
            containerHeight="100%"
            imageWidth="100%"
            imageHeight="100%"
            rotateAmplitude={9}
            scaleOnHover={1.03}
            radius={24}
            glare={0.3}
            shadow={0.35}
            showTooltip={false}
            gyroscope={false}
          />
        </AnimatedContent>
      </section>

      <section className="about-page-body">
        <AnimatedContent distance={40}>
          <p className="about-page-lead">
            Hoje sou analista de comunicação e marketing no Grupo Crisdu e estou na reta final da graduação em
            Publicidade e Propaganda. Foi na prática, em agência e em projetos, que aprendi a transformar ideias em
            soluções criativas e executáveis: de eventos e ativações a campanhas, conteúdo e vídeo.
          </p>
        </AnimatedContent>

        <AnimatedContent className="about-page-provocations" role="list" distance={30} stagger={0.12}>
          {PROVOCATIONS.map(([question, answer]) => (
            <p role="listitem" key={question}>
              <span className="about-page-question">{question}</span> {answer}
            </p>
          ))}
        </AnimatedContent>

        <div className="about-page-columns">
          <AnimatedContent distance={40}>
            <h2 className="about-page-heading">Trajetória</h2>
            <dl className="about-page-facts">
              {FACTS.map(([term, description]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{description}</dd>
                </div>
              ))}
            </dl>
          </AnimatedContent>

          <AnimatedContent distance={40} delay={0.1}>
            <h2 className="about-page-heading">Competências</h2>
            <ul className="about-page-skills">
              {SKILLS.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </AnimatedContent>
        </div>

        <AnimatedContent className="about-page-closing" distance={40}>
          <p>
            Em tempos voláteis, acredito na força das conexões, das parcerias e da colaboração entre profissionais
            multidisciplinares. Se fez sentido pra você, vamos trocar ideias.
          </p>
          <div className="about-page-actions">
            <Magnet padding={60} magnetStrength={3}>
              <Link className="about-page-button is-primary" to={{ hash: '#contato' }}>
                Vamos conversar <span aria-hidden="true">→</span>
              </Link>
            </Magnet>
            <Magnet padding={60} magnetStrength={3}>
              <a className="about-page-button" href={contact.cv} target="_blank" rel="noopener noreferrer">
                Currículo (PDF) <span aria-hidden="true">↗</span>
              </a>
            </Magnet>
          </div>
        </AnimatedContent>
      </section>
    </main>
  );
}
