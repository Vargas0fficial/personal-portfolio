import React from 'react';
import { motion } from 'framer-motion';

const Certificates = () => {
  // Sample data for certificates - replace with actual data as needed:
  const certificatesList = [
    {
      id: 1,
      title: "Responsive Web Design",
      issuer: "freeCodeCamp",
      date: "2022",
      credentialUrl: "https://www.freecodecamp.org/certification/vargasmark/responsive-web-design",
    },
    {
      id: 2,
      title: "Front-end Development with Libriaries",
      issuer: "freeCodeCamp",
      date: "2022",
      credentialUrl: "https://www.freecodecamp.org/certification/vargasmark/front-end-development-with-libraries",
    },
    {
      id: 3,
      title: "Data Visualization",
      issuer: "freeCodeCamp",
      date: "2022",
      credentialUrl: "https://www.freecodecamp.org/certification/vargasmark/data-visualization",
    },
    {
      id: 4,
      title: "Back-End Dvelopment & APIs",
      issuer: "freeCodeCamp",
      date: "2022",
      credentialUrl: "https://www.freecodecamp.org/certification/vargasmark/back-end-development-and-apis",
    },
    {
      id: 5,
      title: "Quality Assurance",
      issuer: "freeCodeCamp",
      date: "2022",
      credentialUrl: "https://www.freecodecamp.org/certification/vargasmark/quality-assurance-v7",
    },
    {
      id: 6,
      title: "JavaScript Algorithms & Data Structures",
      issuer: "freeCodeCamp",
      date: "2022",
      credentialUrl: "https://www.freecodecamp.org/certification/vargasmark/javascript-algorithms-and-data-structures",
    },
    {
      id: 7,
      title: "Legacy Full-Stack",
      issuer: "freeCodeCamp",
      date: "2022",
      credentialUrl: "https://www.freecodecamp.org/certification/vargasmark/full-stack",
    },
    {
      id: 8,
      title: "Insights from Data with BigQuery",
      issuer: "Google Cloud",
      date: "October 31, 2022",
      credentialUrl: "https://www.skills.google/public_profiles/c1bdefb3-1d07-498a-bde8-0466efc6d9a4/badges/2794302",
    },
    {
      id: 9,
      title: "Google Cloud Essentials",
      issuer: "Google Cloud",
      date: "October 30, 2022",
      credentialUrl: "https://www.skills.google/public_profiles/c1bdefb3-1d07-498a-bde8-0466efc6d9a4/badges/2791670",
    },
    {
      id: 10,
      title: "DevOps Essentials",
      issuer: "Google Cloud",
      date: "October 29, 2022",
      credentialUrl: "https://www.skills.google/public_profiles/c1bdefb3-1d07-498a-bde8-0466efc6d9a4/badges/2788045",
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04 }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="certificates" className="py-24 border-t border-neutral-200/40 dark:border-neutral-800/40 bg-[var(--bg-primary)] transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        
        {/* Section Title Heading */}
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold tracking-tight text-[var(--text-primary)]"
          >
            Certificates<span className="text-[var(--text-primary)]"></span>
          </motion.h2>
          <p className="mt-2 text-[var(--text-secondary)] text-sm font-light">
            A collection of my hard-earned credentials, completed courses, and skills acquired within the tech industry.
          </p>
        </div>

        {/*PREMIUM MINIMALIST ROW  */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col w-full divide-y divide-[var(--border-color)]"
        >
          {certificatesList.map((cert) => (
            <motion.div
              key={cert.id}
              variants={rowVariants}
              className="py-6 flex items-center justify-between gap-6 transition-all duration-200 group"
            >
              {/* Left Side: Title and Issuer Stacking */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-medium text-[var(--text-primary)] tracking-tight leading-snug break-words">
                  {cert.title}
                </h3>
                <p className="text-sm font-normal text-neutral-500 dark:text-neutral-400 mt-1 flex items-center gap-2">
                  <span>{cert.issuer}</span>
                  <span className="text-[var(--text-secondary)] opacity-40">•</span>
                  <span className="font-mono text-xs">{cert.date}</span>
                </p>
              </div>

              {/* Right Side: Direct Link with elegant bottom underline decoration */}
              <div className="flex-shrink-0">
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-normal text-[var(--text-primary)] border-b border-[var(--border-hover)] pb-0.5 hover:opacity-60 transition-opacity cursor-pointer whitespace-nowrap"
                >
                  View ↗
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Certificates;