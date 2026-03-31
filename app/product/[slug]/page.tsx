"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, getProducts } from "@/services/api/products";
import { type Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useWishlist, type WishlistItem } from "@/context/WishlistContext";
import { useToast } from "@/components/Toast";

const SIZES = ["S", "M", "L", "XL", "XXL"];

type TabId = "details" | "washcare" | "shipping";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
  const [activeTab, setActiveTab] = useState<TabId>("details");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  useEffect(() => {
    async function load() {
      try {
        const [productData, allProducts] = await Promise.all([
          getProductBySlug(slug),
          getProducts(),
        ]);
        setProduct(productData);

        if (productData && allProducts) {
          const filtered = allProducts
            .filter(
              (p: Product) =>
                p.id !== productData.id &&
                p.categorySlug === productData.categorySlug
            )
            .slice(0, 8);
          setRelated(
            filtered.length > 0
              ? filtered
              : allProducts
                  .filter((p: Product) => p.id !== productData.id)
                  .slice(0, 8)
          );
        }
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (slug) load();
  }, [slug]);

  useEffect(() => {
    if (galleryRef.current) {
      const scrollTarget = galleryRef.current.children[activeImage] as HTMLElement;
      if (scrollTarget) {
        scrollTarget.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    }
  }, [activeImage]);

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);

  const handleAddToCart = () => {
    if (!product) return;
    if (!selectedSize) {
      setSizeError(true);
      showToast("Please select a size", "error");
      return;
    }
    setSizeError(false);
    const imageUrl = Array.isArray(product.images) && product.images[0] ? product.images[0] : "";
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: imageUrl,
      size: selectedSize,
      quantity: 1,
    });
    showToast(`Added to bag — Size ${selectedSize}`);
  };

  const handleBuyNow = () => {
    if (!product) return;
    if (!selectedSize) {
      setSizeError(true);
      showToast("Please select a size", "error");
      return;
    }
    setSizeError(false);
    const imageUrl = Array.isArray(product.images) && product.images[0] ? product.images[0] : "";
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: imageUrl,
      size: selectedSize,
      quantity: 1,
    });
    router.push("/checkout");
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    const imageUrl = Array.isArray(product.images) && product.images[0] ? product.images[0] : "";
    const item: WishlistItem = {
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: imageUrl,
      categorySlug: product.categorySlug,
      isBestSeller: product.isBestSeller,
    };
    toggleWishlist(item);
    showToast(isWishlisted(product.id) ? "Removed from wishlist" : "Added to wishlist");
  };

  // ─── Loading ───
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ─── Not Found ───
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Product not found
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          This product may no longer be available.
        </p>
        <Link
          href="/"
          className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images.filter((img) => img !== "")
      : [];
  const hasImages = images.length > 0;
  const discount =
    typeof product.originalPrice === "number" &&
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : 0;

  const wishlisted = isWishlisted(product.id);

  return (
    <div className="pb-28 md:pb-16">
      {/* ─── Breadcrumb ─── */}
      <div className="px-4 md:px-8 py-3 max-w-screen-xl mx-auto">
        <nav className="flex items-center gap-1.5 text-[11px] text-gray-400">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900 truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>
      </div>

      <div className="max-w-screen-xl mx-auto md:px-8 md:grid md:grid-cols-[1fr_420px] md:gap-10 lg:gap-16">
        {/* ─── Image Gallery ─── */}
        <div className="md:sticky md:top-28 md:self-start">
          {/* Mobile: Horizontal Scroll */}
          <div
            ref={galleryRef}
            className="flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:hidden"
          >
            {hasImages ? (
              images.map((src, i) => (
                <div
                  key={i}
                  className="snap-start shrink-0 w-full aspect-[3/4] relative bg-gray-50"
                >
                  {imgError[i] ? (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                      </svg>
                    </div>
                  ) : (
                    <Image
                      src={src}
                      alt={`${product.name} - Image ${i + 1}`}
                      fill
                      sizes="100vw"
                      priority={i === 0}
                      className="object-cover"
                      onError={() =>
                        setImgError((prev) => ({ ...prev, [i]: true }))
                      }
                    />
                  )}
                </div>
              ))
            ) : (
              <div className="w-full aspect-[3/4] bg-gray-100 flex items-center justify-center text-gray-300">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
            )}
          </div>

          {/* Mobile: Dot indicators */}
          {hasImages && images.length > 1 && (
            <div className="flex justify-center gap-1.5 py-3 md:hidden">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === activeImage ? "bg-black" : "bg-gray-300"
                  }`}
                  aria-label={`View image ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* Desktop: Grid of images */}
          <div className="hidden md:grid md:grid-cols-2 gap-2">
            {hasImages ? (
              images.map((src, i) => (
                <div
                  key={i}
                  className={`relative bg-gray-50 rounded-xl overflow-hidden ${
                    i === 0 ? "col-span-2 aspect-[3/4]" : "aspect-square"
                  }`}
                >
                  {imgError[i] ? (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                      </svg>
                    </div>
                  ) : (
                    <Image
                      src={src}
                      alt={`${product.name} - Image ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={i === 0}
                      className="object-cover"
                      onError={() =>
                        setImgError((prev) => ({ ...prev, [i]: true }))
                      }
                    />
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-2 aspect-[3/4] bg-gray-100 rounded-xl flex items-center justify-center text-gray-300">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* ─── Product Info ─── */}
        <div className="px-4 md:px-0 pt-5 md:pt-0">
          {/* Name & Price */}
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-black leading-tight">
            {product.name}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-lg font-bold text-black">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice &&
              product.originalPrice > product.price && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            {discount > 0 && (
              <span className="text-[11px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                {discount}% OFF
              </span>
            )}
          </div>
          <p className="text-[11px] text-gray-400 mt-1">Inclusive of all taxes</p>

          {/* ─── Size Selector ─── */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[13px] font-semibold uppercase tracking-wide ${sizeError ? "text-red-500" : "text-black"}`}>
                {sizeError ? "Please Select a Size" : "Size"}
              </span>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="text-[11px] text-gray-500 underline underline-offset-2 hover:text-black transition-colors"
              >
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => { setSelectedSize(size); setSizeError(false); }}
                  className={`min-w-[52px] h-11 px-4 rounded-full text-[13px] font-medium transition-all duration-150 ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : sizeError
                      ? "bg-white text-black border border-red-300 hover:border-black"
                      : "bg-white text-black border border-gray-200 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ─── Size Guide Modal ─── */}
          {sizeGuideOpen && (
            <div
              className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
              onClick={() => setSizeGuideOpen(false)}
            >
              <div
                className="bg-[#f7f4f0] rounded-2xl max-w-sm w-full p-6 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSizeGuideOpen(false)}
                  className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                  aria-label="Close size guide"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                <h3 className="text-center font-bold text-xl md:text-2xl uppercase tracking-tight text-black mb-1">
                  {product.categorySlug === "luxe-acid-wash" ? "Acid Washed" : "Oversized"}
                </h3>
                <p className="text-center font-bold text-xl md:text-2xl uppercase tracking-tight text-black mb-5">
                  Oversized Tee
                </p>
                <div className="flex justify-center mb-5">
                  <span className="border border-black rounded-full px-5 py-1.5 text-[12px] font-semibold uppercase tracking-wide">
                    Size Chart
                  </span>
                </div>
                <table className="w-full text-[13px]">
                  <thead>
                    <tr>
                      <th className="py-2.5 px-3 text-left font-bold text-black border-b border-gray-300">Size</th>
                      <th className="py-2.5 px-3 text-center font-bold text-black bg-[#f0cdb8]/40 border-b border-gray-300">Chest</th>
                      <th className="py-2.5 px-3 text-center font-bold text-black bg-[#f0cdb8]/40 border-b border-gray-300">Length</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["XS", "39", "27"],
                      ["S", "41", "28"],
                      ["M", "43", "29"],
                      ["L", "45", "30"],
                      ["XL", "47", "31"],
                      ["2XL", "49", "32"],
                    ].map(([size, chest, length]) => (
                      <tr key={size} className="border-b border-gray-200 last:border-0">
                        <td className="py-2.5 px-3 font-semibold text-black">{size}</td>
                        <td className="py-2.5 px-3 text-center text-gray-600 bg-[#f0cdb8]/20">{chest}</td>
                        <td className="py-2.5 px-3 text-center text-gray-600 bg-[#f0cdb8]/20">{length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-[10px] text-gray-400 text-right mt-3 italic">*All measurements are in inches.</p>
              </div>
            </div>
          )}

          {/* ─── Actions ─── */}
          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={handleBuyNow}
              className="w-full h-[52px] bg-black text-white text-[13px] font-bold tracking-[0.1em] uppercase rounded-full hover:bg-gray-900 transition-colors active:scale-[0.98]"
            >
              Buy Now
            </button>
            <button
              onClick={handleAddToCart}
              className="w-full h-[52px] bg-white text-black text-[13px] font-bold tracking-[0.1em] uppercase rounded-full border border-black hover:bg-gray-50 transition-colors active:scale-[0.98]"
            >
              Add to Bag
            </button>
            <button
              onClick={handleToggleWishlist}
              className="w-full h-[44px] flex items-center justify-center gap-2 text-[12px] font-medium text-gray-500 hover:text-black transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={wishlisted ? "#000" : "none"}
                stroke={wishlisted ? "#000" : "currentColor"}
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
              </svg>
              {wishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
            </button>
          </div>

          {/* ─── Info Tabs ─── */}
          <div className="mt-10 border-t border-gray-100 pt-6">
            <div className="flex gap-6 border-b border-gray-100 mb-5">
              {(
                [
                  { id: "details" as TabId, label: "Description" },
                  { id: "washcare" as TabId, label: "Washcare" },
                  { id: "shipping" as TabId, label: "Shipping" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 text-[12px] font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-black border-b-2 border-black -mb-[1px]"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="text-[13px] text-gray-600 leading-relaxed min-h-[120px]">
              {activeTab === "details" && (
                <div>
                  {(() => {
                    const desc = product.description?.trim();
                    if (desc) {
                      const lines = desc
                        .split(/[\n·•]/)
                        .map((l) => l.replace(/^[\s•\-\*·]+/, "").trim())
                        .filter(Boolean);
                      if (lines.length > 1) {
                        return (
                          <ul className="list-disc pl-4 space-y-1.5 text-gray-500">
                            {lines.map((line, i) => (
                              <li key={i}>{line}</li>
                            ))}
                          </ul>
                        );
                      }
                      return <p className="text-gray-500">{desc}</p>;
                    }
                    if (product.categorySlug === "luxe-acid-wash") {
                      return (
                        <ul className="list-disc pl-4 space-y-1.5 text-gray-500">
                          <li>240 GSM super combed cotton</li>
                          <li>Acid wash finish</li>
                          <li>Drop shoulder oversized cut</li>
                          <li>Unisex</li>
                          <li>Lycra ribbed neck</li>
                        </ul>
                      );
                    }
                    return (
                      <ul className="list-disc pl-4 space-y-1.5 text-gray-500">
                        <li>100% Cotton</li>
                        <li>Oversized Fit</li>
                        <li>Premium Screen Print</li>
                      </ul>
                    );
                  })()}
                </div>
              )}
              {activeTab === "washcare" && (
                <div>
                  {(() => {
                    const wc = product.washcare?.trim();
                    if (wc) {
                      const lines = wc
                        .split(/[\n·•]/)
                        .map((l) => l.replace(/^[\s•\-\*·]+/, "").trim())
                        .filter(Boolean);
                      return (
                        <ul className="list-disc pl-4 space-y-1.5 text-gray-500">
                          {lines.map((line, i) => (
                            <li key={i}>{line}</li>
                          ))}
                        </ul>
                      );
                    }
                    if (product.categorySlug === "luxe-acid-wash") {
                      return (
                        <ul className="list-disc pl-4 space-y-1.5 text-gray-500">
                          <li>Wash inside out in cold water (30°C max)</li>
                          <li>Do not bleach or tumble dry</li>
                          <li>Dry flat or hang dry — away from direct sunlight</li>
                          <li>Iron inside out on low heat only</li>
                          <li className="text-gray-400 italic">First wash may show slight colour variation — this is natural to the acid wash process</li>
                        </ul>
                      );
                    }
                    return (
                      <ul className="list-disc pl-4 space-y-1.5 text-gray-500">
                        <li>Machine wash cold with like colours</li>
                        <li>Do not bleach</li>
                        <li>Tumble dry low</li>
                        <li>Iron on low heat if needed</li>
                        <li>Do not dry clean</li>
                      </ul>
                    );
                  })()}
                </div>
              )}
              {activeTab === "shipping" && (
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-black mb-1">Dispatch</p>
                    <p className="text-gray-500">
                      Orders are processed and dispatched within <span className="font-medium text-gray-700">2–3 business days</span>. You&apos;ll receive a tracking link via email/SMS.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-black mb-1">Estimated Delivery</p>
                    <ul className="list-disc pl-4 space-y-1 text-gray-500">
                      <li>Metro cities — <span className="font-medium text-gray-700">2–5 days</span></li>
                      <li>Tier 2 & Tier 3 cities — <span className="font-medium text-gray-700">3–7 days</span></li>
                      <li>Remote pin codes — <span className="font-medium text-gray-700">5–15 working days</span></li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-gray-500"><span className="font-medium text-gray-700">COD available</span> across most serviceable pin codes.</p>
                    <p className="text-gray-500 mt-1">All orders are shipped free — no hidden charges.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── You May Also Like ─── */}
      {related.length > 0 && (
        <section className="mt-12 md:mt-20">
          <div className="px-4 md:px-8 max-w-screen-xl mx-auto mb-5">
            <h2 className="text-[15px] md:text-lg font-bold tracking-tight text-black uppercase">
              You may also like
            </h2>
          </div>
          <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-3 px-4 md:px-8 pb-4">
            {related.map((p) => (
              <RelatedCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function RelatedCard({ product }: { product: Product }) {
  const [imgErr, setImgErr] = useState(false);

  const imageUrl =
    Array.isArray(product.images) &&
    product.images.length > 0 &&
    product.images[0] !== ""
      ? product.images[0]
      : null;

  const price = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="shrink-0 w-[44vw] md:w-[240px] group"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">
        {imgErr || !imageUrl ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        ) : (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 44vw, 240px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            onError={() => setImgErr(true)}
          />
        )}
      </div>
      <h3 className="mt-2 text-[12px] font-medium text-gray-900 line-clamp-1">
        {product.name}
      </h3>
      <p className="text-[12px] font-semibold text-black mt-0.5">{price}</p>
    </Link>
  );
}