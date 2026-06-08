import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGitAlt, FaPython, FaNodeJs } from 'react-icons/fa';
import { 
  SiTypescript, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiPostman, 
  SiMongodb, 
  SiExpress, 
  SiVercel, 
  SiRender, 
  SiBootstrap,
  SiErlang,
  SiCplusplus,
  SiAnthropic,      
  SiGooglegemini    
} from 'react-icons/si';
import { RiFlutterFill, RiFirebaseFill } from 'react-icons/ri';
import { VscCode } from 'react-icons/vsc';


const coreSkills = [
  { name: 'HTML', icon: <FaHtml5 />, color: 'rgba(227, 76, 38, 0.15)', iconColor: '#e34c26' },
  { name: 'CSS', icon: <FaCss3Alt />, color: 'rgba(38, 77, 228, 0.15)', iconColor: '#264de4' },
  { name: 'JavaScript', icon: <FaJs />, color: 'rgba(247, 223, 30, 0.15)', iconColor: '#f7df1e' },
  { name: 'TypeScript', icon: <SiTypescript />, color: 'rgba(49, 120, 198, 0.15)', iconColor: '#3178c6' },
  { name: 'React', icon: <FaReact />, color: 'rgba(97, 218, 251, 0.15)', iconColor: '#61dafb' },
  { name: 'Next.js', icon: <SiNextdotjs />, color: 'rgba(128, 128, 128, 0.15)', iconColor: 'var(--text-primary)' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: 'rgba(56, 189, 248, 0.15)', iconColor: '#38bdf8' },
  { name: 'Bootstrap', icon: <SiBootstrap />, color: 'rgba(121, 82, 179, 0.15)', iconColor: '#7952b3' },
  { name: 'Git', icon: <FaGitAlt />, color: 'rgba(240, 80, 50, 0.15)', iconColor: '#fc2600' },
  { name: 'Postman', icon: <SiPostman />, color: 'rgba(255, 108, 55, 0.15)', iconColor: '#FF6C37' },
  { name: 'Node.js', icon: <FaNodeJs />, color: 'rgba(60, 135, 58, 0.15)', iconColor: '#3c873a' }, // <-- BAGONG DAGDAG! Solidong Node Green 🟢
  { name: 'MongoDB', icon: <SiMongodb />, color: 'rgba(60, 170, 120, 0.15)', iconColor: '#3ca878' },
  { name: 'Express.js', icon: <SiExpress />, color: 'rgba(170, 170, 170, 0.15)', iconColor: '#aaaaaa' },
  { name: 'Python', icon: <FaPython />, color: 'rgba(55, 118, 171, 0.15)', iconColor: '#3776ab' },
  { name: 'C++', icon: <SiCplusplus />, color: 'rgba(0, 89, 156, 0.15)', iconColor: '#00599c' },
  { name: 'Erlang', icon: <SiErlang />, color: 'rgba(169, 0, 50, 0.15)', iconColor: '#a90032' },
  { name: 'Flutter', icon: <RiFlutterFill />, color: 'rgba(2, 86, 155, 0.15)', iconColor: '#02569b' },
  { name: 'Firebase', icon: <RiFirebaseFill />, color: 'rgba(255, 201, 14, 0.15)', iconColor: '#ffc90e' },
  { name: 'VS Code', icon: <VscCode />, color: 'rgba(0, 122, 204, 0.15)', iconColor: '#007acc' },
  { name: 'Claude', icon: <SiAnthropic />, color: 'rgba(204, 153, 102, 0.15)', iconColor: '#CC9966' },
  { name: 'Google Gemini', icon: <SiGooglegemini />, color: 'rgba(122, 153, 255, 0.15)', iconColor: '#7a95ff' },
  { name: 'Vercel', icon: <SiVercel />, color: 'rgba(0, 0, 0, 0.15)', iconColor: 'var(--text-primary)' },
  { name: 'Render', icon: <SiRender />, color: 'rgba(70, 232, 157, 0.15)', iconColor: '#46e89d' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
};

const Skills = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
      setIsDarkMode(isDark);
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-24 border-t border-[var(--border-color)] relative overflow-hidden bg-[var(--bg-primary)] transition-colors duration-300">
      <div className="absolute left-[-10%] top-1/2 -translate-y-1/2 w-80 h-80 bg-neutral-400/5 dark:bg-neutral-100/2 rounded-full filter blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold tracking-tight text-[var(--text-primary)] mb-10 flex items-center gap-3"
        >
          Skills
          <span className="h-[1px] w-12 bg-[var(--border-color)] inline-block" />
        </motion.h2>
        
        <motion.div 
          key={isDarkMode ? 'dark-skills' : 'light-skills'}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap gap-4"
        >
          {coreSkills.map((skill, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ 
                y: -4,
                scale: 1.02,
                backgroundColor: skill.color,
                borderColor: skill.name === 'Next.js' || skill.name === 'Vercel' ? 'var(--text-primary)' : skill.iconColor,
              }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-6 py-3 rounded-full border border-solid border-[var(--border-color)] bg-[var(--bg-secondary)] dark:bg-neutral-900/40 text-[var(--text-primary)] text-sm font-medium subtle-shadow cursor-pointer transition-all duration-300 select-none group relative overflow-hidden"
            >
              {/* Soft Inner Glow Card Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none filter blur-xl scale-75 rounded-full"
                style={{ backgroundColor: skill.iconColor }}
              />

              {/* Icon Holder - FIXED: Ibinalik ang permanenteng kulay gamit ang inline style native handling */}
              {/* Walang gagamiting event listeners, pure style parameter kaya hindi ito mka-cache ng kahit anong drag state */}
              <span 
                className="text-xl relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                style={{ color: skill.iconColor }}
              >
                {skill.icon}
              </span>

              {/* Text Element */}
              <span className="relative z-10 tracking-wide font-medium text-[var(--text-primary)] transition-colors">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;