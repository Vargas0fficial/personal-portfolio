import React from 'react';
import { motion } from 'framer-motion';

const jobHistory = [
  {
    role: 'System Support Associate',
    company: 'Magic Multi-Purpose Cooperative',
    duration: '2023 - Present',
    description: 'serves as the primary frontline technical contact for an organization, responsible for troubleshooting hardware/software issues, managing user accounts, and supporting daily IT operations'
  },
  {
    role: 'On - Call Application Support Specialist',
    company: 'DB Schenker Philippines, Inc.',
    duration: '2022 - 2023',
    description: 'maintains and optimizes software applications, bridging the gap between end-users and developers. '
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 border-t border-[var(--border-color)]">
      <div>
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold tracking-tight text-[var(--text-primary)] mb-8"
        >
          Experience
        </motion.h2>
        
        <div className="space-y-12 relative before:absolute before:top-0 before:left-3 before:w-[1px] before:h-full before:bg-[var(--border-color)]">
          {jobHistory.map((job, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-8 text-left group"
            >
              {/* Timeline Indicator Node */}
              <div className="absolute left-1.5 top-2 w-3 h-3 rounded-full bg-[var(--bg-primary)] premium-border transition-colors group-hover:bg-[var(--text-primary)]" />
              
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">{job.role}</h3>
                <span className="text-xs font-mono text-[var(--text-secondary)]">{job.duration}</span>
              </div>
              <h4 className="text-sm font-medium text-[var(--text-secondary)] mt-0.5 mb-3">{job.company}</h4>
              <p className="text-[var(--text-secondary)] text-sm font-light leading-relaxed max-w-2xl">{job.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;