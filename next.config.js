/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // add image domains here as needed, for next/image
    domains: ['cdn.shopify.com'],
  },
}

module.exports = nextConfig
