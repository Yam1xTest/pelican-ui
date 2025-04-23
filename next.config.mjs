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
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },

          // 2. CORS Headers
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Origin",
            //   value: "https://your-allowed-origin.com", // replace this with your actual origin
            //   value: process.env.FRONTEND_URL, ??
            // value: "*" // если запрос с браузера с какого домена можно браузеру разрешать запросы 
            // цдн и тех
            // цсп репорт попробовать 
            // статьи прикрепить с хорошими ресурсами 
            value: "http://localhost:1336"
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: 'Content-Security-Policy-Report-Only',
            value: `
              default-src 'self';
              script-src 'self' https://mc.yandex.ru https://pos.gosuslugi.ru;
              style-src 'self' 'unsafe-inline';
              img-src 'self' https://pos.gosuslugi.ru https://cdn.plyr.io;
              media-src 'self' https://cdn.plyr.io;
              connect-src 'self' https://cdn.plyr.io;
              report-to csp-endpoint;
            `.replace(/\n/g, ''),
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

// создать флаги отдельные на корс и цсп как енейбл метрик после того как все заработает на челзу точка тех

const cspHeader = `
default-src 'self';
script-src 'self' 'unsafe-eval' 'unsafe-inline' https://mc.yandex.ru https://pos.gosuslugi.ru;
style-src 'self' 'unsafe-inline';
img-src 'self' blob: data: https://pos.gosuslugi.ru ;
media-src 'self' https://cdn.plyr.io;
connect-src 'self' https://cdn.plyr.io;
frame-src 'self' https://pos.gosuslugi.ru;
font-src 'self';
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none';
upgrade-insecure-requests`

// default-src: Specifies the default sources for all resource types (scripts, styles, images, etc.) unless otherwise specified.
// script-src: Specifies where scripts can be loaded from. You can specify specific domains or origins from which JavaScript is allowed to be loaded here.
// style-src: Specifies the sources for CSS styles.
// img-src: Specifies where images can be loaded from.
// font-src: Specifies where fonts can be loaded from.
// ?object-src: Specifies the sources for objects such as <object>, <embed>, and <applet>.
// ?base-uri: Restricts the URLs that can be used in <base> elements.
// ?form-action: Specifies where forms are allowed to be submitted.
// frame-ancestors: Specifies which origins can embed your application in an <iframe>.
// upgrade-insecure-requests: Used to automatically upgrade all non-secure (HTTP) requests to secure (HTTPS) when the page loads.
// ссылки на вк разрешить остальное запретить
// ссылка на оплату билетов
// 

export default nextConfig;
