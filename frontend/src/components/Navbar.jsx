import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiPlus } from 'react-icons/fi';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Menu items for the navbar
  const menuItems = ['Home', 'About', 'Stack', 'Projects', 'Certificates', 'Experience', 'Contact'];

  const menuVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeInOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div 
            onClick={() => setIsOpen(false)} 
            className="fixed inset-0 w-full h-screen z-30 bg-transparent cursor-default"
          />
        )}
      </AnimatePresence>

      <nav className="fixed top-0 left-0 w-full max-w-full z-50 py-4 bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-neutral-200/40 dark:border-neutral-800/40 transition-colors duration-300 block">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 flex justify-between items-center relative min-h-[44px]">
          
          {/* Brand Initials Logo */}
          <a href="#" className="text-xl font-bold tracking-tight text-[var(--text-primary)] group z-50">
            MV<span className="text-[var(--text-primary)]">.</span>
          </a>
          
          {/* Desktop CENTER CONTAINER */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 hidden md:flex justify-center items-center pointer-events-none z-40">
            <AnimatePresence mode="wait">
              {!isOpen ? (
                <motion.button
                  key="plus-btn"
                  onClick={() => setIsOpen(true)}
                  type="button"
                  initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 45 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="p-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800/60 shadow-sm flex items-center justify-center focus:outline-none cursor-pointer pointer-events-auto"
                  aria-label="Open Menu"
                >
                  <FiPlus size={18} />
                </motion.button>
              ) : (
                <motion.div
                  key="centered-menu"
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex items-center gap-1 pointer-events-auto py-1 px-4 transition-all duration-300"
                >
                  {menuItems.map((item) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setIsOpen(false)}
                      variants={itemVariants}
                      whileHover={{ y: 0 }}
                      className="relative px-3.5 py-2 text-sm font-normal tracking-wide text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 after:absolute after:bottom-0.5 after:left-3.5 after:right-3.5 after:h-[1.5px] after:bg-[var(--text-primary)] after:scale-x-0 after:origin-left after:transition-transform after:duration-200 hover:after:scale-x-100"
                    >
                      {item}
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile: + button sa gitna */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex md:hidden justify-center items-center pointer-events-none z-40">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="p-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800/60 shadow-sm flex items-center justify-center focus:outline-none cursor-pointer pointer-events-auto"
              aria-label="Toggle Menu"
            >
              <FiPlus size={18} />
            </motion.button>
          </div>

          {/* Dark mode toggle */}
          <div className="z-50">
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

        </div>
      </nav>

      {/* Mobile dropdown — centered links */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden fixed top-[73px] left-0 w-full bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-neutral-200/40 dark:border-neutral-800/40 py-4 px-8 flex flex-col gap-4 z-40 items-center"
          >
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="text-sm font-normal tracking-wide text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;