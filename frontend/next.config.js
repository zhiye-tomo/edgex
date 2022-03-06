/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compilerOptions: {
    baseUrl: "src",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
