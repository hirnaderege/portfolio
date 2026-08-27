import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Footer from './Footer.jsx';
import PageWrapper from './PageWrapper.jsx';
import HomePage from './HomePage.jsx';
import ProjectsPage from './ProjectsPage.jsx';
import ContactPage from './ContactPage.jsx';
import VisualizerPage from './VisualizerPage.jsx';

export default function App() {
  const [highlightHref, setHighlightHref] = useState(null);
  const location = useLocation();

  function handleHighlight(href){
    setHighlightHref(href);
    setTimeout(() => setHighlightHref(null), 3500);
  } // end of handle

  return (
    <>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><HomePage onHighlight={handleHighlight} /></PageWrapper>} />
          <Route path="/projects" element={<PageWrapper><ProjectsPage /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
          <Route path="/visualizer" element={<PageWrapper><VisualizerPage /></PageWrapper>} />
        </Routes>

      <div className="topnav">
        <nav>
          <Link to="/" className={highlightHref === '/' ? 'highlight-effect' : ''}> home </Link>
          <Link to="/projects" className={highlightHref === '/projects' ? 'highlight-effect' : ''}> projects </Link>
          <Link to="/contact" className={highlightHref === '/contact' ? 'highlight-effect' : ''}> contactMe </Link>
        </nav>
      </div>

      <Footer />

      <div className="news-ticker">
        <div className="ticker-content">
          <p>
             HIRNADEREGE.COM HIRNADEREGE.COM HIRNADEREGE.COM HIRNADEREGE.COM HIRNADEREGE.COM
             HIRNADEREGE.COM HIRNADEREGE.COM HIRNADEREGE.COM HIRNADEREGE.COM HIRNADEREGE.COM
             HIRNADEREGE.COM HIRNADEREGE.COM HIRNADEREGE.COM HIRNADEREGE.COM HIRNADEREGE.COM
             HIRNADEREGE.COM HIRNADEREGE.COM HIRNADEREGE.COM HIRNADEREGE.COM HIRNADEREGE.COM
             HIRNADEREGE.COM HIRNADEREGE.COM HIRNADEREGE.COM HIRNADEREGE.COM HIRNADEREGE.COM
             HIRNADEREGE.COM HIRNADEREGE.COM HIRNADEREGE.COM HIRNADEREGE.COM HIRNADEREGE.COM
             HIRNADEREGE.COM HIRNADEREGE.COM HIRNADEREGE.COM HIRNADEREGE.COM HIRNADEREGE.COM
             HIRNADEREGE.COM HIRNADEREGE.COM HIRNADEREGE.COM HIRNADEREGE.COM HIRNADEREGE.COM
          </p>
        </div>
      </div>
    </>
  );
}