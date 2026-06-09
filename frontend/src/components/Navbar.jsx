import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    /* FIXED NAVBAR WRAPPER: Nilagyan ng max-w-full at overflow-hidden para panangga sa mobile scroll bugs */
    <nav className="fixed top-0 left-0 w-full max-w-full z-50 py-4 bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-neutral-200/40 dark:border-neutral-800/40 transition-colors duration-300 overflow-hidden block">
      
      {/* FIXED INNER CONTAINER: Inayos ang horizontal padding (px-4 sa mobile, px-8 sa tablet, px-16 sa desktop) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 flex justify-between items-center">
        
        {/* Brand Initials Logo */}
        <a href="#" className="text-xl font-bold tracking-tight text-[var(--text-primary)] group">
          MV<span className="text-neutral-400 group-hover:text-[var(--text-primary)] transition-colors duration-300">.</span>
        </a>
        
        {/* Navigation Items */}
        <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide">
          {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors relative group py-1"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[var(--text-primary)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Premium Functional Toggle Controller */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          type="button"
          className="relative p-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800/60 shadow-sm transition-all duration-300 flex items-center justify-center focus:outline-none cursor-pointer overflow-hidden"
          aria-label="Toggle Theme"
        >
          <AnimatePresence mode="wait" initial={false}>
            {darkMode ? (
              <motion.div
                key="sun"
                initial={{ y: -20, rotate: 90, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                exit={{ y: 20, rotate: -90, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <FiSun size={18} />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ y: -20, rotate: -90, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                exit={{ y: 20, rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <FiMoon size={18} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

      </div>
    </nav>
  );
};

export default Navbar;