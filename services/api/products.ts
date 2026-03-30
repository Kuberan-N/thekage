import { supabase } from "@/services/supabase/client";
import { type Product } from "@/types/product";

/**
 * Maps a raw Supabase row (snake_case) → Product interface (camelCase).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProduct(row: any): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description ?? "",
    price: row.price,
    originalPrice: row.original_price ?? undefined,
    images: Array.isArray(row.images) ? row.images : [],
    categorySlug: row.category_slug ?? "",
    isBestSeller: row.is_best_seller ?? false,
    isActive: row.is_active ?? true,
    washcare: row.washcare ?? undefined,
    shipping: row.shipping ?? undefined,
    tags: Array.isArray(row.tags) ? row.tags : [],
    createdAt: row.created_at ?? "",
  };
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true);

  if (error) {
    console.error("Supabase error:", error);
    return [];
  }

  return (data ?? []).map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("Supabase error:", error);
    return null;
  }

  return data ? mapProduct(data) : null;
}
