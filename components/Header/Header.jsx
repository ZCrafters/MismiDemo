"use client";
import { allCategories } from "../../lib/products";
import { useWishlist } from "../wishlist/Wishlist";
import { HeartIcon, SearchIcon } from "../ui/Icons";
import { ExpandableSearch } from "./ExpandableSearch";
import { CartBadge } from "./CartBadge";
import { MobileNav } from "./MobileNav";
import { CountdownBar } from "../ui/CountdownBar";

// Sociolla-style header (adapted to the Glow Mismi theme): demo strip + promo
// strip + countdown (static, scrolls along) then a sticky nav bar with the
// wordmark, wide search (desktop), wishlist, cart, and category pills.
const SHORT_LABEL = {
  "tas-ransel": "Backpacks",
  "tote-bag": "Tote Bags",
  "tas-selempang": "Sling Bags",
};

function WishlistButton() {
  const { slugs } = useWishlist();
  return (
    <a className="icon-btn" href="/wishlist" aria-label={`Wishlist, ${slugs.length} produk`}>
      <HeartIcon size={22} />
      {slugs.length > 0 && <span className="cart-badge">{slugs.length > 99 ? "99+" : slugs.length}</span>}
    </a>
  );
}

export function Header() {
  return (
    <>
      <div className="top-strip">Educational demo — prices are provisional and follow the official store.</div>
      <a className="promo-strip" href="/catalog?sale=1">
        <span><strong>Official store promo prices</strong> · T&amp;Cs apply</span>
        <span className="promo-strip-cta">Shop deals →</span>
      </a>
      <CountdownBar />
      <header className="site-header">
        <nav className="nav" aria-label="Main navigation">
          <MobileNav />
          <a href="/" className="wordmark" aria-label="Mismi, home">mismi<span>.</span></a>
          <form className="head-search" action="/catalog" method="get" role="search">
            <SearchIcon size={18} aria-hidden="true" />
            <input name="q" type="search" placeholder="Search: sling bags, tote bags, backpacks…" aria-label="Search products" autoComplete="off" />
          </form>
          <div className="nav-right">
            <span className="mobile-search"><ExpandableSearch /></span>
            <WishlistButton />
            <CartBadge />
          </div>
        </nav>
        <nav className="cat-pills" aria-label="Product categories">
          <div className="cat-pills-track">
            <a className="cat-pill" href="/catalog">All</a>
            {allCategories.map((c) => (
              <a key={c} className="cat-pill" href={`/catalog?cat=${c}`}>
                {SHORT_LABEL[c] || c}
              </a>
            ))}
            <a className="cat-pill cat-pill-hot" href="/catalog?sale=1">Promo</a>
            <a className="cat-pill" href="/catalog?sort=sold">Best Sellers</a>
          </div>
        </nav>
      </header>
    </>
  );
}
