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
          // Added to the preflight response to indicate the permitted HTTP methods
          // {
          //   key: "Access-Control-Allow-Methods",
          //   value: "GET",// post
          // },
          // Indicates how the browser should handle opening new windows and tabs in the context of cross-origin requests
          {
            key: "Cross-Origin-Opener-Policy",
            value: process.env.CROSS_ORIGIN_OPENER_POLICY,
          },

          // Prevents the site from being opened in an <iframe> (protection against clickjacking)
          {
            key: 'X-Frame-Options',
            value: process.env.X_FRAME_OPTIONS,
          },
          // Prevents MIME-sniffing (e.g., ensuring HTML is not treated as JS)
          {
            key: 'X-Content-Type-Options',
            value: process.env.X_CONTENT_TYPE_OPTIONS,
          },
          // Controls what data goes into the Referer header
          {
            key: 'Referrer-Policy',
            value: process.env.REFERRER_POLICY,
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
            value: process.env.PERMISSIONS_POLICY,
          },
        ],
      },
    ]
  }
};

export default nextConfig;
