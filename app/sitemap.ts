import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = 'https://portfolio.euaell.me';
	
	// Add all your top-level routes and sections
	const routes = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'weekly' as const,
			priority: 1,
		},
		{
			url: `${baseUrl}#about`,
			lastModified: new Date(),
			changeFrequency: 'monthly' as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}#work`,
			lastModified: new Date(),
			changeFrequency: 'monthly' as const,
			priority: 0.9,
		},
		{
			url: `${baseUrl}#contact`,
			lastModified: new Date(),
			changeFrequency: 'monthly' as const,
			priority: 0.7,
		},
	];

	return routes;
}
