import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const revealSection = useRef(null);

  const cards = [
    {
      title: 'Ativação Truck BioAge Skincare',
      subtitle: 'Subtítulo',
      description: 'Descrição rápida do projeto',
      img: '/bioage.png',
    },
    {
      title: 'Cafeteria Conceito - Brasil Cacau',
      subtitle: 'Subtítulo',
      description: 'Descrição rápida do projeto',
      img: '/brasilcacau.png',
    },
    {
      title: 'Encontro Corporativo Daiichi Sankyo',
      subtitle: 'Subtítulo',
      description: 'Descrição rápida do projeto',
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

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const top = useTransform(scrollY, [0, windowHeight], ['50vh', '2vh']);
  const fontSize = useTransform(scrollY, [0, windowHeight], ['4rem', '1.5rem']);
  const menuOpacity = useTransform(scrollY, [0.8 * windowHeight, windowHeight], [0, 1]);

  useEffect(() => {
    const paragraphs = gsap.utils.toArray('.p1, .p2, .p3, .p4, .p5, .p-proj');

    paragraphs.forEach((p) => {
      gsap.fromTo(
        p,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: p,
            start: "top center",
            end: "bottom 50%",
            toggleActions: 'play reverse play reverse',
            markers: true, 
          },
        }
      );
    });

    // Animação da seção branca subindo
    gsap.fromTo(
      revealSection.current,
      { yPercent: 30 },
      {
        yPercent: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: revealSection.current,
          start: 'bottom 30%',
          end: 'top 80%',
          scrub: true,
        },
      }
    );
    
    // Animação da lista: destaque do item central
  const listItems = gsap.utils.toArray('.white-section ul li');

  listItems.forEach((li) => {
    gsap.to(li, {
      opacity: 1,
      scrollTrigger: {
        trigger: li,
        start: 'center center',
        end: 'center center',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const distanceFromCenter = Math.abs(self.start - self.scroller.scrollTop);
          const fade = Math.max(0.5, 1 - distanceFromCenter / window.innerHeight);
          gsap.to(li, { opacity: fade, overwrite: 'auto', duration: 0.1 });
        }
      },
    });
  });

  const expArticle = gsap.utils.toArray('.white-section .experiencia');
  const qualArticle = gsap.utils.toArray('.white-section .qualificacao');

  expArticle.forEach(() => {
    gsap.to(".white-section", {
      backgroundColor: "#000",
      scrollTrigger: {
        trigger: ".experiencia",
        start: "top 10%",
        end: "bottom 120%",
        scrub: true,
        //markers: true,
      },
    });
  }
  );

  qualArticle.forEach(() => {
    gsap.to(".white-section", {
      backgroundColor: "#fff",
      scrollTrigger: {
        trigger: ".qualificacao",
        start: "top 10%",
        end: "bottom 120%",
        scrub: true,
        //markers: true,
      },
    });
  });

      // Animação de fade + deslocamento para cada .exp
    const expBlocks = gsap.utils.toArray('.exp');
    const qualBlocks = gsap.utils.toArray('.qual');

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
            // markers: true,
          },
        }
      );
    });

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
            // markers: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
}, []);


  return (
    <div className="parallax-wrapper">
      <motion.button
        className="menu-icon"
        style={{ opacity: menuOpacity }}
        onClick={() => setIsMenuOpen(true)}
      >
        ☰
      </motion.button>

      <motion.div className="title-container" style={{ top }}>
        <motion.h1 className="parallax-title" style={{ fontSize }}>
          Isabela
          <br />Moraes
        </motion.h1>
      </motion.div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.aside
            className="sidebar"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
          >
            <button className="close-button" onClick={() => setIsMenuOpen(false)}>
              ×
            </button>
            <nav>
              <ul>
                <li>
                  <a href="/ISABELADEMORAES.pdf" target="_blank" rel="noopener noreferrer">
                    Currículo
                  </a>
                </li>
                <li>
                  <a href="#contato">Contato</a>
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

      <section ref={revealSection} className="white-section">
        <p className="p1">
          Sempre acreditei que boas <span>ideias</span> não nascem do nada. Elas surgem da escuta, da{' '}
          <span>curiosidade</span> e do desejo genuíno de gerar <span>impacto</span>.
        </p>

        <p className="p2">
          Encontrei na publicidade uma forma de transformar histórias em <span>experiências</span>.
        </p>

        <p className="p3">
          Ao longo da minha trajetória, mergulhei em projetos onde pude unir <span>criação</span>,{' '}
          <span>estratégia</span> e <span>planejamento</span>.
        </p>

        <p className="p4">
          Hoje, me dedico ao <span>planejamento criativo</span> e ao <span>live marketing</span>, buscando
          criar conexões reais entre marcas e pessoas.
        </p>

        <p className="p5">
          Acredito na força das <span>ideias</span> que tocam, engajam e <span>permanecem</span>.
        </p>

        <ul>
          <li className='li1'>Planejamento pubicitário e de eventos</li>
          <li className='li2' >Criação e roteiros e conteúdo audiovisual</li>
          <li className='li3'>Redação publicitária e Storytelling</li>
          <li className='li4'>Produção de conteúdo</li>
          <li className='li5'>Análise de métricas digitais</li>
        </ul>

        <article className="experiencia">

          <div className="exp exp1">
            <h2>Planejamento Criativo Júnior</h2>
            <h3>Agência Fuego</h3>
            <h4>Set 2024 - Atual</h4>
          </div>

          <div className="exp exp2">
            <h2>Estagiária de Mídias Sociais</h2>
            <h3>Agência Fuego</h3>
            <h4>Fev 2024 - Ago 2024</h4>
          </div>

          <div className="exp exp3">
            <h2>Estagiária de Publicidade e Propaganda</h2>
            <h3>Cirúrgica Nascente</h3>
            <h4>Mai 2023 - Fev 2024</h4>
          </div>

        </article>

        <article className='qualificacao'>
          <div className="qual qual1">
            <h2>Publicidade e Propaganda</h2>
            <h3>Universidade Cruzeiro do Sul</h3>
            <h4>Mar 2023 - Dez 2026</h4>
          </div>

          <div className="qual qual2">
            <h2>Enino Médio Técnico em Marketing</h2>
            <h3>ETEC Tiquatira</h3>
            <h4>Jan 2020 - Dez 2022</h4>
          </div>
        </article>

        <p className='p-proj'>Mais do que ideias criativas, aqui estão experiências pensadas com propósito. Do planejamento à execução, cada projeto foi construído para emocionar e engajar.</p>

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

        <section className='contato' id='contato'>

          <a href='mailto:isabelafmoraes21@gmail.com'>isabelafmoraes21@gmail.com</a>

          <p className='ctt-p'>Me coloco à disposição para contribuir com projetos de comunicação e experiências de marca.</p>

          <div className="media">
            <a href="https://www.linkedin.com/in/isabelademoraes">
            <img src="/LinkedIn.svg" alt="LinkedIn" /> </a>

            <a href="https://wa.me/5511983916271?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20seus%20serviços" target="_blank" rel="noopener noreferrer"> <img src="/WhatsApp.svg" alt="WhatsApp" id='zap' /> </a>

          </div>

      </section>

      <footer>&copy; Isabela Moraes 2025</footer>
      </section>
      
    </div>
  );
}

export default App;
