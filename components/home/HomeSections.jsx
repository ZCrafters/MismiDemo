import Image from "next/image";
import { products } from "../../lib/products";
import { ProductCard } from "../ui/ProductCard";
import { Reveal } from "../motion/Reveal";
import { Spotlight, SpotLightItem } from "../ui/Spotlight";

const CATS = [
  { slug: "tas-selempang", label: "Sling Bags" },
  { slug: "tote-bag", label: "Tote Bags" },
  { slug: "tas-ransel", label: "Backpacks" },
];

export function CategoryGrid() {
  return (
    <section aria-label="Categories">
      <div className="section-head"><h2>Shop by Category</h2><a href="/catalog">View all →</a></div>
      <Reveal staggerChildren>
        <Spotlight className="cat-grid" ProximitySpotlight CursorFlowGradient>
          {CATS.map((c) => {
            const sample = products.find((p) => p.category === c.slug);
            return (
              <SpotLightItem key={c.slug}>
                <a className="cat-card h-full w-full" href={`/catalog?cat=${c.slug}`}>
                  {sample && <Image src={sample.images[0]} alt={c.label} fill sizes="(max-width: 768px) 50vw, 20vw" loading="lazy" />}
                  <span className="cat-label">{c.label}</span>
                </a>
              </SpotLightItem>
            );
          })}
        </Spotlight>
      </Reveal>
    </section>
  );
}

export function NewArrivals({ items }) {
  return (
    <section aria-label="New in">
      <div className="section-head"><h2>New In</h2><a href="/catalog?sort=new">View all →</a></div>
      <Reveal className="grid" staggerChildren>
        {items.map((p) => <ProductCard key={p.slug} p={p} />)}
      </Reveal>
    </section>
  );
}