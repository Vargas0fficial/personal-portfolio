import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 border-t border-[var(--border-color)]">
      <div className="max-w-3xl">
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold tracking-tight text-[var(--text-primary)] mb-6"
        >
          About Me
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[var(--text-secondary)] text-base font-light leading-relaxed space-y-4"
        >
          I am a dedicated Developer passionate about creating clean, efficient, and user-centric digital experiences. With a strong eye for detail and a solid understanding of modern web technologies, I bridge the gap between design and functional code.
        </motion.p>
      </div>
    </section>
  );
};

export default About;