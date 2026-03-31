"use client";

import { useState, useEffect, useMemo } from "react";
import { getProducts } from "@/services/api/products";
import ProductCard from "@/components/ProductCard";
import { type Product } from "@/types/product";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProducts();
        setProducts(data || []);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.categorySlug?.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }, [query, products]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-6 md:py-10 pb-28 md:pb-16">
      {/* Search Input */}
      <div className="relative mb-8">
        <div className="flex items-center gap-3 border-b-2 border-black pb-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3-3" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            autoFocus
            className="flex-1 bg-transparent text-lg md:text-xl font-medium placeholder:text-gray-300 outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-gray-400 hover:text-black transition-colors"
              aria-label="Clear search"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      ) : query.trim() === "" ? (
        <div className="text-center py-16">
          <p className="text-sm text-gray-400">
            Type to search across all products
          </p>
          {/* Popular tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {["Oversized", "Acid Wash", "Best Seller", "Anime"].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-4 py-2 text-[12px] font-medium text-gray-600 border border-gray-200 rounded-full hover:border-black hover:text-black transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg font-medium text-gray-900 mb-1">
            No results for &ldquo;{query}&rdquo;
          </p>
          <p className="text-sm text-gray-400">
            Try a different search term
          </p>
        </div>
      ) : (
        <>
          <p className="text-[12px] text-gray-400 mb-4">
            {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-5 md:gap-y-8">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
