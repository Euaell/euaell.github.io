export interface EducationItem {
  date: string;
  title: string;
  subtitle: string;
  location: string;
  description: string[];
}

export const educationData: EducationItem[] = [
  {
    date: '2018 - 2023',
    title: 'BSc in Computer Engineering',
    subtitle: 'Addis Ababa University',
    location: 'Addis Ababa, Ethiopia',
    description: [
      'Major GPA: 3.81/4.00, graduated with high distinction.',
      'Thesis: IoT-based Water Distribution Monitoring System.',
      'Relevant coursework: Database Systems, DSP, Software Engineering, Computer Architecture.',
    ],
  },
];
