import { Link } from 'react-router';
import ScrollReveal from './reactbits/ScrollReveal';
import SplitText from './reactbits/SplitText';
import Magnet from './reactbits/Magnet';
import './AboutTeaser.css';

// Sobre da home: só a frase de apresentação e o convite para a página completa.
export default function AboutTeaser() {
  return (
    <section className="about-teaser" id="sobre" aria-label="Sobre">
      <ScrollReveal
        containerClassName="about-teaser-statement"
        textClassName="about-teaser-statement-text"
        baseOpacity={0.12}
        blurStrength={6}
        baseRotation={2}
        highlightColor="#505040"
        wordAnimationEnd="top 30%"
        rotationEnd="top 30%"
      >
        Transito entre comunicação, experiência e estratégia.
      </ScrollReveal>

      <div className="about-teaser-bottom">
        <SplitText
          tag="p"
          className="about-teaser-sentence"
          text="Analista de comunicação e marketing que transforma ideias em eventos, campanhas, conteúdo e vídeo."
          splitType="words"
          effect="blur"
          delay={35}
          duration={1}
          textAlign="left"
        />

        <Magnet padding={70} magnetStrength={3}>
          <Link className="about-teaser-link" to="/sobre">
            Ver mais
            <span className="about-teaser-link-icon" aria-hidden="true">
              →
            </span>
          </Link>
        </Magnet>
      </div>
    </section>
  );
}
