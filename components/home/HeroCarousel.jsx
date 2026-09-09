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
    kicker: "KOREAN STYLE EVERY DAY · OFFICIAL MISMI",
    title: "Cute bags for your everyday mood ♡",
    text: "Slings, totes & backpacks with a Korean touch — lovely fabrics, friendly prices, easy to mix and match.",
    cta: "Shop now",
    href: "/catalog",
    // One representative product per category (not 3 of the same) so the photo matches the copy.
    pick: (ps) => {
      const cats = ["tas-selempang", "tote-bag", "tas-ransel"];
      const list = cats
        .map((c) => ps.find((p) => p.category === c && p.heroFlag) || ps.find((p) => p.category === c))
        .filter(Boolean);
      return list.length ? list : ps.filter((p) => p.heroFlag).slice(0, 3);
    },
  },
  {
    kicker: "BEST SELLERS",
    title: "Our sling bags, adored.",
    text: "Carol, Vida & Xora — water-repellent, fits everything, and the cutest little designs.",
    cta: "Shop best sellers",
    href: "/catalog?sort=sold",
    pick: (ps) => {
      const list = ps.filter((p) => p.category === "tas-selempang").slice(0, 3);
      return list.length ? list : ps.filter((p) => p.heroFlag).slice(0, 3);
    },
  },
  {
    kicker: "NEW IN",
    title: "Korean backpacks, ready to go.",
    text: "Ursule, Kyra & Aria — flower prints, laptop-ready, for school & weekend trips.",
    cta: "Shop backpacks",
    href: "/catalog?cat=tas-ransel",
    pick: (ps) => {
      const list = ps.filter((p) => p.category === "tas-ransel").slice(0, 3);
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
      aria-label="Featured collection"
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
        aria-label="Previous slide"
        onClick={() => go(idx - 1)}
      >
        <ChevronLeftIcon size={20} />
      </button>
      <button
        type="button"
        className="hero-arrow hero-arrow-next"
        aria-label="Next slide"
        onClick={() => go(idx + 1)}
      >
        <ChevronRightIcon size={20} />
      </button>
      <div className="hero-dots" role="tablist" aria-label="Choose a slide">
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