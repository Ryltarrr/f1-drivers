/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 864000,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/vote",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
