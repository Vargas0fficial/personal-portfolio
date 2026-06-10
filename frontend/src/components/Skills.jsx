import React from 'react';
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
  { name: 'HTML', icon: <FaHtml5 />, iconColor: '#e34c26' },
  { name: 'CSS', icon: <FaCss3Alt />, iconColor: '#264de4' },
  { name: 'JavaScript', icon: <FaJs />, iconColor: '#f7df1e' },
  { name: 'TypeScript', icon: <SiTypescript />, iconColor: '#3178c6' },
  { name: 'React', icon: <FaReact />, iconColor: '#61dafb' },
  { name: 'Next.js', icon: <SiNextdotjs />, iconColor: 'var(--text-primary)' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss />, iconColor: '#38bdf8' },
  { name: 'Bootstrap', icon: <SiBootstrap />, iconColor: '#7952b3' },
  { name: 'Git', icon: <FaGitAlt />, iconColor: '#fc2600' },
  { name: 'Postman', icon: <SiPostman />, iconColor: '#FF6C37' },
  { name: 'Node.js', icon: <FaNodeJs />, iconColor: '#3c873a' },
  { name: 'MongoDB', icon: <SiMongodb />, iconColor: '#3ca878' },
  { name: 'Express.js', icon: <SiExpress />, iconColor: '#aaaaaa' },
  { name: 'Python', icon: <FaPython />, iconColor: '#3776ab' },
  { name: 'C++', icon: <SiCplusplus />, iconColor: '#00599c' },
  { name: 'Erlang', icon: <SiErlang />, iconColor: '#a90032' },
  { name: 'Flutter', icon: <RiFlutterFill />, iconColor: '#02569b' },
  { name: 'Firebase', icon: <RiFirebaseFill />, iconColor: '#ffc90e' },
  { name: 'VS Code', icon: <VscCode />, iconColor: '#007acc' },
  { name: 'Claude', icon: <SiAnthropic />, iconColor: '#CC9966' },
  { name: 'Google Gemini', icon: <SiGooglegemini />, iconColor: '#7a95ff' },
  { name: 'Vercel', icon: <SiVercel />, iconColor: 'var(--text-primary)' },
  { name: 'Render', icon: <SiRender />, iconColor: '#46e89d' },
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
  return (
    <section id="stack" className="py-24 border-t border-[var(--border-color)] relative overflow-hidden bg-[var(--bg-primary)] transition-colors duration-300">
      <div className="absolute left-[-10%] top-1/2 -translate-y-1/2 w-80 h-80 bg-neutral-400/5 dark:bg-neutral-100/2 rounded-full filter blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold tracking-tight text-[var(--text-primary)] mb-10"
        >
          Stack
        </motion.h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-5"
        >
          {coreSkills.map((skill, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              {/* Icon box */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                <span style={{ color: skill.iconColor }}>{skill.icon}</span>
              </div>

              {/* Label */}
              <span className="text-sm font-normal text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-200 truncate">
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