import { ProductCard } from "../ui/ProductCard";
import { CarouselCursor } from "../motion/CarouselCursor";

export function RelatedCarousel({ items, category }) {
  if (!items.length) return null;
  return (
    <section aria-label="Similar products" style={{ marginTop: 32 }}>
      <div className="section-head"><h2>Similar Picks</h2><a href={`/catalog?cat=${category}`}>View all →</a></div>
      <CarouselCursor className="h-scroll">
        {items.map((r) => <ProductCard key={r.slug} p={r} />)}
      </CarouselCursor>
    </section>
  );
}
