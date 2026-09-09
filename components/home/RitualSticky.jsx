"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { products } from "../../lib/products";

// Adapted from ui-layouts `sticky-scroll` (MIT): 2-viewport pinned section —
// sticky headline panel shrinks as the pink panel slides over it.
// Mismi Glow theme + real catalog product photos. Respects reduced-motion
// (renders static without transforms).

const STEPS = [
  {
    no: "01",
    title: "Pick Your Style",
    desc: "Slings for daily, totes for roomy days, backpacks for school & work.",
    cat: "tas-selempang",
    cta: "Shop Sling Bags",
  },
  {
    no: "02",
    title: "Play with Shades",
    desc: "Choose corduroy, flower or checker to match your OOTD.",
    cat: "tote-bag",
    cta: "Shop Tote Bags",
  },
  {
    no: "03",
    title: "Ready to Go",
    desc: "Water-repellent & fits everything — from campus to weekend trips.",
    cat: "tas-ransel",
    cta: "Shop Backpacks",
  },
];

export function RitualSticky() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const scale1 = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, -2]);
  const scale2 = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  const steps = STEPS.map((s) => ({
    ...s,
    product: products.find((p) => p.category === s.cat) || products[0],
  }));

  return (
    <section ref={ref} aria-label="Your daily style with Mismi" className="ritual">
      <motion.div
        style={reduce ? undefined : { scale: scale1, rotate: rotate1 }}
        className="ritual-sticky"
      >
        <div className="bg-grid-fade" aria-hidden="true" />
        <p className="kicker">YOUR MISMI · 3 PICKS</p>
        <h2>Three styles, every day.</h2>
        <p>Simple, easy Mismi pairings — scroll to see the whole range.</p>
        <a className="btn" href="/catalog">Start from the catalog →</a>
      </motion.div>

      <motion.div
        style={reduce ? undefined : { scale: scale2 }}
        className="ritual-panel"
      >
        <div className="bg-grid-fade-dark" aria-hidden="true" />
        <h2>Pieces that go together</h2>
        <div className="ritual-steps">
          {steps.map((s) => (
            <a key={s.no} className="ritual-step" href={`/catalog?cat=${s.cat}`}>
              <span className="ritual-img">
                <Image
                  src={s.product.images[0]}
                  alt={s.product.name}
                  fill
                  sizes="(max-width: 768px) 30vw, 220px"
                  loading="lazy"
                />
              </span>
              <span className="ritual-no">{s.no}</span>
              <strong>{s.title}</strong>
              <span className="ritual-desc">{s.desc}</span>
              <span className="ritual-link">{s.cta} →</span>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}