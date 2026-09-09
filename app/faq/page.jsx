import { Breadcrumb } from "../../components/ui/Chrome";

export const metadata = { title: "FAQ — Mismi" };

const FAQS = [
  { q: "How long does shipping take?", a: "It depends on the official store you order from (usually 1–3 working days for Jabodetabek, 3–7 days for other islands). This demo doesn’t process orders." },
  { q: "Can I return or exchange?", a: "It follows the return policy of the Mismi official store you bought from. Keep the packaging & receipt for exchanges." },
  { q: "Why does each product have color variants?", a: "Every SKU is a bag model with certain color options (e.g. Pink, Cream, Khaki, Black). Just pick your favorite shade — no S/M/L sizing needed." },
  { q: "What about materials & quality?", a: "Fabric details (corduroy, canvas, PU, etc.), dimensions and specs are shown on each product page when available in the official listing." },
  { q: "How do I place an order?", a: "Add a product to your cart, then checkout. QRIS payment in the demo is a simulation — no real money moves." },
  { q: "Are the prices final?", a: "Prices in the demo catalog are provisional (they follow the official listing promo at collection time). Confirm with the official store for final orders." },
  { q: "Where can I buy authentic products?", a: "Mismi’s official stores: Tokopedia (mismiofficial), Shopee (mismi.official), Lazada (mismi-bags), TikTok (@mismi.id), and Instagram (@mismi.official)." },
];

export default function FaqPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
      <h1 style={{ margin: "4px 0 0" }}>Frequently Asked Questions</h1>
      <div className="section-head"><h2>All about products &amp; shopping</h2></div>
      {FAQS.map((f) => (
        <details className="acc" key={f.q}>
          <summary>{f.q}</summary>
          <div className="acc-body">{f.a}</div>
        </details>
      ))}
    </>
  );
}