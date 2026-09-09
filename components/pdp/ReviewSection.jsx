import { Rating } from "../ui/ProductCard";
import { StarIcon } from "../ui/Icons";

const DUMMY_REVIEWS = [
  { name: "Ayu K.", initial: "A", color: "#92610a", days: 12, title: "Segar, cocok buat rutinitas pagi", body: "Sudah langganan sari lemon & cuka apel. Diencerin air hangat tiap pagi, rasanya segar dan gak bikin perih. Kemasan rapi, kirim cepat.", verified: true },
  { name: "Dinda M.", initial: "D", color: "#47730d", days: 27, title: "Madu & cuka nanas juara", body: "Madu multiflora-nya manis alami, cuka nanas aromanya lembut gak nyengat. Cocok buat yang baru mulai rutinitas sehat.", verified: true },
  { name: "Rani P.", initial: "R", color: "#26331a", days: 41, title: "Teh herbal & olive oil andalan", body: "Teh rimpangnya hangat dan wangi rempah. Olive oil-nya murni, enak buat salad. Harga promo masuk akal.", verified: false },
];

export function ReviewSection({ product }) {
  return (
    <section aria-label="Ulasan pembeli" style={{ marginTop: 32 }}>
      <div className="section-head">
        <h2>Ulasan Pembeli</h2>
        <span className="meta">{product.reviews} ulasan</span>
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
                {r.verified && <span className="badge-verified">Pembelian terverifikasi</span>}
                <span className="meta">{r.days} hari lalu</span>
              </div>
              <div className="stars" aria-label={`Rating ${5 - (i % 2)} dari 5`}>
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
