/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    // If your site will be served from a subpath, specify `basePath` and `assetPrefix`
    basePath: isProd ? '' : '',
    assetPrefix: isProd ? '' : '',
};

export default nextConfig;

// next.config.js

// module.exports = {
//   output: 'export',
//   images: {
//     unoptimized: true,
//   },
//   // If your site will be served from a subpath, specify `basePath` and `assetPrefix`
//   basePath: isProd ? '/your-repo-name' : '',
//   assetPrefix: isProd ? '/your-repo-name/' : '',
// };