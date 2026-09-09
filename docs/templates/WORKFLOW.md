# WORKFLOW.md — Template Pipeline Website Demo / Migrasi Marketplace

> **Cara pakai:** Salin file ini per project. Ganti semua `{{TOKEN}}`.
> Ini "playbook" — urutan langkah yang terbukti untuk:
> (1) membangun website demo dari marketplace, (2) retheme/improve website yang sudah jalan,
> (3) migrasi brand & kategori lama → baru. Ikuti urut, verifikasi tiap tahap.
> Saat sudah diisi, letakkan sebagai `docs/WORKFLOW.md`. Contoh terisi: `docs/WORKFLOW.md` Suur Lemoen.

---

## 0. Sebelum mulai (pahami dulu)

- Baca `docs/PROMPT.md` (identitas & target) dan `docs/CONTEXT.md` (konteks).
- **Template pendukung (biar tidak riset ulang)**: `docs/templates/RESEARCH.md` (riset brand),
  `DESIGN.md` (palet + kontras WCAG AA), `COPY-STYLE.md` (tone & copy), `OPENCODE.md`
  (scraping agent), `scripts/contrast-check.js` (hitung kontras), `scripts/make-raw-audit.js` (Excel).
- Pastikan tahu: stack (Next.js 14 static export + Tailwind v3 + motion), struktur folder, alur data.
- Cek versi dependency di `package.json` sebelum menambah library baru.

---

## 1. Migrasi Data Marketplace → Katalog

> Alur (improve): **riset brand → kumpulkan data mentah per marketplace → Excel mentah →
> kurasi → JSON final → validasi + Excel final.** Data mentah disimpan per marketplace
> (`data/raw/`) supaya bisa diaudit di Excel dan dikerjakan paralel — manual atau oleh agent
> scraping (OpenCode/Claude/Codebuff).

### langkah 1a — Riset brand & peta toko
- **Ikuti checklist `docs/templates/RESEARCH.md`** — sekali jalan, output terstruktur
  (identitas, peta toko, produk contoh, warna, tone) → tidak perlu riset ulang.
- Identifikasi brand dari link yang dikirim user (Shopee/Tokopedia/Lazada/TikTok/IG).
- Catat: nama brand, tagline, jenis produk, tiap username/akun resmi + link (nanti masuk
  sheet "Sumber" di Excel dan `docs/research/`).
- Cari contoh produk via Google (snippet harga/produk) kalau PDP anti-bot.
- Simpan hasil riset ke `docs/research/{{slug}}-{{YYYY-MM-DD}}.md` (contoh:
  `docs/research/mismi-2026-09-09.md`), lalu isi token `{{TOKEN}}` di PROMPT.md / CONTEXT.md.
- Turunan riset: palet → `docs/research/{{slug}}-palette-tone.md` (dari DESIGN.md),
  tone → `docs/research/{{slug}}-copy-style.md` (dari COPY-STYLE.md).

### langkah 1b — Kumpulkan data mentah per marketplace → `data/raw/`
- Untuk tiap marketplace yang bisa diakses, simpan koleksi sebagai `data/raw/{{marketplace}}.json`
  — ARRAY item mentah dengan skema minimal:
  `{ name, price, originalPrice?, discountPercent?, rating?, soldCount?, soldLabel?, bpom?,
     claim?, category?, pack?, colors[], images[], sourceUrl, source:"shopee|tokopedia|lazada|..." }`
- **PENTING:** jangan mengarang harga/klaim/stok. Semua dari listing resmi. Item tanpa harga
  boleh masuk dengan `price:0` + `note` — akan di-exclude saat kurasi.
- Marketplace anti-bot (Shopee/Lazada/TikTok/IG): fallback = snippet hasil pencarian Google,
  halaman `find`/`list` marketplace, atau minta user kirim screenshot PDP. Dokumentasikan
  keterbatasan per marketplace di CONTEXT.md.
- **Kerja sama agent (OpenCode/dll):** untuk scraping massal pakai task file
  `docs/templates/OPENCODE.md` — kontrak output-nya persis `data/raw/*.json` ini, jadi agent
  lain bisa mengerjakan langkah 1b tanpa perlu paham seluruh project. Lihat bagian
  "Kolaborasi dengan OpenCode" di bawah.

### langkah 1c — Data mentah → Excel (audit mentah, multi-sheet)
- `npm run audit:raw` → `scripts/make-{{slug}}-raw-audit.js` (template:
  `docs/templates/scripts/make-raw-audit.js`).
- Script membaca SEMUA `data/raw/*.json` → Excel `{{FOLDER}}/{{slug}}-data-mentah.xlsx`:
  - sheet per marketplace (kolom: nama, harga, harga asli, %diskon, rating, terjual, klaim,
    URL gambar, sourceUrl) — arsip & bahan review,
  - sheet "Ringkasan": jumlah item per marketplace + total,
  - sheet "Sumber": daftar marketplace + akun resmi + link toko + status akses.
- Gunakan Excel ini untuk review/dedupe sebelum kurasi (bisa juga dikirim ke user untuk validasi).

### langkah 1d — Kurasi & merge → `data/products.{{slug}}.json`
- Dari raw/Excel yang sudah direview, tulis `data/products.{{slug}}.json`
  (skema engine-compatible, lihat CONTEXT.md). Id 1-{{N_HERO}} = hero/best-seller.
- Target ~20-30 SKU. Sisakan beberapa yang `heroFlag:true` untuk hero & Best Seller.
- Field yang hanya ada di tahap ini: `slug, category, categoryLabel, heroFlag, newTag, provisional`.

### langkah 1e — Script validasi & audit final
- Buat `scripts/validate-{{slug}}.js` (mirip `validate-suurlemoen.js`):
  cek slug/id unik, harga>0, gambar https, `categoryLabel` ada, hero id 1-8.
- Buat `scripts/make-{{slug}}-audit.js` (exceljs): sheet Katalog (termasuk kolom **URL gambar**)
  + sheet Ringkasan + sheet Sumber. Output ke `{{FOLDER}}/{{slug}}-katalog-audit.xlsx`.
- Update `package.json` scripts: `validate`, `audit`, `audit:raw`.

```bash
npm run audit:raw                    # → data mentah per marketplace → {{slug}}-data-mentah.xlsx
node scripts/validate-{{slug}}.js    # → OK <N> produk (<8> hero), <M> kategori.
node scripts/make-{{slug}}-audit.js  # → tulis xlsx final (di-ignore git via *.xlsx)
```

### langkah 1f — Update helper `lib/products.js`
- Ganti `import raw from "../data/products.{{slug}}.json";`.
- Update `CATEGORY_LABELS` ke kategori baru. Update `MEGA_MENU` (3 kolom sesuai rutinitas brand).

---

### Kolaborasi dengan OpenCode (dan agent CLI lain)
- **Pembagian kerja yang terbukti**: agent scraping (OpenCode) mengerjakan **langkah 1b saja**
  — menulis `data/raw/*.json` sesuai skema — sementara kamu (atau agent lain) mengerjakan
  1c–1f (Excel, kurasi, build). Kontrak antar-agent = file JSON, bukan obrolan.
- Jalankan dari root project:
  ```bash
  opencode                                  # lalu paste isi docs/templates/OPENCODE.md
  # atau (sesuaikan cara invoke versi opencode kamu):
  opencode run "baca docs/templates/OPENCODE.md dan kerjakan instruksinya"
  ```
- Setelah OpenCode selesai, verifikasi hasilnya: `npm run audit:raw` → cek Excel mentah →
  lanjut kurasi. Kalau ada item `price:0` / note, tanyakan ke user atau buang saat kurasi.
- **Aturan emas**: agent scraping tidak boleh mengarang data (harga/klaim/stok) dan hanya
  menulis ke `data/raw/`. Perubahan di luar itu = diskusi dulu.

---

## 2. Retheme Palet Warna (ganti tema)

> Berlaku untuk: ganti warna brand, perbaiki kontras, atau sesuaikan arah estetika baru.
> **Gunakan `docs/templates/DESIGN.md`** (cara pilih warna dari riset) dan hitung kontras
> dengan `docs/templates/scripts/contrast-check.js` — JANGAN hitung manual.

### langkah 2a — Token warna (WAJIB sinkron 2 tempat)
- `app/globals.css` `:root` token + `tailwind.config.js` `tokens` → nilainya HARUS sama.

### langkah 2b — Semua warna hardcode di luar token
Cari & samakan di seluruh project:
- Shadow warna: `.card:hover`, `.glow-shot`, `.scroll-top`, `tailwind.config.js` `boxShadow.card/glow`.
- Panel/area gelap: `.ritual-panel` gradient + bayangan; grid pattern `.bg-grid-fade`.
- Gradien dekoratif: `.foot-band`, `.animated-text`, `.glow-hero`.
- **Komponen yang warna di-hardcode dalam JSX**: `Spotlight.jsx` (rgba accent di 3 radial gradient),
  `ReviewSection.jsx` (warna avatar).

### langkah 2c — Atur cara pakai accent (biar kontras AA)
- `accent` biasanya vivid → pakai sebagai **background CTA** dengan `accent-ink` gelap (bukan putih),
  atau sebagai aksen dekoratif.
- Untuk **teks link** kecil di atas bg terang, pakai `accent-dark` (versi lebih gelap).
  Cari semua selector yang tulis `color: var(--color-accent)` dan ganti ke `var(--color-accent-dark)`
  kalau itu teks pada bg terang.

### langkah 2d — Hitung ulang kontras WCAG AA
- Untuk pasangan penting: ink/bg, muted/bg, primary/bg, primary di atas glow, putih/primary,
  ink/accent (tombol), accent-dark/bg, putih/danger.
- Minimal 4.5:1 untuk teks normal, 3:1 untuk teks besar.
- Gunakan alat kontras atau hitung manual (formula relative luminance).

### langkah 2e — Verifikasi
```bash
npm run build   # exit 0
```
Buka hasil di browser → cek visual hero, kartu, panel gelap, tombol, footer, spotlight.

---

## 3. Ganti Brand (teks & identitas)

> Berlaku untuk: migrasi brand A → brand B, atau ganti nama brand yang sama.

- **Metadata**: `app/layout.jsx` (title/description) + semua `page.jsx` `metadata` + `sitemap.js` (jika perlu).
- **JSON-LD**: `app/produk/[slug]/page.jsx` → `brand: { name }`.
- **Wordmark & footer**: `Header.jsx`, `MobileNav.jsx`, `Footer.jsx` (wordmark, tagline, kolom,
  hashtag, ©). Perhatikan `.foot-giant` (AnimatedText) — teks lebih dari 1 kata perlu cek overflow.
- **Kupon**: `lib/coupons.js` (yang tampil) DAN `components/checkout/CheckoutFlow.jsx` (yang berlaku).
  Kode kupon & placeholder harus konsisten.
- **Prefix order**: `CheckoutFlow.jsx` `orderId` (cth `SLM-`).
- **Placeholder search**: `Header.jsx`, `MobileNav.jsx`, `ExpandableSearch.jsx` (`HINTS` + `KEY`),
  `CatalogClient.jsx`.
- **localStorage/sessionStorage key**: ganti prefix `{{brand}}-...` di `CartProvider`,
  `Wishlist`, `ExpandableSearch`, `VoucherPopup`. (Ganti prefix → cart/wishlist lama otomatis reset,
  wajar karena produk juga berganti.)
- **Disclaimer "official store"**: `BuyBox.jsx`, `PromoPeriod.jsx`, `Shopee/Lazada/TikTok` link di
  Footer & MobileNav, `about`, `faq`.
- **Brand text sisa**: grep `{{brand_lama}}|{{BrandLama}}` di app/components/lib/scripts → bersihkan.

---

## 4. Migrasi Kategori & Konten Produk (beda jenis produk)

> Berlaku: brand lama body care → baru minuman/skincare/fashion/dll. Ini bagian paling besar.
> Bukan hanya ganti nama — kategori, klaim, ukuran, dan bahasa copy semuanya berbeda.
> **Tone & copy pakai `docs/templates/COPY-STYLE.md`** (framework riset voice + glossary + do/don'ts)
> supaya copy baru relevan dan konsisten tanpa riset gaya bahasa dari nol.

### langkah 4a — Kategori
- `lib/products.js`: `CATEGORY_LABELS`, `MEGA_MENU`.
- `Header.jsx`: `SHORT_LABEL`.
- `HomeSections.jsx`: `CATS` (5 kategori untuk grid).

### langkah 4b — Konten home
- `HeroCarousel.jsx`: 3 slide — kicker/title/text/cta/href + `pick` (kategori yang relevan).
- `RitualSticky.jsx`: `STEPS` (3 langkah) — tiap step pakai kategori produk baru; copy ditulis ulang.
- `PromoCards.jsx`: list promo + kategori.
- `PromoPeriod.jsx`: catatan nama brand.
- `page.jsx`: meta description di bawah.

### langkah 4c — PDP & halaman statis
- `BuyBox.jsx`: teks accordion "Cara Pakai" → sesuaikan ke produk baru (mis. minuman: "encerkan
  dengan air", skincare: "hentikan jika iritasi", fashion: "cuci sesuai label").
- `ReviewSection.jsx`: tulis ulang DUMMY_REVIEWS agar relevan (nama, isi review, warna avatar).
- `about/page.jsx`, `faq/page.jsx`: cerita brand, ukuran kemasan, nomor BPOM/Halal, link store.
- `Share.jsx`: teks share.

### langkah 4d — Variant yang tak relevan
- Jika produk baru tidak punya variant warna/size, biarkan `sizes:[]`/`colors:[]` kosong →
  PDP & kartu otomatis tidak memaksa pilih. (Jangan hapus komponen — engine handle otomatis.)

---

## 5. Verifikasi Akhir (WAJIB)

```bash
npm run validate   # OK <N> produk (<8> hero), <M> kategori.
npm run lint       # 0 error (warning lama boleh dibiarkan)
npm run build      # exit 0 (static export) — cek 44 halaman SSG keluar
```

- **Smoke test** semua route dari `out/` = 200:
  `/`, `/catalog`, `/kategori/*`, `/produk/*`, `/faq`, `/about`, `/wishlist`, `/checkout`, `/sitemap.xml`, 404.
  Jalankan `npm run preview` lalu cek tiap URL.
- **Grep brand lama**: `{{brand_lama}}|{{BrandLama}}` di app/components/lib/scripts → 0 kecuali riwayat CHANGELOG.
- **Kontras WCAG AA**: tabel pasangan penting (lihat langkah 2d).
- **Gambar**: pastikan domain gambar tercakup di `next.config.mjs` `images.remotePatterns`
  (cth `**.tokopedia-static.net`, `images.tokopedia.net`, `**.ibyteimg.com`).

---

## 6. Git Push (hanya jika diminta user)

```bash
git init
git remote add origin {{REPO_URL}}
git branch -M main
git add -A && git commit -m "feat: {{brand}} demo"
git push -u origin main
```
- `.gitignore` harus mengabaikan: `node_modules/ out/ .next/ *.xlsx .env* dist/`.
- Jangan commit `*.xlsx` (audit) kecuali user minta — biasanya di-ignore.

---

## 7. Checklist Cepat

- [ ] Data produk real dari marketplace, tidak ada harga/klaim karangan
- [ ] Skema SKU lengkap (id/slug/name/category/price/bpom/claim/images/heroFlag)
- [ ] Palet sinkron globals.css + tailwind.config, hardcode disamakan, kontras AA lolos
- [ ] Nama brand konsisten di semua teks & metadata
- [ ] Kategori & konten cocok dengan produk brand
- [ ] Link official store & sosmed benar
- [ ] `validate` / `lint` / `build` lolos + smoke test route
- [ ] Tidak ada sisa teks brand lama di kode aktif

---

## Catatan penting (learnings dari Suur Lemoen migration)

- **Dua sistem kupon**: display (`lib/coupons.js`) vs berlaku (`CheckoutFlow.jsx`) — dua-duanya harus di-update.
- **Spotlight & komponen ui-layouts** punya warna hardcode di JSX, bukan cuma CSS token — jangan lupa.
- **Ada 4 file** yang punya placeholder search — grep `placeholder="Cari:` untuk menemukan semuanya.
- **Bukan hanya ganti nama** kalau kategori produk berubah total — copy hero/ritual/review/klaim semua harus ditulis ulang.
- **Enrichment `lib/products.js`** otomatis turun dari data real (rating/sold) bila field ada;
  bila kosong, pakai fallback hash deterministik — stabil antar-build.
- **Ganti prefix localStorage** = reset cart/wishlist pengguna — ini perilaku yang diinginkan saat rebrand.
