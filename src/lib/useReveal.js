import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Faz os elementos com [data-reveal] dentro de `scopeRef` subirem com fade
// quando entram na tela. Sem efeito para quem prefere menos movimento.
export function useReveal(scopeRef) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray('[data-reveal]', scopeRef.current).forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 48,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        });
      });
    });

    return () => mm.revert();
  }, [scopeRef]);
}
