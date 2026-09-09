// Kontras WCAG AA checker — reusable untuk semua project.
// Cara pakai: ganti nilai di CONFIG (hex tanpa '#') lalu `node docs/templates/scripts/contrast-check.js`
// Semua pasangan harus >= 4.5:1 (teks normal) / >= 3:1 (teks besar).
const CONFIG = {
  // Token project (contoh: palet "Cherry Cute" Mismi — ganti sesuai brand)
  bg: "fdf6f4",
  surface: "ffffff",
  ink: "43252f",
  muted: "7d5b66",
  primary: "8a1e4a",
  accent: "d6247a",
  accentInk: "ffffff",
  accentDark: "a3005c",
  badge: "c2185b",
  danger: "c2185b",
  star: "b45309",
  success: "166534",
  glow1: "fdeef1",
  glow2: "fef6f4",
  glow3: "fffaf9",
  panelDark: "4a1229",
};

// Pasangan yang dicek: [nama, fg, bg] — nama token mengacu ke CONFIG
const PAIRS = [
  ["ink / bg", "ink", "bg"],
  ["muted / bg", "muted", "bg"],
  ["primary / bg", "primary", "bg"],
  ["accent-dark / bg", "accentDark", "bg"],
  ["danger / bg", "danger", "bg"],
  ["star / bg", "star", "bg"],
  ["ink / surface", "ink", "surface"],
  ["muted / surface", "muted", "surface"],
  ["primary / surface", "primary", "surface"],
  ["accent-dark / surface", "accentDark", "surface"],
  ["white / accent", "ffffff", "accent"],
  ["accent-ink / accent", "accentInk", "accent"],
  ["white / primary", "ffffff", "primary"],
  ["white / badge", "ffffff", "badge"],
  ["white / panel gelap", "ffffff", "panelDark"],
  ["primary / glow-1", "primary", "glow1"],
  ["accent-dark / glow-1", "accentDark", "glow1"],
  ["muted / glow-1", "muted", "glow1"],
  ["danger / glow-1", "danger", "glow1"],
];

const lum = (h) => {
  // Terima dengan atau tanpa '#' — channel diambil dari posisi 0/2/4.
  h = h.replace(/^#/, "");
  const c = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

let fail = 0;
for (const [name, fgKey, bgKey] of PAIRS) {
  const fg = CONFIG[fgKey] ?? fgKey; // hex mentah juga bisa langsung
  const bg = CONFIG[bgKey] ?? bgKey;
  const r = ratio(fg, bg);
  const ok = r >= 4.5;
  if (!ok) fail++;
  console.log(`${ok ? "✅" : "❌"} ${name.padEnd(24)} ${r.toFixed(2)}${ok ? "" : "  <-- GAGAL"}`);
}
console.log(fail === 0 ? "\nSemua pasangan lolos WCAG AA (>=4.5)." : `\n${fail} pasangan GAGAL — perbaiki nilai di CONFIG.`);
process.exit(fail === 0 ? 0 : 1);