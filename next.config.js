/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'd33wubrfki0l68.cloudfront.net',
      'www.w3.org',
      'upload.wikimedia.org',
      'getbootstrap.com',
      'nodejs.org',
      'raw.githubusercontent.com',
      'www.vectorlogo.zone',
      'camo.githubusercontent.com',
      'github.githubassets.com',
      'seeklogo.com',
      'drive.google.com',
    ],
    dangerouslyAllowSVG: true,
  },
}
module.exports = nextConfig
