"use client";

import Link from "next/link";
import Image from "next/image";
import { type Product } from "@/types/product";
import { useState } from "react";

type Props = {
  products: Product[];
};

function ScrollCard({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);

  const imageUrl =
    Array.isArray(product.images) &&
    product.images.length > 0 &&
    product.images[0] !== ""
      ? product.images[0]
      : null;

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="shrink-0 w-[44vw] md:w-[260px] group"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">
        {imgError || !imageUrl ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        ) : (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 44vw, 260px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            onError={() => setImgError(true)}
          />
        )}
        {product.isBestSeller && (
          <span className="absolute top-2 left-2 bg-white text-[8px] font-bold uppercase tracking-wider px-1.5 py-1 text-black z-10">
            Best Seller
          </span>
        )}
      </div>
      <div className="mt-2">
        <h3 className="text-[12px] font-medium text-gray-900 leading-snug line-clamp-1">
          {product.name}
        </h3>
        <p className="text-[12px] font-semibold text-black mt-0.5">
          {formattedPrice}
        </p>
      </div>
    </Link>
  );
}

export default function BestSellerScroll({ products }: Props) {
  const bestSellers = products.filter((p) => p.isBestSeller);
  const displayProducts = bestSellers.length > 0 ? bestSellers : products.slice(0, 8);

  if (displayProducts.length === 0) return null;

  return (
    <section className="py-8 md:py-14">
      <div className="px-4 md:px-8 max-w-screen-xl mx-auto">
        <h2 className="text-[15px] md:text-lg font-bold tracking-tight text-black uppercase mb-5">
          Trending Now
        </h2>
      </div>

      <div className="relative">
        <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-3 md:gap-4 px-4 md:px-8 pb-2">
          {displayProducts.map((product) => (
            <ScrollCard key={product.id} product={product} />
          ))}
        </div>
        {/* Fade hint */}
        <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-white pointer-events-none" />
      </div>
    </section>
  );
}
