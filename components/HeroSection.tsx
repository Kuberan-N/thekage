"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[85dvh] md:h-[85vh] overflow-hidden -mt-[86px]">
      {/* Background Image */}
      <Image
        src="/hero.png"
        alt="THE KAGE — Premium Anime Streetwear"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-24 px-4 text-center">
        <h1 className="text-white text-3xl md:text-5xl font-black tracking-tight uppercase leading-tight mb-4 animate-slide-up">
          Wear the<br />Culture
        </h1>

        <p className="text-white/60 text-[13px] md:text-[14px] max-w-sm mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Oversized fits. Acid-wash finishes. Limited drops designed for the bold.
        </p>

        <Link
          href="#shop"
          className="px-8 py-3 bg-white text-black text-[12px] font-bold tracking-[0.15em] uppercase rounded-full hover:bg-gray-100 transition-colors animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          Shop the Drop
        </Link>
      </div>
    </section>
  );
}
