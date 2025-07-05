import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';
import { FaArrowLeft } from 'react-icons/fa';
import { main, section, tr } from 'framer-motion/client';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const revealSection = useRef(null);
  const titleRef = useRef(null);
  const carouselRef = useRef();


  const cards = [
    {
      title: 'Bioage Truck Skincare',
      subtitle: 'Ativação de marca em parque',
      description: 'Ativação da linha de hidratação facial da BioAge em formato lúdico, com truck personalizado, roleta de brindes, testes de hidratação e massagens faciais. A ação contou com presença de influencers, distribuição de sorvetes saudáveis e ambientação leve, conectando produto, verão e bem-estar.',
      img: '/bioage.png',
    },
    {
      title: 'Cafeteria Conceito - Brasil Cacau',
      subtitle: 'PVD',
      description: 'Projeto de ponto de venda que posiciona a marca em um novo ambiente. A cafeteria conceito oferece experiência acolhedora com cafés inspirados nos chocolates Brasil Cacau, espaços para leitura, descanso e encontros — gerando valor agregado ao consumo.',
      img: '/brasilcacau.png',
    },
    {
      title: 'Encontro Corporativo Daiichi Sankyo',
      subtitle: 'Conceito e cenografia',
      description: 'Criação de conceito e cenografia inspirados na cultura japonesa e no Kaizen, valorizando o desenvolvimento contínuo das equipes. O ambiente foi pensado para reforçar os valores da marca em um encontro interno com colaboradores.',
      img: '/daiichi.png',
    },
    {
      title: 'Estande Bettanin',
      subtitle: 'Subtítulo',
      description: 'Descrição rápida do projeto',
      img: '/bettanin.png',
    },
    {
      title: 'Evento L´oréal Brandstorm ',
      subtitle: 'Subtítulo',
      description: 'Descrição rápida do projeto',
      img: '/loreal.png',
    },
    {
      title: 'Tour e Workshop Fábrica Celmar',
      subtitle: 'Subtítulo',
      description: 'Descrição rápida do projeto',
      img: '/celmar.png',
    },
  ]

   const [currentCard, setCurrentCard] = useState(cards[0]);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const top = useTransform(scrollY, [0, windowHeight], ['50vh', '2vh']);
  const fontSize = useTransform(scrollY, [0, windowHeight], ['4rem', '1.5rem']);
  const menuOpacity = useTransform(scrollY, [0.8 * windowHeight, windowHeight], [0, 1]);

  useEffect(() => {
  const video = document.querySelector('.video-bg');

  // Garante que ScrollTrigger calcule corretamente após o vídeo carregar
  if (video) {
    video.addEventListener('loadeddata', () => {
      ScrollTrigger.refresh();
    });
  }


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

  gsap.to(titleRef.current, {
    fontSize: '3rem',
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#contact',
      start: 'top top',
      end: 'bottom 100%',
      toggleActions: 'play reverse play reverse',
      scrub: false,
      //markers: true,
    },
  });

  const handleScroll = () => {
    const container = carouselRef.current;
    if (!container) return;

    const children = Array.from(container.children);
    const containerCenter = container.scrollLeft + container.offsetWidth / 2;

    let closestCard = cards[0];
    let closestDistance = Infinity;

    children.forEach((child, i) => {
      const cardCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(cardCenter - containerCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestCard = cards[i];
      }
    });

    setCurrentCard(closestCard);
  };

  const container = carouselRef.current;
  if (container) {
    container.addEventListener('scroll', handleScroll);
  }

  return () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    if (video) {
      video.removeEventListener('loadeddata', ScrollTrigger.refresh);
    }
    if (container) {
      container.removeEventListener('scroll', handleScroll);
    }
  }
}, [cards]);

  return (
    <main>
      <section className="video-section">
         <video src="/video.mp4" autoPlay loop muted playsInline className="video-bg"/>

          <motion.button className="menu-icon" style={{ opacity: menuOpacity }} onClick={() => setIsMenuOpen(true)}>
        ☰
        </motion.button>

        <motion.div className="title-container" style={{ top }}>
          <motion.h1 className="parallax-title" style={{ fontSize }} ref={titleRef} >
            Isabela
            <br />Moraes
          </motion.h1>
        </motion.div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.aside className="sidebar"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.4 }}
            >
              <button className="close-button" onClick={() => setIsMenuOpen(false)}>
                ×
              </button>
              <nav>
                <h1>Isabela <br/> Moraes</h1>
                <ul>
                  <li>
                    <a href="/ISABELADEMORAES.pdf" target="_blank" rel="noopener noreferrer">
                      Currículo
                    </a>
                  </li>
                  <li>
                    <a href="#contact">Contato</a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/isabelademoraes">LinkedIn</a>
                  </li>
                  <li>
                    <a href="mailto:isabelafmoraes21@gmail.com">isabelafmoraes21@gmail.com</a>
                  </li>
                </ul>
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>
        
      </section>

      <section className='bio-section'>

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

      <section className="services-section">

        <div className="title">
          <h2>Serviços</h2>
          <h2>Serviços</h2>
          <h2>Serviços</h2>
          <h2>Serviços</h2>
        </div>

         <ul>

          <div className="service">
            <li>Planejamento pubicitário e de eventos </li>
            <FaArrowLeft className='arrow' />
          </div>

          <div className="service">
            <li>Criação e roteiros e conteúdo audiovisual</li>
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

      <section className="exp-section">

        <div className="title">
          <h2>Experiência</h2>
          <h2>Experiência</h2>
          <h2>Experiência</h2>
          <h2>Experiência</h2>
        </div>

        <div className="exp-container">

          <div className="exp" id='exp1'>
            <h3>Planejamento Criativo Júnior</h3>
            <h4>Agência Fuego</h4>
            <h5>Set 2024 - Atual</h5>
          </div>
        
          <div className="exp" id='exp2'>
            <h3>Estagiária de Mídias Sociais</h3>
            <h4>Agência Fuego</h4>
            <h5>Fev 2024 - Ago 2024</h5>
          </div>

          <div className="exp" id='exp3'>
            <h3>Estagiária de Publicidade e Propaganda</h3>
            <h4>Cirúgica Nascente</h4>
            <h5>Mai 2023 - Fev 2024</h5>
          </div>

        </div>

      </section>

      <section className="educ-section">

        <div className="title">
          <h2>Educação</h2>
          <h2>Educação</h2>
          <h2>Educação</h2>
          <h2>Educação</h2>
          <h2>Educação</h2>
        </div>

        <div className="educ-container">
          <div className="educ" id='educ1'>
            <h3>Publicidade e Propaganda</h3>
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

      <section className="project-section">

        <p>Mais que ideias criativas, são experiências com propósito pensadas para emocionar e engajar, <span>do planejamento à execução.</span></p>

        <article className="projects-article">

          <div className="title">
          <h2>Projetos</h2>
          <h2>Projetos</h2>
          <h2>Projetos</h2>
          <h2>Projetos</h2>
        </div>

          <div className="carousel-wrapper">
            <div className="carousel-container" ref={carouselRef}>
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

      <section className="contact-section" id='contact'>

        <a href="mailto:isabelafmoraes21@gmail.com">isabelafmoraes21@gmail.com</a>

        <p>Me coloco à disposição para contribuir com projetos de comunicação e experiências de marca.</p>

        <div className="media">
            <a href="https://www.linkedin.com/in/isabelademoraes">
            <img src="/LinkedIn.svg" alt="LinkedIn" /> </a>

            <a href="https://wa.me/5511983916271?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20seus%20serviços" target="_blank" rel="noopener noreferrer"> <img src="/WhatsApp.svg" alt="WhatsApp" id='zap' /> </a>

          </div>

         <footer>&copy; Isabela Moraes 2025 Todos os direitos reservados</footer>

      </section>
    </main>
  );
}

export default App;
