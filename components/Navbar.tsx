"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const menuItems = [
    { label: "Shop All", href: "/#shop" },
    { label: "Best Sellers", href: "/category/best-sellers" },
    { label: "Oversized Terry", href: "/category/oversized-terry" },
    { label: "Acid Wash", href: "/category/luxe-acid-wash" },
    { label: "Shipping Policy", href: "/shipping-policy" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-8 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center justify-between px-4 h-14 max-w-screen-xl mx-auto">
          {/* Left: Hamburger */}
          <button
            className="flex items-center justify-center w-9 h-9 hover:opacity-60 transition-opacity"
            onClick={() => setMenuOpen(true)}
            aria-label="Menu"
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <path d="M0 1h20M0 7h20M0 13h20" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {/* Center: Brand Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="/logo.png"
              alt="THE KAGE"
              width={140}
              height={40}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Right Icons */}
          <div className="flex items-center gap-0.5">
            {/* Search */}
            <Link
              href="/search"
              className="flex items-center justify-center w-9 h-9 hover:opacity-60 transition-opacity"
              aria-label="Search"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3-3" />
              </svg>
            </Link>

            {/* Wishlist — hidden on mobile, shown at md+ */}
            <Link
              href="/wishlist"
              className="hidden md:flex items-center justify-center w-9 h-9 hover:opacity-60 transition-opacity relative"
              aria-label="Wishlist"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="flex items-center justify-center w-9 h-9 hover:opacity-60 transition-opacity relative"
              aria-label="Cart"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col">
          <div className="flex items-center justify-between px-4 h-14 border-b border-gray-100">
            <Image
              src="/logo.png"
              alt="THE KAGE"
              width={120}
              height={34}
              className="h-8 w-auto object-contain"
            />
            <button
              onClick={() => setMenuOpen(false)}
              className="w-9 h-9 flex items-center justify-center hover:opacity-60 transition-opacity"
              aria-label="Close menu"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M1 1l16 16M17 1L1 17" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col px-6 pt-8 gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-semibold tracking-tight hover:opacity-50 transition-opacity"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto px-6 pb-10 flex gap-6">
            {["Instagram", "WhatsApp"].map((s) => (
              <a key={s} href="#" className="text-[10px] text-gray-400 hover:text-black transition-colors uppercase tracking-[0.15em]">
                {s}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Spacer for fixed header (announcement bar 32px + navbar 56px) */}
      <div className="h-[86px]" />
    </>
  );
}
