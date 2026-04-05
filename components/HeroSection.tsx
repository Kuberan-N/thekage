"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[80dvh] md:h-[88vh] overflow-hidden -mt-[86px] bg-[#111]">
      {/* Full-width hero image */}
      <Link href="/category/luxe-acid-wash" className="block absolute inset-0">
        <Image
          src="/h1.png"
          alt="THE KAGE — Luxe Acidwashed Collection"
          fill
          priority
          sizes="100vw"
          className="object-contain object-center"
        />
      </Link>

      {/* Subtle bottom gradient for button legibility */}
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      {/* CTA Buttons — bottom center */}
      <div className="absolute bottom-6 md:bottom-10 left-0 right-0 flex items-center justify-center gap-3 px-6">
        <Link
          href="/category/luxe-acid-wash"
          className="flex-1 max-w-[180px] text-center px-5 py-3 bg-white text-black text-[11px] font-bold tracking-[0.15em] uppercase rounded-full hover:bg-gray-100 transition-colors active:scale-[0.97]"
        >
          Luxe Acidwashed
        </Link>
        <Link
          href="/#shop"
          className="flex-1 max-w-[140px] text-center px-5 py-3 bg-transparent text-white text-[11px] font-bold tracking-[0.15em] uppercase rounded-full border border-white/70 hover:bg-white/10 transition-colors active:scale-[0.97]"
        >
          Explore
        </Link>
      </div>
    </section>
  );
}
