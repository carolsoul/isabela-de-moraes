import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Intro from '../components/Intro';
import Hero from '../components/Hero';
import AboutTeaser from '../components/AboutTeaser';
import Projects from '../components/Projects';
import Thesis from '../components/Thesis';
import VideoReel from '../components/VideoReel';
import Services from '../components/Services';
import { shouldPlayIntro } from '../lib/introSession';

export default function HomePage() {
  const location = useLocation();
  // a cortina só roda quando a home é a primeira página aberta (não ao voltar de um trabalho)
  const [showIntro, setShowIntro] = useState(() => location.key === 'default' && shouldPlayIntro());
  const [heroReady, setHeroReady] = useState(!showIntro);

  const handleIntroReveal = useCallback(() => setHeroReady(true), []);
  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
    // a cortina trava a rolagem; ao liberar, as medidas das animações de scroll mudam
    ScrollTrigger.refresh();
  }, []);

  // Fontes carregadas mudam a altura dos textos: recalcula as animações de scroll.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <>
      {showIntro && <Intro onReveal={handleIntroReveal} onComplete={handleIntroComplete} />}

      <main>
        <Hero play={heroReady} />
        <AboutTeaser />
        <Projects />
        <Thesis />
        <VideoReel />
        <Services />
      </main>
    </>
  );
}
