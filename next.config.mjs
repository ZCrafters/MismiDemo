/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**.tokopedia-static.net" },
      { protocol: "https", hostname: "images.tokopedia.net" },
      { protocol: "https", hostname: "**.ibyteimg.com" },
      { protocol: "https", hostname: "*.shopee.co.id" },
      { protocol: "https", hostname: "*.alicdn.com" },
      { protocol: "https", hostname: "*.lazada.co.id" },
      { protocol: "https", hostname: "*.tiktokcdn.com" },
      { protocol: "https", hostname: "*.cdninstagram.com" },
    ],
  },
  trailingSlash: true,
};
export default nextConfig;
