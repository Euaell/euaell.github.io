export interface Project {
  title: string;
  description: string;
  image: string;
  link?: string;
  repositoryLink: string;
  tags: string[];
  responsibilities: string[];
}

export const projectsData: Project[] = [
  {
    title: "MacroChef",
    description:
      "A recipe app that allows users to track their daily calorie intake and plan their meals.",
    responsibilities: [
      "Developed using Next.js, TypeScript, and Tailwind CSS.",
      "Implemented user authentication and authorization using NextAuth.js.",
      "Integrated the Spoonacular API to fetch recipes and nutritional information.",
      "Implemented a custom meal planner and calorie tracker.",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "NextAuth.js",
      "Spoonacular API",
    ],
    repositoryLink: "https://github.com/Euaell/macro_chef",
    link: "https://macro.euaell.me/",
    image: "/images/placeholder.png",
  },
  {
    title: "Mekdim - School Portal",
    description: "",
    responsibilities: [
      "Actively engaged in the requirements, design, coding, and testing phase of the software.",
      "Managed a team of 26 during the requirement phase of the development, to design a reliable system.",
    ],
    tags: ["ExpressJS", "React", "MongoDB"],
    repositoryLink: "https://github.com/NathanZK/Mekdim",
    image: "/images/placeholder.png",
  },
  {
    title: "React Component Library",
    description:
      "A collection of reusable React components for building web applications.",
    responsibilities: [
      "Implemented the components using TypeScript and Storybook for documentation.",
      "Used visx for charting and tailwind for styling the components.",
    ],
    repositoryLink: "https://github.com/Euaell/geek-component-library",
    link: "https://www.npmjs.com/package/@euael/eu-react",
    tags: ["React", "TypeScript", "Storybook", "visx", "Tailwind CSS"],
    image: "/images/placeholder.png",
  },
  {
    title: "Cryptograph Visualizer",
    description:
      "A web application that visualizes the cryptographic algorithms.",
    responsibilities: [
      "Developed using Next.js 15 with TypeScript and Tailwind CSS.",
      "Implemented the cryptographic algorithms using the Web Crypto API.",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    repositoryLink: "https://github.com/Euaell/Crypto_Grapher",
    link: "https://crypto-grapher.euaell.me",
    image: "/images/placeholder.png",
  },
  {
    title: "Wordle Clone",
    description: "A Wordle clone built with React.",
    responsibilities: [
      "Developed the game logic using React hooks.",
      "Implemented the game state management using zustand.",
    ],
    tags: ["React", "CSS"],
    repositoryLink: "https://github.com/Euaell/myWordle",
    link: "https://wordle.euaell.me",
    image: "/images/placeholder.png",
  },
  {
    title: "Tic Tac Toe Game",
    description: "A simple Tic Tac Toe game built with React and NestJS.",
    responsibilities: [
      "Developed the front-end using React and the back-end using NestJS.",
      "Implemented the game logic using Socket.io for real-time communication.",
      "Use Redis for caching and storing game state.",
    ],
    link: "https://euaell.github.io/tick_tack_toe",
    repositoryLink: "https://github.com/Euaell/tick_tack_toe",
    tags: ["React", "NestJS", "Socket.io", "Redis", "Docker"],
    image: "/images/placeholder.png",
  },
  {
    title: "Car Dealership Website",
    description:
      "The program optimizes inventory management and transaction tracking for auto dealers, monitoring goods and financial exchanges, and enables customer searches for preferred car models.",
    responsibilities: [],
    tags: ["React", "Node.js", "MySQL"],
    repositoryLink: "https://github.com/Euaell/Car-Dealership",
    image: "/images/placeholder.png",
  },
  {
    title: "Wordcloud Generator",
    description:
      "The program generates word clouds from a text file, with the size of each word indicating its frequency in the text.",
    responsibilities: [],
    link: "https://euaell.github.io/word_counter",
    repositoryLink: "https://github.com/Euaell/word_counter",
    tags: ["React", "react-d3-cloud", "Next.js"],
    image: "/images/placeholder.png",
  },
  {
    title: "Falling Objects Game",
    description:
      "A simple game where the player has to catch falling objects before they hit the ground.",
    responsibilities: [],
    link: "https://euaell.github.io/Falling-Objects",
    repositoryLink: "https://github.com/Euaell/Falling-Objects",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "/images/placeholder.png",
  },
];
