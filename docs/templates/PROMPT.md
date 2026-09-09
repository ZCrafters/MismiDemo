# PROMPT — Template Website Demo Brand / Migrasi Marketplace

> **Cara pakai:** Salin file ini per project. Ganti semua `{{TOKEN}}` dengan data brand kamu.
> Prompt ini adalah "checklist + instruksi" untuk AI agent (atau diri sendiri) agar bisa
> membangun/menyesuaikan website demo tanpa perlu belajar pola dari nol.
> Saat sudah diisi, letakkan sebagai `docs/PROMPT.md` (atau tempel isinya langsung ke agent).

---

## 1. Identitas Brand

```
Brand       : {{NAMA_BRAND}}            (cth: Suur Lemoen, Brighty, Skintific)
Tagline     : {{TAGLINE}}               (cth: "Segar & sehat, tiap hari.")
Kategori   : {{KATEGORI_UTAMA}}         (cth: minuman kesehatan lemon)
Konteks    : {{DESKRIPSI_SINGKAT}}      (1-2 kalimat apa brand ini)
Sifat      : Demo edukasi + portofolio. BUKAN afiliasi resmi.
```

## 2. Sumber Data & Marketplace

```
Peta toko resmi (semua marketplace + sosmed):
  - {{MARKETPLACE_UTAMA}} user {{USERNAME_TOKO}} link {{LINK_TOKO}}
  - {{MARKETPLACE2}} user {{USER2}} link {{LINK2}}
  - {{MARKETPLACE3}} user {{USER3}} link {{LINK3}}
  - TikTok/IG: @{{USER_TIKTOK}} / @{{USER_IG}} link {{LINK_SOSMED}}
Alur data : riset (docs/research/) → data mentah per marketplace `data/raw/{{marketplace}}.json`
  → `npm run audit:raw` (Excel mentah multi-sheet per marketplace) → kurasi →
  `data/products.{{slug}}.json` → `npm run validate` + `npm run audit` (Excel final).
Skema raw : { name, price, originalPrice?, discountPercent?, rating?, soldCount?, soldLabel?,
  bpom?, claim?, category?, pack?, colors[], images[], sourceUrl, source }
Cara ambil data : PDP/list halaman produk (Tokopedia kadang bisa) → fallback snippet Google /
  halaman find-list → minta user kirim screenshot PDP. JANGAN mengarang harga/klaim/stok.
Catatan anti-bot : Shopee/Lazada/TikTok/IG sering blokir scraping → pakai data yang bisa
  diakses; dokumentasikan keterbatasan per marketplace di CONTEXT.md & sheet Sumber Excel.
Agent scraping : untuk koleksi massal, beri agent (OpenCode/dll) file docs/templates/OPENCODE.md
  — output-nya `data/raw/*.json`, lalu diverifikasi lewat Excel (`npm run audit:raw`).
```

## 3. Target Desain

```
Palet baru  : {{PALET}} + contoh nilai token
  - bg {{BG}} · ink {{INK}} · muted {{MUTED}} · line {{LINE}}
  - primary {{PRIMARY}} · accent {{ACCENT}} · accent-ink {{ACCENT_INK}} · accent-dark {{ACCENT_DARK}}
  - badge/danger {{DANGER}} · star {{STAR}} · success {{SUCCESS}}
  - glow {{GLOW1}} → {{GLOW2}} → {{GLOW3}}
Font        : {{FONT_BODY}} (body) + {{FONT_DISPLAY}} (heading)
Arah estetika: {{ARAH_VISUAL}}     (cth: segar alami, premium, playful, skandinavia)
```

## 4. Kategori Produk (daftar etalase brand)

```
{{KATEGORI_SLUG}} = {{LABEL_KATEGORI}}
{{KATEGORI_SLUG}} = {{LABEL_KATEGORI}}
{{KATEGORI_SLUG}} = {{LABEL_KATEGORI}}
...
Jumlah SKU   : {{N_SKU}} (target 20-30)
Hero/Best Seller : {{ID_HERO}} (8 produk, id 1-8)
```

## 5. Instruksi untuk Agent

> Kerjakan urut seperti di WORKFLOW.md. Verifikasi tiap langkah sebelum lanjut.

### A. Data produk
1. Kurasi `{{N_SKU}}` produk asli dari marketplace ke `data/products.{{slug}}.json`.
2. Setiap item wajib: `id, slug, name, category, categoryLabel, pack, sizes:[], colors:[],
   price, originalPrice, discountPercent, bpom, claim, images[url], source,
   provisional:true, heroFlag, newTag, rating, soldCount, soldLabel, sourceUrl`.
3. `images[]` = URL gambar asli (dari marketplace). Catat juga ke Excel audit.
4. Jangan mengarang harga/klaim. Semua dari listing resmi.

### B. Retheme
1. Ganti token warna di `app/globals.css` `:root` **dan** `tailwind.config.js` (harus sinkron).
2. Samakan semua warna hardcode (shadow, panel gelap, grid pattern, gradient, kartu).
3. Pastikan semua pasangan teks lolos **WCAG AA ≥4.5:1** (hitung ulang tiap ganti palet).
4. Aksen sebaiknya punya varian "dark" untuk teks di atas bg terang.

### C. Brand text
1. Ganti seluruh nama brand di `app/`, `components/`, `lib/`:
   - metadata/title semua route, JSON-LD `brand.name`
   - wordmark (Header, MobileNav, Footer), top-strip, tagline, hashtag, kolom footer
   - kupon (display: `lib/coupons.js` + berlaku: `components/checkout/CheckoutFlow.jsx`)
   - placeholder search (Header, MobileNav, ExpandableSearch, CatalogClient)
   - prefix order ID checkout (cth: `SLM-`)
   - localStorage/sessionStorage keys (`*-cart-v1`, `*-wishlist-v1`, `*-search-v1`, `*-voucher-popup-v1`)
2. Update teks disclaimer "official store {{BRAND}}" di BuyBox, PromoPeriod, dsb.

### D. Konten & kategori
1. Sesuaikan kategori ke produk baru: `lib/products.js` `CATEGORY_LABELS` + `MEGA_MENU` +
   `Header.jsx` `SHORT_LABEL` + `HomeSections.jsx` `CATS`.
2. Tulis ulang konten yang masih relevan dengan kategori lama:
   - HeroCarousel 3 slide, RitualSticky 3 langkah, PromoCards, PromoPeriod
   - ReviewSection (dummy review tema produk baru)
   - about + faq (cerita brand, ukuran kemasan, nomor BPOM, link store)
3. Nonaktifkan hal yang tak relevan (mis. varian warna/size jika produk tidak punya).

### E. Link & legal
1. Update link official store + sosmed di Footer & MobileNav.
2. Metadata `title`/`description` per halaman mengikuti brand baru.
3. Cek `next.config.mjs` `images.remotePatterns` sudah mencakup domain gambar marketplace.

### F. Verifikasi (WAJIB sebelum selesai)
```bash
npm run validate   # OK <N> produk (<8> hero), <M> kategori.
npm run lint       # 0 error (warning lama boleh)
npm run build      # exit 0 (static export)
```
- Smoke test semua route dari `out/` (home, catalog, kategori/*, produk/*, faq, about, wishlist, checkout, sitemap).
- Grep `{{token_brand_lama}}|{{BrandLama}}` di `app/ components/ lib/ scripts/` → harus 0 (kecuali riwayat CHANGELOG).
- Cek kontras WCAG AA.

### G. Git (opsional — hanya jika diminta user)
```
git init
git remote add origin {{REPO_URL}}
git branch -M main
git add -A && git commit -m "feat: {{brand}} demo"
git push -u origin main
```
Pastikan `.gitignore` mengabaikan: `node_modules/ out/ .next/ *.xlsx .env* dist/`.

---

## 6. Checklist Cepat Sebelum Selesai

- [ ] Nama brand di semua metadata & wordmark konsisten
- [ ] Palet baru sinkron di globals.css + tailwind.config
- [ ] Kategori & konten cocok dengan produk brand
- [ ] Link official store & sosmed benar
- [ ] `validate` / `lint` / `build` lolos
- [ ] Tidak ada sisa teks brand lama di kode aktif
- [ ] Kontras WCAG AA
- [ ] Git push (jika diminta)
