/** @type {import('next').NextConfig} */
// Catatan: tanpa output:"export" — Vercel menjalankan Next.js native; semua route
// tetap SSG via generateStaticParams (statis, tanpa fungsi server tambahan).
const nextConfig = {
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
