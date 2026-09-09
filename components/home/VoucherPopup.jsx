"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { COUPONS } from "../../lib/coupons";
import { useToast } from "../ui/Toast";
import { CloseIcon } from "../ui/Icons";

const SEEN_KEY = "mismi-voucher-popup-v1";

// Modal voucher tengah layar: muncul sekali per sesi, HANYA di mobile
// (≤767px), dengan jeda 1.2 detik. Bisa disilang via X / scrim / Escape.
// SSR-aman: semua cek window/sessionStorage di dalam useEffect.
export function VoucherPopup() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const toast = useToast();
  const closeRef = useRef(null);
  const coupon = COUPONS[0];

  const dismiss = useCallback(() => {
    setOpen(false);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* mode memori */
    }
  }, []);

  useEffect(() => {
    let timer = null;
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return;
    } catch {
      /* abaikan */
    }
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    timer = setTimeout(() => {
      setOpen(true);
      setShown(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, dismiss ]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(coupon.code);
      toast(`Code copied: ${coupon.code}`);
    } catch {
      toast(`Code: ${coupon.code}`);
    }
  };

  if (!shown) return null;

  return (
    <div className={`vpop${open ? " open" : ""}`} aria-hidden={!open}>
      <div className="search-scrim" onClick={dismiss} />
      <div className="vpop-card" role="dialog" aria-modal="true" aria-label="A special voucher for you">
        <button ref={closeRef} type="button" className="icon-btn vpop-x" aria-label="Close popup" onClick={dismiss}>
          <CloseIcon />
        </button>
        <p className="vpop-kicker">Just for you</p>
        <p className="vpop-title">{coupon.title}</p>
        <p className="vpop-desc">{coupon.desc}</p>
        <p className="vpop-code" aria-label={`Voucher code ${coupon.code}`}>{coupon.code}</p>
        <div className="vpop-actions">
          <button type="button" className="btn" onClick={copy}>Copy Code</button>
          <a href="/#kupon" onClick={dismiss}>View all coupons →</a>
        </div>
        <p className="vpop-note">Illustrative demo — real vouchers live at the official store.</p>
      </div>
    </div>
  );
}
