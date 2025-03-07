export interface EducationItem {
  date: string;
  title: string;
  subtitle: string;
  location: string;
  description: string[];
}

export const educationData: EducationItem[] = [
  // {
  //   date: '2023 - Present',
  //   title: 'Master of Science in Computer Science',
  //   subtitle: 'Addis Ababa University',
  //   location: 'Addis Ababa, Ethiopia',
  //   description: [
  //     'Focus on Artificial Intelligence and Machine Learning',
  //     'Research on Large Language Models and their applications',
  //   ],
  // },
  {
    date: '2018 - 2023',
    title: 'Bachelor of Science in Computer Engineering',
    subtitle: 'Addis Ababa University',
    location: 'Addis Ababa, Ethiopia',
    description: [
      'Graduated with distinction',
      'Focus on software engineering, embedded systems, and computer architecture',
      'Completed senior project on AI-driven conversational agents',
    ],
  },
];
