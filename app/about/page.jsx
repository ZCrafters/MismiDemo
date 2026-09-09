export const metadata = { title: "Tentang Mismi", robots: { index: false } };

export default function About() {
  return (
    <>
      <p className="kicker" style={{ marginTop: 20 }}>TENTANG KAMI</p>
      <h1>Tas cantik, untuk hari-hari lucu.</h1>
      <p style={{ maxWidth: "65ch" }}>
        Mismi adalah brand tas wanita asal Indonesia dengan gaya Korean-style — tas selempang,
        tas ransel, dan tote bag yang manis, ringan, dan mudah dipadukan. Desainnya playful tapi
        tetap effortless: korduroi, kanvas, motif bunga, hingga model water resistant. Katalog
        demo ini mengambil data produk real dari official store Mismi di Tokopedia, Shopee,
        Lazada &amp; TikTok.
      </p>
      <p style={{ maxWidth: "65ch" }}>
        Dari Jakarta untuk seluruh Indonesia, Mismi hadir menemani crush, perjalanan, dan
        hari-hari cantikmu — move easy, be Mismi. ♡
      </p>
      <h2>Cara belanja</h2>
      <p style={{ maxWidth: "65ch" }}>Pilih produk di halaman detail → tambah ke keranjang → checkout 3 langkah (simulasi QRIS). Order final dilakukan di official store masing-masing marketplace.</p>
      <h2>Retur &amp; penukaran</h2>
      <p style={{ maxWidth: "65ch" }}>Ikuti kebijakan retur official store tempat kamu membeli. Untuk bantuan, hubungi via Instagram @mismi.official.</p>
      <p><a className="btn" href="/catalog">Mulai Belanja →</a></p>
    </>
  );
}