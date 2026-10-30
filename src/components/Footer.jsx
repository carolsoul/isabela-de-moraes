import { useRef } from 'react';
import { Link } from 'react-router';
import { contact, sections } from '../data/contact';
import { useReveal } from '../lib/useReveal';
import './Footer.css';

export default function Footer() {
  const rootRef = useRef(null);
  useReveal(rootRef);

  return (
    <footer className="site-footer" id="contato" ref={rootRef}>
      <div className="footer-cta" data-reveal>
        <span className="footer-label">(contato)</span>
        <h2 className="footer-title">
          Tem um projeto, uma vaga ou uma ideia? <span className="footer-highlight">Vamos conversar.</span>
        </h2>
        <p className="footer-text">
          Respondo por e-mail, WhatsApp ou LinkedIn, o que for mais prático pra você.
        </p>

        <div className="footer-actions">
          <a className="footer-button is-primary" href={`mailto:${contact.email}`}>
            Enviar e-mail <span aria-hidden="true">→</span>
          </a>
          <a className="footer-button" href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
            WhatsApp <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div className="footer-columns" data-reveal>
        <nav aria-label="Rodapé">
          <h3>Navegação</h3>
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <Link to={{ pathname: '/', hash: `#${section.id}` }}>{section.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3>Contato</h3>
          <ul>
            <li>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li>
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a href={contact.cv} target="_blank" rel="noopener noreferrer">
                Currículo (PDF) ↗
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3>Isabela Moraes</h3>
          <p>
            Analista de comunicação e marketing, publicitária e videomaker. Storytelling de marca, produção de eventos e
            estratégia de comunicação.
          </p>
          <p className="footer-location">{contact.location}, Brasil</p>
        </div>
      </div>

      <p className="footer-wordmark" aria-hidden="true">
        isabela<span>[moraes]</span>
      </p>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Isabela Moraes. Todos os direitos reservados.</span>
        <Link to={{ pathname: '/', hash: '#inicio' }}>
          Voltar ao topo <span aria-hidden="true">↑</span>
        </Link>
      </div>
    </footer>
  );
}
