import { useRef } from 'react';
import { Link } from 'react-router';
import { useReveal } from '../lib/useReveal';
import './Services.css';

const SERVICES = [
  {
    name: 'Estratégia de comunicação',
    description: 'Planejamento de campanhas, posicionamento e narrativa alinhados aos objetivos da marca.',
  },
  {
    name: 'Eventos e ativações de marca',
    description:
      'Do conceito ao roteiro: experiências presenciais, híbridas e digitais, com cronograma e entregas sob controle.',
  },
  {
    name: 'Storytelling e redação publicitária',
    description: 'Narrativas de marca, roteiros e textos com a linguagem certa para cada público e plataforma.',
  },
  {
    name: 'Conteúdo e mídias sociais',
    description: 'Planejamento editorial, produção de conteúdo e gestão de pautas em parceria com o time de design.',
  },
  {
    name: 'Produção audiovisual',
    description: 'Roteiro, captação e edição de vídeos para campanhas, eventos e redes sociais.',
  },
  {
    name: 'Métricas e análise de dados',
    description: 'Relatórios e indicadores que viram insight e base para a próxima decisão.',
  },
];

export default function Services() {
  const rootRef = useRef(null);
  useReveal(rootRef);

  return (
    <section className="services" id="servicos" ref={rootRef} aria-labelledby="servicos-titulo">
      <div className="services-head" data-reveal>
        <span className="section-label">(serviços)</span>
        <h2 className="services-title" id="servicos-titulo">
          Serviços
        </h2>
        <p className="services-intro">Da estratégia ao vídeo final: como posso ajudar a sua marca.</p>
      </div>

      <ol className="services-list">
        {SERVICES.map((service, index) => (
          <li className="service" key={service.name} data-reveal>
            <span className="service-index">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="service-name">{service.name}</h3>
            <p className="service-description">{service.description}</p>
          </li>
        ))}
      </ol>

      <p className="services-more" data-reveal>
        Precisa de algo diferente?{' '}
        <Link to={{ pathname: '/', hash: '#contato' }}>
          Vamos conversar <span aria-hidden="true">→</span>
        </Link>
      </p>
    </section>
  );
}
