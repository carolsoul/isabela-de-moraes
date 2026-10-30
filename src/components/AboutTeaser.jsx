import { Link } from 'react-router';
import Annotation from './Annotation';
import ScrollReveal from './reactbits/ScrollReveal';
import SplitText from './reactbits/SplitText';
import Magnet from './reactbits/Magnet';
import './AboutTeaser.css';

// Palavras da frase que ganham traço à mão (desenhado conforme a rolagem).
const MARKS = {
  'comunicação,': { type: 'underline', start: 'top 80%', end: 'top 50%' },
  'estratégia.': { type: 'circle', start: 'top 80%', end: 'top 42%' },
};

const decorateWord = (word, content) => {
  const mark = MARKS[word];
  return mark ? (
    <Annotation type={mark.type} start={mark.start} end={mark.end}>
      {content}
    </Annotation>
  ) : null;
};

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
        decorateWord={decorateWord}
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
