import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { videos } from '../data/videos';
import './VideoReel.css';

gsap.registerPlugin(ScrollTrigger);

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

// Faixa de vídeos que rola na horizontal enquanto a página rola na vertical.
export default function VideoReel() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const [reducedMotion] = useState(() => window.matchMedia(REDUCED_MOTION).matches);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const track = trackRef.current;
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  // Só toca os vídeos que estão (quase) na tela.
  useEffect(() => {
    if (reducedMotion) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) target.play().catch(() => {});
          else target.pause();
        });
      },
      { rootMargin: '0px 25% 0px 25%' }
    );

    rootRef.current.querySelectorAll('video').forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section className="reel" id="videos" ref={rootRef} aria-labelledby="videos-titulo">
      <h2 className="visually-hidden" id="videos-titulo">
        Vídeos — produção audiovisual
      </h2>

      <div className="reel-viewport">
        <ul className="reel-track" ref={trackRef}>
          {videos.map((video, index) => (
            <li className="reel-item" key={video.src}>
              <video
                src={video.src}
                muted
                loop
                playsInline
                preload="metadata"
                controls={reducedMotion}
                aria-label={video.title}
              />

              <div className="reel-caption">
                <span>{String(index + 1).padStart(2, '0')}</span>
                {video.link ? (
                  <a href={video.link} target="_blank" rel="noopener noreferrer">
                    Assistir ↗
                  </a>
                ) : (
                  <span>colocar link depois</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
