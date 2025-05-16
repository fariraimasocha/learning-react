/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: '8k43l3p85r.ufs.sh',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
