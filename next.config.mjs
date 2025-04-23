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
          // 1. CPS Headers:
          // {
          // key: 'Content-Security-Policy',
          // value: cspHeader.replace(/\n/g, ''),
          // },

          // ----------------------------------------

          // 2. CORS Headers
          // By default, Next.js relies on a same-origin approach, imposing a strict policy. If you want to change that, you must configure it manually:

          // { key: "Access-Control-Allow-Credentials", value: "true" },
          // { key: "Access-Control-Allow-Origin", value: "*" }, // replace this with your actual origin
          // { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          // { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },

          // This is to isolate browsing contexts like a tab or window to protect your site from XSS attacks and data stolen through shared browsing contexts.
          // { key: "Cross-Origin-Opener-Policy", value: "same-origin" },

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

// const cspHeader = `
// default-src 'self';
// script- src 'self' 'unsafe-eval' 'unsafe-inline';
// style - src 'self' 'unsafe-inline';
// img - src 'self' blob: data: ;
// font - src 'self';
// object - src 'none';
// base - uri 'self';
// form - action 'self';
// frame - ancestors 'none';
// upgrade - insecure - requests;`

export default nextConfig;
