/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      // existing
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
      // new ones needed
      'avatars.githubusercontent.com',
      'cdn.worldvectorlogo.com',
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}
module.exports = nextConfig