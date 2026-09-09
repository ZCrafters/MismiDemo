import { Rating } from "../ui/ProductCard";
import { StarIcon } from "../ui/Icons";

const DUMMY_REVIEWS = [
  { name: "Ayu K.", initial: "A", color: "#a6125c", days: 12, title: "Adorable sling bag!", body: "This one is my absolute fave. Water-repellent, fits everything, and the soft colorway works with every outfit. Fast shipping, tidy packing.", verified: true },
  { name: "Dinda M.", initial: "D", color: "#b4135e", days: 27, title: "The corduroy tote is a win", body: "The bear print is too cute. Thick fabric, neat stitching — perfect for campus and weekend trips. The promo price is super reasonable too.", verified: true },
  { name: "Rani P.", initial: "R", color: "#3a1230", days: 41, title: "My go-to Korean backpack", body: "Genuinely Korean-look. Fits my laptop and books, comfy straps, and the design is so unique my friends keep asking about it.", verified: false },
];

export function ReviewSection({ product }) {
  return (
    <section aria-label="Customer reviews" style={{ marginTop: 32 }}>
      <div className="section-head">
        <h2>Customer Reviews</h2>
        <span className="meta">{product.reviews} reviews</span>
      </div>
      <div className="review-summary">
        <div>
          <span className="review-big">{product.rating.toFixed(1)}</span>
          <span className="stars" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} size={18} filled={i <= Math.round(product.rating)} />)}
          </span>
        </div>
        <Rating value={product.rating} reviews={product.reviews} size={14} />
      </div>
      <div className="review-list">
        {DUMMY_REVIEWS.map((r, i) => (
          <article className="review-item" key={i}>
            <span className="review-avatar" style={{ background: r.color }}>{r.initial}</span>
            <div className="review-body">
              <div className="review-meta">
                <strong>{r.name}</strong>
                {r.verified && <span className="badge-verified">Verified buyer</span>}
                <span className="meta">{r.days} days ago</span>
              </div>
              <div className="stars" aria-label={`Rating ${5 - (i % 2)} out of 5`}>
                {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} size={13} filled={s <= 5 - (i % 2)} />)}
              </div>
              <strong className="review-title">{r.title}</strong>
              <p>{r.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
