# MISMI Demo — Workflow & Cara Jalankan

## Pipeline data (urutan)
1. Excel mentah per marketplace `mismi/mismi-data-mentah.xlsx` (sheet Katalog-shopee/tokopedia/lazada).
2. `npm run curate` → `scripts/curate-mismi.js` (baca Excel, dedupe, atur id+heroFlag) → `data/products.mismi.json`.
   Laporan berisi SKU yang masih belum ada harga/gambar (perlu dilengkapi user lalu jalankan ulang).
3. `npm run validate` → `scripts/validate-mismi.js` (cek slug/id/harga/gambar/kategori/hero).
4. `npm run audit` → `scripts/make-mismi-audit.js` → `mismi/mismi-katalog-audit.xlsx`.

## Jalankan demo
- Dev: `npm run dev`  → http://localhost:3000
- Build static: `npm run build` → folder `out/`
- Preview hasil static: `npm run preview` (http-server di `out/`)
- Lint: `npm run lint`

## Struktur
- `lib/products.js` — helper + enrichment deterministik (rating/review/sold/stok fallback dari id,
  `discountPct`, rupiah). `lib/cn.js` — helper class Tailwind. `lib/coupons.js` — kupon demo.
- `app/` — home, catalog (client-side filter/sort), kategori/[slug], produk/[slug], faq, about, wishlist, checkout.
- `components/` — Header Sociolla-style (strip promo, countdown, search, pill kategori),
  home (HeroCarousel, CouponStrip, PromoCards, BestSellerEmbla, RitualSticky, PromoPeriod),
  PDP (Gallery lightbox+tilt, BuyBox, Review, Share, Related), cart drawer, wishlist,
  plp filter/sort, motion (`CursorFollow`, `CarouselCursor`, `TiltCard`, `Spotlight`,
  `AnimatedText`, `Toast`, `ScrollTop`, `CountdownBar`), `ui/EmblaCarousel` (port ui-layouts).
- `data/products.mismi.json` — katalog 14 SKU (8 hero, 3 kategori).
- `scripts/` — validate-mismi, curate-mismi, make-mismi-audit, make-mismi-raw-audit.
- `mismi/` — Excel audit & data mentah (di-ignore git via `*.xlsx`).
- `tailwind.config.js` — token Tailwind = cermin token CSS (preflight OFF agar CSS lama menang).

## Verifikasi akhir
- `npm run validate` → `OK 14 produk (8 hero), 3 kategori.`
- `npm run lint` → 0 error
- `npm run build` → exit 0 (static export)
- Smoke test seluruh route dari `out/` = 200
- Cek kontras pasangan teks penting lolos WCAG AA (4.5) tiap ganti palet
- Pastikan tidak ada sisa teks "Suur Lemoen"/"lemon" di `app/`/`components/`/`lib/` (kecuali riwayat CHANGELOG)

## Catatan legal
Demo edukasi, tidak berafiliasi dengan Mismi. Gunakan untuk belajar/portofolio;
harga & foto produk adalah milik official store masing-masing.
