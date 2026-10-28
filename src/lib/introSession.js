const STORAGE_KEY = 'isabela:intro-played';

// Também guardamos em memória para que, se o site ganhar rotas no futuro,
// voltar para a home sem recarregar a página não repita a cortina.
let playedThisLoad = false;

// A cortina só roda na primeira visita à home dentro da sessão do navegador.
export function shouldPlayIntro() {
  if (playedThisLoad) return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return sessionStorage.getItem(STORAGE_KEY) !== '1';
  } catch {
    return true;
  }
}

export function markIntroPlayed() {
  playedThisLoad = true;
  try {
    sessionStorage.setItem(STORAGE_KEY, '1');
  } catch {
    // sessionStorage indisponível (ex.: modo privado): a flag em memória basta.
  }
}
