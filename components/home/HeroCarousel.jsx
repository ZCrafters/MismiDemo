"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { products } from "../../lib/products";
import { ChevronLeftIcon, ChevronRightIcon } from "../ui/Icons";

// Hero carousel (pola Sociolla, tema Glow Mismi): 3 slide auto-advance 6 dtk,
// pause saat hover; dot + panah; konten tetap terlihat tanpa JS (slide 1 statis
// di SSR). Auto-advance & tilt nonaktif saat prefers-reduced-motion.

const SLIDES = [
  {
    kicker: "TAS WANITA KOREAN-STYLE · OFFICIAL MISMI",
    title: "Cantik, ringan, buat tiap hari.",
    text: "Tas selempang, ransel & tote bag dengan desain manis — dari commute sampai hangout.",
    cta: "Belanja Sekarang",
    href: "/catalog",
    // Satu produk representatif per kategori (bukan 3 varian sama) supaya foto match copy-nya.
    pick: (ps) => {
      const cats = ["tas-selempang", "tas-ransel", "tote-bag"];
      const list = cats
        .map((c) => ps.find((p) => p.category === c && p.heroFlag) || ps.find((p) => p.category === c))
        .filter(Boolean);
      return list.length ? list : ps.filter((p) => p.heroFlag).slice(0, 3);
    },
  },
  {
    kicker: "SLING BAG FAVORIT",
    title: "Tas kecil, kepribadian besar.",
    text: "Sling bag korduroi & water resistant — muat HP, ringan, cocok buat gaya harian.",
    cta: "Lihat Sling Bag",
    href: "/catalog?cat=tas-selempang",
    pick: (ps) => {
      const list = ps.filter((p) => p.category === "tas-selempang").slice(0, 3);
      return list.length ? list : ps.filter((p) => p.heroFlag).slice(0, 3);
    },
  },
  {
    kicker: "BACKPACK & TOTE",
    title: "Sekolah, kerja, jalan-jalan.",
    text: "Ransel & tote yang muat banyak tapi tetap stylish — harga resmi official store.",
    cta: "Lihat Ransel & Tote",
    href: "/catalog?cat=tas-ransel",
    pick: (ps) => {
      const list = ps.filter((p) => p.category === "tas-ransel" || p.category === "tote-bag").slice(0, 3);
      return list.length ? list : ps.filter((p) => p.heroFlag).slice(0, 3);
    },
  },
];

const AUTOPLAY_MS = 6000;

export function HeroCarousel() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceRef = useRef(false);

  useEffect(() => {
    reduceRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (paused || reduceRef.current) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused]);

  const go = (n) => setIdx(((n % SLIDES.length) + SLIDES.length) % SLIDES.length);

  return (
    <section
      className="hero-banner glow-hero hero-carousel"
      aria-label="Koleksi unggulan"
      aria-roledescription="carousel"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="hero-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
        {SLIDES.map((s, i) => {
          const shots = s.pick(products);
          const active = i === idx;
          return (
            <div className="hero-slide" key={s.kicker} aria-hidden={!active} aria-label={`Slide ${i + 1} dari ${SLIDES.length}`}>
              <div className="glow-shots" aria-hidden="true">
                {shots.map((p) => (
                  <Image key={p.slug} className="glow-shot" src={p.images[0]} alt="" width={230} height={306} loading={i === 0 ? "eager" : "lazy"} />
                ))}
              </div>
              <div className="hero-copy">
                <p className="kicker">{s.kicker}</p>
                <h1>{s.title}</h1>
                <p>{s.text}</p>
                <a className="btn" href={s.href} tabIndex={active ? 0 : -1}>{s.cta} →</a>
              </div>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        className="hero-arrow hero-arrow-prev"
        aria-label="Slide sebelumnya"
        onClick={() => go(idx - 1)}
      >
        <ChevronLeftIcon size={20} />
      </button>
      <button
        type="button"
        className="hero-arrow hero-arrow-next"
        aria-label="Slide berikutnya"
        onClick={() => go(idx + 1)}
      >
        <ChevronRightIcon size={20} />
      </button>
      <div className="hero-dots" role="tablist" aria-label="Pilih slide">
        {SLIDES.map((s, i) => (
          <button
            key={s.kicker}
            type="button"
            role="tab"
            aria-selected={i === idx}
            aria-label={`Slide ${i + 1}: ${s.title}`}
            className={i === idx ? "on" : ""}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </section>
  );
}