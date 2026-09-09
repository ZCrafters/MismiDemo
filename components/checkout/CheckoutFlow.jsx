"use client";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "../cart/CartProvider";
import { rupiah } from "../../lib/products";
import { QrisMark } from "../ui/Icons";

const SHIP = [
  { id: "reg", label: "Regular (2–4 days)", cost: 12000 },
  { id: "exp", label: "Express (1–2 days)", cost: 24000 },
  { id: "same", label: "Same-day (Jabodetabek)", cost: 35000 },
];

function Field({ label, error, children }) {
  return (
    <div className="field">
      <label>{label} {children}</label>
      {error && <span className="err" role="alert">⚠ {error}</span>}
    </div>
  );
}

function QrDummy({ seed }) {
  const cells = useMemo(() => {
    let h = 0;
    for (const c of seed) h = (h * 31 + c.charCodeAt(0)) % 997;
    return Array.from({ length: 225 }, (_, i) => (h * (i + 7) + i * i) % 3 !== 0);
  }, [seed ]);
  return (
    <svg className="qr" viewBox="0 0 15 15" role="img" aria-label="Kode QR QRIS simulasi">
      {cells.map((on, i) => (
        <rect key={i} x={i % 15} y={Math.floor(i / 15)} width={0.92} height={0.92} fill={on ? "#111" : "#fff"} />
      ))}
    </svg>
  );
}

export function CheckoutFlow() {
  const { items, subtotal, clear } = useCart();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ nama: "", hp: "", email: "", alamat: "", kota: "", kodepos: "" });
  const [errs, setErrs] = useState({});
  const [ship, setShip] = useState("reg");
  const [paid, setPaid] = useState(false);
  const [secs, setSecs] = useState(300);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(null);
  const [gift, setGift] = useState(false);
  const [giftNote, setGiftNote] = useState("");
  const orderId = useMemo(() => "MSM-" + Math.random().toString(36).slice(2, 8).toUpperCase(), []);
  const shipCost = SHIP.find((s) => s.id === ship)?.cost || 0;
  const discount = couponApplied?.type === "percent" ? Math.round(subtotal * couponApplied.value) : couponApplied?.type === "flat" ? couponApplied.value : 0;
  const giftCost = gift ? 5000 : 0;
  const total = Math.max(0, subtotal - discount) + shipCost + giftCost;

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    const COUPONS = { "MISMI10": { type: "percent", value: 0.1, label: "10% off" }, "BARUMISMI": { type: "flat", value: 20000, label: "Rp 20.000 off" } };
    if (COUPONS[code]) { setCouponApplied({ code, ...COUPONS[code] }); }
    else { setCouponApplied({ error: "Invalid coupon." }); }
  };

  useEffect(() => {
    if (step !== 3 || paid) return;
    if (secs <= 0) return;
    const t = setTimeout(() => setSecs((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [step, paid, secs ]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validAddress = (setIt = true) => {
    const e = {};
    if (form.nama.trim().length < 3) e.nama = "Enter recipient name (min. 3 letters).";
    if (!/^[+0-9][0-9() \-]{7,19}$/.test(form.hp.trim())) e.hp = "Phone number: 8–20 digits.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Invalid email.";
    if (form.alamat.trim().length < 10) e.alamat = "Full address: min. 10 characters.";
    if (!form.kota.trim()) e.kota = "Enter city / district.";
    if (!/^[0-9]{5}$/.test(form.kodepos.trim())) e.kodepos = "Postal code: 5 digits.";
    if (setIt) setErrs(e);
    return Object.keys(e).length === 0;
  };

  const validateField = (key) => {
    setErrs((prev) => ({ ...prev, [key]: validAddress(false) ? undefined : (() => {
      const e = {};
      if (form.nama.trim().length < 3) e.nama = "Enter recipient name (min. 3 letters).";
      if (!/^[+0-9][0-9() \-]{7,19}$/.test(form.hp.trim())) e.hp = "Phone number: 8–20 digits.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Invalid email.";
      if (form.alamat.trim().length < 10) e.alamat = "Full address: min. 10 characters.";
      if (!form.kota.trim()) e.kota = "Enter city / district.";
      if (!/^[0-9]{5}$/.test(form.kodepos.trim())) e.kodepos = "Postal code: 5 digits.";
      return e[key];
    })() }));
  };

  if (items.length === 0 && !paid)
    return (
      <div className="empty-cart">
        <strong>Your cart is empty ♡</strong>
        <a className="btn" href="/catalog">Start shopping →</a>
      </div>
    );

  if (paid)
    return (
      <div className="empty-cart" role="status">
        <p className="kicker">PAYMENT SUCCESSFUL (SIMULATION)</p>
        <h2 style={{ margin: 0 }}>Thank you, {form.nama.split(" ")[0] || "kak"}!</h2>
        <p>Order <strong>{orderId}</strong> · {rupiah(total)} via QRIS.</p>
        <p className="meta">This is a simulation — no money moves.</p>
        <a className="btn" href="/catalog">Shop again →</a>
      </div>
    );

  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  return (
    <>
      <div className="steps" aria-label="Checkout steps">
        {["Address", "Shipping", "Payment"].map((l, i) => (
          <span key={l} className={`step${step === i + 1 ? " active" : ""}${step > i + 1 ? " done" : ""}`}>
            <span className="dot">{step > i + 1 ? "✓" : i + 1}</span> {l}
          </span>
        ))}
      </div>
      <div className="progress" aria-hidden="true"><i style={{ width: `${(step / 3) * 100}%` }} /></div>

      <div className="co-grid">
        <div>
          {step === 1 && (
            <form noValidate onSubmit={(e) => { e.preventDefault(); if (validAddress()) { setStep(2); window.scrollTo(0, 0); } }}>
              <h2>Shipping address</h2>
              <Field label="Recipient name" error={errs.nama}>
                <input value={form.nama} onChange={set("nama")} onBlur={() => validateField("nama")} autoComplete="name" maxLength={100} aria-invalid={!!errs.nama} />
              </Field>
              <Field label="Phone number" error={errs.hp}>
                <input type="tel" value={form.hp} onChange={set("hp")} onBlur={() => validateField("hp")} inputMode="tel" placeholder="08…" aria-invalid={!!errs.hp} />
              </Field>
              <Field label="Email" error={errs.email}>
                <input type="email" value={form.email} onChange={set("email")} onBlur={() => validateField("email")} inputMode="email" placeholder="nama@email.com" aria-invalid={!!errs.email} />
              </Field>
              <Field label="Full address" error={errs.alamat}>
                <textarea value={form.alamat} onChange={set("alamat")} onBlur={() => validateField("alamat")} rows={3} maxLength={400} aria-invalid={!!errs.alamat} />
              </Field>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="City / district" error={errs.kota}>
                  <input value={form.kota} onChange={set("kota")} onBlur={() => validateField("kota")} aria-invalid={!!errs.kota} />
                </Field>
                <Field label="Postal code" error={errs.kodepos}>
                  <input value={form.kodepos} onChange={set("kodepos")} onBlur={() => validateField("kodepos")} inputMode="numeric" maxLength={5} placeholder="12345" aria-invalid={!!errs.kodepos} />
                </Field>
              </div>

              <div className="coupon-row">
                <label htmlFor="coupon" className="field-label">Promo code (simulated)</label>
                <div className="coupon-input">
                  <input id="coupon" type="text" value={coupon} onChange={(e) => setCoupon(e.target.value)}
                    placeholder="MISMI10 or BARUMISMI" autoComplete="off" />
                  <button className="btn btn-outline" type="button" onClick={applyCoupon}>Apply</button>
                </div>
                {couponApplied?.error && <span className="err" role="alert">⚠ {couponApplied.error}</span>}
                {couponApplied?.label && <span className="coupon-ok">✓ {couponApplied.code} — {couponApplied.label}</span>}
              </div>

              <label className="gift-toggle">
                <input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} />
                <span>Wrap as a gift (+ Rp 5,000)</span>
              </label>
              {gift && (
                <Field label="Gift note (optional)">
                  <input value={giftNote} onChange={(e) => setGiftNote(e.target.value)} maxLength={120} placeholder="Message for the recipient..." />
                </Field>
              )}

              <button className="btn" type="submit">Continue to shipping →</button>
            </form>
          )}
          {step === 2 && (
            <>
              <h2>Choose shipping</h2>
              <div style={{ display: "grid", gap: 10 }} role="radiogroup" aria-label="Shipping options">
                {SHIP.map((s) => (
                  <label key={s.id} className="check" style={{ border: "1px solid var(--color-line)", borderRadius: 10, padding: "0 14px" }}>
                    <input type="radio" name="ship" checked={ship === s.id} onChange={() => setShip(s.id)} />
                    <span style={{ flex: 1 }}>{s.label}</span><strong>{rupiah(s.cost)}</strong>
                  </label>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button className="btn btn-outline" onClick={() => setStep(1)}>← Back</button>
                <button className="btn" onClick={() => { setStep(3); window.scrollTo(0, 0); }}>Continue to payment →</button>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <h2>Pay via QRIS (simulated)</h2>
              <div className="qris-box">
                <QrisMark />
                <QrDummy seed={orderId + total} />
                <p className="countdown" aria-live="polite">Valid for {mm}:{ss}</p>
                <p style={{ margin: 0 }}><strong>{rupiah(total)}</strong> · Order {orderId}</p>
                <p className="meta" style={{ margin: 0 }}>Scan with any e-wallet / mobile banking. Simulation — nothing is charged.</p>
                <button className="btn" disabled={secs <= 0} onClick={() => { setPaid(true); clear(); window.scrollTo(0, 0); }}>
                  {secs <= 0 ? "Code expired" : "I have paid"}
                </button>
                {secs <= 0 && <button className="btn btn-outline" onClick={() => setSecs(300)}>Request new code</button>}
              </div>
              <button className="btn btn-outline" style={{ marginTop: 12 }} onClick={() => setStep(2)}>← Back</button>
            </>
          )}
        </div>
        <aside className="order-box" aria-label="Order summary">
          <h2>Summary ({items.reduce((n, i) => n + i.qty, 0)})</h2>
          {items.map((i) => (
            <div className="order-line" key={`${i.slug}-${i.size}-${i.color}`}>
              <span>{i.name} · {i.size} × {i.qty}</span><strong>{rupiah(i.price * i.qty)}</strong>
            </div>
          ))}
          <div className="order-line"><span>Subtotal</span><span>{rupiah(subtotal)}</span></div>
          {discount > 0 && <div className="order-line order-discount"><span>Discount {couponApplied.code}</span><span>− {rupiah(discount)}</span></div>}
          <div className="order-line"><span>Shipping</span><span>{step >= 2 ? rupiah(shipCost) : "—"}</span></div>
          {gift && <div className="order-line"><span>Gift wrap</span><span>{rupiah(giftCost)}</span></div>}
          <div className="order-line"><span>Total</span><strong>{rupiah(total)}</strong></div>
        </aside>
      </div>
    </>
  );
}
