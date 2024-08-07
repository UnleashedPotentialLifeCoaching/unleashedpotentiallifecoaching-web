module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.ctfassets.net',
      },
    ],
    minimumCacheTTL: 60,
    deviceSizes: [639, 767, 1023, 1279, 1535],
    imageSizes: [320, 480, 640, 768, 924, 1180, 1436],
  },
  env: {
    NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
    NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN_TWO:
      process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN_TWO,
    NEXT_PUBLIC_CONTENTFUL_SPACE_ID:
      process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT:
      process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
    NEXT_PUBLIC_CONTENTFUL_GRAPHQL_API:
      process.env.NEXT_PUBLIC_CONTENTFUL_GRAPHQL_API,
    NEXT_PUBLIC_CONTENTFUL_GRAPHQL_API_URL:
      process.env.NEXT_PUBLIC_CONTENTFUL_GRAPHQL_API_URL,
    NEXT_PUBLIC_FAUNA_SECRET: process.env.NEXT_PUBLIC_FAUNA_SECRET,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
};
