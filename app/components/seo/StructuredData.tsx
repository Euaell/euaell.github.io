import React from 'react';

interface StructuredDataProps {
	type?: 'person' | 'portfolio' | 'breadcrumb';
}

export function StructuredData({ type = 'person' }: StructuredDataProps) {
	const personSchema = {
		"@context": "https://schema.org",
		"@type": "Person",
		"name": "Euael M. Eshete",
		"alternateName": "Euael Eshete",
		"jobTitle": "Full Stack Developer & AI Engineer",
		"description": "Full Stack Developer specializing in AI-driven solutions, React, Next.js, Python, and modern web technologies. Computer Engineering graduate with 2+ years of professional experience.",
		"url": "https://portfolio.euaell.me",
		"sameAs": [
			"https://github.com/Euaell",
			"https://www.linkedin.com/in/euael-eshete",
			"https://twitter.com/euaell"
		],
		"email": "mailto:euaelmeko@gmail.com",
		"telephone": "+251-92-315-5950",
		"address": {
			"@type": "PostalAddress",
			"addressLocality": "Addis Ababa",
			"addressCountry": "Ethiopia"
		},
		"alumniOf": {
			"@type": "EducationalOrganization",
			"name": "Addis Ababa Science and Technology University",
			"sameAs": "https://www.aastu.edu.et/"
		},
		"knowsAbout": [
			"Full Stack Development",
			"React",
			"Next.js",
			"TypeScript",
			"Python",
			"Artificial Intelligence",
			"Machine Learning",
			"Web Development",
			"Software Engineering",
			"Node.js",
			"MongoDB",
			"PostgreSQL",
			"Docker",
			"Git"
		],
		"hasOccupation": {
			"@type": "Occupation",
			"name": "Full Stack Developer",
			"occupationLocation": {
				"@type": "Country",
				"name": "Ethiopia"
			},
			"skills": "React, Next.js, TypeScript, Python, AI/ML, Node.js, MongoDB, PostgreSQL"
		}
	};

	const portfolioSchema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": "Euael M. Eshete Portfolio",
		"description": "Professional portfolio showcasing full stack development projects, AI solutions, and software engineering work",
		"url": "https://portfolio.euaell.me",
		"author": {
			"@type": "Person",
			"name": "Euael M. Eshete"
		},
		"inLanguage": "en-US",
		"copyrightYear": new Date().getFullYear(),
		"creator": {
			"@type": "Person",
			"name": "Euael M. Eshete"
		}
	};

	const breadcrumbSchema = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{
				"@type": "ListItem",
				"position": 1,
				"name": "Home",
				"item": "https://portfolio.euaell.me"
			},
			{
				"@type": "ListItem",
				"position": 2,
				"name": "About",
				"item": "https://portfolio.euaell.me#about"
			},
			{
				"@type": "ListItem",
				"position": 3,
				"name": "Projects",
				"item": "https://portfolio.euaell.me#work"
			},
			{
				"@type": "ListItem",
				"position": 4,
				"name": "Contact",
				"item": "https://portfolio.euaell.me#contact"
			}
		]
	};

	let schema;
	switch (type) {
		case 'portfolio':
			schema = portfolioSchema;
			break;
		case 'breadcrumb':
			schema = breadcrumbSchema;
			break;
		case 'person':
		default:
			schema = personSchema;
			break;
	}

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	);
}

// Combined component that includes all schemas
export function AllStructuredData() {
	return (
		<>
			<StructuredData type="person" />
			<StructuredData type="portfolio" />
			<StructuredData type="breadcrumb" />
		</>
	);
}
