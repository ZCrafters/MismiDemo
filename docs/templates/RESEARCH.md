# RESEARCH.md — Template Riset Brand (Sekali Jalan, Output Terstruktur)

> **Cara pakai:** untuk project baru, salin file ini → ikuti checklist → isi hasilnya ke
> `docs/research/{{slug}}-{{YYYY-MM-DD}}.md` (satu file riset utama). Dari situ, turunkan
> dua dokumen turunan dengan template lain: **DESIGN.md** (warna) dan **COPY-STYLE.md** (tone).
> Target: setelah riset ini, agent pembangun TIDAK perlu riset ulang — semua sudah di sini.

## 1. Identitas brand (isi dari link yang dikirim user / pencarian)
- [ ] Nama brand & cara penulisan yang benar (mis. "Suur Lemoen", "Mismi")
- [ ] Jenis produk & kategori utama (minuman, tas, skincare, fashion…)
- [ ] Tagline / slogan resmi (kutip persis — jangan diterjemahkan dulu)
- [ ] Deskripsi resmi dari toko/sosmed (1-2 kalimat, kutip)
- [ ] Asal & jangkauan (kota, "worldwide shipping", dll)
- [ ] Target audiens & gaya (korean cute, premium, playful, minimalis…)

## 2. Peta toko resmi (sheet "Sumber" Excel nanti)
| Marketplace | Username/Shop ID | Link | Rating (jika ada) |
|---|---|---|---|
| Shopee | | | |
| Tokopedia | | | |
| Lazada | | | |
| TikTok | | | |
| Instagram | | | |
| Lainnya (Blibli, dll) | | | |

- [ ] Status akses tiap marketplace: ok / anti-bot / perlu screenshot manual

## 3. Produk contoh (5-10 cukup untuk riset; kurasi penuh = langkah 1b WORKFLOW)
- [ ] Pola penamaan produk (cth `Mismi {Nama} Bag Tas {Tipe} Wanita … - {KodeVarian}`)
- [ ] Tabel: nama | tipe/kategori | harga | harga asli | %diskon | catatan
- [ ] Varian yang umum (warna: Pink/Cream/Hitam…? ukuran kemasan?)
- [ ] Bahan / spesifikasi khas (korduroi, kanvas, tahan air; madu murni, cuka apel…)
- [ ] Angka regulasi khas (BPOM/Halal untuk makanan — TIDAK untuk fashion; fashion = bahan & ukuran)

## 4. Warna & visual (→ DESIGN.md)
- [ ] Petunjuk warna dari identitas: emoji brand (🍒), nama seri (cth "Pink Series"), warna produk dominan
- [ ] Arah visual: pastel? bold? glow? dark?
- [ ] Catatan kontras awal (jangan hitung manual — pakai `docs/templates/scripts/contrast-check.js`)

## 5. Tone & copy (→ COPY-STYLE.md)
- [ ] 3-5 contoh copy asli brand (dari toko/sosmed) — kutip persis, tandai bahasanya (ID/EN)
- [ ] Vocab khas yang berulang ("gemes", "cantik", "muat banyak", "segar & sehat")
- [ ] Gaya: santai/formal? emoji? sapaan ("Happy shopping ♡", "Yuk order~")
- [ ] Hashtag resmi (jika ada)

## 6. Keluaran riset (simpan sebelum lanjut)
- [ ] `docs/research/{{slug}}-{{YYYY-MM-DD}}.md` — riset utama (semua di atas, ringkas)
- [ ] `docs/research/{{slug}}-palette-tone.md` — palet final + kontras terverifikasi (dari DESIGN.md)
- [ ] `docs/research/{{slug}}-copy-style.md` — style guide tone (dari COPY-STYLE.md) — opsional jika sama dengan template generik
- [ ] Token `{{TOKEN}}` di PROMPT.md / CONTEXT.md terisi dari riset ini

## Checklist "riset SELESAI"
- [ ] Agent pembangun bisa menjawab: siapa brandnya, produk apa, datanya dari mana, palet apa, tone bagaimana — tanpa buka marketplace lagi
- [ ] Semua harga/klaim yang dicontohkan punya sumber (URL/screenshot), tidak ada yang dikarang