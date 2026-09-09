# CONTEXT.md — Template Dokumen Konteks Project

> **Cara pakai:** Salin file ini per project. Ganti semua `{{TOKEN}}` dengan data brand.
> Fungsi: jadi "otak" project — siapa brandnya, datanya dari mana, skema apa, palet apa, stack apa.
> Agent (atau kamu bulan depan) cukup baca ini untuk langsung paham tanpa menelusuri seluruh kode.
> Saat sudah diisi, letakkan sebagai `docs/CONTEXT.md`. Ini versi GENERIK — untuk contoh terisi,
> lihat `docs/CONTEXT.md` project Suur Lemoen.

---

# {{NAMA_BRAND}} — Demo {{JENIS_PRODUK}} (Context)

> Brand: **{{NAMA_BRAND}}** — {{JENIS_PRODUK}} {{ASAL}} ({{1-2 KALIMAT DESKRIPSI}}).
> Sifat: demo edukasi + portofolio. **Bukan** afiliasi resmi; harga provisional mengikuti official store.

## Data & sumber
- Katalog `data/products.{{slug}}.json` ({{N_SKU}} SKU, {{N_HERO}} hero id 1-{{N_HERO}}) dikurasi
  dari halaman produk **official store {{MARKETPLACE_UTAMA}} `{{USERNAME_TOKO}}`** (diambil {{TANGGAL}}).
  Marketplace lain ({{MARKETPLACE_LAIN}}) sering terblokir anti-bot; data diambil dari yang bisa diakses.
- Tiap SKU menyimpan `sourceUrl` ke listing resmi + URL gambar asli (juga dicatat di Excel audit).
- Audit: `{{FOLDER}}/{{slug}}-katalog-audit.xlsx` (sheet Katalog + Ringkasan, kolom URL gambar)
  ← `npm run audit` (`scripts/make-{{slug}}-audit.js`, exceljs).
- Validasi: `scripts/validate-{{slug}}.js` (slug/id unik, harga>0, gambar https, kategori ada, hero id 1-8).

## Skema SKU (engine-compatible)
`{ id, slug, name, category, categoryLabel, pack, sizes:[], colors:[], price, originalPrice,
   discountPercent, bpom, claim, images[], source:"{{source}}", provisional, heroFlag,
   newTag, rating, soldCount, soldLabel, sourceUrl }`
- `sizes`/`colors` kosong → PDP tidak memaksa pilih varian; ukuran kemasan ({{CONTOH_SIZE}}) = nama SKU.
- `bpom` nomor registrasi; `claim` ringkasan klaim dari listing resmi (max 300 char).
- `rating`/`soldCount`/`soldLabel` dari listing real; `0`/kosong → fallback enrichment deterministik di `lib/products.js`.

## Kategori & label
`{{slug}}` {{Label}} · `{{slug}}` {{Label}} · `{{slug}}` {{Label}} · `{{slug}}` {{Label}} · `{{slug}}` {{Label}}
→ map label di `lib/products.js` (`CATEGORY_LABELS`).

## Design tokens (app/globals.css)
Palet "{{NAMA_PALET}}": bg `{{BG}}`, ink `{{INK}}`, primary {{PRIMARY_DESC}} `{{PRIMARY}}`,
aksen {{ACCENT_DESC}} `{{ACCENT}}` (accent-ink {{ACCENT_INK}} untuk teks di atasnya), accent-dark
amber `{{ACCENT_DARK}}` untuk teks link, glow `{{GLOW1}} → {{GLOW2}} → {{GLOW3}}`. Font {{FONT_BODY}} + {{FONT_DISPLAY}}.

## Stack & komponen utama
- Next.js 14 (static export) + Tailwind v3 (utility layer, preflight OFF, token = palet di atas)
  + `motion` (animasi) + `embla-carousel` (rel Best Seller) + `animejs` + `clsx`/`tailwind-merge`.
- Komponen motion terpisah per file: `CursorFollow`, `CarouselCursor`, `TiltCard`/`useTilt`,
  `CountdownBar`, `Toast`, `ScrollTop`, `HeroCarousel`, `CouponStrip`, `RitualSticky`,
  `Spotlight`, `AnimatedText`, port `EmblaCarousel` (ui-layouts, MIT).
- Header ala Sociolla: strip promo + countdown global + search lebar + pill kategori.

## Git/GitHub
- {{STATUS_GIT}} (cth: terhubung ke `https://github.com/{{ORG}}/{{repo}}.git`, branch `main` —
  atau "tanpa git" bila user meminta dihapus).
- Yang di-ignore: `node_modules/`, `out/`, `.next/`, `*.xlsx`, `.env*`, `dist/`.

---

## Panduan mengubah template ini
- **Ganti brand**: cukup isi `{{TOKEN}}` bagian atas. Struktur dokumen tidak berubah.
- **Ganti kategori produk besar** (mis. skincare → minuman): bukan cuma token — ikuti WORKFLOW.md
  bagian "Mengganti kategori produk" (tulis ulang copy hero/ritual/review, sesuaikan kategori,
  sesuaikan ukuran kemasan & bahasa klaim).
- **Ganti palet**: ikuti WORKFLOW.md "Retheme palet warna" — WAJIB cek ulang WCAG AA.
