import React from 'react';

function Header(): React.ReactNode {
  return (
    <header>
      <h1>Your Name</h1>
      <nav>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

export default Header;
