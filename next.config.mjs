/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
	},
	reactStrictMode: true,
	compress: true,
	productionBrowserSourceMaps: false,
	experimental: {
		optimizePackageImports: ['lucide-react', 'framer-motion'],
	}
};

export default nextConfig;
