export interface EducationItem {
  date: string;
  title: string;
  subtitle: string;
  location: string;
  description: string[];
}

export const educationData: EducationItem[] = [
  {
    date: 'Sept 2018 - Jun 2023',
    title: 'BSc in Computer Engineering',
    subtitle: 'Addis Ababa University',
    location: 'Addis Ababa, Ethiopia',
    description: [
      'Major GPA: 3.81/4.00 · Graduated with High Distinction.',
      'Thesis: IoT-based Water Distribution Monitoring System – Developed an IoT solution to monitor and optimise water distribution in resource-constrained environments.',
      'Relevant Coursework: Database Systems, Digital Logic Design, Digital Signal Processing, Software Engineering, Computer Architecture and Organisation, Object-Oriented Programming.',
    ],
  },
];
