import { Category } from "@/types/category";

export async function getCategories(): Promise<Category[]> {
  return [
    {
      id: "0",
      name: "Best Sellers",
      slug: "best-sellers"
    },
    {
      id: "1",
      name: "Oversized Terry",
      slug: "oversized-terry"
    },
    {
      id: "2",
      name: "Luxe Acidwashed",
      slug: "luxe-acid-wash"
    }
  ];
}