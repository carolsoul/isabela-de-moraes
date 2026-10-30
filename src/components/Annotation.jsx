import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Annotation.css';

gsap.registerPlugin(ScrollTrigger);

// Traços "feitos à mão" em verde claro. `pathLength="1"` deixa o traço medir 1,
// então o desenho é só o stroke-dashoffset indo de 1 a 0.
const SHAPES = {
  underline: {
    viewBox: '0 0 200 24',
    paths: ['M3 15 C 30 8, 54 19, 84 13 S 138 6, 168 12 S 192 16, 197 10'],
  },
  circle: {
    viewBox: '0 0 200 90',
    paths: [
      'M 26 66 C 4 46, 24 14, 92 9 C 152 5, 196 18, 196 42 C 196 68, 140 83, 86 81 C 38 79, 4 67, 8 46 C 11 33, 30 24, 54 19',
    ],
  },
  arrow: {
    viewBox: '0 0 200 90',
    paths: ['M 6 8 C 24 64, 110 92, 170 34', 'M 146 38 L 171 31 L 173 58'],
  },
};

// Sublinhado ou círculo em volta de `children`, ou uma seta solta (type="arrow").
// O traço é desenhado conforme a rolagem: avança ao descer e volta ao subir.
export default function Annotation({ type = 'underline', children, start = 'top 85%', end = 'top 50%', className = '' }) {
  const rootRef = useRef(null);
  const shape = SHAPES[type];

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const root = rootRef.current;
      const paths = root.querySelectorAll('.annotation-path');
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: root, start, end, scrub: 0.6 },
      });
      // na seta, a ponta só aparece depois que a linha chega lá
      paths.forEach((path, index) => {
        timeline.fromTo(
          path,
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, ease: 'none', duration: index === 0 ? 1 : 0.35 }
        );
      });
    });

    return () => mm.revert();
  }, [start, end]);

  const svg = (
    <svg className="annotation-svg" viewBox={shape.viewBox} preserveAspectRatio="none" aria-hidden="true" focusable="false">
      {shape.paths.map((d) => (
        <path key={d} className="annotation-path" d={d} pathLength="1" />
      ))}
    </svg>
  );

  return (
    <span ref={rootRef} className={`annotation annotation--${type} ${className}`.trim()}>
      {children}
      {svg}
    </span>
  );
}
