# MISMI — Demo Tas Wanita (Context)

> Brand: **Mismi** — brand tas wanita asal Indonesia bergaya Korean-style: tas selempang,
> tote bag & ransel (korduroi, motif bunga, checker, water resistant). Gaya manis untuk
> crush, perjalanan & hari-hari cantik — move easy, be Mismi.
> Sifat: demo edukasi + portofolio. **Bukan** afiliasi resmi; harga provisional mengikuti official store.

## Data & sumber
- Katalog `data/products.mismi.json` (14 SKU, 8 hero id 1-8) dikurasi dari Excel mentah
  `mismi/mismi-data-mentah.xlsx` (sheet Katalog-shopee / Katalog-tokopedia / Katalog-lazada)
  dari official store: **Shopee `mismi.official` (342985281)**, **Tokopedia `mismiofficial`/`mismi`**,
  **Lazada `mismi-bags`**, plus sosial TikTok `@mismi.id` & Instagram `@mismi.official`
  (diambil 2026-09-09; anti-bot — data diambil dari snippet yang bisa diakses).
- Tiap SKU menyimpan `sourceUrl` ke listing resmi; kolom `URL gambar` di Excel masih kosong
  → gambar saat ini placeholder lokal (`/placeholder-bag.svg`) sampai user melengkapi.
- Kurasi: `npm run curate` (`scripts/curate-mismi.js`, exceljs) — baca Excel → dedupe →
  `data/products.mismi.json` + laporan produk yang masih perlu harga/gambar.
- Audit: `npm run audit` (`scripts/make-mismi-audit.js`) → `mismi/mismi-katalog-audit.xlsx`.
- Validasi: `npm run validate` (`scripts/validate-mismi.js`) — slug/id unik, harga>0,
  gambar valid, kategori ada, hero id 1-8. Audit mentah: `npm run audit:raw`.

## Skema SKU (engine-compatible)
`{ id, slug, name, category, categoryLabel, pack, sizes:[], colors:[], price, originalPrice,
   discountPercent, bpom, claim, images[], source:"mismi-official", provisional, heroFlag,
   newTag, rating, soldCount, soldLabel, sourceUrl }`
- `sizes`/`colors` kosong → PDP tidak memaksa pilih varian; nama model (cth: mismi-hazel-bag) = SKU.
- `bpom` kosong (produk fashion) → blok BPOM otomatis tidak tampil di PDP.
- `rating`/`soldCount`/`soldLabel` dari listing real; `0`/kosong → fallback enrichment deterministik di `lib/products.js`.

## Kategori & label
`tas-selempang` Tas Selempang · `tote-bag` Tote Bag · `tas-ransel` Tas Ransel
→ map label di `lib/products.js` (`CATEGORY_LABELS`, `MEGA_MENU`, `Header SHORT_LABEL`, `HomeSections CATS`).

## Design tokens (app/globals.css)
Palet "Pinky Girl": bg `#fff5f9`, ink `#3a1230`, primary berry raspberry `#b4135e`,
aksen hot pink `#d61380` (accent-ink putih `#ffffff` untuk teks di atasnya), accent-dark
`#a6125c` untuk teks link, glow pink `#ffe6f0 → #fff0f6 → #fff7fb`. Font Outfit + Cabinet Grotesk.

## Stack & komponen utama
- Next.js 14 (static export) + Tailwind v3 (utility layer, preflight OFF, token = palet di atas)
  + `motion` (animasi) + `embla-carousel` (rel Best Seller) + `animejs` + `clsx`/`tailwind-merge`.
- Komponen motion terpisah per file: `CursorFollow`, `CarouselCursor`, `TiltCard`/`useTilt`,
  `CountdownBar`, `Toast`, `ScrollTop`, `HeroCarousel`, `CouponStrip`, `RitualSticky`,
  `Spotlight`, `AnimatedText`, port `EmblaCarousel` (ui-layouts, MIT).
- Header ala Sociolla: strip promo + countdown global + search lebar + pill kategori.

## Git/GitHub
Project per 2026-09-09 **tanpa git** (riwayat & remote dihapus). `.gitignore` mengabaikan
`node_modules/ out/ .next/ *.xlsx .env* dist/`.
