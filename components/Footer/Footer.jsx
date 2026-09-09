"use client";
import { useState } from "react";
import { AnimatedText } from "../ui/AnimatedText";

const PAY = ["VISA", "Mastercard", "GoPay", "OVO", "DANA", "Transfer Bank"];

const COLS = [
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "How to shop", href: "/about" },
      { label: "Shipping info", href: "/about" },
      { label: "Returns & exchanges", href: "/about" },
      { label: "Contact us", href: "/about" },
    ],
  },
  {
    title: "About Mismi",
    links: [
      { label: "Our brand", href: "/about" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "New launches", href: "/catalog?sort=new" },
    ],
  },
  {
    title: "Official Store",
    blank: true,
    links: [
      { label: "Tokopedia", href: "https://www.tokopedia.com/mismiofficial" },
      { label: "Shopee", href: "https://shopee.co.id/mismi.official" },
      { label: "Lazada", href: "https://www.lazada.co.id/shop/mismi-bags" },
      { label: "TikTok Shop", href: "https://www.tiktok.com/@mismi.id" },
    ],
  },
  {
    title: "Social Media",
    blank: true,
    links: [
      { label: "Instagram", href: "https://www.instagram.com/mismi.official" },
      { label: "TikTok", href: "https://www.tiktok.com/@mismi.id" },
    ],
  },
];

// Footer panel in the style of ui-layouts `hover-footer` (MIT), adapted to the Glow theme:
// band + newsletter pill + link columns + giant gradient wordmark that follows
// the cursor + payment chips. Newsletter logic still belongs to Mismi.
export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr("Please enter a valid email address.");
      return;
    }
    setErr("");
    setDone(true);
  };
  return (
    <footer className="site-footer footer-mcp">
      <div className="foot-panel">
        <div className="foot-band">
          <div className="foot-band-brand">
            <p className="foot-wordmark" aria-label="Mismi">mismi<span>.</span></p>
            <p className="foot-tagline">Cute Korean-style bags — for crushes, commutes &amp; the cutest days 🍒</p>
          </div>
          <div className="foot-news">
            <p className="foot-news-title">Get news &amp; promos</p>
            {done ? (
              <p className="foot-news-done" role="status">Thanks! Your email is in.</p>
            ) : (
              <form className="foot-news-form" onSubmit={submit} noValidate>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  aria-label="Email address"
                  aria-invalid={err ? "true" : undefined}
                />
                <button className="btn" type="submit">Join</button>
              </form>
            )}
            {err && <p className="foot-news-err" role="alert">{err}</p>}
            <div className="pay-grid" aria-label="Payment methods">
              {PAY.map((p) => <span key={p} className="pay-chip">{p}</span>)}
              <span className="pay-chip">QRIS</span>
            </div>
          </div>
        </div>

        <nav className="foot-cols" aria-label="Footer navigation">
          {COLS.map((c) => (
            <div key={c.title}>
              <h3>{c.title}</h3>
              {c.links.map((l) => (
                <a key={l.label} href={l.href} {...(c.blank ? { target: "_blank", rel: "noreferrer" } : {})}>
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </nav>

        <AnimatedText text="mismi" className="foot-giant" />

        <div className="foot-bottom">© 2026 Mismi demo · Prices &amp; stock follow the official store · #MoveEasyBeMismi</div>
      </div>
    </footer>
  );
}