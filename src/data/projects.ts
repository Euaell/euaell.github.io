import type { Project } from './types';

export { type Project };

export const projectsData: Project[] = [
	{
		title: 'Convia',
		description:
			'Conversational AI form builder that turns PDFs or briefs into structured multi-turn interviews, extracting typed answers against strict schemas.',
		responsibilities: [
			'Designed schema compiler mapping declarative form fields onto constrained multi-turn LLM interview workflows.',
			'Built hybrid intake that parses uploaded documents and conversational answers into validated JSON in real time.',
			'Shipped an MCP tool server and public REST API for external agents and workflow integrations.',
			'Implemented multi-tenant workspace isolation with scoped roles and magic-link responder mode.',
		],
		tags: ['FastAPI', 'Next.js', 'PostgreSQL', 'pgvector', 'Docker', 'MCP'],
		link: 'https://convia.zaftech.co',
		image: '/images/projects/convia-editor.webp',
		featured: true,
	},
	{
		title: 'Mizan',
		description:
			'Personal health platform for nutrition, workouts, and macro tracking, exposed to AI assistants over the Model Context Protocol.',
		responsibilities: [
			'Built an MCP server exposing typed tools for logging meals, food diaries, and workout templates.',
			'Added token management and per-tool usage analytics tracking call volume, success rate, and latency.',
			'Designed daily-log interface with interactive macro progress, workout templates, and progress history.',
		],
		tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'MCP', 'Docker'],
		repositoryLink: 'https://github.com/ZafTec/mizan',
		link: 'https://mizan.zaftech.co',
		image: '/images/projects/mizan-showcase.webp',
		featured: true,
	},
	{
		title: 'PKI Trust Manager',
		description:
			'Multi-tenant certificate lifecycle management (CLM) SaaS with online and offline activation, tenant isolation, and automated provider integrations.',
		responsibilities: [
			'Built the licensing engine handling online/offline activation, grace periods, certificate limits, and signature checks.',
			'Led the multi-tenant refactor scoping queries and licenses per organisation with middleware isolation.',
			'Shipped DigiCert CertCentral and EJBCA integrations with encrypted secrets at rest and shared CA provider abstractions.',
			'Built an in-product AI assistant with conversation persistence, role-aware access, and audit logging.',
		],
		tags: ['ASP.NET Core', 'EF Core', 'SQL Server', 'HTMX', 'Alpine.js', 'Tailwind CSS', 'Azure', 'Docker'],
		image: '/images/projects/pki-trust-manager.png',
		featured: true,
	},
	{
		title: 'Relay',
		description:
			'Curated tool and artifact registry for AI agents, with durable artifact delivery, MCP server, and transactional dispatch.',
		responsibilities: [
			'Built transactional outbox ensuring durable tool execution and 202 acceptance guarantees.',
			'Designed retry-safe execution with provider idempotency keys.',
			'Shipped an MCP server and React administration dashboard with PostgreSQL usage ledger.',
		],
		tags: ['Deno', 'TypeScript', 'Hono', 'React', 'PostgreSQL', 'Redis', 'MCP', 'Docker'],
		repositoryLink: 'https://github.com/ZafTec/relay',
		image: '/images/projects/relay.png',
		featured: false,
	},
	{
		title: 'Cryptograph Visualizer',
		description:
			'Interactive cryptographic algorithm visualizer and learning playground built with Next.js and the Web Crypto API.',
		responsibilities: [
			'Developed using Next.js 15 with TypeScript and Tailwind CSS.',
			'Implemented cryptographic algorithm visualizers using Web Crypto API and custom state engines.',
		],
		tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Web Crypto API'],
		repositoryLink: 'https://github.com/Euaell/Crypto_Grapher',
		link: 'https://crypto-grapher.euaell.me',
		image: '/images/projects/crypto-grapher.png',
		featured: false,
	},
	{
		title: 'RMS - Restaurant Operations',
		description:
			'Restaurant operations platform spanning tables, orders, staff, inventory, and billing with tenant-scoped lifecycles.',
		responsibilities: [
			'Implemented table-session and payment lifecycle handling with tenant-scoped operations.',
			'Used CQRS and MediatR to separate application commands from queries.',
			'Added integration tests against PostgreSQL for tenant data boundaries.',
		],
		tags: ['ASP.NET Core', 'Next.js', 'PostgreSQL', 'Redis', 'CQRS', 'Docker'],
		link: 'https://rms.zaftech.co/landing/',
		image: '/images/projects/rms.png',
		featured: false,
	},
	{
		title: 'Mintline',
		description:
			'Financial tracking and grading management platform designed for responsive calculation workflows.',
		responsibilities: [
			'Built dynamic calculation engines and responsive user interfaces.',
			'Designed clean, responsive UI components with TypeScript and Tailwind CSS.',
		],
		tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
		image: '/images/projects/mintline.png',
		featured: false,
	},
];
