// Audit katalog Suur Lemoen -> suurlemoen/suurlemoen-katalog-audit.xlsx
// Sheet "Katalog": id, slug, nama, kategori, kemasan, harga, harga asli, %diskon,
// rating, terjual, BPOM, klaim, URL gambar, sourceUrl.
// Sheet "Ringkasan": ringkasan per kategori & token data.
import ExcelJS from "exceljs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "products.suurlemoen.json"), "utf-8"));
const OUT = path.join(__dirname, "..", "suurlemoen", "suurlemoen-katalog-audit.xlsx");

const wb = new ExcelJS.Workbook();
const ws = wb.addWorksheet("Katalog");
ws.columns = [
  { header: "id", key: "id", width: 6 },
  { header: "slug", key: "slug", width: 42 },
  { header: "nama", key: "name", width: 52 },
  { header: "kategori", key: "categoryLabel", width: 22 },
  { header: "kemasan", key: "pack", width: 18 },
  { header: "harga", key: "price", width: 12 },
  { header: "harga asli", key: "originalPrice", width: 12 },
  { header: "%diskon", key: "discountPercent", width: 9 },
  { header: "rating", key: "rating", width: 8 },
  { header: "terjual", key: "soldLabel", width: 10 },
  { header: "BPOM", key: "bpom", width: 22 },
  { header: "klaim", key: "claim", width: 70 },
  { header: "URL gambar", key: "image", width: 70 },
  { header: "sourceUrl", key: "sourceUrl", width: 80 },
];
for (const p of DATA) {
  ws.addRow({
    id: p.id, slug: p.slug, name: p.name, categoryLabel: p.categoryLabel, pack: p.pack,
    price: p.price, originalPrice: p.originalPrice || "", discountPercent: p.discountPercent || "",
    rating: p.rating || "", soldLabel: p.soldLabel || "", bpom: p.bpom || "",
    claim: p.claim || "", image: p.images?.[0] || "", sourceUrl: p.sourceUrl || "",
  });
}
ws.getRow(1).font = { bold: true };

const ws2 = wb.addWorksheet("Ringkasan");
ws2.columns = [{ header: "metrik", key: "m", width: 28 }, { header: "nilai", key: "v", width: 40 }];
const cats = {};
for (const p of DATA) cats[p.categoryLabel] = (cats[p.categoryLabel] || 0) + 1;
ws2.addRow({ m: "Total SKU", v: DATA.length });
ws2.addRow({ m: "Hero/Best Seller", v: DATA.filter((p) => p.heroFlag).length });
ws2.addRow({ m: "Jumlah kategori", v: new Set(DATA.map((p) => p.categoryLabel)).size });
for (const [k, v] of Object.entries(cats)) ws2.addRow({ m: `Kategori: ${k}`, v: `${v} SKU` });
ws2.addRow({ m: "Sumber", v: "Official store Tokopedia: suurlemoenid (diambil 2026-09-09)" });
ws2.getRow(1).font = { bold: true };

fs.mkdirSync(path.dirname(OUT), { recursive: true });
await wb.xlsx.writeFile(OUT);
console.log("Audit ditulis:", OUT);
