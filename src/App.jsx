import { useEffect, useState } from 'react';
import About from './components/About.jsx';
import ContactForm from './components/ContactForm.jsx';
import Education from './components/Education.jsx';
import Experience from './components/Experience.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Reviews from './components/Reviews.jsx';
import Skills from './components/Skills.jsx';

function getThemeByTime() {
  const hours = new Date().getHours();
  return hours >= 7 && hours < 21 ? 'light' : 'dark';
}

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setTheme(getThemeByTime());
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main className="resume-layout">
        <aside className="resume-sidebar">
          <About />
          <Skills />
          <Education />
        </aside>
        <div className="resume-content">
          <Experience />
          <Reviews />
        </div>
      </main>
      <Footer />
      <ContactForm />
    </>
  );
}

export default App;