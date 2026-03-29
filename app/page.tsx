"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/services/api/categories";
import { Category } from "@/types/category";

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("best-sellers");

  useEffect(() => {
    async function loadCategories() {
      const data = await getCategories();
      setCategories(data);
    }

    loadCategories();
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Drop</h1>

      {/* 🔥 CATEGORY TABS */}
      <div className="flex gap-2 overflow-x-auto mb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.slug)}
            className={`px-4 py-2 rounded-full text-sm border transition whitespace-nowrap
              ${activeCategory === cat.slug
                ? "bg-black text-white"
                : "bg-white text-black"
              }
            `}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 🔥 EMPTY STATE */}
      <div className="mt-10 text-center text-gray-500">
        Products coming soon...
      </div>
    </main>
  );
}