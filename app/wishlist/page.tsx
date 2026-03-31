"use client";

import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/Toast";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" className="mb-4">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
        </svg>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h1>
        <p className="text-sm text-gray-500 mb-6">
          Save items you love to buy them later.
        </p>
        <Link
          href="/"
          className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-6 md:py-10 pb-28 md:pb-16">
      <h1 className="text-xl md:text-2xl font-bold tracking-tight uppercase mb-6">
        Wishlist ({items.length})
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-5 md:gap-y-8">
        {items.map((item) => (
          <WishlistCard
            key={item.id}
            item={item}
            onRemove={() => {
              removeFromWishlist(item.id);
              showToast("Removed from wishlist");
            }}
            onMoveToCart={() => {
              addToCart({
                productId: item.id,
                slug: item.slug,
                name: item.name,
                price: item.price,
                originalPrice: item.originalPrice,
                image: item.image,
                size: "M", // default size
                quantity: 1,
              });
              removeFromWishlist(item.id);
              showToast("Moved to bag — size M");
            }}
          />
        ))}
      </div>
    </div>
  );
}

function WishlistCard({
  item,
  onRemove,
  onMoveToCart,
}: {
  item: import("@/context/WishlistContext").WishlistItem;
  onRemove: () => void;
  onMoveToCart: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(item.price);

  return (
    <div className="group flex flex-col">
      <Link
        href={`/product/${item.slug}`}
        className="block relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100"
      >
        {imgError || !item.image ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
            </svg>
          </div>
        ) : (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            onError={() => setImgError(true)}
          />
        )}

        {/* Remove button */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRemove(); }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 hover:bg-red-50 transition-all"
          aria-label="Remove from wishlist"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </Link>

      <Link href={`/product/${item.slug}`} className="mt-2.5 block">
        <h3 className="text-[13px] font-medium text-gray-900 leading-snug line-clamp-2">
          {item.name}
        </h3>
      </Link>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-[13px] font-semibold text-black">{formattedPrice}</span>
        {typeof item.originalPrice === "number" && item.originalPrice > item.price && (
          <span className="text-[11px] text-gray-400 line-through">₹{item.originalPrice}</span>
        )}
      </div>

      {/* Move to Cart */}
      <button
        onClick={onMoveToCart}
        className="mt-3 w-full h-9 bg-black text-white text-[11px] font-bold tracking-[0.1em] uppercase rounded-full hover:bg-gray-900 transition-colors active:scale-[0.98]"
      >
        Move to Bag
      </button>
    </div>
  );
}
