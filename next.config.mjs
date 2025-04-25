/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",

  env: {
    APP_ENV: process.env.APP_ENV,
  },

  // https://nextjs.org/docs/app/api-reference/config/next-config-js/optimizePackageImports
  experimental: {
    optimizePackageImports: [
      'clsx',
      'dayjs',
      'plyr-react',
      'react-markdown',
      'axios'
    ]
  },

  images: {
    unoptimized: process.env.NODE_ENV === 'test',
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: 'minio-s3',
      },
      {
        protocol: 'https',
        hostname: '**'
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // CORS Headers

          // Indicates whether the browser should include credentials, such as cookies or HTTP authentication, in the cross-origin request
          {
            key: "Access-Control-Allow-Credentials",
            value: "false", // false
          },
          // Specifies the origin that has access to the resource
          {
            key: "Access-Control-Allow-Origin",
            value: "https://chelzoo.tech"//cdn ya gos
          },
          // Added to the preflight response to indicate the permitted HTTP methods
          {
            key: "Access-Control-Allow-Methods",
            value: "GET",// post
          },
          // Returned in response to a preflight request to specify the HTTP headers that are allowed in the current request
          // {
          //   key: "Access-Control-Allow-Headers",
          //   value: "Accept, Content-Type",//remove??
          // },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },

          // You can specify the following environment variables for CORS Headers in your .env file:
          // ACCESS_CONTROL_ALLOW_CREDENTIALS="true"
          // ACCESS_CONTROL_ALLOW_ORIGIN="*"
          // ACCESS_CONTROL_ALLOW_METHODS="GET,OPTIONS,PATCH,DELETE,POST,PUT"
          // ACCESS_CONTROL_ALLOW_HEADERS="X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
        ],
      },
    ]
  }
};

export default nextConfig;
