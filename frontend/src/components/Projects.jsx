import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const minimalistProjects = [
  {
    title: 'Barangay Domalandan East Management System',
    description: 'is an unofficial, publicly accessible digital portal for a barangay—the smallest local government unit in the Philippines. It serves as an online hub for transparency, e-government services, and community communication, replacing manual, paper-based processes',
    link: 'https://barangay-mis.vercel.app',
    github: '#',
    image: '/screenshots/project-1.png',
    stacks: ['MongoDB', 'Express.js', 'React', 'Node.js'],
  },
  {
    title: 'Image-PDF Merger & Converter',
    description: 'Easily convert images to PDF and merge documents. ads Free! Built with a focus on clean design and efficient performance, this tool simplifies file management tasks for users of all levels.',
    link: 'https://my-converter-app-mdv.vercel.app/',
    github: '#',
    image: '/screenshots/project-2.png',
    stacks: ['Typescript', 'Python'],
  },
  {
    title: 'Resident Portal - Domalandan East Management System',
    description: 'Coming Soon! A dedicated resident portal for the Domalandan East Management System, designed to empower community members with easy access to local services, announcements, and resources. This portal will enhance communication and engagement within the barangay, fostering a stronger sense of community.',
    link: '#',
    github: '#',
    image: '/screenshots/resident-login.png',
    stacks: ['Node.js', 'Express.js', 'MongoDB', 'JWT'],
  },
  {
    title: 'Barangay Domalandan East - Landing Page',
    description: 'Coming Soon! A sleek, modern landing page for the Barangay Domalandan East Management System, designed to provide a welcoming and informative introduction to the community portal. This landing page will feature an overview of services, key announcements, and easy navigation to essential resources, all wrapped in a visually appealing design.',
    link: '#',
    github: '#',
    image: '/screenshots/landing-page.jpg',
    stacks: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Suzuki Management Appointment System - Pangasinan Branch',
    description: 'A real-time digital appointment system for managing and scheduling appointments at the Suzuki dealership in Pangasinan.',
    link: 'https://szk-system.vercel.app',
    github: '#',
    image: '/screenshots/szk-pang.png',
    stacks: ['MongoDB', 'Express.js', 'React', 'Node.js'],
  },
  {
    title: 'Suzuki Management Appointment System - Tarlac Branch',
    description: 'A real-time digital appointment system for managing and scheduling appointments at the Suzuki dealership in Tarlac.',
    link: 'https://szk-tarlac.vercel.app',
    github: '#',
    image: '/screenshots/szk-tarlac.png',
    stacks: ['MongoDB', 'Express.js', 'React', 'Node.js'],
  },
  {
    title: 'Suzuki Management Appointment System - La Union Branch',
    description: 'A real-timedigital appointment system for managing and scheduling appointments at the Suzuki dealership in La Union.',
    link: 'https://szk-launion.vercel.app',
    github: '#',
    image: '/screenshots/szk-launion.png',
    stacks: ['MongoDB', 'Express.js', 'React', 'Node.js'],
  },
   {
    title: 'PSU OJT SYSTEM - GROUP 3',
    description: 'A PSU OJT Monitoring System is a digital platform designed for Pangasinan State University to track, manage, and evaluate student On-the-Job Training. It automates attendance logs, requirement submissions, and performance evaluations to replace slow manual paperwork',
    link: 'https://psu-ojt-system-group3.vercel.app/',
    github: '#',
    image: '/screenshots/psu-ojt-screenshot.png',
    stacks: ['MongoDB', 'Express.js', 'React', 'Node.js'],
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 border-t border-[var(--border-color)] w-full max-w-full overflow-hidden block">

      {/* FIXED STRUCTURAL GRID WALL: Pinalitan ang px-1 ng master alignment settings */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold tracking-tight text-[var(--text-primary)] mb-8"
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {minimalistProjects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="rounded-xl premium-border bg-[var(--bg-primary)] subtle-shadow overflow-hidden flex flex-col group w-full"
            >
              {/* Screenshot */}
              <div className="w-full h-44 overflow-hidden bg-neutral-100 dark:bg-neutral-800 relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col justify-between flex-1 space-y-4 w-full">
                <div className="space-y-3">
                  <h3 className="text-base font-semibold text-[var(--text-primary)] leading-snug break-words">
                    {project.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm font-light leading-relaxed break-words">
                    {project.description}
                  </p>

                  {/* Stack Badges */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.stacks.map((stack, i) => (
                      <span
                        key={i}
                        className="stack-badge whitespace-nowrap"
                      >
                        {stack}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex items-center gap-5 pt-4 border-t border-[var(--border-color)] mt-auto">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium text-[var(--text-primary)] hover:opacity-70 transition-opacity"
                  >
                    <FiExternalLink size={13} />
                    View Project
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:opacity-70 transition-opacity"
                  >
                    <FiGithub size={13} />
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;