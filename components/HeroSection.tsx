"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[100dvh] md:h-[85vh] overflow-hidden -mt-14">
      {/* Background Image */}
      <Image
        src="/hero.png"
        alt="THE KAGE — Latest Drop"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 md:pb-20 px-4 text-center">
        <Link
          href="#shop"
          className="text-white text-[13px] font-medium tracking-[0.2em] uppercase border-b border-white/60 pb-0.5 hover:border-white transition-colors"
        >
          Shop now
        </Link>
      </div>
    </section>
  );
}
