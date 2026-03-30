export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;

  price: number;
  originalPrice?: number;

  images: string[];

  categorySlug: string;

  isBestSeller?: boolean;
  isActive: boolean;

  washcare?: string;
  shipping?: string;
  tags?: string[];

  createdAt: string;
}