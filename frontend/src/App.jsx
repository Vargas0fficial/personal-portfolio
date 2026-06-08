import React, { useState, useEffect } from 'react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen relative w-full selection:bg-neutral-500/30">
      {/* Light and Dark Smooth Background Orb Glow effect */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full filter blur-[150px] pointer-events-none opacity-40 bg-radial from-blue-400/30 via-purple-300/10 to-transparent dark:from-blue-900/20 dark:via-transparent" />
      
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 space-y-12">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <footer className="w-full text-center py-12 border-t border-[var(--border-color)] text-[var(--text-secondary)] text-xs font-light">
        © {new Date().getFullYear()} Mark Vargas. All rights reserved.
      </footer>
    </div>
  );
}

export default App;