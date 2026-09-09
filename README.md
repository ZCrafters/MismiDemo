# Mismi Demo — Website Demo Tas Wanita (Next.js 14 + Tailwind v3)

Demo edukasi + portofolio toko online **Mismi** — tas wanita lokal Indonesia
(gaya Korean-style: tas selempang, tas ransel, tote bag).

> ⚠️ **Bukan** afiliasi resmi Mismi. Harga/foto produk milik official store masing-masing
> marketplace. Data dikurasi dari listing resmi (Shopee `mismi.official`, Tokopedia
> `mismiofficial`, Lazada `mismi-bags`).

## Status

- **Migrasi sedang berjalan** (brand Suur Lemoen → Mismi, retheme, kategori fashion).
  Lihat `nexttodo.md` untuk langkah berikutnya (terjemahan ID → EN).
- Toolchain sudah pulih: `package.json` + `next.config.mjs` + `.gitignore` ada.

## Menjalankan

```bash
npm install          # pasang dependency (next, motion, embla, exceljs, ...)
npm run dev          # dev server → http://localhost:3000
npm run build        # build Next.js (semua route SSG)
npm run start        # serve hasil build (next start)
npm run preview      # alias dari next start
npm run lint         # eslint
npm run smoke        # smoke test semua route via next start (scripts/smoke-test.mjs)
```

> Mode: **Next.js native (tanpa `output: "export"`)** — semua route di-prerender SSG
> via `generateStaticParams`, jadi tetap statis tapi Vercel men-serve-nya dengan benar
> (halaman HTML tidak 404 seperti mode export).

## Pipeline data

```
docs/templates/OPENCODE.md (agent scraping)
   → data/raw/{shopee,tokopedia,lazada}.json     # data mentah per marketplace
   → npm run audit:raw                           # Excel mentah multi-sheet
   → scripts/curate-mismi.js                     # kurasi → data/products.mismi.json
   → npm run validate + npm run audit            # validasi + Excel final
```

| Script | Fungsi |
|---|---|
| `npm run audit:raw` | `data/raw/*.json` → `mismi/mismi-data-mentah.xlsx` (sheet per marketplace) |
| `npm run curate` | data mentah → `data/products.mismi.json` (skema engine) |
| `npm run validate` | cek slug/id unik, harga>0, gambar https, kategori, hero 1-8 |
| `npm run audit` | katalog final → `mismi/mismi-katalog-audit.xlsx` |
| `npm run smoke` | smoke test semua route dari `out/` (butuh build dulu) |

## Struktur

- `app/` — home, catalog (filter/sort client-side), kategori/[slug], produk/[slug], faq, about, wishlist, checkout
- `components/` — Header ala Sociolla, home sections, PDP (Gallery, BuyBox, Review), cart drawer, PLP, motion, ui
- `lib/products.js` — helper + enrichment deterministik (rating/stok/diskon fallback)
- `data/` — `products.mismi.json` (14 SKU, 8 hero) + `raw/` (data mentah per marketplace)
- `docs/` — CONTEXT/WORKFLOW/CHANGELOG + `research/` (riset brand, palet & tone) + `templates/` (pipeline reusable untuk project baru)

## Dokumen penting

- `docs/CONTEXT.md` — konteks brand, skema SKU, desain token
- `docs/research/mismi-palette-tone.md` — palet "Cherry Cute" + kontras WCAG AA (riset)
- `nexttodo.md` — task list terjemahan ID → EN (tone Korean-girl)
- `docs/templates/` — template project baru (RESEARCH, DESIGN, COPY-STYLE, OPENCODE, script Excel/kontras)

## Deploy ke Vercel

Repo sudah siap build (`npm run build` OK, static export ke `out/`).

1. Buka **vercel.com/new** → **Import Git Repository** → pilih `ZCrafters/MismiDemo`.
2. Vercel auto-detect **Next.js**: Framework Preset `Next.js`, Build `next build` —
   biarkan default, klik **Deploy**. (Tanpa `output: "export"` — Vercel menangani
   route statis dengan benar; project yang sudah ter-deploy tinggal Redeploy.)
3. Kalau proyeknya **sudah pernah di-import** (dan gagal/404): buka project → tab
   **Deployments** → **Redeploy** dari commit terbaru.
4. **Auto-deploy**: setiap `git push` ke `main` otomatis memicu deployment baru.

> ℹ️ **Tidak perlu `vercel.json`.** Project ini Next.js native (semua route SSG) —
> Vercel mendeteksi framework & menjalankan `next build` otomatis. Menambah
> `vercel.json` justru bisa menimpa preset Next.js bawaan.

### Custom domain
1. Project → **Settings** → **Domains** → tambahkan domain (cth `mismi.my.id`).
2. Ikuti verifikasi DNS sesuai instruksi Vercel: **A/ALIAS** ke `76.76.21.21`,
   **CNAME** ke `cname.vercel-dns.com`, atau arahkan **NS** ke Vercel (managed DNS).
3. Tunggu propagasi (beberapa menit–24 jam) → aktifkan HTTPS otomatis.

### Cek lokal sebelum push
```bash
npm run build && npm run smoke   # build hijau + semua route 200
```

## Verifikasi akhir (checklist)

- [ ] `npm run validate` → `OK 14 produk (8 hero), 3 kategori.`
- [ ] `npm run lint` → 0 error
- [ ] `npm run build` → exit 0 (static export)
- [ ] `npm run smoke` → semua route 200
- [ ] Kontras WCAG AA ≥4.5 (cek via `docs/templates/scripts/contrast-check.js`)
- [ ] Tidak ada sisa teks "Suur Lemoen"/"Brighty" di `app/ components/ lib/`

## Legal

Demo edukasi, tidak berafiliasi dengan Mismi. Harga & foto produk adalah milik
official store masing-masing. Gunakan untuk belajar/portofolio.