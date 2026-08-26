import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import ProjectsPage from './ProjectsPage.jsx';
import ContactPage from './ContactPage.jsx';

export default function App() {
  const [highlightHref, setHighlightHref] = useState(null);

  function handleHightlight(href){
    setHighlightHref(href);
    setTimeout(() => setHighlightHref(null), 3500);
  } // end of handle

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage onHighlight={handleHightlight} />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <div className="topnav">
        <nav>
          
          <Link 
            to="/contact"
            className={highlightHref === '/contact' ? 'highlight-effect' : '' }
          >
            contactMe
          </Link>

          <Link 
          to="/projects"
          className={highlightHref === '/projects' ? 'highlight-effect' : '' }
          >
            projects
          </Link>

          <Link to="/">home</Link>

        </nav>
      </div>

      <div className="news-ticker">
        <div className="ticker-content">
          <p>
             HIRNA DEREGE HIRNA DEREGE HIRNA DEREGE HIRNA DEREGE HIRNA DEREGE
             HIRNA DEREGE HIRNA DEREGE HIRNA DEREGE HIRNA DEREGE HIRNA DEREGE
             HIRNA DEREGE HIRNA DEREGE HIRNA DEREGE HIRNA DEREGE HIRNA DEREGE
             HIRNA DEREGE HIRNA DEREGE HIRNA DEREGE HIRNA DEREGE HIRNA DEREGE
             HIRNA DEREGE HIRNA DEREGE HIRNA DEREGE HIRNA DEREGE HIRNA DEREGE
          </p>
        </div>
      </div>
    </>
  );
}