# Mismi — Riset Warna & Tone "Cherry Cute" (2026-09-09)

> **Untuk siapa**: agent/developer yang mengerjakan langkah retheme (docs/templates/WORKFLOW.md §2)
> dan migrasi konten fashion (§4). Semua nilai di bawah **sudah dihitung kontras WCAG AA** —
> tidak perlu dihitung ulang, cukup dipakai.
> ⚠️ File ini riset; jangan diedit bersamaan dengan agent lain yang sedang menulis
> `app/globals.css` / `tailwind.config.js`.

## 1. Riset singkat (bukti dari marketplace & sosmed)

- **Identitas**: tas wanita lokal Indonesia, gaya Korean-style, "cute & stylish".
- **Tagline IG**: *"Move easy. Be Mismi. For crushes, commutes & cute days 🍒"* — emoji **cherry**.
- **Copy toko Shopee**: "desain manis, ringan, dan **warna-warna cantik** yang mudah dipadukan.
  Tampil lebih stylish & effortless... **Happy shopping ♡**".
- **Varian produk real**: Pink, Cream, Khaki, Hitam, Putih, Cokelat — pastel dominan, "Pink Series".
- **Gaya promosi TikTok/IG**: *"Yuk order sekarang juga~ 🛍️ Klik keranjang kuning, pilih warna
  favoritmu! #TasKorea #TasKorduroi"* — santai, feminin, ekspresif, emoji banyak.
- **Arah visual**: pastel krem-pink + cherry (merah muda ceri) + sentuhan korduroi krem/khaki.
  Bukan pink neon generik — "cute Korean", lembut tapi tetap hidup.

## 2. Palet final — "Cherry Cute"

| Token | Hex | Pakai untuk |
|---|---|---|
| `bg` | `#fdf6f4` | latar halaman (krem-pink lembut) |
| `surface` | `#ffffff` | kartu, header, drawer, sheet |
| `ink` | `#43252f` | teks utama (berry-cokelat gelap) |
| `muted` | `#7d5b66` | teks sekunder, breadcrumb, meta |
| `line` | `#f0dfe0` | border dekoratif (tanpa syarat AA) |
| `primary` | `#8a1e4a` | CTA sekunder, judul aksen, **panel gelap** |
| `accent` | `#d6247a` | bg tombol utama (CTA) — teks **putih** |
| `accent-ink` | `#ffffff` | teks di atas accent |
| `accent-dark` | `#a3005c` | teks link di atas bg terang |
| `badge` | `#c2185b` | ribbon diskon / badge promo (teks putih) |
| `danger` | `#c2185b` | harga promo, error, wishlist on |
| `star` | `#b45309` | bintang rating |
| `success` | `#166534` | stok tersedia, kupon berlaku |
| `glow-1` | `#fdeef1` | glow/panel pastel (dari atas) |
| `glow-2` | `#fef6f4` | glow tengah |
| `glow-3` | `#fffaf9` | glow bawah |
| panel gelap | `#8a1e4a → #4a1229` | ritual panel, foot-band gradient (teks putih) |

> Catatan desain: **jangan pakai hot pink `#e6007e` sebagai bg berisi teks** — kontrasnya
> hanya 4.50 (tepat di batas, tanpa margin). Rose `#d6247a` + putih = 4.78. Hot pink boleh
> hanya untuk gradien dekoratif/glow tanpa teks di atasnya.

## 3. Kontras WCAG AA — semua lolos (dihitung, bukan perkiraan)

Minimal 4.5:1 teks normal / 3:1 teks besar.

| Pasangan | Rasio | Status |
|---|---|---|
| ink / bg | 12.73 | ✅ |
| muted / bg | 5.52 | ✅ |
| primary / bg | 8.31 | ✅ |
| accent-dark / bg | 7.25 | ✅ |
| danger / bg | 5.50 | ✅ |
| danger / glow-1 | 5.22 | ✅ |
| star / bg | 4.70 | ✅ |
| ink / surface | 13.60 | ✅ |
| muted / surface | 5.90 | ✅ |
| primary / surface | 8.88 | ✅ |
| accent-dark / surface | 7.74 | ✅ |
| **white / accent** | **4.78** | ✅ |
| white / primary | 8.88 | ✅ |
| white / badge | 5.87 | ✅ |
| white / panel gelap (`#4a1229`) | 14.90 | ✅ |
| primary / glow-1 | 7.90 | ✅ |
| accent-dark / glow-1 | 6.89 | ✅ |
| muted / glow-1 | 5.25 | ✅ |

## 4. Peta implementasi (untuk agent retheme)

Sinkron di **dua tempat wajib**: `app/globals.css` `:root` + `tailwind.config.js` `tokens`
(nilai HARUS sama). Lalu samakan hardcode berikut ke token baru:

- Shadow berwarna: `.card:hover`, `.glow-shot`, `.scroll-top`, `boxShadow.card/glow` → pakai
  bayangan berry `rgba(138,30,74,0.3)` / `rgba(163,0,92,0.35)`.
- Panel gelap: `.ritual-panel` gradient `#8a1e4a → #1f0a14`, grid `.bg-grid-fade(-dark)`,
  `.foot-band` gradient, `.glow-hero` glow.
- Gradien dekoratif: `.animated-text` (radial accent→primary), hero glow.
- Hardcode di JSX: `Spotlight.jsx` (rgba accent di radial gradient), `ReviewSection.jsx`
  (warna avatar) — ganti ke varian palet ini.
- Aksen sebagai **teks link** di bg terang → pakai `accent-dark` (`#a3005c`), bukan accent.
- Panel gelap (ritual/footer) → `primary` berry, teks putih.

## 5. Tone guide (voice & copy)

- **Voice**: cute, hangat, feminin, santai — "korean-style tapi tetap Indonesia".
- **Contoh vocab**: "gemes", "cantik", "teman harian", "muat banyak", "ringan & stylish",
  "pilih warna favoritmu ♡". Emoji secukupnya (🍒🛍️♡) — tidak berlebihan.
- **Hashtag usulan**: `#MismiMoveEasy` atau `#MoveEasyBeMismi`.
- **Penyesuaian konten fashion (beda dari minuman)**:
  - PDP "Cara Pakai" → **"Cara Merawat"**: bersihkan dengan kain lembut, hindari rendam
    air berlebih (kecuali produk anti air), jemur di tempat teduh.
  - Tanpa BPOM → ganti metrik dengan **bahan & ukuran** (cth "Korduroi · 31 x 12 x 42 cm").
  - Kategori: `tas-selempang`, `tas-ransel`, `tote-bag`, opsional `aksesoris`.
  - Varian: **warna** (bukan size) — `sizes:[]`, `colors:["Pink","Cream","Hitam",...]`.
  - Kupon: `MISMI15`, `CHERRY10`, `HEMATAWAL` (display) + `MISMI20K`/`PINKY10` (berlaku).
  - Order prefix: `MSM-`.

## 6. Cara pakai oleh agent retheme

1. Baca `docs/templates/WORKFLOW.md` §2 (retheme) & §4 (migrasi konten) + `docs/CONTEXT.md` Suur Lemoen sbg contoh terisi.
2. Salin nilai token dari §2 di atas ke `globals.css` + `tailwind.config.js`.
3. Samakan hardcode (cek §4), jangan lupa Spotlight & ReviewSection.
4. Verifikasi: `npm run build` + tabel kontras §3 (sudah terverifikasi — tinggal pastikan
   tidak ada hex lain yang masuk).
5. Konten copy: pakai tone §5. Data produk: `data/raw/*.json` + `docs/research/mismi-2026-09-09.md`.