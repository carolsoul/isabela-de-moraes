import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Posição de rolagem de cada entrada do histórico, para o "voltar" do navegador.
const positions = new Map();

// Cuida da rolagem ao trocar de página: âncoras (/#trabalhos), topo da página
// nova ou a posição anterior ao voltar (ex.: da página de um trabalho para a grade).
export default function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const keyRef = useRef(location.key);
  const pathnameRef = useRef(location.pathname);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    const save = () => positions.set(keyRef.current, window.scrollY);
    window.addEventListener('scroll', save, { passive: true });
    return () => window.removeEventListener('scroll', save);
  }, []);

  useLayoutEffect(() => {
    keyRef.current = location.key;
  }, [location.key]);

  useEffect(() => {
    const samePage = pathnameRef.current === location.pathname;
    pathnameRef.current = location.pathname;

    // espera a página nova montar (e as seções fixadas do GSAP) antes de rolar
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();

      if (navigationType === 'POP' && positions.has(location.key)) {
        window.scrollTo({ top: positions.get(location.key), behavior: 'instant' });
        return;
      }

      const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) {
        target.scrollIntoView({ behavior: samePage ? 'smooth' : 'instant' });
      } else if (!samePage || !location.hash) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [location, navigationType]);

  return null;
}
