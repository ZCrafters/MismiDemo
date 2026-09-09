"use client";
import { useState } from "react";
import { AnimatedText } from "../ui/AnimatedText";

const PAY = ["VISA", "Mastercard", "GoPay", "OVO", "DANA", "Transfer Bank"];

const COLS = [
  {
    title: "Bantuan",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Cara belanja", href: "/about" },
      { label: "Info pengiriman", href: "/about" },
      { label: "Retur & penukaran", href: "/about" },
      { label: "Hubungi kami", href: "/about" },
    ],
  },
  {
    title: "Tentang Suur Lemoen",
    links: [
      { label: "Brand kami", href: "/about" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "New launch", href: "/catalog?sort=new" },
    ],
  },
  {
    title: "Official Store",
    blank: true,
    links: [
      { label: "Tokopedia", href: "https://www.tokopedia.com/suurlemoenid" },
      { label: "Shopee", href: "https://shopee.co.id/suurlemoen.id" },
      { label: "Lazada", href: "https://www.lazada.co.id/shop/suur-lemoen-id" },
      { label: "TikTok Shop", href: "https://www.tiktok.com/@suurlemoenofficial" },
    ],
  },
  {
    title: "Sosial Media",
    blank: true,
    links: [
      { label: "Instagram", href: "https://www.instagram.com/suurlemoen.official" },
      { label: "TikTok", href: "https://www.tiktok.com/@suurlemoenofficial" },
    ],
  },
];

// Footer panel ala ui-layouts `hover-footer` (MIT), diadaptasi ke tema Glow:
// pita + newsletter pil + kolom link + wordmark raksasa bergradien
// mengikuti kursor + chip pembayaran. Logika newsletter tetap milik Suur Lemoen.
export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr("Masukkan alamat email yang valid.");
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
            <p className="foot-wordmark" aria-label="Suur Lemoen">suur lemoen<span>.</span></p>
            <p className="foot-tagline">Minuman sehat &amp; pangan alami berbasis lemon Indonesia — segar, alami, tiap hari.</p>
          </div>
          <div className="foot-news">
            <p className="foot-news-title">Dapatkan info &amp; promo</p>
            {done ? (
              <p className="foot-news-done" role="status">Terima kasih! Email kamu terdaftar.</p>
            ) : (
              <form className="foot-news-form" onSubmit={submit} noValidate>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Alamat email"
                  aria-label="Alamat email"
                  aria-invalid={err ? "true" : undefined}
                />
                <button className="btn" type="submit">Daftar</button>
              </form>
            )}
            {err && <p className="foot-news-err" role="alert">{err}</p>}
            <div className="pay-grid" aria-label="Metode pembayaran">
              {PAY.map((p) => <span key={p} className="pay-chip">{p}</span>)}
              <span className="pay-chip">QRIS</span>
            </div>
          </div>
        </div>

        <nav className="foot-cols" aria-label="Navigasi footer">
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

        <AnimatedText text="suur lemoen" className="foot-giant" />

        <div className="foot-bottom">© 2026 Suur Lemoen demo · Harga &amp; stok mengikuti official store · #SehatDenganLemon</div>
      </div>
    </footer>
  );
}
