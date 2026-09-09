# Next To-Do — Mismi Demo: Indonesian → English (Full Site)

> **Status**: WAITING — run this AFTER the current migration agent finishes and commits its work
> (toolchain restore, Mismi data importer, Pinky Girl retheme, brand & category migration).
> **Goal**: convert ALL site copy from Indonesian to English with good copywriting,
> in a "Korean girl" voice. Full English — the Indonesian version is replaced, not toggled.

---

## Golden rules

1. **Keep "Mismi" as-is** — brand name never translated. Also keep product variant codes
   (e.g. `- 31H`, `- 50F`) and all data (prices, URLs, images, ratings).
2. **Translate everything else**: nav, home sections, catalog/PLP, PDP, about, faq, checkout,
   wishlist, footer, coupons (titles/descriptions — **keep coupon codes**), search placeholders,
   metadata, JSON-LD, share text, hashtag, product names & claims.
3. **Tone = Korean-girl English** (see style guide below): cute, feminine, playful, effortless.
   Think "your cute bag bestie" — never corporate, never stiff.
4. **Decorative marks in moderation**: 🍒 ♡ ✿ — one per line max, not a wall of emoji.
5. Do not touch localStorage keys, `next.config.mjs`, or anything the migration agent owns.

---

## Copy style guide — "Korean girl" English

Researched from real K-fashion/K-beauty brands (Chuu, rom&nd, Etude, MARHEN.J):

| Pattern | Real-brand example | How to apply to Mismi |
|---|---|---|
| **Bestie / direct address** | rom&nd: "your Korean makeup bestie" · Etude: "Darling, you look lovely today" | Talk to the reader as a friend: "your new favorite daily bag", "we picked this just for you ♡" |
| **Daily-life anchoring** | MARHEN.J: "A modern fit for any daily look", "practical everyday design" | Anchor to everyday moments: commute, school, weekend, crushes & cute days |
| **Cute-empowering, short lines** | Chuu: "Be your own CHUU", "Never Stop Playing Dress Up" | Formula: `Be + [cute adjective]` / "for every mood, look, and version of you" |
| **Punchy, lowercase-friendly** | Chuu: "Effortless style, redefined" | Short sentences. Exclamations OK. Avoid long corporate paragraphs |
| **Brand echo** | "Be your own CHUU" ↔ Mismi: "Move easy. Be Mismi." | Reuse the existing tagline as the anchor — keep it EXACTLY |

### Vocabulary (Indonesian → Korean-girl English)

| Indonesian | English (Korean-girl) |
|---|---|
| Tas cantik / tas lucu | cute bags |
| Gemes banget | adorable |
| Muat banyak | fits everything |
| Teman harian / teman keseharian | your daily companion |
| Pilih warna favoritmu | pick your favorite shade |
| Tampil stylish & effortless | look stylish, effortlessly |
| Manis dan ringan | sweet and featherlight |
| Korduroi | corduroy |
| Tahan air | water-repellent |
| Paket hemat | bundle & save |
| Stok terbatas | limited stock |
| Terlaris | best seller |
| Baru | new |
| Keranjang | cart |
| Checkout | checkout |
| Gratis ongkir | free shipping |
| Katalog | catalog |
| Kategori | categories |
| Tentang kami | about us |
| FAQ | FAQ |
| Wishlist | wishlist |

### Dos & don'ts

- ✅ Short, warm, exclamatory: "Adorable, and it fits everything! 🍒"
- ✅ Direct address: "Your daily companion for commutes & cute days."
- ✅ Playful alliteration/rhythm: "Sweet, light, and ready for your daily look."
- ❌ Literal/wordy translations ("bag that is cute" → "cute bag").
- ❌ Corporate tone ("we are pleased to offer…").
- ❌ Indonesian remnants in UI copy (see verification grep list).

---

## Tasks

### 1. Metadata & SEO
- [ ] `app/layout.jsx` — title, description → English
- [ ] All `page.jsx` metadata (`title`, `description`) → English
- [ ] `app/produk/[slug]/page.jsx` — `generateMetadata` + JSON-LD `name`/`description` (keep brand "Mismi")
- [ ] `app/sitemap.js` — no copy, verify only

### 2. Header & nav
- [ ] `components/Header/Header.jsx` — nav labels, mega menu titles/descs, top strip, countdown CTA
- [ ] `components/Header/MobileNav.jsx` — tabs, panel labels, links
- [ ] `components/Header/ExpandableSearch.jsx` — placeholder + hint chips + storage-free copy
- [ ] `components/Header/CartBadge.jsx` — aria/title if any

### 3. Home
- [ ] `components/home/HeroCarousel.jsx` — 3 slides: kicker/title/text/CTA
- [ ] `components/home/CouponStrip.jsx` — heading + CTA
- [ ] `components/home/PromoCards.jsx` — promo titles/descs
- [ ] `components/home/HomeSections.jsx` — category grid `CATS` labels, section headings, "New Arrivals"
- [ ] `components/home/BestSellerEmbla.jsx` — heading + aria labels
- [ ] `components/home/RitualSticky.jsx` — `STEPS` (3 steps) → rewrite in English (keep structure)
- [ ] `components/home/PromoPeriod.jsx` — promo period note
- [ ] `components/home/VoucherPopup.jsx` — popup copy
- [ ] `components/home/MobileShortcuts.jsx` — labels
- [ ] `app/page.jsx` — meta line under sections

### 4. Catalog / PLP
- [ ] `app/catalog/CatalogClient.jsx` — search placeholder, filter labels, sort menu, count, empty state
- [ ] `components/plp/Filters.jsx` + `FilterBottomSheet.jsx` — legend/filter labels, apply button
- [ ] `components/ui/ProductCard.jsx` + `ProductRow.jsx` — badge labels (Best Seller/New/Promo), "was" price label
- [ ] `components/ui/Chrome.jsx` — Breadcrumb "Home" label if hardcoded

### 5. PDP
- [ ] `components/pdp/Gallery.jsx` — alt text, lightbox counter, zoom hint
- [ ] `components/pdp/BuyBox.jsx` — accordion "How to Care" (rewrite: clean with soft cloth, avoid soaking, air-dry in shade), promo note, size/color labels, stock labels ("limited stock")
- [ ] `components/pdp/ReviewSection.jsx` — rewrite `DUMMY_REVIEWS` in English (names, review text, verified badge)
- [ ] `components/pdp/Share.jsx` — share text
- [ ] `components/pdp/RelatedCarousel.jsx` — heading

### 6. Static pages
- [ ] `app/about/page.jsx` — brand story in English (local Indonesian bag brand, Korean-style, Jakarta)
- [ ] `app/faq/page.jsx` — FAQ in English (materials, care, shipping, sizing)

### 7. Checkout & wishlist
- [ ] `components/checkout/CheckoutFlow.jsx` — steps (Cart → Shipping → Payment → Done), field labels, payment method, coupon apply, order summary, success screen; **keep order ID prefix `MSM-`**
- [ ] `app/wishlist/WishlistClient.jsx` — empty state, labels

### 8. Footer
- [ ] `components/Footer/Footer.jsx` — tagline, column titles/links, newsletter form, disclaimer ("Demo — prices follow the official store"), payment chips, `.foot-giant` text, hashtag

### 9. Coupons
- [ ] `lib/coupons.js` — translate `title`/`desc` for display coupons, **keep codes**
- [ ] `components/checkout/CheckoutFlow.jsx` — valid coupons: translate labels, keep codes (`MISMI15`, `CHERRY10`, …)

### 10. Product data copy
- [ ] `data/products.mismi.json` — translate `name` and `claim` to English (keep variant codes like `- 31H`, prices, images, sourceUrl, category slugs). Example:
  - ID: `Mismi Fera Bag Tas Selempang Wanita Korea Tali Serut Dumpling Sling Bag Perempuan Stylish - 50F`
  - EN: `Mismi Fera Bag – Korean Dumpling Drawstring Sling Bag – Stylish - 50F`

### 11. Share & hashtag
- [ ] `components/pdp/Share.jsx` + footer — hashtag → `#MoveEasyBeMismi`

---

## Example translations (style reference)

| Where | Indonesian (current) | English (Korean-girl) |
|---|---|---|
| Hero slide 1 kicker | "Segar & sehat tiap hari" (legacy) | "Your daily pick-me-up" |
| Hero slide title | "Tas cantik untuk keseharianmu" | "Cute bags for your everyday mood ♡" |
| Hero CTA | "Lihat Katalog" | "Shop the catalog" |
| Category label | "Tas Selempang" | "Sling bags" |
| Section head | "Best Seller" | "Best sellers" |
| Section head | "Baru" | "New in" |
| Promo card | "Paket Hemat" | "Bundle & save" |
| BuyBox care | "Cara Merawat: bersihkan dengan kain lembut…" | "How to care: wipe gently with a soft cloth, avoid soaking, air-dry in the shade." |
| Promo note | "Promo official store" | "Official store promo" |
| Disclaimer | "Demo — harga mengikuti official store" | "Demo — prices follow the official store." |
| Coupon desc | "Min. belanja Rp150rb di official store" | "Min. spend Rp150K at the official store" |
| Empty cart | "Keranjangmu masih kosong" | "Your cart is feeling empty ♡" |
| Checkout step | "Pembayaran" | "Payment" |
| Footer tagline | "Segar & sehat…" (legacy) | "Move easy. Be Mismi. For crushes, commutes & cute days 🍒" |

---

## Verification

1. **Grep Indonesian remnants** — must be 0 in `app/ components/ lib/` (except CHANGELOG history):
   `Tas|Wanita|Katalog|Keranjang|Checkout|Cara|Hemat|Selempang|Ransel|Tentang|Pembayaran|Gratis|Stok|Best Seller` (adjust list as you go).
   Note: `Rp` stays (currency). `Suur Lemoen` must already be gone (migration agent's job).
2. **Build**: `npm run build` → exit 0, static export OK.
3. **Smoke test** routes from `out/`: `/`, `/catalog`, `/kategori/*`, `/produk/*`, `/about`, `/faq`, `/wishlist`, `/checkout`, `/sitemap.xml`.
4. **Tone check**: read hero + PDP aloud — does it sound like a cute Korean brand speaking English, not a translator?
5. **Keep data intact**: `data/products.mismi.json` — only `name`/`claim` changed; ids, slugs, prices, images, sourceUrl untouched.

---

## Handoff notes

- Coordinate: run this only after the migration agent's commit. If files conflict, take the migration agent's latest version first.
- Style guide source of truth: `docs/templates/COPY-STYLE.md` (framework) + this file (Mismi-specific).
- Palette/tokens: `docs/research/mismi-palette-tone.md` — do not change colors here.