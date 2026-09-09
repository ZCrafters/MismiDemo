import { products, bestSellers, newArrivals } from "../lib/products";
import { HeroCarousel } from "../components/home/HeroCarousel";
import { MobileShortcuts } from "../components/home/MobileShortcuts";
import { VoucherPopup } from "../components/home/VoucherPopup";
import { CategoryGrid, NewArrivals } from "../components/home/HomeSections";
import { BestSellerEmbla } from "../components/home/BestSellerEmbla";
import { PromoCards } from "../components/home/PromoCards";
import { CouponStrip } from "../components/home/CouponStrip";
import { RitualSticky } from "../components/home/RitualSticky";
import { PromoPeriod } from "../components/home/PromoPeriod";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <MobileShortcuts />
      <CouponStrip />
      <PromoCards />
      <CategoryGrid />
      <BestSellerEmbla items={bestSellers} />
      <RitualSticky />
      <PromoPeriod />
      <NewArrivals items={newArrivals} />
      <p className="meta" style={{ marginTop: 24 }}>
        Mismi — tas wanita cantik &amp; stylish asli Indonesia. {products.length} produk katalog demo · harga mengikuti official store.
      </p>
      <VoucherPopup />
    </>
  );
}
