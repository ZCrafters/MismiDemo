# Migrasi Brighty → Suur Lemoen Implementation Plan

> **For agentic workers:** Executed inline di sesi utama dengan executing-plans. Tanpa git repo (dihapus oleh user) → verifikasi via `validate`/`lint`/`build`/smoke test, tanpa step commit.

**Goal:** Project Next.js 14 yang sama (komponen, routing, engine) menjadi demo "Suur Lemoen" utuh — data real dari Tokopedia, palet lemon+hijau, tanpa jejak Brighty maupun git/GitHub.

**Architecture:** Rebrand total tanpa ubah struktur. Data `data/products.suurlemoen.json` → enrichment `lib/products.js` → semua halaman. Palet diganti lewat token `globals.css :root` + mirror `tailwind.config.js`. Teks brand diubah di app/components/lib/docs. Script import/validate/audit di-rename untuk Suur Lemoen.

**Tech Stack:** Next.js 14 (static export) · Tailwind v3 utility-layer (preflight OFF) · motion · embla-carousel · animejs · exceljs.

## Global Constraints
- Palet "Lemon Segar + Hijau Daun": bg `#fdf9e9`, surface `#fff`, ink `#26331a`, muted `#5c6f45`, line `#e5e7c6`, primary `#47730d`, accent `#f2c11b` (accent-ink `#26331a`), accent-dark `#92610a`, badge/danger `#c2410c`, star `#b45309`, success `#166534`, glow `#f8efcd→#fcf6e2→#fefaf0`.
- Semua pasangan teks penting lolos WCAG AA (≥4.5:1).
- Kategori (8): `sari-lemon`, `cuka-apel`, `cuka-buah`, `madu`, `minyak-zaitun`, `superfood`, `teh-herbal`, `bundle`.
- Data real Tokopedia (nama/harga/originalPrice/discountPercent/rating/soldLabel/claim/URL gambar/sourceUrl). 8 hero id 1–8.
- Tidak ada git; tidak ada folder `.git`. Artefak lama (skintific-store-demo.jsx, docs/skintific-recipe/, docs/sociolla-crawl/, brighty/) dihapus.
- Order ID checkout prefix `SLM-`.
- Favicon dibiarkan dulu (user kirim aset sendiri nanti).

## Task Map

### Task 1 — Data foundation
- Create `suurlemoen/suurlemoen.official/_raw.json` (~28 SKU hasil riset Tokopedia).
- Create `scripts/import-suurlemoen.js` (CAT_MAP lemon, HERO 8, NEW), `scripts/validate-suurlemoen.js`.
- Run import → `data/products.suurlemoen.json`; run validate → `OK ~28 produk (8 hero), 8 kategori`.
- Delete `brighty/`, `data/products.brighty.json`, `scripts/import-brighty.js`, `scripts/import-brighty-real.js`, `scripts/validate-brighty.js`, `scripts/make-brighty-audit.js`, `scripts/make-marketplace-audit.js`, `scripts/parse-tokopedia.js`, `brighty/*.xlsx`, `brighty/marketplace-tokopedia.json`.
- Update `package.json` scripts (`data`, `validate`, `audit`).

### Task 2 — lib
- `lib/products.js`: import path `../data/products.suurlemoen.json`, CATEGORY_LABELS 8 kategori, MEGA_MENU (Rutinitas Detox / Dapur Sehat / Paket Hemat), hapus comment brighty.
- `lib/coupons.js`: COUPONS baru `LEMON15`(15%), `ONGKIRSEGER`(gratis ongkir), `SEHAT10`(bundle 10%), `HALOLEMON`(20K).
- Verify: `npm run validate` OK.

### Task 3 — Token retheme
- `app/globals.css :root`: semua nilai palet baru + header comment.
- `tailwind.config.js`: mirror tokens + shadow-card/shadow-glow tinted olive/amber.
- Hardcode: `.ritual-panel` `#0a2f52`→`#1d2f0a`; `.bg-grid-fade` `rgba(24,100,184,0.12)`→`rgba(71,115,13,0.12)`; `.glow-shot` shadow; `.scroll-top` shadow; `.card:hover` shadow; comment "Brighty".
- `components/ui/Spotlight.jsx`: `rgba(230,0,126,*)`→`rgba(242,193,27,*)` (3 gradien).
- `components/pdp/ReviewSection.jsx`: avatar colors → lemon/olive/amber.
- Verify: build + tabel kontras.

### Task 4 — Brand shell
- Header.jsx: top-strip, wordmark `suur lemoen<span>.</span>`, aria-label, SHORT_LABEL 8 kategori, placeholder "Cari: sari lemon, cuka apel, madu…".
- MobileNav.jsx: wordmark, "Tentang Suur Lemoen", placeholder, link store suurlemoenid/suurlemoen.id.
- ExpandableSearch.jsx: KEY `suurlemoen-search-v1`, HINTS lemon.
- Footer.jsx: wordmark+tagline, kolom "Tentang Suur Lemoen", official store 4 + sosmed (IG suurlemoen.official, TikTok suurlemoenofficial), AnimatedText "suur lemoen", © 2026, hashtag.
- Rename keys: CartProvider `suurlemoen-cart-v1`, Wishlist `suurlemoen-wishlist-v1`, VoucherPopup `suurlemoen-voucher-popup-v1`.

### Task 5 — Konten home
- HeroCarousel 3 slide (Segar & Sehat / Detox Alami / Paket Hemat) + cats baru.
- RitualSticky STEPS: Mulai Pagi(sari-lemon) / Detox Rutin(cuka-apel) / Dapur Sehat(minyak-zaitun) + copy.
- PromoCards PROMOS, PromoPeriod note, HomeSections CATS 5, CartDrawer empty text, page.jsx meta copy.

### Task 6 — PDP + halaman statis
- Metadata semua route → "— Suur Lemoen"; JSON-LD brand "Suur Lemoen".
- BuyBox: "Info Pengiriman" store Suur Lemoen; "Cara Pakai" ditulis ulang untuk konsumsi.
- ReviewSection 3 review minuman lemon.
- Share text "— Suur Lemoen".
- about/page.jsx rewrite (2020, PT Wanda Berkah Abadi, petani lemon lokal, Halal+BPOM, clean eating, kontak IG).
- faq/page.jsx rewrite (kemasan 250ml–1L/700gr, 4 store, dll).
- CheckoutFlow: orderId `SLM-`, COUPONS `LEMOEN10`/`HEMAT20K`, placeholder.

### Task 7 — Docs & Excel & cleanup
- docs/CONTEXT.md, docs/WORKFLOW.md rewrite (tanpa Git), CHANGELOG entry baru.
- `scripts/make-suurlemoen-audit.js` → `suurlemoen/suurlemoen-katalog-audit.xlsx` (Katalog + Ringkasan, kolom URL gambar).
- Delete skintific-store-demo.jsx, docs/skintific-recipe/, docs/sociolla-crawl/.

### Task 8 — Verifikasi akhir
- `npm run validate`, `npm run lint`, `npm run build` (exit 0).
- Smoke test route dari `out/` (http-server + curl): /, /catalog, /kategori/*, /produk/*, /faq, /about, /wishlist, /checkout, /sitemap.xml, 404.
- Grep: tidak ada "brighty|Brighty" di app/components/lib/scripts/docs (kecuali riwayat CHANGELOG).
- Cek kontras WCAG AA (tabel).
