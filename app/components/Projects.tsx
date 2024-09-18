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
];

const Projects: React.FC = () => {

  return (
    <section id="projects" className="py-16 bg-slate-200">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">Projects</h2>
        <div className="space-y-8">
          {projects.map((project, index) => (
            <div key={index} className="proj-item">
              <h3 className="text-2xl font-semibold">{project.title}</h3>
              {project.description && <p className="mt-2">{project.description}</p>}
              {project.responsibilities.length > 0 && (
                <ul className="list-disc list-inside mt-2">
                  {project.responsibilities.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
