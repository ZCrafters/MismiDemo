"use client";
import { useWishlist } from "../../components/wishlist/Wishlist";
import { products } from "../../lib/products";
import { ProductCard } from "../../components/ui/ProductCard";
import Link from "next/link";

export default function WishlistClient() {
  const { slugs } = useWishlist();
  const items = slugs.map((s) => products.find((p) => p.slug === s)).filter(Boolean);
  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <strong>Your wishlist is still empty ♡</strong>
        <p className="meta">Save your favorites with the heart icon on any product card.</p>
        <Link className="btn" href="/catalog">Start shopping →</Link>
      </div>
    );
  }
  return (
    <section className="grid" style={{ marginTop: 14 }} aria-label="Wishlist">
      {items.map((p) => <ProductCard key={p.slug} p={p} />)}
    </section>
  );
}
