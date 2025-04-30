/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    const documentPath = [
      '/articles/info/documents',
      '/articles/rekvizity-zooparka',
      '/articles/info/tasks',
      '/articles/info/plans',
      '/articles/info/orders',
      '/articles/info/activities',
      '/articles/info/purchases',
      '/articles/info/trades',
      '/articles/info/reports'
    ];

    const documentRedirects = documentPath.map((path) => ({
      source: path,
      destination: '/documents',
      permanent: false,
    }));

    return [
      {
        source: '/news/newsitems',
        destination: '/news',
        permanent: false,
      },
      {
        source: '/news/archive',
        destination: '/news',
        permanent: false,
      },
      {
        source: '/articles/rules2022',
        destination: '/visiting-rules',
        permanent: false,
      },
      {
        source: '/services/zoo/lgoty-na-poseshenie-zooparka',
        destination: '/discounts',
        permanent: false,
      },
      {
        source: '/services/zoo/detskij-kontaktnyj-zoopark',
        destination: '/contact-zoo',
        permanent: false,
      },
      {
        source: '/services/zoo',
        destination: '/',
        permanent: false,
      },
      ...documentRedirects
    ]
  },

  reactStrictMode: true,
  output: "standalone",

  env: {
    APP_ENV: process.env.APP_ENV,
  },

  ...(process.env.CDN_ENABLED === 'true' && {
    // https://nextjs.org/docs/app/api-reference/config/next-config-js/assetPrefix
    // asset prefix for JavaScript and CSS files that it loads from /_next/
    assetPrefix: `https://${process.env.CDN_DOMAIN}`
  }),

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
    ...(process.env.CDN_ENABLED === 'true' && {
      // https://nextjs.org/docs/app/api-reference/components/image#domains
      domains: [process.env.CDN_DOMAIN],
      path: `https://${process.env.CDN_DOMAIN}/_next/image`
    }),

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
      // todo remove for prod
      {
        protocol: 'https',
        hostname: '**'
      },
      {
        protocol: 'https',
        hostname: `https://${process.env.CDN_DOMAIN}/_next/image`
      },
    ]
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Indicates whether the browser should include credentials, such as cookies or HTTP authentication, in the cross-origin request
          (process.env.CORS_ENABLED === 'true' && {
            key: "Access-Control-Allow-Credentials",
            value: process.env.ACCESS_CONTROL_ALLOW_CREDENTIALS,
          }),

          // Specifies the origin that has access to the resource
          (process.env.CORS_ENABLED === 'true' && {
            key: "Access-Control-Allow-Origin",
            value: process.env.ACCESS_CONTROL_ALLOW_ORIGIN,
          }),

          // Indicates how the browser should handle opening new windows and tabs in the context of cross-origin requests
          (process.env.CORS_ENABLED === 'true' && {
            key: "Cross-Origin-Opener-Policy",
            value: process.env.CROSS_ORIGIN_OPENER_POLICY,
          }),

          // Prevents the site from being opened in an <iframe> (protection against clickjacking)
          (process.env.X_FRAME_OPTIONS && {
            key: 'X-Frame-Options',
            value: process.env.X_FRAME_OPTIONS,
          }),

          // Prevents MIME-sniffing (e.g., ensuring HTML is not treated as JS)
          (process.env.X_CONTENT_TYPE_OPTIONS && {
            key: 'X-Content-Type-Options',
            value: process.env.X_CONTENT_TYPE_OPTIONS,
          }),

          // Controls what data goes into the Referer header
          (process.env.REFERRER_POLICY && {
            key: 'Referrer-Policy',
            value: process.env.REFERRER_POLICY,
          }),

          // Block access to browser features and APIs
          (process.env.PERMISSIONS_POLICY && {
            key: 'Permissions-Policy',
            value: process.env.PERMISSIONS_POLICY,
          }),
        ]
      }
    ]
  }
};

export default nextConfig;
