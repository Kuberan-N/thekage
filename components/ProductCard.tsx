"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { type Product } from "@/types/product";

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const [imgError, setImgError] = useState(false);

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(product.price);

  const imageUrl =
    Array.isArray(product.images) &&
    product.images.length > 0 &&
    product.images[0] !== ""
      ? product.images[0]
      : null;

  return (
    <div className="group flex flex-col">
      {/* ─── Image ─── */}
      <Link
        href={`/product/${product.slug}`}
        className="block relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100"
      >
        {imgError || !imageUrl ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300 gap-2">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span className="text-[9px] font-medium uppercase tracking-[0.2em]">
              Coming Soon
            </span>
          </div>
        ) : (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
            onError={() => setImgError(true)}
          />
        )}

        {/* Badge */}
        {product.isBestSeller && (
          <span className="absolute top-2 left-2 bg-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm text-black z-10">
            Best Seller
          </span>
        )}
      </Link>

      {/* ─── Info ─── */}
      <Link href={`/product/${product.slug}`} className="mt-2.5 block">
        <h3 className="text-[13px] font-medium text-gray-900 leading-snug line-clamp-2">
          {product.name}
        </h3>
      </Link>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-[13px] font-semibold text-black">
          {formattedPrice}
        </span>
        {typeof product.originalPrice === "number" &&
          product.originalPrice > product.price && (
            <span className="text-[11px] text-gray-400 line-through">
              ₹{product.originalPrice}
            </span>
          )}
      </div>
    </div>
  );
}