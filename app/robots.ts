import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/api/'],
			},
			{
				userAgent: 'Googlebot',
				allow: '/',
				disallow: ['/api/'],
			},
			{
				userAgent: 'Bingbot',
				allow: '/',
				disallow: ['/api/'],
			},
		],
		sitemap: [
			'https://portfolio.euaell.me/sitemap.xml',
			'https://euaell.dev.et/sitemap.xml',
		],
	};
} 