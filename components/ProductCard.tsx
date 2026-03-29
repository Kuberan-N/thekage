// PATH: components/ProductCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { type Product } from "@/types/product";

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
    const [bookmarked, setBookmarked] = useState(false);
    const [imgError, setImgError] = useState(false);

    const formattedPrice = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
    }).format(product.price);

    return (
        <div className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">

            <Link href={`/product/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-gray-100">

                {imgError ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 gap-2">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                        </svg>
                        <span className="text-[10px] text-gray-300 uppercase tracking-widest">Coming Soon</span>
                    </div>
                ) : (
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        onError={() => setImgError(true)}
                    />
                )}

                {product.tag && (
                    <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-[9px] font-semibold uppercase tracking-widest px-2 py-1 rounded-full text-gray-700 z-10">
                        {product.tag}
                    </span>
                )}

                <button
                    onClick={(e) => { e.preventDefault(); setBookmarked((b) => !b); }}
                    className="absolute top-2.5 right-2.5 w-7 h-7 flex items-center justify-center z-10"
                    aria-label="Bookmark"
                >
                    <svg width="16" height="18" viewBox="0 0 16 20"
                        fill={bookmarked ? "#000" : "none"}
                        stroke={bookmarked ? "#000" : "#fff"}
                        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                        style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.4))" }}
                    >
                        <path d="M14 19l-6-4-6 4V3a2 2 0 012-2h8a2 2 0 012 2v16z" />
                    </svg>
                </button>

                <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
                    <button className="w-full bg-black/90 text-white text-xs font-semibold tracking-widest uppercase py-3 hover:bg-black transition-colors">
                        Quick Add +
                    </button>
                </div>
            </Link>

            <div className="px-3 py-2.5">
                <Link href={`/product/${product.slug}`}>
                    <p className="text-[13px] font-medium text-gray-900 leading-tight truncate hover:opacity-70 transition-opacity">
                        {product.name}
                    </p>
                </Link>
                <p className="text-[10px] text-gray-400 mt-0.5 truncate">{product.productType}</p>
                <div className="flex items-center justify-between mt-1.5">
                    <p className="text-[12px] text-gray-600 font-medium">{formattedPrice}</p>
                    <button className="w-6 h-6 rounded-full bg-black flex items-center justify-center hover:bg-gray-700 transition-colors" aria-label="Add to cart">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M5 1v8M1 5h8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}