// Smoke test seluruh route dari folder out/ (hasil `npm run build`).
// Tanpa dependency tambahan: server statis minimal + fetch bawaan Node.
// Jalankan: npm run smoke   (tambah di package.json: "smoke": "node scripts/smoke-test.mjs")
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "out");
const DATA = path.join(__dirname, "..", "data", "products.mismi.json");

if (!fs.existsSync(OUT)) {
  console.error("❌ Folder out/ tidak ada. Jalankan `npm run build` dulu.");
  process.exit(1);
}

// Bangun daftar route dari data produk (agar selalu sinkron dengan katalog)
let products = [];
try {
  products = JSON.parse(fs.readFileSync(DATA, "utf-8"));
} catch {
  console.error("⚠️ data/products.mismi.json tidak terbaca — hanya test route statis.");
}

const cats = [...new Set(products.map((p) => p.category))];
const routes = [
  "/", "/catalog", "/about", "/faq", "/wishlist", "/checkout", "/sitemap.xml",
  ...cats.map((c) => `/kategori/${c}`),
  ...products.map((p) => `/produk/${p.slug}`),
];

// Server statis minimal untuk folder out/
const MIME = {
  ".html": "text/html", ".xml": "application/xml", ".css": "text/css",
  ".js": "text/javascript", ".svg": "image/svg+xml", ".webp": "image/webp",
  ".jpeg": "image/jpeg", ".jpg": "image/jpeg", ".png": "image/png", ".ico": "image/x-icon",
  ".json": "application/json", ".txt": "text/plain", ".woff2": "font/woff2",
};
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  // Static export Next.js + trailingSlash: route = folder/index.html
  const dir = path.join(OUT, p);
  if (!p.endsWith("/") && fs.existsSync(dir) && fs.statSync(dir).isDirectory()) p += "/";
  if (p.endsWith("/")) p += "index.html";
  const file = path.join(OUT, p);
  if (fs.existsSync(file) && fs.statSync(file).isFile()) {
    res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream" });
    res.end(fs.readFileSync(file));
  } else {
    res.writeHead(404); res.end("not found");
  }
});

const PORT = 4173;
await new Promise((r) => server.listen(PORT, r));

let fail = 0;
for (const route of routes) {
  const res = await fetch(`http://localhost:${PORT}${route}`);
  const ok = res.status === 200;
  if (!ok) fail++;
  console.log(`${ok ? "✅" : "❌"} ${route} → ${res.status}`);
}
server.close();

console.log(fail === 0 ? `\nSemua ${routes.length} route OK (200).` : `\n${fail}/${routes.length} route GAGAL.`);
process.exit(fail === 0 ? 0 : 1);