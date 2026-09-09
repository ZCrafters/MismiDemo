import clsx from "clsx";
import { Spotlight, SpotLightItem } from "../ui/Spotlight";

// Horizontal promo cards (Sociolla Special Promo pattern, Mismi Glow theme).
// Server component — links + generic copy only, matching the demo disclaimer
// (no invented discount numbers; real promo prices live in the catalog/PDP).

const PROMOS = [
  { t: "Official store promo prices", d: "Live marketplace listings, T&Cs apply", href: "/catalog?sort=price-asc", tone: "pink" },
  { t: "Best-selling women’s bags", d: "Most loved, most wanted", href: "/catalog?sort=sold", tone: "blue" },
  { t: "Trending this week", d: "Sling bags everyone is eyeing", href: "/catalog?sort=sold", tone: "sand" },
  { t: "New Korean-style drops", d: "Fresh backpacks & totes from Mismi", href: "/catalog?sort=new", tone: "pink" },
  { t: "Slings & backpacks to love", d: "Cute designs, friendly prices", href: "/catalog?cat=tas-selempang", tone: "blue" },
  { t: "News & regular promos", d: "Join the newsletter down below", href: "/about", tone: "sand" },
];

const TONE = {
  pink: "bg-glow-1/70 text-primary",
  blue: "bg-glow-2/70 text-primary",
  sand: "bg-glow-3/70 text-primary",
};

const TICKET = (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 8a2 2 0 0 0 2-2h12a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H6a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4z" />
    <path d="M13 6v2M13 11v2M13 16v2" />
  </svg>
);

export function PromoCards() {
  return (
    <section aria-label="Promo singkat" className="mt-2">
      <div className="section-head">
        <h2>Special Promo</h2>
        <a href="/catalog">Lihat semua →</a>
      </div>
      <div className="bleed">
        <Spotlight className="flex gap-3 overflow-x-auto pb-1 scroll-center bleed-inset [scrollbar-width:none]" ProximitySpotlight CursorFlowGradient>
          {PROMOS.map((p) => (
            <SpotLightItem key={p.t} className="min-w-[170px] max-w-[210px] shrink-0 border-0">
              <a
                href={p.href}
                className={clsx(
                  "flex h-full min-h-20 w-full flex-col justify-between rounded-card p-3",
                  "text-xs font-semibold leading-snug transition-transform duration-200 hover:-translate-y-0.5",
                  TONE[p.tone]
                )}
              >
                <span className="opacity-80">{TICKET}</span>
                <span>
                  <span className="block line-clamp-1 font-display">{p.t}</span>
                  <span className="block line-clamp-2 font-normal opacity-80">{p.d}</span>
                </span>
              </a>
            </SpotLightItem>
          ))}
        </Spotlight>
      </div>
    </section>
  );
}