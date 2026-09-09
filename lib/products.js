// Data + helper terpusat. Enrichment deterministik (stabil antar-build).
import raw from "../data/products.suurlemoen.json";

export const rupiah = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v || 0);

const hash = (n, m) => Math.abs((n * 137 + 11) % m);

export const CATEGORY_LABELS = {
  "sari-lemon": "Sari Lemon & Nipis",
  "cuka-apel": "Cuka Apel",
  "cuka-buah": "Cuka Buah",
  "madu": "Madu Murni",
  "minyak-zaitun": "Minyak Zaitun",
  "superfood": "Superfood & Camilan",
  "teh-herbal": "Teh & Latte Herbal",
  "bundle": "Paket Hemat",
};
export const categoryLabel = (slug) => CATEGORY_LABELS[slug] || slug;

export const products = raw.map((p) => {
  // Rating/sold asli dipakai kalau ada di data (katalog real); kalau tidak,
  // fallback ke nilai demo deterministik (stabil antar-build).
  const rating = p.rating ?? (46 + hash(p.id, 5)) / 10;
  const sold = p.soldCount ?? 120 + hash(p.id * 3, 8800);
  const soldLabel = p.soldLabel || sold.toLocaleString("id-ID");
  const isNew = Boolean(p.newTag);
  // Status stok demo deterministik ala Sociolla (stabil antar-build):
  // ~10% habis, ~20% tersisa sedikit (urgency), sisanya tersedia.
  const stockR = hash(p.id * 13, 10);
  const stock =
    stockR === 0
      ? { type: "out" }
      : stockR < 3
        ? { type: "low", qty: 4 + hash(p.id * 17, 42) }
        : { type: "available" };
  const discountPct = p.discountPercent || (p.originalPrice && p.originalPrice > p.price
    ? Math.round((1 - p.price / p.originalPrice) * 100)
    : 0);
  return {
    ...p,
    gender: p.categoryLabel || categoryLabel(p.category),
    sizeRange: p.pack || "",
    rating,
    reviews: 38 + hash(p.id * 7, 860),
    sold,
    soldLabel,
    isNew,
    stock,
    discountPct,
    badge: p.heroFlag ? "Best Seller" : isNew ? "New" : p.originalPrice ? "Promo" : null,
    // Harga promo dari data real official store; catatan periode generik (s&k berlaku).
    originalPrice: p.originalPrice || null,
    promoNote: p.originalPrice ? "Promo official store" : null,
    promoUntil: p.originalPrice ? "s&k berlaku" : null,
  };
});

export const promoProducts = products.filter((p) => p.originalPrice);

export const getProduct = (slug) => products.find((p) => p.slug === slug);

export const getRelated = (p, n = 8) =>
  products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, n);

export const bestSellers = [...products].sort((a, b) => b.sold - a.sold).slice(0, 10);
export const newArrivals = products.filter((p) => p.isNew).slice(0, 8);

export const allCategories = [...new Set(products.map((p) => p.category))].sort();
export const allColors = [];
export const allSizes = [];

export const maxPrice = Math.max(...products.map((p) => p.price));
export const minPrice = Math.min(...products.map((p) => p.price));

// Mega menu: rutinitas & kategori minuman sehat Suur Lemoen.
export const MEGA_MENU = [
  { title: "Rutinitas Detox", desc: "Segar & sehat dari dalam", links: [{ label: "Sari Lemon & Nipis", cat: "sari-lemon" }, { label: "Cuka Apel", cat: "cuka-apel" }, { label: "Cuka Buah", cat: "cuka-buah" }] },
  { title: "Dapur Sehat", desc: "Madu, minyak & superfood pilihan", links: [{ label: "Madu Murni", cat: "madu" }, { label: "Minyak Zaitun", cat: "minyak-zaitun" }, { label: "Superfood & Camilan", cat: "superfood" }, { label: "Teh & Latte Herbal", cat: "teh-herbal" }] },
  { title: "Paket Hemat", desc: "Rutinitas lengkap sekali belanja", links: [{ label: "Bundle & Paket", cat: "bundle" }] },
];
