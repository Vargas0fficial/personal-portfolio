import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiFacebook, FiMail } from 'react-icons/fi';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const Hero = () => {
  const titles = [
    "A Developer",
    "Freelancer",
    "Software Enthusiast",
    "Guitarist",
    "Problem Solver"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 4000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative pt-16 overflow-hidden bg-[var(--bg-primary)] transition-colors duration-300">
      
      <div className="absolute right-[-5%] top-[20%] w-[400px] h-[400px] bg-gradient-to-tr from-neutral-300/10 to-transparent dark:from-neutral-700/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left Side Texts & Buttons */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-left order-2 lg:order-1"
          >
            <motion.p variants={itemVariants} className="text-[var(--text-secondary)] text-lg font-light tracking-wide">
              Hi, I'm
            </motion.p>
            
            <div className="space-y-3">
              <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--text-primary)]">
                Mark Vargas<span className="text-[var(--text-primary)]">.</span>
              </motion.h1>
              
              <motion.h2 
                variants={itemVariants}
                className="text-2xl md:text-3xl font-medium tracking-wide h-[40px] flex items-center text-[var(--text-primary)]"
              >
                <AnimatePresence mode="wait">
                  <motion.span key={index} className="inline-flex items-center">
                    {titles[index].split("").map((letter, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.10, duration: 0.1 }}
                      >
                        {letter === " " ? "\u00A0" : letter}
                      </motion.span>
                    ))}
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                      className="inline-block ml-1.5 w-[2.5px] h-[24px] md:h-[28px] bg-[var(--text-primary)] translate-y-[1px]"
                    />
                  </motion.span>
                </AnimatePresence>
              </motion.h2>
            </div>

            <motion.p variants={itemVariants} className="text-[var(--text-secondary)] text-base max-w-md font-light leading-relaxed">
              I build responsive and modern web applications with clean code and great user experience.
            </motion.p>

            <motion.div variants={itemVariants} className="flex items-center gap-4 pt-3">
              <motion.a 
                href="#projects" 
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ backgroundColor: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)' }}
                className="px-6 py-3 rounded-lg text-sm font-medium shadow-sm"
              >
                View Projects
              </motion.a>
              <motion.a 
                href="#contact" 
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-lg text-sm font-medium premium-border bg-transparent text-[var(--text-primary)] transition-all"
              >
                Contact Me
              </motion.a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-5 pt-6 text-xl">
              {[FiGithub, FiLinkedin, FiFacebook, FiMail].map((Icon, idx) => (
                <motion.a key={idx} href="" whileHover={{ y: -4, scale: 1.15 }} className="text-neutral-400 dark:text-neutral-500 transition-colors">
                  <Icon />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side Avatar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-5 flex justify-center order-1 lg:order-2"
          >
            <div className="relative p-2 rounded-full bg-transparent">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center border border-solid border-neutral-200 dark:border-neutral-800/80 subtle-shadow transform-gpu"
              >
                <motion.img
                  src="mark.jpg"
                  alt="MARK VARGAS"
                  className="w-[101%] h-[101%] max-w-none object-cover brightness-95 dark:brightness-90 contrast-105 transform-gpu"
                  animate={{ filter: ["grayscale(1)", "grayscale(0)", "grayscale(1)"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="absolute inset-[-1px] border-[2px] border-neutral-100 dark:border-neutral-900 rounded-full z-20" />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="flex flex-col items-center">
          {[0, 0.2, 0.4].map((delay, i) => (
            <motion.div key={i} animate={{ opacity: [0.2, 1, 0.2], y: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity, delay }} className="w-3 h-3 border-r-[1.5px] border-b-[1.5px] border-[var(--text-primary)] rotate-45 -mt-1" />
          ))}
        </div>
        <span className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-medium">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;