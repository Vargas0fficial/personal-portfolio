import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiCopy, FiCheck } from 'react-icons/fi';

const EMAIL = 'mbvargas19@gmail.com';

const socials = [
  { icon: FiGithub,   label: 'GitHub',   href: 'https://github.com/markvargas' },
  { icon: FiLinkedin, label: 'LinkedIn',  href: 'https://linkedin.com/in/markvargas' },
  { icon: FiTwitter,  label: 'Twitter',   href: 'https://twitter.com/markvargas' },
];

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 border-t border-[var(--border-color)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center space-y-6 max-w-lg mx-auto"
      >
        {/* Eyebrow */}
        <p className="text-xs uppercase tracking-widest text-[var(--text-secondary)] font-medium">
          Get in touch
        </p>

        {/* Title */}
        <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
          Let's build something great
        </h2>

        {/* Description */}
        <p className="text-sm font-light leading-relaxed text-[var(--text-secondary)] max-w-sm">
          Have an interesting project or opportunity in mind? Feel free to reach out —
          I'm always open to discussing new ideas and engineering concepts.
        </p>

        {/* Email Pill */}
        <motion.button
          onClick={handleCopy}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full premium-border bg-[var(--bg-primary)] text-sm text-[var(--text-primary)] hover:opacity-75 transition-opacity"
        >
          {copied ? (
            <>
              <FiCheck size={14} />
              Copied!
            </>
          ) : (
            <>
              <FiMail size={14} />
              {EMAIL}
              <FiCopy size={12} className="text-[var(--text-secondary)] ml-1" />
            </>
          )}
        </motion.button>

        {/* Say Hello CTA */}
        <motion.a
          whileTap={{ scale: 0.98 }}
          href={`mailto:${EMAIL}`}
          style={{ backgroundColor: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)' }}
          className="px-7 py-3 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
        >
          Say Hello
        </motion.a>

        {/* Socials */}
        <div className="flex items-center gap-5 pt-2 text-[var(--text-secondary)]">
          {socials.map(({ icon: Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ y: -3, opacity: 0.7 }}
              className="transition-all duration-200"
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;