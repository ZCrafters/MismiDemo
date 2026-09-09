// Kurasi data mentah Mismi dari mismi/mismi-data-mentah.xlsx -> data/products.mismi.json
// - Gabung 3 sheet marketplace (Lazada/Shopee/Tokopedia)
// - Dedupe produk yang sama muncul di >1 marketplace (cth: Hills 19H, Hazel 31H)
// - Isi categoryLabel/pack/colors, hitung discountPercent, tetapkan id + heroFlag (id 1-8)
// - Field gambar yang kosong diisi placeholder lokal & dicatat agar user melengkapi.
import ExcelJS from "exceljs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IN = path.join(__dirname, "..", "mismi", "mismi-data-mentah.xlsx");
const OUT = path.join(__dirname, "..", "data", "products.mismi.json");

const CATEGORY_LABELS = {
  "tas-ransel": "Tas Ransel",
  "tote-bag": "Tote Bag",
  "tas-selempang": "Tas Selempang",
};

// Potong teks promosi panjang -> ringkasan klaim (max 300 char).
const clip = (s, n = 300) => {
  const t = String(s || "").trim().replace(/\s+/g, " ");
  if (t.length <= n) return t;
  return t.slice(0, n - 1).trimEnd() + "…";
};

// Ekstrak inisial/nama model dari nama produk (mis. "Mismi Hazel Bag ... - 31H").
const modelKey = (name) => {
  const m = String(name || "").toLowerCase();
  const code = m.match(/\b-?\s*(\d{2}[a-z])\b/); // suffix "31H", "47J" dst
  if (code) return code[1];
  const short = m.replace(/^mismi\s*/, "").match(/^([a-z]+)/);
  return short ? short[1] : m;
};

// Ambil varian warna dari kolom `warna` (koma / "Cream" / "-").
const parseColors = (v) => {
  const raw = String(v || "").trim();
  if (!raw || raw === "-") return [];
  return raw.split(/[,\/;]/).map((s) => s.trim()).filter(Boolean).slice(0, 6);
};

const parseNum = (v) => {
  if (v == null || v === "") return 0;
  if (typeof v === "number") return v;
  const n = parseFloat(String(v).replace(/[^\d,.]/g, "").replace(",", "."));
  return isNaN(n) ? 0 : n;
};

const wb = new ExcelJS.Workbook();
await wb.xlsx.readFile(IN);

// Kumpulkan semua item dari katalog marketplace.
const rows = [];
for (const name of ["Katalog-lazada", "Katalog-shopee", "Katalog-tokopedia"]) {
  const ws = wb.getWorksheet(name);
  if (!ws) continue;
  for (let i = 2; i <= ws.rowCount; i++) {
    const r = ws.getRow(i);
    const v = r.values.slice(1);
    if (!v[0]) continue; // nama kosong
    rows.push({
      name: String(v[0] || "").trim(),
      category: String(v[1] || "").trim(),
      pack: String(v[2] || "").trim(),
      price: parseNum(v[3]),
      originalPrice: parseNum(v[4]),
      discountPercent: v[5] != null && v[5] !== "" ? parseNum(v[5]) : 0,
      rating: v[6] != null && v[6] !== "" ? parseNum(v[6]) : 0,
      soldLabel: String(v[7] || "").trim(),
      bpom: String(v[8] || "").trim(),
      colors: parseColors(v[9]),
      claim: String(v[10] || "").trim(),
      image: String(v[11] || "").trim(),
      sourceUrl: String(v[12] || "").trim(),
      note: String(v[13] || "").trim(),
    });
  }
}

// Dedupe: 1 item per modelKey, pilih yang paling "kaya" (ada harga + rating + terjual).
const byKey = new Map();
for (const it of rows) {
  const k = modelKey(it.name);
  if (!byKey.has(k)) { byKey.set(k, { key: k, items: [it] }); continue; }
  byKey.get(k).items.push(it);
}
const score = (x) => (x.price > 0 ? 2 : 0) + (x.rating > 0 ? 1 : 0) + (x.soldLabel ? 1 : 0) + (x.image ? 1 : 0);
const products = [];
for (const { key, items } of byKey.values()) {
  const best = [...items].sort((a, b) => score(b) - score(a))[0];
  products.push({ key, best, all: items });
}

// Hanya produk yang sudah punya harga yang masuk katalog demo (validate butuh price>0).
// Yang belum ada harga dicatat untuk user lengkapi di Excel lalu jalankan ulang.
const priced = products.filter((p) => p.best.price > 0);
const noPrice = products.filter((p) => !(p.best.price > 0));
const rank = [...priced].sort((a, b) => score(b.best) - score(a.best));
const heroKeys = rank.slice(0, 8).map((p) => p.key);

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

let id = 1;
const usedSlugs = new Set();
const artifacts = rank.map(({ key, best }) => {
  const hero = heroKeys.includes(key);
  const code = (String(best.name).match(/\b(\d{2}[a-z])\b/i) || [])[1] || "";
  const model = String(best.name).replace(/^mismi\s*/i, "").split(/[\s-]/)[0].trim().toLowerCase();
  let slug = slugify(`mismi-${model}-bag`);
  if (usedSlugs.has(slug)) slug = slugify(`mismi-${model}-${code || key}-bag`);
  usedSlugs.add(slug);
  const discountPercent =
    best.discountPercent ||
    (best.originalPrice > best.price && best.price > 0
      ? Math.round((1 - best.price / best.originalPrice) * 100)
      : 0);
  const item = {
    id: id++,
    slug,
    name: best.name,
    category: CATEGORY_LABELS[best.category] ? best.category : "tas-selempang",
    categoryLabel: CATEGORY_LABELS[best.category] || "Tas Selempang",
    pack: best.pack,
    sizes: [],
    colors: best.colors,
    price: best.price,
    originalPrice: best.originalPrice > 0 ? best.originalPrice : null,
    discountPercent,
    bpom: "",
    claim: clip(best.claim || "Tas Mismi — desain korea, bahan pilihan, gaya manis tiap hari."),
    images: [best.image || "/placeholder-bag.svg"],
    source: "mismi-official",
    provisional: true,
    heroFlag: hero,
    newTag: id % 4 === 0,
    rating: best.rating || 0,
    soldCount: 0,
    soldLabel: best.soldLabel,
    sourceUrl: best.sourceUrl,
  };
  return { item, hasImage: !!best.image, key, model };
});

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(artifacts.map((a) => a.item), null, 2));

// Laporan
const noImg = artifacts.filter((a) => !a.hasImage);
const byCat = {};
for (const a of artifacts) byCat[a.item.categoryLabel] = (byCat[a.item.categoryLabel] || 0) + 1;
console.log("Katalog Mismi ditulis:", OUT);
console.log(`Total ${artifacts.length} produk (yang sudah berharga), hero ${artifacts.filter((a) => a.item.heroFlag).length}.`);
console.log("Kategori:", Object.entries(byCat).map(([k, v]) => `${k}:${v}`).join(", "));
console.log(`PERLU GAMBAR (${noImg.length}):`, noImg.map((a) => a.item.slug).join(", "));
console.log(`BELUM ADA HARGA (${noPrice.length}) - tambah di Excel lalu jalankan ulang:`);
for (const p of noPrice) console.log("  -", p.best.name, "| " + p.best.category, "| " + p.best.note);
