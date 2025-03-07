export interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

export const projectsData: Project[] = [
  {
    title: 'AfroChat AI',
    description: 'A conversational AI application powered by large language models and custom integrations.',
    image: '/images/project1.jpg',
    link: 'https://github.com/euaell/afrochat',
    tags: ['Python', 'FastAPI', 'Vue.js', 'AI', 'LLM'],
  },
  {
    title: 'DHIS2 Customizations',
    description: 'Custom dashboards and data visualizations for health information systems.',
    image: '/images/project2.jpg',
    link: 'https://github.com/euaell/dhis2-custom',
    tags: ['JavaScript', 'React', 'D3.js', 'Data Visualization'],
  },
  {
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution with inventory management and payment processing.',
    image: '/images/project3.jpg',
    link: 'https://github.com/euaell/ecommerce',
    tags: ['Next.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
  },
]; 