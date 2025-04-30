/** @type {import('next').NextConfig} */
const nextConfig = {
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
          ...(process.env.CORS_ENABLED === 'true' && [
            // Indicates whether the browser should include credentials, such as cookies or HTTP authentication, in the cross-origin request
            {
              key: "Access-Control-Allow-Credentials",
              value: process.env.ACCESS_CONTROL_ALLOW_CREDENTIALS,
            },

            // Specifies the origin that has access to the resource
            {
              key: "Access-Control-Allow-Origin",
              value: process.env.ACCESS_CONTROL_ALLOW_ORIGIN,
              // value: "https://chelzoo.tech" // cdn ya gos
            },

            // Indicates how the browser should handle opening new windows and tabs in the context of cross-origin requests
            {
              key: "Cross-Origin-Opener-Policy",
              value: process.env.CROSS_ORIGIN_OPENER_POLICY,
            }
          ]),

          // Prevents the site from being opened in an <iframe> (protection against clickjacking)
          ...(process.env.X_FRAME_OPTIONS && {
            key: 'X-Frame-Options',
            value: process.env.X_FRAME_OPTIONS,
          }),

          // Prevents MIME-sniffing (e.g., ensuring HTML is not treated as JS)
          ...(process.env.X_CONTENT_TYPE_OPTIONS && {
            key: 'X-Content-Type-Options',
            value: process.env.X_CONTENT_TYPE_OPTIONS,
          }),

          // Controls what data goes into the Referer header
          ...(process.env.REFERRER_POLICY && {
            key: 'Referrer-Policy',
            value: process.env.REFERRER_POLICY,
          }),

          // Block access to browser features and APIs
          ...(process.env.PERMISSIONS_POLICY && {
            key: 'Permissions-Policy',
            value: process.env.PERMISSIONS_POLICY,
          }),
        ]
      }
    ]
  }
};

export default nextConfig;
