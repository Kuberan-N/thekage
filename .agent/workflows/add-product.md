---
description: How to add a new product to THE KAGE store
---

# Add Product to Store

Give me the following filled template and I'll push it to Supabase immediately.

## Product Template

```
Product Name: 
Slug: (auto-generated if left blank, e.g. "the-honored-one-oversized")
Description: (bullet points separated by · or newlines, e.g. "240 GSM cotton · Acid wash · Oversized")
Selling Price (₹): 
Original/MRP Price (₹): (leave blank if no strikethrough pricing)
Image 1 URL: 
Image 2 URL: 
Image 3 URL: (optional)
Image 4 URL: (optional)
Category: [oversized-terry / luxe-acid-wash]
Best Seller: [yes / no]
Washcare: (optional, bullet points separated by · or newlines)
Tags: (comma separated, e.g. jujutsu-kaisen, anime, gojo)
```

## Example (filled)

```
Product Name: The Honored One Oversized T-Shirt
Slug: the-honored-one-oversized
Description: 240 GSM super combed cotton · Acid wash finish · Drop shoulder oversized cut · Unisex · Lycra ribbed neck
Selling Price (₹): 1199
Original/MRP Price (₹): 1499
Image 1 URL: https://res.cloudinary.com/deohtslon/image/upload/v.../Front.jpg
Image 2 URL: https://res.cloudinary.com/deohtslon/image/upload/v.../Back.jpg
Category: luxe-acid-wash
Best Seller: yes
Washcare: Wash inside out in cold water (30°C max) · Do not bleach or tumble dry · Dry flat or hang dry — away from direct sunlight · Iron inside out on low heat only · First wash may show slight colour variation — this is natural to the acid wash process
Tags: jujutsu-kaisen, anime, gojo, oversized, acid-wash
```

## Supabase Column Mapping

| Template Field | Supabase Column | Type | Required |
|---|---|---|---|
| Product Name | `name` | text | ✅ |
| Slug | `slug` | text | ✅ |
| Description | `description` | text | ✅ |
| Selling Price | `price` | integer | ✅ |
| Original/MRP Price | `original_price` | integer | ❌ |
| Image URLs | `images` | text[] | ✅ |
| Category | `category_slug` | text | ✅ |
| Best Seller | `is_best_seller` | boolean | ❌ |
| Washcare | `washcare` | text | ❌ |
| Tags | `tags` | text[] | ❌ |
| — | `is_active` | boolean | ✅ (set `true`) |

## Slug Rules
- Lowercase, dash-separated: `the-honored-one-oversized`
- Must be unique across all products
- Used in URL: `thekage.in/product/the-honored-one-oversized`

## Category Slugs (exact values only)
- `oversized-terry` → Oversized Terry Cotton
- `luxe-acid-wash` → Luxe Acid Washed

## How Products Auto-Appear (No Code Changes)
1. Insert a row into `products` table with `is_active = true`
2. Product immediately appears on the home page
3. Set `is_best_seller = true` → also appears in "Trending Now" carousel
4. Set correct `category_slug` → appears under that category filter

## Common Mistakes to Avoid
- ❌ Using camelCase column names (use `snake_case`: `category_slug` not `categorySlug`)
- ❌ Leaving `images` empty or null (must have at least 1 Cloudinary URL)
- ❌ Misspelling `category_slug` (must be exactly `oversized-terry` or `luxe-acid-wash`)
- ❌ Forgetting `is_active = true` (product won't show on site)
- ❌ Using Supabase storage for images (use Cloudinary instead)
- ❌ Using `camelCase` in description separators — use · (middle dot) or newlines

// turbo-all
## Steps

1. Parse the filled template
2. Run the Supabase insert script:
   ```
   node tmp_add_product.mjs
   ```
3. Delete the temp script
4. Verify on the live site
