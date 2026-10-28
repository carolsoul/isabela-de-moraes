import { useCallback, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';
import { FaArrowLeft } from 'react-icons/fa';
import Intro from './components/Intro';
import Header from './components/Header';
import Hero from './components/Hero';
import { projects as cards } from './data/projects';
import { shouldPlayIntro } from './lib/introSession';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showIntro, setShowIntro] = useState(shouldPlayIntro);
  const [heroReady, setHeroReady] = useState(!showIntro);

  const handleIntroReveal = useCallback(() => setHeroReady(true), []);
  const handleIntroComplete = useCallback(() => setShowIntro(false), []);

  useEffect(() => {
  // Fade + movimento dos blocos de experiência
  const expBlocks = gsap.utils.toArray('.exp');
  expBlocks.forEach((block) => {
    gsap.fromTo(
      block,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: block,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  //Fade + movimento dos blocos de educação
  const qualBlocks = gsap.utils.toArray('.educ');
  qualBlocks.forEach((block) => {
    gsap.fromTo(
      block,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: block,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  return () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
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

        <section className="exp-section" id='experiencia'>

          <div className="title">
            <h2>Experiência</h2>
            <h2>Experiência</h2>
            <h2>Experiência</h2>
            <h2>Experiência</h2>
          </div>

          <div className="exp-container">

            <div className="exp" id='exp1'>
              <h3>Analista de Comunicação e Marketing</h3>
              <h4>Grupo Crisdu</h4>
              <h5>Jan 2026 - Atual</h5>
            </div>

            <div className="exp" id='exp2'>
              <h3>Analista de Planejamento Júnior</h3>
              <h4>Agência Fuego</h4>
              <h5>Set 2024 - Jul 2025</h5>
            </div>
        
            <div className="exp" id='exp3'>
              <h3>Estagiária de Mídias Sociais</h3>
              <h4>Agência Fuego</h4>
              <h5>Fev 2024 - Set 2024</h5>
            </div>

            <div className="exp" id='exp4'>
              <h3>Estagiária de Mídias Sociais</h3>
              <h4>Cirúrgica Nascente</h4>
              <h5>Mai 2023 - Fev 2024</h5>
            </div>

          </div>

        </section>

        <section className="educ-section" id='formacao'>

          <div className="title">
            <h2>Educação</h2>
            <h2>Educação</h2>
            <h2>Educação</h2>
            <h2>Educação</h2>
            <h2>Educação</h2>
          </div>

          <div className="educ-container">
            <div className="educ" id='educ1'>
              <h3>Bacharelado em Publicidade e Propaganda</h3>
              <h4>Universidade Cruzeiro do Sul</h4>
              <h5>Mar 2023 - Dez 2026</h5>
            </div>
        
            <div className="educ" id='educ2'>
              <h3>Ensino Médio Técnico em Marketing</h3>
              <h4>ETEC Tiquatira</h4>
              <h5>Jan 2020 - Dez 2022</h5>
            </div>
          </div>

        </section>

        <section className="project-section" id='projetos'>

          <p>Mais que ideias criativas, são experiências com propósito pensadas para emocionar e engajar, <span>do planejamento à execução.</span></p>

          <article className="projects-article">

            <div className="title">
            <h2>Projetos</h2>
            <h2>Projetos</h2>
            <h2>Projetos</h2>
            <h2>Projetos</h2>
          </div>

            <div className="carousel-wrapper">
              <div className="carousel-container">
                {cards.map((card, index) => (
                  <div className="card" key={index}>
                    <img src={card.img} alt={card.title} />
                    <div className="image"></div>
                    <h3>{card.title}</h3>
                    <h4>{card.subtitle}</h4>
                    <h5>{card.description}</h5>
                  </div>
                ))}
              </div>
            </div>
          </article>

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
