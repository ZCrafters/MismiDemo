import { GridIcon, TagIcon, StarIcon, ClockIcon, GiftIcon } from "../ui/Icons";

// Baris shortcut ikon ala homepage mobile Sociolla — tampil HANYA di mobile
// (class .mshort disembunyikan ≥768px; desktop sudah punya pill kategori).
const SHORTCUTS = [
  { href: "/catalog", icon: GridIcon, label: "Categories" },
  { href: "/catalog?sale=1", icon: TagIcon, label: "Promo" },
  { href: "/catalog?sort=sold", icon: StarIcon, label: "Best Sellers" },
  { href: "/catalog?sort=new", icon: ClockIcon, label: "New" },
  { href: "/#kupon", icon: GiftIcon, label: "Coupons" },
];

export function MobileShortcuts() {
  return (
    <nav className="mshort" aria-label="Quick access">
      {SHORTCUTS.map((s) => (
        <a key={s.label} href={s.href} className="mshort-item">
          <span className="mshort-ic" aria-hidden="true"><s.icon size={22} /></span>
          <span>{s.label}</span>
        </a>
      ))}
    </nav>
  );
}
