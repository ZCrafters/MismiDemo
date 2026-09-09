# SUUR LEMOEN Demo — Workflow & Cara Jalankan

## Pipeline data (urutan)
1. Data katalog dikurasi manual dari PDP Tokopedia `suurlemoenid` → `data/products.suurlemoen.json`.
2. `npm run validate` → `scripts/validate-suurlemoen.js` (cek slug/id/harga/gambar/kategori/hero).
3. `npm run audit` → `scripts/make-suurlemoen-audit.js` → `suurlemoen/suurlemoen-katalog-audit.xlsx`
   (sheet Katalog + Ringkasan, termasuk kolom URL gambar sebagai arsip).

## Jalankan demo
- Dev: `npm run dev`  → http://localhost:3000
- Build static: `npm run build` → folder `out/`
- Preview hasil static: `npm run preview` (http-server di `out/`)
- Lint: `npm run lint`

## Struktur
- `lib/products.js` — helper + enrichment deterministik (rating/review/sold/stok fallback dari id,
  `discountPct`, rupiah). `lib/cn.js` — helper class Tailwind.
- `app/` — home, catalog (client-side filter/sort), kategori/[slug], produk/[slug], faq, about, wishlist, checkout.
- `components/` — Header Sociolla-style (strip promo, countdown, search, pill kategori),
  home (HeroCarousel, CouponStrip, PromoCards, BestSellerEmbla, RitualSticky, PromoPeriod),
  PDP (Gallery lightbox+tilt, BuyBox, Review, Share, Related), cart drawer, wishlist,
  plp filter/sort, motion (`CursorFollow`, `CarouselCursor`, `TiltCard`, `Spotlight`,
  `AnimatedText`, `Toast`, `ScrollTop`, `CountdownBar`), `ui/EmblaCarousel` (port ui-layouts).
- `data/products.suurlemoen.json` — katalog 26 SKU.
- `suurlemoen/` — Excel audit katalog.
- `tailwind.config.js` — token Tailwind = cermin token CSS (preflight OFF agar CSS lama menang).

## Verifikasi akhir
- `npm run validate` → `OK 26 produk (8 hero), 8 kategori.`
- `npm run lint` → 0 error
- `npm run build` → exit 0 (static export)
- Smoke test seluruh route dari `out/` = 200
- Cek kontras pasangan teks penting lolos WCAG AA (4.5) tiap ganti palet
- Pastikan tidak ada sisa teks "brighty" di `app/`/`components/`/`lib/`/`scripts/` (kecuali riwayat CHANGELOG)

## Catatan legal
Demo edukasi, tidak berafiliasi dengan Suur Lemoen. Gunakan untuk belajar/portofolio;
harga & foto produk adalah milik official store masing-masing.
