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

          // Prevents the site from being opened in an <iframe> (protection against clickjacking)
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // Prevents MIME-sniffing (e.g., ensuring HTML is not treated as JS)
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Controls what data goes into the Referer header
          {
            key: 'Referrer-Policy',
            // value: 'strict-origin-when-cross-origin',
            value: 'no-referrer'
          },
          // Block access to browser features and APIs
          // interest-cohort=() — Disables the "FLoC" feature, which is a way of grouping users for targeted advertising
          // camera=(), microphone=(), geolocation=() - Disables access to user's camera, microphone, geolocation
          // fullscreen=() — Disables the ability to enter fullscreen mode
          // payment=() — Disables access to the Payment Request API
          // usb=() — Disables access to the user's USB devices
          // accelerometer=() — Disables access to the accelerometer API, which measures device motion
          // display-capture=() — Disables access to the screen capture API, preventing the site from capturing the screen
          // gyroscope=() — Disables access to the gyroscope API, which detects device rotation
          // magnetometer=() — Disables access to the magnetometer API, which measures magnetic field strength
          // midi=() — Disables access to the MIDI API
          // picture-in-picture=() — Restricts the picture-in-picture feature to a specific allowed domain
          // xr-spatial-tracking=() — Disables access to the spatial tracking API, used for augmented reality (AR) and virtual reality (VR) features
          {
            key: 'Permissions-Policy',
            value: 'interest-cohort=(), camera=(), microphone=(), geolocation=(), fullscreen=(), payment=(), usb=(), accelerometer=(), display-capture=(), gyroscope=(), magnetometer=(), midi=(), picture-in-picture=("https://cdn.plyr.io"), xr-spatial-tracking=()',
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
