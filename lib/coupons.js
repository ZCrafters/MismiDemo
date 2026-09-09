// Data kupon/voucher demo — dipakai bersama CouponStrip (home) & VoucherPopup.
// Kode & nominal adalah ilustrasi; voucher asli hanya di official store.
export const COUPONS = [
  { code: "MISMI10", title: "Voucher 10%", desc: "Min. belanja Rp150rb di official store", tone: "pink" },
  { code: "ONGKIRGRATIS", title: "Gratis Ongkir", desc: "Klaim di official store Mismi", tone: "blue" },
  { code: "BARUMISMI", title: "Potongan 20K", desc: "Khusus pengguna baru", tone: "pink" },
  { code: "PINKGIRL", title: "Voucher 10%", desc: "Untuk gaya cantik tiap hari", tone: "sand" },
];

export const COUPON_TONES = {
  pink: "bg-glow-1/70 text-primary",
  blue: "bg-glow-2/70 text-primary",
  sand: "bg-glow-3/70 text-primary",
};
