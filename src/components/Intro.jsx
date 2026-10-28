import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { markIntroPlayed } from '../lib/introSession';
import './Intro.css';

const COLUMNS = 7;

// Cortina preta em 7 colunas que sobem (de baixo pra cima) revelando a home.
export default function Intro({ onReveal, onComplete }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    markIntroPlayed();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.35,
        onComplete: () => {
          root.style.overflow = previousOverflow;
          onComplete?.();
        },
      });

      tl.to('.intro-col', {
        yPercent: -100,
        duration: 1.1,
        ease: 'power4.inOut',
        stagger: 0.075,
      }).call(() => onReveal?.(), null, 0.55);
    }, rootRef);

    return () => {
      ctx.revert();
      root.style.overflow = previousOverflow;
    };
  }, [onReveal, onComplete]);

  return (
    <div className="intro" ref={rootRef} aria-hidden="true">
      {Array.from({ length: COLUMNS }, (_, i) => (
        <span className="intro-col" key={i} />
      ))}
    </div>
  );
}
