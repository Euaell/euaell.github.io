import React from 'react';

function Projects(): React.ReactNode {
  return (
    <section id="projects">
      <h2>Projects</h2>
      <div className="project-list">
        <div className="project">
          <h3>Project 1</h3>
          <p>Brief description of project 1.</p>
        </div>
        <div className="project">
          <h3>Project 2</h3>
          <p>Brief description of project 2.</p>
        </div>
      </div>
    </section>
  );
}

export default Projects;
