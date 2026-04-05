"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[75dvh] md:h-[88vh] overflow-hidden -mt-[86px] bg-[#0a0a0a]">
      {/* Full-width hero — H1.jpg */}
      <Link href="/category/luxe-acid-wash" className="block absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="THE KAGE — Luxe Acidwashed Collection"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </Link>

      {/* Bottom gradient for button legibility */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

      {/* CTA Buttons */}
      <div className="absolute bottom-5 md:bottom-10 left-0 right-0 flex items-center justify-center gap-3 px-5">
        <Link
          href="/category/luxe-acid-wash"
          className="px-6 md:px-8 py-3 bg-white text-black text-[11px] md:text-[12px] font-bold tracking-[0.15em] uppercase rounded-full hover:bg-gray-100 transition-colors active:scale-[0.97]"
        >
          Luxe Acidwashed
        </Link>
        <Link
          href="/#shop"
          className="px-6 md:px-8 py-3 bg-transparent text-white text-[11px] md:text-[12px] font-bold tracking-[0.15em] uppercase rounded-full border border-white/60 hover:bg-white/10 transition-colors active:scale-[0.97]"
        >
          Explore
        </Link>
      </div>
    </section>
  );
}
