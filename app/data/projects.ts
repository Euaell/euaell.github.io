export interface Project {
	title: string;
	description: string;
	image: string;
	link?: string;
	repositoryLink: string;
	tags: string[];
	responsibilities: string[];
	featured: boolean;
}

export const projectsData: Project[] = [
	{
		title: 'MacroChef',
		description: 'A recipe app that allows users to track their daily calorie intake and plan their meals.',
		responsibilities: [
			'Developed using Next.js, TypeScript, and Tailwind CSS.',
			'Implemented user authentication and authorization using NextAuth.js.',
			'Integrated the Spoonacular API to fetch recipes and nutritional information.',
			'Implemented a custom meal planner and calorie tracker.',
		],
		tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'NextAuth.js', 'Spoonacular API'],
		repositoryLink: 'https://github.com/Euaell/macro_chef',
		link: 'https://macro.euaell.me/',
		image: '/images/placeholder.png',
		featured: true,
	},
	{
		title: 'Mekdim - School Portal',
		description: 'A comprehensive school management system built for educational institutions in Ethiopia. Features student enrollment, grade management, attendance tracking, and parent-teacher communication portals.',
		responsibilities: [
			'Led a team of 26 developers during the requirements gathering and system design phase',
			'Implemented scalable backend architecture using Express.js and MongoDB',
			'Designed responsive frontend interfaces using React and modern UI principles',
			'Established reliable testing frameworks and deployment pipelines',
		],
		tags: ['ExpressJS', 'React', 'MongoDB', 'Team Leadership', 'Educational Technology'],
		repositoryLink: 'https://github.com/NathanZK/Mekdim',
		image: '/images/placeholder.png',
		featured: true,
	},
	{
		title: 'React Component Library',
		description: 'A collection of reusable React components for building web applications.',
		responsibilities: [
			'Implemented the components using TypeScript and Storybook for documentation.',
			'Used visx for charting and tailwind for styling the components.',
		],
		repositoryLink: 'https://github.com/Euaell/geek-component-library',
		link: 'https://www.npmjs.com/package/@euael/eu-react',
		tags: ['React', 'TypeScript', 'Storybook', 'visx', 'Tailwind CSS'],
		image: '/images/placeholder.png',
		featured: false,
	},
	{
		title: "Cryptograph Visualizer",
		description: "A web application that visualizes the cryptographic algorithms.",
		responsibilities: [
			"Developed using Next.js 15 with TypeScript and Tailwind CSS.",
			"Implemented the cryptographic algorithms using the Web Crypto API.",
		],	
		tags: ["Next.js", "TypeScript", "Tailwind CSS"],
		repositoryLink: "https://github.com/Euaell/Crypto_Grapher",
		link: "https://crypto-grapher.euaell.me",
		image: '/images/placeholder.png',
		featured: true,
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
		image: '/images/placeholder.png',
		featured: false,
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
		repositoryLink: 'https://github.com/Euaell/tick_tack_toe',
		tags: ["React", "NestJS", "Socket.io", "Redis", "Docker"],
		image: '/images/placeholder.png',
		featured: true,
	},
	{
		title: 'Car Dealership Website',
		description: 'The program optimizes inventory management and transaction tracking for auto dealers, monitoring goods and financial exchanges, and enables customer searches for preferred car models.',
		responsibilities: [],
		tags: ['React', 'Node.js', 'MySQL'],
		repositoryLink: 'https://github.com/Euaell/Car-Dealership',
		image: '/images/placeholder.png',
		featured: false,
	},
	{
		title: 'Wordcloud Generator',
		description: 'The program generates word clouds from a text file, with the size of each word indicating its frequency in the text.',
		responsibilities: [],
		link: 'https://euaell.github.io/word_counter',
		repositoryLink: 'https://github.com/Euaell/word_counter',
		tags: ['React', 'react-d3-cloud', 'Next.js'],
		image: '/images/placeholder.png',
		featured: false,
	},
	{
		title: "Game of Life",
		description: "A web application that implements Conway's Game of Life.",
		responsibilities: [
			"Developed using React and TypeScript.",
			"Implemented the game logic using React hooks."
		],
		tags: ["React", "TypeScript"],
		repositoryLink: "https://github.com/Euaell/game_of_life",
		link: "https://gol.euaell.me",
		image: '/images/placeholder.png',
		featured: false,
	}
];
