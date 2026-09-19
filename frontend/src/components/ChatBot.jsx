import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend, FiGithub, FiLinkedin, FiFacebook, FiMail } from 'react-icons/fi';

/**
 * AI-powered chatbot for Mark's portfolio.
 * Sends messages to /api/chat (a Vercel serverless function that proxies to Google Gemini).
 * Falls back to a simple rule-based keyword match if the API call fails
 * (e.g. missing key, rate limit, network issue) so the widget never breaks.
 */

const EMAIL = 'mbvargas19@gmail.com';

const quickReplies = [
  { label: 'About Mark', text: 'Tell me about Mark.' },
  { label: 'Tech Stack', text: "What's Mark's tech stack?" },
  { label: 'Projects', text: 'What projects has Mark built?' },
  { label: 'Experience', text: "What's Mark's work experience?" },
  { label: 'Certificates', text: 'What certificates does Mark have?' },
  { label: 'Contact', text: 'How can I contact Mark?' },
];

// ---- Offline fallback rules (used only if the AI request fails) ----
const fallbackRules = [
  { keywords: ['about', 'who are you', 'yourself', 'background'], response: "Mark Vargas is a dedicated Developer passionate about creating clean, efficient, user-centric digital experiences — also a Freelancer, Software Enthusiast, Guitarist, and Problem Solver." },
  { keywords: ['stack', 'skill', 'technology', 'tools', 'language'], response: "Mark's core stack: HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind CSS, Node.js, Express.js, MongoDB, Python, and more." },
  { keywords: ['project', 'portfolio', 'built', 'app', 'system'], response: "Mark has built the Barangay Domalandan East Management System, Suzuki Appointment Systems (Pangasinan, Tarlac, La Union), a PSU OJT Monitoring System, and an Image-PDF Converter. Scroll to the Projects section for details!" },
  { keywords: ['experience', 'job', 'career'], response: "Mark is currently a System Support Associate at Magic Multi-Purpose Cooperative (2023–Present), and previously an On-Call Application Support Specialist at DB Schenker Philippines (2022–2023)." },
  { keywords: ['certificate', 'certification', 'course'], response: "Mark holds certifications from freeCodeCamp and Google Cloud — check the Certificates section for direct links!" },
  { keywords: ['contact', 'email', 'reach', 'hire'], response: `You can reach Mark at ${EMAIL}, or via GitHub, LinkedIn, or Facebook below.`, showSocials: true },
];

function getFallbackResponse(input) {
  const normalized = input.toLowerCase();
  const rule = fallbackRules.find((r) => r.keywords.some((kw) => normalized.includes(kw)));
  return rule || { response: "I'm having trouble reaching my AI brain right now, but feel free to ask about Mark's background, stack, projects, experience, certificates, or contact info!" };
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! 👋 I'm Mark's AI assistant. Ask me anything about his background, skills, or projects." },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isTyping]);

  // Lock background page scroll while the chat window is open (prevents
  // scroll-through/bleed on mobile where scrolling the chat also scrolls the page).
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      const originalWidth = document.body.style.width;
      const scrollY = window.scrollY;

      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.width = originalWidth;
        document.body.style.top = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const sendToAI = async (text, historyForApi) => {
    setIsTyping(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: historyForApi }),
      });

      if (!res.ok) throw new Error('API error');

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (err) {
      const fallback = getFallbackResponse(text);
      setMessages((prev) => [...prev, { sender: 'bot', text: fallback.response, showSocials: fallback.showSocials || false }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = (rawText) => {
    const text = (rawText ?? input).trim();
    if (!text || isTyping) return;

    const historyForApi = messages.slice(-6).map((m) => ({ sender: m.sender, text: m.text }));
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setInput('');
    sendToAI(text, historyForApi);
  };

  return (
    <>
      {/* Floating toggle button */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors"
        style={{ backgroundColor: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)' }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <FiX size={22} />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <FiMessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-[60] w-[calc(100vw-3rem)] max-w-sm h-[70vh] max-h-[520px] rounded-2xl premium-border bg-[var(--bg-primary)] subtle-shadow flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-[var(--border-color)] flex items-center justify-between flex-shrink-0">
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">Ask about Mark</h3>
                <p className="text-xs text-[var(--text-secondary)] font-light">AI assistant</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain touch-pan-y px-4 py-4 space-y-3">
              <AnimatePresence initial={false}>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm font-light leading-relaxed whitespace-pre-line ${
                        msg.sender === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm premium-border'
                      }`}
                      style={
                        msg.sender === 'user'
                          ? { backgroundColor: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)' }
                          : { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }
                      }
                    >
                      {msg.text}
                      {msg.showSocials && (
                        <div className="flex items-center gap-4 pt-3 mt-2 border-t border-[var(--border-color)]">
                          <a href="https://github.com/Vargas0fficial" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:opacity-70 transition-opacity"><FiGithub size={16} /></a>
                          <a href="https://linkedin.com/in/worstcodervargas1" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:opacity-70 transition-opacity"><FiLinkedin size={16} /></a>
                          <a href="https://facebook.com/worstCoder.Vargas" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:opacity-70 transition-opacity"><FiFacebook size={16} /></a>
                          <a href={`mailto:${EMAIL}`} aria-label="Email" className="hover:opacity-70 transition-opacity"><FiMail size={16} /></a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    key="typing-indicator"
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="flex justify-start"
                  >
                    <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-sm premium-border flex items-center gap-1" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                      {[0, 0.15, 0.3].map((delay) => (
                        <motion.span
                          key={delay}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: 'var(--text-secondary)' }}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick replies */}
            <div className="px-4 pb-2 flex flex-wrap gap-2 flex-shrink-0">
              {quickReplies.map((q) => (
                <motion.button
                  key={q.label}
                  onClick={() => handleSend(q.text)}
                  disabled={isTyping}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  className="stack-badge whitespace-nowrap transition-opacity cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {q.label}
                </motion.button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="px-4 py-3 border-t border-[var(--border-color)] flex items-center gap-2 flex-shrink-0"
            >
              <motion.input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a question..."
                disabled={isTyping}
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.15 }}
                className="flex-1 text-base bg-transparent outline-none text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] font-light disabled:opacity-50"
              />
              <motion.button
                type="submit"
                aria-label="Send message"
                disabled={isTyping}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.85, rotate: -15 }}
                className="p-2 rounded-lg transition-opacity flex-shrink-0 disabled:opacity-50"
                style={{ backgroundColor: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)' }}
              >
                <FiSend size={14} />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
