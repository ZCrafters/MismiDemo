import { promoProducts } from "../../lib/products";
import { ProductCard } from "../ui/ProductCard";
import { Reveal } from "../motion/Reveal";

// Section promo berperiode ala referensi: banner + tab + grid promo + tanggal periode.
export function PromoPeriod() {
  if (!promoProducts.length) return null;
  return (
    <section aria-label="Promo" id="promo" style={{ marginTop: 36 }}>
      <a className="promo-frame" href="/catalog?sort=price-asc" aria-label="Official promo prices, see catalog">
        <span className="promo-frame-title">OFFICIAL STORE PROMO PRICES</span>
        <span className="promo-frame-date">Promo period — T&amp;Cs apply</span>
        <span className="promo-frame-note">Prices shown are Mismi&rsquo;s live official store listings.</span>
      </a>
      <div className="pills" role="navigation" aria-label="Promo tabs">
        <a className="pill" href="#promo" aria-current="page">Promo Prices</a>
        <a className="pill" href="/catalog?sort=sold">Best Sellers</a>
        <a className="pill" href="/catalog?sort=new">New In</a>
        <a className="pill" href="/catalog?sort=price-asc">Lowest Price</a>
      </div>
      <div className="section-head">
        <div>
          <h2>On Sale</h2>
          <p className="meta" style={{ margin: "2px 0 0" }}>Official store promo prices — can change anytime.</p>
        </div>
        <a href="/catalog">View all →</a>
      </div>
      <Reveal className="grid grid-5" staggerChildren>
        {promoProducts.map((p) => <ProductCard key={p.slug} p={p} />)}
      </Reveal>
    </section>
  );
}
