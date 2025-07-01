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
	swcMinify: true,
	compress: true,
	optimizeFonts: true,
	productionBrowserSourceMaps: false,
	experimental: {
		optimizeCss: true,
		optimizePackageImports: ['lucide-react', 'framer-motion'],
	},
};

export default nextConfig;
