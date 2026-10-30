import { Link } from 'react-router';
import { contact, sectionLink, sections } from '../data/contact';
import AnimatedContent from './reactbits/AnimatedContent';
import Magnet from './reactbits/Magnet';
import ShinyText from './reactbits/ShinyText';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer" id="contato">
      <AnimatedContent className="footer-cta" distance={50} duration={1}>
        <h2 className="footer-title">
          Tem um projeto, uma vaga ou uma ideia?{' '}
          <span className="footer-highlight">
            <ShinyText text="Vamos conversar." color="#f2f2f2" shineColor="#b2b282" speed={3} delay={2} />
          </span>
        </h2>
        <p className="footer-text">
          Respondo por e-mail, WhatsApp ou LinkedIn, o que for mais prático pra você.
        </p>

        <div className="footer-actions">
          <Magnet padding={60} magnetStrength={3}>
            <a className="footer-button is-primary" href={`mailto:${contact.email}`}>
              Enviar e-mail <span aria-hidden="true">→</span>
            </a>
          </Magnet>
          <Magnet padding={60} magnetStrength={3}>
            <a className="footer-button" href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp <span aria-hidden="true">→</span>
            </a>
          </Magnet>
        </div>
      </AnimatedContent>

      <AnimatedContent className="footer-columns" distance={40} stagger={0.1}>
        <nav aria-label="Rodapé">
          <h3>Navegação</h3>
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <Link to={sectionLink(section)}>{section.label}</Link>
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
      </AnimatedContent>

      <p className="footer-wordmark" aria-hidden="true">
        isabela<span>moraes</span>
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
