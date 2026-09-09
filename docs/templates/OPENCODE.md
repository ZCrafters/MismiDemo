# OPENCODE.md — Task untuk Agent Scraping (OpenCode / Claude / Codebuff)

> **Cara pakai:** saat butuh koleksi data produk dari marketplace secara massal, jalankan agent
> (mis. `opencode`) dari root project dengan instruksi = file ini.
> Agent mengerjakan SATU hal: menulis data mentah ke `data/raw/`. Tidak lebih.
> Setelah selesai, verifikasi dengan `npm run audit:raw` (Excel mentah multi-sheet).

## Konteks singkat
- Project: demo website brand {{NAMA_BRAND}} ({{JENIS_PRODUK}}).
- Brand ini punya toko resmi di beberapa marketplace — daftar di bawah.
- Tujuan: kumpulkan {{N_SKU}} produk real (nama, harga, gambar, klaim) dari listing resmi
  untuk katalog demo. Data ini nanti direview di Excel & dikurasi oleh manusia/agent lain.

## Peta toko resmi (isi sebelum menjalankan)
- Shopee   : user {{USER_SHOPEE}} — {{LINK_SHOPEE}}
- Tokopedia: user {{USER_TOKOPEDIA}} — {{LINK_TOKOPEDIA}}
- Lazada   : user {{USER_LAZADA}} — {{LINK_LAZADA}}
- TikTok   : @{{USER_TIKTOK}} — {{LINK_TIKTOK}}
- Instagram: @{{USER_IG}} — {{LINK_IG}}

## Output yang diminta
Tulis SATU file JSON per marketplace ke `data/raw/`:
`data/raw/shopee.json`, `data/raw/tokopedia.json`, `data/raw/lazada.json`, dst.
Setiap file = ARRAY objek dengan skema:

```json
{
  "name": "Nama produk persis dari listing",
  "price": 45030,
  "originalPrice": 240000,
  "discountPercent": 81,
  "rating": 4.9,
  "soldCount": 1200,
  "soldLabel": "1,2rb+",
  "bpom": "",
  "claim": "Ringkasan klaim/deskripsi dari listing (maks 300 char)",
  "category": "tas-selempang",
  "pack": "S",
  "colors": ["Hitam", "Pink"],
  "images": ["https://..."],
  "sourceUrl": "https://...",
  "source": "shopee",
  "provisional": true
}
```

## Aturan
1. **JANGAN mengarang** harga/klaim/stok/rating. Semua dari listing resmi, atau hasil pencarian
   Google atas produk resmi — kalau dari sumber kedua, tandai `"provisional": true`.
2. `price` wajib > 0; kalau harga tidak ditemukan, tulis `"price": 0` + `"note": "harga tidak
   ditemukan"` (item ini akan di-exclude saat kurasi).
3. `images[]` = URL gambar asli produk (dari marketplace / cache Google). Minimal 1 URL.
4. `sourceUrl` = link listing resmi. Jangan pakai link affiliate (utm/affiliate dibuang).
5. Target {{N_SKU}} produk UNIK (bukan per varian warna — varian cukup di `colors`).
6. Field yang tidak tersedia boleh `""` / `[]` / dihilangkan.
7. **Jangan menyentuh file lain** di project — hanya menulis ke `data/raw/`.

## Cara ambil data (urut prioritas)
1. PDP / halaman produk marketplace yang bisa diakses langsung (Tokopedia kadang jalan).
2. Halaman `find` / `list` / `search` marketplace (cth `tokopedia.com/find/...`) — ambil nama,
   harga, URL gambar dari kartu produk.
3. Hasil pencarian Google untuk `"{brand} {produk} harga"` → snippet + link produk resmi.
4. Kalau semua anti-bot: jangan memaksakan (tanpa bypass captcha) — laporkan di akhir pesan
   marketplace mana yang gagal + alasannya, dan sarankan user kirim screenshot PDP.

## Setelah selesai
- Laporkan ringkas: jumlah item per marketplace, marketplace yang gagal + alasan.
- Jangan jalankan `npm`/build/test apa pun. Selesai setelah `data/raw/*.json` ditulis.

## Verifikasi oleh agent lain
- `npm run audit:raw` → `{{FOLDER}}/{{slug}}-data-mentah.xlsx` (sheet per marketplace).
- Review Excel → kurasi → `data/products.{{slug}}.json` → `npm run validate` + `npm run audit`.