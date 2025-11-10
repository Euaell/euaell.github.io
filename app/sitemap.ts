import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = 'https://portfolio.euaell.me';
	const alternateUrl = 'https://euaell.dev.et';
	const lastModified = new Date();

	// Main routes with both domains
	const routes: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: lastModified,
			changeFrequency: 'weekly',
			priority: 1.0,
			alternates: {
				languages: {
					'en': alternateUrl,
				},
			},
		},
		{
			url: `${baseUrl}/#about`,
			lastModified: lastModified,
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/#work`,
			lastModified: lastModified,
			changeFrequency: 'weekly',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/#projects`,
			lastModified: lastModified,
			changeFrequency: 'weekly',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/#skills`,
			lastModified: lastModified,
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: `${baseUrl}/#contact`,
			lastModified: lastModified,
			changeFrequency: 'monthly',
			priority: 0.8,
		},
	];

	return routes;
}
