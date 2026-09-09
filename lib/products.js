// Data + helper terpusat. Enrichment deterministik (stabil antar-build).
import raw from "../data/products.mismi.json";

export const rupiah = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v || 0);

const hash = (n, m) => Math.abs((n * 137 + 11) % m);

export const CATEGORY_LABELS = {
  "tas-ransel": "Backpacks",
  "tote-bag": "Tote Bags",
  "tas-selempang": "Sling Bags",
};
export const categoryLabel = (slug) => CATEGORY_LABELS[slug] || slug;

export const products = raw.map((p) => {
  // Real rating/sold is used when present in the data (real catalog); otherwise,
  // falls back to deterministic demo values (stable across builds).
  const rating = p.rating ?? (46 + hash(p.id, 5)) / 10;
  const sold = p.soldCount ?? 120 + hash(p.id * 3, 8800);
  const soldLabel = p.soldLabel || sold.toLocaleString("id-ID");
  const isNew = Boolean(p.newTag);
  // Deterministic Sociolla-style demo stock status (stable across builds):
  // ~10% sold out, ~20% low stock (urgency), the rest available.
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
    // Promo price from real official-store data; generic period note (T&Cs apply).
    originalPrice: p.originalPrice || null,
    promoNote: p.originalPrice ? "Official store promo" : null,
    promoUntil: p.originalPrice ? "T&Cs apply" : null,
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

// Mega menu: routines & Mismi bag categories.
export const MEGA_MENU = [
  { title: "Sling Bags", desc: "Your favorite slings, cute every day", links: [{ label: "Sling Bags", cat: "tas-selempang" }, { label: "Water-Resistant Slings", cat: "tas-selempang" }, { label: "Korean-Style Slings", cat: "tas-selempang" }] },
  { title: "Backpacks", desc: "For school, work & weekend trips", links: [{ label: "Backpacks", cat: "tas-ransel" }] },
  { title: "Tote Bags", desc: "Simple, stylish & roomy totes", links: [{ label: "Tote Bags", cat: "tote-bag" }] },
];
