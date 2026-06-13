import React, { useState, useEffect, lazy, Suspense } from 'react';

const Navbar = lazy(() => import('./components/Navbar'));
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Certificates = lazy(() => import('./components/Certificates'));
const Experience = lazy(() => import('./components/Experience'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e) => setDarkMode(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } catch {}
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen relative w-full selection:bg-neutral-500/30">
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full filter blur-[150px] pointer-events-none opacity-40 bg-radial from-blue-400/30 via-purple-300/10 to-transparent dark:from-blue-900/20 dark:via-transparent" />
      
      <Suspense fallback={
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', fontFamily:'sans-serif', opacity:0.5}}>
          Loading...
        </div>
      }>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        
        <main className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 space-y-12">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certificates />
          <Experience />
          <Contact />
        </main>
      </Suspense>

      <footer className="w-full text-center py-12 border-t border-[var(--border-color)] text-[var(--text-secondary)] text-xs font-light">
        © {new Date().getFullYear()} Mark Vargas. All rights reserved.
      </footer>
    </div>
  );
}

export default App;