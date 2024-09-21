'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import BackgroundParticles from './BackgroundParticles';

interface EducationItem {
  date: string;
  degree: string;
  institution: string;
  location: string;
  gpa?: string;
  coursework?: string[];
}

const education: EducationItem[] = [
  {
    date: 'Oct 2023 – Present',
    degree: 'MSc in Computer Engineering',
    institution: 'Addis Ababa University',
    location: 'Addis Ababa, Ethiopia',
  },
  {
    date: 'Sep 2018 – Jun 2023',
    degree: 'BSc in Computer Engineering',
    institution: 'Addis Ababa University',
    location: 'Addis Ababa, Ethiopia',
    gpa: 'Overall GPA: 3.59 / 4.00 | Major GPA: 3.81 / 4.00',
    coursework: [
      'Database',
      'Digital Logic Design',
      'Digital Signal Processing (using MATLAB)',
      'Software Engineering',
      'Computer Architecture and Organization',
      'Object-Oriented Programming',
    ],
  },
  // Add more education items if needed
]

const educationVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
  exit: { opacity: 0, x: 50, transition: { duration: 0.6 } },
}

const Education: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <motion.section
      id="education"
      className="py-16 bg-transparent"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={educationVariants}
    >
      <BackgroundParticles type="education" />
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Education</h2>
        <div className="space-y-8">
          {education.map((edu, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => toggleExpand(index)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">{edu.degree}</h3>
                  <p className="text-gray-600">
                    {edu.institution}, {edu.location}
                  </p>
                  <p className="text-gray-500">{edu.date}</p>
                </div>
                <div>
                  {expandedIndex === index ? (
                    <svg
                      className="w-6 h-6 text-gray-600 transform rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </div>
              </div>

              {expandedIndex === index && (
                <div className="mt-4 text-gray-700 animate-fadeIn">
                  {edu.gpa && <p className="mb-2 font-medium">{edu.gpa}</p>}
                  {edu.coursework && (
                    <div>
                      <p className="font-semibold mb-1">Relevant Coursework:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {edu.coursework.map((course, idx) => (
                          <li key={idx}>{course}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Education;
