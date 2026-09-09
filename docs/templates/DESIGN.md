# DESIGN.md — Template Palet & Aksesibilitas (Tanpa Riset Ulang)

> **Cara pakai:** salin file ini per project → isi nilai hex → jalankan
> `docs/templates/scripts/contrast-check.js` (atau tempel ke terminal) → semua pasangan
> harus ≥4.5:1 → salin hasil ke `docs/research/{{slug}}-palette-tone.md`.
> Aturan: JANGAN hitung kontras manual — selalu pakai script.

## 1. Cara memilih warna dari riset (langkah 1-2, jangan lebih)
1. Ambil **1 warna kunci** dari identitas brand (emoji, nama seri, warna produk dominan).
   - Mismi: 🍒 cherry + pastel → rose/pink. Suur Lemoen: lemon → kuning-hijau.
2. Ambil **1 warna netral hangat** untuk bg (krem, putih kebiruan, off-white) — jangan putih murni.
3. **Ink** = versi sangat gelap dari warna kunci (bukan hitam murni `#000`) — lebih hangat & "branded".
4. **Primary** = warna kunci versi sedang (untuk teks aksen + panel gelap).
5. **Accent** = warna kunci versi vivid (bg tombol CTA) + **accent-ink** (teks di atasnya: putih ATAU gelap — cek script, pilih yang ≥4.5).
6. **Accent-dark** = versi lebih gelap dari accent untuk teks link di bg terang.
7. **Glow** = 3 gradasi bg terang senada (glow-1 paling pekat → glow-3 paling pucat).
8. **Badge/danger** = merah ceri/merah brand; **star** = emas hangat `#b45309`; **success** = hijau `#166534`.

> 💡 Aksen vivid sering GAGAL 4.5 dengan teks gelap maupun putih — kalau keduanya gagal,
> pilih versi accent yang lebih lembut (cth `#e6007e`→`#d6247a`) sampai salah satu lolos.
> Hot pink `#e6007e` + putih = 4.50 (tepat di batas) — jangan dipakai, cari yang ada margin.

## 2. Tabel token (isi hex)
| Token | Hex | Dipakai untuk |
|---|---|---|
| `bg` | | latar halaman |
| `surface` | `#ffffff` | kartu/header/drawer |
| `ink` | | teks utama |
| `muted` | | teks sekunder (harus ≥4.5 di bg) |
| `line` | | border dekoratif (bebas AA) |
| `primary` | | judul aksen + panel gelap |
| `accent` | | bg tombol utama |
| `accent-ink` | | teks di atas accent |
| `accent-dark` | | teks link di bg terang |
| `badge` | | ribbon promo (teks putih) |
| `danger` | | harga promo, error |
| `star` | `#b45309` | rating |
| `success` | `#166534` | stok/kupon berlaku |
| `glow-1..3` | | gradasi bg pastel |
| panel gelap | | gradient ritual/footer (teks putih) |

## 3. Pasangan yang WAJIB dicek (jalankan script, tempel hasilnya ke doc)
- ink/bg · muted/bg · primary/bg · accent-dark/bg · danger/bg · star/bg
- ink/surface · muted/surface · primary/surface · accent-dark/surface
- **white/accent** (atau accent-ink/accent) · white/primary · white/badge · white/panel-gelap
- primary/glow-1 · accent-dark/glow-1 · muted/glow-1 · danger/glow-1
- Tambahkan pasangan khusus project (cth warna kupon, badge-new).

## 4. Checklist implementasi (untuk agent retheme — salin ke task-nya)
- [ ] Sinkron `app/globals.css` `:root` DAN `tailwind.config.js` `tokens` (nilai HARUS sama)
- [ ] Hardcode disamakan: shadow card/hero, `.ritual-panel` gradient+bayangan, `.bg-grid-fade`,
      `.foot-band`, `.animated-text`, `.glow-hero`, `Spotlight.jsx` (rgba), `ReviewSection.jsx` (avatar)
- [ ] Aksen sebagai TEKS link di bg terang → `accent-dark`, bukan `accent`
- [ ] Teks di panel gelap → putih (cek kontras)
- [ ] Semua angka kontras ≥4.5 tercatat di `docs/research/{{slug}}-palette-tone.md`

## 5. Cara pakai script
```bash
# Ubah nilai di bagian CONFIG script, lalu:
node docs/templates/scripts/contrast-check.js
# atau tempel isi script ke terminal node -e "..."
```