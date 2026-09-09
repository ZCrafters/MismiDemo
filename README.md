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
npm run build        # static export → folder out/
npm run preview      # serve hasil static (http-server)
npm run lint         # eslint
npm run smoke        # smoke test semua route dari out/ (scripts/smoke-test.mjs)
```

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