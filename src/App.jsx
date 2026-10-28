import { useCallback, useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';
import { FaArrowLeft } from 'react-icons/fa';
import Intro from './components/Intro';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import VideoReel from './components/VideoReel';
import { shouldPlayIntro } from './lib/introSession';

function App() {
  const [showIntro, setShowIntro] = useState(shouldPlayIntro);
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
      <Header />

      <main>
        <Hero play={heroReady} />

        <section className='bio-section' id='sobre'>

          <div className="bio-img">
            <img src="/note.svg" alt="nota" id='nota' />

            <div className="overlayer">
              <img src="/sp.svg" alt="sao-paulo-sticker" id='sp' />
              <img src="isabela.svg" alt="foto-isabela-de-moraes" id='isabela'/>
            </div>
          
          </div>
        
          <div className="greeting">
            <p>publicitária com foco em produção de eventos, conteúdo digital & planejamento criativo.</p>

            <small>Acredito que boas ideias nascem da escuta, da curiosidade e do desejo de causar <span>impacto</span>.</small>
          </div>
        
        </section>

        <Projects />

        <VideoReel />

        <section className="services-section" id='servicos'>

          <div className="title">
            <h2>Serviços</h2>
            <h2>Serviços</h2>
            <h2>Serviços</h2>
            <h2>Serviços</h2>
          </div>

           <ul>

            <div className="service">
              <li>Planejamento publicitário e de eventos</li>
              <FaArrowLeft className='arrow' />
            </div>

            <div className="service">
              <li>Criação de roteiros e conteúdo audiovisual</li>
              <FaArrowLeft className='arrow' />
            </div>

            <div className="service">
              <li>Redação publicitária e Storytelling</li>
              <FaArrowLeft className='arrow' />
            </div>

            <div className="service">
              <li>Produção de conteúdo</li>
              <FaArrowLeft className='arrow' />
            </div>

            <div className="service">
              <li>Análise de métricas digitais</li>
              <FaArrowLeft className='arrow' />
            </div>

          </ul>

        </section>

        <section className="contact-section" id='contato'>

          <a href="mailto:isabelafmoraes21@gmail.com">isabelafmoraes21@gmail.com</a>

          <p>Me coloco à disposição para contribuir com projetos de comunicação e experiências de marca.</p>

          <div className="media">
              <a href="https://www.linkedin.com/in/isabelademoraes">
              <img src="/LinkedIn.svg" alt="LinkedIn" /> </a>

              <a href="https://wa.me/5511983916271?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20seus%20serviços" target="_blank" rel="noopener noreferrer"> <img src="/WhatsApp.svg" alt="WhatsApp" id='zap' /> </a>

            </div>

           <footer>&copy; Isabela Moraes {new Date().getFullYear()} Todos os direitos reservados</footer>

        </section>
      </main>
    </>
  );
}

export default App;
