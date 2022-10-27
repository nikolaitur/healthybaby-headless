const nextConfig = {
  reactStrictMode: true,
  images: {
    // add image domains here as needed, for next/image
    deviceSizes: [640, 660, 768, 1024, 1600, 1920, 2400],
    domains: ['cdn.shopify.com', 'placeimg.com', 'images.ctfassets.net'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

module.exports = nextConfig
