import { Route, Routes } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollManager from './components/ScrollManager';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <>
      <ScrollManager />
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trabalhos/:slug" element={<ProjectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
