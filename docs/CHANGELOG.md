# CHANGELOG — Suur Lemoen Demo

## 2026-09-09 — Migrasi Brighty → Suur Lemoen
- **Brand**: seluruh teks "Brighty" diganti "Suur Lemoen" (metadata, header, footer, home, PDP,
  about, faq, checkout, kupon, placeholder search, JSON-LD, hashtag `#SehatDenganLemon`).
- **Palet baru "Lemon Segar + Hijau Daun"**: bg `#fdf9e9`, ink `#26331a`, primary hijau `#47730d`,
  aksen emas lemon `#f2c11b` (accent-ink gelap), accent-dark amber `#92610a` untuk teks link,
  glow `#f8efcd → #fcf6e2 → #fefaf0`. Hardcode (ritual-panel, grid-fade, shadow, Spotlight)
  diselaraskan; semua pasangan teks lolos WCAG AA.
- **Produk**: katalog baru `data/products.suurlemoen.json` (26 SKU, 8 hero) dikurasi dari Tokopedia
  `suurlemoenid` — sari lemon, cuka apel/nanas/naga/kurma, madu, minyak zaitun, superfood, teh
  herbal, paket hemat. URL gambar asli tercatat di `suurlemoen/suurlemoen-katalog-audit.xlsx`.
- **Kategori**: 8 kategori lemon wellness menggantikan body care Brighty.
- **Kupon**: `LEMON15`, `ONGKIRSEGER`, `SEHAT10`, `HALOLEMON` (display) + `LEMOEN10`/`HEMAT20K`
  (berlaku di checkout). Order ID prefix `SLM-`.
- **Git/GitHub dihapus** (sesuai keputusan user): referensi repo `ZCrafters/brightydemo` hilang.
- **Cleanup**: hapus `brighty/`, `data/products.brighty.json`, `brighty-products.json`,
  `skintific-store-demo.jsx`, `docs/skintific-recipe/`, `docs/sociolla-crawl/`, dan script
  import/audit lama.

## Riwayat (arsip Brighty)
## 2026-09-07 — Data marketplace + Pinky Girl + Git
- **Data marketplace** (`npm run audit:marketplace`): 64 listing Tokopedia
  `brightyindonesia` (hal. 1–7) → `brighty/marketplace-tokopedia.json` →
  `brighty/brighty-marketplace-data.xlsx` (Tokopedia + Pemetaan 25 SKU + Ringkasan).
  Shopee/Lazada/Blibli terblokir anti-bot (hanya info toko tercatat).
- **Komponen MCP ui-layouts** (MIT, diport ke JSX + tema): `EmblaCarousel`
  (rel Best Seller: autoplay, counter, dots), `Spotlight` (kategori & promo),
  `AnimatedText` (wordmark footer), footer panel + `RitualSticky` (sticky-scroll),
  motion di kartu produk & wishlist heart. Dep baru: `motion`, `embla-*`.
- **Header ala Sociolla**: tanpa ikon account (diganti wishlist + badge),
  strip promo + countdown global + search lebar + pill kategori.
- **Home**: `CouponStrip` (voucher swipe + salin kode), grid promo 5 kolom,
  baris kupon/promo di-center (`safe center`), section Ritual dipangkas.
- **Tema Pinky Girl**: krem pink `#fff5f9`, berry `#7c1d4e`, hot pink `#e6007e`,
  glow full-pink; panel gelap rasa berry; semua pasangan teks lolos WCAG AA.
- **Git**: init + push pertama ke `https://github.com/ZCrafters/brightydemo.git`
  (`main`, commit `b6de457`). `node_modules/`, `out/`, `.next/`, `*.xlsx` di-ignore.

## 2026-09-07 (sore) — Retheme Blueberry
- Arah baru dari feed IG: **biru dominan + aksen pink** (menggantikan Pinky Girl).
- Token: sky `#eef6fd`, navy `#0b5cab`, hot pink `#e6007e` (tetap),
  glow biru `#cfe7fa → #e2f1fc → #f2f9fe`; panel gelap jadi navy `#0a2f52`.
- Shadow/grid/ritual hardcoded diselaraskan ke navy; spotlight tetap pink.
- Semua pasangan teks lolos WCAG AA (dihitung: ink 12.75, muted 4.89,
  primary 6.70, aksen 4.50).

## 2026-09-07 (malam) — Retheme Sky brighter + pink pastel
- Iterasi dari Blueberry: background lebih putih kebiruan, primary biru
  lebih teal-leaning (`#1864b8`), aksen pink lebih kalem (`#ff4d8d`),
  badge/cta bahaya pakai rose `#e91e63` (text putih di atas, AA-large 4.35).
- Glow sky family: `#d6ecff → #e6f3fe → #f2faff`. Bayangan card/hero/grid
  + panel ritual navy disesuaikan ke `#1864b8`/`#0a2f52` (AA).
