import { Breadcrumb } from "../../components/ui/Chrome";

export const metadata = { title: "FAQ — Mismi" };

const FAQS = [
  { q: "Berapa lama pengiriman?", a: "Tergantung official store tempat order (umumnya 1–3 hari kerja untuk Jabodetabek, 3–7 hari luar pulau). Demo ini tidak memproses pesanan." },
  { q: "Apakah bisa retur?", a: "Mengikuti kebijakan retur official store Mismi tempat kamu membeli. Simpan kemasan & struk untuk proses penukaran." },
  { q: "Kenapa tiap produk punya varian warna?", a: "Setiap SKU adalah model tas dengan pilihan warna tertentu (cth Pink, Cream, Khaki, Hitam). Pilih warna sesuai selera — tanpa perlu pilih ukuran S/M/L." },
  { q: "Bahan & kualitas produk bagaimana?", a: "Detail bahan (korduroi, kanvas, PU, dll), ukuran, dan spesifikasi ditampilkan di halaman detail tiap produk bila tersedia di listing resmi." },
  { q: "Bagaimana cara order?", a: "Tambah produk ke keranjang lalu checkout. Pembayaran QRIS di demo bersifat simulasi — tidak ada uang berpindah." },
  { q: "Apakah harga final?", a: "Harga di katalog demo bersifat provisional (mengikuti promo listing resmi saat pengambilan data). Konfirmasi ke official store untuk order final." },
  { q: "Di mana bisa beli produk asli?", a: "Official store Mismi: Tokopedia (mismiofficial), Shopee (mismi.official), Lazada (mismi-bags), TikTok (@mismi.id), dan Instagram (@mismi.official)." },
];

export default function FaqPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
      <h1 style={{ margin: "4px 0 0" }}>Pertanyaan Sering Ditanya</h1>
      <div className="section-head"><h2>Seputar produk &amp; belanja</h2></div>
      {FAQS.map((f) => (
        <details className="acc" key={f.q}>
          <summary>{f.q}</summary>
          <div className="acc-body">{f.a}</div>
        </details>
      ))}
    </>
  );
}