"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getProducts } from "@/services/api/products";
import { getCategories } from "@/services/api/categories";
import ProductCard from "@/components/ProductCard";
import { type Product } from "@/types/product";
import { type Category } from "@/types/category";

const CATEGORY_NAMES: Record<string, string> = {
  "best-sellers": "Best Sellers",
  "oversized-terry": "Oversized Terry Cotton",
  "luxe-acid-wash": "Luxe Acid Wash",
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
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

  const categoryName = CATEGORY_NAMES[slug] || slug;

  const filteredProducts =
    slug === "best-sellers"
      ? products.filter((p) => p.isBestSeller)
      : products.filter((p) => p.categorySlug === slug);

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-6 md:py-10 pb-28 md:pb-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-black transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-900">{categoryName}</span>
      </nav>

      <h1 className="text-xl md:text-2xl font-bold tracking-tight uppercase mb-2">
        {categoryName}
      </h1>

      {/* Category tabs */}
      <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-2 pb-1 mb-6 -mx-4 px-4 md:mx-0 md:px-0">
        {[{ slug: "all", name: "All" }, ...categories].map((cat) => {
          const catSlug = "slug" in cat ? cat.slug : "all";
          const isActive = catSlug === slug;
          return (
            <Link
              key={catSlug}
              href={catSlug === "all" ? "/#shop" : `/category/${catSlug}`}
              className={`whitespace-nowrap shrink-0 px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 ${
                isActive
                  ? "bg-black text-white"
                  : "bg-transparent text-gray-500 border border-gray-200 hover:border-gray-400 hover:text-black"
              }`}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-60">
          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg font-medium text-gray-900 mb-1">
            No products yet
          </p>
          <p className="text-sm text-gray-400 max-w-xs">
            New drops coming soon. Stay tuned.
          </p>
          <Link
            href="/"
            className="mt-5 px-5 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
          >
            Back to Shop
          </Link>
        </div>
      ) : (
        <>
          <p className="text-[12px] text-gray-400 mb-4">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-5 md:gap-y-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
