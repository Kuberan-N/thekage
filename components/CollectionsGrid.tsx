"use client";

import Link from "next/link";
import Image from "next/image";
import { type Category } from "@/types/category";

type Props = {
  categories: Category[];
};

const COLLECTION_IMAGES: Record<string, string> = {
  "oversized-terry": "/collection-oversized.png",
  "luxe-acid-wash": "/collection-acidwash.png",
};

export default function CollectionsGrid({ categories }: Props) {
  // Filter out 'best-sellers' — it's a virtual category, not a collection
  const collections = categories.filter((c) => c.slug !== "best-sellers");

  if (collections.length === 0) return null;

  return (
    <section className="px-4 md:px-8 py-8 md:py-14 max-w-screen-xl mx-auto">
      <h2 className="text-[15px] md:text-lg font-bold tracking-tight text-black uppercase mb-5">
        Collections
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {collections.map((collection, i) => {
          const bgImage = COLLECTION_IMAGES[collection.slug] || "/collection-oversized.png";
          return (
            <Link
              key={collection.id}
              href={`/category/${collection.slug}`}
              className={`group relative overflow-hidden rounded-2xl ${
                i === 0 && collections.length % 2 !== 0
                  ? "md:col-span-2 aspect-[2/1]"
                  : "aspect-[4/3]"
              }`}
            >
              <Image
                src={bgImage}
                alt={collection.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight uppercase">
                  {collection.name}
                </h3>
                <span className="mt-3 text-white/80 text-[11px] font-medium tracking-[0.2em] uppercase border-b border-white/40 pb-0.5 group-hover:border-white/70 transition-colors">
                  Explore
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
