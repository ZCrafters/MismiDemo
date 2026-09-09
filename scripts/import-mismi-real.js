// Import produk nyata dari mismi-products.json (scrape Lazada/Tokopedia resmi,
// gambar Lazada dipakai — Tokopedia diabaikan karena URL bertanda tangan/kedaluwarsa)
// -> data/products.mismi.json, menggantikan katalog placeholder (/placeholder-bag.svg).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IN = path.join(__dirname, "..", "mismi-products.json");
const OUT = path.join(__dirname, "..", "data", "products.mismi.json");

const CATEGORY_LABELS = {
  "tas-ransel": "Backpacks",
  "tote-bag": "Tote Bags",
  "tas-selempang": "Sling Bags",
  "aksesoris-tas": "Bag Charms",
  "sekolah-kantor": "School & Office",
};

const CATEGORY_CLAIM = {
  "tas-ransel": "A Korean-style backpack — roomy, comfy straps, and ready for school or everyday adventures.",
  "tote-bag": "A cute Korean-style tote bag — spacious, sturdy, and easy to style.",
  "tas-selempang": "A trendy Korean-style sling bag — compact, lightweight, and easy to carry.",
  "aksesoris-tas": "A cute charm to personalize your Mismi bag.",
  "sekolah-kantor": "A sweet school & stationery essential with a Mismi touch.",
};

const COLOR_MAP = {
  hitam: "Black", putih: "White", biru: "Blue", "biru tua": "Navy", kuning: "Yellow",
  hijau: "Green", coklat: "Brown", "abu-abu": "Grey", "abu abu": "Grey", cream: "Cream",
  pink: "Pink", khaki: "Khaki", orange: "Orange", ungu: "Purple", lembayung: "Lavender",
};

const translateColor = (c) => {
  const low = c.trim().toLowerCase();
  if (COLOR_MAP[low]) return COLOR_MAP[low];
  const first = low.split(" ")[0];
  if (COLOR_MAP[first]) return [COLOR_MAP[first], ...c.trim().split(" ").slice(1)].join(" ");
  return c.trim();
};

const parseSold = (label) => {
  if (!label) return 0;
  const m = String(label).toLowerCase().match(/(\d+(?:[.,]\d+)?)\s*(rb|ribu|k|jt)?/);
  if (!m) return 0;
  let n = parseFloat(m[1].replace(",", "."));
  if (m[2] === "rb" || m[2] === "ribu" || m[2] === "k") n *= 1000;
  if (m[2] === "jt") n *= 1000000;
  return Math.round(n);
};

// Curated per-model overrides: naming (English, "Korean girl" tone) + category bucket
// (real data hanya punya kategori generik "Tas Wanita" dsb, jadi di-mapping manual
// dari nama & atribut Tokopedia untuk 3 produk yang match kedua platform).
const CURATION = [
  { slug: "mismi-aria-bag", name: "Mismi Aria Bag — Stylish Korean School Backpack - 27A", category: "tas-ransel", pack: "29 x 12 x 41 cm", claim: "A roomy, multi-pocket Korean-style backpack for books, laptop, bottle & more — nylon, water-friendly, and ready for school or travel." },
  { slug: "mismi-mira-bag", name: "Mismi Mira Bag — Corduroy Shoulder Tote Bag - 49M", category: "tas-selempang", pack: "43 x 15 x 32 cm", claim: "A corduroy shoulder tote for casual hangouts, outdoor days & OOTD photos — spacious, sturdy, and endlessly stylish." },
  { slug: "mismi-merry-bag", name: "Mismi Merry Bag — Korean-Style School Backpack - 47M", category: "tas-ransel", pack: "28 x 13 x 38 cm", claim: "A Korean-style backpack with plenty of pockets for books, tablet, phone & umbrella — nylon, durable, and back-to-school ready." },
  { slug: "mismi-brielle-bag", name: "Mismi Brielle Bag — Korean-Style Sling & Waist Bag - 36B", category: "tas-selempang" },
  { slug: "mismi-candace-bag", name: "Mismi Candace Bag — Cute Korean School Backpack - 47C", category: "tas-ransel" },
  { slug: "mismi-fran-bag", name: "Mismi Fran Bag — Korean-Style Sling Bag - 32F", category: "tas-selempang" },
  { slug: "mismi-keychain-kc9c", name: "Mismi Cute Character Keychain - KC9C", category: "aksesoris-tas" },
  { slug: "mismi-keychain-kc8b", name: "Mismi Cute Character Keychain - KC8B", category: "aksesoris-tas" },
  { slug: "mismi-neo-bag", name: "Mismi Neo Tote Bag — Cute Korean-Style Tote - 43N", category: "tote-bag" },
  { slug: "mismi-barbara-bag", name: "Mismi Barbara Bag — Corduroy Tote Bag - 25B", category: "tote-bag" },
  { slug: "mismi-keychain-kc2n", name: "Mismi Pumpkin Charm Keychain - KC2N", category: "aksesoris-tas" },
  { slug: "mismi-keychain-kc3k", name: "Mismi Bear Bow-Tie Keychain - KC3K", category: "aksesoris-tas" },
  { slug: "mismi-kelly-bag", name: "Mismi Kelly Bag — Corduroy Bear Tote Bag - 19K", category: "tote-bag", claim: "A corduroy tote with an adorably cute bear design — one of our all-time best sellers." },
  { slug: "mismi-kyle-bag", name: "Mismi Kyle Bag — Corduroy Bear Tote Bag - 17K", category: "tote-bag", claim: "A Korean-style corduroy tote with a cute bear motif — soft, roomy, and a fan favorite." },
  { slug: "mismi-kyra-bag", name: "Mismi Kyra Bag — Korean-Style School Backpack - 31Z", category: "tas-ransel", claim: "A cute Korean-style backpack for school & everyday — one of our most-loved styles." },
  { slug: "mismi-qira-bag", name: "Mismi Qira Bag — Casual Korean Tote Bag - 31Q", category: "tote-bag" },
  { slug: "mismi-ursule-bag", name: "Mismi Ursule Bag — Little Flower Mini Backpack - 20U", category: "tas-ransel", claim: "Our best-loved mini backpack — a sweet little flower print that's perfect for daily wear." },
  { slug: "mismi-vera-bag", name: "Mismi Vera Bag — Korean Star School Backpack - 47V", category: "tas-ransel" },
  { slug: "mismi-vida-bag", name: "Mismi Vida Bag — Strawberry Korean Sling Bag - 42V", category: "tas-selempang", claim: "A sweet strawberry-print sling bag with Korean-style charm — compact and easy to carry." },
  { slug: "mismi-xora-bag", name: "Mismi Xora Bag — Premium Water-Resistant Sling Bag - 38X", category: "tas-selempang", claim: "A premium water-resistant sling bag — sleek, practical, and ready for rainy days." },
  { slug: "mismi-carol-bag", name: "Mismi Carol Bag — Corduroy Shoulder Sling Bag - 20C", category: "tas-selempang", claim: "A corduroy shoulder sling bag loved for its soft texture and easy everyday style — a customer favorite." },
  { slug: "mismi-keychain-kc8a", name: "Mismi Koala Charm Keychain - KC8A", category: "aksesoris-tas" },
  { slug: "mismi-keychain-kc6a", name: "Mismi Cute Character Keychain - KC6A", category: "aksesoris-tas" },
  { slug: "mismi-pamela-bag", name: "Mismi Pamela Bag — Korean School Backpack - 49P", category: "tas-ransel" },
  { slug: "mismi-phoebe-bag", name: "Mismi Phoebe Bag — Smiley Face Sling Bag - 47P", category: "tas-selempang", claim: "A playful smiley-face sling bag with Korean-style charm — small, cute, and full of personality." },
  { slug: "mismi-rean-bag", name: "Mismi Rean Bag — Drawstring Tassel Tote Bag - 49R", category: "tote-bag" },
  { slug: "mismi-tacey-bag", name: "Mismi Tacey Bag — Korean-Style Tote Bag - 33T", category: "tote-bag" },
  { slug: "mismi-warren-bag", name: "Mismi Warren Bag — Zip Korean Tote Bag - 12W", category: "tote-bag" },
  { slug: "mismi-alice-pencil-case", name: "Mismi Alice Pencil Case — Little Flower Print - PC2A", category: "sekolah-kantor", claim: "A sweet little-flower pencil case — one of our most-loved school & stationery picks." },
  { slug: "mismi-caelia-bag", name: "Mismi Caelia Bag — Korean Flower Tote Bag - 38C", category: "tote-bag" },
];

const raw = JSON.parse(fs.readFileSync(IN, "utf-8")).products;
if (raw.length !== CURATION.length) {
  throw new Error(`mismi-products.json punya ${raw.length} produk, CURATION punya ${CURATION.length} — perbarui CURATION.`);
}

const built = raw.map((src, i) => {
  const cur = CURATION[i];
  const laz = src.lazada || {};
  const price = laz.price || 0;
  const originalPrice = laz.price_before_discount && laz.price_before_discount > price ? laz.price_before_discount : null;
  const discountPercent = laz.discount_percent || 0;
  const rating = laz.rating ?? src.tokopedia?.rating ?? null;
  const reviewCount = laz.rating_count ?? src.tokopedia?.rating_count ?? null;
  const soldLabelRaw = laz.sold_label || src.tokopedia?.sold_label || null;
  const sold = parseSold(soldLabelRaw);
  const colors = (src.variants || [])
    .filter((v) => v.name === "Warna")
    .flatMap((v) => v.options)
    .map(translateColor)
    .slice(0, 6);
  return {
    slug: cur.slug,
    name: cur.name,
    category: cur.category,
    categoryLabel: CATEGORY_LABELS[cur.category],
    pack: cur.pack || "",
    sizes: [],
    colors,
    price,
    originalPrice,
    discountPercent,
    bpom: "",
    claim: cur.claim || CATEGORY_CLAIM[cur.category],
    images: src.images?.length ? src.images : ["/placeholder-bag.svg"],
    source: "mismi-official",
    provisional: true,
    rating,
    soldCount: 0,
    soldLabel: sold ? `${sold.toLocaleString("en-US")} sold` : "",
    reviewCount,
    sourceUrl: laz.url || src.tokopedia?.url || "",
    _sold: sold,
  };
});

// Best sellers by real sold count jadi hero (id 1-8, badge "Best Seller") — stable
// tie-break by original order supaya hasil konsisten antar-run.
const sorted = built
  .map((p, i) => ({ p, i }))
  .sort((a, b) => b.p._sold - a.p._sold || a.i - b.i)
  .map(({ p }) => p);

const withIds = sorted.map((p, idx) => {
  const id = idx + 1;
  const { _sold, ...rest } = p;
  return { id, ...rest, heroFlag: id <= 8, newTag: id % 4 === 0 };
});

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(withIds, null, 2) + "\n");

const byCat = {};
for (const p of withIds) byCat[p.categoryLabel] = (byCat[p.categoryLabel] || 0) + 1;
console.log("Katalog Mismi (data nyata) ditulis:", OUT);
console.log(`Total ${withIds.length} produk, hero ${withIds.filter((p) => p.heroFlag).length}.`);
console.log("Kategori:", Object.entries(byCat).map(([k, v]) => `${k}:${v}`).join(", "));
