// app/components/Education.tsx
'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

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
];

const Education: React.FC = () => {
  const eduRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (eduRef.current) {
      gsap.from(eduRef.current.querySelectorAll('.edu-item'), {
        opacity: 0,
        x: 50,
        duration: 1,
        stagger: 0.2,
      });
    }
  }, []);

  return (
    <section id="education" ref={eduRef} className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">Education</h2>
        <div className="space-y-8">
          {education.map((edu, index) => (
            <div key={index} className="edu-item">
              <h3 className="text-2xl font-semibold">{edu.degree}</h3>
              <p className="text-sm text-gray-600">
                {edu.institution}, {edu.location}
              </p>
              <p className="text-sm text-gray-600">{edu.date}</p>
              {edu.gpa && <p className="mt-2">{edu.gpa}</p>}
              {edu.coursework && (
                <div className="mt-2">
                  <p className="font-semibold">Relevant Coursework:</p>
                  <ul className="list-disc list-inside">
                    {edu.coursework.map((course, idx) => (
                      <li key={idx}>{course}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
