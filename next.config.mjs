/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",

  env: {
    APP_ENV: process.env.APP_ENV,
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
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ]
  }

};

const cspHeader = `
default-src 'self';
script- src 'self' 'unsafe-eval' 'unsafe-inline';
style - src 'self' 'unsafe-inline';
img - src 'self' blob: data: ;
font - src 'self';
object - src 'none';
base - uri 'self';
form - action 'self';
frame - ancestors 'none';
upgrade - insecure - requests;`

export default nextConfig;
