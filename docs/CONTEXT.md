# MISMI — Demo Tas Wanita (Context)

> Brand: **Mismi** — brand tas wanita asal Indonesia bergaya Korean-style: tas selempang,
> tote bag & ransel (korduroi, motif bunga, checker, water resistant). Gaya manis untuk
> crush, perjalanan & hari-hari cantik — move easy, be Mismi.
> Sifat: demo edukasi + portofolio. **Bukan** afiliasi resmi; harga provisional mengikuti official store.

## Data & sumber
- Katalog `data/products.mismi.json` (30 SKU, 8 hero id 1-8) dikurasi dari `mismi-products.json`
  (root project) — hasil scrape resmi Lazada `mismi-bags` (gambar) + Tokopedia `mismi` (atribut,
  untuk 3 produk yang match di kedua platform; URL gambar Tokopedia diabaikan karena bertanda
  tangan/kedaluwarsa ~3 jam).
- Tiap SKU menyimpan `sourceUrl` ke listing Lazada resmi; `images[]` berisi URL nyata
  `img.lazcdn.com` (bukan lagi placeholder lokal).
- Kurasi: `npm run import:mismi` (`scripts/import-mismi-real.js`) — baca `mismi-products.json`
  → mapping nama/kategori/klaim kuratif (English, "Korean girl" tone) + harga/rating/sold/gambar
  langsung dari sumber → `data/products.mismi.json`. Hero (badge "Best Seller", id 1-8) dipilih
  dari jumlah terjual nyata tertinggi.
- Generator lama berbasis Excel (`npm run curate`, `scripts/curate-mismi.js`) masih ada untuk
  referensi tapi sudah tidak dipakai untuk katalog aktif.
- Audit: `npm run audit` (`scripts/make-mismi-audit.js`) → `mismi/mismi-katalog-audit.xlsx`.
- Validasi: `npm run validate` (`scripts/validate-mismi.js`) — slug/id unik, harga>0,
  gambar valid, kategori ada, hero id 1-8. Audit mentah: `npm run audit:raw`.

## Skema SKU (engine-compatible)
`{ id, slug, name, category, categoryLabel, pack, sizes:[], colors:[], price, originalPrice,
   discountPercent, bpom, claim, images[], source:"mismi-official", provisional, heroFlag,
   newTag, rating, soldCount, soldLabel, reviewCount, sourceUrl }`
- `sizes` kosong → PDP tidak memaksa pilih varian; `colors` diisi dari varian "Warna" nyata
  (di-translate ke Inggris bila cocok, cth: Hitam→Black) untuk swatch di PDP/ProductCard.
- `bpom` kosong (produk fashion) → blok BPOM otomatis tidak tampil di PDP.
- `rating`/`reviewCount`/`soldLabel` dari listing real (Lazada, fallback Tokopedia untuk 3 SKU
  yang match kedua platform); kosong/null → fallback enrichment deterministik di `lib/products.js`.

## Kategori & label
`tas-selempang` Sling Bags · `tote-bag` Tote Bags · `tas-ransel` Backpacks ·
`aksesoris-tas` Bag Charms (gantungan kunci) · `sekolah-kantor` School & Office (kotak pensil)
→ map label di `lib/products.js` (`CATEGORY_LABELS`) dan `components/Header/Header.jsx` (`SHORT_LABEL`).
`HomeSections CATS`/`MEGA_MENU`/`HeroCarousel` sengaja hanya menampilkan 3 kategori tas utama.

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
