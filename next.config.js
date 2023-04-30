/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  env: {
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    CLIENT_BEARER: process.env.CLIENT_BEARER,
    CLIENT_ID: process.env.CLIENT_ID

  }
};

module.exports = () => {

  const plugins = [];
  const config = plugins.reduce((acc, next) => next(acc), {
    ...nextConfig,
  });
  return config;
};
