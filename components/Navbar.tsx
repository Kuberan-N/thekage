"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
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

          {/* Center: Brand */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <span className="font-black text-lg tracking-tight uppercase">
              THE KAGE
            </span>
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
              className="hidden md:flex items-center justify-center w-9 h-9 hover:opacity-60 transition-opacity"
              aria-label="Wishlist"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
              </svg>
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
            </Link>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col">
          <div className="flex items-center justify-between px-4 h-14 border-b border-gray-100">
            <span className="font-black text-lg tracking-tight uppercase">THE KAGE</span>
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
            {["Shop", "Latest Drop", "Bestsellers", "T-Shirts", "Hoodies", "About"].map((item) => (
              <Link
                key={item}
                href="/"
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-semibold tracking-tight hover:opacity-50 transition-opacity"
              >
                {item}
              </Link>
            ))}
          </nav>
          <div className="mt-auto px-6 pb-10 flex gap-6">
            {["Instagram", "WhatsApp", "YouTube"].map((s) => (
              <a key={s} href="#" className="text-[10px] text-gray-400 hover:text-black transition-colors uppercase tracking-[0.15em]">
                {s}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-14" />
    </>
  );
}
