/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	trailingSlash: true,
	images: {
		unoptimized: true,
		formats: ['image/webp', 'image/avif'],
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
	},
	reactStrictMode: true,
	compress: true,
	productionBrowserSourceMaps: false,
	experimental: {
		// optimizeCss: true, // Commented out to avoid critters dependency
		optimizePackageImports: ['lucide-react', 'framer-motion'],
	},
	// Explicitly expose environment variables for standalone mode
	env: {
		NODE_MAILER_HOST: process.env.NODE_MAILER_HOST,
		NODE_MAILER_PORT: process.env.NODE_MAILER_PORT,
		NODE_MAILER_USER: process.env.NODE_MAILER_USER,
		NODE_MAILER_PASS: process.env.NODE_MAILER_PASS,
	},
	// Configure headers for security and analytics
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{
						key: 'Content-Security-Policy',
						value: [
							"default-src 'self'",
							"script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://*.google-analytics.com",
							"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
							"img-src 'self' data: https: blob:",
							"font-src 'self' data: https://fonts.gstatic.com",
							"connect-src 'self' https://*.google-analytics.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://*.analytics.google.com",
							"frame-src 'self' https://www.googletagmanager.com",
							"object-src 'none'",
							"base-uri 'self'",
							"form-action 'self'",
							"frame-ancestors 'none'",
							"upgrade-insecure-requests"
						].join('; ')
					},
				],
			},
		];
	},
};

export default nextConfig;
