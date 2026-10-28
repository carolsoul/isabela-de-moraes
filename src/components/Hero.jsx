import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { projects } from '../data/projects';
import './Hero.css';

const HEAD = 'isa';
const TAIL = 'bela';
const IMAGES = projects.map((project) => project.thumb);

// Pilha de palavras: quantas linhas existem e quantas sobem por ciclo.
const ROWS = 18;
const SCROLL_ROWS = 10;
const SPEED = 1.25; // linhas por segundo
const ACCEL = 0.8; // segundos acelerando até a velocidade constante

// Escala da palavra única em relação às linhas da pilha.
const SMALL = 0.6;

// Linha do tempo (segundos).
const TYPE_AT = 0.25;
const OPEN_AT = 1.3;
const GROW_AT = 3.0;
const STACK_AT = 3.6;
const ACCEL_ROWS = (SPEED * ACCEL) / 2;
const STACK_END = STACK_AT + ACCEL + (SCROLL_ROWS - ACCEL_ROWS) / SPEED;

// Deslocamentos (em linhas, a partir do centro) das linhas que trocam de imagem.
const SWAP_OFFSETS = [1, -1, 2, 0, -2, 1, 3, -1, 0, 2, -2, 1];
const SWAP_EVERY = 0.38;
const SWAP_CLOSE = 0.3;
const SWAP_OPEN = 0.55;

const imageIndex = (index) => ((index % IMAGES.length) + IMAGES.length) % IMAGES.length;

// Quantas linhas a pilha já subiu no instante `t` da linha do tempo.
function shiftAt(t) {
  const elapsed = t - STACK_AT;
  if (elapsed <= 0) return 0;
  if (elapsed <= ACCEL) return ACCEL_ROWS * (elapsed / ACCEL) ** 2;
  return ACCEL_ROWS + SPEED * (elapsed - ACCEL);
}

function Word({ image, split = false, style }) {
  const renderPart = (text) =>
    split
      ? text.split('').map((char, i) => (
          <span className="hero-char" key={i}>
            {char}
          </span>
        ))
      : text;

  return (
    <div className="hero-word" style={style}>
      <span className="hero-part">{renderPart(HEAD)}</span>
      <span className="hero-media">
        <img src={image} alt="" decoding="async" draggable="false" />
      </span>
      <span className="hero-part">{renderPart(TAIL)}</span>
    </div>
  );
}

function buildTimeline(root) {
  const q = gsap.utils.selector(root);
  const [single] = q('.hero-single');
  const singleChars = q('.hero-single .hero-char');
  const [singleMedia] = q('.hero-single .hero-media');
  const [singleImg] = q('.hero-single img');
  const [stack] = q('.hero-stack');
  const [track] = q('.hero-track');
  const rows = q('.hero-track .hero-word');
  const rowMedia = q('.hero-track .hero-media');
  const rowImgs = q('.hero-track img');

  gsap.set(single, { autoAlpha: 1, scale: SMALL });
  gsap.set(singleChars, { autoAlpha: 0 });
  gsap.set(singleMedia, { '--open': 0 });
  gsap.set(stack, { autoAlpha: 0 });
  gsap.set(track, { '--shift': 0 });

  const tl = gsap.timeline({ paused: true, repeat: -1 });

  // 1. "isabela" aparece letra por letra.
  tl.fromTo(
    singleChars,
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 0.01, stagger: 0.08, ease: 'none' },
    TYPE_AT
  );

  // 2. A imagem abre entre "isa" e "bela".
  tl.fromTo(singleMedia, { '--open': 0 }, { '--open': 1, duration: 0.75, ease: 'expo.inOut' }, OPEN_AT)
    .fromTo(singleImg, { scale: 1.35 }, { scale: 1, duration: 1, ease: 'expo.out' }, OPEN_AT + 0.15);

  // 3. A palavra cresce e vira a primeira linha da pilha.
  tl.fromTo(single, { scale: SMALL }, { scale: 1, duration: STACK_AT - GROW_AT, ease: 'power3.inOut' }, GROW_AT)
    .set(single, { autoAlpha: 0 }, STACK_AT)
    .fromTo(stack, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, STACK_AT)
    .fromTo(
      rows.slice(1),
      { autoAlpha: 0, yPercent: 40 },
      { autoAlpha: 1, yPercent: 0, duration: 0.5, ease: 'power2.out', stagger: 0.16 },
      STACK_AT + 0.05
    );

  // 4. A pilha sobe: acelera e segue em velocidade constante.
  tl.fromTo(track, { '--shift': 0 }, { '--shift': ACCEL_ROWS, duration: ACCEL, ease: 'power2.in' }, STACK_AT)
    .to(track, { '--shift': SCROLL_ROWS, duration: STACK_END - STACK_AT - ACCEL, ease: 'none' }, STACK_AT + ACCEL);

  // Enquanto sobe, linhas visíveis fecham e reabrem com outro projeto.
  const current = rows.map((_, row) => imageIndex(row));
  const busyUntil = rows.map(() => 0);
  for (let k = 0, t = STACK_AT + 0.9; t < STACK_END - 1; k += 1, t += SWAP_EVERY) {
    const center = Math.round(shiftAt(t) + 0.4);
    const row = SWAP_OFFSETS.map((_, i) => center + SWAP_OFFSETS[(k + i) % SWAP_OFFSETS.length]).find(
      (candidate) => candidate >= 0 && candidate < rows.length && busyUntil[candidate] <= t
    );
    if (row === undefined) continue;

    const hold = k % 3 === 0 ? 0.45 : 0.04;
    const reopenAt = t + SWAP_CLOSE + hold;
    current[row] = imageIndex(current[row] + 3);
    busyUntil[row] = reopenAt + SWAP_OPEN;

    tl.to(rowMedia[row], { '--open': 0, duration: SWAP_CLOSE, ease: 'power3.in' }, t)
      .to(rowImgs[row], { filter: 'blur(6px)', duration: SWAP_CLOSE, ease: 'power2.in' }, t)
      .set(rowImgs[row], { attr: { src: IMAGES[current[row]] } }, reopenAt)
      .to(rowMedia[row], { '--open': 1, duration: SWAP_OPEN, ease: 'expo.out' }, reopenAt)
      .fromTo(
        rowImgs[row],
        { scale: 1.3, filter: 'blur(6px)' },
        { scale: 1, filter: 'blur(0px)', duration: SWAP_OPEN + 0.2, ease: 'expo.out', immediateRender: false },
        reopenAt
      );
  }

  // 5. A pilha desfoca e se recolhe na palavra única, que volta ao "isabela" limpo.
  const collapseAt = STACK_END - 0.7;
  const settleAt = STACK_END - 0.3;
  tl.to(stack, { filter: 'blur(14px)', scale: 0.8, autoAlpha: 0, duration: 0.7, ease: 'power2.in' }, collapseAt)
    .set(singleChars, { autoAlpha: 1 }, settleAt)
    .set(singleMedia, { '--open': 1 }, settleAt)
    .fromTo(
      single,
      { autoAlpha: 0, scale: SMALL * 0.9, filter: 'blur(12px)' },
      { autoAlpha: 1, scale: SMALL, filter: 'blur(0px)', duration: 0.55, ease: 'power2.out', immediateRender: false },
      settleAt
    )
    .to(singleMedia, { '--open': 0, duration: 0.5, ease: 'expo.inOut' }, settleAt + 0.45)
    .set(singleChars, { autoAlpha: 0 }, settleAt + 2)
    .set({}, {}, settleAt + 2.45);

  return tl;
}

export default function Hero({ play = true }) {
  const rootRef = useRef(null);
  const timelineRef = useRef(null);
  const playRef = useRef(play);
  const visibleRef = useRef(true);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = buildTimeline(rootRef.current);
      timelineRef.current = tl;
      if (playRef.current) tl.play();

      return () => {
        timelineRef.current = null;
      };
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    playRef.current = play;
    if (play && visibleRef.current) timelineRef.current?.play();
  }, [play]);

  // Pausa a animação quando o Hero sai da tela.
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      const tl = timelineRef.current;
      if (!tl) return;
      if (entry.isIntersecting && playRef.current) tl.play();
      else tl.pause();
    });
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero" id="inicio" ref={rootRef}>
      <h1 className="visually-hidden">
        Isabela Moraes — Analista de Comunicação e Marketing, Publicitária, Storytelling de Marca, Produção de
        Eventos e Estratégia de Comunicação
      </h1>

      <div className="hero-stage" aria-hidden="true">
        <div className="hero-stack">
          <div className="hero-track">
            {Array.from({ length: ROWS }, (_, row) => (
              <Word key={row} image={IMAGES[imageIndex(row)]} />
            ))}
          </div>
        </div>

        <div className="hero-single">
          <Word image={IMAGES[0]} split />
        </div>
      </div>

      <p className="hero-labels">
        <span>Analista de</span>
        <span>Comunicação &amp; Marketing</span>
      </p>
    </section>
  );
}
