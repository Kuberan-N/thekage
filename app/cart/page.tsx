"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function CartPage() {
  const { items, cartCount, cartTotal, removeFromCart, updateQty, clearCart } = useCart();

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" className="mb-4">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Your bag is empty</h1>
        <p className="text-sm text-gray-500 mb-6">
          Looks like you haven&apos;t added anything yet.
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
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-6 md:py-10 pb-32 md:pb-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight uppercase">
          Your Bag ({cartCount})
        </h1>
        <button
          onClick={clearCart}
          className="text-[12px] text-gray-400 hover:text-red-500 transition-colors underline underline-offset-2"
        >
          Clear all
        </button>
      </div>

      <div className="md:grid md:grid-cols-[1fr_360px] md:gap-10">
        {/* Cart Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <CartItem
              key={`${item.productId}-${item.size}`}
              item={item}
              onRemove={() => removeFromCart(item.productId, item.size)}
              onUpdateQty={(qty) => updateQty(item.productId, item.size, qty)}
              formatPrice={formatPrice}
            />
          ))}
        </div>

        {/* Order Summary */}
        <div className="mt-8 md:mt-0">
          <div className="bg-gray-50 rounded-2xl p-6 md:sticky md:top-28">
            <h2 className="text-[13px] font-bold uppercase tracking-wide mb-4">
              Order Summary
            </h2>
            <div className="space-y-3 text-[13px]">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="font-bold text-black">Total</span>
                <span className="font-bold text-black text-lg">{formatPrice(cartTotal)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="mt-6 block w-full h-[52px] bg-black text-white text-[13px] font-bold tracking-[0.1em] uppercase rounded-full hover:bg-gray-900 transition-colors active:scale-[0.98] flex items-center justify-center"
            >
              Proceed to Checkout
            </Link>
            <p className="text-[10px] text-gray-400 text-center mt-3">
              Free delivery across India · COD available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartItem({
  item,
  onRemove,
  onUpdateQty,
  formatPrice,
}: {
  item: import("@/context/CartContext").CartItem;
  onRemove: () => void;
  onUpdateQty: (qty: number) => void;
  formatPrice: (n: number) => string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
      {/* Image */}
      <Link href={`/product/${item.slug}`} className="shrink-0 w-24 h-28 md:w-28 md:h-32 relative rounded-lg overflow-hidden bg-gray-100">
        {imgError || !item.image ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
            </svg>
          </div>
        ) : (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="112px"
            className="object-cover"
            onError={() => setImgError(true)}
          />
        )}
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <Link href={`/product/${item.slug}`}>
          <h3 className="text-[13px] font-medium text-gray-900 line-clamp-2 leading-snug">
            {item.name}
          </h3>
        </Link>
        <p className="text-[11px] text-gray-400 mt-1">Size: {item.size}</p>
        <p className="text-[13px] font-semibold text-black mt-1.5">
          {formatPrice(item.price)}
        </p>

        <div className="flex items-center justify-between mt-3">
          {/* Quantity */}
          <div className="flex items-center border border-gray-200 rounded-full">
            <button
              onClick={() => onUpdateQty(item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-8 text-center text-[13px] font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQty(item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={onRemove}
            className="text-[11px] text-gray-400 hover:text-red-500 transition-colors underline underline-offset-2"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
