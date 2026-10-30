import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { gsap } from 'gsap';
import { contact, sectionLink, sections } from '../data/contact';
import './Header.css';

const LINKS = [
  { label: 'Currículo', href: contact.cv, external: true },
  { label: 'LinkedIn', href: contact.linkedin, external: true },
  { label: contact.email, href: `mailto:${contact.email}` },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const timelineRef = useRef(null);
  const wasOpenRef = useRef(false);

  useLayoutEffect(() => {
    const menu = menuRef.current;
    const ctx = gsap.context(() => {
      timelineRef.current = gsap
        .timeline({
          paused: true,
          onReverseComplete: () => gsap.set(menu, { visibility: 'hidden' }),
        })
        .fromTo(
          menu,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.75, ease: 'power4.inOut' }
        )
        .fromTo(
          '.menu-link',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.7, ease: 'power3.out', stagger: 0.05 },
          0.3
        )
        .fromTo('.menu-meta', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.55);
    }, menu);

    return () => ctx.revert();
  }, []);

  // Depois do Hero, o header vira uma pílula escura flutuante.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timeline = timelineRef.current;
    const root = document.documentElement;

    if (open) {
      gsap.set(menuRef.current, { visibility: 'visible' });
      timeline.timeScale(1).play();
      root.style.overflow = 'hidden';
      menuRef.current.querySelector('a')?.focus({ preventScroll: true });

      const onKeyDown = (event) => {
        if (event.key === 'Escape') setOpen(false);
      };
      window.addEventListener('keydown', onKeyDown);
      wasOpenRef.current = true;

      return () => window.removeEventListener('keydown', onKeyDown);
    }

    if (wasOpenRef.current) {
      timeline.timeScale(1.6).reverse();
      root.style.overflow = '';
      buttonRef.current?.focus({ preventScroll: true });
      wasOpenRef.current = false;
    }
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
        <Link
          to={{ pathname: '/', hash: '#inicio' }}
          className="brand"
          onClick={close}
          aria-label="Isabela Moraes, voltar ao início"
        >
          isabela<span className="brand-tag">moraes</span>
        </Link>

        <button
          ref={buttonRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div id="site-menu" className="menu" ref={menuRef}>
        <nav aria-label="Principal">
          <ul className="menu-list">
            {sections.map((section, index) => (
              <li key={section.id}>
                <Link className="menu-link" to={sectionLink(section)} onClick={close}>
                  <span className="menu-index">{String(index + 1).padStart(2, '0')}</span>
                  {section.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="menu-meta">
          <p>Analista de comunicação &amp; marketing — {contact.location}</p>
          <ul className="menu-contacts">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
