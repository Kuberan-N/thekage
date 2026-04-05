"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[85dvh] md:h-[85vh] overflow-hidden -mt-[86px]">
      {/* Full-width landing image — no overlay, no text */}
      <Link href="/category/luxe-acid-wash" className="block absolute inset-0">
        <Image
          src="/landing.png"
          alt="THE KAGE — Luxe Acidwashed Collection"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </Link>

      {/* CTA Buttons — bottom center */}
      <div className="absolute bottom-8 md:bottom-12 left-0 right-0 flex items-center justify-center gap-3 px-4">
        <Link
          href="/category/luxe-acid-wash"
          className="px-6 py-3 bg-black text-white text-[12px] font-bold tracking-[0.15em] uppercase rounded-full hover:bg-gray-900 transition-colors active:scale-[0.97]"
        >
          Luxe Acidwashed
        </Link>
        <Link
          href="/#shop"
          className="px-6 py-3 bg-white text-black text-[12px] font-bold tracking-[0.15em] uppercase rounded-full hover:bg-gray-100 transition-colors active:scale-[0.97]"
        >
          Explore
        </Link>
      </div>
    </section>
  );
}
