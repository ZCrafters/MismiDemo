export const metadata = { title: "Tentang Suur Lemoen", robots: { index: false } };

export default function About() {
  return (
    <>
      <p className="kicker" style={{ marginTop: 20 }}>TENTANG KAMI</p>
      <h1>Lemon segar, untuk hidup sehat yang mudah dijalani.</h1>
      <p style={{ maxWidth: "65ch" }}>
        Suur Lemoen adalah brand minuman sehat &amp; pangan alami asal Indonesia (clean eating) yang
        fokus pada buah lemon dan produk turunannya — sari lemon, cuka apel with the mother, cuka
        nanas, madu murni, minyak zaitun, teh herbal, hingga superfood. Seluruh produk 100% bahan
        alami, telah mengantongi sertifikasi Halal &amp; izin edar BPOM. Katalog demo ini mengambil
        data produk real dari official store Suur Lemoen di Tokopedia, Shopee, Lazada &amp; TikTok.
      </p>
      <p style={{ maxWidth: "65ch" }}>
        Didirikan tahun 2020 di bawah naungan PT Wanda Berkah Abadi, Suur Lemoen bermitra dengan
        ratusan petani lemon lokal di berbagai daerah Indonesia — dari hulu hingga hilir — agar
        kualitas terjaga dan harga tetap kompetitif.
      </p>
      <h2>Cara belanja</h2>
      <p style={{ maxWidth: "65ch" }}>Pilih produk di halaman detail → tambah ke keranjang → checkout 3 langkah (simulasi QRIS). Order final dilakukan di official store masing-masing marketplace.</p>
      <h2>Retur &amp; penukaran</h2>
      <p style={{ maxWidth: "65ch" }}>Ikuti kebijakan retur official store tempat kamu membeli. Untuk bantuan, hubungi via Instagram @suurlemoen.official.</p>
      <p><a className="btn" href="/catalog">Mulai Belanja →</a></p>
    </>
  );
}
