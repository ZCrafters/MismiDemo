// Data mentah per marketplace -> mismi/mismi-data-mentah.xlsx
// Baca SEMUA data/raw/*.json -> sheet per marketplace + sheet Ringkasan + sheet Sumber.
import ExcelJS from "exceljs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_DIR = path.join(__dirname, "..", "data", "raw");
const OUT = path.join(__dirname, "..", "mismi", "mismi-data-mentah.xlsx");

const files = fs.existsSync(RAW_DIR)
  ? fs.readdirSync(RAW_DIR).filter((f) => f.endsWith(".json")).sort()
  : [];
if (files.length === 0) {
  console.log("Tidak ada data/raw/*.json — jalankan agent scraping dulu (lihat docs/templates/OPENCODE.md).");
  process.exit(0);
}

const wb = new ExcelJS.Workbook();
const cols = [
  { header: "nama", key: "name", width: 60 },
  { header: "kategori", key: "category", width: 18 },
  { header: "pack", key: "pack", width: 12 },
  { header: "harga", key: "price", width: 12 },
  { header: "harga asli", key: "originalPrice", width: 12 },
  { header: "%diskon", key: "discountPercent", width: 9 },
  { header: "rating", key: "rating", width: 8 },
  { header: "terjual", key: "soldLabel", width: 10 },
  { header: "BPOM", key: "bpom", width: 20 },
  { header: "warna", key: "colors", width: 18 },
  { header: "klaim", key: "claim", width: 70 },
  { header: "URL gambar", key: "image", width: 70 },
  { header: "sourceUrl", key: "sourceUrl", width: 80 },
  { header: "note", key: "note", width: 24 },
];

const summary = [];
for (const f of files) {
  const mkt = f.replace(/\.json$/, "");
  const items = JSON.parse(fs.readFileSync(path.join(RAW_DIR, f), "utf-8"));
  const ws = wb.addWorksheet(`Katalog-${mkt}`);
  ws.columns = cols;
  for (const it of items) {
    ws.addRow({
      name: it.name,
      category: it.category || "",
      pack: it.pack || "",
      price: it.price,
      originalPrice: it.originalPrice || "",
      discountPercent: it.discountPercent || "",
      rating: it.rating || "",
      soldLabel: it.soldLabel || "",
      bpom: it.bpom || "",
      colors: (it.colors || []).join(", "),
      claim: it.claim || "",
      image: it.images?.[0] || "",
      sourceUrl: it.sourceUrl || "",
      note: it.note || "",
    });
  }
  ws.getRow(1).font = { bold: true };
  summary.push({ m: `Item ${mkt}`, v: items.length });
}

// Sheet Ringkasan
const ws2 = wb.addWorksheet("Ringkasan");
ws2.columns = [{ header: "metrik", key: "m", width: 28 }, { header: "nilai", key: "v", width: 40 }];
for (const s of summary) ws2.addRow(s);
ws2.addRow({ m: "Total item mentah", v: summary.reduce((a, s) => a + Number(s.v), 0) });
ws2.addRow({ m: "Diambil", v: "2026-09-09" });
ws2.getRow(1).font = { bold: true };

// Sheet Sumber: peta toko resmi
const ws3 = wb.addWorksheet("Sumber");
ws3.columns = [
  { header: "marketplace", key: "mp", width: 14 },
  { header: "user", key: "user", width: 22 },
  { header: "link", key: "link", width: 70 },
  { header: "status", key: "status", width: 30 },
];
const SOURCES = [
  { mp: "Shopee", user: "mismi.official (342985281)", link: "https://shopee.co.id/shop/342985281", status: "anti-bot — data dari snippet Google" },
  { mp: "Tokopedia", user: "mismiofficial + mismi", link: "https://www.tokopedia.com/mismiofficial", status: "anti-bot/timeout — data dari snippet Google" },
  { mp: "Lazada", user: "mismi-bags", link: "https://www.lazada.co.id/shop/mismi-bags", status: "anti-bot — data dari snippet Google" },
  { mp: "TikTok", user: "@mismi.id", link: "https://www.tiktok.com/@mismi.id", status: "belum diambil (konten sosial, bukan katalog)" },
  { mp: "Instagram", user: "mismi.official (82,3K)", link: "https://www.instagram.com/mismi.official", status: "belum diambil (konten sosial, bukan katalog)" },
];
for (const s of SOURCES) ws3.addRow(s);
ws3.getRow(1).font = { bold: true };

fs.mkdirSync(path.dirname(OUT), { recursive: true });
await wb.xlsx.writeFile(OUT);
console.log("Audit mentah ditulis:", OUT);