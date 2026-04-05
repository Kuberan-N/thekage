"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts } from "@/services/api/products";
import { getCategories } from "@/services/api/categories";
import ProductCard from "@/components/ProductCard";
import HeroSection from "@/components/HeroSection";
import BestSellerScroll from "@/components/BestSellerScroll";
import CollectionsGrid from "@/components/CollectionsGrid";
import { type Product } from "@/types/product";
import { type Category } from "@/types/category";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [productData, categoryData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(productData || []);
        setCategories(categoryData || []);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, []);

  return (
    <>
      {/* ─── Hero ─── */}
      <HeroSection />

      {/* ─── Best Sellers Carousel ─── */}
      {!isLoading && <BestSellerScroll products={products} />}

      {/* ─── Collections ─── */}
      {!isLoading && <CollectionsGrid categories={categories} />}

      {/* ─── All Products ─── */}
      <section
        id="shop"
        className="px-4 md:px-8 pb-12 md:pb-20 max-w-screen-xl mx-auto"
      >
        <h2 className="text-[15px] md:text-lg font-bold tracking-tight text-black uppercase mb-5">
          Latest Drops
        </h2>

        {/* Category Pills — navigate to category pages */}
        {!isLoading && categories.length > 0 && (
          <div className="relative mb-6">
            <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-2 pb-1 -mx-4 px-4 md:mx-0 md:px-0">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="whitespace-nowrap shrink-0 px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 bg-transparent text-gray-500 border border-gray-200 hover:border-gray-400 hover:text-black"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
            <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-white pointer-events-none md:hidden" />
          </div>
        )}

        {/* Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-60">
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg font-medium text-gray-900 mb-1">No products yet</p>
            <p className="text-sm text-gray-400 max-w-xs">New drops coming soon. Stay tuned.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-6 md:gap-x-5 md:gap-y-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
