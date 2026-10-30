import { Link } from 'react-router';
import './ProjectPage.css';

export default function NotFoundPage() {
  return (
    <main className="case case-missing">
      <p className="section-label">(404)</p>
      <h1 className="case-title">Página não encontrada</h1>
      <p className="case-summary">O endereço pode ter mudado. Que tal ver os trabalhos selecionados?</p>
      <Link className="case-back" to={{ pathname: '/', hash: '#trabalhos' }}>
        <span aria-hidden="true">←</span> Trabalhos selecionados
      </Link>
    </main>
  );
}
