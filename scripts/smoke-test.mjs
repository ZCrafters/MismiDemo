// Smoke test seluruh route menggunakan `next start` (native Next.js).
// Prasyarat: `npm run build` sudah dijalankan (folder .next ada).
// Jalankan: npm run smoke
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 4173;
const BASE = `http://localhost:${PORT}`;

if (!fs.existsSync(path.join(__dirname, "..", ".next"))) {
  console.error("❌ Folder .next tidak ada. Jalankan `npm run build` dulu.");
  process.exit(1);
}

// Bangun daftar route dari data produk (selalu sinkron dengan katalog)
let products = [];
try {
  products = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "products.mismi.json"), "utf-8"));
} catch {
  console.error("⚠️ data/products.mismi.json tidak terbaca — hanya test route statis.");
}
const cats = [...new Set(products.map((p) => p.category))];
const routes = [
  "/", "/catalog", "/about", "/faq", "/wishlist", "/checkout", "/sitemap.xml",
  "/kategori/tidak-ada", // 404 harus menampilkan halaman not-found
  ...cats.map((c) => `/kategori/${c}`),
  ...products.map((p) => `/produk/${p.slug}`),
];

const server = spawn(process.execPath, [path.join(__dirname, "..", "node_modules", "next", "dist", "bin", "next"), "start", "-p", String(PORT)], {
  stdio: ["ignore", "pipe", "pipe"],
  cwd: path.join(__dirname, ".."),
});

// Tunggu server siap (poll sampai / merespons)
let ready = false;
for (let i = 0; i < 60; i++) {
  try {
    const r = await fetch(BASE + "/");
    if (r.status) { ready = true; break; }
  } catch { /* belum siap */ }
  await new Promise((r) => setTimeout(r, 1000));
}
if (!ready) {
  console.error("❌ next start tidak merespons dalam 60 detik.");
  server.kill();
  process.exit(1);
}

let fail = 0;
for (const route of routes) {
  const res = await fetch(BASE + route);
  const expected = route === "/kategori/tidak-ada" ? 404 : 200;
  const ok = res.status === expected;
  if (!ok) fail++;
  console.log(`${ok ? "✅" : "❌"} ${route} → ${res.status} (expected ${expected})`);
}
server.kill();
console.log(fail === 0 ? `\nSemua ${routes.length} route OK.` : `\n${fail}/${routes.length} route GAGAL.`);
process.exit(fail === 0 ? 0 : 1);