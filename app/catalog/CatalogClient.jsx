"use client";
import { useEffect, useState } from "react";
import { products, rupiah } from "../../lib/products";
import { ProductCard } from "../../components/ui/ProductCard";
import { ProductRow } from "../../components/ui/ProductRow";
import { FilterSidebar, SortDropdown } from "../../components/plp/Filters";
import { FilterBottomSheet } from "../../components/plp/FilterBottomSheet";
import { GridIcon, ListIcon } from "../../components/ui/Icons";

const PER_PAGE = 24;

function getQuery() {
  if (typeof window === "undefined") return new URLSearchParams();
  return new URLSearchParams(window.location.search);
}

export default function CatalogClient() {
  const [sp, setSp] = useState(() => new URLSearchParams());
  const [page, setPage] = useState(1);

  useEffect(() => {
    setSp(getQuery());
    setPage(1);
    const onPop = () => { setSp(getQuery()); setPage(1); };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const q = (sp.get("q") || "").toLowerCase();
  const cat = sp.get("cat") || "";
  // Checkbox groups submit repeated same-name params (size=S&size=M); other links
  // (sort dropdown, mobile tabs) build a single comma-joined value. Support both.
  const sizes = sp.getAll("size").flatMap((v) => v.split(",")).filter(Boolean);
  const colors = sp.getAll("color").flatMap((v) => v.split(",")).filter(Boolean);
  const max = parseInt(sp.get("max") || "", 10) || 0;
  const saleOnly = sp.get("sale") === "1";
  const sort = sp.get("sort") || "featured";
  const view = sp.get("view") === "list" ? "list" : "grid";

  let list = products.filter(
    (p) =>
      (!q || `${p.name} ${p.category}`.toLowerCase().includes(q)) &&
      (!cat || p.category === cat) &&
      (!sizes.length || sizes.some((s) => (p.sizes || []).includes(s))) &&
      (!colors.length || colors.some((c) => (p.colors || []).includes(c))) &&
      (!max || p.price <= max) &&
      (!saleOnly || p.discountPct > 0)
  );
  if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  if (sort === "sold") list = [...list].sort((a, b) => b.sold - a.sold);
  if (sort === "new") list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew) || b.id - a.id);
  if (sort === "name-asc") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "name-desc") list = [...list].sort((a, b) => b.name.localeCompare(a.name));

  const activeFilters = (cat ? 1 : 0) + sizes.length + colors.length + (max ? 1 : 0) + (saleOnly ? 1 : 0);
  const shown = list.slice(0, page * PER_PAGE);
  const current = { q: sp.get("q") || "", cat, size: sizes.join(","), color: colors.join(","), max: sp.get("max") || "", sale: saleOnly ? "1" : "", sort };

  return (
    // key: force a remount once the real query string is read from window.location on
    // mount (SSR/static export can't know it upfront). Without this, the uncontrolled
    // filter inputs (defaultChecked/defaultValue) hydrate blank and never catch up,
    // so the sidebar always looks reset even though the results above are filtered.
    <div className="plp" style={{ marginTop: 12 }} key={sp.toString()}>
      <FilterSidebar current={current} />
      <div>
        <form className="catalog-search" action="/catalog/" method="get" role="search">
          {cat && <input type="hidden" name="cat" value={cat} />}
          {sizes.map((s) => <input key={s} type="hidden" name="size" value={s} />)}
          <input type="hidden" name="sort" value={sort} />
          <input id="catalog-search" name="q" type="search" defaultValue={q}
            placeholder="Search: sling bags, backpacks, tote bags…" aria-label="Search products" />
        </form>
        <div className="plp-bar">
          <FilterBottomSheet current={current} count={activeFilters} />
          <span className="count" role="status">{list.length} products</span>
          <span className="view-toggle" role="group" aria-label="View">
            <a href={`/catalog/${q ? `?q=${q}&` : "?"}view=grid`} aria-current={view === "grid" || undefined} aria-label="Grid view"><GridIcon size={18} /></a>
            <a href={`/catalog/${q ? `?q=${q}&` : "?"}view=list`} aria-current={view === "list" || undefined} aria-label="List view"><ListIcon size={18} /></a>
          </span>
          <span style={{ marginLeft: "auto" }}><SortDropdown current={current} /></span>
        </div>
        {max ? <p className="meta">Max price: {rupiah(max)} · <a href="/catalog/">reset</a></p> : null}
        {shown.length ? (
          view === "list"
            ? <section className="rows" aria-label="Products">{shown.map((p) => <ProductRow key={p.slug} p={p} />)}</section>
            : <section className="grid" aria-label="Products">{shown.map((p) => <ProductCard key={p.slug} p={p} />)}</section>
        ) : (
          <div className="empty-cart">
            <strong>No results found.</strong>
            <p className="meta">Try a different keyword or filter.</p>
            <a className="btn" href="/catalog/">Reset filters</a>
          </div>
        )}
        {shown.length < list.length && (
          <p style={{ marginTop: 16 }}><button className="btn btn-outline" type="button" onClick={() => setPage((p) => p + 1)}>Load more ({list.length - shown.length} sisa) →</button></p>
        )}
      </div>
    </div>
  );
}
