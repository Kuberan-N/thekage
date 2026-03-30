---
description: How to add a new product to THE KAGE store
---

# Add Product to Store

Give me the following filled template and I'll push it to Supabase immediately.

## Product Template

```
Product Name: 
Slug: (auto-generated if left blank, e.g. "the-honored-one-oversized")
Description: 
Selling Price (₹): 
Original/MRP Price (₹): (leave blank if no strikethrough pricing)
Image 1 URL: 
Image 2 URL: 
Image 3 URL: (optional)
Image 4 URL: (optional)
Category: [oversized-terry / luxe-acid-wash]
Best Seller: [yes / no]
Tags: (comma separated, e.g. jujutsu-kaisen, anime, gojo)
```

## Example (filled)

```
Product Name: The Honored One Oversized T-Shirt
Slug: the-honored-one-oversized
Description: Premium oversized t-shirt featuring Gojo Satoru. Luxe acid washed finish.
Selling Price (₹): 1199
Original/MRP Price (₹): 1499
Image 1 URL: https://res.cloudinary.com/deohtslon/image/upload/v.../Front.jpg
Image 2 URL: https://res.cloudinary.com/deohtslon/image/upload/v.../Back.jpg
Category: luxe-acid-wash
Best Seller: yes
Tags: jujutsu-kaisen, anime, gojo, oversized, acid-wash
```

// turbo-all
## Steps

1. Parse the filled template
2. Run the Supabase insert script:
   ```
   node tmp_add_product.mjs
   ```
3. Delete the temp script
4. Verify on the live site
