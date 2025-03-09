/** @type {import('next').NextConfig} */
const nextConfig = {
    // INFO: It has to be this way because I don't have a backend server, and only a static site is served from github pages
    output: 'export',
    images: {
        unoptimized: true,
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    poweredByHeader: false,
    reactStrictMode: true,
    swcMinify: true,
    compress: true,
    optimizeFonts: true,
    productionBrowserSourceMaps: false
};

export default nextConfig;
