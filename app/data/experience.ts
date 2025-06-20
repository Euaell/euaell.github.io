export interface ExperienceItem {
	date: string;
	title: string;
	subtitle: string;
	location: string;
	description: string[];
}

export const experienceData: ExperienceItem[] = [
	{
		date: 'Mar 2025 - Present',
		title: 'Software Engineer',
		subtitle: 'SecureTron Inc.',
		location: '(Remote) Addis Ababa, Ethiopia',
		description: [
			'Developed and maintained responsive user interfaces for a client-facing security dashboard using Razor Pages',
			'Implemented security best practices and utilised Docker containers for reliable deployment',
		],
	},
	{
		date: 'Sep 2023 - Mar 2025',
		title: 'Software Engineer at AfroChat',
		subtitle: 'Africa to Silicon Valley',
		location: 'Addis Ababa, Ethiopia',
		description: [
			'Developed and integrated advanced LLMs (GPT, Mistral, Gemini) and image models (DALL-E, Stable Diffusion) to power AI-driven conversational agents, enhancing user engagement and interaction.',
			'Architected and developed a robust backend using FastAPI and LiteStar, supporting user base growth from 60 to almost 2000 and increasing message volume from 1,250 to over 58,000 over 12 months.',
			'Created an intuitive frontend for the AfroChat Telegram mini-app using Vue.js, focusing on UI/UX design and state management to optimize user experience.',
			'Currently developing a functional calling tools model to integrate multi-media interactions and third-party app integrations into the chat module.',
		],
	},
	{
		date: 'Jul 2023 - Sep 2023',
		title: 'Computer Engineer',
		subtitle: 'HISP Ethiopia',
		location: 'Addis Ababa, Ethiopia',
		description: [
			'Developed responsive WordPress websites.',
			'Customized WordPress themes and plugins to meet client requirements.',
			'Ensured websites are optimized for performance, security, and SEO.',
			'Customized DHIS2 instances to align with client needs, including data entry forms, dashboards, and reports.',
			'Created clear and comprehensive documentation for WordPress websites, DHIS2 customizations, and web applications.',
		],
	},
	{
		date: 'Mar 2022 - Jul 2022',
		title: 'Computer Engineer intern',
		subtitle: 'New Era Research and Development Center',
		location: 'Addis Ababa, Ethiopia',
		description: [
			'Worked on making customer 3D printers and CNC machines. Was part of a team that worked on simultaneous control of the 3-axis motors.',
			'I also worked as a full-stack engineer in a team working on the company ordering website.'
		]
	},
];
