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
};

export default nextConfig;
