"use client";

import Link from "next/link";
import Image from "next/image";
import { type Category } from "@/types/category";

type Props = {
  categories: Category[];
};

const COLLECTION_IMAGES: Record<string, string> = {
  "oversized-terry": "/terry.png",
  "luxe-acid-wash": "/acidwashed.png",
};

// Light neutral bg to match product-shot backgrounds
const COLLECTION_BG: Record<string, string> = {
  "oversized-terry": "#f0ede8",
  "luxe-acid-wash": "#1a1a1a",
};

export default function CollectionsGrid({ categories }: Props) {
  const collections = categories.filter((c) => c.slug !== "best-sellers");

  if (collections.length === 0) return null;

  return (
    <section className="px-4 md:px-8 py-6 md:py-12 max-w-screen-xl mx-auto">
      <h2 className="text-[15px] md:text-lg font-bold tracking-tight text-black uppercase mb-4 md:mb-6">
        Collections
      </h2>

      {/* Always 2-col, even on mobile — product shots look great side by side */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {collections.map((collection) => {
          const imgSrc = COLLECTION_IMAGES[collection.slug] || "/terry.png";
          const bgColor = COLLECTION_BG[collection.slug] || "#f5f5f5";
          return (
            <Link
              key={collection.id}
              href={`/category/${collection.slug}`}
              className="group relative overflow-hidden rounded-xl md:rounded-2xl aspect-[3/4]"
              style={{ backgroundColor: bgColor }}
            >
              {/* Product image — object-contain so full tee is visible */}
              <Image
                src={imgSrc}
                alt={collection.name}
                fill
                sizes="(max-width: 768px) 50vw, 40vw"
                className="object-contain p-3 md:p-6 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              {/* Bottom label overlay */}
              <div className="absolute bottom-0 left-0 right-0 px-3 md:px-5 py-3 md:py-4 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-white text-[13px] md:text-lg font-bold tracking-tight uppercase leading-tight">
                  {collection.name}
                </h3>
                <span className="text-white/70 text-[10px] md:text-[11px] font-medium tracking-[0.18em] uppercase">
                  Shop now →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
