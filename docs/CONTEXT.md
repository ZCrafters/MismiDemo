# SUUR LEMOEN — Demo Minuman Sehat (Context)

> Brand: **Suur Lemoen** — minuman kesehatan & pangan alami berbasis lemon (clean eating):
> sari lemon & nipis, cuka apel/nanas/naga/kurma, madu, minyak zaitun, superfood, teh herbal, bundle.
> Sifat: demo edukasi + portofolio. **Bukan** afiliasi resmi; harga provisional mengikuti official store.

## Data & sumber
- Katalog `data/products.suurlemoen.json` (26 SKU, 8 hero id 1-8) dikurasi dari halaman produk
  **official store Tokopedia `suurlemoenid`** (diambil 2026-09-09). Shopee/Lazada/TikTok terblokir
  anti-bot; data harga/gambar diambil dari PDP Tokopedia.
- Tiap SKU menyimpan `sourceUrl` ke listing resmi + URL gambar asli (juga dicatat di Excel audit).
- Audit: `suurlemoen/suurlemoen-katalog-audit.xlsx` (sheet Katalog + Ringkasan, kolom URL gambar)
  ← `npm run audit` (`scripts/make-suurlemoen-audit.js`, exceljs).
- Validasi: `scripts/validate-suurlemoen.js` (slug/id unik, harga>0, gambar https, kategori ada,
  hero id 1-8).

## Skema SKU (engine-compatible)
`{ id, slug, name, category, categoryLabel, pack, sizes:[], colors:[], price, originalPrice,
   discountPercent, bpom, claim, images[], source:"suur-lemoen-official", provisional, heroFlag,
   newTag, rating, soldCount, soldLabel, sourceUrl }`
- `sizes`/`colors` kosong → PDP tidak memaksa pilih varian; ukuran kemasan (250ml/500ml/1L/700gr) = nama SKU.
- `bpom` nomor registrasi; `claim` ringkasan klaim dari listing resmi (max 300 char).
- `rating`/`soldCount`/`soldLabel` dari listing real; `0`/kosong → fallback enrichment deterministik di `lib/products.js`.

## Kategori & label
`sari-lemon` Sari Lemon & Nipis · `cuka-apel` Cuka Apel · `cuka-buah` Cuka Buah ·
`madu` Madu Murni · `minyak-zaitun` Minyak Zaitun · `superfood` Superfood & Camilan ·
`teh-herbal` Teh & Latte Herbal · `bundle` Paket Hemat → map label di `lib/products.js` (`CATEGORY_LABELS`).

## Design tokens (app/globals.css)
Palet "Lemon Segar + Hijau Daun": bg `#fdf9e9`, ink `#26331a`, primary hijau daun `#47730d`,
aksen emas lemon `#f2c11b` (accent-ink gelap `#26331a` untuk teks di atasnya), accent-dark amber
`#92610a` untuk teks link, glow `#f8efcd → #fcf6e2 → #fefaf0`. Font Outfit + Cabinet Grotesk.

## Stack & komponen utama
- Next.js 14 (static export) + Tailwind v3 (utility layer, preflight OFF, token = palet di atas)
  + `motion` (animasi) + `embla-carousel` (rel Best Seller) + `animejs` + `clsx`/`tailwind-merge`.
- Komponen motion terpisah per file: `CursorFollow`, `CarouselCursor`, `TiltCard`/`useTilt`,
  `CountdownBar`, `Toast`, `ScrollTop`, `HeroCarousel`, `CouponStrip`, `RitualSticky`,
  `Spotlight`, `AnimatedText`, port `EmblaCarousel` (ui-layouts, MIT).
- Header ala Sociolla: strip promo + countdown global + search lebar + pill kategori.

## Git/GitHub
Project ini **tanpa git** (riwayat & remote GitHub dihapus sesuai keputusan user saat migrasi).
