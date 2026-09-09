/** @type {import('next').NextConfig} */
const nextConfig = {
  // "output: export" breaks next/dev for dynamic routes (generateStaticParams isn't
  // picked up by the dev server — see vercel/next.js#48579-style reports). Static
  // export is only needed for the production build that gets deployed.
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**.tokopedia-static.net" },
      { protocol: "https", hostname: "images.tokopedia.net" },
      { protocol: "https", hostname: "**.ibyteimg.com" },
      { protocol: "https", hostname: "*.shopee.co.id" },
      { protocol: "https", hostname: "*.alicdn.com" },
      { protocol: "https", hostname: "*.lazada.co.id" },
      { protocol: "https", hostname: "*.lazcdn.com" },
      { protocol: "https", hostname: "*.tiktokcdn.com" },
      { protocol: "https", hostname: "*.cdninstagram.com" },
    ],
  },
  trailingSlash: true,
};
export default nextConfig;
