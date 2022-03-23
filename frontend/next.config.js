/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compilerOptions: {
    baseUrl: "src",
  },
  env: {
    host: "host",
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
