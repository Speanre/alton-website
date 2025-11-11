/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '', // Empty for default HTTPS
        pathname: '/**', // Allows any path/query (e.g., /300x200?text=Design+1)
      },
    ],
  },
};

export default nextConfig;