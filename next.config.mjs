/** @type {import('next').NextConfig} */
const nextConfig = {
  // https://nextjs.org/docs/pages/api-reference/config/next-config-js/headers
  // configuring custom HTTP headers
  async headers() {
    return [
      {
        source: "/(.*).(woff|css)",
        // CORS 
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
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
          {
            key: "Access-Control-Allow-Credentials",
            value: "false",
          },
          // Specifies the origin that has access to the resource
          {
            key: "Access-Control-Allow-Origin",
            value: "https://chelzoo.tech" // cdn ya gos
          },
          // Added to the preflight response to indicate the permitted HTTP methods
          {
            key: "Access-Control-Allow-Methods",
            value: "GET",// post
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },

          // Tells the browser whether you want to allow your site to be framed or not
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // Stops a browser from trying to MIME-sniff the content type and forces it to stick with the declared content-type
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Control how much information the browser includes with navigations away from a document
          {
            key: 'Referrer-Policy',
            // value: 'strict-origin-when-cross-origin',
            value: 'no-referrer'
          },
          // Block features and APIs that can be used in the browser
          {
            key: 'Permissions-Policy',
            value: 'interest-cohort=(), camera=(), microphone=(), geolocation=(), fullscreen=(), payment=(), usb=(), accelerometer=(), autoplay=(), display-capture=(), gyroscope=(), magnetometer=(), midi=(), picture-in-picture=(), xr-spatial-tracking=()',
          }


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
