"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { products } from "../../lib/products";

// Diadaptasi dari ui-layouts `sticky-scroll` (MIT): section pin 2 viewport —
// panel headline sticky menyusut saat panel pink meluncur menutupinya.
// Tema Glow Mismi + foto produk katalog asli. Hormati reduced-motion
// (render statis tanpa transform).

const STEPS = [
  {
    no: "01",
    title: "Sling Bag",
    desc: "Tas kecil untuk hangout & commute — muat HP, ringan, manis dipakai.",
    cat: "tas-selempang",
    cta: "Lihat Sling Bag",
  },
  {
    no: "02",
    title: "Backpack",
    desc: "Ransel untuk sekolah, kerja & perjalanan — muat banyak, tetap stylish.",
    cat: "tas-ransel",
    cta: "Lihat Ransel",
  },
  {
    no: "03",
    title: "Tote Bag",
    desc: "Tas jinjing simpel yang menemani hari-harimu — dari belanja sampai kantor.",
    cat: "tote-bag",
    cta: "Lihat Tote Bag",
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
    <section ref={ref} aria-label="Gaya Mismi" className="ritual">
      <motion.div
        style={reduce ? undefined : { scale: scale1, rotate: rotate1 }}
        className="ritual-sticky"
      >
        <div className="bg-grid-fade" aria-hidden="true" />
        <p className="kicker">GAYA MISMI · 3 PILIHAN</p>
        <h2>Tiga gaya, tiap hari.</h2>
        <p>Padu padan tas Mismi yang simpel — scroll untuk lihat rangkaiannya.</p>
        <a className="btn" href="/catalog">Mulai dari Katalog →</a>
      </motion.div>

      <motion.div
        style={reduce ? undefined : { scale: scale2 }}
        className="ritual-panel"
      >
        <div className="bg-grid-fade-dark" aria-hidden="true" />
        <h2>Rangkaian yang saling melengkapi</h2>
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