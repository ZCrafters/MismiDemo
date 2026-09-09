"use client";
import { useState } from "react";
import { allCategories, categoryLabel } from "../../lib/products";
import {
  MenuIcon, CloseIcon, SearchIcon, GridIcon, TagIcon,
  StarIcon, ClockIcon, GiftIcon, HeartIcon, ShieldIcon, ChevronRightIcon,
} from "../ui/Icons";

// Drawer navigasi mobile ala menu ikon Sociolla (tanpa pilihan negara/login,
// disesuaikan katalog Mismi): search ringkas + grup Kategori, Promo &
// Kupon, Best Seller & Terbaru, Wishlist & Bantuan.
const QUICK = [
  { href: "/catalog?sale=1", icon: TagIcon, title: "Promo", desc: "Deals & special prices" },
  { href: "/catalog?sort=sold", icon: StarIcon, title: "Best Sellers", desc: "The most-loved picks" },
  { href: "/catalog?sort=new", icon: ClockIcon, title: "New In", desc: "Fresh arrivals" },
  { href: "/#kupon", icon: GiftIcon, title: "Coupons", desc: "Vouchers just for you" },
];

const HELP = [
  { href: "/wishlist", icon: HeartIcon, title: "Wishlist", desc: "Items you’ve saved" },
  { href: "/faq", icon: ShieldIcon, title: "FAQ & Help", desc: "Quick answers" },
  { href: "/about", icon: GridIcon, title: "About Mismi", desc: "Get to know the brand" },
];

function MenuRow({ href, icon: Ic, title, desc, onClose }) {
  return (
    <a href={href} className="mnav-item" onClick={onClose}>
      <span className="mnav-ic" aria-hidden="true"><Ic size={20} /></span>
      <span className="mnav-tx">
        <strong>{title}</strong>
        <small>{desc}</small>
      </span>
      <ChevronRightIcon size={18} aria-hidden="true" />
    </a>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <button className="icon-btn hamburger" aria-label="Buka menu" aria-expanded={open} onClick={() => setOpen(true)}>
        <MenuIcon />
      </button>
      <div className={`mobile-nav${open ? " open" : ""}`} aria-hidden={!open}>
        <div className="search-scrim" onClick={close} />
        <div className="mobile-panel" role="dialog" aria-label="Navigation menu">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>mismi.</strong>
            <button className="icon-btn" aria-label="Close menu" onClick={close}>
              <CloseIcon />
            </button>
          </div>

          <form className="mnav-search" action="/catalog" method="get" role="search" onSubmit={close}>
            <SearchIcon size={18} aria-hidden="true" />
            <input type="search" name="q" placeholder="Search: sling bags, ransel, tote bags…" aria-label="Search products" autoComplete="off" />
          </form>

          <p className="mnav-label">Shop</p>
          <MenuRow href="/catalog" icon={GridIcon} title="All Products" desc="Browse the whole catalog" onClose={close} />
          {QUICK.map((m) => <MenuRow key={m.title} {...m} onClose={close} />)}

          <p className="mnav-label">Categories</p>
          {allCategories.map((c) => (
            <a key={c} href={`/catalog?cat=${c}`} className="mnav-cat" onClick={close}>
              {categoryLabel(c)}
              <ChevronRightIcon size={16} aria-hidden="true" />
            </a>
          ))}

          <p className="mnav-label">Account &amp; Help</p>
          {HELP.map((m) => <MenuRow key={m.title} {...m} onClose={close} />)}

          <div className="mobile-panel-footer">
            <p className="mnav-stores">
              Official store:{" "}
              <a href="https://shopee.co.id/mismi.official" target="_blank" rel="noreferrer" onClick={close}>Shopee</a>
              {" · "}
              <a href="https://www.tokopedia.com/mismiofficial" target="_blank" rel="noreferrer" onClick={close}>Tokopedia</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
