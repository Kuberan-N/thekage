"use client";

import Link from "next/link";
import Image from "next/image";
import { type Product } from "@/types/product";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/Toast";

const SIZES = ["S", "M", "L", "XL", "XXL"];

type Props = {
  products: Product[];
};

function ScrollCard({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { showToast } = useToast();

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

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickAddOpen(true);
    setSelectedSize(null);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast("Please select a size", "error");
      return;
    }
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: imageUrl || "",
      size: selectedSize,
      quantity: 1,
    });
    showToast(`Added to bag — Size ${selectedSize}`);
    setQuickAddOpen(false);
    setSelectedSize(null);
  };

  return (
    <>
      <div className="shrink-0 w-[44vw] md:w-[260px] group">
        <Link href={`/product/${product.slug}`}>
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
        </Link>
        <div className="flex items-start justify-between mt-2">
          <Link href={`/product/${product.slug}`} className="block flex-1 min-w-0">
            <h3 className="text-[12px] font-medium text-gray-900 leading-snug line-clamp-1">
              {product.name}
            </h3>
            <p className="text-[12px] font-semibold text-black mt-0.5">
              {formattedPrice}
            </p>
          </Link>
          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            className="shrink-0 ml-2 mt-0.5 w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:border-black hover:bg-black hover:text-white text-gray-500 transition-all active:scale-90"
            aria-label="Quick add to cart"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M7 1v12M1 7h12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Quick Add Bottom Sheet */}
      {quickAddOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-end md:items-center justify-center animate-backdrop-fade"
          onClick={() => setQuickAddOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative bg-white w-full md:max-w-md md:rounded-2xl rounded-t-2xl p-6 pb-8 animate-slide-up-fade"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setQuickAddOpen(false)}
              className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center text-gray-400 hover:text-black"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* Product Info */}
            <div className="flex gap-3 mb-5">
              {imageUrl && (
                <div className="shrink-0 w-16 h-20 relative rounded-lg overflow-hidden bg-gray-100">
                  <Image src={imageUrl} alt={product.name} fill sizes="64px" className="object-cover" />
                </div>
              )}
              <div>
                <h3 className="text-[14px] font-semibold text-black leading-snug line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-[14px] font-bold text-black mt-1">{formattedPrice}</p>
              </div>
            </div>

            {/* Size Selector */}
            <p className="text-[12px] font-semibold text-black uppercase tracking-wide mb-3">Select Size</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[52px] h-11 px-4 rounded-full text-[13px] font-medium transition-all duration-150 ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-white text-black border border-gray-200 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 h-[48px] bg-white text-black text-[13px] font-bold tracking-[0.08em] uppercase rounded-full border border-black hover:bg-gray-50 transition-colors active:scale-[0.98]"
              >
                Add to Bag
              </button>
              <button
                onClick={() => {
                  if (!selectedSize) {
                    showToast("Please select a size", "error");
                    return;
                  }
                  addToCart({
                    productId: product.id,
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    originalPrice: product.originalPrice,
                    image: imageUrl || "",
                    size: selectedSize,
                    quantity: 1,
                  });
                  setQuickAddOpen(false);
                  window.location.href = "/checkout";
                }}
                className="flex-1 h-[48px] bg-black text-white text-[13px] font-bold tracking-[0.08em] uppercase rounded-full hover:bg-gray-900 transition-colors active:scale-[0.98]"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
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
