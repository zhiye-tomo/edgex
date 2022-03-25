/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  compilerOptions: {
    baseUrl: "src",
  },
  env: {
    host: "host",
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
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
