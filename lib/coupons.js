// Demo coupon/voucher data — shared by CouponStrip (home) & VoucherPopup.
// Codes & amounts are illustrative; real vouchers live at the official store only.
export const COUPONS = [
  { code: "MISMI10", title: "10% Off", desc: "Min. spend Rp150K at the official store", tone: "pink" },
  { code: "ONGKIRGRATIS", title: "Free Shipping", desc: "Claim at Mismi's official store", tone: "blue" },
  { code: "BARUMISMI", title: "Rp 20K Off", desc: "For new members only", tone: "pink" },
  { code: "PINKGIRL", title: "10% Off", desc: "For your cute everyday looks", tone: "sand" },
];

export const COUPON_TONES = {
  pink: "bg-glow-1/70 text-primary",
  blue: "bg-glow-2/70 text-primary",
  sand: "bg-glow-3/70 text-primary",
};
