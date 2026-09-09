import { products, categoryLabel } from "../../../lib/products";
import { ProductCard } from "../../../components/ui/ProductCard";
import { Breadcrumb } from "../../../components/ui/Chrome";

export function generateStaticParams() {
  return [...new Set(products.map((p) => p.category))].map((slug) => ({ slug }));
}

// Slugs outside the categories → static 404 (not rendered at request time).
export const dynamicParams = false;

export default function Category({ params }) {
  const list = products.filter((p) => p.category === params.slug);
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: categoryLabel(params.slug) }]} />
      <h1 style={{ margin: "4px 0 0" }}>{categoryLabel(params.slug)} ({list.length})</h1>
      {list.length === 0 ? (
        <p>No SKUs in this category yet. <a href="/catalog">Back to the catalog →</a></p>
      ) : (
        <section className="grid" style={{ marginTop: 14 }}>
          {list.map((p) => <ProductCard key={p.slug} p={p} />)}
        </section>
      )}
    </>
  );
}
