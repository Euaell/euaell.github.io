'use client';

import { motion } from 'framer-motion';
import React from 'react';
import BackgroundParticles from './BackgroundParticles';

interface ProjectItem {
  title: string;
  description: string;
  responsibilities: string[];
}

const projects: ProjectItem[] = [
  {
    title: 'Car Dealership Website',
    description:
      'The program optimizes inventory management and transaction tracking for auto dealers, monitoring goods and financial exchanges, and enables customer searches for preferred car models.',
    responsibilities: [],
  },
  {
    title: 'Mekdim - School Portal',
    description: '',
    responsibilities: [
      'Actively engaged in the requirements, design, coding, and testing phase of the software.',
      'Managed a team of 26 during the requirement phase of the development, to design a reliable system.',
      'Developed and tested more than 2000 lines of back-end code in the development and testing phase.',
    ],
  },
  // Add more projects if needed
]

const projectsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
  exit: { opacity: 0, transition: { duration: 0.6 } },
}

function Projects(): React.ReactElement {
  return (
    <motion.section
      id="projects"
      className="py-16 bg-slate-200"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={projectsVariants}
    >
      <BackgroundParticles type="projects" />
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Projects</h2>
        <div className="overflow-x-auto">
          <div className="flex space-x-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                {project.description && (
                  <p className="text-gray-600 leading-relaxed mb-4">{project.description}</p>
                )}
                {project.responsibilities.length > 0 && (
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {project.responsibilities.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
